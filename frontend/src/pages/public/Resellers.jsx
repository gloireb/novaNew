import React from 'react';
import { Handshake, TrendingUp, ShieldCheck, MapPin, ArrowRight, MessageCircle } from 'lucide-react';

const ResellerCard = ({ icon: Icon, title, description }) => (
  <div className="card border border-blue-600/5 hover:bg-blue-600 text-white transition-all duration-500 group">
    <div className="w-14 h-14 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-white/20 group-hover:text-white transition-all">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-white transition-colors">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed group-hover:text-white/80 transition-colors">
      {description}
    </p>
  </div>
);

const Resellers = () => {
  return (
    <div className="bg-white pb-24 font-body">
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900">
            Devenez Partenaire <span className="text-blue-600 tracking-tight">NOVA+</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic">
            "Ensemble, connectons chaque quartier de Likasi et offrons des solutions sur-mesure aux entreprises du Haut-Katanga."
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-24">

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ResellerCard
            icon={TrendingUp}
            title="Revenus Stables"
            description="Profitez d'un modèle de commission récurrent attractif sur chaque abonnement actif de votre portefeuille client."
          />
          <ResellerCard
            icon={ShieldCheck}
            title="Matériel Certifié"
            description="Accédez aux derniers terminaux satellite NOVA+ officiels avec une garantie technique et un support prioritaire."
          />
          <ResellerCard
            icon={Handshake}
            title="Formations Dédiées"
            description="Nos experts vous forment à l'installation, au pointage satellite et à la maintenance de niveau 1."
          />
        </div>

        {/* Application Form & Info */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <div className="animate-in fade-in slide-in-from-left duration-700">
            <h2 className="text-3xl font-display font-bold mb-8 text-gray-900">Pourquoi Likasi a besoin de vous ?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg shrink-0 h-fit"><MapPin size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Expansion Rapide</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">De nouveaux quartiers à Likasi et à Shituru s'ouvrent chaque jour. Votre présence locale est la clé de notre succès commun.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="p-3 bg-blue-600/10 text-blue-600 rounded-lg shrink-0 h-fit"><MessageCircle size={24} /></div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900 mb-2">Service de Proximité</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Les clients préfèrent acheter et payer leur réabonnement chez un partenaire local de confiance.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-gray-50 rounded-stitch border-2 border-dashed border-blue-600/10">
              <p className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Critères requis</p>
              <ul className="text-gray-600 text-sm space-y-2 font-medium">
                <li>• Posséder un local commercial identifié</li>
                <li>• Équipe de 2 techniciens terrain</li>
                <li>• Capacité initiale de stockage matériel</li>
              </ul>
            </div>
          </div>

          <div className="card shadow-2xl bg-white p-10 border border-blue-600/5 relative">
            <div className="absolute top-4 right-4 animate-pulse">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-600"></span>
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold mb-8">Postuler au programme</h3>
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Nom du responsable</label>
                  <input type="text" className="w-full p-4 bg-gray-100 rounded-stitch border-none outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="Jean Dupont" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Nom de l'entreprise</label>
                  <input type="text" className="w-full p-4 bg-gray-100 rounded-stitch border-none outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="Likasi Net Solutions" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Votre Zone d'activité</label>
                <input type="text" className="w-full p-4 bg-gray-100 rounded-stitch border-none outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="Ex: Shituru, Panda, etc." />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-1">Téléphone WhatsApp</label>
                <input type="tel" className="w-full p-4 bg-gray-100 rounded-stitch border-none outline-none focus:ring-2 focus:ring-blue-600/20" placeholder="+243 ..." />
              </div>
              <button className="w-full btn-primary py-4 flex items-center justify-center gap-3 text-lg shadow-xl shadow-blue-600/10">
                Envoyer ma demande <ArrowRight size={20} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Resellers;
