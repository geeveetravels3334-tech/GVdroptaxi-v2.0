
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
  const { language, fontClass } = useLanguage();

  const getTranslatedService = (id: string) => {
      if (language === 'en') {
        if(id === 'airport') return { title: 'Airport Transfer', desc: 'Punctual, clean, and reliable transfers.' };
        if(id === 'oneway') return { title: 'One Way Drop', desc: 'Pay only for one-way distance.' };
        if(id === 'round') return { title: 'Round Trip', desc: 'Multi-day packages for family tours.' };
        if(id === 'local') return { title: 'Local Rental', desc: 'Flexible hourly and daily rentals.' };
      } else if (language === 'ta') {
        if(id === 'airport') return { title: 'விமான நிலைய டாக்ஸி', desc: 'சரியான நேர மற்றும் நம்பகமான இடமாற்றங்கள்.' };
        if(id === 'oneway') return { title: 'ஒரு வழி பயணம்', desc: 'ஒரு வழி தூரத்திற்கு மட்டும் பணம் செலுத்துங்கள்.' };
        if(id === 'round') return { title: 'இரு வழி பயணம்', desc: 'சுற்றுலா பயணங்களுக்கான பல நாள் பேக்கேஜ்கள்.' };
        if(id === 'local') return { title: 'உள்ளூர் வாடகை', desc: 'மணிநேர மற்றும் தினசரி வாடகை வசதி.' };
      } else if (language === 'hi') {
        if(id === 'airport') return { title: 'एयरपोर्ट ट्रांसफर', desc: 'समय पर और विश्वसनीय ट्रांसफर।' };
        if(id === 'oneway') return { title: 'वन वे ड्रॉप', desc: 'केवल एक तरफ की दूरी का भुगतान करें।' };
        if(id === 'round') return { title: 'राउंड ट्रिप', desc: 'पारिवारिक पर्यटन के लिए बहु-दिवसीय पैकेज।' };
        if(id === 'local') return { title: 'लोकल रेंटल', desc: 'घंटे और दैनिक किराये पर उपलब्ध।' };
      } else if (language === 'te') {
        if(id === 'airport') return { title: 'విమానాశ్రయ బదిలీ', desc: 'సమయానికి మరియు నమ్మదగిన బదిలీలు.' };
        if(id === 'oneway') return { title: 'వన్ వే డ్రాప్', desc: 'వన్-వే దూరానికి మాత్రమే చెల్లించండి.' };
        if(id === 'round') return { title: 'రౌండ్ ట్రిప్', desc: 'కుటుంబ పర్యటనల కోసం బహుళ-రోజుల ప్యాకేజీలు.' };
        if(id === 'local') return { title: 'లోకల్ రెంటల్', desc: 'గంటలు మరియు రోజువారీ అద్దెలు.' };
      } else if (language === 'kn') {
        if(id === 'airport') return { title: 'ವಿಮಾನ ನಿಲ್ದಾಣ ವರ್ಗಾವಣೆ', desc: 'ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಮತ್ತು ವಿಶ್ವಾಸಾರ್ಹ ವರ್ಗಾವಣೆಗಳು.' };
        if(id === 'oneway') return { title: 'ಒನ್ ವೇ ಡ್ರಾಪ್', desc: 'ಒನ್-ವೇ ದೂರಕ್ಕೆ ಮಾತ್ರ ಪಾವತಿಸಿ.' };
        if(id === 'round') return { title: 'ರೌಂಡ್ ಟ್ರಿಪ್', desc: 'ಕುಟುಂಬ ಪ್ರವಾಸಗಳಿಗಾಗಿ ಬಹು-ದಿನದ ಪ್ಯಾಕೇಜುಗಳು.' };
        if(id === 'local') return { title: 'ಲೋಕಲ್ ರೆಂಟಲ್', desc: 'ಗಂಟೆ ಮತ್ತು ದೈನಂದಿನ ಬಾಡಿಗೆಗಳು.' };
      }
      return { title: '', desc: '' };
  }

  const services: ServiceItem[] = [
    {
      ...getTranslatedService('airport'),
      icon: <Plane className="text-white" size={24} />,
      color: 'bg-geevee-orange',
      popular: true
    },
    {
      ...getTranslatedService('oneway'),
      icon: <Map className="text-white" size={24} />,
      color: 'bg-slate-800'
    },
    {
      ...getTranslatedService('round'),
      icon: <Repeat className="text-white" size={24} />,
      color: 'bg-slate-800'
    },
    {
      ...getTranslatedService('local'),
      icon: <Clock className="text-white" size={24} />,
      color: 'bg-slate-800'
    }
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {services.map((s, i) => (
          <div key={i} className="glass-card p-6 md:p-8 rounded-[2rem] hover:bg-white/10 dark:hover:bg-white/5 transition-all group relative overflow-hidden backdrop-blur-md border border-white/20">
            {s.popular && (
              <div className="absolute top-0 right-0 bg-geevee-orange text-white text-[9px] font-black px-3 py-1.5 rounded-bl-xl uppercase tracking-widest z-10">
                Popular
              </div>
            )}
            
            {/* Hover Glow Effect */}
            <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-geevee-orange/20 rounded-full blur-[50px] group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

            <div className={`${s.color} w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform relative z-10`}>
              {s.icon}
            </div>
            
            <h4 className={`text-base md:text-xl font-black text-slate-900 dark:text-white mb-2 ${fontClass}`}>{s.title}</h4>
            <p className={`text-xs md:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed mb-6 ${fontClass}`}>{s.desc}</p>
            
            <button 
              onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`}
              className="flex items-center gap-2 text-[10px] md:text-xs font-black text-geevee-orange uppercase tracking-widest group-hover:gap-4 transition-all"
            >
              Book Now <ArrowUpRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
