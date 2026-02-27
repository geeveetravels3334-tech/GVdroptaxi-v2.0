
import React from 'react';
import { Shield, Headphones, DollarSign, Award, ThumbsUp, Landmark, CheckCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const WhyChooseUs: React.FC = () => {
  const { language, t, fontClass } = useLanguage();

  const features = [
    {
      title: 'Fixed Transparent Pricing',
      desc: 'All-inclusive quotes with no surprises.',
      icon: <DollarSign size={18} />
    },
    {
      title: 'Vetted Professional Drivers',
      desc: 'Expert navigators for Southern roads.',
      icon: <Award size={18} />
    },
    {
      title: 'Regional Hub Excellence',
      desc: 'Hubs in Madurai, Coimbatore, Trichy, Chennai.',
      icon: <Landmark size={18} />
    }
  ];

  return (
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="bg-geevee-dark rounded-[2.5rem] p-8 lg:p-12 relative overflow-hidden shadow-2xl border border-white/5">
        {/* Subtle background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-1/2 h-1/2 bg-geevee-orange rounded-full blur-[120px]"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-1/2 h-1/2 bg-blue-500 rounded-full blur-[120px]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            
            {/* Left Content Side */}
            <div className="lg:w-5/12 text-center lg:text-left">
              <h2 className={`text-geevee-orange font-black tracking-widest uppercase mb-4 text-[10px] flex items-center justify-center lg:justify-start gap-3 ${fontClass}`}>
                <span className="w-6 h-[2px] bg-geevee-orange"></span>
                PREMIUM STANDARDS
              </h2>
              <h3 className={`text-xl md:text-2xl lg:text-3xl font-black text-white leading-tight mb-6 ${fontClass}`}>
                {language === 'hi' ? <>यात्रा का तरीका बदलें <br /><span className="text-luxury-gold">तमिलनाडु में।</span></> : 
                 language === 'ta' ? <>உங்கள் பயணத்தை <br /><span className="text-luxury-gold">புதியதாய் அனுபவியுங்கள்.</span></> :
                 language === 'te' ? <>మీ ప్రయాణాన్ని <br /><span className="text-luxury-gold">పునర్నిర్వచించండి.</span></> :
                 language === 'kn' ? <>ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು <br /><span className="text-luxury-gold">ಮರು ವ್ಯಾಖ್ಯಾನಿಸಿ.</span></> :
                 <>Redefining The Way <br />You <span className="text-luxury-gold">Travel TN.</span></>
                }
              </h3>
              <p className={`text-slate-400 text-sm font-medium leading-relaxed mb-8 ${fontClass}`}>
                {language === 'hi' ? 'सिर्फ एक टैक्सी सेवा से कहीं अधिक।' :
                 language === 'ta' ? 'வெறும் டாக்ஸி சேவை மட்டுமல்ல, ஒரு பாரம்பரியம்.' :
                 language === 'te' ? 'కేవలం టాక్సీ సర్వీస్ మాత్రమే కాదు.' :
                 language === 'kn' ? 'ಕೇವಲ ಟ್ಯಾಕ್ಸಿ ಸೇವೆಯಲ್ಲ.' :
                 `More than just a taxi service, we are a travel legacy providing safe transport for over 15 years.`
                }
              </p>
              
              <div className={`space-y-4 max-w-sm mx-auto lg:mx-0 mb-10 ${fontClass}`}>
                {['GPS Fleet Monitoring', 'Strict Sanitization', 'Multilingual Chauffeurs'].map((check, i) => (
                  <div key={i} className="flex items-center gap-3 text-white font-bold text-xs">
                    <CheckCircle className="text-geevee-orange" size={16} />
                    {check}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-8 border-t border-white/5">
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-white mb-1">15+</span>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Experience</span>
                </div>
                <div className="text-center lg:text-left">
                  <span className="block text-2xl font-black text-white mb-1">10k+</span>
                  <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Travelers</span>
                </div>
              </div>
            </div>

            {/* Right Side: Feature Grid */}
            <div className="lg:w-7/12 grid grid-cols-1 gap-4">
              {features.map((f, i) => (
                <div key={i} className="group bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 rounded-xl bg-geevee-orange text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0">
                      {f.icon}
                    </div>
                    <div>
                      <h4 className={`text-lg font-black text-white mb-1 group-hover:text-geevee-orange transition-colors ${fontClass}`}>{f.title}</h4>
                      <p className={`text-slate-400 font-medium text-xs leading-relaxed ${fontClass}`}>{f.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              <div className="bg-geevee-orange p-6 rounded-2xl mt-2 flex items-center justify-between group cursor-pointer hover:bg-orange-600 transition-all">
                <div className="text-white">
                  <p className="text-[8px] font-black uppercase tracking-widest mb-1 opacity-80">Join Our Network</p>
                  <p className={`text-lg font-black ${fontClass}`}>Trusted by Corporates</p>
                </div>
                <div className="bg-white/20 p-2.5 rounded-xl text-white group-hover:translate-x-1 transition-transform">
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
