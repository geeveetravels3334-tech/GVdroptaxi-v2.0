
import React, { useState, useMemo } from 'react';
import { Users, Briefcase, CheckCircle, Car, LayoutGrid, IndianRupee, Star, ShieldCheck, Crown, Truck, ChevronDown, ChevronUp, Sparkles, Info, ArrowRight } from 'lucide-react';
import { VEHICLES } from '../constants.tsx';
import { Vehicle } from '../types.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { usePricing } from '../contexts/PricingContext.tsx';
import { motion, AnimatePresence } from 'motion/react';
import Logo from './Logo.tsx';
import OptimizedImage from './OptimizedImage.tsx';
import { Loader2 } from 'lucide-react';

const CONTACT_NUMBER = '9025743325';

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <div 
      className="group/card relative h-full rounded-[2.5rem] md:rounded-[3rem] overflow-hidden flex flex-col transition-[transform,box-shadow,border-color,background-color] duration-500 md:hover:-translate-y-1 border border-slate-200 dark:border-[#D4AF37]/20 hover:border-[#D4AF37]/45 shadow-xl dark:shadow-[0_32px_128px_-16px_rgba(0,0,0,0.6)] hover:shadow-[0_45px_135px_rgba(212,175,55,0.15)] bg-white dark:bg-gradient-to-b dark:from-[#111827]/85 dark:via-[#0B0F1A]/95 dark:to-[#0B0F1A] select-none"
    >
      {/* Cinematic Lighting Refraction & Sunset Glow Backlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none z-10"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent opacity-80 mix-blend-color-dodge z-0 animate-slow-pulse pointer-events-none"></div>

      {/* Image Showcase */}
      <div className="relative h-64 md:h-80 overflow-hidden flex items-center justify-center p-8 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white dark:to-[#0B0F1A] pointer-events-none z-20"></div>
        
        {/* Vehicle Image with cinematic shadow and hover zoom */}
        <div className="relative z-10 w-full h-full flex items-center justify-center md:group-hover/card:scale-[1.05] transition-transform duration-700 ease-[0.16,1,0.3,1]">
          {vehicle.image ? (
            <OptimizedImage 
              src={vehicle.image} 
              alt={vehicle.name} 
              objectFit="contain"
              className="drop-shadow-[0_24px_48px_rgba(0,0,0,0.8)] group-hover/card:drop-shadow-[0_36px_72px_rgba(212,175,55,0.28)] transition-all duration-700 contrast-[1.05]" 
              containerClassName="w-full h-full"
            />
          ) : (
             <div className="w-24 h-24 bg-white/5 backdrop-blur-3xl rounded-full flex items-center justify-center text-luxury-gold-soft border border-white/10 shadow-2xl">
               <Car size={40} />
             </div>
          )}
        </div>

        {/* Floating Tags */}
        <div className="absolute top-8 left-8 flex flex-col gap-3 z-30">
            <span className="bg-[#111827]/80 backdrop-blur-xl px-5 py-2 rounded-full border border-white/10 text-[8px] font-black text-[#D1D5DB] uppercase tracking-[0.4em] shadow-2xl">
              {vehicle.type}
            </span>
            {vehicle.type === 'SUV' && (
              <span className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-[#0B0F1A] px-5 py-2 rounded-full text-[8px] font-black uppercase tracking-[0.4em] shadow-[0_10px_20px_rgba(212,175,55,0.25)] flex items-center gap-2">
                <Crown size={12} /> Elite
              </span>
            )}
        </div>
      </div>
      
      {/* Luxury Content Section */}
      <div className="p-8 md:p-12 flex-grow flex flex-col z-20">
        <div className="flex justify-between items-start mb-6 md:mb-8 gap-4 md:gap-6">
          <div className="space-y-3">
            <h4 className="text-2xl md:text-3.5xl font-normal tracking-tight text-white italic font-serif leading-none group-hover/card:text-luxury-gold-soft transition-colors">{vehicle.name}</h4>
            <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 px-3 py-1.5 rounded-full border border-[#D4AF37]/30">
               <ShieldCheck size={12} className="text-[#D4AF37]" /> 
               <span className="text-luxury-gold font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em]">Supreme Heritage Certified</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[8px] md:text-[9px] font-mono font-bold text-[#9CA3AF] uppercase tracking-[0.4em] mb-1 leading-none">Valuation</p>
            <span className="block text-3xl md:text-4.5xl font-normal text-luxury-gold-soft tracking-tight leading-none italic font-serif">₹{vehicle.pricePerKm}</span>
            <span className="text-[9px] md:text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest font-mono">/ km</span>
          </div>
        </div>

        {/* Signature Features Grid */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8 md:mb-10">
          <div className="bg-[#111827] backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-1.5 transition-colors group-hover/card:border-[#D4AF37]/15">
             <Users size={16} className="text-[#D4AF37]" />
             <p className="text-[9px] md:text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-[0.3em]">Personnel</p>
             <p className="font-bold text-xs md:text-sm text-white">{vehicle.capacity} Travelers</p>
          </div>
          <div className="bg-[#111827] backdrop-blur-md p-4 md:p-5 rounded-2xl border border-white/5 flex flex-col items-center gap-1.5 transition-colors group-hover/card:border-[#D4AF37]/15">
             <Briefcase size={16} className="text-[#D4AF37]" />
             <p className="text-[9px] md:text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-[0.3em]">Volume</p>
             <p className="font-bold text-xs md:text-sm text-white">4 Large Bags</p>
          </div>
        </div>

        {/* Exclusive Feature List */}
        <div className="mb-8 md:mb-10 flex-grow">
          <div className="space-y-3">
            {vehicle.features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-[#D1D5DB] text-[10px] md:text-xs font-medium tracking-tight">
                <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_6px_#D4AF37]" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Global Dispatch Action */}
        <button 
          onClick={() => {
             const tariffSection = document.getElementById('tariff');
             if (tariffSection) {
               tariffSection.scrollIntoView({ behavior: 'smooth' });
             } else {
               window.location.href = `tel:${CONTACT_NUMBER}`;
             }
          }}
          className="premium-glass-btn-solid w-full py-5 rounded-2xl font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_10px_20px_rgba(212,175,55,0.15)] group-hover/card:shadow-[0_15px_30px_rgba(212,175,55,0.35)] active:scale-95 hover-glow-gold luxury-click group/btn"
        >
          <span>Dispatch Selection</span>
          <div className="icon-hover-shift transition-transform duration-300">
            <ArrowRight size={16} className="text-[#0B0F1A]" />
          </div>
        </button>
      </div>
    </div>
  );
};

const Fleet: React.FC = () => {
  const { language, t, fontClass } = useLanguage();
  const { vehicles } = usePricing();
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
    activeFilter === 'All' ? vehicles : vehicles.filter(v => v.type === activeFilter)
  ), [activeFilter, vehicles]);

  return (
    <section id="fleet" className="relative transition-colors duration-1000 py-16 md:py-32 bg-transparent overflow-hidden">
      {/* Cinematic Lighting Refraction */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-geevee-orange/10 via-transparent to-transparent blur-[120px] opacity-40"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent blur-[140px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8 md:gap-12">
          <div className="max-w-2xl">
            <div 
               className="inline-flex items-center gap-4 bg-[#111827] backdrop-blur-3xl border border-[#D4AF37]/30 px-6 md:px-8 py-2 md:py-3 rounded-full mb-6 md:mb-10 shadow-sm dark:shadow-[0_0_20px_rgba(212,175,55,0.08)]"
            >
              <Crown size={14} className="text-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">Signature Fleet catalog</span>
            </div>
            
            <h2 
              className={`text-5xl md:text-8xl text-white mb-6 md:mb-10 tracking-tight leading-[0.9] cinematic-glow ${fontClass}`}
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              The <span className="text-[#D4AF37] italic font-normal">Collection</span>
            </h2>
          </div>

          <p 
            className={`text-[#D1D5DB] font-medium text-lg md:text-2xl leading-relaxed max-w-md md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#D4AF37]/30 pl-6 md:pl-0 md:pr-8 ${fontClass}`}
          >
            A meticulously curated fleet of high-performance vehicles for the absolute elite. Maintain silence. Command presence.
          </p>
        </div>

        {/* Elite Filtering Rail */}
        <div className="mb-12 md:mb-20 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar justify-start md:justify-center gap-3 md:gap-4 px-6 md:px-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`snap-center shrink-0 px-6 md:px-10 py-3.5 md:py-5 rounded-xl md:rounded-2xl font-black text-[9px] md:text-xs tracking-[0.3em] uppercase transition-all duration-500 flex items-center gap-3 md:gap-4 border active:scale-95 ${
                activeFilter === cat.id
                   ? 'bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] border-[#D4AF37] text-[#0B0F1A] shadow-[0_15px_30px_rgba(212,175,55,0.3)]'
                   : 'bg-white/5 border-white/5 text-slate-400 hover:border-[#D4AF37]/35 hover:text-white'
              }`}
            >
              <span className={`${activeFilter === cat.id ? 'text-[#0B0F1A]' : 'text-[#D4AF37]'}`}>{cat.icon}</span>
              {cat.id}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div 
              key="button"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-5xl mx-auto pb-12"
            >
              <button 
                onClick={() => setIsExpanded(true)}
                className="w-full rounded-[2.5rem] md:rounded-[4rem] p-20 md:p-32 text-center group transition-all duration-700 border border-slate-200 dark:border-[#D4AF37]/25 relative overflow-hidden bg-slate-50 dark:bg-gradient-to-b dark:from-[#111827]/85 dark:via-[#0B0F1A]/95 dark:to-[#0B0F1A] shadow-xl dark:shadow-[0_32px_128px_-16px_rgba(0,0,0,0.6)] hover:shadow-[0_45px_135px_rgba(212,175,55,0.15)] premium-hover-lift luxury-click"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0"></div>
                
                <div className="relative z-10 flex flex-col items-center gap-12">
                  <div className="w-24 h-24 bg-white dark:bg-white/5 backdrop-blur-3xl rounded-[2rem] flex items-center justify-center shadow-2xl text-[#D4AF37] border border-slate-200 dark:border-white/10 group-hover:scale-110 group-hover:shadow-[#D4AF37]/20 transition-all duration-700">
                    <LayoutGrid size={32} />
                  </div>
                  
                  <div className="space-y-6">
                    <h4 className="text-3xl md:text-6xl font-black text-white tracking-tighter italic font-serif leading-none">
                      Reveal the Full <span className="luxury-text-gradient">Portfolio</span>
                    </h4>
                    <p className="text-[#9CA3AF] font-medium text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
                      Observe all {VEHICLES.length} signature vehicles across our heritage collection. Optimized for absolute command.
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center gap-6 text-[#D4AF37] font-black text-xs uppercase tracking-[0.5em] group-hover:gap-10 transition-all duration-700">
                    Expand Archive <ArrowRight size={24} />
                  </div>
                </div>
              </button>
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="pb-12"
            >
              <div 
                key="vehicle-grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-24"
              >
                {filteredVehicles.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
              
              <div className="flex justify-center">
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="premium-glass-btn group px-16 py-8 rounded-full font-black text-[10px] uppercase tracking-[0.5em] flex items-center gap-6 transition-all duration-700 md:hover:scale-[1.05] border-[#D4AF37]/20"
                >
                  Minimize Catalog <ChevronUp size={24} className="text-[#D4AF37] group-hover:-translate-y-2 transition-transform duration-500" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Fleet;
