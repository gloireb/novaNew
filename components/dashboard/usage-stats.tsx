"use client";

import { motion } from "motion/react";
import { Activity } from "lucide-react";

export default function UsageStats() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 h-full flex flex-col shadow-sm">
      <div className="flex items-center justify-between mb-8 text-blue-600">
        <h3 className="font-display font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight">Activité Ligne</h3>
        <Activity className="w-5 h-5 animate-pulse" />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-end mb-3">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Usage ce mois</span>
              <span className="text-xs font-black text-slate-900 dark:text-white">INTENSE (75%)</span>
            </div>
            <div className="h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-blue-600 rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Upload</p>
               <p className="font-display font-black text-slate-900 dark:text-white">12.4 GB</p>
             </div>
             <div className="p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Download</p>
               <p className="font-display font-black text-slate-900 dark:text-white">245.8 GB</p>
             </div>
          </div>
        </div>
      </div>

      <div className="mt-10 p-5 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20">
        <p className="text-[10px] font-bold text-blue-700 dark:text-blue-300 leading-relaxed uppercase tracking-wider">
          <span className="font-black text-blue-600">Note :</span> Illimité - Données indicatives
        </p>
      </div>
    </div>
  );
}
