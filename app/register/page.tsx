"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthCard, AuthInput, AuthButton, GoogleButton } from "@/components/auth/auth-ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { ArrowLeft, CheckCircle2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const registerSchema = z.object({
  name: z.string().min(2, "Nom trop court"),
  phone: z.string().min(9, "Numéro invalide"),
  email: z.string().email("Email invalide").optional().or(z.literal("")),
  password: z.string().min(6, "Minimum 6 caractères"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard");
    }
  }, [user, authLoading, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    setError(null);

    try {
      const firebaseEmail = data.email || `${data.phone.replace(/\s+/g, "")}@nova.plus`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        firebaseEmail,
        data.password
      );

      await updateProfile(userCredential.user, {
        displayName: data.name,
      });

      await setDoc(doc(db, "users", userCredential.user.uid), {
        uid: userCredential.user.uid,
        displayName: data.name,
        phoneNumber: data.phone,
        email: data.email || null,
        role: "user",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      console.error("Firebase Auth Error:", err.code, err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("Cet identifiant est déjà utilisé.");
      } else if (err.code === "auth/weak-password") {
        setError("Le mot de passe est trop court.");
      } else {
        setError("Une erreur est survenue lors de l'inscription.");
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
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Google Auth Error:", err.code, err.message);
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Erreur de connexion via Google.");
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
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-6">
        <AuthCard title="Bienvenue !">
          <div className="flex flex-col items-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mb-6"
            >
              <CheckCircle2 className="w-12 h-12" />
            </motion.div>
            <p className="text-slate-600 dark:text-slate-300 text-center text-lg font-medium">
              Votre compte a été créé avec succès.
            </p>
            <p className="text-slate-400 text-sm mt-2">Redirection vers votre dashboard...</p>
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

      <AuthCard title="Créer un compte" description="Rejoignez NOVA+ en quelques secondes.">
        <div className="space-y-6">
          <GoogleButton onClick={handleGoogleLogin} loading={googleLoading} />

          <div className="relative flex items-center">
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
            <span className="flex-shrink mx-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Ou avec vos infos</span>
            <div className="flex-grow border-t border-slate-100 dark:border-slate-800"></div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <AuthInput
              label="Nom Complet"
              placeholder="Ex: Jean Mukendi"
              {...register("name")}
              error={errors.name?.message}
            />
            <AuthInput
              label="Téléphone"
              placeholder="Ex: 000000000"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <AuthInput
              label="Email (Optionnel)"
              placeholder="Ex: jean@email.com"
              {...register("email")}
              error={errors.email?.message}
            />
            <AuthInput
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />
            
            {error && (
              <p className="text-sm font-medium text-red-500 text-center bg-red-50 dark:bg-red-900/10 py-2.5 rounded-xl border border-red-100 dark:border-red-900/20">
                {error}
              </p>
            )}

            <AuthButton type="submit" loading={loading} className="mt-2">
              Créer mon compte
            </AuthButton>

            <p className="text-center text-slate-500 dark:text-slate-400 mt-6 text-sm">
              Déjà un compte ?{" "}
              <Link href="/login" className="text-blue-600 dark:text-blue-400 font-bold hover:underline">
                Se connecter
              </Link>
            </p>
          </form>
        </div>
      </AuthCard>

      <div className="mt-12 flex items-center gap-2 text-slate-400 dark:text-slate-600 text-xs font-medium">
        <ShieldCheck className="w-5 h-5" />
        Données sécurisées par NOVA+
      </div>
    </div>
  );
}
