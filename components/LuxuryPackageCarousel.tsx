import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { usePricing } from '../contexts/PricingContext.tsx';
import { DESTINATION_IMAGES, DEFAULT_DESTINATION_IMAGE } from '../constants.tsx';
import OptimizedImage from './OptimizedImage.tsx';
import { 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  Map, 
  Compass,
  Crown,
  MapPin,
  ChevronRight
} from 'lucide-react';

interface LuxuryPackageCarouselProps {
  onSelectPackage: (id: string) => void;
}

const LuxuryPackageCarousel: React.FC<LuxuryPackageCarouselProps> = ({ onSelectPackage }) => {
  const { t, language, fontClass } = useLanguage();
  const { packagePrices } = usePricing();
  
  const packagesList = t.packages.list || [];
  const packageDetails = t.packageDetails || {};

  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(3);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive items count observer
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      if (width >= 1024) {
        setVisibleItems(3);
      } else if (width >= 768) {
        setVisibleItems(2);
      } else {
        setVisibleItems(1);
      }
    };
    
    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const totalPackages = packagesList.length;
  const maxIndex = Math.max(0, totalPackages - visibleItems);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  // Autoplay loop timer (disables on hover/focus)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 8500); // Gentle transition cadence
    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden select-none px-1 py-4">
      
      {/* Sliding chassis track viewport */}
      <div 
        className="relative overflow-hidden rounded-[2.5rem] p-1 touch-pan-y"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          className="flex transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ 
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            gap: '0%' 
          }}
        >
          {packagesList.map((pkgItem: any, index: number) => {
            const details = packageDetails[pkgItem.id];
            const isFeatured = index === currentIndex + Math.floor(visibleItems / 2);
            
            return (
              <div 
                key={pkgItem.id}
                className="w-full shrink-0 px-3 md:px-4 duration-500"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div 
                  onClick={() => onSelectPackage(pkgItem.id)}
                  className={`group relative cursor-pointer flex flex-col h-full rounded-[2rem] md:rounded-[2.5rem] border overflow-hidden transition-all duration-[600ms] ease-out min-h-[520px] md:min-h-[580px] bg-gradient-to-b from-[#0C1E38]/90 via-[#040812]/98 to-[#040812] backdrop-blur-2xl shadow-[0_24px_80px_rgba(0,0,0,0.65)] ${
                    isFeatured 
                      ? 'border-[#D4AF37]/50 shadow-[0_30px_90px_rgba(212,175,55,0.08)] scale-[1.01]' 
                      : 'border-white/10 hover:border-[#D4AF37]/35 shadow-[0_24px_80px_rgba(0,0,0,0.5)] hover:shadow-[0_24px_80px_rgba(212,175,55,0.06)]'
                  }`}
                >
                  {/* Subtle active ring illumination */}
                  {isFeatured && (
                    <div className="absolute inset-0 bg-[#D4AF37]/[0.015] pointer-events-none" />
                  )}

                  {/* Top luxury line accent */}
                  <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent transition-opacity duration-500 ${
                    isFeatured ? 'opacity-100' : 'opacity-40 group-hover:opacity-80'
                  }`} />

                  {/* Image container & header layer */}
                  <div className="relative h-44 md:h-48 overflow-hidden shrink-0">
                    <OptimizedImage 
                      src={DESTINATION_IMAGES[pkgItem.id] || DEFAULT_DESTINATION_IMAGE} 
                      alt={pkgItem.name}
                      className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 scale-[1.01] group-hover:scale-104 transition-transform duration-[3s] ease-out opacity-[0.8] group-hover:opacity-100"
                      containerClassName="absolute inset-0 bg-[#040812]"
                    />
                    {/* Shadow gradations for cinematic clarity */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-[#040812]" />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#040812] to-transparent" />
                    
                    {/* Golden luxury ambient backglow */}
                    <div className="absolute top-[-20%] left-[-2%] w-[85%] h-[85%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/12 via-transparent to-transparent opacity-60 mix-blend-color-dodge z-10 pointer-events-none" />

                    {/* Tags */}
                    <div className="absolute top-4 left-4 md:left-6 z-20 flex gap-1.5 items-center">
                      <div className="bg-[#040812]/80 border border-[#D4AF37]/30 px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.25em] text-[#D4AF37] backdrop-blur-md flex items-center gap-1">
                        <Crown size={8} />
                        Elite Plan
                      </div>
                    </div>

                    {/* Destination titles aligned beautifully */}
                    <div className="absolute bottom-4 left-4 md:left-6 z-20 right-4">
                      <h4 className={`text-xl md:text-2xl lg:text-3xl font-normal text-[#FCF6BA] italic font-serif tracking-tight leading-tight group-hover:text-white transition-colors capitalize ${fontClass}`}>
                        {pkgItem.name}
                      </h4>
                      <p className="text-[8px] uppercase font-mono tracking-[0.35em] text-[#D4AF37] mt-1 leading-none font-bold">
                        Tamil Nadu Expedition
                      </p>
                    </div>
                  </div>

                  {/* Details matrix layout */}
                  <div className="p-5 md:p-6 flex flex-col flex-grow relative z-20">
                    
                    {/* Bottom background fade */}
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#D4AF37]/[0.01] rounded-full blur-2xl pointer-events-none" />

                    {/* Tagline block */}
                    <p className={`text-slate-300 font-semibold text-xs leading-relaxed mb-6 italic border-l border-[#D4AF37]/45 pl-3 min-h-[36px] line-clamp-2 ${fontClass}`}>
                      {pkgItem.tagline || 'Bespoke high-end custom getaway.'}
                    </p>

                    {/* Pricing Display with Gold Gradient */}
                    <div className="mb-6 p-4 rounded-2xl bg-white/[0.02] border border-white/5 group-hover:border-[#D4AF37]/15 transition-colors">
                      <span className="block text-[7px] md:text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1 font-mono truncate">
                        Approximate Tariff Estimate
                      </span>
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-xl md:text-3xl font-bold font-serif text-[#FCF6BA] tracking-tight group-hover:text-white transition-colors">
                          {details?.price?.replace('Starts at ', '') || '₹3,250'}
                        </span>
                        <span className="text-[7px] md:text-[8px] uppercase tracking-wider text-slate-400 font-mono font-black shrink-0">
                          / base run
                        </span>
                      </div>
                    </div>

                    {/* Specs columns */}
                    <div className="space-y-3 flex-grow justify-end flex flex-col mb-6">
                      
                      {/* Duration */}
                      <div className="flex justify-between items-start gap-2 text-[9px] md:text-xs">
                        <span className="text-slate-400 font-semibold flex items-center gap-1.5 shrink-0 mt-0.5">
                          <Clock size={12} className="text-[#D4AF37]" />
                          Duration Limit
                        </span>
                        <span className="text-white font-bold text-right leading-tight">{details?.duration || '1 Day'}</span>
                      </div>

                      {/* KM Included */}
                      <div className="flex justify-between items-start gap-2 text-[9px] md:text-xs">
                        <span className="text-slate-400 font-semibold flex items-center gap-1.5 shrink-0 mt-0.5">
                          <Map size={12} className="text-[#D4AF37]" />
                          Coverage Included
                        </span>
                        <span className="text-white font-bold text-right leading-tight">{details?.kmsIncluded || '250 KMs'}</span>
                      </div>

                      {/* Driver Batta */}
                      <div className="flex justify-between items-start gap-2 text-[9px] md:text-xs">
                        <span className="text-slate-400 font-semibold flex items-center gap-1.5 shrink-0 mt-0.5">
                          <Compass size={12} className="text-[#D4AF37]" />
                          Chauffeur Batta
                        </span>
                        <span className="text-[#D4AF37] font-bold uppercase tracking-wider text-right leading-tight">
                          {details?.driverBatta || 'Inclusive'}
                        </span>
                      </div>
                    </div>

                    {/* Premium action button */}
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      <div className="w-full bg-[#D4AF37]/10 hover:bg-[#D4AF37] border border-[#D4AF37]/35 text-[#D4AF37] hover:text-[#040812] py-4 rounded-xl text-[9px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(212,175,55,0.06)] group-hover:shadow-[0_15px_35px_rgba(212,175,55,0.22)] transition-all ease-out duration-300 hover-glow-gold luxury-click">
                        <span>Curated Details</span>
                        <div className="icon-hover-shift transition-transform duration-300">
                           <ChevronRight size={12} />
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons and Dots underneath */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 px-2">
        {/* Progress Bullets */}
        <div className="flex gap-2 items-center order-2 sm:order-1">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-500 outline-none ${
                currentIndex === idx 
                  ? 'w-8 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.5)]' 
                  : 'w-2 bg-white/10 hover:bg-white/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Action controls */}
        <div className="flex gap-3 order-1 sm:order-2">
          <button
            type="button"
            onClick={prevSlide}
            className="w-12 h-12 rounded-full bg-white/[0.03] hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37]/50 flex items-center justify-center text-white hover:text-black transition-all active:scale-95 duration-300 shadow-xl luxury-click group"
            aria-label="Previous premium itineraries slide"
          >
            <div className="group-hover:-translate-x-1 transition-transform duration-300">
              <ArrowLeft size={16} />
            </div>
          </button>
          
          <button
            type="button"
            onClick={nextSlide}
            className="w-12 h-12 rounded-full bg-[#D4AF37]/10 hover:bg-[#D4AF37] border border-[#D4AF37]/45 hover:border-[#D4AF37] flex items-center justify-center text-[#D4AF37] hover:text-black transition-all active:scale-95 duration-300 shadow-xl hover-glow-gold luxury-click group"
            aria-label="Next premium itineraries slide"
          >
            <div className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight size={16} />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LuxuryPackageCarousel;
