import React from 'react';
import { Calendar, User, ArrowRight, Tag, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLOG_POSTS = [
  {
    id: 1,
    title: "Le satellite LEO : Pourquoi c'est une révolution pour Likasi",
    excerpt: "Découvrez comment la nouvelle génération de satellites en orbite basse change la donne pour la connectivité en RDC.",
    author: "Équipe Technique NOVA+",
    date: "12 Avril 2025",
    category: "Technologie",
    readTime: "5 min",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "NOVA+ s'agrandit : Nouveaux points de service à Shituru",
    excerpt: "Nous rapprochons nos services de vous avec l'ouverture de nouveaux centres d'assistance et de vente.",
    author: "Direction Commerciale",
    date: "08 Avril 2025",
    category: "Entreprise",
    readTime: "3 min",
    image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Tuto : Optimiser votre signal Wi-Fi à la maison",
    excerpt: "Quelques astuces simples pour tirer le meilleur parti de votre abonnement NOVA+ et couvrir toutes vos pièces.",
    author: "Support Client",
    date: "02 Avril 2025",
    category: "Conseils",
    readTime: "8 min",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog = () => {
  return (
    <div className="bg-white pb-24 font-body">
      {/* Hero Section Orbital */}
      <section className="bg-white pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-10 animate-pulse"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-gray-900">
            L'Actualité <span className="text-blue-600 tracking-tight">NOVA+</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Restez informé des déploiements, des innovations et des conseils pour votre connexion à Likasi.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="card p-0 overflow-hidden border border-blue-600/5 flex flex-col group hover:-translate-y-2 transition-all duration-500 shadow-xl hover:shadow-blue-600/5">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                  <div className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-600" /> {post.date}</div>
                  <div className="flex items-center gap-1.5"><Clock size={14} className="text-blue-600" /> {post.readTime}</div>
                </div>

                <h3 className="text-xl font-display font-bold mb-4 text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-blue-600/5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-600">
                      <User size={12} />
                    </div>
                    <span className="text-xs font-bold text-gray-500">{post.author}</span>
                  </div>
                  <button className="text-blue-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all">
                    Lire plus <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Newsletter Option */}
        <div className="mt-24 p-12 bg-atmospheric rounded-stitch text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl -z-0"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-4">Ne manquez aucune mise à jour</h2>
            <p className="text-white/60 mb-8 font-medium italic">Recevez les notifications de maintenance et les nouvelles offres directement par email.</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="votre@email.com"
                className="flex-grow p-4 bg-white/10 border border-white/20 rounded-stitch text-white placeholder:text-white/40 outline-none focus:bg-white/20"
              />
              <button className="py-4 px-8 bg-white text-blue-600 font-bold rounded-stitch hover:bg-gray-50 transition-colors">S'abonner</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
