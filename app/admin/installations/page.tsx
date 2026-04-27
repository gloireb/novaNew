"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, updateDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UserHeader from "@/components/dashboard/user-header";
import { motion, AnimatePresence } from "motion/react";
import { 
  HardHat, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Filter,
  MoreVertical,
  ChevronRight,
  User,
  Phone
} from "lucide-react";

interface Installation {
  id: string;
  userId: string;
  userName: string;
  address: string;
  city: string;
  status: "pending" | "scheduled" | "in_progress" | "installed" | "failed";
  preferredDate: string;
  scheduledDate?: any;
  technicianId?: string;
  technicianName?: string;
  notes?: string;
  createdAt: any;
}

interface Technician {
  id: string;
  name: string;
  phone: string;
  status: "available" | "busy" | "offline";
}

export default function AdminInstallationsPage() {
  const [installations, setInstallations] = useState<Installation[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInst, setSelectedInst] = useState<Installation | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "installations"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setInstallations(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Installation[]);
      setLoading(false);
    });

    // Mock tech list if empty
    const tq = query(collection(db, "technicians"));
    const unsubTech = onSnapshot(tq, (snapshot) => {
      if (snapshot.empty) {
        // Seed some technicians
        const initialTechs = [
          { id: "tech1", name: "Jean Kabamba", phone: "0812345678", status: "available" },
          { id: "tech2", name: "Marc Mwamba", phone: "0823456789", status: "busy" },
          { id: "tech3", name: "Sarah Lualaba", phone: "0854567890", status: "available" },
        ];
        initialTechs.forEach(t => setDoc(doc(db, "technicians", t.id), { ...t, createdAt: serverTimestamp() }));
      } else {
        setTechnicians(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Technician[]);
      }
    });

    return () => { unsubscribe(); unsubTech(); };
  }, []);

  const handleAssign = async (tech: Technician) => {
    if (!selectedInst) return;

    try {
      await updateDoc(doc(db, "installations", selectedInst.id), {
        technicianId: tech.id,
        technicianName: tech.name,
        status: "scheduled",
        scheduledDate: serverTimestamp(), // In real app, would be a picked date
        updatedAt: serverTimestamp()
      });
      setShowAssignModal(false);
      setSelectedInst(null);
    } catch (error) {
      console.error("Assign error:", error);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await updateDoc(doc(db, "installations", id), {
        status,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Status update error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <UserHeader />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Gestion Installations</h1>
            <p className="text-slate-500 font-medium tracking-tight">Coordonnez les déploiements terrain NOVA+.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Rechercher un client..."
                className="h-12 bg-white dark:bg-slate-900 rounded-2xl pl-12 pr-6 border border-slate-100 dark:border-slate-800 font-bold text-xs outline-none focus:border-blue-600/20 transition-all w-64"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-4">
            {installations.map((inst) => (
              <motion.div 
                layout
                key={inst.id}
                className={`bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 transition-all cursor-pointer ${
                  selectedInst?.id === inst.id ? "border-blue-600" : "border-transparent"
                }`}
                onClick={() => setSelectedInst(inst)}
              >
                <div className="flex items-center justify-between gap-4 mb-6">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{inst.userName}</h4>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{inst.id.slice(0,8)}</p>
                      </div>
                   </div>
                   <div className={`px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-widest ${
                     inst.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                     inst.status === 'scheduled' ? 'bg-blue-100 text-blue-600' :
                     'bg-emerald-100 text-emerald-600'
                   }`}>
                     {inst.status}
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-bold text-slate-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span>Prévu: {inst.preferredDate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="truncate">{inst.address}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                   <div className="flex items-center gap-2">
                     <User className="w-4 h-4 text-slate-400" />
                     <span className="text-[10px] font-black uppercase text-slate-900 dark:text-white">
                        {inst.technicianName || "Non assigné"}
                     </span>
                   </div>
                   <div className="flex gap-2">
                      <button 
                        onClick={(e) => { e.stopPropagation(); setSelectedInst(inst); setShowAssignModal(true); }}
                        className="h-10 px-4 rounded-xl bg-slate-900 dark:bg-blue-600 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-slate-900/10 active:scale-95 transition-all"
                      >
                        Assigner
                      </button>
                      <button 
                        onClick={(e) => { e.stopPropagation(); updateStatus(inst.id, "installed"); }}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                      </button>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Side Info */}
          <div className="space-y-8">
             <div className="bg-slate-900 dark:bg-blue-900/20 text-white p-8 rounded-[2.5rem] shadow-xl">
                <HardHat className="w-10 h-10 mb-6 text-blue-400" />
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Résumé Tech</h3>
                <div className="space-y-4 mt-8">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Disponibles</span>
                    <span className="text-2xl font-black">{technicians.filter(t => t.status === 'available').length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">En mission</span>
                    <span className="text-2xl font-black">{technicians.filter(t => t.status === 'busy').length}</span>
                  </div>
                </div>
             </div>

             <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800">
                <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 border-b border-slate-50 dark:border-slate-800 pb-4">Activité Récente</h3>
                <div className="space-y-6">
                   {[1,2,3].map(i => (
                     <div key={i} className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-400">
                          {i}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">Installation #0{i} terminée</p>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Il y a {i*2}h</p>
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* Assign Modal */}
      <AnimatePresence>
        {showAssignModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAssignModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 text-center">Assigner un Expert</h3>
              <p className="text-slate-500 font-medium text-center mb-10">Sélectionnez le technicien disponible pour cette intervention.</p>
              
              <div className="space-y-4">
                {technicians.map((tech) => (
                  <button 
                    key={tech.id}
                    onClick={() => handleAssign(tech)}
                    disabled={tech.status !== 'available'}
                    className={`w-full flex items-center justify-between p-6 rounded-3xl border-2 transition-all group ${
                      tech.status === 'available' 
                        ? 'border-slate-50 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-blue-600/20 hover:translate-x-2'
                        : 'opacity-50 grayscale cursor-not-allowed border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400">
                        <User className="w-6 h-6" />
                      </div>
                      <div className="text-left">
                        <p className="font-black text-slate-900 dark:text-white uppercase tracking-tight">{tech.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{tech.phone}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] ${
                      tech.status === 'available' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
                    }`}>
                      {tech.status}
                    </div>
                  </button>
                ))}
              </div>

              <button 
                onClick={() => setShowAssignModal(false)}
                className="w-full mt-10 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Annuler
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
