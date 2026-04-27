"use client";

import { useState, useEffect } from "react";
import { collection, query, onSnapshot, orderBy, updateDoc, doc, serverTimestamp, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import UserHeader from "@/components/dashboard/user-header";
import { motion, AnimatePresence } from "motion/react";
import { 
  UserPlus, 
  Phone, 
  MapPin, 
  Trash2, 
  MoreVertical, 
  Search, 
  Plus, 
  Check, 
  X,
  Smartphone,
  HardHat,
  Loader2
} from "lucide-react";

interface Technician {
  id: string;
  name: string;
  phone: string;
  city: string;
  status: "available" | "busy" | "offline";
  createdAt: any;
}

import { handleFirestoreError, OperationType } from "@/lib/firebase-utils";

export default function AdminTechniciansPage() {
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("Likasi");

  useEffect(() => {
    const q = query(collection(db, "technicians"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTechnicians(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Technician[]);
      setLoading(false);
    }, (error) => handleFirestoreError(error, OperationType.LIST, "technicians"));
    return () => unsubscribe();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const techId = `TECH-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;
      await setDoc(doc(db, "technicians", techId), {
        id: techId,
        name,
        phone,
        city,
        status: "available",
        createdAt: serverTimestamp()
      });
      setShowAddModal(false);
      setName(""); setPhone("");
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `technicians`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTech = async (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce technicien ?")) {
      try {
        await deleteDoc(doc(db, "technicians", id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `technicians/${id}`);
      }
    }
  };

  const toggleStatus = async (tech: Technician) => {
    const nextStatusMap = {
      available: "busy",
      busy: "offline",
      offline: "available"
    } as const;
    
    try {
      await updateDoc(doc(db, "technicians", tech.id), {
        status: nextStatusMap[tech.status]
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `technicians/${tech.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      <UserHeader />

      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">Techniciens Terrain</h1>
            <p className="text-slate-500 font-medium tracking-tight">Gérez votre flotte d&apos;experts NOVA+.</p>
          </div>
          
          <button 
            onClick={() => setShowAddModal(true)}
            className="h-14 px-8 bg-blue-600 text-white rounded-2xl flex items-center gap-3 font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5" />
            Nouveau Technicien
          </button>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {technicians.map((tech) => (
              <motion.div 
                layout
                key={tech.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm group hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all"
              >
                <div className="flex justify-between items-start mb-8">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 mb-4 transition-transform group-hover:scale-110">
                    <UserPlus className="w-8 h-8" />
                  </div>
                  <button 
                    onClick={() => deleteTech(tech.id)}
                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4">{tech.name}</h3>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span>{tech.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-bold text-slate-500">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span>{tech.city || "Likasi"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 pt-6 border-t border-slate-50 dark:border-slate-800">
                  <button 
                    onClick={() => toggleStatus(tech)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      tech.status === 'available' ? 'bg-emerald-50 text-emerald-600' :
                      tech.status === 'busy' ? 'bg-amber-50 text-amber-600' :
                      'bg-slate-100 text-slate-600'
                    }`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      tech.status === 'available' ? 'bg-emerald-500' :
                      tech.status === 'busy' ? 'bg-amber-500' :
                      'bg-slate-500'
                    }`} />
                    {tech.status}
                  </button>
                  <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{tech.id}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* Add Tech Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-950 rounded-[3rem] p-10 shadow-2xl border border-slate-100 dark:border-slate-800"
            >
              <h3 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2 text-center">Nouveau Technicien</h3>
              <p className="text-slate-500 font-medium text-center mb-10">Enregistrez un nouvel expert dans la base de données.</p>
              
              <form onSubmit={handleCreate} className="space-y-6">
                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Nom Complet</label>
                  <input 
                    type="text"
                    required
                    placeholder="Jean-Pierre Kasongo"
                    className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-8 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Téléphone</label>
                  <input 
                    type="tel"
                    required
                    placeholder="0810000000"
                    className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-8 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-600/20 transition-all"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-2 block">Ville de Base</label>
                  <select 
                    className="w-full h-16 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-3xl px-8 font-bold text-slate-900 dark:text-white outline-none appearance-none"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  >
                    <option value="Likasi">Likasi</option>
                    <option value="Lubumbashi">Lubumbashi</option>
                    <option value="Kolwezi">Kolwezi</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Ajouter Technicien"}
                </button>
              </form>

              <button 
                onClick={() => setShowAddModal(false)}
                className="w-full mt-6 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600 transition-colors"
              >
                Fermer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
