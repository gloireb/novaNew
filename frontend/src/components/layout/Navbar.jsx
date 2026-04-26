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
    <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl shadow-blue-600/5">
      <div className="max-w-7xl mx-auto px-8">
        <nav className="flex items-center justify-between py-5">
          {/* Brand - NOVA+ */}
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 overflow-hidden">
              <Globe className="text-white" size={28} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-display font-black text-2xl tracking-tighter text-gray-900 uppercase italic">
                NOVA<span className="text-blue-600 not-italic">+</span>
              </span>
              <span className="text-xs font-black uppercase tracking-[0.3em] text-gray-500">Satellite Internet</span>
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
                    ? 'text-blue-600 bg-blue-600/10'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-white/5'
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
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-display font-bold text-base transition-colors duration-300"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-xl font-display font-bold text-base hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile Action Buttons */}
          <div className="lg:hidden flex items-center gap-3">
            <button className="p-2 text-gray-500 hover:text-blue-600 transition-colors">
              <Search size={20} />
            </button>
            <Link
              to="/login"
              className="w-10 h-10 rounded-full bg-blue-600/5 text-blue-600 flex items-center justify-center border border-blue-600/10 hover:bg-blue-600 hover:text-white transition-all duration-300"
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
