"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, MessageCircle, CreditCard, Zap, ShieldCheck, Building2, User, Sparkles } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

type BillingCycle = "day" | "week" | "month";

interface Plan {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  prices: {
    day: number;
    week: number;
    month: number;
  };
  speed: string;
  features: string[];
  recommended?: boolean;
  color: string;
}

const plans: Plan[] = [
  {
    id: "basique",
    name: "Basique",
    description: "Parfait pour rester connecté et naviguer sereinement.",
    icon: <User className="w-6 h-6" />,
    prices: {
      day: 2,
      week: 10,
      month: 35,
    },
    speed: "10 Mbps",
    features: [
      "Navigation illimitée",
      "Réseaux sociaux fluides",
      "Qualité vidéo standard (480p)",
      "Support technique 7/7",
      "Installation sous 48h"
    ],
    color: "blue",
  },
  {
    id: "pro",
    name: "Pro",
    description: "Le choix des créateurs et des familles actives.",
    icon: <Sparkles className="w-6 h-6" />,
    prices: {
      day: 4,
      week: 20,
      month: 60,
    },
    speed: "25 Mbps",
    features: [
      "Tout du plan Basique",
      "Streaming YouTube Full HD",
      "Vidéoconférences HD (Zoom/Teams)",
      "Gaming (Ping optimisé)",
      "Multi-appareils (4-6 simultanés)",
      "Priorité support"
    ],
    recommended: true,
    color: "blue-600",
  },
  {
    id: "business",
    name: "Business",
    description: "Stabilité maximale pour les entreprises.",
    icon: <Building2 className="w-6 h-6" />,
    prices: {
      day: 10,
      week: 45,
      month: 120,
    },
    speed: "50+ Mbps",
    features: [
      "Tout du plan Pro",
      "IP Statique disponible",
      "Bande passante garantie",
      "Service client VIP dédié",
      "Contrat de maintenance (SLA)",
      "Installation prioritaire 24h"
    ],
    color: "slate-900",
  },
];

export default function PricingPage() {
  const [cycle, setCycle] = useState<BillingCycle>("month");

  const getWhatsAppLink = (planName: string, price: number) => {
    const text = `Bonjour NOVA+, je souhaite souscrire au forfait ${planName} (${price}$ pour 1 ${cycle === 'day' ? 'jour' : cycle === 'week' ? 'semaine' : 'mois'}).`;
    return `https://wa.me/243970550517?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg transition-transform group-hover:scale-105">
            N+
          </div>
          <span className="font-display font-bold text-2xl tracking-tight text-slate-900 dark:text-white">
            NOVA+
          </span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="container mx-auto px-6 pt-12 pb-24 max-w-7xl">
        {/* Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-bold text-xs uppercase tracking-widest mb-4 border border-blue-100 dark:border-blue-800"
          >
            Nos Forfaits
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
          >
            Libérez votre potentiel avec <span className="text-blue-600 dark:text-blue-400">l&apos;illimité</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 dark:text-slate-400"
          >
            Choisissez la durée et la vitesse qui vous conviennent. Pas de surprises, juste une connexion robuste.
          </motion.p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-16">
          <div className="bg-white dark:bg-slate-900 p-1.5 rounded-2xl flex gap-1 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
            {(["day", "week", "month"] as BillingCycle[]).map((c) => (
              <button
                key={c}
                onClick={() => setCycle(c)}
                className={`relative px-6 py-2.5 rounded-xl text-sm font-bold transition-all z-10 ${cycle === c
                    ? "text-white"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
              >
                {cycle === c && (
                  <motion.div
                    layoutId="activeCycle"
                    className="absolute inset-0 bg-blue-600 rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {c === "day" ? "Jour" : c === "week" ? "Semaine" : "Mois"}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Grid */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className={`relative flex flex-col bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 ${plan.recommended
                  ? "border-blue-500 dark:border-blue-400 ring-4 ring-blue-500/5 lg:scale-105 z-10"
                  : "border-slate-100 dark:border-slate-800"
                }`}
            >
              {plan.recommended && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-blue-600 dark:bg-blue-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg">
                  Recommandé
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800`}>
                  {plan.icon}
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8 border-b border-slate-100 dark:border-slate-800 pb-8 flex items-baseline gap-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={cycle}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="font-display text-5xl font-black text-slate-900 dark:text-white"
                  >
                    ${plan.prices[cycle]}
                  </motion.span>
                </AnimatePresence>
                <span className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest">
                  / {cycle === "day" ? "Jour" : cycle === "week" ? "Semaine" : "Mois"}
                </span>
              </div>

              <div className="mb-8">
                <div className="flex items-center gap-2 mb-6">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  <span className="font-display font-bold text-slate-900 dark:text-white">
                    Jusqu&apos;à {plan.speed}
                  </span>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto space-y-3">
                <Link
                  href="/payment"
                  className={`flex w-full justify-center items-center py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] ${plan.recommended
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-600/30"
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100"
                    }`}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  Payer maintenant
                </Link>
                <Link
                  href={getWhatsAppLink(plan.name, plan.prices[cycle])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full justify-center items-center py-3 rounded-2xl font-bold text-sm text-emerald-600 dark:text-emerald-400 border-2 border-emerald-500/20 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all border-dashed"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Prendre sur WhatsApp
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Comparison Note */}
        <div className="mt-24 max-w-4xl mx-auto">
          <div className="bg-slate-900 dark:bg-blue-900/10 p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center gap-10 border border-white/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-blue-600/20 blur-3xl rounded-full"></div>
            <div className="flex-1 relative z-10">
              <h2 className="text-3xl font-display font-bold mb-4">Besoin d&apos;une solution sur-mesure ?</h2>
              <p className="text-slate-400 text-lg">
                Vous êtes un hôtel, une école ou une institution à Likasi ? Notre équipe technique peut concevoir une architecture dédiée avec fibre optique ou liaison point-à-point.
              </p>
            </div>
            <div className="relative z-10">
              <Link href="https://wa.me/243970550517" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all">
                Contacter Sales
              </Link>
            </div>
          </div>
        </div>

        {/* Trust features */}
        <div className="mt-24 grid md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full shadow-lg mx-auto flex items-center justify-center text-emerald-500 border border-slate-100 dark:border-slate-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Sécurisé</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Paiements locaux via Mobile Money ou Cash.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full shadow-lg mx-auto flex items-center justify-center text-blue-500 border border-slate-100 dark:border-slate-800">
              <Zap className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Instantané</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">Activation de votre compte dès confirmation.</p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 bg-white dark:bg-slate-900 rounded-full shadow-lg mx-auto flex items-center justify-center text-purple-500 border border-slate-100 dark:border-slate-800">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">Assistance</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">On vous aide pour toute la configuration.</p>
          </div>
        </div>
      </main>

      <footer className="py-12 border-t border-slate-100 dark:border-slate-900 text-center">
        <Link href="/" className="text-slate-500 dark:text-slate-400 hover:text-blue-600 font-bold transition-colors">
          &larr; Retour à l&apos;accueil
        </Link>
      </footer>
    </div>
  );
}
