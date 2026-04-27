"use client";

import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import UserHeader from "@/components/dashboard/user-header";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, ArrowLeft, Plus, Clock, CheckCircle2, MessageSquare, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  category: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: any;
}

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export default function TicketListPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "tickets"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SupportTicket[]);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "tickets"));

    return () => unsubscribe();
  }, [user]);

  const getStatusConfig = (status: SupportTicket["status"]) => {
    switch (status) {
      case "open": return { label: "Ouvert", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-900/20", icon: <Clock className="w-4 h-4" /> };
      case "in_progress": return { label: "En cours", color: "text-indigo-500", bg: "bg-indigo-50 dark:bg-indigo-900/20", icon: <MessageSquare className="w-4 h-4" /> };
      case "resolved": return { label: "Résolu", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20", icon: <CheckCircle2 className="w-4 h-4" /> };
      default: return { label: status, color: "text-slate-500", bg: "bg-slate-50", icon: <Clock className="w-4 h-4" /> };
    }
  };

  if (authLoading) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <UserHeader />

      <main className="flex-1 max-w-5xl mx-auto px-6 py-12 w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <button 
              onClick={() => router.push("/support")}
              className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-600 transition-colors group mb-4"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Support Hub
            </button>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Mes Tickets Support</h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Suivez vos demandes d&apos;assistance NOVA+.</p>
          </div>
          
          <Link 
            href="/support/new"
            className="h-14 px-8 bg-blue-600 text-white rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nouveau Ticket
          </Link>
        </header>

        {loading ? (
           <div className="flex flex-col items-center justify-center py-24">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Chargement des tickets...</p>
           </div>
        ) : tickets.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-16 text-center border border-slate-100 dark:border-slate-800 shadow-sm">
             <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-3xl flex items-center justify-center text-slate-300 mx-auto mb-8">
               <Ticket className="w-10 h-10" />
             </div>
             <h3 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">Aucun ticket ouvert</h3>
             <p className="text-slate-500 dark:text-slate-400 font-medium max-w-sm mx-auto mb-10">
               Vous n&apos;avez pas encore de demande en cours. Si vous rencontrez un problème, ouvrez un ticket technique.
             </p>
             <Link 
                href="/support/new"
                className="inline-flex h-14 px-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl items-center font-black text-xs uppercase tracking-widest transition-all"
              >
                Ouvrir mon premier ticket
              </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {tickets.map((ticket, i) => {
                const config = getStatusConfig(ticket.status);
                return (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:translate-x-1 hover:border-blue-600/20 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                           <div className={`px-3 py-1 rounded-full ${config.bg} ${config.color} border border-current/10 font-black text-[9px] uppercase tracking-widest flex items-center gap-2`}>
                              {config.icon}
                              {config.label}
                           </div>
                           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest truncate">
                             Ref #{ticket.id.slice(0, 8)} • {ticket.category.replace('_', ' ').toUpperCase()}
                           </span>
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight mb-1 truncate group-hover:text-blue-600 transition-colors">
                          {ticket.subject}
                        </h3>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400 line-clamp-1">
                          {ticket.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </main>
    </div>
  );
}
