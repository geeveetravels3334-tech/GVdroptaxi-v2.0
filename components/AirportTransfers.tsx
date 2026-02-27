import React from 'react';
import { Plane, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

const AirportTransfers: React.FC = () => {
  const { t, language, fontClass } = useLanguage();

  const benefits = [
    {
      icon: <Clock className="text-geevee-orange" />,
      title: t.airport.benefit1,
      desc: t.airport.benefit1Desc
    },
    {
      icon: <Users className="text-geevee-orange" />,
      title: t.airport.benefit2,
      desc: t.airport.benefit2Desc
    },
    {
      icon: <ShieldCheck className="text-geevee-orange" />,
      title: t.airport.benefit3,
      desc: t.airport.benefit3Desc
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="bg-geevee-dark rounded-3xl md:rounded-[2.5rem] overflow-hidden relative shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
             <path d="M0 0 L100 0 L100 100 Z" fill="white"/>
           </svg>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center py-6 md:py-16 px-4 md:px-8">
          <div className="w-full max-w-5xl text-white">
            <div className={`inline-flex items-center gap-2 bg-geevee-orange text-white px-2.5 py-1 rounded-full text-[8px] md:text-[10px] font-black tracking-widest mb-3 md:mb-6 ${fontClass}`}>
              <Plane size={12} />
              {t.airport.tag}
            </div>
            
            <h3 className={`text-xl md:text-5xl font-black mb-3 md:mb-6 leading-tight ${fontClass}`}>
              {language === 'en' ? (
                <>Reliable <span className="text-geevee-orange">Airport</span> Pickups & Drops</>
              ) : (
                <><span className="text-geevee-orange">விமான நிலைய</span> பிக்கப் & டிராப்</>
              )}
            </h3>
            
            <p className={`text-slate-400 text-xs md:text-lg mb-6 md:mb-10 mx-auto max-w-2xl leading-relaxed font-medium ${fontClass}`}>
              {t.airport.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-12 text-left">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-center md:flex-col md:items-start text-left gap-3 md:gap-4 bg-white/5 p-3 md:p-6 rounded-2xl md:rounded-[2rem] border border-white/10 backdrop-blur-sm">
                  <div className="bg-geevee-orange/20 p-2 md:p-4 rounded-xl text-geevee-orange shrink-0">
                    {React.cloneElement(b.icon as React.ReactElement<{ size?: number }>, { size: 18 })}
                  </div>
                  <div>
                    <h4 className={`font-black text-sm md:text-xl mb-0.5 md:mb-2 ${fontClass}`}>{b.title}</h4>
                    <p className={`text-slate-500 text-[9px] md:text-xs font-medium leading-relaxed ${fontClass}`}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`}
                className={`bg-white text-geevee-dark px-6 py-3 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-black text-sm md:text-lg hover:bg-geevee-orange hover:text-white transition-all shadow-xl flex items-center gap-2 group active:scale-95 ${fontClass}`}
              >
                {t.airport.bookBtn}
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransfers;