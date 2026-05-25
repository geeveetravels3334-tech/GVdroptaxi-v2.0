
import React from 'react';
import { Shield, Headphones, DollarSign, Award, ThumbsUp, Landmark, CheckCircle, ArrowRight, Map } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const WhyChooseUs: React.FC = () => {
  const { language, t, fontClass } = useLanguage();

  const features = [
    {
      title: '24/7 Customer Support',
      desc: 'Always available via WhatsApp and Phone.',
      icon: <Headphones size={18} />
    },
    {
      title: 'Verified Professional Drivers',
      desc: 'Screened and trained experts for safe travel.',
      icon: <Shield size={18} />
    },
    {
      title: 'Spotless Clean Cars',
      desc: 'Hygienic and well-maintained premium fleet.',
      icon: <ThumbsUp size={18} />
    },
    {
      title: 'Real-time GPS Tracking',
      desc: 'Track your ride for enhanced security.',
      icon: <Map size={18} />
    },
    {
      title: 'Affordable Fixed Pricing',
      desc: 'Zero hidden charges and lowest fares guaranteed.',
      icon: <DollarSign size={18} />
    }
  ];

  return (
    <div className="container mx-auto px-4 max-w-7xl py-20 md:py-32">
      <div className="glass-card rounded-[3rem] p-8 md:p-20 relative overflow-hidden group border-[#D4AF37]/20">
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
           <div className="absolute top-[-20%] left-[-20%] w-[120%] h-[120%] bg-gradient-to-br from-[#D4AF37]/10 to-transparent dark:from-[#D4AF37]/5 dark:to-transparent rounded-full blur-[150px] transition-all duration-[3000ms] opacity-70"></div>
           <div className="absolute bottom-[-20%] right-[-20%] w-[120%] h-[120%] bg-gradient-to-tl from-[#111827]/20 to-transparent dark:from-[#0B0F1A]/5 dark:to-transparent rounded-full blur-[150px] transition-all duration-[3000ms] opacity-50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/30 via-transparent to-transparent dark:from-white/5 dark:via-transparent dark:to-transparent opacity-80"></div>
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row gap-20 items-center">
          
          {/* Left Content Side */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className={`flex items-center justify-center lg:justify-start gap-4 mb-8 ${fontClass}`}>
               <div className="w-12 h-[2px] bg-[#D4AF37]"></div>
               <span className="text-luxury-gold-soft font-black tracking-[0.5em] uppercase text-[9px] animate-pulse">Elite Standard</span>
            </div>
            
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white leading-tight mb-4 tracking-tight ${fontClass}`}>
              The Gold Standard of <span className="luxury-text-gradient">Tamil Nadu</span> Travel.
            </h2>
            
            <p className={`text-slate-500 dark:text-[#D1D5DB] font-medium text-sm leading-relaxed mb-8 ${fontClass}`}>
              Over 15 years leading the industry. We don't just provide transport; we deliver an uncompromising experience of safety, luxury, and professional precision.
            </p>
            
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 ${fontClass}`}>
              {['Real-time Fleet Tracking', 'Certified Sanitation Protocol', 'Regional Experience Centers', 'Multilingual Chauffeurs'].map((check, i) => (
                <div key={i} className="flex items-center gap-4 text-slate-800 dark:text-white font-bold text-xs">
                  <div className="bg-[#D4AF37]/10 p-2 rounded-xl border border-[#D4AF37]/20 shadow-sm">
                    <CheckCircle className="text-[#D4AF37]" size={16} />
                  </div>
                  {check}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-slate-200 dark:border-white/10">
              <div>
                <span className="block text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1 luxury-text-gradient italic font-serif">15Yrs</span>
                <span className="text-[8px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-none">Market Leadership</span>
              </div>
              <div className="w-px h-10 bg-slate-200 dark:bg-white/10"></div>
              <div>
                <span className="block text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter mb-1 luxury-text-gradient italic font-serif">10k+</span>
                <span className="text-[8px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-none">Guests Served</span>
              </div>
            </div>
          </div>

          {/* Right Side: Feature Grid */}
          <div className="lg:w-1/2 grid grid-cols-1 gap-6">
            {features.map((f, i) => (
              <div 
                key={i} 
                className="group/item glass-card p-6 md:p-8 rounded-2xl premium-hover-lift hover:bg-white/5 shadow-md hover:shadow-xl border-[#D4AF37]/10"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 text-[#D4AF37] flex items-center justify-center border border-white/10 group-hover/item:bg-[#D4AF37] group-hover/item:text-[#0B0F1A] transition-colors duration-500 shrink-0 shadow-sm">
                    <div className="icon-hover-rotate transition-transform duration-500">
                      {f.icon}
                    </div>
                  </div>
                  <div>
                    <h4 className={`text-base font-black text-white mb-1 transition-colors ${fontClass} group-hover/item:text-luxury-gold-soft`}>{f.title}</h4>
                    <p className={`text-[#D1D5DB] font-semibold text-[11px] leading-relaxed ${fontClass}`}>{f.desc}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div 
              className="bg-transparent bg-gradient-to-br from-[#111827] to-[#0B0F1A] border border-[#D4AF37]/25 p-8 rounded-3xl mt-4 flex items-center justify-between group/cta cursor-pointer transition-all duration-500 shadow-2xl hover:border-[#D4AF37]/45 premium-hover-lift luxury-click relative overflow-hidden group/item premium-reflection"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/cta:animate-light-swipe"></div>
              <div className="relative z-10">
                <p className="text-[8px] font-black uppercase tracking-widest mb-1 text-luxury-gold-soft">Join Our Exclusive Network</p>
                <p className={`text-lg font-bold text-white ${fontClass}`}>Choice of Corporates</p>
              </div>
              <div className="bg-white/5 p-3 rounded-xl text-[#D4AF37] border border-white/10 group-hover/cta:bg-[#D4AF37] group-hover/cta:text-[#0B0F1A] transition-all duration-500 shadow-lg">
                <div className="icon-hover-shift transition-transform duration-300">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
