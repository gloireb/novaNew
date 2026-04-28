"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import UserHeader from "@/components/dashboard/user-header";
import { motion } from "motion/react";
import { ArrowLeft, Send, Loader2, CheckCircle2, Ticket } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

const CATEGORIES = [
  { id: "internet_lent", label: "Internet Lent" },
  { id: "pas_de_connexion", label: "Pas de Connexion" },
  { id: "paiement", label: "Problème Paiement" },
  { id: "installation", label: "Installation" },
  { id: "autre", label: "Autre" },
];

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export default function NewTicketPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [subject, setSubject] = useState("");
  const [category, setCategory] = useState("internet_lent");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!subject || !description) return;

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "tickets"), {
        userId: user.uid,
        userName: user.displayName || "Client NOVA+",
        subject,
        category,
        description,
        status: "open",
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/support/tickets");
      }, 3000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, "tickets");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <UserHeader />

      <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors group mb-8"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Retour
        </button>

        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 sm:p-12 shadow-sm">
          {isSuccess ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-8"
            >
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 mx-auto">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Ticket Ouvert !</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                  Votre demande a été enregistrée. Notre équipe technique va l&apos;étudier et vous répondra sous peu.
                </p>
              </div>
              <div className="pt-8">
                 <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Redirection vers vos tickets...</p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 text-center sm:text-left">
                <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                     <Ticket className="w-6 h-6" />
                   </div>
                   <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Ouvrir un ticket</h1>
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Décrivez votre problème technique pour que nos experts puissent vous aider rapidement.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Catégorie du problème</label>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setCategory(cat.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border-2 transition-all ${
                          category === cat.id 
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20" 
                            : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 hover:border-slate-200 dark:hover:border-slate-700"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Sujet / Titre</label>
                  <input 
                    type="text"
                    required
                    placeholder="Ex: Pas de connexion depuis ce matin"
                    className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-8 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all shadow-sm"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Description détaillée</label>
                  <textarea 
                    required
                    placeholder="Décrivez précisément ce qui se passe..."
                    className="w-full min-h-[150px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 font-medium text-slate-700 dark:text-slate-300 outline-none focus:border-blue-600/20 transition-all resize-none shadow-sm"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 dark:bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 dark:shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer ma demande
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
