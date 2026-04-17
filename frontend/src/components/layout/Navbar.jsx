import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, ChevronRight, LayoutDashboard, Search, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Offres', path: '/offres' },
    { name: 'Couverture', path: '/couverture' },
    { name: 'Support', path: '/support' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-3' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav className={`
          flex items-center justify-between px-8 py-3 rounded-2xl
          transition-all duration-500
          ${isScrolled ? 'bg-surface-lowest/80 backdrop-blur-xl shadow-long-fall' : 'bg-transparent'}
        `}>
          {/* Brand - Absolute Model NOVA+ */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden transform group-hover:rotate-12 transition-transform duration-500">
               <Globe className="text-white" size={24} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-xl tracking-tighter text-on-surface uppercase italic">
                NOVA<span className="text-primary not-italic">+</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface/30">Satellite</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  font-display font-bold text-sm uppercase tracking-widest transition-all duration-300
                  ${location.pathname === link.path 
                    ? 'text-primary' 
                    : 'text-on-surface/60 hover:text-primary'}
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action Area */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-on-surface/40 hover:text-primary transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            
            <Link 
              to="/dashboard"
              className="hidden md:flex items-center gap-2 bg-on-surface text-surface py-2.5 px-6 rounded-full font-display font-black text-[10px] uppercase tracking-[0.3em] hover:opacity-90 transition-all active:scale-95 shadow-lg shadow-on-surface/10"
            >
              <LayoutDashboard size={14} />
              <span>Dashboard</span>
            </Link>

            <Link 
              to="/login"
              className="w-10 h-10 rounded-full bg-primary/5 text-primary flex items-center justify-center border border-primary/10 hover:bg-primary hover:text-white transition-all duration-500"
            >
              <User size={18} />
            </Link>

            {/* Mobile Toggle */}
            <button 
              className="lg:hidden p-2 text-on-surface"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-surface-lowest border-t border-on-surface/5 shadow-2xl p-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display font-bold text-lg text-on-surface hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-on-surface/5" />
              <Link 
                to="/dashboard"
                className="flex items-center justify-center gap-2 bg-primary text-white py-4 rounded-xl font-display font-black text-xs uppercase tracking-widest"
              >
                Espace Client
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
