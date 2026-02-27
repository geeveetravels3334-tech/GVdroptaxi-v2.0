
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, MessageSquare, Play, TrendingUp, ArrowRight, Upload, X, TicketPercent, Copy } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';
const WHATSAPP_URL = `https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent("Hi Geevee Travels, I'd like to book a trip.")}`;

const TRENDING_PACKAGES = [
  { name: 'Spiritual Madurai', price: '₹5,999', img: 'https://images.unsplash.com/photo-1582510003544-5243788d9d0d?q=80&w=500&auto=format&fit=crop' },
  { name: 'Ooty Hills Escape', price: '₹8,499', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=500&auto=format&fit=crop' },
  { name: 'Pondy Beach Drive', price: '₹2,499', img: 'https://images.unsplash.com/photo-1582512390196-80948f070669?q=80&w=500&auto=format&fit=crop' },
  { name: 'Velankanni Grace', price: '₹8,200', img: 'https://images.unsplash.com/photo-1543743560-6101c4475453?q=80&w=500&auto=format&fit=crop' },
];

const Hero: React.FC = () => {
  const { t, language, fontClass } = useLanguage();
  const [liveBooking, setLiveBooking] = useState({ city: 'Madurai', type: 'Sedan', time: '2 mins ago' });
  const [customHeroImage, setCustomHeroImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simulated Live Ticker Logic
  useEffect(() => {
    const cities = ['Madurai', 'Trichy', 'Ooty', 'Pondicherry', 'Tirupati', 'Coimbatore', 'Salem'];
    const types = ['Sedan', 'SUV', 'Mini', 'Crysta'];
    const interval = setInterval(() => {
      setLiveBooking({
        city: cities[Math.floor(Math.random() * cities.length)],
        type: types[Math.floor(Math.random() * types.length)],
        time: 'Just now'
      });
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCustomHeroImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };
  
  const resetHero = () => {
    setCustomHeroImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  }

  const copyCode = () => {
    navigator.clipboard.writeText('FIRST10');
    alert('Coupon Code FIRST10 copied!');
  }

  return (
    <div className="relative min-h-[80vh] flex flex-col justify-center overflow-hidden pt-12 md:pt-16 lg:pt-20 pb-10">
      
      {/* Upload Controls */}
      <div className="absolute top-24 right-4 z-50 flex gap-2 no-print">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleImageUpload} 
          />
          {customHeroImage && (
              <button onClick={resetHero} className="bg-red-500/80 text-white p-2 rounded-full hover:bg-red-600 transition-all shadow-lg">
                  <X size={20} />
              </button>
          )}
          <button onClick={triggerUpload} className="bg-white/10 backdrop-blur-md text-slate-500 dark:text-white p-2.5 rounded-full hover:bg-white/20 transition-all border border-white/20 shadow-lg group relative" title="Upload Custom Hero Image">
              <Upload size={20} />
          </button>
      </div>

      <div className="absolute inset-0 z-0">
        {customHeroImage ? (
           <div className="absolute inset-0 animate-in fade-in duration-700">
             <img src={customHeroImage} alt="Custom Hero" className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-white/80 dark:bg-black/60 backdrop-blur-sm"></div>
           </div>
        ) : (
          // Standard transparent background to let global blobs show
          <div className="absolute inset-0"></div>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex-grow flex flex-col justify-center">
        {/* Centered Content Structure */}
        <div className="flex flex-col items-center">
          <div className="w-full max-w-5xl text-center">
            
            {/* Live Booking Ticker - Fixed Height to prevent layout shift */}
            <div className="h-8 mb-8 flex items-center justify-center">
              <div className="inline-flex items-center gap-3 bg-white/20 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 rounded-full border border-slate-200 dark:border-white/10 animate-in slide-in-from-top duration-700 no-print transform-gpu shadow-lg">
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </div>
                <span className="text-slate-600 dark:text-white/90 text-[10px] font-black tracking-widest uppercase truncate max-w-[250px] md:max-w-none">
                  Now Boarding: <span className="text-geevee-orange">{liveBooking.city}</span> <span className="text-slate-400 dark:text-white/50 ml-2 italic">{liveBooking.time}</span>
                </span>
              </div>
            </div>

            <h1 className={`text-5xl md:text-8xl lg:text-9xl font-black text-slate-900 dark:text-white leading-[0.95] mb-8 animate-in slide-in-from-bottom duration-1000 tracking-tighter transform-gpu ${fontClass}`}>
               {language === 'en' ? (
                <>Geevee <span className="text-transparent bg-clip-text bg-gradient-to-r from-geevee-orange to-amber-500 italic">Travels</span> <br className="hidden md:block" /> & Taxi Tours.</>
              ) : (
                <><span className="text-transparent bg-clip-text bg-gradient-to-r from-geevee-orange to-amber-500 italic">{t.brand}</span> <br />{t.subBrand}</>
              )}
            </h1>

            <div 
              onClick={copyCode}
              className="inline-flex items-center gap-3 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 px-5 py-2.5 rounded-full cursor-pointer transition-all mb-10 group active:scale-95 select-none backdrop-blur-sm shadow-sm"
            >
               <div className="bg-yellow-500/20 p-1.5 rounded-full group-hover:bg-yellow-500/30 transition-colors">
                  <TicketPercent size={14} className="text-yellow-600 dark:text-yellow-400" />
               </div>
               <span className="text-slate-600 dark:text-slate-300 text-xs font-bold uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  First Ride? Use <span className="text-slate-900 dark:text-white font-black">FIRST10</span> for 10% Off
               </span>
               <Copy size={14} className="text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors ml-2" />
            </div>

            <p className={`text-xl md:text-3xl text-slate-600 dark:text-slate-300 mb-10 lg:mb-12 max-w-2xl mx-auto font-medium leading-relaxed ${fontClass}`}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16 transform-gpu">
              <a href={`tel:${CONTACT_NUMBER}`} className={`bg-geevee-orange hover:bg-orange-600 text-white font-black px-12 py-6 rounded-3xl shadow-[0_20px_60px_rgba(243,112,33,0.4)] transition-all flex items-center gap-3 group text-xl md:text-2xl hover:-translate-y-2 active:scale-95 ${fontClass}`}>
                {t.hero.bookNow} <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`bg-white/40 dark:bg-white/10 hover:bg-white/60 dark:hover:bg-white/20 backdrop-blur-xl text-slate-900 dark:text-white border border-slate-200 dark:border-white/20 px-10 py-6 rounded-3xl font-bold transition-all flex items-center gap-3 group text-lg md:text-xl hover:-translate-y-2 active:scale-95 ${fontClass}`}>
                <MessageSquare size={24} className="text-green-600 dark:text-green-400" />
                {t.hero.chat}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Packages Slider - Floating at bottom */}
      <div className="container mx-auto px-4 md:px-8 relative z-20 mt-10 md:mt-20 no-print">
         <div className="flex items-center gap-4 mb-6">
            <TrendingUp size={16} className="text-geevee-orange" />
            <span className="text-[11px] font-black text-slate-500 dark:text-white/50 uppercase tracking-[0.3em]">Trending This Week</span>
            <div className="flex-grow h-px bg-slate-200 dark:bg-white/5"></div>
         </div>
         
         <div className="flex overflow-x-auto pb-8 gap-4 no-scrollbar">
            {TRENDING_PACKAGES.map((pkg, i) => (
              <div key={i} className="flex-shrink-0 w-64 md:w-80 group cursor-pointer">
                 <div className="relative h-40 md:h-48 rounded-[2.5rem] overflow-hidden border border-slate-200 dark:border-white/10 shadow-xl bg-white dark:bg-[#111]">
                    <img src={pkg.img} alt={pkg.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100 will-change-transform" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                       <h4 className="text-white font-black text-xl mb-1">{pkg.name}</h4>
                       <div className="flex items-center justify-between">
                          <span className="text-geevee-orange font-black text-sm">{pkg.price}</span>
                          <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Starting At</span>
                       </div>
                    </div>
                    <div className="absolute top-6 right-6 bg-white/20 backdrop-blur-md p-2 rounded-xl border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Play size={12} fill="white" className="text-white ml-0.5" />
                    </div>
                 </div>
              </div>
            ))}
            
            <div className="flex-shrink-0 w-64 md:w-80 flex items-center justify-center">
               <button className="bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 p-10 rounded-[2.5rem] flex flex-col items-center gap-4 group transition-all w-full h-40 md:h-48 backdrop-blur-sm">
                  <div className="w-12 h-12 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-500 group-hover:text-geevee-orange group-hover:border-geevee-orange transition-all">
                     <ArrowRight size={24} />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Explore All Plans</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default Hero;
