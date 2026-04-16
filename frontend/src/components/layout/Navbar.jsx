import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, User, Satellite, MessageCircle, Info, Tag, Map } from 'lucide-react';
import { LOGO_URL } from '../../constants';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Accueil', path: '/', icon: Satellite },
    { name: 'Offres', path: '/offres', icon: Tag },
    { name: 'Couverture', path: '/coverage', icon: Map },
    { name: 'Support', path: '/support', icon: MessageCircle },
    { name: 'À Propos', path: '/a-propos', icon: Info },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[1000] transition-all duration-500 font-display ${
      scrolled 
      ? 'bg-white/90 backdrop-blur-xl border-b border-primary/10 py-3 shadow-lg' 
      : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 group relative z-10">
            <div className="w-10 h-10 bg-primary/10 rounded-stitch flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-500 shrink-0">
               <Satellite size={24} className={scrolled ? 'text-primary' : 'text-white'} />
            </div>
            <span className={`text-2xl font-black tracking-tighter transition-colors duration-500 ${scrolled ? 'text-on-surface' : 'text-white'}`}>
               NOVA<span className="text-primary italic">+</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all relative py-2 group ${
                  location.pathname === link.path 
                  ? 'text-primary' 
                  : scrolled ? 'text-on-surface/60 hover:text-primary' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
               <Link to="/dashboard" className={`flex items-center gap-3 p-1.5 pr-4 rounded-full transition-all border ${
                 scrolled ? 'bg-primary/5 border-primary/10' : 'bg-white/10 border-white/20'
               }`}>
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs">
                     {user.name?.charAt(0) || 'U'}
                  </div>
                  <div className="text-left">
                     <p className={`text-[8px] font-black uppercase tracking-widest leading-none mb-1 ${scrolled ? 'text-primary/60' : 'text-white/60'}`}>Mon Espace</p>
                     <p className={`text-[10px] font-bold leading-none ${scrolled ? 'text-on-surface' : 'text-white'}`}>{user.name}</p>
                  </div>
               </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className={`text-xs font-black uppercase tracking-widest hover:opacity-80 transition-all ${scrolled ? 'text-on-surface/60' : 'text-white/80'}`}>
                  Connexion
                </Link>
                <Link to="/register" className="btn-primary flex items-center gap-2 py-3 px-6 shadow-xl shadow-primary/20">
                  Inscription <ChevronRight size={16} />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center z-20">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-stitch transition-colors ${
                isOpen ? 'text-on-surface' : (scrolled ? 'text-on-surface' : 'text-white')
              }`}
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Aligné design system */}
      <div className={`fixed inset-0 bg-surface-lowest z-[9] transition-all duration-500 ease-stitch p-6 pt-32 flex flex-col gap-6 lg:hidden ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      }`}>
        <div className="space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-between p-5 rounded-stitch text-2xl font-black tracking-tight border border-primary/5 transition-all ${
                location.pathname === link.path ? 'bg-primary text-white' : 'bg-white text-on-surface hover:bg-primary/5'
              }`}
            >
              {link.name}
              <ChevronRight size={24} className={location.pathname === link.path ? 'text-white/50' : 'text-primary'} />
            </Link>
          ))}
        </div>
        
        <div className="mt-auto pt-10 border-t border-primary/5 space-y-4">
           {user ? (
             <Link to="/dashboard" onClick={() => setIsOpen(false)} className="w-full btn-primary py-5 flex justify-center items-center gap-3">
               Tableau de bord <ChevronRight size={20} />
             </Link>
           ) : (
             <div className="grid grid-cols-2 gap-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="w-full py-5 text-center font-black uppercase tracking-widest text-on-surface/50 border border-primary/5 rounded-stitch">
                  Login
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)} className="w-full btn-primary py-5 flex justify-center items-center gap-3">
                  Sign Up
                </Link>
             </div>
           )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
