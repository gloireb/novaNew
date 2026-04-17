import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Zap, ShieldCheck, ArrowRight, Satellite, CheckCircle2, Menu, Activity, Signal } from 'lucide-react';

const ConnectivityWave = () => (
  <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
    <svg className="absolute bottom-0 w-full h-full opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
      <motion.path
        animate={{
          d: [
            "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,160L48,181.3C96,203,192,245,288,234.7C384,224,480,160,576,144C672,128,768,160,864,176C960,192,1056,192,1152,186.7C1248,181,1344,171,1392,165.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            "M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="fill-primary"
      />
    </svg>
  </div>
);

const Home = () => {
  return (
    <div className="bg-surface">
      {/* HERO - NOVA+ PROFESSIONAL */}
      <section className="relative min-h-screen flex flex-col items-center justify-center p-6 pt-32 lg:pt-48 overflow-hidden">
        {/* Atmospheric BG */}
        <div className="absolute inset-0 z-0 bg-surface">
          <img 
            src="/nova_plus_pro_hero_1776414166243.png" 
            alt="Orbital Horizon" 
            className="w-full h-full object-cover brightness-[0.6] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-surface via-transparent to-primary/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface"></div>
          
          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-on-surface/10 backdrop-blur-3xl rounded-full border border-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_12px_rgba(0,68,108,0.8)]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Technologie Orbitale Active</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
              className="text-[12vw] md:text-[8rem] font-display font-black text-white uppercase italic leading-[0.8] tracking-[-0.04em]"
            >
              L'Internet <br /> 
              <span className="text-white md:pl-20">Supérieur</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              className="text-white/60 text-lg md:text-2xl font-body font-medium max-w-2xl mx-auto tracking-tight"
            >
              Libérez la puissance de NOVA+. Une connectivité satellite de pointe, offrant vitesse et stabilité partout au Congo.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <Link to="/offres" className="px-12 py-5 bg-gradient-to-r from-[#0A5C8E] to-[#1E88E5] text-white rounded-[0.375rem] font-display font-black uppercase tracking-[0.3em] text-[10px] hover:scale-105 transition-all shadow-xl shadow-primary/30">
              Découvrir les plans
            </Link>
            <Link to="/couverture" className="px-12 py-5 bg-surface-container-highest/20 backdrop-blur-md text-white border border-white/20 rounded-[0.375rem] font-display font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white/10 transition-all">
              Éligibilité locale
            </Link>
          </motion.div>
        </div>

        <ConnectivityWave />
      </section>

      {/* BENCHMARK GRID - EDITORIAL NO-LINE STYLE */}
      <section className="py-24 bg-surface px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            { icon: Signal, label: "Performance", title: "Latence Réduite", desc: "Une architecture satellite optimisée pour une réactivité immédiate." },
            { icon: Satellite, label: "Fiabilité", title: "99.9% Uptime", desc: "Connectivité continue sans interruption, peu importe la météo." },
            { icon: Activity, label: "Vitesse", title: "Débit Garanti", desc: "Du streaming 4K à la visioconférence pro, tout devient fluide." }
          ].map((feat, i) => (
            <div key={i} className="space-y-6 group">
              <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <feat.icon size={24} />
              </div>
              <div className="space-y-3">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">{feat.label}</span>
                <h3 className="text-2xl font-display font-black text-on-surface uppercase italic">{feat.title}</h3>
                <p className="text-on-surface/50 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALLIANCE LOGOS */}
      <section className="py-20 border-y border-on-surface/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-12 opacity-30 grayscale contrast-125">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-on-surface">Partenaires Stratégiques</span>
           <div className="flex gap-16 items-center">
             <span className="font-display font-black italic text-xl">M-PESA</span>
             <span className="font-display font-black italic text-xl">AIRTEL</span>
             <span className="font-display font-black italic text-xl">ORANGE</span>
             <span className="font-display font-black italic text-xl hidden md:block">GÉCAMINES</span>
           </div>
        </div>
      </section>

      {/* FEATURED BENEFITS - THE HORIZON FOCUS */}
      <section className="py-40 bg-surface-container-low px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">Ingénierie de pointe</h4>
               <h2 className="text-5xl md:text-7xl font-display font-black text-on-surface uppercase italic leading-none tracking-tighter">
                 La technologie <br /> au service du Katanga.
               </h2>
               <p className="text-on-surface/50 text-lg md:text-xl font-body leading-relaxed max-w-xl">
                 Nous avons déployé une infrastructure robuste pour ignorer les obstacles géographiques et vous offrir le meilleur là où vous êtes.
               </p>
            </div>
            
            <div className="grid gap-6">
              {[
                { title: "Couverture Totale", desc: "Du centre de Likasi aux mines les plus isolées." },
                { title: "Sécurité Bancaire", desc: "Toutes vos données transitent via des tunnels chiffrés." },
                { title: "Service Premium", desc: "Support client local et dédié à vos besoins." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-6 bg-surface-lowest rounded-2xl border border-on-surface/5">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 size={16} />
                  </div>
                  <div>
                    <h5 className="font-display font-black text-sm uppercase italic tracking-wider text-on-surface">{item.title}</h5>
                    <p className="text-on-surface/40 text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-10 bg-primary/10 rounded-full blur-[100px] animate-pulse"></div>
            <img 
              src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=1200" 
              className="relative z-10 rounded-3xl shadow-long-fall grayscale hover:grayscale-0 transition-all duration-700"
              alt="Orbital View"
            />
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA - CALL TO THE STARS */}
      <section className="py-40 px-6 section-alt">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto rounded-[40px] bg-on-surface p-12 md:p-32 text-center text-surface relative overflow-hidden"
        >
          {/* Background Aura */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 -translate-y-1/2 translate-x-1/2 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#1E88E5]/10 translate-y-1/2 -translate-x-1/2 rounded-full blur-[80px]"></div>

          <div className="relative z-10 flex flex-col items-center gap-12">
            <h2 className="text-5xl md:text-8xl font-display font-black uppercase italic leading-none tracking-tighter">
              Rejoignez <br /> la constellation.
            </h2>
            <p className="text-white/40 text-xl font-body max-w-xl mx-auto tracking-tight">
              Ne laissez plus la distance limiter votre potentiel. Choisissez NOVA+ pour une connectivité sans frontières.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 mt-10">
              <Link to="/offres" className="px-12 py-5 bg-primary text-white rounded-lg font-display font-black uppercase tracking-[0.4em] text-[10px] hover:scale-105 transition-all outline outline-white/10 hover:outline-white/40">
                Lancer l'aventure
              </Link>
              <Link to="/support" className="px-12 py-5 border border-white/20 text-white rounded-lg font-display font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white/10 transition-all">
                Nous contacter
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
