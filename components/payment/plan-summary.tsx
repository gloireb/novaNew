"use client";

import { Check, ShieldCheck, Zap } from "lucide-react";

interface PlanSummaryProps {
  plan: {
    name: string;
    price: string;
    cycle: string;
    speed: string;
    features: string[];
  };
}

export default function PlanSummary({ plan }: PlanSummaryProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Forfait Choisi</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Plan {plan.name}</h2>
        </div>
        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
          <Zap className="w-7 h-7" />
        </div>
      </div>

      <div className="space-y-4 mb-10">
        {plan.features.map((feature, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Check className="w-3 h-3" strokeWidth={3} />
            </div>
            <span className="text-sm font-bold text-slate-600 dark:text-slate-300">{feature}</span>
          </div>
        ))}
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <ShieldCheck className="w-3 h-3" strokeWidth={3} />
          </div>
          <span className="text-sm font-bold text-slate-600 dark:text-slate-300">Vitesse : {plan.speed}</span>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total à payer</span>
          <div className="text-right">
            <p className="text-4xl font-black text-slate-900 dark:text-white leading-none">{plan.price}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Valide 1 {plan.cycle}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
