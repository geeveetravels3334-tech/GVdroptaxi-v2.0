
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { POPULAR_ROUTES } from '../constants.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

interface PopularRoutesProps {
  id?: string;
}

const PopularRoutes: React.FC<PopularRoutesProps> = ({ id }) => {
  const { fontClass } = useLanguage();
  const handleBook = (from: string, to: string) => {
    window.location.href = `tel:${CONTACT_NUMBER}`;
  };

  return (
    <section id={id} className="relative py-32 md:py-48 bg-transparent overflow-hidden">
      {/* Decorative Light Strands */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-8 md:gap-12">
          <div>
            <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-lg border border-[#D4AF37]/20 px-6 md:px-8 py-2 md:py-3 rounded-full mb-6 md:mb-10">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              <span className="text-[#D4AF37] text-[8px] md:text-[10px] font-black uppercase tracking-[0.5em]">Global Favorites</span>
            </div>
            <h2 className={`text-4xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tight leading-[0.9] ${fontClass}`}>
              One-Way <span className="luxury-text-gradient">Elite</span>
            </h2>
          </div>
          
          <p 
            className={`text-slate-600 dark:text-[#D1D5DB] max-w-md font-medium text-lg md:text-xl leading-relaxed md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#D4AF37]/30 pl-6 md:pl-0 md:pr-8 ${fontClass}`}
          >
            Fixed valuation for South India's high-traffic corridors. Transparent. Absolute. Signature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {POPULAR_ROUTES.map((route, i) => (
            <div 
              key={i} 
              className="glass-card rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 group premium-hover-lift hover:border-[#D4AF37]/45 cursor-pointer luxury-click"
            >
              <div className="flex items-center justify-between mb-12 md:mb-16">
                <div className="flex flex-col items-center gap-1">
                  <div className="bg-slate-100 dark:bg-white/5 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-slate-500 dark:text-[#9CA3AF] font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/5">
                    Origin
                  </div>
                  <span className={`font-black text-slate-800 dark:text-white mt-6 md:mt-8 text-xl md:text-2xl tracking-tighter italic font-serif ${fontClass}`}>{route.from}</span>
                </div>
                
                <div className="relative md:group-hover:scale-105 transition-transform duration-500">
                  <div className="absolute inset-0 bg-[#D4AF37] blur-[20px] opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
                  <div className="icon-hover-shift transition-transform duration-300">
                    <ArrowRight className="text-[#D4AF37] relative z-10" size={24} />
                  </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                  <div className="bg-slate-100 dark:bg-white/5 px-4 md:px-6 py-1.5 md:py-2 rounded-full text-slate-500 dark:text-[#9CA3AF] font-black text-[9px] md:text-[10px] uppercase tracking-widest border border-slate-200 dark:border-white/5">
                    Terminal
                  </div>
                  <span className={`font-black text-slate-800 dark:text-white mt-6 md:mt-8 text-xl md:text-2xl tracking-tighter italic font-serif ${fontClass}`}>{route.to}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6 mb-10 md:mb-12">
                <div className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-[2rem] border-slate-200 dark:border-white/5 text-center">
                  <span className="block text-[9px] md:text-[10px] font-black text-[#D4AF37]/60 uppercase tracking-[0.3em] mb-1 md:mb-2">Distance</span>
                  <span className="font-black text-slate-800 dark:text-white text-lg md:text-xl tracking-tight">{route.distance}</span>
                </div>
                <div className="glass-panel p-4 md:p-6 rounded-2xl md:rounded-[2rem] border-slate-200 dark:border-white/5 text-center">
                  <span className="block text-[9px] md:text-[10px] font-black text-[#D4AF37]/60 uppercase tracking-[0.3em] mb-1 md:mb-2">Duration</span>
                  <span className="font-black text-slate-800 dark:text-white text-lg md:text-xl tracking-tight">{route.duration}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-8 md:pt-10 border-t border-slate-200 dark:border-white/10">
                <div>
                  <p className="text-[10px] sm:text-xs font-black text-slate-500 dark:text-[#9CA3AF] uppercase tracking-[0.5em] mb-2 md:mb-3 leading-none">Investment</p>
                  <p className={`text-4xl md:text-5xl font-black luxury-text-gradient transition-colors tracking-tighter ${fontClass}`}>₹{route.price}</p>
                </div>
                <button 
                  onClick={() => handleBook(route.from, route.to)}
                  className="premium-glass-btn-solid p-5 md:p-6 rounded-full font-black text-[9px] md:text-[10px] uppercase tracking-[0.3em] transition-all duration-300 hover:scale-[1.12] shadow-2xl active:scale-95 animate-none hover-glow-gold luxury-click group/arrow-btn"
                >
                  <div className="icon-hover-shift transition-transform duration-300">
                    <ArrowRight size={20} className="md:w-6 md:h-6" />
                  </div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularRoutes;
