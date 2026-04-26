import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Heart, ShieldCheck, Zap, Globe, Users, Headphones, CheckCircle2, MapPin } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description, index }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay: index * 0.1, ease: [0.19, 1, 0.22, 1] }}
    className="p-12 glass-card hover:-translate-y-3 transition-all duration-700 flex flex-col items-start gap-8"
  >
    <div className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
      <Icon size={28} className="stroke-[1.5px]" />
    </div>
    <div className="space-y-4">
      <h3 className="text-2xl font-black mb-3 tracking-tighter uppercase italic leading-none">{title}</h3>
      <p className="text-editorial text-sm">
        {description}
      </p>
    </div>
  </motion.div>
);

const About = () => {
  return (
    <div className="bg-white font-display pb-40">
      {/* Header Section - CINEMATIC IMPACT */}
      <section className="relative pt-60 pb-40 px-4 text-center overflow-hidden">
        <div className="orbital-glow w-[1000px] h-[1000px] -top-1/2 left-1/2 -translate-x-1/2 opacity-20"></div>
        
        <div className="max-w-5xl mx-auto relative z-10 space-y-12">
           <motion.h4 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600"
           >
             Héritage & Vision
           </motion.h4>
           
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
             className="text-6xl md:text-9xl font-black text-gray-900 leading-[0.85] tracking-tighter uppercase italic"
           >
             Connecter Likasi <br /> 
             <span className="text-blue-600 not-italic underline decoration-primary/10 underline-offset-8">au Futur.</span>
           </motion.h1>
           
           <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.5, delay: 0.8 }}
             className="text-2xl text-gray-500 max-w-3xl mx-auto font-medium leading-relaxed italic"
           >
             "Acteur local majeur, NOVA+ redéfinit l'accessibilité dans le Katanga par l'excellence satellitaire."
           </motion.p>
        </div>
      </section>

      {/* Engagement Section - TONAL LAYERING */}
      <section className="py-40 px-4 section-alt relative">
        <div className="max-w-7xl mx-auto">
           <div className="grid lg:grid-cols-12 gap-20 mb-32 items-end">
              <div className="lg:col-span-7">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600 mb-10">Pilier Opérationnel</h4>
                 <h2 className="text-5xl md:text-8xl font-black text-gray-900 leading-[0.9] tracking-tighter uppercase italic">
                   L'excellence satellite au service de Likasi.
                 </h2>
              </div>
              <div className="lg:col-span-5 pb-4">
                 <p className="text-editorial text-lg leading-relaxed">
                   Nous ne fournissons pas seulement une connexion, nous bâtissons l'infrastructure vitale pour l'indépendance numérique régionale.
                 </p>
              </div>
           </div>

           <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              <ValueCard 
                index={0}
                icon={ShieldCheck}
                title="Fiabilité Totale"
                description="Notre infrastructure orbitale garantit une stabilité absolue, affranchie des contraintes terrestres du Haut-Katanga."
              />
              <ValueCard 
                index={1}
                icon={Zap}
                title="Débit de Pointe"
                description="Déploiement des derniers terminaux à large bande pour offrir des performances rivalisant avec les meilleurs standards globaux."
              />
              <ValueCard 
                index={2}
                icon={Heart}
                title="Engagement Local"
                description="Une équipe d'experts à Likasi sur l'Avenue de l'Église, assurant une réactivité et une maintenance sans compromis."
              />
           </div>
        </div>
      </section>

      {/* Mission / Approach - ARCHITECTURAL LAYOUT */}
      <section className="py-40 px-4 bg-white relative overflow-hidden">
         <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
            <div className="space-y-16 order-2 lg:order-1">
               <div className="space-y-8">
                  <h3 className="text-5xl font-black text-gray-900 tracking-tighter uppercase italic">
                    Notre Approche <br />
                    <span className="text-blue-600 not-italic">Data-Driven</span>
                  </h3>
                  <p className="text-editorial text-lg leading-relaxed">
                    Depuis notre implantation, nous avons compris que la connectivité est le moteur de développement essentiel pour les entreprises minières et les foyers de Likasi.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 gap-10">
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-10 rounded-[40px] bg-blue-600/5 border border-blue-600/10 transition-all cursor-default"
                  >
                     <p className="text-5xl font-black text-blue-600 mb-3 tracking-tighter italic leading-none">500+</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Nœuds Actifs</p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.05 }}
                    className="p-10 rounded-[40px] bg-blue-600/5 border border-blue-600/10 transition-all cursor-default"
                  >
                     <p className="text-5xl font-black text-blue-600 mb-3 tracking-tighter italic leading-none">24/7</p>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-500">Watchtower</p>
                  </motion.div>
               </div>

               <div className="space-y-6 pt-6">
                  {[
                    "Transparence radicale sur les débits",
                    "Ingénierie réseau certifiée",
                    "Développement de talents Katangais"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-5 group">
                       <div className="w-6 h-6 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                          <CheckCircle2 size={14} />
                       </div>
                       <span className="font-bold text-gray-600 group-hover:text-blue-600 transition-colors italic uppercase tracking-widest text-[11px]">{item}</span>
                    </div>
                  ))}
               </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative order-1 lg:order-2"
            >
               <div className="absolute -inset-12 bg-blue-600/5 rounded-full blur-[100px] animate-pulse-slow"></div>
               <img 
                 src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200" 
                 alt="NOVA+ Infrastructure" 
                 className="relative z-10 rounded-stitch shadow-long-fall object-cover grayscale-[0.3] hover:grayscale-0 transition-all duration-[2000ms]"
               />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-blue-600/10 rounded-full blur-3xl -z-10"></div>
               <div className="absolute -top-12 -right-12 glass-card p-8 z-20 hidden md:flex hover:rotate-6 transition-all">
                  <Globe className="text-blue-600 animate-spin" style={{ animationDuration: '20s' }} size={40} />
               </div>
            </motion.div>
         </div>
      </section>

      {/* Contact Banner - DARK PREMIUM */}
      <section className="py-40 px-4">
         <motion.div 
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-6xl mx-auto rounded-[60px] bg-gray-900 text-white overflow-hidden relative p-20 md:p-32 text-center"
         >
            <div className="absolute inset-0 bg-noise opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600 rounded-full blur-[200px] opacity-20"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto space-y-12">
               <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none underline decoration-primary/30 underline-offset-8 decoration-8">Likasi est <br /> notre centre.</h2>
               <p className="text-white/60 text-xl font-medium tracking-tight">
                 Nous bâtissons ensemble le futur numérique du Haut-Katanga.
               </p>
               <div className="flex flex-col md:flex-row justify-center gap-12 font-black uppercase tracking-[0.4em] text-[10px] pt-8">
                  <div className="flex items-center gap-3 justify-center"><MapPin size={18} className="text-blue-600" /> Avenue de l'Église, Likasi</div>
                  <div className="flex items-center gap-3 justify-center"><Headphones size={18} className="text-blue-600" /> +243 00 000 000</div>
               </div>
            </div>
         </motion.div>
      </section>
    </div>
  );
};

export default About;
