import React from 'react';
import { Link } from 'react-router-dom';
import { Wifi, Zap, Globe, ShieldCheck, ArrowRight, Server, Users, Satellite, MapPin } from 'lucide-react';
import { LOGO_URL } from '../../constants';

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="card group hover:bg-primary transition-all duration-500 border border-primary/5">
    <div className="w-16 h-16 bg-primary/10 rounded-stitch flex items-center justify-center text-primary mb-8 group-hover:bg-white/20 group-hover:text-white transition-all duration-500">
      <Icon size={32} />
    </div>
    <h3 className="text-2xl font-black mb-4 group-hover:text-white transition-colors tracking-tight">{title}</h3>
    <p className="text-on-surface/60 group-hover:text-white/80 transition-colors leading-relaxed text-sm">
      {description}
    </p>
  </div>
);

const Home = () => {
  return (
    <div className="font-display overflow-x-hidden bg-surface pb-20">
      {/* Hero Section - Design Premium "Orbital Horizon" */}
      <section className="relative min-h-[95vh] flex items-center bg-white overflow-hidden pb-20 md:pb-0">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/[0.03] rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-secondary/[0.03] rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 -z-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center pt-20">
          <div className="relative z-10 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 rounded-full mb-8 border border-primary/10">
               <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Disponible à Likasi</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-on-surface leading-[1.05] mb-10 tracking-tighter">
              L'internet <span className="text-primary italic">haute vitesse</span> par satellite.
            </h1>
            
            <p className="text-xl md:text-2xl text-on-surface/60 mb-12 max-w-xl leading-snug font-medium">
              Libérez le potentiel de votre entreprise et de votre foyer avec la vitesse NOVA+. Pas de câbles, pas de limites.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5">
              <Link to="/register" className="btn-primary py-5 px-10 text-center text-lg flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:scale-105 transition-all">
                S'inscrire maintenant <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/coverage" className="group py-5 px-10 text-center text-lg font-black uppercase tracking-widest text-primary border-2 border-primary/10 rounded-stitch hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-3">
                <MapPin size={22} /> Tester mon éligibilité
              </Link>
            </div>
            
            <div className="mt-16 flex items-center gap-4 p-4 border-l-4 border-primary bg-primary/5 rounded-r-stitch max-w-sm">
               <ShieldCheck className="text-primary shrink-0" size={24} />
               <p className="text-[10px] font-black text-on-surface/70 uppercase tracking-widest leading-relaxed">Infrastructure sécurisée et partenaire de confiance à Likasi.</p>
            </div>
          </div>

          <div className="relative hidden lg:block animate-in fade-in zoom-in duration-1000">
             <div className="relative aspect-[4/5] max-w-md ml-auto">
                <div className="absolute -inset-6 bg-primary/10 rounded-stitch rotate-3 -z-10 blur-sm"></div>
                <img 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200" 
                  alt="Connexion Satellite NOVA+" 
                  className="rounded-stitch shadow-long-fall relative z-10 w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
                
                {/* Orbital Badge */}
                <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-stitch shadow-2xl z-20 flex flex-col items-center gap-4 border border-primary/5 animate-bounce-slow">
                   <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20">
                      <Zap size={32} />
                   </div>
                   <div className="text-center">
                     <p className="text-[10px] font-black text-on-surface/30 uppercase tracking-[0.2em] mb-1">Vitesse Max</p>
                     <p className="text-3xl font-black text-primary tracking-tighter">200 Mbps</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="bg-surface-container-low py-10 border-y border-primary/5 overflow-hidden whitespace-nowrap">
         <div className="flex animate-marquee gap-20 items-center justify-around opacity-40">
            {["PARTENAIRE DE CONFIANCE", "LIKASI HAUT-DÉBIT", "SATELLITE LEO", "L'AVENIR DU WEB"].map((text, i) => (
              <div key={i} className="flex items-center gap-4">
                 <Satellite size={16} />
                 <span className="text-xs font-black uppercase tracking-[0.3em]">{text}</span>
              </div>
            ))}
         </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-on-surface tracking-tighter uppercase italic">Une infrastructure <span className="text-primary not-italic">sans limites.</span></h2>
            <p className="text-lg text-on-surface/60 leading-relaxed font-medium">
              Nous avons conçu une infrastructure qui ignore les obstacles géographiques pour vous offrir le meilleur du web à Likasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Zap} 
              title="Vitesse Ultra-Rapide" 
              description="Téléchargez des fichiers volumineux et streamez en 4K sans aucune interruption, même en plein cœur de la région."
            />
            <FeatureCard 
              icon={Globe} 
              title="Couverture Totale" 
              description="Où que vous soyez à Likasi et ses environs, notre constellation de satellites vous garantit un signal puissant 24/7."
            />
            <FeatureCard 
              icon={Users} 
              title="Multi-utilisateurs" 
              description="Connectez tous vos terminaux simultanément sans perte de performance. La solution idéale pour les foyers et bureaux."
            />
          </div>
        </div>
      </section>

      {/* Big Stats Banner */}
      <section className="bg-atmospheric py-24 text-white relative overflow-hidden text-center md:text-left">
         <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 skew-x-12 translate-x-1/4 -z-0"></div>
         <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-12 relative z-10">
            <div>
               <p className="text-6xl font-black tracking-tighter mb-2">99.9%</p>
               <p className="text-xs font-black uppercase tracking-widest text-white/50">Disponibilité garantie</p>
            </div>
            <div>
               <p className="text-6xl font-black tracking-tighter mb-2">Fiber-X</p>
               <p className="text-xs font-black uppercase tracking-widest text-white/50">Vitesse équivalente fibre</p>
            </div>
            <div>
               <p className="text-6xl font-black tracking-tighter mb-2">Likasi</p>
               <p className="text-xs font-black uppercase tracking-widest text-white/50">Bureau opérationnel local</p>
            </div>
         </div>
      </section>

      {/* Redefine Connectivty Section */}
      <section className="py-32 bg-white relative">
         <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-6xl font-black mb-10 tracking-tight leading-none text-on-surface">Redéfinir la connectivité en Afrique centrale.</h2>
            <p className="text-xl text-on-surface/60 mb-12 italic font-medium">"L'innovation satellitaire au service du développement de Likasi."</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
               <Link to="/register" className="btn-primary py-5 px-12 text-center text-lg font-black shadow-2xl">
                  Démarrer l'aventure
               </Link>
               <Link to="/offres" className="group py-5 px-12 text-center text-lg font-black uppercase tracking-widest text-on-surface border-2 border-primary/5 hover:border-primary transition-all">
                  Voir les forfaits
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;
