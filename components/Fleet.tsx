
import React, { useState, useMemo } from 'react';
import { Users, Briefcase, CheckCircle, Car, LayoutGrid, IndianRupee, Star, ShieldCheck, Crown, Truck, ChevronDown, ChevronUp, Sparkles, Info } from 'lucide-react';
import { VEHICLES } from '../constants.tsx';
import { Vehicle } from '../types.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import Logo from './Logo.tsx';

const CONTACT_NUMBER = '9025743325';

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <div className="glass-card rounded-[2.5rem] overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-orange-500/20 shadow-2xl animate-in fade-in zoom-in duration-500 flex flex-col group/card">
      <div className="relative h-56 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-800 to-black p-6">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
           <Logo className="w-full h-full scale-150 rotate-12" isLight />
        </div>
        
        {/* Floating Vehicle Image or Icon */}
        <div className="relative z-10 w-full h-full flex items-center justify-center group-hover/card:scale-110 transition-transform duration-700">
           {vehicle.image ? (
             <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover rounded-2xl opacity-90 hover:opacity-100" />
           ) : (
             <div className="w-24 h-24 bg-geevee-orange rounded-full flex items-center justify-center text-white shadow-2xl">
               <Car size={48} />
             </div>
           )}
        </div>

        <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
             <span className="text-[10px] font-black text-white uppercase tracking-widest">{vehicle.type}</span>
        </div>
        
        <div className="absolute bottom-4 right-4">
           <div className="flex gap-0.5 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={10} className="text-amber-400 fill-amber-400" />
              ))}
           </div>
        </div>
      </div>
      
      <div className="p-8 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h4 className="text-2xl font-black text-slate-900 dark:text-white leading-tight mb-1">{vehicle.name}</h4>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-bold text-[10px] uppercase tracking-widest">
               <ShieldCheck size={12} /> Verified
            </div>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-black text-geevee-orange leading-none">₹{vehicle.pricePerKm}</span>
            <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 block">per km</span>
          </div>
        </div>

        <div className="flex gap-4 mb-8">
          <div className="flex-1 bg-white/50 dark:bg-white/5 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100 dark:border-white/5">
            <Users size={18} className="text-slate-400" />
            <span className="font-bold text-xs text-slate-700 dark:text-slate-300">{vehicle.capacity} Seats</span>
          </div>
          <div className="flex-1 bg-white/50 dark:bg-white/5 p-3 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100 dark:border-white/5">
            <Briefcase size={18} className="text-slate-400" />
            <span className="font-bold text-xs text-slate-700 dark:text-slate-300">Luggage</span>
          </div>
        </div>

        <ul className="space-y-3 mb-8 flex-grow">
          {vehicle.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium text-xs">
              <div className="w-1.5 h-1.5 rounded-full bg-geevee-orange"></div>
              {f}
            </li>
          ))}
        </ul>

        <button 
          onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`}
          className="w-full py-4 rounded-xl bg-slate-900 dark:bg-white hover:bg-geevee-orange dark:hover:bg-geevee-orange text-white dark:text-black hover:text-white dark:hover:text-white font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95"
        >
          Book This Car
        </button>
      </div>
    </div>
  );
};

const Fleet: React.FC = () => {
  const { language, t, fontClass } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = useMemo(() => [
    { id: 'All', icon: <LayoutGrid size={16} /> },
    { id: 'Mini', icon: <Car size={14} /> },
    { id: 'Sedan', icon: <Car size={18} /> },
    { id: 'SUV', icon: <Car size={22} /> },
    { id: 'Luxury SUV', icon: <Crown size={18} /> },
    { id: 'Van', icon: <Truck size={18} /> }
  ], []);

  const filteredVehicles = useMemo(() => (
    activeFilter === 'All' ? VEHICLES : VEHICLES.filter(v => v.type === activeFilter)
  ), [activeFilter]);

  return (
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className={`text-geevee-orange font-black tracking-[0.4em] uppercase mb-4 text-xs ${fontClass}`}>
          {t.booking.chooseFromFleet}
        </h2>
        <h3 className={`text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 tracking-tight ${fontClass}`}>
          {language === 'ta' ? 'சிறந்த பயண அனுபவத்திற்கான வாகனங்கள்' : 'Premium Vehicles For Every Journey'}
        </h3>
      </div>

      <div className="mb-12 flex flex-wrap justify-center gap-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveFilter(cat.id)}
            className={`px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 backdrop-blur-md border ${
              activeFilter === cat.id
                ? 'bg-geevee-orange text-white border-geevee-orange shadow-lg shadow-orange-500/20'
                : 'bg-white/10 text-slate-500 dark:text-slate-400 hover:bg-white/20 border-white/10'
            }`}
          >
            {cat.icon}
            {cat.id}
          </button>
        ))}
      </div>

      {!isExpanded ? (
        <div className="max-w-4xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <button 
            onClick={() => setIsExpanded(true)}
            className="w-full glass-card border border-white/20 rounded-[3rem] p-12 text-center group transition-all hover:bg-white/10 hover:border-geevee-orange relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 text-geevee-orange group-hover:rotate-12 transition-transform">
              <Sparkles size={120} />
            </div>
            
            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="w-20 h-20 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl text-geevee-orange border border-white/20 group-hover:scale-110 transition-transform">
                <Info size={32} />
              </div>
              
              <div>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                  View Fleet Catalog
                </h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                  Compare pricing and features for all {VEHICLES.length} vehicles.
                </p>
              </div>
              
              <div className="mt-4 animate-bounce">
                <ChevronDown className="text-slate-400" />
              </div>
            </div>
          </button>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 ease-out">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredVehicles.map((v) => (
              <VehicleCard key={v.id} vehicle={v} />
            ))}
          </div>
          
          <div className="flex justify-center">
            <button 
              onClick={() => setIsExpanded(false)}
              className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/10 text-slate-900 dark:text-white rounded-full font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white/20 transition-all"
            >
              <ChevronUp size={14} /> Close Catalog
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Fleet;
