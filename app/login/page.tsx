"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard, AuthInput, AuthButton, GoogleButton } from "@/components/auth/auth-ui";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { ArrowLeft, KeyRound, Phone } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  // Redirect if user is already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let firebaseEmail = identifier;
      if (!identifier.includes("@")) {
        firebaseEmail = `${identifier.replace(/\s+/g, "")}@nova.plus`;
      }

      try {
        await signInWithEmailAndPassword(auth, firebaseEmail, password);
      } catch (err: any) {
        // Auto-create SuperAdmin if credentials match env vars and account doesn't exist
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
        const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

        if (
          (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found") &&
          firebaseEmail === adminEmail &&
          password === adminPassword
        ) {
          // Create the superAdmin account on first login
          const { createUserWithEmailAndPassword, updateProfile } = await import("firebase/auth");
          const { doc, setDoc, serverTimestamp } = await import("firebase/firestore");
          const { db } = await import("@/lib/firebase");

          const userCred = await createUserWithEmailAndPassword(auth, firebaseEmail, password);
          await updateProfile(userCred.user, { displayName: "Super Admin" });
          await setDoc(doc(db, "users", userCred.user.uid), {
            uid: userCred.user.uid,
            displayName: "Super Admin",
            email: firebaseEmail,
            role: "admin",
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          });
        } else {
          throw err; // re-throw for the outer catch
        }
      }

      setSuccess(true);
      setTimeout(() => router.push("/dashboard"), 1000);
    } catch (err: any) {
      console.error("Login Error:", err.code, err.message);
      if (err.code === "auth/operation-not-allowed") {
        setError("L'authentification par email n'est pas activée.");
      } else if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Identifiant ou mot de passe incorrect.");
      } else if (err.code === "auth/invalid-email") {
        setError("Format d'identifiant invalide.");
      } else {
        setError("Une erreur est survenue lors de la connexion.");
      }
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setError(null);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setSuccess(true);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Google Auth Error:", err.code, err.message);
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Erreur de connexion via Google. Veuillez réessayer.");
      }
      setGoogleLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
        <AuthCard title="Connexion réussie !">
          <div className="flex flex-col items-center py-8">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 mb-6">
               <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-center font-medium">Préparation de votre dashboard...</p>
          </div>
        </AuthCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 dark:from-blue-900/20 via-transparent to-transparent">
      <Link href="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-600 dark:text-slate-400 font-medium hover:text-blue-600 dark:hover:text-blue-400 transition-all">
        <ArrowLeft className="w-5 h-5" />
        Retour
      </Link>

      <AuthCard title="Bon retour" description="Connectez-vous pour gérer vos forfaits.">
        <div className="space-y-6">
          <GoogleButton onClick={handleGoogleLogin} loading={googleLoading} />

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ou avec email</span>
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative group">
              <AuthInput
                label="Email ou Téléphone"
                placeholder="Ex: 000000000"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="pl-12"
              />
              <div className="absolute left-4 top-[2.7rem] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <Phone className="w-5 h-5" />
              </div>
            </div>

            <div className="relative group">
              <AuthInput
                label="Mot de passe"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
              />
              <div className="absolute left-4 top-[2.7rem] text-slate-400 group-focus-within:text-blue-600 transition-colors">
                <KeyRound className="w-5 h-5" />
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium text-red-500 text-center bg-red-50 dark:bg-red-900/10 py-2.5 rounded-xl border border-red-100 dark:border-red-900/20">
                {error}
              </p>
            )}

            <AuthButton type="submit" loading={loading} className="mt-2">
              Se connecter
            </AuthButton>

            <div className="flex flex-col gap-4 mt-6">
              <Link href="#" className="text-center text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">
                Mot de passe oublié ?
              </Link>
              
              <p className="text-center text-slate-500 dark:text-slate-400 text-sm">
                Nouveau chez NOVA+ ?{" "}
                <Link href="/register" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  S&apos;inscrire
                </Link>
              </p>
            </div>
          </form>
        </div>
      </AuthCard>

      <div className="mt-12 text-slate-400 dark:text-slate-600 text-xs font-medium text-center max-w-xs leading-relaxed">
        En vous connectant, vous acceptez nos <span className="underline cursor-pointer">conditions d&apos;utilisation</span> et notre <span className="underline cursor-pointer">politique de confidentialité</span>.
      </div>
    </div>
  );
}
