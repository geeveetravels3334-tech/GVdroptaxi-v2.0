import React from 'react';
import { Car, ArrowRight, UserCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const VehicleTypeGrid: React.FC = () => {
  const { language, fontClass } = useLanguage();

  const getTypeName = (type: string) => {
    switch (language) {
      case 'ta':
        if (type === 'Mini') return 'மினி';
        if (type === 'Sedan') return 'செடான்';
        if (type === 'Premium') return 'பிரீமியம்';
        if (type === 'Traveller') return 'டிராவலர்';
        return type;
      case 'hi':
        if (type === 'Mini') return 'मिनी';
        if (type === 'Sedan') return 'सिडान';
        if (type === 'Premium') return 'प्रीमियम';
        if (type === 'Traveller') return 'ट्रैवलर';
        return type;
      case 'te':
        if (type === 'Mini') return 'మినీ';
        if (type === 'Sedan') return 'సెడాన్';
        if (type === 'Premium') return 'ప్రీమియం';
        if (type === 'Traveller') return 'ట్రావెలర్';
        return type;
      case 'kn':
        if (type === 'Mini') return 'ಮಿನಿ';
        if (type === 'Sedan') return 'ಸೆಡಾನ್';
        if (type === 'Premium') return 'ಪ್ರೀಮಿಯಂ';
        if (type === 'Traveller') return 'ಟ್ರಾವೆಲರ್';
        return type;
      default:
        return type;
    }
  };

  const types = [
    {
      name: getTypeName('Mini'),
      examples: 'WagonR',
      capacity: '4 Seater',
      price: '₹13/km',
      icon: <Car className="text-[#D4AF37]" />,
      color: 'bg-[#D4AF37]/5',
      borderColor: 'hover:border-[#D4AF37]'
    },
    {
      name: getTypeName('Sedan'),
      examples: 'Swift Dzire',
      capacity: '4 Seater',
      price: '₹14/km',
      icon: <Car className="text-[#D4AF37]" />,
      color: 'bg-[#D4AF37]/5',
      borderColor: 'hover:border-[#D4AF37]'
    },
    {
      name: 'SUV',
      examples: 'Ertiga, Xylo',
      capacity: '6-7 Seater',
      price: '₹18/km',
      icon: <Car className="text-[#D4AF37]" />,
      color: 'bg-[#D4AF37]/5',
      borderColor: 'hover:border-[#D4AF37]'
    },
    {
      name: getTypeName('Premium'),
      examples: 'Innova Crysta',
      capacity: '7 Seater',
      price: '₹22/km',
      icon: <Car className="text-[#D4AF37]" />,
      color: 'bg-[#D4AF37]/5',
      borderColor: 'hover:border-[#D4AF37]'
    },
    {
      name: getTypeName('Traveller'),
      examples: '12-17 Seats',
      capacity: '12+ Seater',
      price: '₹26/km',
      icon: <Car className="text-[#D4AF37]" />,
      color: 'bg-[#D4AF37]/5',
      borderColor: 'hover:border-[#D4AF37]'
    }
  ];

  const handleSelect = () => {
    const tariffSection = document.getElementById('tariff');
    if (tariffSection) {
      tariffSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-5xl">
      {/* Centered Header Section */}
      <div className="text-center mb-12">
        <div className={`inline-flex items-center gap-2 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-[#9CA3AF] px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-4 ${fontClass} border border-transparent dark:border-[#D4AF37]/20`}>
          <Car size={12} className="text-[#D4AF37]" />
          {language === 'en' ? 'Our Elite Fleet' : 
           language === 'ta' ? 'எங்கள் வாகனங்கள்' : 
           language === 'hi' ? 'हमारे वाहन' : 
           language === 'te' ? 'మా వాహనాలు' : 
           'ನಮ್ಮ వాహనములు'}
        </div>
        <h3 className={`text-2xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 leading-tight tracking-tight ${fontClass}`}>
          {language === 'en' ? 'Select Your Travel Companion' : 
           language === 'ta' ? 'உங்கள் பயணத் துணையைத் தேர்ந்தெடுக்கவும்' :
           language === 'hi' ? 'अपना यात्रा साथी चुनें' :
           language === 'te' ? 'మీ ప్రయాణ సహచరుడిని ఎంచుకోండి' :
           'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಸಂಗಾತಿಯನ್ನು ఆರಿಸಿ'}
        </h3>
        <p className={`text-slate-500 dark:text-[#9CA3AF] font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed ${fontClass}`}>
          {language === 'en' ? 'Meticulously maintained vehicles for every journey, paired side-by-side for your quick selection.' :
           language === 'ta' ? 'ஒவ்வொரு பயணத்திற்கும் முறையாக பராமரிக்கப்படும் வாகனங்கள்.' :
           language === 'hi' ? 'हर यात्रा के लिए सावधानीपूर्वक बनाए रखा गया वाहन।' :
           'Comfortable and clean vehicles for every trip.'}
        </p>
      </div>

      {/* 2-Column Side-by-Side Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        {types.map((t, i) => (
          <div 
            key={i} 
            onClick={handleSelect}
            className={`group cursor-pointer glass-card p-4 md:p-5 rounded-3xl md:rounded-[2rem] flex items-center justify-between relative overflow-hidden transition-all duration-500 border border-slate-200 dark:border-[#D4AF37]/15 ${t.borderColor} hover:bg-white/60 dark:hover:bg-[#111827]/60 active:scale-[0.98] luxury-click`}
          >
            {/* Hover Background Accent */}
            <div className={`absolute inset-0 ${t.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
            
            <div className="relative z-10 flex items-center gap-3 md:gap-5">
              <div className={`${t.color} w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-500 border border-[#D4AF37]/10`}>
                {React.cloneElement(t.icon as React.ReactElement<{ size: number, className: string }>, { size: 24, className: `${(t.icon as React.ReactElement<{ className: string }>).props.className} md:w-7 md:h-7` })}
              </div>
              <div className="flex flex-col justify-center">
                <h4 className={`text-base md:text-lg font-black text-slate-900 dark:text-white leading-tight ${fontClass} group-hover:text-luxury-gold-soft transition-colors`}>{t.name}</h4>
                <p className="text-[8px] md:text-[9px] font-black text-slate-400 dark:text-[#9CA3AF] tracking-[0.2em] uppercase mt-0.5">{t.examples}</p>
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-[#9CA3AF] font-bold text-[9px] md:text-[10px] mt-1">
                  <UserCheck size={10} className="text-[#D4AF37] md:w-3 md:h-3" />
                  {t.capacity}
                </div>
              </div>
            </div>
            
            <div className="relative z-10 text-right flex flex-col items-end gap-1.5 md:gap-2 shrink-0">
              <div className="text-xl md:text-2xl font-black text-slate-900 dark:text-luxury-gold-soft transition-colors leading-none tracking-tight">
                {t.price}
              </div>
              <button className="px-3 md:px-4 py-2 md:py-2.5 bg-slate-950 dark:bg-[#D4AF37] text-white dark:text-[#0B0F1A] rounded-lg md:rounded-xl font-black text-[8px] md:text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 md:gap-2 shadow-lg hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] active:scale-95 whitespace-nowrap">
                Book <ArrowRight size={10} className="md:w-3 md:h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeGrid;
