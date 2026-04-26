import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Users, Wifi, DollarSign, Activity, Settings, Radio, Bell, ArrowUpRight, Search, Menu } from 'lucide-react';
import { LOGO_URL } from '../../constants';
import { motion, AnimatePresence } from 'framer-motion';

const KPICard = ({ title, value, change, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: delay * 0.1 }}
    className="bg-white p-8 rounded-[2rem] border border-gray-200 shadow-premium relative overflow-hidden group"
  >
    <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-600/[0.02] rounded-full group-hover:scale-150 transition-transform duration-700"></div>
    <div className="flex justify-between items-start mb-6 relative z-10">
      <div className="w-12 h-12 bg-blue-600/5 text-blue-600 rounded-xl flex items-center justify-center">
        <Icon size={24} />
      </div>
      {change && (
        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full ${change.startsWith('+') ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
          {change}
        </span>
      )}
    </div>
    <div className="relative z-10">
      <p className="text-[9px] text-gray-500 font-black uppercase tracking-widest mb-2">{title}</p>
      <h3 className="text-4xl font-display font-black text-gray-900 tracking-tighter italic">{value}</h3>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeMenu, setActiveMenu] = useState('overview');

  // Strict route protection
  if (!user && !localStorage.getItem('token')) {
     return <Navigate to="/login" />;
  }
  
  if (user && user.role !== 'ADMIN') {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
         <div className="bg-white p-12 rounded-[2.5rem] shadow-long-fall text-center max-w-md border border-gray-200">
           <div className="w-16 h-16 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
             <Settings size={28} />
           </div>
           <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-4">Accès Refusé</h2>
           <p className="text-gray-500 text-sm font-body leading-relaxed mb-8">
             Votre niveau d'accréditation ne vous permet pas d'accéder au centre de commandement NOVA+.
           </p>
           <button onClick={() => window.location.href='/dashboard'} className="btn-primary w-full py-4 text-[10px]">
             Retour au Portail Client
           </button>
         </div>
       </div>
     );
  }

  const navItems = [
    { id: 'overview', label: 'Vue Globale', icon: Activity },
    { id: 'clients', label: 'Réseau Clients', icon: Users },
    { id: 'offres', label: 'Stratégie Offres', icon: Wifi },
    { id: 'commandes', label: 'Flux Financier', icon: DollarSign },
    { id: 'equipements', label: 'Constellation', icon: Radio },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-display flex">
      {/* Admin Sidebar */}
      <aside className="w-72 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 z-20 shadow-premium">
        <div className="p-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <img src={LOGO_URL} alt="NOVA+" className="w-6 h-6 object-contain brightness-0 invert" />
             </div>
             <div>
                <span className="font-display font-black text-xl tracking-tighter uppercase italic block leading-none">NOVA<span className="text-blue-600 not-italic">+</span></span>
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-blue-600">Admin Control</span>
             </div>
          </div>
        </div>
        
        <nav className="flex-1 p-6 space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`flex items-center gap-4 w-full p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
                  activeMenu === item.id 
                  ? 'bg-gray-900 text-white shadow-lg' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {activeMenu === item.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600"></div>}
                <Icon size={18} className={activeMenu === item.id ? 'text-blue-600' : 'group-hover:text-blue-600 transition-colors'} />
                <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="p-6 border-t border-gray-200 bg-white">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-blue-600/10 text-blue-600 flex items-center justify-center font-black text-xs">
                   AD
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase tracking-widest leading-none">ROOT</p>
                    <p className="text-[8px] text-gray-500 uppercase tracking-widest mt-1">Super Admin</p>
                 </div>
              </div>
              <button onClick={() => { logout(); window.location.href='/login'; }} className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error/20 transition-colors">
                 <Settings size={14} />
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-72 p-10 flex flex-col min-h-screen">
        
        {/* Topbar */}
        <header className="flex justify-between items-center mb-12 bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm">
           <h2 className="text-2xl font-display font-black uppercase italic tracking-tighter">
              {navItems.find(i => i.id === activeMenu)?.label}
           </h2>
           <div className="flex items-center gap-6">
              <div className="relative group">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                 <input type="text" placeholder="Recherche globale..." className="pl-12 pr-4 py-3 bg-gray-50 rounded-full text-xs font-bold w-64 outline-none focus:ring-2 ring-blue-600/20 transition-all border border-transparent" />
              </div>
              <button className="relative w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 transition-colors">
                 <Bell size={18} />
                 <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse shadow-[0_0_8px_rgba(244,67,54,0.6)]"></span>
              </button>
           </div>
        </header>

        <AnimatePresence mode="wait">
        {activeMenu === 'overview' && (
          <motion.div 
             key="overview"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: -20 }}
             className="flex-1"
          >
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              <KPICard title="Connexions Actives" value="1,248" change="+12.5%" icon={Users} delay={1} />
              <KPICard title="Volume Transféré" value="45 TB" change="+8.2%" icon={Activity} delay={2} />
              <KPICard title="Revenu Mensuel" value="$124K" change="+5.4%" icon={DollarSign} delay={3} />
              <KPICard title="Uptime Réseau" value="99.9%" change="Optimal" icon={Wifi} delay={4} />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
               {/* Recent Users Table */}
               <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-gray-200 p-8 shadow-long-fall">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Déploiements Récents</h3>
                    <button className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:underline">Voir tout <ArrowUpRight size={12} className="inline"/></button>
                 </div>
                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-200 text-[9px] font-black uppercase tracking-widest text-gray-400">
                          <th className="pb-4 pt-2">ID Client</th>
                          <th className="pb-4 pt-2">Localisation</th>
                          <th className="pb-4 pt-2">Plan</th>
                          <th className="pb-4 pt-2 text-right">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm font-bold divide-y divide-on-surface/[0.03]">
                        {[
                          { id: '#CLI-892', loc: 'Likasi Centre', plan: 'Populaire', status: 'Actif', ok: true },
                          { id: '#CLI-893', loc: 'Kikula', plan: 'Essentiel', status: 'En attente', ok: false },
                          { id: '#CLI-894', loc: 'Panda', plan: 'Famille', status: 'Actif', ok: true },
                        ].map((row, i) => (
                           <tr key={i} className="hover:bg-gray-50 transition-colors group">
                              <td className="py-4">
                                 <span className="font-display italic text-base">{row.id}</span>
                              </td>
                              <td className="py-4 text-gray-600">{row.loc}</td>
                              <td className="py-4">
                                 <span className="px-3 py-1 bg-blue-600/5 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest">{row.plan}</span>
                              </td>
                              <td className="py-4 text-right">
                                 <span className={`text-[10px] font-black uppercase tracking-widest ${row.ok ? 'text-success' : 'text-error'}`}>{row.status}</span>
                              </td>
                           </tr>
                        ))}
                      </tbody>
                    </table>
                 </div>
               </div>
               
               {/* Satellite Status */}
               <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-600/20 text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
                 <Radio size={120} className="absolute -bottom-10 -right-10 opacity-10" />
                 
                 <h3 className="text-xl font-display font-black uppercase italic tracking-tighter mb-8 relative z-10">Télémétrie Orbitale</h3>
                 
                 <div className="space-y-8 relative z-10">
                    <div>
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2 opacity-80">
                         <span>Liaison Montante (TX)</span>
                         <span className="text-[#00FF00]">100%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                         <div className="h-full bg-[#00FF00] w-full rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[9px] font-black uppercase tracking-widest mb-2 opacity-80">
                         <span>Liaison Descendante (RX)</span>
                         <span className="text-[#00FF00]">92%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                         <div className="h-full bg-[#00FF00] w-[92%] rounded-full"></div>
                      </div>
                    </div>
                    
                    <div className="p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 mt-8">
                      <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Conditions Locales (Likasi)</p>
                      <div className="flex justify-between items-end">
                         <span className="font-display font-black text-2xl italic tracking-tighter">Dégagé</span>
                         <span className="text-xs font-bold text-[#00FF00]">Impact 0%</span>
                      </div>
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        )}

        {activeMenu !== 'overview' && (
          <motion.div 
            key="wip"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex-1 bg-white rounded-[2.5rem] border border-gray-200 flex flex-col items-center justify-center text-center p-12"
          >
             <div className="w-24 h-24 bg-blue-600/5 text-blue-600/40 rounded-full flex items-center justify-center mb-6">
                <Settings size={40} className="animate-spin-slow" />
             </div>
             <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter mb-4">Initialisation en cours</h3>
             <p className="text-gray-500 text-sm font-body max-w-md leading-relaxed">
               Le module de gestion détaillé pour <span className="font-black text-gray-600">"{navItems.find(i => i.id === activeMenu)?.label}"</span> est en cours de déploiement sécurisé.
             </p>
          </motion.div>
        )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default AdminDashboard;
