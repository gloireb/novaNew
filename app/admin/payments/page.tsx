"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { motion, AnimatePresence } from "motion/react";
import { CreditCard, DollarSign, Clock, ArrowDownLeft } from "lucide-react";

interface Payment {
  id: string;
  userName: string;
  planName: string;
  amount: string;
  method: string;
  status: string;
  paymentDate: any;
}

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "payments"), orderBy("paymentDate", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Payment[];
      setPayments(docs);
      const total = docs.reduce((acc, p) => acc + parseFloat(p.amount?.replace('$', '') || '0'), 0);
      setTotalRevenue(total);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Paiements</h1>
          <p className="text-slate-500 font-medium tracking-tight">Revenu Total: ${totalRevenue.toLocaleString()}</p>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
           <thead>
             <tr className="border-b border-slate-50 dark:border-slate-800/50">
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant</th>
               <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Date</th>
             </tr>
           </thead>
           <tbody>
             {payments.map(p => (
               <tr key={p.id} className="border-b border-slate-50 dark:border-slate-800/50">
                 <td className="px-8 py-6 font-bold text-slate-900 dark:text-white">{p.userName}</td>
                 <td className="px-8 py-6 font-black text-emerald-500">{p.amount}</td>
                 <td className="px-8 py-6 text-right text-xs text-slate-400">{p.paymentDate?.toDate()?.toLocaleDateString()}</td>
               </tr>
             ))}
           </tbody>
        </table>
      </div>
    </div>
  );
}
