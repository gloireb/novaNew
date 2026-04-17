import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  User as UserIcon, 
  Mail, 
  Lock, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronRight, 
  Zap, 
  Globe,
  Loader2,
  Signal
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    quartier: '',
    name: '',
    email: '',
    password: '',
    offer: 'Populaire'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setError('');
    setIsLoading(true);
    
    // Prepare data based on schema
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      quartier: formData.quartier,
      offerName: formData.offer
    };

    const result = await register(data);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || "Erreur lors de l'inscription.");
      setStep(2); // Go back to credentials step if error
    }
    setIsLoading(false);
  };

  const plans = [
    { id: 'Essentiel', price: '49.99', speed: '25', icon: Zap },
    { id: 'Populaire', price: '79.99', speed: '50', icon: Signal, popular: true },
    { id: 'Famille', price: '129.99', speed: '100', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col justify-center py-12 px-6 relative overflow-hidden font-display">
      {/* Decorative */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-0"></div>

      <div className="max-w-xl w-full mx-auto relative z-10 space-y-12">
        <div className="text-center space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 group">
             <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-all duration-500">
                <Globe className="text-white" size={20} />
             </div>
             <span className="font-display font-extrabold text-2xl tracking-tighter text-on-surface uppercase italic">
               NOVA<span className="text-primary not-italic">+</span>
             </span>
          </Link>
          <h2 className="text-4xl font-display font-black text-on-surface tracking-tighter uppercase italic leading-none">Rejoindre l'Orbite</h2>
          <p className="text-on-surface/30 text-[10px] font-black uppercase tracking-[0.4em] italic leading-none">Connectez votre foyer aujourd'hui</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between px-4 relative">
          <div className="absolute top-5 left-8 right-8 h-0.5 bg-on-surface/5 -z-10"></div>
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[10px] font-black border-2 transition-all duration-500 ${step >= s ? 'bg-primary border-primary text-white shadow-lg shadow-primary/20' : 'bg-surface-container-lowest border-on-surface/10 text-on-surface/20'}`}>
                {step > s ? <CheckCircle2 size={16} /> : s}
              </div>
              <span className={`text-[8px] font-black uppercase tracking-widest ${step >= s ? 'text-primary' : 'text-on-surface/20'}`}>
                {s === 1 ? 'Zone' : s === 2 ? 'Identité' : 'Forfait'}
              </span>
            </div>
          ))}
        </div>

        <motion.div 
          layout
          className="bg-surface-container-lowest p-10 md:p-12 rounded-[2.5rem] shadow-long-fall border border-on-surface/[0.03]"
        >
          {error && (
             <div className="mb-8 p-4 bg-error/5 text-error rounded-xl flex items-center gap-3 border border-error/10">
                <AlertCircle size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">{error}</span>
             </div>
          )}

          <form onSubmit={handleNext} className="space-y-10">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Localisation</h3>
                    <p className="text-xs text-on-surface/40 leading-relaxed font-body">Confirmez votre zone d'installation à Likasi.</p>
                  </div>
                  <div className="space-y-4">
                    <label className="block text-[9px] font-black uppercase tracking-[0.3em] text-on-surface/30 ml-2">Quartier ou Avenue</label>
                    <div className="relative group">
                       <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors" size={20} />
                       <input 
                         type="text" required
                         className="w-full pl-16 pr-6 py-6 bg-surface-container-high rounded-2xl outline-none font-bold text-on-surface placeholder:text-on-surface/20 border-2 border-transparent focus:border-primary/10 transition-all"
                         placeholder="Ex: Kikula, Avenue de l'Église..."
                         value={formData.quartier}
                         onChange={(e) => setFormData({ ...formData, quartier: e.target.value })}
                       />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Création du Profil</h3>
                    <p className="text-xs text-on-surface/40 leading-relaxed font-body">Vos identifiants pour accéder au dashboard NOVA+.</p>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 ml-2">Nom Complet</label>
                      <div className="relative group">
                         <UserIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-primary transition-colors" size={18} />
                         <input 
                           type="text" required
                           className="w-full pl-16 pr-6 py-5 bg-surface-container-high rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/10 transition-all"
                           placeholder="Jean Kalambay"
                           value={formData.name}
                           onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                         />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 ml-2">Email</label>
                      <div className="relative group">
                         <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-primary transition-colors" size={18} />
                         <input 
                           type="email" required
                           className="w-full pl-16 pr-6 py-5 bg-surface-container-high rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/10 transition-all"
                           placeholder="jean@gmail.com"
                           value={formData.email}
                           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                         />
                      </div>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[9px] font-black uppercase tracking-widest text-on-surface/30 ml-2">Mot de passe</label>
                      <div className="relative group">
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-on-surface/20 group-focus-within:text-primary transition-colors" size={18} />
                         <input 
                           type="password" required
                           className="w-full pl-16 pr-6 py-5 bg-surface-container-high rounded-xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/10 transition-all"
                           placeholder="••••••••"
                           value={formData.password}
                           onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                         />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h3 className="text-xl font-display font-black uppercase italic tracking-tighter">Sélection du Forfait</h3>
                    <p className="text-xs text-on-surface/40 leading-relaxed font-body">Choisissez la puissance orbitale qui vous convient.</p>
                  </div>
                  <div className="space-y-4">
                    {plans.map((p) => (
                      <label 
                        key={p.id} 
                        className={`
                          flex items-center justify-between p-6 rounded-2xl border-2 cursor-pointer transition-all relative overflow-hidden
                          ${formData.offer === p.id 
                            ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' 
                            : 'border-on-surface/5 hover:border-primary/20 bg-surface-container-low'}
                        `}
                      >
                        <div className="flex items-center gap-5 z-10">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${formData.offer === p.id ? 'bg-primary text-white' : 'bg-on-surface/5 text-on-surface/40'}`}>
                            <p.icon size={20} />
                          </div>
                          <div>
                            <p className="font-display font-black text-sm uppercase italic tracking-tight">{p.id}</p>
                            <p className="text-[9px] font-bold text-on-surface/40 uppercase tracking-widest mt-1">{p.speed} Mbps • Illimité</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-6 z-10">
                           <span className="text-xl font-display font-black italic text-primary">${p.price}</span>
                           <input
                             type="radio"
                             name="offer"
                             className="w-5 h-5 text-primary border-primary focus:ring-primary h-4 w-4"
                             checked={formData.offer === p.id}
                             onChange={() => setFormData({ ...formData, offer: p.id })}
                           />
                        </div>
                      </label>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col sm:flex-row gap-4 pt-8 border-t border-on-surface/[0.03]">
              {step > 1 && (
                <button 
                  type="button" 
                  onClick={() => setStep(step - 1)} 
                  className="flex-1 py-5 rounded-2xl border-2 border-on-surface/5 text-on-surface/40 font-display font-black text-[10px] uppercase tracking-widest hover:bg-on-surface/5 transition-all"
                >
                  Précédent
                </button>
              )}
              <button 
                type="submit" 
                disabled={isLoading}
                className="flex-[2] bg-on-surface text-surface py-5 rounded-2xl font-display font-black text-[10px] uppercase tracking-[0.4em] shadow-xl flex items-center justify-center gap-4 hover:opacity-95 active:scale-95 transition-all disabled:opacity-50"
              >
                {isLoading ? "Synchronisation..." : step === 3 ? "Lancer l'Orbite" : "Continuer"}
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ChevronRight size={16} />}
              </button>
            </div>
          </form>
        </motion.div>

        <div className="text-center">
           <p className="text-[10px] font-bold text-on-surface/40 uppercase tracking-[0.2em]">
             Déjà dans la constellation ? <Link to="/login" className="text-primary hover:underline decoration-2 underline-offset-4">S'identifier</Link>
           </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
