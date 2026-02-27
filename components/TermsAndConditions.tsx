
import React, { useRef } from 'react';
import { Clock, Ban, CreditCard, Ruler, MapPin, AlertCircle, Luggage, TrendingUp, ArrowUpCircle, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

interface TermItem {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

const TermsAndConditions: React.FC = () => {
  const { language, fontClass } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  const terms: TermItem[] = [
    {
      icon: <Clock size={16} />,
      title: "Round Trip Rule",
      detail: "Must return to pickup point by 11:00 PM on final day."
    },
    {
      icon: <Clock size={16} />,
      title: "Waiting Fees",
      detail: "₹150/hr after first 30 mins on one-way drops."
    },
    {
      icon: <Ban size={16} />,
      title: "Cancellation",
      detail: "₹300 fee applies once driver reaches pickup location."
    },
    {
      icon: <Ruler size={16} />,
      title: "Odometer",
      detail: "Kms calculated from garage to garage/pickup to drop."
    },
    {
      icon: <CreditCard size={16} />,
      title: "Payment",
      detail: "UPI, Cash or Transfer due immediately on trip end."
    },
    {
      icon: <MapPin size={16} />,
      title: "Day Limit",
      detail: "One day is defined from 12:00 AM to 11:00 PM."
    },
    {
      icon: <AlertCircle size={16} />,
      title: "Booking Advance",
      detail: "Small deposit (₹500-1000) required to confirm date."
    },
    {
      icon: <Luggage size={16} />,
      title: "Carrier SUV",
      detail: "Extra carrier charges of ₹300/- apply for SUVs."
    }
  ];

  const scrollToSectionTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id="terms" ref={sectionRef} className="container mx-auto px-4 max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
        <div>
          <div className={`inline-flex items-center gap-2 bg-white/10 text-white border border-white/10 backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-3 ${fontClass}`}>
            <Shield size={12} className="text-geevee-orange" />
            {language === 'ta' ? 'விதிமுறைகள்' : 'OFFICIAL POLICIES'}
          </div>
          <h2 className={`text-3xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-none ${fontClass}`}>
            Terms & Conditions
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {terms.map((term, index) => (
          <div 
            key={index}
            className="glass-card p-5 rounded-[1.5rem] hover:bg-white/5 transition-colors border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/10 p-2 rounded-lg text-geevee-orange">
                {term.icon}
              </div>
              <h4 className={`font-black text-[10px] md:text-[11px] text-slate-900 dark:text-white uppercase tracking-wider ${fontClass}`}>
                {term.title}
              </h4>
            </div>
            <p className={`text-[11px] md:text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed ${fontClass}`}>
              {term.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="glass-card border border-white/10 rounded-2xl p-4 flex flex-wrap justify-center gap-x-8 gap-y-2 mb-8 no-print bg-white/5">
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
           <TrendingUp size={12} className="text-geevee-orange" />
           Toll/Parking extra
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
           <MapPin size={12} className="text-geevee-orange" />
           Hill charges apply
        </div>
        <div className="flex items-center gap-2 text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
           <CheckCircle size={12} className="text-green-500" />
           GPS Monitored
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-black p-6 rounded-[2.5rem] flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group border border-white/10">
        <div className="flex items-center gap-4 text-left relative z-10">
           <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-geevee-orange shrink-0">
              <Shield size={20} />
           </div>
           <p className={`text-xs font-bold text-slate-300 leading-tight ${fontClass}`}>
             By booking, you accept all policies above. <br className="hidden md:block" /> Contact support for clarifications.
           </p>
        </div>
        
        <div className="flex items-center gap-4 relative z-10">
          <button 
            onClick={scrollToSectionTop}
            className="flex flex-col items-center gap-1 group/btn no-print text-slate-500 hover:text-white transition-colors"
          >
            <div className="p-3 bg-white/5 hover:bg-geevee-orange rounded-full text-white transition-all transform group-hover/btn:-translate-y-1">
              <ArrowUpCircle size={24} />
            </div>
          </button>

          <a href={`tel:${CONTACT_NUMBER}`} className="bg-geevee-orange text-white px-8 py-4 rounded-2xl font-black text-xs hover:bg-orange-600 transition-all active:scale-95 whitespace-nowrap shadow-xl">
            CALL SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
