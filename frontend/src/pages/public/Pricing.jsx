import React from 'react';
import { Check, ArrowRight, Zap, Users, Briefcase, Info, BadgeCheck, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const PlanCard = ({ title, price, speed, data, features, highlight, icon: Icon, subtext, badge }) => (
  <div className={`card relative flex flex-col h-full transition-all duration-500 border-2 overflow-hidden ${highlight ? 'border-primary ring-[12px] ring-primary/5 bg-white scale-105 z-10 shadow-2xl' : 'border-primary/5 bg-surface-lowest hover:border-primary/30'}`}>
    {highlight && (
      <div className="absolute top-0 right-0 p-4">
         <div className="bg-primary text-white text-[10px] font-black py-1 px-4 rounded-full uppercase tracking-widest shadow-lg flex items-center gap-2">
            <Star size={12} fill="currentColor" /> Recommandé
         </div>
      </div>
    )}
    
    <div className="p-10 pb-0">
      <div className={`w-16 h-16 rounded-stitch flex items-center justify-center mb-8 ${highlight ? 'bg-primary text-white shadow-xl shadow-primary/20 animate-pulse' : 'bg-primary/5 text-primary'}`}>
        <Icon size={32} />
      </div>
      <h3 className="text-3xl font-black text-on-surface tracking-tighter mb-2">{title}</h3>
      <p className="text-on-surface/40 text-[10px] font-black uppercase tracking-[0.2em] mb-6">{subtext}</p>
      <div className="flex items-baseline gap-2 mb-8 border-b border-primary/5 pb-8">
        <span className="text-5xl font-black text-on-surface tracking-tighter">{price}</span>
        <span className="text-on-surface/40 font-black uppercase tracking-widest text-[10px]">/ mois</span>
      </div>
    </div>

    <div className="px-10 space-y-8 flex-grow">
      <div className="grid grid-cols-2 gap-4">
         <div className="p-4 bg-primary/5 rounded-stitch border border-primary/10">
            <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Vitesse</p>
            <p className="text-xl font-black text-on-surface">{speed}</p>
         </div>
         <div className="p-4 bg-primary/5 rounded-stitch border border-primary/10">
            <p className="text-[10px] font-black text-primary/60 uppercase tracking-widest mb-1">Volume</p>
            <p className="text-xl font-black text-on-surface">{data}</p>
         </div>
      </div>

      <ul className="space-y-4">
        {features.map((feature, i) => (
          <li key={i} className="flex items-start gap-3 text-sm font-bold text-on-surface/60">
            <div className="mt-1 w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
               <Check size={10} strokeWidth={4} />
            </div>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>

    <div className="p-10 mt-4">
      <Link to="/register" className={`w-full py-5 rounded-stitch font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all text-xs ${highlight ? 'bg-primary text-white shadow-2xl hover:bg-primary-dark active:scale-95' : 'bg-surface-container-high text-primary hover:bg-primary/10'}`}>
        Choisir {title} <ArrowRight size={18} />
      </Link>
    </div>
  </div>
);

const Pricing = () => {
  return (
    <div className="bg-surface pb-32 font-display">
      {/* Hero Header - Orbital Horizon Style */}
      <section className="bg-white pt-32 pb-40 px-4 relative overflow-hidden text-center">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-primary/[0.02] -skew-y-3 origin-top-left -z-10"></div>
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 rounded-full mb-8 border border-primary/10">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Tarifs Likasi 2025</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-8 text-on-surface tracking-tighter uppercase italic">
            La haute vitesse, <span className="text-primary not-italic">sans limites.</span>
          </h1>
          <p className="text-xl text-on-surface/60 max-w-2xl mx-auto font-medium leading-relaxed">
            Des forfaits conçus pour connecter chaque foyer et entreprise de Likasi au reste du monde avec le meilleur du satellite.
          </p>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-24 relative z-20">
        <div className="grid lg:grid-cols-3 gap-8">
          <PlanCard 
            title="Essentiel"
            subtext="Débuter sereinement"
            price="79$"
            speed="30 Mbps"
            data="200 Go"
            icon={Zap}
            features={[
              "Installation standard incluse",
              "Router NOVA+ inclus",
              "Latence réduite (Satellite LEO)",
              "Assistance technique 24/7"
            ]}
          />
          <PlanCard 
            title="Pro"
            badge="Populaire"
            subtext="Performance maximale"
            highlight={true}
            price="149$"
            speed="200 Mbps"
            data="Illimité"
            icon={Briefcase}
            features={[
              "Volume de données illimité",
              "Priorité réseau haute",
              "Antenne pro haute performance",
              "Secteur minier éligible",
              "Support prioritaire dédié"
            ]}
          />
          <PlanCard 
            title="Famille"
            subtext="Multi-connexions"
            price="99$"
            speed="100 Mbps"
            data="Illimité"
            icon={Users}
            features={[
              "Streaming 4K simultané",
              "Données illimitées",
              "Router Mesh compatible",
              "Gestion parentale incluse",
              "Engagement 12 mois"
            ]}
          />
        </div>
      </section>

      {/* Tailored Solution Section */}
      <section className="max-w-5xl mx-auto px-4 mt-32">
        <div className="card bg-atmospheric text-white border-none p-12 flex flex-col md:flex-row items-center gap-10 overflow-hidden relative">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
           <div className="md:w-2/3 relative z-10">
              <h2 className="text-4xl font-black mb-6 tracking-tight">Besoin d'une solution sur-mesure ?</h2>
              <p className="text-white/70 text-lg leading-relaxed font-medium">
                Pour les grandes entreprises, les institutions ou les sites miniers reculés, contactez notre équipe dédiée pour une infrastructure satellitaire personnalisée.
              </p>
           </div>
           <div className="md:w-1/3 w-full relative z-10">
              <Link to="/support" className="w-full py-5 bg-white text-primary font-black uppercase tracking-[0.2em] rounded-stitch flex items-center justify-center gap-3 shadow-2xl hover:bg-surface-lowest transition-all">
                 Contact Pro <ArrowRight size={20} />
              </Link>
           </div>
        </div>
      </section>

      {/* Small FAQ nudge */}
      <div className="mt-20 text-center max-w-2xl mx-auto px-4">
         <p className="text-xs font-bold text-on-surface/40 leading-relaxed uppercase tracking-[0.2em]">
            * Les prix indiqués incluent la location de l'équipement standard. Frais d'activation applicables à la première inscription. 
            Débit maximum fluctuant selon les conditions atmosphériques.
         </p>
      </div>
    </div>
  );
};

export default Pricing;
