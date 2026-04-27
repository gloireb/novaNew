"use client";

import { useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy, doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/hooks/use-auth";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users as UsersIcon, 
  Search, 
  MoreVertical, 
  Shield, 
  Ban, 
  CheckCircle2,
  Mail,
  Calendar,
  Filter,
  Loader2
} from "lucide-react";

interface UserProfile {
  id: string;
  displayName: string;
  email: string;
  role: string;
  createdAt: any;
  subscription?: string;
}

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const { isAdmin } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "users"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUsers(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as UserProfile[]);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "users"));
    return () => unsubscribe();
  }, []);

  const promoteToAdmin = async (userId: string) => {
    if (!isAdmin) return;
    setActionLoading(userId);
    try {
      await updateDoc(doc(db, "users", userId), {
        role: "admin",
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `users/${userId}`);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = users.filter(u => 
    u.displayName?.toLowerCase().includes(search.toLowerCase()) || 
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Utilisateurs</h1>
          <p className="text-slate-500 font-medium tracking-tight">Gestion des {users.length} clients NOVA+ Connect</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Rechercher un client..."
              className="w-72 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 h-14 pl-12 pr-4 rounded-2xl text-sm font-bold transition-all outline-none focus:border-blue-600/20 shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600" />
          </div>
        </div>
      </header>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800/50">
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Client</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Rôle & Pack</th>
                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.tr 
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                  >
                    <td className="px-8 py-6">
                       <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{user.displayName || user.email}</p>
                       <p className="text-[10px] text-slate-400">{user.email}</p>
                    </td>
                    <td className="px-8 py-6">
                       <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${user.role === 'admin' ? 'bg-red-50 text-red-600 dark:bg-red-900/20' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/20'}`}>
                          {user.role || "Client"}
                       </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          {user.role !== 'admin' && (
                             <button 
                               onClick={() => promoteToAdmin(user.id)}
                               className="p-2 text-slate-400 hover:text-blue-600 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                               title="Promouvoir Admin"
                               disabled={actionLoading === user.id}
                             >
                               {actionLoading === user.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Shield className="w-4 h-4" />}
                             </button>
                          )}
                          <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"><Ban className="w-4 h-4" /></button>
                       </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
