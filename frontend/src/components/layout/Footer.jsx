import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-24 pb-12 font-display">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          {/* Brand & Mission */}
          <div className="md:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center overflow-hidden">
                 <Globe className="text-white" size={24} />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tighter text-gray-900 uppercase italic">
                NOVA<span className="text-blue-600 not-italic">+</span>
              </span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Connecter les zones les plus reculées avec une technologie satellite de pointe. Haute performance, latence réduite, partout.
            </p>
          </div>

          {/* Links Grid */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Société</h4>
            <ul className="space-y-4">
              {['À Propos', 'Carrières', 'Presse', 'Blog'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-600 hover:text-blue-600 font-bold text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Support</h4>
            <ul className="space-y-4">
              {['Centre d\'aide', 'Contact', 'FAQ', 'Statut'].map((item) => (
                <li key={item}>
                  <Link to="/support" className="text-gray-600 hover:text-blue-600 font-bold text-sm transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment & Trust */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600">Paiements Acceptés</h4>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-center group hover:border-blue-600/20 transition-colors">
                <span className="text-[10px] font-black text-[#FFD700] drop-shadow-sm group-hover:scale-110 transition-transform tracking-tighter">M-PESA</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-center group hover:border-blue-600/20 transition-colors">
                <span className="text-[10px] font-black text-[#ED1C24] drop-shadow-sm group-hover:scale-110 transition-transform tracking-tighter">AIRTEL</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-gray-200 flex items-center justify-center group hover:border-blue-600/20 transition-colors">
                <span className="text-[10px] font-black text-[#FF7900] drop-shadow-sm group-hover:scale-110 transition-transform tracking-tighter">ORANGE</span>
              </div>
            </div>
            <div className="p-4 bg-blue-600/5 rounded-2xl border border-blue-600/10">
              <p className="text-[10px] font-bold text-blue-600/60 italic leading-tight">
                "Paiements 100% sécurisés via les opérateurs locaux leaders du marché."
              </p>
            </div>
          </div>
        </div>

        {/* Legal Bottom */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © {new Date().getFullYear()} NOVA+ – Une marque de Novatech SARL. Tous droits réservés.
          </p>
          <div className="flex gap-8">
            <Link to="#" className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest">Confidentialité</Link>
            <Link to="#" className="text-[10px] font-bold text-gray-400 hover:text-blue-600 uppercase tracking-widest">Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
