import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, ArrowRight, AlertCircle, ShieldCheck, Globe, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || "Identifiants invalides.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-surface-container-low relative overflow-hidden font-display py-12 px-6">
      {/* Design Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 -z-0"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="text-center mb-12 space-y-4">
           <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-all duration-500">
                 <Globe className="text-white" size={20} />
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tighter text-on-surface uppercase italic">
                NOVA<span className="text-primary not-italic">+</span>
              </span>
           </Link>
           <h2 className="text-4xl font-display font-black text-on-surface tracking-tighter uppercase italic leading-none">Accès Portail</h2>
           <p className="text-on-surface/30 text-[10px] font-black uppercase tracking-[0.4em] italic">Connectez-vous à la constellation</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface-container-lowest p-10 md:p-12 rounded-[2.5rem] shadow-long-fall border border-on-surface/[0.03]"
        >
           {error && (
             <motion.div 
               initial={{ opacity: 0, x: -10 }}
               animate={{ opacity: 1, x: 0 }}
               className="mb-8 p-4 bg-error/5 text-error rounded-xl flex items-center gap-3 border border-error/10"
             >
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
             </motion.div>
           )}

           <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="space-y-3">
                 <label className="block text-[9px] font-black text-on-surface/30 uppercase tracking-[0.3em] ml-2">Identifiant Email</label>
                 <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="email" 
                      required
                      className="w-full pl-16 pr-6 py-6 bg-surface-container-high rounded-2xl outline-none font-bold text-on-surface placeholder:text-on-surface/20 border-2 border-transparent focus:border-primary/10 transition-all text-sm"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                 </div>
              </div>

              <div className="space-y-3">
                 <div className="flex justify-between items-center px-2">
                    <label className="block text-[9px] font-black text-on-surface/30 uppercase tracking-[0.3em]">Mot de passe</label>
                    <Link to="#" className="text-[9px] font-black text-primary uppercase tracking-widest hover:underline decoration-2 underline-offset-4">Oublié ?</Link>
                 </div>
                 <div className="relative group">
                    <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-primary transition-colors" size={18} />
                    <input 
                      type="password" 
                      required
                      className="w-full pl-16 pr-6 py-6 bg-surface-container-high rounded-2xl outline-none font-bold text-on-surface placeholder:text-on-surface/20 border-2 border-transparent focus:border-primary/10 transition-all text-sm"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                 </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-on-surface text-surface py-6 rounded-2xl shadow-xl hover:opacity-95 flex justify-center items-center gap-4 disabled:opacity-50 transition-all active:scale-95 group"
              >
                <span className="text-xs font-display font-black uppercase tracking-[0.4em]">{isLoading ? 'Identification...' : 'Se Connecter'}</span>
                {isLoading ? <Loader2 size={18} className="animate-spin" /> : <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
              </button>
           </form>

           <div className="mt-12 pt-8 border-t border-on-surface/5 text-center space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 rounded-full text-[9px] font-black uppercase tracking-widest text-primary">
                 <ShieldCheck size={14} /> Connexion Sécurisée AES-256
              </div>
              <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">
                 Nouveau sur NOVA+ ? <Link to="/register" className="text-primary hover:underline underline-offset-4 decoration-2">Créer un profil</Link>
              </p>
           </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
