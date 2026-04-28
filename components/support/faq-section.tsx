"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const FAQS = [
  {
    q: "Comment payer mon abonnement ?",
    a: "Vous pouvez payer via M-Pesa, Airtel Money ou Orange Money directement depuis votre dashboard dans la section 'Forfaits'. Le paiement est instantané."
  },
  {
    q: "Pourquoi ma connexion est lente ?",
    a: "La vitesse peut être affectée par le nombre d'appareils connectés ou la position de votre routeur. Redémarrez votre box ou contactez le support si le problème persiste."
  },
  {
    q: "Comment changer de forfait internet ?",
    a: "Allez dans l'onglet 'Forfaits', choisissez votre nouveau plan et payez. Votre nouvelle vitesse sera activée dès la validation du paiement."
  },
  {
    q: "Fournissez-vous l'équipement ?",
    a: "Oui, NOVA+ fournit le routeur lors de la première installation. L'installation est effectuée par nos techniciens qualifiés."
  },
  {
    q: "Que faire en cas de coupure de courant ?",
    a: "Nos stations de base sont équipées de batteries, mais votre routeur domestique a besoin d'électricité. Nous recommandons l'usage d'un petit onduleur."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {FAQS.map((faq, i) => (
        <div 
          key={i} 
          className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          >
            <span className="font-bold text-slate-900 dark:text-white">{faq.q}</span>
            <ChevronDown 
              className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${openIndex === i ? "rotate-180" : ""}`} 
            />
          </button>
          
          <AnimatePresence>
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
