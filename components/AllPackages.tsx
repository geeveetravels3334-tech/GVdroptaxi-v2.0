
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { usePricing } from '../contexts/PricingContext.tsx';
import { Clock, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Star } from 'lucide-react';
import { DESTINATION_IMAGES, DEFAULT_DESTINATION_IMAGE } from '../constants.tsx';
import OptimizedImage from './OptimizedImage.tsx';

interface AllPackagesProps {
  onSelectPackage: (id: string) => void;
  onBack: () => void;
}

const AllPackages: React.FC<AllPackagesProps> = ({ onSelectPackage, onBack }) => {
  const { t, language, fontClass } = useLanguage();
  const { packagePrices } = usePricing();
  const packagesList = t.packages.list || [];
  const packageDetails = t.packageDetails || {};

  const getDynamicPrice = (id: string, fallback: string) => {
    const pkg = packagePrices.find(p => p.id === id);
    if (pkg) {
      return `₹${pkg.price.toLocaleString()}`;
    }
    return fallback.replace('Starts at ', '');
  };

  return (
    <div className="min-h-screen bg-transparent animate-in fade-in duration-700 transition-colors">
      {/* Header Hero */}
      <div className="text-slate-900 dark:text-white pt-40 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-plus-lighter dark:mix-blend-screen opacity-70">
           <div className="absolute -left-[10%] -top-[10%] w-[500px] h-[500px] bg-gradient-to-br from-geevee-orange/20 to-transparent dark:from-geevee-orange/15 dark:to-transparent rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse-soft"></div>
           <div className="absolute right-[10%] top-[20%] w-[400px] h-[400px] bg-gradient-to-bl from-[#4AEDE9]/10 to-transparent dark:from-[#183C66]/40 dark:to-transparent rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animation-delay-2000"></div>
        </div>
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] dark:invert-0 invert"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <button 
            onClick={onBack}
            className="mb-12 flex items-center gap-3 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.2em] group bg-white/50 dark:bg-white/5 backdrop-blur-md w-fit px-6 py-2.5 rounded-full border border-white/60 dark:border-white/10 shadow-sm luxury-click"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 bg-white/5 border border-[#D4AF37]/30 backdrop-blur-md text-[#D4AF37] px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.3em] mb-10 uppercase shadow-xl">
              <Sparkles size={16} className="animate-pulse" />
              {language === 'ta' ? 'அனைத்து தொகுப்புகள்' : 'Signature Collections'}
            </div>
            <h1 className={`text-5xl md:text-8xl text-white mb-8 leading-none tracking-tight ${fontClass}`} style={{ fontFamily: 'var(--font-serif)' }}>
              {t.packages.sectionTitle}
            </h1>
            <p className={`text-slate-200/90 text-xl md:text-2xl font-medium max-w-3xl leading-relaxed ${fontClass}`}>
              {t.packages.sectionSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-6 -mt-20 pb-32 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {packagesList.map((pkgItem: any) => {
            const details = packageDetails[pkgItem.id];
            const image = DESTINATION_IMAGES[pkgItem.id] || DEFAULT_DESTINATION_IMAGE;
            
            return (
              <div 
                key={pkgItem.id}
                className="rounded-[2.5rem] overflow-hidden hover:shadow-[0_45px_135px_rgba(212,175,55,0.15)] group premium-hover-lift flex flex-col md:flex-row h-auto md:min-h-[420px] transition-all duration-500 border border-white/10 hover:border-[#D4AF37]/45 bg-gradient-to-br dark:from-[#111827]/85 dark:via-[#0B0F1A]/95 dark:to-[#0B0F1A] cursor-pointer luxury-click"
              >
                {/* Image Section */}
                <div className="w-full md:w-5/12 relative h-64 md:h-auto overflow-hidden bg-[#0B0F1A]">
                  <OptimizedImage 
                    src={image} 
                    alt={pkgItem.name} 
                    className="w-full h-full object-cover transition-transform duration-[4s] ease-out opacity-75 group-hover:opacity-95 md:group-hover:scale-110 grayscale-[0.25] group-hover:grayscale-0"
                    containerClassName="absolute inset-0 bg-[#0B0F1A]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#0B0F1A] via-[#0B0F1A]/20 to-transparent z-10 opacity-70 group-hover:opacity-65 transition-opacity duration-700"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent opacity-80 mix-blend-color-dodge z-10 animate-slow-pulse"></div>
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-white/20 transition-all duration-700"></div>
                  
                  <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2 md:hidden z-20">
                     {details && (
                       <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-xl text-white text-[10px] font-bold flex items-center gap-2 border border-white/20">
                          <Clock size={14} /> {details.duration}
                       </div>
                     )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-10 md:p-12 flex flex-col justify-between relative z-20">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                       <h3 className={`text-3.5xl font-serif text-white italic tracking-tight leading-tight ${fontClass} group-hover:text-luxury-gold-soft transition-colors`}>
                          {pkgItem.name}
                       </h3>
                       {details && (
                         <div className="hidden md:flex bg-white/5 text-slate-300 px-4 py-2 rounded-xl text-[9px] font-bold uppercase tracking-[0.2em] items-center gap-2 shrink-0 border border-white/5 shadow-sm">
                            <Clock size={16} /> {details.duration}
                         </div>
                       )}
                    </div>

                    {details && (
                      <>
                        <div className="flex items-center gap-3 mb-8">
                           <div className="flex gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                              ))}
                           </div>
                           <span className="text-[10px] font-bold text-luxury-gold-soft uppercase tracking-[0.3em]">Verified Luxury</span>
                        </div>

                        <ul className="space-y-4 mb-12">
                          {details.itinerary.slice(0, 2).map((step: any, idx: number) => (
                            <li key={idx} className="flex items-start gap-4 text-sm font-medium text-slate-300/90">
                              <CheckCircle size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                              <span className="line-clamp-2 leading-relaxed">{step.text}</span>
                            </li>
                          ))}
                          {details.itinerary.length > 2 && (
                             <li className="text-[10px] font-bold text-[#D4AF37]/50 pl-8 uppercase tracking-widest">
                                + Explore {details.itinerary.length - 2} Additional Landmarks
                             </li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="flex items-end justify-between pt-8 border-t border-white/10">
                    <div>
                       <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Private Tour From</p>
                       <p className="text-4xl font-serif text-luxury-gold-soft tracking-tight">{details ? getDynamicPrice(pkgItem.id, details.price) : 'Contact'}</p>
                    </div>
                    <button 
                      onClick={() => onSelectPackage(pkgItem.id)}
                      className="premium-glass-btn-solid px-10 py-5 rounded-2xl font-bold text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 group/btn shadow-[0_10px_20px_rgba(212,175,55,0.15)] group-hover:shadow-[0_15px_30px_rgba(212,175,55,0.35)] transition-all duration-500 active:scale-95 hover-glow-gold luxury-click"
                    >
                      Explore
                      <div className="icon-hover-shift transition-transform duration-300">
                        <ArrowRight size={18} className="text-[#0B0F1A]" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllPackages;
