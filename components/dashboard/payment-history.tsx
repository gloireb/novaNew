"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { CheckCircle2, Clock, XCircle, Smartphone } from "lucide-react";

interface Transaction {
  id: string;
  amount: string;
  method: string;
  status: "completed" | "pending" | "failed";
  createdAt: any;
}

export default function PaymentHistory() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "payments"),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Transaction[];
      setTransactions(docs);
      setLoading(false);
    }, (error) => {
        console.error("Payment history error:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) return null;
  if (transactions.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
      <h3 className="font-display font-black text-xl text-slate-900 dark:text-white uppercase tracking-tight mb-8">Dernières Transactions</h3>
      
      <div className="space-y-4">
        {transactions.map((tx) => (
          <div 
            key={tx.id} 
            className="flex items-center justify-between p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                tx.method === "mpesa" ? "bg-red-50 text-red-600" :
                tx.method === "airtel" ? "bg-red-50 text-red-600" :
                tx.method === "orange" ? "bg-orange-50 text-orange-600" :
                "bg-blue-50 text-blue-600"
              }`}>
                <Smartphone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
                  {tx.method.toUpperCase()} - {tx.amount}
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  ID: {tx.id}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</p>
                <p className={`text-xs font-black uppercase tracking-tight ${
                  tx.status === "completed" ? "text-emerald-500" :
                  tx.status === "pending" ? "text-amber-500" :
                  "text-red-500"
                }`}>
                  {tx.status === "completed" ? "Validé" : tx.status === "pending" ? "En cours" : "Échoué"}
                </p>
              </div>
              <div className={`${
                tx.status === "completed" ? "text-emerald-500" :
                tx.status === "pending" ? "text-amber-500" :
                "text-red-500"
              }`}>
                {tx.status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : 
                 tx.status === "pending" ? <Clock className="w-5 h-5" /> : 
                 <XCircle className="w-5 h-5" />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
