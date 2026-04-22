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
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'py-2' : 'py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <nav className={`
          flex items-center justify-between px-6 py-4 rounded-2xl
          transition-all duration-500 border
          ${isScrolled
            ? 'bg-surface-lowest/95 backdrop-blur-2xl shadow-2xl shadow-primary/5 border-white/10'
            : 'bg-surface-lowest/80 backdrop-blur-xl border-white/5'
          }
        `}>
          {/* Brand - NOVA+ */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="w-11 h-11 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 overflow-hidden"
            >
              <Globe className="text-white" size={24} />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-extrabold text-xl tracking-tighter text-on-surface uppercase italic">
                NOVA<span className="text-primary not-italic">+</span>
              </span>
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-on-surface/40">Satellite</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 rounded-lg font-display font-medium text-sm transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface/70 hover:text-on-surface hover:bg-white/5'
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 bg-primary/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 text-on-surface/70 hover:text-on-surface font-medium transition-colors duration-300"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 bg-primary text-white rounded-lg font-display font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              S'inscrire
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-on-surface/70 hover:text-on-surface hover:bg-white/5 transition-all duration-300"
          >
            <motion.div
              animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.div>
          </button>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-4 bg-surface-lowest/95 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-2xl shadow-primary/5 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 rounded-lg font-display font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? 'text-primary bg-primary/10'
                        : 'text-on-surface/70 hover:text-on-surface hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/10 space-y-3">
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-on-surface/70 hover:text-on-surface font-medium transition-colors duration-300"
                  >
                    Connexion
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 bg-primary text-white rounded-lg font-display font-medium text-center hover:bg-primary/90 transition-all duration-300"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
};

export default Navbar;
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
