"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  const plans = [
    {
      name: "Basic",
      target: "Idéal pour la messagerie et navigation",
      price: "35",
      speed: "10 Mbps",
      features: [
        "Internet Illimité",
        "Navigation fluide",
        "Appels WhatsApp",
        "Support technique 7/7"
      ],
      popular: false,
    },
    {
      name: "Famille",
      target: "Pour le streaming et les maisons",
      price: "60",
      speed: "25 Mbps",
      features: [
        "Tout du plan Basic",
        "Streaming YouTube HD",
        "Connexion pour 4-6 appareils",
        "Ping réduit pour les jeux"
      ],
      popular: true,
    },
    {
      name: "Entreprise",
      target: "Bureaux et travailleurs pro",
      price: "120",
      speed: "50+ Mbps",
      features: [
        "Tout du plan Famille",
        "Vidéoconférences sans coupure (Zoom/Teams)",
        "Téléchargements lourds",
        "Priorité support technique"
      ],
      popular: false,
    }
  ];

  return (
    <section id="forfaits" className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Des forfaits simples, carrés.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Faites votre choix parmi nos plans transparents. Sans limite de data, facturation fixe chaque mois.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-white dark:bg-slate-800 rounded-3xl p-8 border ${plan.popular ? 'border-blue-500 shadow-2xl shadow-blue-900/10 dark:shadow-blue-900/20 scale-100 lg:scale-105 z-10' : 'border-slate-200 dark:border-slate-700 shadow-lg shadow-slate-200/50 dark:shadow-none'}`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
                  Le plus populaire
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm h-10">{plan.target}</p>
              </div>

              <div className="flex items-baseline gap-2 mb-8 border-b border-slate-100 dark:border-slate-700 pb-8">
                <span className="font-display text-5xl font-bold text-slate-900 dark:text-white">${plan.price}</span>
                <span className="text-slate-500 dark:text-slate-400 font-medium tracking-wide">/ mois</span>
              </div>

              <div className="mb-8">
                <div className="inline-flex py-1 px-3 bg-slate-100 dark:bg-slate-700 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 mb-6">
                  Vitesse estimée : {plan.speed}
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-300 font-medium">
                      <Check className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href={`/payment?plan=${plan.name.toLowerCase()}`} 
                className={`flex w-full justify-center items-center py-4 rounded-xl font-bold text-lg transition-all active:scale-95 ${plan.popular ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/30' : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-600'}`}
              >
                Souscrire maintenant
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-slate-500 dark:text-slate-400">
            Frais d&apos;installation : Prix d&apos;un routeur standard et configuration à voir avec l&apos;équipe lors de la souscription.
          </p>
        </div>
      </div>
    </section>
  );
}
