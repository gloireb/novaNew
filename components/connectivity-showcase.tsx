"use client";

import { motion } from "motion/react";
import { Smartphone, Laptop, Tv, CheckCircle2, Play, Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ConnectivityShowcase() {
  return (
    <section className="py-24 overflow-hidden bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Visual Elements */}
          <div className="flex-1 relative w-full flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md aspect-square lg:aspect-video">
              {/* Abstract Background for Mockup */}
              <div className="absolute inset-0 bg-blue-600/10 dark:bg-blue-500/10 rounded-[4rem] rotate-3 blur-2xl -z-10"></div>

              {/* Tablet/Phone Mockup (CSS only + Icons) */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full h-full bg-white dark:bg-slate-800 rounded-3xl border-8 border-slate-900 dark:border-slate-700 shadow-2xl p-4 overflow-hidden"
              >
                {/* Interface Mockup */}
                <div className="h-full w-full bg-slate-50 dark:bg-slate-900 rounded-xl overflow-hidden flex flex-col">
                  {/* Top Bar */}
                  <div className="h-10 bg-white dark:bg-slate-800 flex items-center px-4 justify-between border-b border-slate-200 dark:border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-3 h-3 text-slate-400" />
                      <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content Mockup */}
                  <div className="flex-1 p-4">
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="space-y-2">
                        <div className="h-3 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
                        <div className="h-3 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="aspect-video bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Play className="w-6 h-6 text-blue-600 fill-blue-600" />
                      </div>
                    </div>

                    {/* User Activity Simulation */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden relative">
                          {/* In a real app we'd use an image, for now just a color/icon */}
                        </div>
                        <div className="h-2 w-32 bg-slate-200 dark:bg-slate-700 rounded"></div>
                      </div>
                      <div className="h-24 w-full bg-slate-200 dark:bg-slate-700 rounded-xl"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Micro-UI element */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute bottom-10 right-10 bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2"
                >
                  <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                  <span className="font-bold text-xs">Vitesse Maximale</span>
                </motion.div>
              </motion.div>

              {/* Floating Icons for Variety */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-lg flex items-center justify-center text-blue-600 z-20 border border-slate-100 dark:border-slate-600"
              >
                <Smartphone className="w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -left-6 w-16 h-16 bg-white dark:bg-slate-700 rounded-2xl shadow-lg flex items-center justify-center text-emerald-600 z-20 border border-slate-100 dark:border-slate-600"
              >
                <Laptop className="w-8 h-8" />
              </motion.div>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 -right-12 w-14 h-14 bg-white dark:bg-slate-700 rounded-full shadow-lg flex items-center justify-center text-red-500 z-20 border border-slate-100 dark:border-slate-600"
              >
                <Tv className="w-7 h-7" />
              </motion.div>
            </div>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight"
            >
              Une connexion qui vous <span className="text-blue-600 dark:text-blue-400">accompagne partout</span>
            </motion.h2>

            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-xl mx-auto lg:mx-0">
              Que vous soyez à la maison ou au bureau, NOVA+ Connect transforme votre façon de vivre Likasi au quotidien.
            </p>

            <ul className="space-y-4 mb-10 inline-block text-left lg:block">
              {[
                { title: "Travail en ligne stable", desc: "Vidéos Teams/Zoom fluides sans décalage.", icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> },
                { title: "Streaming Multi-écrans", desc: "Regardez Netflix et YouTube en 4K partout.", icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> },
                { title: "Uploads Ultra-rapides", desc: "Partagez vos contenus TikTok et YouTube instantanément.", icon: <CheckCircle2 className="w-5 h-5 text-blue-500" /> },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100">{item.title}</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="#forfaits" className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95">
                Voir les forfaits
              </Link>
              <Link href="https://wa.me/243970550517" target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
                Tester maintenant
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
