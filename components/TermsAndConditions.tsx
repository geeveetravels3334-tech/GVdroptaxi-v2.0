import React, { useRef } from 'react';
import { Clock, Ban, CreditCard, Ruler, MapPin, AlertCircle, Luggage, TrendingUp, ArrowUpCircle, Shield, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

interface TermItem {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

interface TermsAndConditionsProps {
  id?: string;
}

const TermsAndConditions: React.FC<TermsAndConditionsProps> = ({ id: propId }) => {
  const { language, fontClass } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Use propId if provided, otherwise default to "terms"
  const sectionId = propId || "terms";

  const terms: TermItem[] = [
    {
      icon: <Clock size={16} />,
      title: "One Day Round Trip",
      detail: "The journey must conclude at your original pickup point by 11:00 PM."
    },
    {
      icon: <Clock size={16} />,
      title: "Waiting Charges",
      detail: "₹150/hour will be charged for any waiting duration on one-way trips."
    },
    {
      icon: <Ban size={16} />,
      title: "Cancellation",
      detail: "₹300 fee applies if the driver has already reached the specified pickup point."
    },
    {
      icon: <Ruler size={16} />,
      title: "Odometer Reading",
      detail: "Kindly ensure that the starting and ending mileage readings are documented clearly."
    },
    {
      icon: <CreditCard size={16} />,
      title: "Payment Methods",
      detail: "Settlements can be gracefully completed via bank transfer or direct cash."
    },
    {
      icon: <MapPin size={16} />,
      title: "Definition of One Day",
      detail: "One calendar day is calculated on a 12:00 AM to 11:00 PM timeframe."
    },
    {
      icon: <AlertCircle size={16} />,
      title: "Advance Bookings",
      detail: "A minimal holding deposit is required to secure advance limousine bookings."
    },
    {
      icon: <Shield size={16} />,
      title: "Permit & Driver Bata",
      detail: "All permits, tolls, and hospitality allowances are covered in your final quote."
    }
  ];

  const scrollToSectionTop = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div id={sectionId} ref={sectionRef} className="container mx-auto px-4 py-10 md:py-24 max-w-7xl relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-10 border-b border-white/10 pb-8">
        <div>
          <div className={`inline-flex items-center gap-3 bg-white/5 text-[#D4AF37] border border-[#D4AF37]/20 backdrop-blur-md px-6 py-2.5 rounded-full text-[9px] font-black uppercase tracking-[0.25em] mb-6 ${fontClass}`}>
            <Shield size={12} />
            {language === 'ta' ? 'விதிமுறைகள்' : 'Security protocol'}
          </div>
          <h2 className={`text-4xl md:text-7xl font-serif text-white tracking-tight leading-tighter italic ${fontClass}`}>
            Terms & <span className="luxury-text-gradient">Conditions</span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-10 md:mb-16">
        {terms.map((term, index) => (
          <div 
            key={index}
            className="bg-gradient-to-b from-[#0C1E38]/50 via-[#040812]/80 to-[#040812]/90 backdrop-blur-sm p-5 sm:p-8 rounded-2xl md:rounded-[2rem] border border-white/5 hover:border-[#D4AF37]/30 transition-all duration-500 shadow-xl group hover:shadow-[#D4AF37]/5 md:transform md:hover:-translate-y-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-white/5 p-3 rounded-xl text-[#D4AF37] border border-white/5 group-hover:bg-[#D4AF37] group-hover:text-[#040812] transition-colors duration-500">
                {term.icon}
              </div>
              <h4 className={`font-black text-[10px] md:text-xs text-[#FCF6BA] uppercase tracking-[0.2em] ${fontClass}`}>
                {term.title}
              </h4>
            </div>
            <p className={`text-xs md:text-sm font-medium text-slate-400 leading-relaxed ${fontClass}`}>
              {term.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16 no-print shadow-sm">
        <div className="flex items-center gap-3 text-[9px] font-black text-[#FCF6BA] uppercase tracking-[0.25em]">
           <TrendingUp size={12} className="text-[#D4AF37]" />
           Toll/Parking extra
        </div>
        <div className="flex items-center gap-3 text-[9px] font-black text-[#FCF6BA] uppercase tracking-[0.25em]">
           <MapPin size={12} className="text-[#D4AF37]" />
           Hill charges apply
        </div>
        <div className="flex items-center gap-3 text-[9px] font-black text-[#FCF6BA] uppercase tracking-[0.25em]">
           <CheckCircle size={12} className="text-green-500" />
           GPS Monitored
        </div>
      </div>

      <div className="bg-[#0C1E38] rounded-[2.5rem] md:rounded-[4rem] p-5 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden border border-[#D4AF37]/25">
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center gap-6 text-left relative z-10 w-full lg:w-auto">
           <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] shrink-0 border border-[#D4AF37]/20">
              <Shield size={24} />
           </div>
           <div>
             <p className={`text-lg md:text-xl font-serif font-black text-white ${fontClass}`}>
               By booking, you accept all policies.
             </p>
             <p className="text-slate-400 text-sm font-medium mt-1">Contact our executive compliance team for any inquiries.</p>
           </div>
        </div>
        
        <div className="flex items-center gap-6 relative z-10 w-full lg:w-auto justify-between lg:justify-end">
          <button 
            onClick={scrollToSectionTop}
            className="hidden sm:flex flex-col items-center gap-1 group/btn no-print text-slate-500 hover:text-white transition-colors"
          >
            <div className="p-4 bg-white/5 hover:bg-[#D4AF37]/15 rounded-full text-[#D4AF37] transition-all md:transform md:hover:-translate-y-2 border border-white/5 shadow-lg">
              <ArrowUpCircle size={24} />
            </div>
          </button>

          <a href={`tel:${CONTACT_NUMBER}`} className="flex-1 lg:flex-none flex justify-center text-center premium-glass-btn-solid px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] active:scale-95 duration-500 shadow-xl">
            CONSULT SUPPORT
          </a>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
