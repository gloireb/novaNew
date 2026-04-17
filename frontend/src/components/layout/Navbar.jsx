import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronRight, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { LOGO_URL } from '../../constants';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Forfaits', path: '/offres' },
    { name: 'Likasi', path: '/couverture' },
    { name: 'Vision', path: '/a-propos' },
    { name: 'Expertise', path: '/support' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled ? 'py-4' : 'py-10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav className={`
          flex items-center justify-between px-8 py-3 rounded-full 
          transition-all duration-700 border border-white/10
          ${isScrolled ? 'bg-white/40 backdrop-blur-2xl shadow-premium' : 'bg-transparent border-transparent'}
        `}>
          {/* Logo with Motion */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 15, scale: 1.1 }}
              className="w-10 h-10 bg-primary rounded-stitch-sm flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden"
            >
               <img src={LOGO_URL} alt="NOVA+" className="w-8 h-8 object-contain brightness-0 invert" />
            </motion.div>
            <span className={`font-display font-black text-2xl tracking-tighter uppercase italic transition-colors duration-500 ${isScrolled ? 'text-on-surface' : 'text-white'}`}>
              NOVA<span className="text-primary not-italic">+</span>
            </span>
          </Link>

          {/* Desktop Nav - Pill Style */}
          <div className="hidden md:flex items-center gap-2 p-1 bg-on-surface/5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  relative px-6 py-2 rounded-full font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500
                  ${location.pathname === link.path 
                    ? 'text-primary' 
                    : isScrolled ? 'text-on-surface/40 hover:text-on-surface' : 'text-white/40 hover:text-white'}
                `}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div 
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white shadow-sm rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* User / Dashboard */}
          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard"
              className={`hidden sm:flex items-center gap-2 py-2.5 px-6 rounded-full font-display font-black text-[10px] uppercase tracking-[0.2em] transition-all duration-500 ${
                isScrolled ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white text-primary'
              } hover:scale-105 active:scale-95`}
            >
              <LayoutDashboard size={14} />
              <span>Espace Client</span>
            </Link>
            
            <Link 
              to="/login"
              className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-500 border ${
                isScrolled ? 'bg-on-surface/5 text-on-surface border-on-surface/10 hover:bg-primary hover:text-white hover:border-primary' : 'bg-white/10 text-white border-white/20 hover:bg-white hover:text-primary'
              }`}
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
