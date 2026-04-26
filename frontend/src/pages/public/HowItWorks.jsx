import React, { useState } from 'react';
import { Satellite, Radio, Router, Laptop, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    id: 1,
    title: 'Signal Satellite',
    description: 'Le signal internet est transmis depuis nos satellites en orbite basse directement vers Likasi.',
    icon: <Satellite size={40} />,
    color: 'bg-blue-600'
  },
  {
    id: 2,
    title: 'Antenne NOVA+',
    description: 'Une petite antenne installée sur votre toit reçoit le signal avec une latence minimale.',
    icon: <Radio size={40} />,
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Router Wi-Fi',
    description: 'Le signal est converti par notre routeur haute performance pour couvrir toute votre maison.',
    icon: <Router size={40} />,
    color: 'bg-blue-600'
  },
  {
    id: 4,
    title: 'Vos Appareils',
    description: 'Connectez tous vos smartphones, tablettes et ordinateurs sans limites de vitesse.',
    icon: <Laptop size={40} />,
    color: 'bg-blue-500'
  }
];

const FAQ_ITEMS = [
  {
    q: "L'installation est-elle compliquée ?",
    a: "Pas du tout ! Nos techniciens certifiés s'occupent de tout : installation de l'antenne, configuration du routeur et test de débit final en moins de 2 heures."
  },
  {
    q: "Est-ce que la pluie affecte la connexion ?",
    a: "La technologie NOVA+ utilise des bandes de fréquences optimisées pour les climats tropicaux. Bien qu'un orage extrême puisse ralentir légèrement le signal, la connexion reste stable 99% du temps."
  },
  {
    q: "Puis-je changer de forfait à tout moment ?",
    a: "Oui, vous pouvez demander un upgrade ou un downgrade depuis votre Espace Client. Le changement est effectif dès le prochain cycle de facturation."
  },
  {
    q: "Quelle est la durée du contrat ?",
    a: "Nos offres sont sans engagement de durée. Vous êtes libre de suspendre ou d'arrêter votre abonnement quand vous le souhaitez."
  }
];

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="bg-white pb-24">
      {/* Hero */}
      <section className="py-20 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-5xl mb-6">Comment ça <span className="text-blue-600">marche</span> ?</h1>
        <p className="text-xl text-gray-600">
          Une technologie complexe, rendue simple pour vous. Découvrez le voyage de vos données.
        </p>
      </section>

      {/* Steps Illustration */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="relative">
          {/* Connector line for desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-blue-600/10 -translate-y-1/2 -z-10"></div>
          
          <div className="grid lg:grid-cols-4 gap-8">
            {STEPS.map((step) => (
              <div key={step.id} className="flex flex-col items-center text-center group">
                <div className={`w-20 h-20 rounded-full ${step.color} text-white flex items-center justify-center mb-8 shadow-xl transition-transform group-hover:scale-110 duration-300 relative`}>
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-gray-900 text-white w-8 h-8 rounded-full border-4 border-surface flex items-center justify-center font-bold text-xs">
                    {step.id}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed max-w-[200px]">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Advantages */}
      <section className="py-20 bg-gray-50 mb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl mb-8">La supériorité du satellite</h2>
                <div className="space-y-6">
                  {[
                    "Signal direct de l'espace, évitant les coupures de câbles terrestres.",
                    "Latence ultra-faible optimisée pour le streaming.",
                    "Installation autonome, pas besoin de ligne téléphonique.",
                    "Couverture 100% garantie sur toute la zone de Likasi."
                  ].map((text, i) => (
                    <div key={i} className="flex gap-4 items-start">
                      <CheckCircle2 className="text-blue-600 shrink-0" size={24} />
                      <p className="text-gray-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card bg-atmospheric p-1 rounded-stitch overflow-hidden">
                 <div className="bg-white rounded-stitch p-12 text-center">
                    <Satellite size={80} className="text-blue-600 mx-auto mb-6 wave-pulse" />
                    <h4 className="text-3xl font-bold text-blue-600">Orbital-1</h4>
                    <p className="text-gray-500 text-sm">Notre nouveau satellite dédié à la RDC</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl text-center mb-12">Foire aux questions</h2>
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index} className="card p-0 overflow-hidden">
               <button 
                className="w-full px-8 py-6 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
               >
                 <span className="font-bold">{item.q}</span>
                 {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
               </button>
               {openFaq === index && (
                 <div className="px-8 pb-8 text-gray-600 text-sm animate-in fade-in slide-in-from-top-2">
                   {item.a}
                 </div>
               )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
