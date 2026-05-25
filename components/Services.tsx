
import React from 'react';
import { Map, Repeat, Plane, Clock, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

interface ServiceItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
  popular?: boolean;
}

const Services: React.FC = () => {
  const { language, t, fontClass } = useLanguage();

  const services: ServiceItem[] = [
    {
      title: 'Airport Pickup',
      desc: 'Prompt and luxury pickups from major airports.',
      icon: <Plane size={20} className="text-white" />,
      color: 'bg-geevee-orange',
      popular: true
    },
    {
      title: 'One Way Taxi',
      desc: 'Economical one-way drops across Tamil Nadu.',
      icon: <Map size={20} className="text-white" />,
      color: 'bg-slate-900 dark:bg-slate-800'
    },
    {
      title: 'Round Trip',
      desc: 'Perfect for family vacations and multi-day tours.',
      icon: <Repeat size={20} className="text-white" />,
      color: 'bg-slate-900 dark:bg-slate-800'
    },
    {
      title: 'Outstation Cab',
      desc: 'Safe and comfortable long-distance travel.',
      icon: <Map size={20} className="text-white" />,
      color: 'bg-slate-900 dark:bg-slate-800'
    },
    {
      title: 'Tour Packages',
      desc: 'Fixed-rate premium holiday plans for all destinations.',
      icon: <Clock size={20} className="text-white" />,
      color: 'bg-slate-900 dark:bg-slate-800'
    },
    {
      title: 'Corporate Travel',
      desc: 'Dedicated transport solutions for elite businesses.',
      icon: <Clock size={20} className="text-white" />,
      color: 'bg-slate-900 dark:bg-slate-800'
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-6xl py-16 md:py-32">
      <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
        <div className="flex items-center justify-center gap-4 mb-4">
           <div className="h-px w-12 bg-[#D4AF37] opacity-30"></div>
           <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.6em] animate-pulse">Signature Suite</span>
           <div className="h-px w-12 bg-[#D4AF37] opacity-30"></div>
        </div>
        <h2 className={`text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight ${fontClass} leading-tight`}>
          Masterclass in <span className="luxury-text-gradient">Mobility</span>
        </h2>
        <p className={`text-slate-500 dark:text-[#9CA3AF] font-bold text-[9px] uppercase tracking-[0.4em] max-w-xl mx-auto leading-relaxed ${fontClass}`}>
          Curating exceptional journeys through state-of-the-art engineering and heritage hospitality
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
        {services.map((s, i) => (
          <div 
            key={i} 
            className="group relative h-full glass-card p-5 md:p-8 rounded-3xl premium-hover-lift hover:bg-slate-50/50 dark:hover:bg-white/5 hover:border-[#D4AF37]/45 shadow-2xl cursor-pointer overflow-hidden flex flex-col luxury-click"
          >
            {s.popular && (
              <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-[#D4AF37]/10 text-[#D4AF37] text-[6px] md:text-[8px] font-black px-3 py-1.5 rounded-full uppercase tracking-[0.3em] z-20 border border-[#D4AF37]/20 backdrop-blur-md">
                Prestige Choice
              </div>
            )}
            
            {/* Background Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none transition-opacity duration-700 group-hover:opacity-[0.08]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

            {/* Hover Glow Effect */}
            <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] group-hover:bg-[#D4AF37]/15 transition-all duration-700 pointer-events-none"></div>

            <div className="bg-[#D4AF37]/10 text-[#D4AF37] w-12 h-12 md:w-16 md:h-16 rounded-[1rem] md:rounded-[1.5rem] flex items-center justify-center mb-6 md:mb-10 shadow-2xl group-hover:rotate-6 transition-all duration-500 border border-[#D4AF37]/20 relative z-10 scale-105 group-hover:bg-[#D4AF37] group-hover:text-[#0B0F1A] group-hover:shadow-[#D4AF37]/40">
              <div className="icon-hover-pulse transition-transform duration-500 scale-75 md:scale-90">
                {s.icon}
              </div>
            </div>
            
            <h4 className={`text-base md:text-xl font-black text-slate-800 dark:text-white mb-2 md:mb-4 tracking-tighter ${fontClass} group-hover:text-[#D4AF37] transition-colors leading-tight`}>
              {s.title}
            </h4>
            <p className={`text-[9px] md:text-[11px] text-slate-500 dark:text-[#D1D5DB] font-bold leading-relaxed mb-6 md:mb-10 grow ${fontClass} opacity-80 group-hover:opacity-100 transition-opacity uppercase tracking-wider`}>
              {s.desc}
            </p>
            
            <button 
              onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`}
              className="group/btn flex items-center justify-between w-full text-[7px] md:text-[9px] font-black text-[#D4AF37] uppercase tracking-[0.3em] transition-all relative z-10"
            >
              <span>Initialize Reserve</span>
              <div className="bg-white/5 text-[#D4AF37] p-2 md:p-3 rounded-lg md:rounded-xl group-hover/btn:bg-[#D4AF37] group-hover/btn:text-[#0B0F1A] transition-all duration-500 shadow-xl border border-white/5">
                <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-500" />
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
