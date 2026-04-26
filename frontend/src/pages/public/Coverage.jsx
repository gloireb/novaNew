import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight, Satellite, Zap, Radio, Globe, Activity, Loader2 } from 'lucide-react';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Fix for default marker icons in React-Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const LIKASI_COORDS = [-10.9833, 26.7333];

function RecenterMap({ coords }) {
    const map = useMap();
    map.setView(coords, map.getZoom());
    return null;
}

const Coverage = () => {
  const [address, setAddress] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!address) return;
    
    setLoading(true);
    // Simulation of API call
    setTimeout(() => {
      setLoading(false);
      setCheckResult({
        status: 'ÉLIGIBLE',
        zone: 'Likasi Centre',
        latency: '22ms',
        throughput: 'Jusqu\'à 100 Mbps'
      });
    }, 2000);
  };

  return (
    <div className="bg-gray-50 min-h-screen pb-40">
      {/* Header - Atmospheric mastery */}
      <section className="relative pt-48 pb-32 px-6 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-8 relative z-10">
           <motion.h4 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="text-[10px] font-black uppercase tracking-[0.6em] text-blue-600"
           >
             Vérification Orbitale
           </motion.h4>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-6xl md:text-[7rem] font-display font-black text-gray-900 leading-[0.85] tracking-tighter uppercase italic"
           >
             Couverture <br /> <span className="text-blue-600 not-italic">Sans Limites.</span>
           </motion.h1>
           <p className="text-gray-500 text-lg md:text-xl font-body italic max-w-xl mx-auto leading-relaxed">
             "Où que vous soyez dans le Katanga, nous apportons l'orbite à votre porte. Vérifiez votre position en un clic."
           </p>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[120px] -z-0"></div>
      </section>

      {/* Main Tool Container */}
      <section className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Eligibility Form & Results */}
          <div className="lg:col-span-12">
            <div className="bg-white rounded-[2.5rem] p-4 md:p-12 shadow-long-fall border border-gray-200">
              <div className="grid lg:grid-cols-2 gap-12">
                
                {/* Left Side: Input & Info */}
                <div className="space-y-12">
                  <div className="space-y-6">
                    <h3 className="text-2xl font-display font-black uppercase italic tracking-tighter text-gray-900">Testez votre signal</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      Entrez votre quartier ou vos coordonnées pour analyser la puissance du flux satellite disponible dans votre zone.
                    </p>
                  </div>

                  <form onSubmit={handleVerify} className="space-y-6">
                    <div className="relative group">
                      <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-600/40 group-focus-within:text-blue-600 transition-colors" size={20} />
                      <input 
                        type="text" 
                        placeholder="Quartier, Avenue ou Zone à Likasi..." 
                        className="w-full pl-16 pr-6 py-6 bg-gray-100 rounded-2xl outline-none font-bold text-gray-900 placeholder:text-gray-400 border-2 border-transparent focus:border-blue-600/20 transition-all"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={loading || !address}
                      className="w-full flex items-center justify-center gap-3 bg-gray-900 text-white py-6 rounded-2xl font-display font-black text-xs uppercase tracking-[0.4em] hover:opacity-95 transition-all active:scale-95 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          <span>Analyse Orbitale...</span>
                        </>
                      ) : (
                        <>
                          <Satellite size={20} />
                          <span>Vérifier l'éligibilité</span>
                        </>
                      )}
                    </button>
                  </form>

                  {/* Results Display */}
                  <AnimatePresence>
                    {checkResult && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-8 rounded-3xl bg-blue-600 text-white space-y-8 shadow-2xl shadow-blue-600/20"
                      >
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                               <CheckCircle2 size={24} className="animate-pulse" />
                            </div>
                            <div>
                               <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Status de Connexion</p>
                               <h4 className="text-2xl font-display font-black italic uppercase tracking-tighter">{checkResult.status}</h4>
                            </div>
                         </div>
                         
                         <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                               <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Zone Détectée</p>
                               <p className="text-sm font-bold italic">{checkResult.zone}</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                               <p className="text-[8px] font-black uppercase tracking-widest opacity-40 mb-1">Latence Est.</p>
                               <p className="text-sm font-bold italic">{checkResult.latency}</p>
                            </div>
                         </div>

                         <Link to="/offres" className="flex items-center justify-center gap-3 w-full py-5 bg-white text-blue-600 rounded-xl font-display font-black text-[10px] uppercase tracking-[0.3em] hover:scale-[1.02] transition-all">
                            Voir les forfaits <ArrowRight size={14} />
                         </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!checkResult && !loading && (
                    <div className="p-8 rounded-3xl border border-dashed border-gray-200 flex flex-col items-center gap-6 text-center opacity-40 grayscale">
                       <Globe size={40} className="text-blue-600/40" />
                       <p className="text-[10px] font-black uppercase tracking-widest leading-loose">
                         L'IA de géolocalisation attend votre saisie pour analyser la constellation de satellites disponible.
                       </p>
                    </div>
                  )}
                </div>

                {/* Right Side: Map */}
                <div className="relative group rounded-3xl overflow-hidden border border-gray-200 shadow-inner h-[500px] lg:h-full min-h-[400px]">
                   <MapContainer 
                     center={LIKASI_COORDS} 
                     zoom={13} 
                     style={{ height: '100%', width: '100%' }} 
                     zoomControl={false}
                     scrollWheelZoom={false}
                   >
                    <TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    <Circle center={LIKASI_COORDS} radius={6000} pathOptions={{ color: '#00446c', fillColor: '#00446c', fillOpacity: 0.15, weight: 1 }} />
                    <RecenterMap coords={LIKASI_COORDS} />
                  </MapContainer>
                  
                  {/* Floating Indicator */}
                  <div className="absolute top-6 right-6 z-20 bg-white/80 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-gray-200">
                    <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-blue-600 animate-signal"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">Signal Optimal</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* Network Health Cards */}
          <div className="lg:col-span-4 bg-white p-8 rounded-[2rem] border border-gray-200 shadow-premium">
             <div className="flex items-center gap-4 mb-8">
                <Activity className="text-blue-600" size={24} />
                <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-900">Santé du Réseau</h5>
             </div>
             <div className="space-y-6">
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                      <span>Charge Satellite</span>
                      <span>42%</span>
                   </div>
                   <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[42%]"></div>
                   </div>
                </div>
                <div className="space-y-2">
                   <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest opacity-40">
                      <span>Uptime Mensuel</span>
                      <span>99.98%</span>
                   </div>
                   <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-600 w-[99%]"></div>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-8 bg-atmospheric p-10 rounded-[2rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
             <div className="absolute inset-0 bg-noise opacity-10"></div>
             <div className="relative z-10 flex items-center gap-6">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                   <Radio size={32} />
                </div>
                <div>
                   <h4 className="text-xl font-display font-black uppercase italic tracking-tighter leading-none">Signal Global</h4>
                   <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mt-2">LEO Konstellation 4 - Actif</p>
                </div>
             </div>
             <Link to="/support" className="relative z-10 px-10 py-5 bg-white text-blue-600 rounded-xl font-display font-black uppercase tracking-widest text-[9px] hover:scale-105 transition-all">
                Signaler un problème
             </Link>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Coverage;
