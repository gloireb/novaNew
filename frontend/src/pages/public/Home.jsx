import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Globe,
  Zap,
  ShieldCheck,
  ArrowRight,
  Satellite,
  CheckCircle2,
  Activity,
  Signal,
  Users,
  Award,
  Star,
  Wifi,
  Clock,
  MapPin,
} from "lucide-react";

const Home = () => {
  return (
    <div className="bg-white text-gray-900">
      {/* HERO */}
      <section className="min-h-screen flex items-center justify-center px-6 bg-white">
        <div className="max-w-6xl text-center">
          {/* TITLE */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold"
          >
            Internet Satellite
            <span className="block text-blue-600">Révolutionnaire</span>
          </motion.h1>

          {/* SUBTITLE */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Connexion rapide, stable et accessible partout au Congo grâce à
            NOVA+. Une nouvelle génération d’internet satellite.
          </motion.p>

          {/* CTA */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/offres"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
            >
              Découvrir les offres
              <ArrowRight className="inline ml-2 w-4 h-4" />
            </Link>

            <Link
              to="/couverture"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              Vérifier ma couverture
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: "Disponibilité", value: "99.9%", icon: Activity },
              { label: "Latence", value: "<25ms", icon: Clock },
              { label: "Vitesse", value: "200Mbps", icon: Zap },
              { label: "Support", value: "24/7", icon: Users },
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-xl border">
                <stat.icon className="w-6 h-6 text-blue-600 mb-2" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-gray-500 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold">Pourquoi NOVA+</h2>

          <p className="text-gray-600 mt-4">
            Une technologie satellite pensée pour la performance et la
            stabilité.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Vitesse",
              desc: "Jusqu'à 200 Mbps pour tous vos usages.",
              icon: Signal,
            },
            {
              title: "Sécurité",
              desc: "Connexion chiffrée et sécurisée.",
              icon: ShieldCheck,
            },
            {
              title: "Couverture",
              desc: "Internet même dans les zones reculées.",
              icon: Globe,
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl border hover:shadow-md transition"
            >
              <f.icon className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="text-xl font-semibold">{f.title}</h3>
              <p className="text-gray-600 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-blue-600 text-white text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold">
          Prêt à rejoindre NOVA+ ?
        </h2>

        <p className="mt-4 text-white/80 max-w-2xl mx-auto">
          Activez votre connexion satellite dès aujourd’hui.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/register"
            className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100"
          >
            Commencer
          </Link>

          <Link
            to="/support"
            className="border border-white px-6 py-3 rounded-xl hover:bg-white/10"
          >
            Support
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
