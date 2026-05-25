import React from 'react';
import { Users, Briefcase, ChevronRight, Phone, ShieldCheck, Sparkles, Map } from 'lucide-react';
import { DETAILED_VEHICLES } from '../constants.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import Logo from './Logo.tsx';
import OptimizedImage from './OptimizedImage.tsx';

const CONTACT_NUMBER = '9025743325';

const SUVGroupSpecial: React.FC = () => {
  const { language, fontClass } = useLanguage();
  const muvVehicles = DETAILED_VEHICLES.filter(v => 
    v.id === 'ertiga-xylo' || v.id === 'toyota-innova' || v.id === 'tempo-traveller'
  );

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-xl border border-slate-200/60 dark:border-white/10 relative">
        <div className="bg-slate-950 p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none -rotate-6"><Logo className="w-64 h-64" isLight={false} /></div>
          <div className="relative z-10 max-w-3xl">
            <div className={`inline-flex items-center gap-2 bg-geevee-orange/10 text-geevee-orange px-4 py-2 rounded-lg text-[10px] font-bold tracking-widest mb-6 ${fontClass}`}>
              <Users size={14} />
              {language === 'ta' ? 'குடும்பம் மற்றும் குழு பயணம்' : 
               language === 'hi' ? 'परिवार और समूह यात्रा' :
               language === 'te' ? 'కుటుంబం మరియు సమూహ ప్రయాణం' :
               language === 'kn' ? 'ಕುಟುಂಬ ಮತ್ತು ಗುಂಪು ಪ್ರಯಾಣ' :
               'EXECUTIVE GROUP FLEET'}
            </div>
            <h3 className={`text-4xl md:text-5xl font-black mb-4 tracking-tight ${fontClass}`}>
              {language === 'en' ? <>MUV Collection for <span className="text-geevee-orange">Group Comfort</span></> : <>குழு வசதிக்கான <span className="text-geevee-orange">MUV</span> மூவர்</>}
            </h3>
            <p className="text-slate-400 font-medium max-w-lg">
              Spacious and reliable multi-utility vehicles perfect for extended family trips or corporate team travel across South India.
            </p>
          </div>
        </div>
        <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {muvVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-50 dark:bg-slate-950/50 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-white/10 flex flex-col group hover:shadow-lg transition-all hover:-translate-y-1 relative">
              <div className="absolute top-4 left-4 z-20">
                <span className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-slate-200 dark:border-white/10 text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest shadow-sm">
                  MUV Regular
                </span>
              </div>
              <div className="relative h-64 overflow-hidden bg-slate-100/50 dark:bg-slate-900/50 flex items-center justify-center p-6">
                 {/* Subtle Brand Watermark */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-900/5 dark:text-white/5 pointer-events-none flex items-center justify-center">
                   <Logo className="w-48 h-48 opacity-50" isLight={false} />
                 </div>
                  <OptimizedImage 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    objectFit="contain"
                    className="relative z-10 group-hover:scale-[1.03] transition-all duration-700 drop-shadow-xl" 
                    containerClassName="w-full h-full"
                  />
              </div>
              <div className="p-6 md:p-8 flex-grow flex flex-col">
                <h4 className={`text-xl md:text-2xl font-black text-slate-900 dark:text-white mb-2 leading-none ${fontClass}`}>{vehicle.name}</h4>
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-bold text-[10px] uppercase tracking-widest mb-6">
                   <ShieldCheck size={14} /> <span>GeeVee Certified</span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mb-8">
                  <div className="bg-white dark:bg-slate-800/50 p-4 rounded-xl flex items-center gap-3 border border-slate-100 dark:border-white/5">
                    <div className="text-geevee-orange shrink-0">
                       <Users size={18} />
                    </div>
                    <div>
                       <span className="block text-[9px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Capacity</span>
                       <span className="font-bold text-sm text-slate-900 dark:text-white leading-none">{vehicle.capacity} Seats</span>
                    </div>
                  </div>
                </div>

                <div className="flex-grow"></div>
                <button onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`} className="w-full py-4 premium-glass-btn-solid rounded-xl font-black transition-all text-[11px] md:text-xs uppercase tracking-[0.2em] shadow-md flex items-center justify-center gap-2 group/btn">
                  Reserve Vehicle <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SUVGroupSpecial;