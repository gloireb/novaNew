import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, ChevronDown, Send, MessageCircle, HelpCircle, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';

const FAQ_ITEMS = [
  {
    category: "Installation",
    question: "Quels sont les délais d'activation ?",
    answer: "Une fois votre commande confirmée, une équipe technique NOVA+ intervient à votre domicile ou bureau sous 24h à 48h dans tout le Katanga."
  },
  {
    category: "Paiements",
    question: "Quels modes de paiement acceptez-vous ?",
    answer: "Nous acceptons principalement les paiements mobiles (M-Pesa, Airtel Money, Orange Money) directement via l'espace client, ainsi que les virements pour les comptes Pro."
  },
  {
    category: "Technique",
    question: "Le signal est-il affecté par la météo ?",
    answer: "Notre technologie satellite de nouvelle génération est conçue pour maintenir une stabilité maximale même lors d'intempéries tropicales fortes."
  },
  {
    category: "Compte",
    question: "Puis-je changer de forfait à tout moment ?",
    answer: "Absolument. Vous pouvez upgrader ou ajuster votre forfait directement depuis votre dashboard. Le changement est instantané."
  }
];

const AccordionItem = ({ item, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`rounded-3xl transition-all duration-500 mb-4 ${isOpen ? 'bg-surface-container-lowest shadow-premium' : 'bg-surface-lowest/50 border border-on-surface/[0.03]'}`}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-8 flex justify-between items-center text-left"
      >
        <div className="flex flex-col gap-2">
           <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary/40">{item.category}</span>
           <span className="font-display font-black text-on-surface tracking-tight uppercase text-sm italic">{item.question}</span>
        </div>
        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-white' : 'bg-on-surface/5 text-on-surface/40'}`}>
          <ChevronDown size={20} className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="p-8 pt-0 text-on-surface/50 text-sm leading-relaxed font-body border-t border-on-surface/[0.03] mt-2 pt-6">
              {item.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Message transmis à la constellation NOVA+ (SIMULATION)');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  return (
    <div className="bg-surface-container-low min-h-screen pb-40">
      {/* Header */}
      <section className="relative pt-48 pb-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
           <motion.h4 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-[10px] font-black uppercase tracking-[0.6em] text-primary"
           >
             Assistance & Expertise
           </motion.h4>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-8xl font-display font-black text-on-surface leading-[0.85] tracking-tighter uppercase italic"
           >
             Toujours à <br /> <span className="text-primary not-italic">votre écoute.</span>
           </motion.h1>
           <p className="text-on-surface/40 text-lg md:text-xl font-body italic max-w-xl mx-auto leading-relaxed">
             "Une question technique ou commerciale ? Notre centre de support local garantit une réponse sous 24h."
           </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20">
        
        {/* Left: Contact Form */}
        <div className="space-y-12">
          <div className="bg-surface-container-lowest p-12 rounded-[2.5rem] shadow-long-fall border border-on-surface/[0.03]">
             <h3 className="text-3xl font-display font-black uppercase italic tracking-tighter text-on-surface mb-10">Envoyez un signal</h3>
             <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/20 ml-2">Identité</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Nom complet"
                        className="w-full p-5 bg-surface-container-low rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/20 transition-all"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/20 ml-2">Canal Email</label>
                      <input 
                        type="email" 
                        required
                        placeholder="votre@email.com"
                        className="w-full p-5 bg-surface-container-low rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/20 transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                   </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/20 ml-2">Objet du Support</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Sujet de votre demande"
                    className="w-full p-5 bg-surface-container-low rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/20 transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-widest text-on-surface/20 ml-2">Votre Message</label>
                  <textarea 
                    rows="5"
                    required
                    placeholder="Comment pouvons-nous vous aider ?"
                    className="w-full p-5 bg-surface-container-low rounded-2xl outline-none font-bold text-sm border-2 border-transparent focus:border-primary/20 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-6 bg-on-surface text-surface rounded-2xl font-display font-black text-xs uppercase tracking-[0.4em] shadow-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-4"
                >
                  {isSubmitting ? "Transmission..." : "Envoyer le signal"}
                  <Send size={18} />
                </button>
             </form>
          </div>

          <div className="grid grid-cols-2 gap-6">
             <div className="p-8 bg-surface-lowest rounded-3xl border border-on-surface/[0.03] space-y-4">
                <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                   <Phone size={20} />
                </div>
                <div>
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface/30">Direct</h5>
                   <p className="text-xl font-display font-black italic">+243 (0) 000 000</p>
                </div>
             </div>
             <div className="p-8 bg-surface-lowest rounded-3xl border border-on-surface/[0.03] space-y-4">
                <div className="w-10 h-10 bg-primary/5 text-primary rounded-full flex items-center justify-center">
                   <Mail size={20} />
                </div>
                <div>
                   <h5 className="text-[10px] font-black uppercase tracking-widest text-on-surface/30">Email</h5>
                   <p className="text-sm font-display font-black italic">support@novaplus.com</p>
                </div>
             </div>
          </div>
        </div>

        {/* Right: FAQ */}
        <div className="space-y-12">
          <div className="space-y-6">
             <h3 className="text-4xl font-display font-black uppercase italic tracking-tighter text-on-surface leading-none">Questions <br /> Fréquentes.</h3>
             <p className="text-on-surface/40 text-sm max-w-sm">Trouvez des réponses immédiates sur l'installation, les forfaits et le fonctionnement technique.</p>
          </div>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} item={item} index={i} />
            ))}
          </div>

          <div className="bg-atmospheric p-12 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-primary/20">
             <div className="absolute inset-0 bg-noise opacity-10"></div>
             <div className="relative z-10 flex items-start gap-6">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shrink-0">
                   <MapPin size={28} />
                </div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-display font-black uppercase italic tracking-tighter">Bureau Physique</h4>
                   <p className="text-white/50 text-sm leading-relaxed">
                     Passez nous voir pour un test de vitesse en direct ou vos paiements à Likasi.
                   </p>
                   <div className="space-y-2 pt-4">
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                         <Clock size={14} className="text-white/40" /> 
                         <span>Lun - Ven: 08:30 - 18:00</span>
                      </div>
                      <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                         <MapPin size={14} className="text-white/40" /> 
                         <span>Avenue de l'Église, Likasi, RDC</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
