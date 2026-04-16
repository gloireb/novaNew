import React, { useState } from 'react';
import { MapContainer, TileLayer, Circle, Popup, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, MapPin, CheckCircle2, AlertCircle, ArrowRight, Satellite, Zap } from 'lucide-react';
import L from 'leaflet';

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

// Helper to center map
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
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setCheckResult({
        eligible: true,
        signalStrength: '98%',
        nearestHub: 'Likasi Central',
        latency: '25ms'
      });
    }, 1500);
  };

  return (
    <div className="bg-surface pb-32 font-display">
      {/* Hero Header */}
      <section className="bg-white pt-32 pb-24 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/[0.02] skew-x-12 translate-x-1/4 -z-10"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-primary/5 rounded-full mb-8 border border-primary/10">
               <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Couverture Temps Réel</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black mb-10 text-on-surface tracking-tighter uppercase italic leading-[0.9]">
            Connectés à <span className="text-primary not-italic">l'orbite.</span>
          </h1>
          <p className="text-xl text-on-surface/60 max-w-2xl mx-auto font-medium mb-12">
            Notre réseau satellite couvre 100% du territoire de Likasi et ses environs. Vérifiez la puissance du signal NOVA+ chez vous.
          </p>

          {/* Search Box */}
          <div className="max-w-2xl mx-auto bg-white p-2 rounded-stitch shadow-2xl border border-primary/5 relative z-20 flex flex-col sm:flex-row gap-2">
            <div className="flex-grow flex items-center px-4 gap-3 bg-surface-container-low rounded-stitch border border-transparent focus-within:border-primary/20 transition-all">
              <MapPin size={20} className="text-primary/40" />
              <input 
                type="text" 
                placeholder="Entrez votre quartier ou rue à Likasi..." 
                className="w-full py-5 bg-transparent outline-none text-on-surface font-bold placeholder:text-on-surface/30"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button 
              onClick={handleVerify}
              disabled={loading}
              className="btn-primary py-4 px-10 flex items-center justify-center gap-3 text-lg font-black disabled:opacity-50"
            >
              {loading ? 'Analyse...' : 'Vérifier'} <ArrowRight size={22} />
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Map Section */}
          <div className="lg:col-span-2 h-[600px] rounded-stitch overflow-hidden shadow-2xl border-4 border-white relative group">
             <div className="absolute inset-0 z-10 bg-primary/5 pointer-events-none group-hover:bg-transparent transition-all duration-700"></div>
             <MapContainer center={LIKASI_COORDS} zoom={13} style={{ height: '100%', width: '100%' }} zoomControl={false}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Circle 
                  center={LIKASI_COORDS} 
                  radius={5000} 
                  pathOptions={{ color: '#0A5C8E', fillColor: '#0A5C8E', fillOpacity: 0.15, weight: 2 }}
                />
                <Marker position={LIKASI_COORDS}>
                   <Popup className="font-display font-bold">Couverture NOVA+ Likasi</Popup>
                </Marker>
                <RecenterMap coords={LIKASI_COORDS} />
             </MapContainer>
             
             {/* Map Stats Badge */}
             <div className="absolute top-6 left-6 z-[1001] bg-white p-4 rounded-stitch shadow-xl border border-primary/5 hidden md:block">
                <div className="flex items-center gap-3">
                   <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface">Satellite LEO-1 Link: OK</p>
                </div>
             </div>
          </div>

          {/* Results / Info Sidebar */}
          <div className="space-y-6">
            {!checkResult ? (
              <div className="card h-full flex flex-col items-center justify-center text-center p-10 bg-primary/[0.02] border-dashed border-2 border-primary/10">
                 <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center text-primary/30 mb-8">
                    <Satellite size={40} />
                 </div>
                 <h3 className="text-xl font-black mb-4">Prêt pour l'orbite ?</h3>
                 <p className="text-on-surface/60 text-sm leading-relaxed mb-8">
                    Saisissez votre adresse ci-dessus pour simuler la qualité de réception satellite à votre emplacement exact.
                 </p>
                 <div className="space-y-3 w-full">
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-stitch">
                       <Zap size={16} className="text-primary/30" />
                       <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/10 w-0"></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-white/50 rounded-stitch">
                       <Zap size={16} className="text-primary/30" />
                       <div className="h-2 w-full bg-primary/5 rounded-full overflow-hidden">
                          <div className="h-full bg-primary/10 w-0"></div>
                       </div>
                    </div>
                 </div>
              </div>
            ) : (
              <div className="card border-primary p-10 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom duration-500">
                 <div className="inline-flex items-center gap-2 text-green-600 mb-8 p-3 bg-green-50 rounded-stitch border border-green-100 italic font-black text-xs">
                    <CheckCircle2 size={16} /> Signal Optimal
                 </div>
                 <h3 className="text-3xl font-black text-on-surface tracking-tighter mb-8">Éligibilité Confirmée à Likasi</h3>
                 
                 <div className="space-y-8">
                    <div className="flex justify-between items-center py-4 border-b border-primary/5">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Force du signal</p>
                       <p className="text-xl font-black text-primary">{checkResult.signalStrength}</p>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-primary/5">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Latence moyenne</p>
                       <p className="text-xl font-black text-on-surface">{checkResult.latency}</p>
                    </div>
                    <div className="flex justify-between items-center py-4 border-b border-primary/5">
                       <p className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface/40">Point de Relay</p>
                       <p className="text-xl font-black text-on-surface">{checkResult.nearestHub}</p>
                    </div>
                 </div>

                 <Link to="/register" className="w-full btn-primary py-5 mt-12 flex justify-center items-center gap-3 shadow-xl">
                    S'abonner maintenant <ArrowRight size={20} />
                 </Link>
              </div>
            )}

            <div className="p-8 bg-atmospheric rounded-stitch text-white">
               <h4 className="font-black italic mb-4">Besoin d'aide ?</h4>
               <p className="text-white/70 text-sm leading-relaxed font-medium mb-6">
                  Nos techniciens à Likasi peuvent se déplacer pour une étude de site gratuite.
               </p>
               <Link to="/support" className="flex items-center gap-2 text-white font-black uppercase tracking-widest text-[10px] hover:underline">
                  Contacter le support <ArrowRight size={14} />
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
