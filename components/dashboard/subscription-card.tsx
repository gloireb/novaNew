"use client";

import { CreditCard, ArrowRight, Sparkles, Plus } from "lucide-react";
import Link from "next/link";

interface SubscriptionCardProps {
  planName: string;
  price: string;
  cycle: string;
}

export default function SubscriptionCard({ planName, price, cycle }: SubscriptionCardProps) {
  const hasSubscription = planName && planName !== "Aucun";

  return (
    <div className={`rounded-[2.5rem] p-10 text-white relative overflow-hidden group transition-all ${
      hasSubscription ? "bg-slate-900 dark:bg-slate-800/50" : "bg-blue-600 shadow-2xl shadow-blue-600/20"
    }`}>
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-blue-600/20 blur-[80px] rounded-full transition-transform group-hover:scale-110 duration-700"></div>
      
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white font-black text-[10px] uppercase tracking-widest mb-8 border border-white/10">
          <Sparkles className="w-3 h-3" /> {hasSubscription ? "Abonnement Actif" : "Offre Limitée"}
        </div>

        <div className="mb-10">
          <h3 className="text-4xl font-black mb-2 tracking-tight">
            {hasSubscription ? `Plan ${planName}` : "Aucun Forfait actif"}
          </h3>
          <div className="flex items-baseline gap-2">
            {hasSubscription ? (
              <>
                <span className="text-2xl font-bold opacity-80">{price}</span>
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">/ {cycle}</span>
              </>
            ) : (
              <span className="text-sm font-bold opacity-60">Restez connecté avec NOVA+ à partir de $5/semaine.</span>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/pricing" 
            className="flex-1 bg-white text-slate-900 py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5"
          >
            <Plus className="w-4 h-4" /> {hasSubscription ? "Renouveler" : "Souscrire maintenant"}
          </Link>
          {hasSubscription && (
            <button className="flex-1 bg-white/10 text-white py-4 px-6 rounded-2xl font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" /> Historique
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-white/5 relative z-10 flex items-center justify-between">
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-slate-800 border-2 border-slate-900 flex items-center justify-center text-[10px] font-bold">
              {i}
            </div>
          ))}
          <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-slate-900 flex items-center justify-center text-[10px] font-black">
            +
          </div>
        </div>
        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">3 Appareils connectés</p>
      </div>
    </div>
  );
}
