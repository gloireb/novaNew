"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { Ticket, MessageSquare, Clock, CheckCircle2, User, Loader2 } from "lucide-react";

interface SupportTicket {
  id: string;
  userName: string;
  subject: string;
  description: string;
  status: "open" | "in_progress" | "resolved";
  createdAt: any;
}

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, "tickets"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTickets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as SupportTicket[]);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "tickets"));
    return () => unsubscribe();
  }, []);

  const updateStatus = async (ticketId: string, newStatus: string) => {
    setUpdatingId(ticketId);
    try {
      await updateDoc(doc(db, "tickets", ticketId), { status: newStatus, updatedAt: serverTimestamp() });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `tickets/${ticketId}`);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="p-8 lg:p-12">
      <header className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Helpdesk</h1>
      </header>

      <div className="grid gap-6">
        {tickets.map(ticket => (
          <div key={ticket.id} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col gap-4">
             <div className="flex justify-between">
                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase">{ticket.subject}</h3>
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${ticket.status === 'open' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>{ticket.status}</span>
             </div>
             <p className="text-slate-500 font-medium">{ticket.description}</p>
             <div className="flex justify-between items-center mt-4">
                <span className="text-xs font-bold text-slate-400">Par: {ticket.userName}</span>
                <div className="flex gap-2">
                   {["open", "in_progress", "resolved"].map(s => (
                      <button 
                        key={s} 
                        onClick={() => updateStatus(ticket.id, s)}
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-2 rounded-xl border ${ticket.status === s ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}
                      >
                         {s}
                      </button>
                   ))}
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
