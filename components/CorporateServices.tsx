import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Building2, Factory, ShieldCheck, Briefcase, MapPin, ArrowUpRight } from 'lucide-react';

const CONTACT_NUMBER = '9025743325';

const CorporateServices: React.FC = () => {
  const { t, language, fontClass } = useLanguage();
  const c = t.corporate;

  return (
    <section id="corporate" className="py-10 md:py-32 relative overflow-hidden">
      {/* Cinematic Background Light */}
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-24 items-center mb-12 md:mb-32">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className={`inline-flex items-center gap-3 bg-white/5 backdrop-blur-md text-[#D4AF37] px-6 py-2.5 rounded-full text-[9px] font-black tracking-[0.25em] mb-8 uppercase border border-[#D4AF37]/20 shadow-sm ${fontClass}`}>
              <Briefcase size={12} className="text-[#D4AF37]" />
              {c.tag}
            </div>
            <h2 className={`text-4xl md:text-7xl font-serif text-white tracking-tight leading-tight mb-8 italic ${fontClass}`}>
              {c.title.split(' ').map((word: string, index: number) => {
                const needsHighlight = index === 0 || word.toLowerCase().includes('corporate') || word.toLowerCase().includes('நிர்வாக');
                return (
                  <span key={index} className={needsHighlight ? "luxury-text-gradient font-serif italic pr-3" : "pr-3 text-white"}>
                    {word}
                  </span>
                )
              })}
            </h2>
            <p className={`text-[#D1D5DB] text-lg md:text-xl font-medium leading-relaxed mb-8 ${fontClass}`}>
              {c.subtitle}
            </p>
            <p className={`text-[#9CA3AF] font-medium text-base mb-10 max-w-2xl mx-auto lg:mx-0 ${fontClass}`}>
              {c.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center lg:justify-start">
              <a 
                href={`tel:${CONTACT_NUMBER}`}
                className={`premium-glass-btn-solid px-10 py-5 rounded-2xl font-black flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 active:scale-95 hover-glow-gold luxury-click group/btn ${fontClass}`}
              >
                {c.cta}
                <div className="icon-hover-shift transition-transform duration-300">
                  <ArrowUpRight size={18} />
                </div>
              </a>
              <div className="flex items-center gap-4 text-[#D1D5DB] font-black uppercase text-[10px] tracking-[0.2em] border border-white/10 px-8 py-5 rounded-2xl bg-[#040812]/50 shadow-sm backdrop-blur-sm">
                <ShieldCheck size={16} className="text-[#D4AF37]" />
                GST Compliant
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full">
            {c.hubs.map((hub: any, i: number) => (
              <div 
                key={i} 
                className="bg-gradient-to-b from-[#0C1E38]/50 via-[#040812]/80 to-[#040812]/90 backdrop-blur-md p-8 md:p-10 rounded-[2rem] border border-white/10 hover:border-[#D4AF37]/45 group premium-hover-lift shadow-xl cursor-pointer luxury-click"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-[#D4AF37] group-hover:text-[#040812] transition-colors duration-550 text-[#D4AF37] border border-white/10 shadow-sm">
                  <div className="icon-hover-rotate transition-transform duration-500">
                    {i === 0 ? <Building2 size={24} /> : i === 1 ? <Factory size={24} /> : i === 2 ? <MapPin size={24} /> : <Briefcase size={24} />}
                  </div>
                </div>
                <h4 className={`text-xl md:text-2xl font-serif text-white font-bold mb-2 group-hover:text-[#FCF6BA] transition-colors leading-tight ${fontClass}`}>{hub.name}</h4>
                <p className={`text-[#9CA3AF] font-medium text-sm leading-relaxed ${fontClass}`}>{hub.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="bg-gradient-to-r from-[#0C1E38] via-[#081326] to-[#040812] rounded-[2.5rem] md:rounded-[3.5rem] p-5 md:p-16 text-white relative overflow-hidden border border-[#D4AF37]/25 shadow-[0_35px_100px_rgba(0,0,0,0.7)]">
           <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none hidden lg:block text-white">
              <Building2 size={350} />
           </div>
           
           <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

           <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-16">
              <div className="max-w-2xl text-center lg:text-left">
                 <h3 className={`text-2xl md:text-4.5xl font-serif text-[#FCF6BA] mb-6 italic tracking-tight font-bold ${fontClass}`}>
                    {language === 'ta' ? 'அனைத்து சென்னை தொழில் பகுதிகளும்' : 'Strategic Hubs & Industrial Zones'}
                 </h3>
                 <p className={`text-[#D1D5DB] text-base md:text-lg leading-relaxed font-medium opacity-90 ${fontClass}`}>
                    We provide point-to-point transfers and dedicated monthly vehicle rentals for corporate teams operating in the major industrial zones of Chennai and Pan-Tamilnadu.
                 </p>
              </div>
              <div className="shrink-0 flex gap-4 md:gap-6 w-full lg:w-auto">
                 <div className="flex-1 text-center bg-white/[0.03] p-4 sm:p-8 md:p-10 rounded-2xl md:rounded-[1.75rem] border border-white/[0.05] min-w-[120px] shadow-sm backdrop-blur-md">
                    <span className="block text-3xl md:text-5xl font-serif text-[#FCF6BA] mb-2 font-black tracking-tight">50+</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Global Partners</span>
                 </div>
                 <div className="flex-1 text-center bg-white/[0.03] p-4 sm:p-8 md:p-10 rounded-2xl md:rounded-[1.75rem] border border-white/[0.05] min-w-[120px] shadow-sm backdrop-blur-md">
                    <span className="block text-3xl md:text-5xl font-serif text-[#FCF6BA] mb-2 font-black tracking-tight">24/7</span>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">VIP Support</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateServices;
