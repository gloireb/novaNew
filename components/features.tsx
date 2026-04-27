"use client";

import { motion } from "motion/react";
import { XCircle, Infinity, Zap, Clock4 } from "lucide-react";

export default function Features() {
  return (
    <section id="avantages" className="py-24 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Problem Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6"
          >
            Le problème avec l&apos;internet &quot;classique&quot;
          </motion.h2>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            <div className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400 p-4 rounded-2xl flex gap-3 items-start border border-red-100 dark:border-red-900/20">
              <XCircle className="w-6 h-6 shrink-0 mt-0.5 text-red-500" />
              <p className="font-medium text-sm md:text-base">Forfaits qui s&apos;épuisent au milieu du mois avec la data limitée.</p>
            </div>
            <div className="bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-400 p-4 rounded-2xl flex gap-3 items-start border border-red-100 dark:border-red-900/20">
              <XCircle className="w-6 h-6 shrink-0 mt-0.5 text-red-500" />
              <p className="font-medium text-sm md:text-base">Connexions lentes et instables qui gâchent le travail ou les vidéos.</p>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300 px-6 py-2 rounded-full font-bold uppercase tracking-wider text-sm mb-4"
          >
            La solution NOVA+
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            L&apos;internet pensé pour vous.
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Nous avons reconstruit l&apos;accès internet à Likasi pour qu&apos;il soit simple, rapide et sans surprises à la fin du mois.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl hover:shadow-xl dark:hover:shadow-blue-900/5 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
              <Zap className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3">Ultra Rapide</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Une connexion fluide pour vos appels vidéos, streaming Netflix sans coupure et téléchargements instantanés.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl hover:shadow-xl dark:hover:shadow-blue-900/5 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 dark:bg-blue-500/5 rounded-bl-[100px] -z-0"></div>
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-md shadow-blue-600/20 mb-6 relative z-10">
              <Infinity className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3 relative z-10">Vraiment Illimité</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed relative z-10">
              Pas de &quot;Fair Use Policy&quot; caché. Téléchargez, naviguez et travaillez sans jamais vous soucier de votre quota.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-8 rounded-3xl hover:shadow-xl dark:hover:shadow-blue-900/5 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm border border-slate-100 dark:border-slate-700 mb-6">
              <Clock4 className="w-7 h-7" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white mb-3">Support Premium</h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Une équipe technique locale disponible tous les jours. Un problème ? Nous intervenons le plus rapidement possible.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
