"use client";

import { motion } from "motion/react";
import { ArrowRight, Wifi, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Navbar from "./navbar";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative pt-6 pb-20 lg:pt-10 lg:pb-28 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-slate-50 to-slate-50 dark:from-blue-900/20 dark:via-slate-950 dark:to-slate-950"></div>

      <Navbar />

      {/* Main Hero Content */}
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-sm mb-6 border border-blue-100 dark:border-blue-800 placeholder-wave"
            >
              <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
              Numéro 1 à Likasi
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6 text-balance"
            >
              Internet rapide, <span className="text-blue-600 dark:text-blue-400">illimité</span> et abordable.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 text-balance leading-relaxed"
            >
              Fini les forfaits qui s&apos;épuisent vite et les longues coupures. Découvrez la fiabilité NOVA+ Connect pour votre domicile ou votre entreprise.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href="#forfaits" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/20 transition-all active:scale-95">
                Choisir mon forfait
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href="https://wa.me/243970550517" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95">
                Nous contacter
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm font-medium text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                Fiable
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                Ultra-rapide
              </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full relative max-w-lg mx-auto lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative rounded-3xl bg-blue-600 p-8 shadow-2xl shadow-blue-900/20 text-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-6 border border-white/20">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Wifi className="w-10 h-10 text-white" />
                  </motion.div>
                </div>
                <h3 className="font-display font-semibold text-2xl mb-2 text-white">Connectivité Status</h3>
                <p className="text-blue-100 mb-8">Votre connexion est optimale</p>

                <div className="w-full bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm font-medium text-blue-200">Vitesse de téléchargement</span>
                    <span className="font-display font-bold text-3xl">100<span className="text-xl font-medium text-blue-200 ml-1">Mbps</span></span>
                  </div>
                  <div className="w-full h-2 bg-blue-900/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                      className="h-full bg-emerald-400 rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
