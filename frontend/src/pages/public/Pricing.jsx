import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, Users, Briefcase, Star, CheckCircle2, ShieldCheck, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanCard = ({ title, price, speed, data, icon: Icon, description, features, highlight, badge, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
    className={`
      relative flex flex-col p-12 rounded-stitch transition-all duration-700
      ${highlight 
        ? 'bg-primary text-white scale-105 z-10 shadow-2xl shadow-primary/40 overflow-hidden' 
        : 'glass-card hover:-translate-y-3'}
    `}
  >
    {highlight && (
      <>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 translate-y-1/2 -translate-x-1/2 rounded-full blur-2xl"></div>
      </>
    )}

    {badge && (
      <div className="absolute top-8 right-8">
         <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] ${highlight ? 'bg-white/20 text-white' : 'bg-primary/5 text-primary'}`}>
            <Flame size={12} fill="currentColor" /> {badge}
         </div>
      </div>
    )}

    <div className="mb-12">
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-8 ${highlight ? 'bg-white/10' : 'bg-primary/5 text-primary'}`}>
        <Icon size={28} className="stroke-[1.5px]" />
      </div>
      <h3 className="text-4xl font-black tracking-tighter uppercase italic mb-3 leading-none">{title}</h3>
      <p className={`text-xs font-bold leading-relaxed tracking-wide uppercase ${highlight ? 'text-white/60' : 'text-on-surface/40'}`}>
        {description}
      </p>
    </div>

    <div className="flex items-baseline gap-2 mb-12">
      <span className="text-7xl font-black tracking-tighter">${price}</span>
      <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${highlight ? 'text-white/40' : 'text-on-surface/30'}`}>/ mois</span>
    </div>

    <div className="space-y-10 flex-grow">
      {/* Specs Grid */}
      <div className="grid grid-cols-2 gap-4">
         <div className={`p-6 rounded-stitch-sm transition-colors ${highlight ? 'bg-white/10' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
            <p className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 ${highlight ? 'text-white/40' : 'text-on-surface/30'}`}>Performance</p>
            <p className="text-xl font-black tracking-tighter">{speed}</p>
         </div>
         <div className={`p-6 rounded-stitch-sm transition-colors ${highlight ? 'bg-white/10' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
            <p className={`text-[8px] font-black uppercase tracking-[0.3em] mb-2 ${highlight ? 'text-white/40' : 'text-on-surface/30'}`}>Capacité</p>
            <p className="text-xl font-black tracking-tighter">{data}</p>
         </div>
      </div>

      {/* Feature List */}
      <ul className="space-y-5">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-4 group">
            <div className={`w-1.5 h-1.5 rounded-full transition-all ${highlight ? 'bg-white/40 group-hover:bg-white' : 'bg-primary/20 group-hover:bg-primary group-hover:scale-125'}`}></div>
            <span className={`text-[11px] font-bold italic uppercase tracking-widest ${highlight ? 'text-white/80' : 'text-on-surface/60'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <Link 
      to="/register" 
      className={`
        mt-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 transition-all duration-500 hover:scale-[1.02] active:scale-95
        ${highlight ? 'bg-white text-primary shadow-2xl shadow-white/10' : 'btn-primary'}
      `}
    >
      Activer maintenant <ArrowRight size={16} />
    </Link>
  </motion.div>
);

const Pricing = () => {
  const plans = [
    {
      title: "Essentiel",
      price: "49",
      speed: "30 Mbps",
      data: "200 Go",
      description: "Optimisé pour la connectivité domestique standard.",
      icon: Zap,
      features: ["Router Multi-mode", "Installation Standard", "Support Technique 24/7"]
    },
    {
      title: "Impact",
      price: "129",
      speed: "200 Mbps",
      data: "Illimité",
      description: "L'excellence orbitale pour les entreprises & pros.",
      icon: Briefcase,
      highlight: true,
      badge: "Recommandé",
      features: ["Priorité Réseau Absolute", "Antenne High-Gain", "Support Concierge 1h"]
    },
    {
      title: "Secteur",
      price: "50",
      speed: "100 Mbps",
      data: "Illimité",
      description: "Connectivité partagée pour structures familiales.",
      icon: Users,
      features: ["Streaming HD/4K", "Appareils Illimités", "Contrôle Data Parental"]
    }
  ];

  return (
    <div className="bg-surface pb-40 font-display">
      {/* Pricing Header - ATMOSPHERIC TEXTURE */}
      <section className="relative pt-48 pb-32 px-4 text-center overflow-hidden">
         <div className="orbital-glow w-[800px] h-[800px] -top-1/2 left-1/2 -translate-x-1/2 opacity-10"></div>
         
         <div className="max-w-5xl mx-auto flex flex-col items-center gap-10">
            <motion.h4 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] font-black uppercase tracking-[0.6em] text-primary"
            >
              Architectures Tarifaires
            </motion.h4>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="text-6xl md:text-9xl font-black text-on-surface uppercase italic leading-[0.85] tracking-tighter"
            >
              Élevez votre <br /> <span className="text-primary not-italic underline decoration-primary/10 underline-offset-8">Standard.</span>
            </motion.h1>
            <p className="text-editorial text-xl italic max-w-xl mx-auto">
              "La technologie satellite de pointe, calibrée pour Likasi."
            </p>
         </div>
      </section>

      {/* Pricing Grid - EDITORIAL ASYMMETRY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-10 items-center">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} index={idx} {...plan} />
          ))}
        </div>
      </section>

      {/* Comparison Nudge - PREMIUM GLASS */}
      <section className="mt-40 max-w-4xl mx-auto px-4">
         <motion.div 
           initial={{ opacity: 0, scale: 0.98 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="p-16 rounded-[40px] glass-card border-none flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left"
         >
            <div className="space-y-4">
               <h3 className="text-3xl font-black uppercase italic tracking-tighter">Besoins Industriels ?</h3>
               <p className="text-xs font-bold text-on-surface/40 uppercase tracking-[0.3em]">Solutions sur mesure pour sites miniers et infrastructures.</p>
            </div>
            <Link to="/support" className="px-12 py-5 bg-on-surface text-surface rounded-full font-black text-xs uppercase tracking-widest hover:opacity-90 active:scale-95 transition-all shadow-2xl">
               Consulter un expert
            </Link>
         </motion.div>
      </section>

      {/* Local Support Banner */}
      <div className="mt-40 border-t border-on-surface/5 pt-20 text-center">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-on-surface/20">
           Standard de service Likasi – Assistance physique garantie
         </p>
      </div>
    </div>
  );
};

export default Pricing;
