"use client";

import { MessageCircle, MapPin, Share2, HelpCircle } from "lucide-react";
import Link from "next/link";

const actions = [
  { icon: <MessageCircle className="w-5 h-5" />, label: "Support WhatsApp", desc: "Besoin d'aide immédiate ?", href: "https://wa.me/243000000000", color: "emerald" },
  { icon: <MapPin className="w-5 h-5" />, label: "Demander Installation", desc: "Une nouvelle ligne à Likasi ?", href: "/installation/request", color: "blue" },
  { icon: <Share2 className="w-5 h-5" />, label: "Parrainer un ami", desc: "Gagnez 10% de réduction", href: "#", color: "purple" },
  { icon: <HelpCircle className="w-5 h-5" />, label: "Centre d'aide", desc: "Consultez la FAQ", href: "#", color: "slate" },
];

export default function QuickActions() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
      <h3 className="font-display font-black text-xl text-slate-900 dark:text-white mb-8 uppercase tracking-tight">Actions Rapides</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        {actions.map((action, i) => (
          <Link 
            key={i} 
            href={action.href}
            className="group p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all"
          >
            <div className={`w-10 h-10 rounded-2xl bg-${action.color}-50 dark:bg-${action.color}-900/20 flex items-center justify-center text-${action.color}-600 dark:text-${action.color}-400 mb-4 transition-transform group-hover:scale-110`}>
              {action.icon}
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{action.label}</h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-snug">{action.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
