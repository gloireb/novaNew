import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe,
  MessageCircle
} from 'lucide-react';
import { LOGO_URL } from '../../constants';

const Footer = () => {
  const currentYear = 2025; // As specifically requested by user

  return (
    <footer className="bg-surface-lowest pt-24 pb-12 font-display relative overflow-hidden border-t border-primary/5">
      {/* Decorative Gradient Background */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2 -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          {/* Brand Info */}
          <div className="space-y-8">
             <Link to="/" className="inline-block relative">
                <span className="text-3xl font-black tracking-tighter text-on-surface">
                   NOVA<span className="text-primary italic">+</span>
                </span>
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/40 mt-1">Satellite Internet</p>
             </Link>
             <p className="text-on-surface/60 text-sm leading-relaxed max-w-xs">
                La solution de connectivité satellite haute performance pour Likasi et toute la région du Haut-Katanga.
             </p>
             <div className="flex gap-4">
                {[Globe, Mail, MessageCircle].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-stitch bg-primary/5 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300">
                    <Icon size={18} />
                  </a>
                ))}
             </div>
          </div>

          {/* Site Links */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-primary flex items-center gap-3">
               <span className="w-8 h-[2px] bg-primary/20"></span> Liens Utiles
            </h4>
            <ul className="space-y-5">
              {[
                { name: 'Accueil', path: '/' },
                { name: 'Nos Offres', path: '/offres' },
                { name: 'Couverture', path: '/coverage' },
                { name: 'Support Client', path: '/support' },
                { name: 'Mon Espace', path: '/dashboard' }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm font-bold text-on-surface/60 hover:text-primary transition-colors flex items-center gap-2 group">
                    <ArrowRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-primary flex items-center gap-3">
               <span className="w-8 h-[2px] bg-primary/20"></span> Support & Légal
            </h4>
            <ul className="space-y-5">
              {[
                { name: 'Mentions légales', path: '#' },
                { name: 'CGV', path: '#' },
                { name: 'Contact', path: '/support' },
                { name: 'Plan du site', path: '#' }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm font-bold text-on-surface/60 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            <div className="mt-10 p-4 bg-primary/5 rounded-stitch flex items-center gap-3 border border-primary/10">
               <ShieldCheck size={20} className="text-primary" />
               <p className="text-[10px] font-black uppercase tracking-widest text-primary/70">Certifié NOVA+ SECURE</p>
            </div>
          </div>

          {/* Contact & Payments */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-10 text-primary flex items-center gap-3">
               <span className="w-8 h-[2px] bg-primary/20"></span> Nous trouver
            </h4>
            <ul className="space-y-6 mb-12">
              <li className="flex gap-4">
                <MapPin size={20} className="text-primary shrink-0" />
                <p className="text-sm font-bold text-on-surface/60 leading-relaxed">
                   Avenue de l'Église, Likasi<br />
                   République Démocratique du Congo
                </p>
              </li>
              <li className="flex gap-4 items-center">
                <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center shrink-0">
                   <Phone size={18} />
                </div>
                <div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 leading-none mb-1">Assistance 24/7</p>
                   <p className="text-sm font-black text-on-surface">+243 (0) 00 000 000</p>
                </div>
              </li>
            </ul>

            <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface/40 mb-4">Paiements Acceptés</h5>
            <div className="flex flex-wrap gap-2">
               <div className="px-3 py-1.5 bg-[#EE1B22] text-white text-[10px] font-black rounded italic shadow-sm">M-PESA</div>
               <div className="px-3 py-1.5 bg-[#000000] text-white text-[10px] font-black rounded italic shadow-sm">AIRTEL</div>
               <div className="px-3 py-1.5 bg-[#FF7900] text-white text-[10px] font-black rounded italic shadow-sm">ORANGE</div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-12 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-black text-on-surface/40 uppercase tracking-[0.2em] text-center md:text-left">
            © {currentYear} <span className="text-primary tracking-normal font-black">NOVA+</span> – Internet haut débit par satellite à Likasi.
          </p>
          <div className="flex items-center gap-3 text-primary/30">
             <Zap size={20} />
             <div className="h-[2px] w-20 bg-current"></div>
             <p className="text-[8px] font-black uppercase tracking-widest">Powered by Orbital Horizon</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
