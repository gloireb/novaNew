"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion } from "motion/react";
import { 
  Users, 
  CreditCard, 
  MapPin, 
  Ticket, 
  ArrowUpRight, 
  ArrowDownRight,
  TrendingUp,
  Activity,
  ChevronRight
} from "lucide-react";
import Link from "next/link";

interface Stats {
  users: number;
  payments: number;
  installations: number;
  tickets: number;
  revenue: number;
}

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ users: 0, payments: 0, installations: 0, tickets: 0, revenue: 0 });

  useEffect(() => {
    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      setStats(prev => ({ ...prev, users: snap.size }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "users"));

    const unsubPayments = onSnapshot(collection(db, "payments"), (snap) => {
      const total = snap.docs.reduce((acc, doc) => {
        const data = doc.data();
        const amtStr = typeof data.amount === 'string' ? data.amount : '0';
        const amt = parseFloat(amtStr.replace('$', '') || '0');
        return acc + amt;
      }, 0);
      setStats(prev => ({ ...prev, payments: snap.size, revenue: total }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "payments"));

    const unsubInst = onSnapshot(collection(db, "installations"), (snap) => {
      setStats(prev => ({ ...prev, installations: snap.size }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "installations"));

    const unsubTickets = onSnapshot(collection(db, "tickets"), (snap) => {
      setStats(prev => ({ ...prev, tickets: snap.size }));
    }, (error) => handleFirestoreError(error, OperationType.LIST, "tickets"));

    return () => {
      unsubUsers(); unsubPayments(); unsubInst(); unsubTickets();
    };
  }, []);

  const statCards = [
    { label: "Utilisateurs", value: stats.users, icon: <Users className="w-6 h-6" />, color: "blue", trend: "+12%" },
    { label: "Revenu Total", value: `$${stats.revenue.toLocaleString()}`, icon: <TrendingUp className="w-6 h-6" />, color: "emerald", trend: "+8.4%" },
    { label: "Installations", value: stats.installations, icon: <MapPin className="w-6 h-6" />, color: "indigo", trend: "-2%" },
    { label: "Support Tickets", value: stats.tickets, icon: <Ticket className="w-6 h-6" />, color: "amber", trend: "+4" },
  ];

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Control Center</h1>
        <p className="text-slate-500 font-medium tracking-tight">Vue d&apos;ensemble de NOVA+ Connect v1.0</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${card.color}-500/5 -mr-16 -mt-16 rounded-full blur-3xl transition-transform group-hover:scale-150`}></div>
            <div className={`w-12 h-12 rounded-2xl bg-${card.color}-50 dark:bg-${card.color}-900/20 text-${card.color}-600 dark:text-${card.color}-400 flex items-center justify-center mb-6`}>
              {card.icon}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{card.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none tracking-tight">{card.value}</h3>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${
                card.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'
              }`}>
                {card.trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {card.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-10 text-center sm:text-left">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Revenue Metrics</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Growth last 30 days</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl">
               <Activity className="w-4 h-4 text-emerald-500" />
               <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Activity</span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-3 px-4">
             {[40, 60, 45, 70, 50, 85, 65, 90, 75, 100, 80, 95].map((h, i) => (
                <div key={i} className="flex-1 bg-slate-50 dark:bg-slate-800 rounded-t-xl relative group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    className="absolute bottom-0 left-0 right-0 bg-blue-600 rounded-t-xl group-hover:bg-blue-500 transition-colors"
                  />
                </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 dark:bg-blue-900/20 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full">
            <Ticket className="w-10 h-10 text-blue-400 mb-8" />
            <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Support Stack</h3>
            <p className="text-slate-400 font-medium leading-relaxed mb-10">
              {stats.tickets} tickets actifs en attente de réponse technique.
            </p>
            <div className="mt-auto">
              <Link 
                href="/admin/support"
                className="inline-flex items-center gap-3 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:translate-x-2 transition-all"
              >
                Gérer les tickets <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
