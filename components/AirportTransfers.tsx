import React from 'react';
import { Plane, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

interface AirportTransfersProps {
  id?: string;
}

const AirportTransfers: React.FC<AirportTransfersProps> = ({ id }) => {
  const { t, language, fontClass } = useLanguage();

  const benefits = [
    {
      icon: <Clock size={24} className="text-geevee-orange" />,
      title: t.airport.benefit1,
      desc: t.airport.benefit1Desc
    },
    {
      icon: <Users size={24} className="text-geevee-orange" />,
      title: t.airport.benefit2,
      desc: t.airport.benefit2Desc
    },
    {
      icon: <ShieldCheck size={24} className="text-geevee-orange" />,
      title: t.airport.benefit3,
      desc: t.airport.benefit3Desc
    }
  ];

  return (
    <div id={id} className="container mx-auto px-4 max-w-7xl py-12 md:py-32">
      <div className="bg-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden relative shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 w-full h-full opacity-[0.05] pointer-events-none">
           <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
             <path d="M0 0 L100 0 L100 100 Z" fill="white"/>
           </svg>
        </div>

        <div className="absolute -left-20 -top-20 w-96 h-96 bg-geevee-orange/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col items-center text-center py-10 md:py-24 px-6 md:px-12">
          <div className="w-full max-w-5xl text-white">
            <div className={`inline-flex items-center gap-3 bg-white/5 border border-white/10 text-geevee-orange px-6 py-2 rounded-full text-[10px] font-bold tracking-[0.2em] mb-10 uppercase backdrop-blur-md shadow-sm ${fontClass}`}>
              <Plane size={16} />
              {t.airport.tag}
            </div>
            
            <h3 className={`text-4xl md:text-7xl font-bold mb-8 leading-tight tracking-tight ${fontClass}`}>
              {language === 'en' ? (
                <>Reliable <span className="text-geevee-orange">Airport</span> Mobility</>
              ) : (
                <><span className="text-geevee-orange">விமான நிலைய</span> சேவை</>
              )}
            </h3>
            
            <p className={`text-[#9CA3AF] text-lg md:text-xl mb-12 mx-auto max-w-3xl leading-relaxed font-medium ${fontClass}`}>
              {t.airport.desc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 text-left">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-5 bg-white/[0.03] p-8 rounded-2xl border border-white/[0.05] group hover:bg-white/[0.05] transition-all duration-300">
                  <div className="bg-geevee-orange/10 p-4 rounded-xl text-geevee-orange shrink-0 border border-geevee-orange/20 shadow-sm group-hover:scale-110 transition-transform">
                    {React.cloneElement(b.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                  </div>
                  <div>
                    <h4 className={`font-bold text-xl md:text-2xl mb-2 tracking-tight ${fontClass}`}>{b.title}</h4>
                    <p className={`text-[#D1D5DB] text-xs md:text-sm font-medium leading-relaxed ${fontClass}`}>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center">
              <button 
                onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`}
                className={`premium-glass-btn-solid px-12 py-4.5 rounded-2xl font-bold text-base md:text-lg flex items-center gap-4 group active:scale-95 ${fontClass}`}
              >
                {t.airport.bookBtn}
                <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform text-[#040812]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportTransfers;