"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  profile: any | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
  signOut: async () => {},
});

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === "admin" || user?.email === "kulewakangitsirobert@gmail.com";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          let docSnap = await getDoc(userDocRef);
          
          if (!docSnap.exists()) {
            const newProfile = {
              uid: user.uid,
              displayName: user.displayName || user.email?.split('@')[0] || "User",
              email: user.email,
              role: "user",
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp(),
            };
            try {
              await setDoc(userDocRef, newProfile);
              docSnap = await getDoc(userDocRef);
            } catch (error) {
              handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
            }
          }
          
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (error: any) {
          handleFirestoreError(error, OperationType.GET, `users/${user?.uid}`);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
