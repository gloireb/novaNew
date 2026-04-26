import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Users, Star, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanCard = ({ title, price, speed, data, icon: Icon, features, highlight, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1 }}
    className={`
      flex flex-col p-12 rounded-[2rem] transition-all duration-700 relative
      ${highlight 
        ? 'bg-gray-900 text-white scale-105 z-10 shadow-long-fall overflow-hidden' 
        : 'bg-white text-gray-900 hover:-translate-y-2 border border-gray-200'}
    `}
  >
    {highlight && (
      <div className="absolute top-0 right-0 p-4">
        <div className="bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg shadow-blue-600/20">
           Populaire
        </div>
      </div>
    )}

    <div className="mb-12">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-10 ${highlight ? 'bg-blue-600 text-white' : 'bg-blue-600/5 text-blue-600'}`}>
        <Icon size={24} />
      </div>
      <h3 className="text-4xl font-display font-black tracking-tighter uppercase italic leading-none mb-3">{title}</h3>
      <p className={`text-xs font-bold uppercase tracking-widest leading-relaxed ${highlight ? 'text-white/40' : 'text-gray-400'}`}>
        {description}
      </p>
    </div>

    <div className="mb-12">
      <div className="flex items-baseline gap-2">
        <span className="text-7xl font-display font-black tracking-tighter leading-none">${price}</span>
        <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${highlight ? 'text-white/30' : 'text-gray-400'}`}>/ mois</span>
      </div>
    </div>

    <div className="space-y-10 flex-grow">
      {/* Performance Meter */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <span className={`text-[10px] font-black uppercase tracking-widest ${highlight ? 'text-white/40' : 'text-gray-400'}`}>Vitesse Max</span>
          <span className="text-sm font-black italic">{speed} Mbps</span>
        </div>
        <div className={`h-1.5 w-full rounded-full overflow-hidden ${highlight ? 'bg-white/10' : 'bg-gray-100'}`}>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: index * 0.2 }}
            className={`h-full ${highlight ? 'bg-blue-600' : 'bg-blue-600'}`}
          />
        </div>
      </div>

      <ul className="space-y-5">
        {features.map((feature, i) => (
          <li key={i} className="flex items-center gap-4">
            <CheckCircle2 size={16} className={highlight ? 'text-blue-600' : 'text-blue-600'} />
            <span className={`text-[11px] font-bold italic uppercase tracking-widest ${highlight ? 'text-white/70' : 'text-gray-600'}`}>
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </div>

    <Link 
      to="/register" 
      className={`
        mt-12 py-5 rounded-xl font-display font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-3 transition-all duration-500
        ${highlight ? 'bg-blue-600 text-white hover:opacity-90 shadow-xl shadow-blue-600/20' : 'bg-gray-900 text-white hover:opacity-90 shadow-lg shadow-on-surface/10'}
      `}
    >
      Activer <ArrowRight size={16} />
    </Link>
  </motion.div>
);

const Pricing = () => {
  const plans = [
    {
      title: "Essentiel",
      price: "49.99",
      speed: "25",
      description: "Optimisé pour le surf et les emails standards.",
      icon: Zap,
      features: ["Volume Data 100 Go", "Router Wi-Fi Inclus", "Support Standard 24/7"]
    },
    {
      title: "Populaire",
      price: "79.99",
      speed: "50",
      highlight: true,
      description: "Le meilleur rapport performance/prix pour les familles.",
      icon: Star,
      features: ["Volume Data Illimité", "Priorité Streaming HD", "Antenne High-Gain Inclus"]
    },
    {
      title: "Famille",
      price: "129.99",
      speed: "100",
      description: "Puissance orbitale sans compromis pour tous vos terminaux.",
      icon: Users,
      features: ["Volume Data Illimité", "Multi-flux 4K Garanti", "Support Prioritaire 1h"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-40">
      {/* Pricing Header - NO LINES / TONAL COHERENCE */}
      <section className="relative pt-48 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
           <motion.h4 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600"
           >
             Architectures Tarifaires
           </motion.h4>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-9xl font-display font-black text-gray-900 uppercase italic leading-[0.85] tracking-tighter"
           >
             Élevez votre <br /> <span className="text-blue-600 not-italic">Standard.</span>
           </motion.h1>
           <p className="text-gray-500 text-lg md:text-xl font-body italic max-w-xl mx-auto leading-relaxed">
             "La technologie satellite de pointe, calibrée pour le Katanga et ses exigences."
           </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, idx) => (
            <PlanCard key={idx} index={idx} {...plan} />
          ))}
        </div>
      </section>

      {/* Comparison Drawer Nudge */}
      <section className="mt-40 max-w-5xl mx-auto px-6">
        <div className="bg-gray-900 p-12 md:p-20 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-12 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
           <div className="z-10 space-y-4">
              <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter">Besoins Industriels ?</h3>
              <p className="text-white/40 text-sm font-bold uppercase tracking-widest max-w-xs">Solutions sur-mesure pour sites miniers et zones d'exploitation.</p>
           </div>
           <Link to="/support" className="z-10 px-12 py-5 bg-blue-600 text-white rounded-xl font-display font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-blue-600/20">
              Consulter un expert
           </Link>
        </div>
      </section>

      {/* FAQ Nudge */}
      <div className="mt-40 text-center space-y-8">
         <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
           Une question sur nos forfaits ?
         </p>
         <div className="flex gap-4 justify-center">
            <Link to="/support" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:underline">
              <HelpCircle size={14} /> Voir la FAQ
            </Link>
         </div>
      </div>
    </div>
  );
};

export default Pricing;
