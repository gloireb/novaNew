"use client";

import { motion } from "motion/react";
import { Wifi, Zap, Calendar, ShieldCheck, AlertCircle } from "lucide-react";

interface ConnectionStatusProps {
  status: "active" | "suspended" | "pending";
  planName: string;
  speed: string;
  expiryDate: string;
}

export default function ConnectionStatus({ status, planName, speed, expiryDate }: ConnectionStatusProps) {
  const statusConfig = {
    active: {
      color: "emerald",
      icon: <Wifi className="w-6 h-6" />,
      label: "Connecté",
      desc: "Votre ligne est actuellement active."
    },
    suspended: {
      color: "red",
      icon: <AlertCircle className="w-6 h-6" />,
      label: "Suspendu",
      desc: "Veuillez renouveler pour réactiver."
    },
    pending: {
      color: "amber",
      icon: <Calendar className="w-6 h-6" />,
      label: "En attente",
      desc: "Installation en cours de planification."
    },
    expired: {
      color: "slate",
      icon: <AlertCircle className="w-6 h-6" />,
      label: "Expiré",
      desc: "Votre abonnement est arrivé à terme."
    },
    none: {
      color: "slate",
      icon: <Wifi className="w-6 h-6 opacity-20" />,
      label: "Inactif",
      desc: "Aucun abonnement détecté sur cette ligne."
    }
  };

  const current = statusConfig[status] || statusConfig.none;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className={`w-16 h-16 rounded-[1.5rem] bg-${current.color}-50 dark:bg-${current.color}-900/20 flex items-center justify-center text-${current.color}-600 dark:text-${current.color}-400 border border-${current.color}-100 dark:border-${current.color}-800/50`}>
            {current.icon}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Status Internet</h2>
              <span className={`px-3 py-1 rounded-full bg-${current.color}-100 dark:bg-${current.color}-900/30 text-${current.color}-700 dark:text-${current.color}-300 text-[10px] font-black uppercase tracking-widest border border-${current.color}-200 dark:border-${current.color}-800`}>
                {current.label}
              </span>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
              {current.desc}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:flex items-center gap-4 md:gap-12">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Vitesse Max</p>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="font-display font-black text-slate-900 dark:text-white">{speed}</span>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Expiration</p>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              <span className="font-display font-black text-slate-900 dark:text-white">{expiryDate}</span>
            </div>
          </div>
          <div className="col-span-2 md:col-auto space-y-1">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Type d&apos;accès</p>
             <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span className="font-display font-black text-slate-900 dark:text-white">Illimité</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
