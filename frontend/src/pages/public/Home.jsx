import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Globe, Zap, ShieldCheck, ArrowRight, Satellite, CheckCircle2, Activity, Signal, Users, Award, Star, Play, Wifi, Clock, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-surface">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-surface to-secondary/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 left-10 w-4 h-4 bg-primary/20 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, -80, 0],
              y: [0, 60, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-40 right-20 w-6 h-6 bg-secondary/20 rounded-full"
          />
          <motion.div
            animate={{
              x: [0, 120, 0],
              y: [0, -40, 0],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute bottom-32 left-1/4 w-3 h-3 bg-primary/30 rounded-full"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-on-surface leading-tight mb-6"
          >
            Internet Satellite
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.19, 1, 0.22, 1] }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary"
            >
              Révolutionnaire
            </motion.span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-on-surface/70 font-body font-medium max-w-4xl mx-auto mb-12 leading-relaxed"
          >
            Transformez votre connectivité avec NOVA+. Notre technologie satellite de pointe offre
            des vitesses ultra-rapides et une couverture totale au Congo, éliminant toute barrière géographique.
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="block mt-4 text-lg text-primary font-semibold"
            >
              🚀 Plus de 10,000 clients satisfaits à travers le pays
            </motion.span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/offres"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-display font-bold text-lg hover:shadow-2xl hover:shadow-primary/25 transition-all duration-300"
              >
                Découvrir les Offres
                <ArrowRight className="inline ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/couverture"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-on-surface border-2 border-white/20 rounded-xl font-display font-bold text-lg hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                Vérifier ma Couverture
              </Link>
            </motion.div>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { number: "99.9%", label: "Disponibilité", icon: Activity, color: "text-green-500" },
              { number: "<25ms", label: "Latence", icon: Clock, color: "text-blue-500" },
              { number: "200Mbps", label: "Vitesse Max", icon: Zap, color: "text-yellow-500" },
              { number: "24/7", label: "Support", icon: Users, color: "text-purple-500" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3`} />
                <div className="text-2xl md:text-3xl font-display font-black text-white mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-white/70 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-white/60"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              <span className="text-sm font-medium">Chiffrement AES-256</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm font-medium">Certifié ISO 27001</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-medium">Couverture Nationale</span>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-32 bg-surface-container-lowest relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block p-3 bg-primary/10 rounded-2xl mb-6"
            >
              <Satellite className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-on-surface mb-6">
              Technologie de Pointe
            </h2>
            <p className="text-xl text-on-surface/70 max-w-3xl mx-auto leading-relaxed">
              Découvrez pourquoi NOVA+ est la référence en matière de connectivité satellite.
              Des performances exceptionnelles pour tous vos besoins.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Signal,
                title: "Vitesse Ultra-Rapide",
                description: "Débits allant jusqu'à 200 Mbps pour une expérience fluide sur tous vos appareils.",
                features: ["Streaming 4K", "Gaming compétitif", "Télétravail"],
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: ShieldCheck,
                title: "Sécurité Maximale",
                description: "Protection de niveau bancaire avec chiffrement de bout en bout.",
                features: ["AES-256", "VPN intégré", "Zero-trust"],
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Globe,
                title: "Couverture Universelle",
                description: "Accès internet partout au Congo, même dans les zones les plus reculées.",
                features: ["Satellite géostationnaire", "Couverture 99%", "Installation rapide"],
                color: "from-purple-500 to-pink-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-display font-bold text-on-surface mb-4">
                  {feature.title}
                </h3>
                <p className="text-on-surface/70 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-2">
                  {feature.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-on-surface/60">
                      <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 text-center"
          >
            <h3 className="text-3xl font-display font-bold text-on-surface mb-6">
              Testez Notre Vitesse en Temps Réel
            </h3>
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-4xl font-display font-black text-primary mb-2">187</div>
                <div className="text-sm text-on-surface/60">Mbps Download</div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-secondary mb-2">42</div>
                <div className="text-sm text-on-surface/60">Mbps Upload</div>
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-secondary/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-4xl font-display font-black text-green-500 mb-2">12</div>
                <div className="text-sm text-on-surface/60">ms Ping</div>
              </div>
            </div>
            <p className="text-on-surface/70">
              Résultats moyens mesurés chez nos clients • Mise à jour en temps réel
            </p>
          </motion.div>
        </div>
      </section>

      {/* SOCIAL PROOF SECTION */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black text-on-surface mb-6">
              Ils Nous Font Confiance
            </h2>
            <p className="text-xl text-on-surface/70 max-w-3xl mx-auto">
              Découvrez les témoignages de nos clients satisfaits à travers le Congo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Marie Dubois",
                role: "Directrice Marketing",
                company: "TechCorp Congo",
                content: "NOVA+ a révolutionné notre productivité. La connexion est d'une stabilité remarquable, parfaite pour nos équipes distribuées à Kinshasa et Lubumbashi.",
                rating: 5,
                location: "Kinshasa"
              },
              {
                name: "Jean-Pierre Mambo",
                role: "Entrepreneur",
                company: "Mambo Logistics",
                content: "Enfin une connexion fiable dans notre région minière ! Le support technique est exceptionnel et l'installation s'est faite en 24h.",
                rating: 5,
                location: "Kolwezi"
              },
              {
                name: "Sophie Laurent",
                role: "Professeure",
                company: "Université de Kinshasa",
                content: "Idéal pour les cours en ligne et la recherche académique. La latence est si faible qu'on dirait une connexion fibre.",
                rating: 5,
                location: "Kinshasa"
              },
              {
                name: "David Nkosi",
                role: "Médecin",
                company: "Hôpital Provincial",
                content: "Connexion vitale pour nos téléconsultations. NOVA+ nous permet de sauver des vies même dans les zones reculées.",
                rating: 5,
                location: "Kananga"
              },
              {
                name: "Fatima Bongo",
                role: "Agricultrice",
                company: "Coopérative Agricole",
                content: "Grâce à NOVA+, je peux maintenant vendre mes produits en ligne et suivre les cours du marché en temps réel.",
                rating: 5,
                location: "Kisangani"
              },
              {
                name: "Robert Kasongo",
                role: "Développeur",
                company: "Startup Tech",
                content: "Vitesse constante pour le développement cloud. Aucun downtime depuis 8 mois d'utilisation intensive.",
                rating: 5,
                location: "Lubumbashi"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-on-surface/40 font-medium">{testimonial.location}</span>
                </div>
                <p className="text-on-surface/80 mb-6 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-display font-bold text-on-surface">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-on-surface/60">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Trust Metrics */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-12"
          >
            <div className="grid md:grid-cols-4 gap-8 text-center">
              {[
                { number: "10,000+", label: "Clients Actifs" },
                { number: "99.8%", label: "Satisfaction" },
                { number: "24h", label: "Installation" },
                { number: "365j", label: "Support" }
              ].map((metric, index) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-display font-black text-primary mb-2">
                    {metric.number}
                  </div>
                  <div className="text-on-surface/70 font-medium">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-32 bg-gradient-to-r from-primary via-primary/90 to-secondary relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div
            className="absolute top-0 left-0 w-full h-full opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-8"
            >
              <Wifi className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
              Prêt à Rejoindre la
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                Révolution Numérique ?
              </span>
            </h2>

            <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Démarrez votre abonnement NOVA+ dès aujourd'hui et bénéficiez d'une connexion
              satellite professionnelle sans égal. Installation gratuite et support 24/7 inclus.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/register"
                  className="group px-10 py-5 bg-white text-primary rounded-2xl font-display font-bold text-xl hover:bg-white/90 transition-all duration-300 shadow-2xl shadow-black/25 hover:shadow-3xl"
                >
                  Commencer Maintenant
                  <ArrowRight className="inline ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/support"
                  className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white border-2 border-white/20 rounded-2xl font-display font-bold text-xl hover:bg-white/20 hover:border-white/30 transition-all duration-300"
                >
                  Nous Contacter
                </Link>
              </motion.div>
            </div>

            {/* Urgency Elements */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-8 text-white/80"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="font-medium">Installation Gratuite</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="font-medium">Sans Engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="font-medium">Support 24/7</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
