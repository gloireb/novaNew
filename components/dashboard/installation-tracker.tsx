"use client";

import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { MapPin, Calendar, User as UserIcon, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Installation {
  id: string;
  status: "pending" | "scheduled" | "in_progress" | "installed" | "failed";
  address: string;
  city: string;
  preferredDate: string;
  scheduledDate?: any;
  technicianName?: string;
  createdAt: any;
}

export default function InstallationTracker() {
  const { user } = useAuth();
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "installations"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Installation[];
      setInstallations(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return null;
  if (installations.length === 0) return null;

  const getStatusConfig = (status: Installation["status"]) => {
    switch (status) {
      case "pending": return { label: "En attente", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-900/20", icon: <Clock className="w-4 h-4" /> };
      case "scheduled": return { label: "Planifiée", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", icon: <Calendar className="w-4 h-4" /> };
      case "in_progress": return { label: "En cours", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20", icon: <Loader2 className="w-4 h-4 animate-spin" /> };
      case "installed": return { label: "Terminée", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: <CheckCircle2 className="w-4 h-4" /> };
      case "failed": return { label: "Échouée", color: "text-red-500", bg: "bg-red-50 dark:bg-red-900/20", icon: <AlertCircle className="w-4 h-4" /> };
      default: return { label: "Inconnu", color: "text-slate-500", bg: "bg-slate-50", icon: <Clock className="w-4 h-4" /> };
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
      <h3 className="font-display font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight mb-8">Installation Terrain</h3>
      
      <div className="space-y-6">
        {installations.map((inst) => {
          const config = getStatusConfig(inst.status);
          return (
            <div key={inst.id} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-800 pb-8 last:pb-0">
              <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full ${config.bg} flex items-center justify-center ring-4 ring-white dark:ring-slate-900`}>
                <div className={`w-2 h-2 rounded-full ${config.color.replace('text-', 'bg-')}`}></div>
              </div>
              
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-6 transition-all hover:translate-x-1 border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${config.bg} ${config.color} border-current/10 font-black text-[10px] uppercase tracking-widest`}>
                    {config.icon}
                    {config.label}
                  </div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                    ID #{inst.id.slice(0, 8)}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Localisation</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">{inst.address}, {inst.city}</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 shadow-sm">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Passage Prévu</p>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {inst.scheduledDate ? new Date(inst.scheduledDate.seconds * 1000).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : (inst.preferredDate || "À confirmer")}
                      </p>
                    </div>
                  </div>

                  {inst.technicianName && (
                    <div className="flex gap-4 col-span-full pt-4 border-t border-slate-100 dark:border-slate-800">
                      <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shadow-sm">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Technicien Assigné</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{inst.technicianName} <span className="text-slate-400 font-medium ml-2">- NOVA+ Field Lead</span></p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const Loader2 = ({ className }: { className?: string }) => <Clock className={className} />;
