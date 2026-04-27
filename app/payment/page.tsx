"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import UserHeader from "@/components/dashboard/user-header";
import PlanSummary from "@/components/payment/plan-summary";
import PaymentMethods, { PaymentMethodType } from "@/components/payment/payment-methods";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Loader2, CheckCircle2, AlertCircle, Phone, Smartphone } from "lucide-react";
import { doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const PLANS_DATA = {
  basic: { name: "Basic", price: "$35", cycle: "Mois", speed: "10 Mbps", features: ["Internet Illimité", "Navigation fluide", "Appels WhatsApp", "Support 7/7"] },
  famille: { name: "Famille", price: "$60", cycle: "Mois", speed: "25 Mbps", features: ["Streaming HD", "4-6 Appareils", "Ping réduit", "Support 7/7"] },
  entreprise: { name: "Entreprise", price: "$120", cycle: "Mois", speed: "50+ Mbps", features: ["Ligne Dédiée", "Vidéoconférence 4K", "Priorité Support", "SLA 99.9%"] },
};

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, profile, loading: authLoading } = useAuth();
  
  const planId = (searchParams.get("plan") || "basic") as keyof typeof PLANS_DATA;
  const currentPlan = PLANS_DATA[planId] || PLANS_DATA.basic;

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>("mpesa");
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"method" | "details" | "processing" | "success" | "error">("method");

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  const handleProcessPayment = async () => {
    setStep("processing");
    
    // Simulate payment processing (Africa Mobile Money typically takes 5-10s for USSD push)
    setTimeout(async () => {
      try {
        if (!user) return;

        const paymentId = `PAY-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        const amount = currentPlan.price;
        
        // 1. Update User Profile in Firestore
        await updateDoc(doc(db, "users", user.uid), {
          subscriptionPlan: currentPlan.name,
          subscriptionStatus: "active",
          updatedAt: serverTimestamp()
        });

        // 2. Add to Subscriptions collection (relational tracking)
        const expiryDate = new Date();
        expiryDate.setMonth(expiryDate.getMonth() + 1);

        await setDoc(doc(db, "subscriptions", user.uid), {
          userId: user.uid,
          planId: planId,
          planName: currentPlan.name,
          status: "active",
          startDate: serverTimestamp(),
          endDate: expiryDate,
          updatedAt: serverTimestamp()
        });

        // 3. Log Payment History
        await setDoc(doc(db, "payments", paymentId), {
          id: paymentId,
          userId: user.uid,
          amount: amount,
          method: selectedMethod,
          phone: selectedMethod.includes("money") || selectedMethod === "mpesa" ? phone : null,
          status: "completed",
          planId: planId,
          createdAt: serverTimestamp()
        });

        setStep("success");
      } catch (error) {
        console.error("Payment error:", error);
        setStep("error");
      }
    }, 3000);
  };

  if (authLoading) return null;

  return (
    <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full grid lg:grid-cols-2 gap-12 items-start">
      {/* Left Column: Summary */}
      <div className="space-y-8">
          <button 
          onClick={() => step === "details" ? setStep("method") : router.back()}
          className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors group mb-4"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          {step === "details" ? "Changer de méthode" : "Retour"}
        </button>

        <PlanSummary plan={currentPlan} />
        
        <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-3xl border border-blue-100 dark:border-blue-900/20">
          <p className="text-xs font-bold text-blue-700 dark:text-blue-300 leading-relaxed uppercase tracking-wider">
            <span className="font-black text-blue-600">Info :</span> Votre activation sera instantanée dès la validation du paiement sur votre téléphone.
          </p>
        </div>
      </div>

      {/* Right Column: Steps */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm h-full flex flex-col">
        <AnimatePresence mode="wait">
          {step === "method" && (
            <motion.div
              key="method"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <PaymentMethods selected={selectedMethod} onSelect={setSelectedMethod} />
              <button 
                onClick={() => setStep("details")}
                className="w-full mt-12 bg-slate-900 dark:bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-900/10 dark:shadow-blue-600/20 active:scale-[0.98] transition-all"
              >
                Continuer vers paiement
              </button>
            </motion.div>
          )}

          {step === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 flex flex-col"
            >
              <div className="mb-10 text-center">
                <div className="w-20 h-20 rounded-3xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mx-auto mb-6">
                  <Smartphone className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Détails Mobile Money</h3>
                <p className="text-slate-500 font-medium text-sm">Entrez le numéro qui recevra la demande de paiement.</p>
              </div>

              <div className="space-y-6 flex-1">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">
                    Numéro Téléphone
                  </label>
                  <div className="relative group">
                    <input 
                      type="tel"
                      placeholder="Ex: 0812345678"
                      className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 focus:border-blue-600/20 focus:bg-white dark:focus:bg-slate-900 rounded-3xl px-12 text-lg font-black transition-all outline-none"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 space-y-4">
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">Total</span>
                    <span className="text-slate-900 dark:text-white">{currentPlan.price}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                    <span className="text-slate-400">Frais Réseau</span>
                    <span className="text-emerald-500">$0.00</span>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleProcessPayment}
                disabled={!phone || phone.length < 9}
                className="w-full mt-8 bg-blue-600 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
              >
                Confirmer et Payer {currentPlan.price}
              </button>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                  <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Smartphone className="w-8 h-8 text-blue-600 animate-pulse" />
                  </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Paiement en cours...</h3>
                <p className="text-slate-500 font-medium text-sm max-w-xs mx-auto">
                  Veuillez valider la transaction sur votre téléphone. Ne fermez pas cette page.
                </p>
              </div>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center text-emerald-600 transition-transform hover:scale-110">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">C&apos;est fait !</h3>
                <p className="text-slate-500 font-medium text-lg mb-8 max-w-xs mx-auto">
                  Votre abonnement <span className="font-black text-slate-900 dark:text-white">{currentPlan.name}</span> est désormais actif.
                </p>
              </div>
              <button 
                onClick={() => router.push("/dashboard")}
                className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all"
              >
                Accéder à mon Dashboard
              </button>
            </motion.div>
          )}

          {step === "error" && (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="w-24 h-24 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600">
                <AlertCircle className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Échec du paiement</h3>
                <p className="text-slate-500 font-medium text-sm max-w-xs mx-auto">
                  La transaction n&apos;a pas pu être validée. Veuillez réessayer ou contacter le support.
                </p>
              </div>
              <div className="flex flex-col gap-4 w-full">
                <button 
                  onClick={() => setStep("method")}
                  className="w-full bg-blue-600 text-white py-4 rounded-3xl font-black text-xs uppercase tracking-widest"
                >
                  Réessayer
                </button>
                <button 
                  onClick={() => router.push("/dashboard")}
                  className="w-full text-slate-500 font-bold text-sm"
                >
                  Retour au Dashboard
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <UserHeader />
      <Suspense fallback={
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        </div>
      }>
        <PaymentContent />
      </Suspense>

      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
          NOVA+ Secure Payments &copy; 2026
        </p>
      </footer>
    </div>
  );
}
