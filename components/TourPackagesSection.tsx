
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Sparkles } from 'lucide-react';
import LuxuryPackageCarousel from './LuxuryPackageCarousel.tsx';

interface TourPackagesSectionProps {
  onSelectPackage: (id: string) => void;
}

const TourPackagesSection: React.FC<TourPackagesSectionProps> = ({ onSelectPackage }) => {
  const { t, fontClass } = useLanguage();
  
  return (
    <section id="packages" className="relative overflow-hidden transition-colors duration-1000 py-24 md:py-36 bg-transparent">
      {/* Cinematic Lighting Refraction */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent blur-[140px] opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 md:gap-12">
          <div className="max-w-3xl">
            <div 
               className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-3xl border border-[#D4AF37]/35 px-6 md:px-8 py-2 md:py-3 rounded-full mb-6 md:mb-8 shadow-[0_0_20px_rgba(212,175,55,0.08)]"
            >
              <Sparkles size={14} className="text-[#D4AF37] animate-pulse" />
              <span className="text-[#D4AF37] text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em]">Heritage Selection</span>
            </div>
            
            <h2 
              className={`text-5xl md:text-7xl text-slate-900 dark:text-white mb-4 tracking-tight leading-[0.9] cinematic-glow ${fontClass}`}
              style={{ fontFamily: 'var(--font-serif)' }}
            >
              Curated <span className="text-[#D4AF37] italic font-normal">Experiences</span>
            </h2>
          </div>

          <p 
            className={`text-slate-600 dark:text-slate-200/90 font-medium text-base md:text-xl leading-relaxed max-w-md md:text-right border-l-2 md:border-l-0 md:border-r-2 border-[#D4AF37]/30 pl-6 md:pl-0 md:pr-8 ${fontClass}`}
          >
            Handcrafted luxury expeditions through the architectural marvels and rich landscapes of Tamil Nadu & beyond.
          </p>
        </div>

        {/* Premium Luxury Sliding Packages Carousel */}
        <div className="relative">
          <LuxuryPackageCarousel onSelectPackage={onSelectPackage} />
        </div>

      </div>
    </section>
  );
};

export default TourPackagesSection;
