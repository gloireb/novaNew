"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import UserHeader from "@/components/dashboard/user-header";
import { motion } from "motion/react";
import { MapPin, Calendar, MessageSquare, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function InstallationRequestPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("Likasi");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
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
    
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "installations"), {
        userId: user.uid,
        userName: user.displayName || "Client NOVA+",
        address,
        city,
        preferredDate,
        notes,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setIsSuccess(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error("Error creating installation request:", error);
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
                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Demande Envoyée !</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">
                  Un conseiller NOVA+ vous contactera dans les prochaines 24h pour confirmer l&apos;heure de passage du technicien.
                </p>
              </div>
              <div className="pt-8">
                 <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Redirection vers le dashboard...</p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="mb-10 text-center sm:text-left">
                <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Demander une installation</h1>
                <p className="text-slate-500 font-medium leading-relaxed">
                  Remplissez ce formulaire pour planifier le passage d&apos;un expert NOVA+ chez vous ou à votre bureau.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Ville</label>
                    <select 
                      className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-6 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all appearance-none"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    >
                      <option value="Likasi">Likasi</option>
                      <option value="Lubumbashi">Lubumbashi</option>
                      <option value="Kolwezi">Kolwezi</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Date Préférée</label>
                    <div className="relative">
                      <input 
                        type="date"
                        required
                        className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-12 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                      />
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Adresse Complète</label>
                  <div className="relative">
                    <textarea 
                      required
                      placeholder="Ex: Quartier Shituru, Av. du Commerce n°42, derrière l'église..."
                      className="w-full min-h-[120px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 pl-12 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all resize-none"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <MapPin className="absolute left-4 top-6 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 block">Instructions Additionnelles (Optionnel)</label>
                  <div className="relative">
                    <textarea 
                      placeholder="Maison avec portail noir, dispo uniquement le matin..."
                      className="w-full min-h-[100px] bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-6 pl-12 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all resize-none"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                    <MessageSquare className="absolute left-4 top-6 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-slate-900 dark:bg-blue-600 text-white py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 dark:shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    "Confirmer ma demande"
                  )}
                </button>
              </form>
              
              <p className="mt-8 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-slate-50 dark:border-slate-800 pt-8">
                Frais d&apos;installation : Inclus dans votre premier forfait
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
