
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Building2, Factory, ShieldCheck, Briefcase, MapPin, ArrowUpRight } from 'lucide-react';

const CONTACT_NUMBER = '9025743325';

const CorporateServices: React.FC = () => {
  const { t, language, fontClass } = useLanguage();
  const c = t.corporate;

  return (
    <section id="corporate" className="py-8 md:py-24">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center mb-12 md:mb-20">
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className={`inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-slate-900 dark:text-white px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black tracking-widest mb-4 md:mb-6 uppercase ${fontClass}`}>
              <Briefcase size={12} className="text-geevee-orange" />
              {c.tag}
            </div>
            <h2 className={`text-2xl md:text-6xl font-black text-slate-900 dark:text-white mb-3 md:mb-6 leading-tight ${fontClass}`}>
              {c.title}
            </h2>
            <p className={`text-slate-600 dark:text-slate-300 text-sm md:text-xl font-medium leading-relaxed mb-4 md:mb-8 ${fontClass}`}>
              {c.subtitle}
            </p>
            <p className={`text-slate-500 dark:text-slate-400 font-medium text-xs md:text-base mb-6 md:mb-10 ${fontClass}`}>
              {c.description}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center lg:justify-start">
              <a 
                href={`tel:${CONTACT_NUMBER}`}
                className={`bg-geevee-orange text-white px-6 py-3.5 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-black flex items-center justify-center gap-2 text-sm md:text-base hover:bg-orange-600 transition-all shadow-xl shadow-geevee-orange/20 ${fontClass}`}
              >
                {c.cta}
                <ArrowUpRight size={18} />
              </a>
              <div className="flex items-center gap-2 md:gap-4 text-slate-400 dark:text-slate-500 font-bold uppercase text-[8px] md:text-[10px] tracking-widest border border-slate-200 dark:border-white/10 px-4 py-3 md:px-6 md:py-4 rounded-xl md:rounded-2xl bg-white/5 backdrop-blur-sm">
                <ShieldCheck size={14} className="text-green-500" />
                GST Compliant
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-3 md:gap-6 w-full">
            {c.hubs.map((hub: any, i: number) => (
              <div 
                key={i} 
                className="glass-card p-4 md:p-8 rounded-2xl md:rounded-[2rem] border border-white/20 group hover:bg-white/10 transition-all hover:-translate-y-1"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-6 group-hover:bg-geevee-orange group-hover:text-white transition-all shadow-inner text-slate-300">
                  {i === 0 ? <Building2 size={20} /> : i === 1 ? <Factory size={20} /> : i === 2 ? <MapPin size={20} /> : <Briefcase size={20} />}
                </div>
                <h4 className={`text-sm md:text-xl font-black text-slate-900 dark:text-white mb-1 ${fontClass}`}>{hub.name}</h4>
                <p className={`text-slate-400 dark:text-slate-500 font-medium text-[10px] md:text-sm leading-tight ${fontClass}`}>{hub.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Highlight Banner */}
        <div className="glass-card bg-slate-900/50 rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 text-white relative overflow-hidden border border-white/10 shadow-2xl">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none hidden md:block">
              <Building2 size={300} />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              <div className="max-w-xl text-center md:text-left">
                 <h3 className={`text-lg md:text-3xl font-black mb-2 md:mb-4 ${fontClass}`}>
                    {language === 'ta' ? 'அனைத்து சென்னை தொழில் பகுதிகளும்' : 'Major Cities & Industrial Parks'}
                 </h3>
                 <p className={`text-slate-400 text-xs md:text-lg leading-relaxed ${fontClass}`}>
                    We provide point-to-point transfers and dedicated monthly vehicle rentals for corporate teams operating in the major industrial zones of Chennai and beyond.
                 </p>
              </div>
              <div className="shrink-0 flex gap-3 md:gap-4 w-full md:w-auto">
                 <div className="flex-1 text-center bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 min-w-[100px] md:min-w-[140px]">
                    <span className="block text-xl md:text-3xl font-black text-geevee-orange mb-1">50+</span>
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-500">Corporate Partners</span>
                 </div>
                 <div className="flex-1 text-center bg-white/5 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-white/10 min-w-[100px] md:min-w-[140px]">
                    <span className="block text-xl md:text-3xl font-black text-geevee-orange mb-1">24/7</span>
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest text-slate-500">Dedicated Support</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateServices;
