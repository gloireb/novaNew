import React, { useState } from 'react';
import { Mail, MapPin, Clock, ChevronDown, Send, MessageCircle, Phone, ArrowRight, User, HelpCircle } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Comment puis-je m'abonner à NOVA+ ?",
    answer: "C'est très simple ! Vous pouvez vous inscrire directement via notre site sur la page d'inscription, ou vous rendre dans notre bureau physique à Likasi (Avenue de l'Église) pour une assistance personnalisée."
  },
  {
    question: "Quels sont les délais d'installation ?",
    answer: "Une fois votre commande confirmée, une équipe technique NOVA+ intervient à votre domicile ou bureau sous 24h à 48h sur Likasi et ses environs."
  },
  {
    question: "Puis-je changer de forfait en cours de mois ?",
    answer: "Oui, vous pouvez faire évoluer votre forfait à tout moment depuis votre espace client. Le changement sera effectif dès le prochain cycle de facturation ou immédiatement selon votre choix."
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les paiements mobiles (M-Pesa, Airtel Money, Orange Money) directement via l'application ou en agence, ainsi que les virements bancaires pour les forfaits Pro."
  }
];

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`card overflow-hidden transition-all duration-300 border border-primary/5 ${isOpen ? 'ring-2 ring-primary/10' : ''}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 flex justify-between items-center text-left hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-center gap-4">
           <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-primary text-white' : 'bg-primary/5 text-primary'}`}>
              <HelpCircle size={18} />
           </div>
           <span className="font-black text-on-surface tracking-tight uppercase text-xs italic">{question}</span>
        </div>
        <ChevronDown size={20} className={`text-primary/40 transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
        <div className="p-8 pt-0 text-on-surface/60 text-sm leading-relaxed font-medium">
          {answer}
        </div>
      </div>
    </div>
  );
};

const Support = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Support form submitted:', formData);
    alert('Merci ! Votre message a été envoyé (simulation).');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-surface pb-32 font-display">
      {/* Hero Section */}
      <section className="bg-white pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] -skew-x-12 translate-x-1/4 -z-10"></div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2 animate-in fade-in slide-in-from-left duration-700">
             <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 rounded-full mb-8 border border-primary/10">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Assistance NOVA+</span>
             </div>
             <h1 className="text-5xl md:text-7xl font-black mb-10 text-on-surface tracking-tighter uppercase italic leading-[0.9]">
                Toujours à <span className="text-primary not-italic">votre écoute.</span>
             </h1>
             <p className="text-xl text-on-surface/60 font-medium leading-relaxed">
                Une question ? Un problème technique ? Notre équipe basée à Likasi est là pour vous garantir une expérience satellite sans faille.
             </p>
          </div>
          <div className="md:w-1/2 w-full">
             <div className="grid grid-cols-2 gap-4">
                <div className="p-8 bg-atmospheric rounded-stitch text-white relative overflow-hidden group">
                   <Phone className="absolute -right-4 -bottom-4 text-white/10 group-hover:scale-110 transition-transform duration-700" size={100} />
                   <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-6 border border-white/20">
                      <Phone size={20} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Téléphone</p>
                   <p className="text-lg font-black">+243 (0) 00 000 000</p>
                </div>
                <div className="p-8 bg-surface-lowest rounded-stitch border border-primary/5 shadow-xl shadow-primary/5 relative overflow-hidden group">
                   <Mail className="absolute -right-4 -bottom-4 text-primary/5 group-hover:scale-110 transition-transform duration-700" size={100} />
                   <div className="w-12 h-12 bg-primary/5 text-primary rounded-full flex items-center justify-center mb-6 border border-primary/5">
                      <Mail size={20} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest text-on-surface/30 mb-1">Email</p>
                   <p className="text-lg font-black text-on-surface truncate">support@nova.plus</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid lg:grid-cols-2 gap-16">
        
        {/* Contact Form */}
        <section className="animate-in fade-in slide-in-from-bottom duration-700">
          <div className="card bg-white p-12 border border-primary/5 shadow-2xl relative">
            <div className="absolute top-0 right-0 p-8">
               <div className="w-12 h-12 bg-primary/5 rounded-full flex items-center justify-center text-primary/40">
                  <MessageCircle size={24} />
               </div>
            </div>
            <h2 className="text-4xl font-black mb-10 tracking-tight text-on-surface">Envoyez un message</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest px-1">Votre Nom</label>
                  <input 
                    type="text" 
                    className="w-full p-4 bg-surface-container-low rounded-stitch border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold placeholder:text-on-surface/20" 
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest px-1">Email de contact</label>
                  <input 
                    type="email" 
                    className="w-full p-4 bg-surface-container-low rounded-stitch border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold placeholder:text-on-surface/20" 
                    placeholder="jean@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest px-1">Sujet de la demande</label>
                <input 
                  type="text" 
                  className="w-full p-4 bg-surface-container-low rounded-stitch border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold placeholder:text-on-surface/20" 
                  placeholder="Installation, Facturation, Support technique..."
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-on-surface/40 uppercase tracking-widest px-1">Votre Message</label>
                <textarea 
                  rows="5" 
                  className="w-full p-4 bg-surface-container-low rounded-stitch border-2 border-transparent focus:border-primary/20 outline-none transition-all font-bold placeholder:text-on-surface/20 resize-none" 
                  placeholder="Expliquez-nous votre besoin..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>
              <button className="w-full btn-primary py-5 flex items-center justify-center gap-3 text-lg shadow-xl shadow-primary/10 group">
                Envoyer ma demande <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="space-y-10 animate-in fade-in slide-in-from-right duration-700">
          <div>
             <h2 className="text-4xl font-black mb-8 tracking-tight text-on-surface italic">Foire aux <span className="text-primary not-italic">questions.</span></h2>
             <p className="text-on-surface/60 font-medium text-lg mb-10">Retrouvez les réponses aux questions les plus fréquentes sur nos services à Likasi.</p>
          </div>
          
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem key={i} question={item.question} answer={item.answer} />
            ))}
          </div>

          <div className="card p-10 bg-primary/5 border-primary/10 border-2">
             <div className="flex gap-6">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shrink-0">
                   <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-black mb-2 text-on-surface uppercase tracking-tight italic">Bureau Physique Likasi</h4>
                  <p className="text-on-surface/60 text-sm leading-relaxed mb-6 font-medium">
                     Passez nous voir pour un test de vitesse en direct ou pour vos paiements en espèces.
                  </p>
                  <div className="space-y-2 text-primary font-bold text-sm">
                     <p className="flex items-center gap-2 italic uppercase tracking-widest text-[10px]">
                        <Clock size={14} /> Lun - Ven: 08:30 - 18:00
                     </p>
                     <p className="flex items-center gap-2 italic uppercase tracking-widest text-[10px]">
                        <MapPin size={14} /> Avenue de l'Église, Likasi, RDC
                     </p>
                  </div>
                </div>
             </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
