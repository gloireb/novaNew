import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Search, Globe } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Offres', path: '/offres' },
    { name: 'Couverture', path: '/couverture' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-surface-lowest/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-primary/5">
      <div className="max-w-7xl mx-auto px-8">
        <nav className="flex items-center justify-between py-5">
          {/* Brand - NOVA+ */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden">
              <Globe className="text-white" size={28} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-black text-2xl tracking-tighter text-on-surface uppercase italic">
                NOVA<span className="text-primary not-italic">+</span>
              </span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-on-surface/50">Satellite Internet</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-6 py-3 rounded-xl font-display font-bold text-base transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface/70 hover:text-on-surface hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 text-on-surface/70 hover:text-on-surface font-display font-bold text-base transition-colors duration-300"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl font-display font-bold text-base hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 hover:-translate-y-1"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile Action Buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button className="p-2 text-on-surface/40 hover:text-primary transition-colors">
              <Search size={20} />
            </button>
            <Link
              to="/login"
              className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center border border-primary/10 hover:bg-primary hover:text-white transition-all duration-300"
            >
              <User size={18} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
