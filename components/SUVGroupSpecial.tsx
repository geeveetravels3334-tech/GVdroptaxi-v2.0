import React from 'react';
import { Users, Briefcase, ChevronRight, Phone, ShieldCheck, Sparkles, Map } from 'lucide-react';
import { DETAILED_VEHICLES } from '../constants.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import Logo from './Logo.tsx';

const CONTACT_NUMBER = '9025743325';

const SUVGroupSpecial: React.FC = () => {
  const { language, fontClass } = useLanguage();
  const muvVehicles = DETAILED_VEHICLES.filter(v => 
    v.id === 'mahindra-marazzo' || v.id === 'mahindra-xylo' || v.id === 'chevrolet-tavera'
  );

  return (
    <div className="container mx-auto px-4">
      <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 relative">
        <div className="bg-geevee-dark p-10 md:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none"><Logo className="w-64 h-64 rotate-12" /></div>
          <div className="relative z-10 max-w-3xl">
            <div className={`inline-flex items-center gap-2 bg-geevee-orange text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-6 ${fontClass}`}><Users size={14} />
              {language === 'ta' ? 'குடும்பம் மற்றும் குழு பயணம்' : 
               language === 'hi' ? 'परिवार और समूह यात्रा' :
               language === 'te' ? 'కుటుంబం మరియు సమూహ ప్రయాణం' :
               language === 'kn' ? 'ಕುಟುಂಬ ಮತ್ತು ಗುಂಪು ಪ್ರಯಾಣ' :
               'FAMILY & GROUP SPECIAL'}
            </div>
            <h3 className={`text-4xl md:text-6xl font-black mb-6 leading-tight ${fontClass}`}>
              {language === 'en' ? <>The MUV <span className="text-geevee-orange">Trio</span> for Group Comfort</> : <>குழு வசதிக்கான <span className="text-geevee-orange">MUV</span> மூவர்</>}
            </h3>
          </div>
        </div>
        <div className="p-8 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {muvVehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-slate-50 rounded-[2.5rem] overflow-hidden border border-slate-200 flex flex-col group hover:shadow-xl transition-all">
              <div className="relative h-64 overflow-hidden">
                <img src={vehicle.image} alt={vehicle.name} className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"><div className="flex items-center gap-3 text-white"><Users size={16} /><span className="font-black text-lg">{vehicle.capacity} SEATS</span></div></div>
              </div>
              <div className="p-8 flex-grow">
                <h4 className={`text-2xl font-black text-slate-900 mb-6 ${fontClass}`}>{vehicle.name}</h4>
                <button onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`} className="w-full py-4 bg-white hover:bg-geevee-orange border-2 border-slate-200 hover:text-white rounded-2xl font-black transition-all">SELECT {vehicle.name.split(' ')[1].toUpperCase()}</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SUVGroupSpecial;