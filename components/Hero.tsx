
import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import heroBg from '../src/assets/images/hero_coastal_innova_1779694434278.png';
import { ScrollReveal } from './ScrollReveal.tsx';
import OptimizedImage from './OptimizedImage.tsx';

const Hero: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-[#0A101D]">
      
      {/* Background Image & Overlays */}
      <div className="absolute inset-0 z-0">
        <OptimizedImage 
          src={heroBg} 
          alt="Luxury Innova Crysta driving down ECR road at golden sunset" 
          className="w-full h-full object-cover brightness-95 contrast-[1.05] saturate-100"
          containerClassName="w-full h-full"
        />
        {/* Deep Navy Blue Overlay - Darker at bottom for text, clearer center */}

        <div className="absolute inset-0 bg-gradient-to-t from-[#050A15] via-[#050A15]/40 to-[#050A15]/90" />
        
        {/* Sharp Cinematic Gold Sunset Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/50 via-[#D4AF37]/5 to-transparent mix-blend-screen" />
        {/* Additional linear top glow to define the sunlight source */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#D4AF37]/30 to-transparent mix-blend-overlay" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          
          <ScrollReveal duration={1.2} delay={0.1} direction="up" className="mb-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-8 h-[1px] bg-[#D4AF37]/60"></div>
              <span className="text-[#D4AF37] text-[9px] md:text-[10px] font-semibold tracking-[0.3em] uppercase">
                South India’s Signature Luxury Experience
              </span>
              <div className="w-8 h-[1px] bg-[#D4AF37]/60"></div>
            </div>
          </ScrollReveal>

          <ScrollReveal duration={1.2} delay={0.2} direction="up" className="mb-6 md:mb-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-white tracking-tight leading-[1.1] drop-shadow-lg">
              Signature Journeys through <br />
              <span className="text-[#D4AF37] italic font-light tracking-normal">TAMIL NADU</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal duration={1.2} delay={0.3} direction="up" className="mb-10 md:mb-12">
            <p className="text-slate-300 text-sm md:text-base font-light tracking-wide max-w-2xl mx-auto leading-relaxed drop-shadow">
              Experience heritage, comfort and premium chauffeur travel across Tamil Nadu.
            </p>
          </ScrollReveal>

          <ScrollReveal duration={1.2} delay={0.4} direction="up">
            <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5">
              <button 
                onClick={() => {
                  const el = document.getElementById('booking');
                  el ? el.scrollIntoView({ behavior: 'smooth' }) : document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B89225] hover:from-[#E5BF42] hover:to-[#C69C28] text-[#0A101D] px-8 md:px-10 py-3.5 md:py-4 rounded-full font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all duration-300 w-full sm:w-auto justify-center shadow-[0_8px_20px_rgba(212,175,55,0.3)] hover:-translate-y-0.5"
              >
                Elite Dispatch <ArrowRight size={16} />
              </button>
              
              <button 
                onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/5 backdrop-blur-md border border-[#D4AF37]/40 hover:bg-white/10 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-full font-semibold text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all duration-300 w-full sm:w-auto justify-center hover:-translate-y-0.5 shadow-lg"
              >
                Heritage Tours
              </button>
            </div>
          </ScrollReveal>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 z-10 animate-bounce">
        <span className="text-[#D4AF37] text-[8px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;
