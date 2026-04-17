import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Wifi, Zap, Globe, ShieldCheck, ArrowRight, Server, Users, Satellite, MapPin, CheckCircle2, Headphones, Activity } from 'lucide-react';
import { LOGO_URL } from '../../constants';

const FeatureCard = ({ icon: Icon, title, description, dark = false, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
    className={`
      p-12 rounded-stitch transition-all duration-700 flex flex-col items-start gap-8
      ${dark ? 'bg-primary text-white shadow-2xl shadow-primary/40' : 'glass-card hover:-translate-y-3'}
    `}
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-primary/5 text-primary'}`}>
      <Icon size={28} className="stroke-[1.5px]" />
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-black tracking-tight uppercase italic leading-none">{title}</h3>
      <p className={`text-editorial leading-relaxed ${dark ? 'text-white/70' : ''}`}>
        {description}
      </p>
    </div>
  </motion.div>
);

const TrustLogo = ({ name }) => (
  <div className="flex items-center gap-3 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-default">
    <div className="w-10 h-10 bg-on-surface/5 rounded-full flex items-center justify-center">
      <div className="w-4 h-4 bg-on-surface/10 rounded-full animate-pulse-slow"></div>
    </div>
    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{name}</span>
  </div>
);

const Home = () => {
  return (
    <div className="overflow-x-hidden bg-surface">
      {/* HERO SECTION - ATMOSPHERIC MASTERY */}
      <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 pt-32 pb-40 overflow-hidden">
        {/* Animated Background Layers */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/nova_satellite_hero_orbital_1776348655816.png" 
            alt="Orbital Horizon" 
            className="w-full h-full object-cover scale-105 brightness-[0.4] transition-all duration-[3000ms]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-surface"></div>
          
          {/* Orbital Glows */}
          <div className="orbital-glow w-[800px] h-[800px] -top-1/4 -left-1/4"></div>
          <div className="orbital-glow w-[600px] h-[600px] bottom-0 -right-1/4 opacity-20" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center gap-12">
           <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 1, ease: "easeOut" }}
             className="inline-flex items-center gap-4 px-6 py-2 bg-white/5 backdrop-blur-2xl rounded-full border border-white/10"
           >
              <div className="w-2 h-2 rounded-full bg-primary animate-signal"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80">Connectivité Orbitale Active</span>
           </motion.div>
           
           <div className="space-y-6">
             <motion.h1 
               initial={{ opacity: 0, y: 40 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 1.2, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
               className="text-6xl md:text-9xl font-black text-white uppercase italic leading-[0.85] tracking-tighter"
             >
               L'Internet <br /> 
               <span className="text-white not-italic underline decoration-white/10 underline-offset-[16px] decoration-8">Sans Limites</span>
             </motion.h1>
             
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 1.5, delay: 0.8 }}
               className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-medium leading-relaxed tracking-tight"
             >
               Partout à Likasi, libérez la puissance de NOVA+. <br />
               Connectivité satellite de nouvelle génération.
             </motion.p>
           </div>
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1, delay: 1.2 }}
             className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
           >
             <Link to="/register" className="btn-primary">
               Découvrir les plans
             </Link>
             <Link to="/couverture" className="btn-secondary bg-white/5 backdrop-blur-md text-white border-white/20 hover:bg-white/10">
               Éligibilité locale
             </Link>
           </motion.div>
        </div>

        {/* Global Connectivity Wave (Signature Spec) */}
        <div className="connectivity-wave"></div>
        <div className="connectivity-wave connectivity-wave-2"></div>
      </section>

      {/* PARTNERS SEC - REFINED */}
      <section className="py-20 border-b border-on-surface/5 bg-surface">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-on-surface/20">Alliance Technologique</p>
            <div className="flex flex-wrap gap-12 items-center justify-center">
               <TrustLogo name="Airtel" />
               <TrustLogo name="M-Pesa" />
               <TrustLogo name="Orange" />
               <TrustLogo name="Gécamines" />
            </div>
        </div>
      </section>

      {/* WHY NOVA+ - EDITORIAL LAYOUT */}
      <section className="py-40 px-4 section-alt relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-20 mb-32 items-end">
            <div className="lg:col-span-8">
              <motion.h4 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-10"
              >
                Ingénierie de pointe
              </motion.h4>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
                className="text-5xl md:text-8xl font-black text-on-surface uppercase italic"
              >
                La technologie orbitale au service de Likasi.
              </motion.h2>
            </div>
            <div className="lg:col-span-4">
              <p className="text-editorial text-lg">
                Nous avons conçu une infrastructure qui ignore les obstacles géographiques pour vous offrir le meilleur du web là où les autres échouent.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              index={0}
              icon={Zap} 
              title="Vitesse Phénoménale" 
              description="Téléchargez des fichiers volumineux et streamez en 4K sans aucune interruption, même en zone reculée."
            />
            <FeatureCard 
              index={1}
              icon={Globe} 
              title="Portée Globale" 
              description="Où que vous soyez à Likasi, notre constellation de satellites vous garantit un signal puissant 24/7."
              dark={true}
            />
            <FeatureCard 
              index={2}
              icon={Server} 
              title="Multi-Flux" 
              description="Connectez tous vos terminaux simultanément sans perte de performance. L'idéal pour les structures complexes."
            />
          </div>
        </div>
      </section>

      {/* LOCAL PRESENCE - HIGH FIDELITY LAYOUT */}
      <section className="py-40 px-4 bg-white">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="relative"
            >
               <div className="absolute -inset-10 bg-primary/5 rounded-full blur-[80px]"></div>
               <img 
                 src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200" 
                 alt="Technical Excellence" 
                 className="relative z-10 rounded-stitch shadow-long-fall object-cover aspect-square"
               />
               <div className="absolute -bottom-12 -right-12 glass-card p-10 z-20 hidden md:flex flex-col gap-4 max-w-[280px]">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white">
                    <Activity size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-1">Stabilité Réseau</p>
                    <p className="text-2xl font-black text-on-surface uppercase italic">99.99%</p>
                    <div className="w-full h-1 bg-on-surface/5 mt-4 rounded-full overflow-hidden">
                      <div className="w-[99%] h-full bg-primary"></div>
                    </div>
                  </div>
               </div>
            </motion.div>
            
            <div className="space-y-16">
               <div className="space-y-8">
                  <h3 className="text-5xl font-black text-on-surface tracking-tighter uppercase italic">
                    Présence Locale <br />
                    <span className="text-primary not-italic">Expertise Katanga</span>
                  </h3>
                  <p className="text-editorial text-lg leading-relaxed">
                    Notre équipe d'installateurs certifiés à Likasi garantit une mise en service sous 48h et un support de proximité permanent.
                  </p>
               </div>
               
               <div className="grid sm:grid-cols-2 gap-8">
                  {[
                    "Installation sous 48h",
                    "Support Swahili/Français",
                    "Maintenance sur site",
                    "Formation technique"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                       <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 text-primary flex items-center justify-center">
                          <CheckCircle2 size={16} />
                       </div>
                       <span className="font-bold text-on-surface/80 text-sm italic uppercase">{item}</span>
                    </div>
                  ))}
               </div>

               <Link to="/support" className="inline-flex items-center gap-4 font-display font-black uppercase tracking-[0.3em] text-[10px] text-primary group">
                Contacter un expert <ArrowRight size={18} className="group-hover:translate-x-3 transition-all duration-500" />
               </Link>
            </div>
         </div>
      </section>

      {/* FINAL CTA - PREMIUM EXPERIENCE */}
      <section className="py-40 px-4 section-alt">
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 1 }}
           className="max-w-6xl mx-auto rounded-[60px] bg-primary overflow-hidden relative p-16 md:p-32 text-center shadow-2xl shadow-primary/40"
         >
            {/* Background Texture & Glows */}
            <div className="absolute inset-0 bg-noise opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 -translate-y-1/2 translate-x-1/2 rounded-full blur-[100px]"></div>
            
            <div className="relative z-10 flex flex-col items-center gap-12">
               <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic leading-none tracking-tighter">
                 Rejoignez <br /> la constellation.
               </h2>
               <p className="text-white/60 text-xl max-w-xl font-medium tracking-tight">
                 Entrez dans une nouvelle ère de vitesse. Choisissez le plan qui propulsera vos activités à Likasi.
               </p>
               <div className="flex flex-col sm:flex-row gap-8 w-full md:w-auto mt-10">
                 <Link to="/offres" className="btn-primary bg-white text-primary hover:bg-white/90 shadow-none">
                   Voir les forfaits
                 </Link>
                 <Link to="/support" className="px-12 py-5 border border-white/30 text-white rounded-full font-display font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white/10 transition-all">
                   Parler à un conseiller
                 </Link>
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default Home;
