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
      icon: <Car className="text-geevee-orange" />,
      color: 'bg-orange-50',
      borderColor: 'hover:border-geevee-orange'
    },
    {
      name: getTypeName('Sedan'),
      examples: 'Swift Dzire',
      capacity: '4 Seater',
      price: '₹14/km',
      icon: <Car className="text-blue-600" />,
      color: 'bg-blue-50',
      borderColor: 'hover:border-blue-600'
    },
    {
      name: 'SUV',
      examples: 'Ertiga, Xylo',
      capacity: '6-7 Seater',
      price: '₹18/km',
      icon: <Car className="text-green-600" />,
      color: 'bg-green-50',
      borderColor: 'hover:border-green-600'
    },
    {
      name: getTypeName('Premium'),
      examples: 'Innova Crysta',
      capacity: '7 Seater',
      price: '₹22/km',
      icon: <Car className="text-purple-600" />,
      color: 'bg-purple-50',
      borderColor: 'hover:border-purple-600'
    },
    {
      name: getTypeName('Traveller'),
      examples: '12-17 Seats',
      capacity: '12+ Seater',
      price: '₹26/km',
      icon: <Car className="text-red-600" />,
      color: 'bg-red-50',
      borderColor: 'hover:border-red-600'
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
        <div className={`inline-flex items-center gap-2 bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-4 ${fontClass}`}>
          <Car size={12} className="text-geevee-orange" />
          {language === 'en' ? 'Our Elite Fleet' : 
           language === 'ta' ? 'எங்கள் வாகனங்கள்' : 
           language === 'hi' ? 'हमारे वाहन' : 
           language === 'te' ? 'మా వాహనాలు' : 
           'ನಮ್ಮ ವಾಹನಗಳು'}
        </div>
        <h3 className={`text-2xl md:text-5xl font-black text-slate-900 mb-4 leading-tight tracking-tight ${fontClass}`}>
          {language === 'en' ? 'Select Your Travel Companion' : 
           language === 'ta' ? 'உங்கள் பயணத் துணையைத் தேர்ந்தெடுக்கவும்' :
           language === 'hi' ? 'अपना यात्रा साथी चुनें' :
           language === 'te' ? 'మీ ప్రయాణ సహచరుడిని ఎంచుకోండి' :
           'ನಿಮ್ಮ ಪ್ರಯಾಣದ ಸಂಗಾತಿಯನ್ನು ಆರಿಸಿ'}
        </h3>
        <p className={`text-slate-500 font-medium text-sm md:text-base max-w-xl mx-auto leading-relaxed ${fontClass}`}>
          {language === 'en' ? 'Meticulously maintained vehicles for every journey, paired side-by-side for your quick selection.' :
           language === 'ta' ? 'ஒவ்வொரு பயணத்திற்கும் முறையாக பராமரிக்கப்படும் வாகனங்கள்.' :
           language === 'hi' ? 'हर यात्रा के लिए सावधानीपूर्वक बनाए रखा गया वाहन।' :
           'Comfortable and clean vehicles for every trip.'}
        </p>
      </div>

      {/* 2-Column Side-by-Side Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {types.map((t, i) => (
          <div 
            key={i} 
            onClick={handleSelect}
            className={`group cursor-pointer bg-white p-5 rounded-[2rem] border-2 border-slate-50 shadow-md hover:shadow-xl transition-all duration-500 flex items-center justify-between relative overflow-hidden ${t.borderColor}`}
          >
            {/* Hover Background Accent */}
            <div className={`absolute inset-0 ${t.color} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}></div>
            
            <div className="relative z-10 flex items-center gap-5">
              <div className={`${t.color} w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500`}>
                {React.cloneElement(t.icon as React.ReactElement<{ size: number }>, { size: 28 })}
              </div>
              <div>
                <h4 className={`text-lg font-black text-slate-900 leading-tight ${fontClass}`}>{t.name}</h4>
                <p className="text-[9px] font-black text-slate-400 tracking-widest uppercase">{t.examples}</p>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-[10px] mt-1">
                  <UserCheck size={12} className="text-geevee-orange" />
                  {t.capacity}
                </div>
              </div>
            </div>
            
            <div className="relative z-10 text-right flex flex-col items-end gap-2">
              <div className="text-2xl font-black text-geevee-dark group-hover:text-geevee-orange transition-colors leading-none tracking-tight">
                {t.price}
              </div>
              <button className="px-4 py-2.5 bg-slate-950 text-white rounded-xl font-black text-[9px] uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg group-hover:bg-geevee-orange active:scale-95 whitespace-nowrap">
                Book <ArrowRight size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleTypeGrid;