import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  Activity, 
  FileText, 
  HelpCircle, 
  CreditCard, 
  LogOut, 
  Settings, 
  User as UserIcon,
  ChevronRight,
  ShieldCheck,
  Zap,
  Smartphone,
  Laptop,
  Tv,
  Wallet,
  ArrowUpRight,
  MapPin,
  Clock,
  Ticket
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DeviceItem = ({ icon: Icon, name, type, status }) => (
  <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl border border-transparent hover:border-primary/10 transition-all group">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-on-surface/40 group-hover:text-primary transition-colors">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-xs font-black uppercase tracking-tight">{name}</p>
        <p className="text-[10px] font-bold text-on-surface/30 uppercase tracking-widest">{type}</p>
      </div>
    </div>
    <div className="flex items-center gap-2">
      <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse shadow-[0_0_8px_rgba(76,175,80,0.8)]"></div>
      <span className="text-[10px] font-black text-success uppercase tracking-widest">{status}</span>
    </div>
  </div>
);

const TabButton = ({ active, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-on-surface text-surface shadow-lg' : 'text-on-surface/40 hover:bg-surface-container-low hover:text-on-surface'}`}
  >
    {label}
  </button>
);

const DashboardOverview = ({ user }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="space-y-8"
  >
    {/* Consumption Circle Section */}
    <div className="bg-surface-container-lowest p-10 rounded-[2rem] shadow-long-fall flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group border border-on-surface/[0.03]">
       <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.02] rounded-full translate-x-1/2 -translate-y-1/2 -z-0"></div>
       
       {/* CSS Circle Progress */}
       <div className="relative w-48 h-48 shrink-0">
          <svg className="w-full h-full transform -rotate-90">
             <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-surface-container-low" />
             <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.92} strokeDashoffset={552.92 * (1 - 0.75)} className="text-primary transition-all duration-1000 ease-out" strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
             <p className="text-4xl font-display font-black text-on-surface tracking-tighter">75%</p>
             <p className="text-[9px] font-black text-on-surface/30 uppercase tracking-widest">Utilisé</p>
          </div>
       </div>

       <div className="relative z-10 text-center md:text-left">
          <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-4">Volume de données consommé</h3>
          <p className="text-on-surface/50 text-sm font-body leading-relaxed mb-6">
             Vous avez utilisé 648 Go sur votre cycle actuel. Étant sur le forfait Illimité, votre vitesse reste optimale.
          </p>
          <div className="flex gap-8 justify-center md:justify-start">
             <div>
                <p className="text-[9px] font-black text-on-surface/30 uppercase tracking-widest mb-1">Session Actuelle</p>
                <p className="text-xl font-display font-black text-primary italic">12.4 GB</p>
             </div>
             <div>
                <p className="text-[9px] font-black text-on-surface/30 uppercase tracking-widest mb-1">Moyenne / Jour</p>
                <p className="text-xl font-display font-black text-on-surface italic">21.0 GB</p>
             </div>
          </div>
       </div>
    </div>

    {/* Service Details Grid */}
    <div className="grid md:grid-cols-2 gap-8">
       {/* Forfait Card */}
       <div className="bg-primary p-10 rounded-[2rem] text-white relative overflow-hidden shadow-2xl shadow-primary/20">
          <Zap size={100} className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-125 transition-transform duration-700" />
          <h4 className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-8 border-b border-white/10 pb-4 flex justify-between items-center">
             Mon Forfait Actuel
          </h4>
          <h2 className="text-4xl font-display font-black uppercase italic tracking-tighter mb-2">Populaire</h2>
          <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest mb-10">Vitesse Max: 50 Mbps</p>
          <div className="flex items-center gap-3">
             <div className="px-4 py-1.5 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">Actif</div>
             <p className="text-[9px] font-bold text-white/60">Renouvellement le 15.05</p>
          </div>
       </div>

       {/* Billing Card */}
       <div className="bg-surface-container-lowest p-10 rounded-[2rem] border border-on-surface/[0.03]">
          <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 mb-8 border-b border-on-surface/5 pb-4 flex justify-between items-center">
             Prochaine Facture
          </h4>
          <div className="flex items-center gap-5 mb-4">
             <div className="w-14 h-14 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                <Wallet size={24} />
             </div>
             <div>
                <p className="text-3xl font-display font-black text-on-surface tracking-tighter uppercase italic">$79.99</p>
                <p className="text-[9px] font-black text-on-surface/30 uppercase tracking-widest mt-1">Solde à payer selon cycle</p>
             </div>
          </div>
          <button className="w-full py-4 mt-6 bg-[#FFD700]/10 text-[#B8860B] rounded-xl font-display font-black text-[10px] uppercase tracking-widest border border-[#FFD700]/20 hover:bg-[#FFD700]/20 transition-all">
             Payer avec M-Pesa
          </button>
       </div>
    </div>
  </motion.div>
);

const InvoiceTab = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-surface-container-lowest rounded-[2rem] border border-on-surface/[0.03] overflow-hidden"
  >
    <div className="p-8 border-b border-on-surface/[0.03] flex justify-between items-center">
      <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Historique de facturation</h3>
      <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline">Télécharger tout</button>
    </div>
    <div className="divide-y divide-on-surface/[0.03]">
      {[
        { date: '15 Avril 2025', status: 'Payé', amount: '$79.99', id: 'INV-2025-04' },
        { date: '15 Mars 2025', status: 'Payé', amount: '$79.99', id: 'INV-2025-03' },
        { date: '15 Février 2025', status: 'Payé', amount: '$79.99', id: 'INV-2025-02' }
      ].map((inv, i) => (
        <div key={i} className="p-6 flex items-center justify-between hover:bg-surface-container-low transition-colors">
          <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center">
               <FileText size={18} />
             </div>
             <div>
               <p className="text-sm font-black uppercase italic tracking-tight text-on-surface">{inv.date}</p>
               <p className="text-[9px] font-bold uppercase tracking-widest text-on-surface/40">{inv.id}</p>
             </div>
          </div>
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-black uppercase tracking-widest text-success bg-success/10 px-3 py-1 rounded-full">{inv.status}</span>
             <span className="font-display font-black text-lg">{inv.amount}</span>
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

const SupportTab = () => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="space-y-6"
  >
    <div className="bg-surface-container-lowest rounded-[2rem] border border-on-surface/[0.03] p-8">
      <div className="flex justify-between items-center mb-8">
         <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Vos Tickets de Support</h3>
         <button className="px-6 py-2 bg-on-surface text-surface rounded-xl font-display font-black text-[9px] uppercase tracking-widest transition-all hover:opacity-90">Nouveau Ticket</button>
      </div>
      <div className="text-center py-16 opacity-50 grayscale">
         <Ticket size={48} className="mx-auto mb-4 text-on-surface/20" />
         <p className="text-sm font-bold uppercase tracking-widest text-on-surface/40">Aucun ticket ouvert.</p>
         <p className="text-[10px] text-on-surface/30 mt-2">Votre connexion est optimale.</p>
      </div>
    </div>
  </motion.div>
);

const TrackingTab = () => (
   <motion.div 
     initial={{ opacity: 0, scale: 0.95 }}
     animate={{ opacity: 1, scale: 1 }}
     exit={{ opacity: 0, scale: 0.95 }}
     className="bg-surface-container-lowest rounded-[2rem] border border-on-surface/[0.03] p-8 md:p-12"
   >
     <h3 className="text-xl font-display font-black uppercase italic tracking-tighter mb-8">Suivi d'Installation</h3>
     
     <div className="relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-1 bg-primary/10"></div>
        <div className="space-y-12">
           <div className="flex gap-6 relative z-10">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                 <CheckCircle2 size={24} />
              </div>
              <div className="pt-2 flex-1">
                 <h4 className="font-display font-black uppercase italic tracking-tighter text-on-surface mb-1">Commande Validée</h4>
                 <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-3">10 Avril 2025</p>
                 <p className="text-sm text-on-surface/60 font-body">Votre paiement d'activation a bien été reçu et votre compte est créé.</p>
              </div>
           </div>

           <div className="flex gap-6 relative z-10">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                 <MapPin size={24} />
              </div>
              <div className="pt-2 flex-1">
                 <h4 className="font-display font-black uppercase italic tracking-tighter text-on-surface mb-1">Équipement en transit</h4>
                 <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-3">En cours</p>
                 <p className="text-sm text-on-surface/60 font-body">Le matériel satellite (parabole + routeur) est en route vers Likasi.</p>
              </div>
           </div>

           <div className="flex gap-6 relative z-10 opacity-50">
              <div className="w-12 h-12 bg-surface-container-highest text-on-surface/40 rounded-full flex items-center justify-center shrink-0">
                 <Clock size={24} />
              </div>
              <div className="pt-2 flex-1">
                 <h4 className="font-display font-black uppercase italic tracking-tighter text-on-surface mb-1">Installation Technicien</h4>
                 <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-widest mb-3">Planifié</p>
                 <p className="text-sm text-on-surface/60 font-body">Notre équipe de techniciens procédera au pointage vers la constellation NOVA+.</p>
              </div>
           </div>
        </div>
     </div>
   </motion.div>
);


const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('forfait');

  if (!user && !localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className="bg-surface-container-low min-h-screen font-display pb-32">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[100px] -z-0"></div>
      
      <div className="max-w-7xl mx-auto px-6 pt-32 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 animate-in fade-in slide-in-from-top duration-700">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-success/10 rounded-full mb-6 border border-success/20">
               <div className="w-2 h-2 bg-success rounded-full animate-pulse shadow-[0_0_8px_rgba(76,175,80,0.8)]"></div>
               <span className="text-[9px] font-black uppercase tracking-widest text-success">Liaison Optimale</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-black text-on-surface leading-[0.8] tracking-tighter uppercase italic">
              Bon retour, <br /> <span className="text-primary not-italic">{user?.name || 'Client'}</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <button onClick={handleLogout} className="w-12 h-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-on-surface/40 hover:text-error hover:bg-error/10 transition-all border border-on-surface/[0.03] shadow-sm">
                <LogOut size={20} />
             </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 mb-8 bg-surface-container-lowest p-2 rounded-full border border-on-surface/[0.03] shadow-sm w-max max-w-full">
           <TabButton active={activeTab === 'forfait'} label="Mon Forfait" onClick={() => setActiveTab('forfait')} />
           <TabButton active={activeTab === 'factures'} label="Factures" onClick={() => setActiveTab('factures')} />
           <TabButton active={activeTab === 'tickets'} label="Support" onClick={() => setActiveTab('tickets')} />
           <TabButton active={activeTab === 'suivi'} label="Suivi Installation" onClick={() => setActiveTab('suivi')} />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:col-span-8 animate-in fade-in duration-700">
             <AnimatePresence mode="wait">
               {activeTab === 'forfait' && <DashboardOverview key="forfait" user={user} />}
               {activeTab === 'factures' && <InvoiceTab key="factures" />}
               {activeTab === 'tickets' && <SupportTab key="tickets" />}
               {activeTab === 'suivi' && <TrackingTab key="suivi" />}
             </AnimatePresence>
          </div>

          {/* Sidebar Area */}
          <div className="lg:col-span-4 space-y-6 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
             {/* Connected Devices */}
             <div className="bg-surface-container-lowest p-8 rounded-[2rem] shadow-premium border border-on-surface/[0.03]">
                <h4 className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 mb-8 italic flex justify-between items-center">
                   Appareils Actifs
                   <Activity size={14} className="text-primary"/>
                </h4>
                <div className="space-y-3">
                   <DeviceItem icon={Laptop} name="MacBook Air" type="MacOS • Likasi" status="Connecté" />
                   <DeviceItem icon={Smartphone} name="iPhone 14" type="iOS • Mobile" status="Connecté" />
                   <DeviceItem icon={Tv} name="Smart TV" type="Living Room" status="Connecté" />
                </div>
                <button className="w-full mt-6 py-4 rounded-xl bg-surface-container-low flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-widest text-on-surface/60 hover:text-primary transition-colors">
                   <Settings size={14} /> Gérer le réseau
                </button>
             </div>

             {/* Support Nudge */}
             <div className="bg-primary p-8 rounded-[2rem] shadow-2xl shadow-primary/20 relative overflow-hidden text-white">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                   <HelpCircle size={80}/>
                </div>
                <h4 className="text-2xl font-display font-black uppercase italic tracking-tighter mb-4 relative z-10">Une anomalie ?</h4>
                <p className="text-[10px] font-medium leading-relaxed mb-6 opacity-80 relative z-10 font-body">
                   Le support technique NOVA+ basé à Likasi est disponible 24/7 pour résoudre vos incidents d'orbite.
                </p>
                <Link to="/support" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary rounded-xl font-display font-black text-[9px] uppercase tracking-widest group relative z-10 hover:scale-105 transition-all">
                   Ouvrir un ticket <ChevronRight size={14} className="group-hover:translate-x-1 transition-all" />
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
