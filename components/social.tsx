"use client";

import { motion } from "motion/react";
import { MessageCircle, Star, Quote } from "lucide-react";
import Link from "next/link";

export function Testimonials() {
  const reviews = [
    {
      name: "Marc L.",
      role: "Entrepreneur",
      text: "Enfin ! Plus besoin de recharger mon modem tous les deux jours. NOVA+ a vraiment simplifié mon travail à domicile."
    },
    {
      name: "Sarah K.",
      role: "Mère de famille",
      text: "Mes enfants regardent des vidéos sans que ça coupe, et moi je peux travailler tranquillement. Connexion très fiable."
    },
    {
      name: "David T.",
      role: "Gérant de boutique",
      text: "Le service client est impressionnant. Le peu de fois où j'ai eu besoin d'aide, ils ont répondu dans la minute sur WhatsApp."
    }
  ];

  return (
    <section id="temoignages" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Ce que disent nos abonnés
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 relative"
            >
              <Quote className="w-10 h-10 text-blue-600/20 dark:text-blue-400/20 absolute top-6 right-6" />
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-lg mb-6 leading-relaxed">&quot;{review.text}&quot;</p>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{review.name}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{review.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const faqs = [
    {
      q: "Comment m'abonner à NOVA+ Connect ?",
      a: "C'est très simple ! Cliquez sur l'un des boutons WhatsApp sur ce site, envoyez-nous un message, et notre équipe s'occupe de vérifier votre éligibilité et de planifier l'installation."
    },
    {
      q: "Est-ce vraiment illimité ?",
      a: "Oui, à 100%. Il n'y a pas de limite de gigaoctets (GB). Vous pouvez télécharger et regarder le montant de contenus que vous souhaitez sans que la vitesse ne soit bridée à la fin du mois."
    },
    {
      q: "Combien de temps faut-il pour l'installation ?",
      a: "Une fois que nous avons confirmé votre adresse, l'installation est généralement réalisée sous 24h à 48h ouvrées par nos techniciens."
    },
    {
      q: "Puis-je changer de forfait plus tard ?",
      a: "Absolument. Vous pouvez upgrader votre forfait à tout moment en contactant notre support sur WhatsApp. La modification sera appliquée à votre prochain cycle de facturation."
    }
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-4">Questions fréquentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <details key={idx} className="group bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 [&_summary::-webkit-details-marker]:hidden overflow-hidden transition-all">
              <summary className="flex cursor-pointer items-center justify-between font-semibold text-lg text-slate-900 dark:text-white p-6">
                <span>{faq.q}</span>
                <span className="transition duration-300 group-open:-rotate-180 bg-slate-100 dark:bg-slate-700 rounded-full p-2">
                  <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24" className="text-slate-900 dark:text-white"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="px-6 pb-6 pt-0 text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 pt-20 pb-10 text-slate-400 dark:text-slate-500 border-t border-slate-800 dark:border-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 border-b border-slate-800 dark:border-slate-900 pb-16">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/20">
                N+
              </div>
              <span className="font-display font-bold text-2xl tracking-tight text-white">
                NOVA+
              </span>
            </div>
            <p className="max-w-xs text-sm">Fournisseur d&apos;accès internet haut débit. Connecter Likasi au reste du monde.</p>
          </div>

          <div className="flex gap-4">
            <Link href="https://wa.me/243970550517" target="_blank" rel="noopener noreferrer" className="bg-emerald-600 hover:bg-emerald-500 dark:bg-emerald-500 dark:hover:bg-emerald-400 font-bold text-white px-6 py-3 rounded-full transition-colors flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <MessageCircle className="w-5 h-5" />
              Nous Contacter
            </Link>
          </div>
        </div>

        <div className="text-center text-sm">
          <p>&copy; {new Date().getFullYear()} NOVA+ Connect. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFAB() {
  return (
    <Link
      href="https://wa.me/243970550517?text=Bonjour, je souhaite avoir plus d'informations sur NOVA+."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-110 hover:bg-emerald-400 transition-all duration-300 flex items-center justify-center group"
      aria-label="Nous contacter sur WhatsApp"
    >
      <MessageCircle className="w-8 h-8" />
      <span className="absolute right-full mr-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-semibold px-3 py-1.5 rounded-lg opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap pointer-events-none shadow-xl">
        Besoin d&apos;aide ?
      </span>
    </Link>
  );
}
