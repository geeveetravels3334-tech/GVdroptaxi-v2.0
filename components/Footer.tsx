
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Landmark } from 'lucide-react';
import Logo from './Logo.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

const Footer: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const { language, t, fontClass } = useLanguage();

  const handleBookClick = () => {
    window.location.href = `tel:${CONTACT_NUMBER}`;
  };

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Hidden Admin Trigger: Triple click logo
    if (newCount >= 3) {
      window.location.hash = '#admin';
      window.scrollTo(0, 0);
      setClickCount(0);
    }

    // Reset counter after 2 seconds of inactivity
    setTimeout(() => setClickCount(0), 2000);
  };

  const branches = [
    "Madurai",
    "Coimbatore",
    "Cuddalore",
    "Tiruvannamalai",
    "Trichy"
  ];

  const content = {
    en: { explore: 'Explore', locations: 'Locations', contact: 'Get in Touch', book: 'BOOK YOUR RIDE', headOffice: 'Head Office', branches: 'Our Branches' },
    ta: { explore: 'விரைவு இணைப்புகள்', locations: 'கிளைகள்', contact: 'தொடர்பு கொள்ள', book: 'வாகனத்தை முன்பதிவு செய்', headOffice: 'தலைமை அலுவலகம்', branches: 'எங்கள் கிளைகள்' },
    hi: { explore: 'अन्वेषण', locations: 'स्थान', contact: 'संपर्क करें', book: 'अभी बुक करें', headOffice: 'प्रधान कार्यालय', branches: 'हमारी शाखाएँ' },
    te: { explore: 'లింకులు', locations: 'స్థానాలు', contact: 'సంప్రదించండి', book: 'బుక్ చేయండి', headOffice: 'ప్రధాన కార్యాలయం', branches: 'మా శాఖలు' },
    kn: { explore: 'ಅನ್ವೇಷಿಸಿ', locations: 'ಸ್ಥಳಗಳು', contact: 'ಸಂಪರ್ಕಿಸಿ', book: 'ಬುಕ್ ಮಾಡಿ', headOffice: 'ಕೇಂದ್ರ ಕಚೇರಿ', branches: 'ನಮ್ಮ ಶಾಖೆಗಳು' },
  };

  const txt = content[language] || content.en;

  return (
    <footer className="bg-geevee-dark text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-geevee-orange/5 blur-[150px] -mr-48 -mt-48 pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          {/* Brand Info */}
          <div className="space-y-8">
            <div 
              className="flex items-center gap-2 group cursor-pointer"
              onClick={handleLogoClick}
            >
              <Logo className="w-32 h-16 shrink-0" isLight={true} />
            </div>
            <p className={`text-slate-400 leading-relaxed font-medium text-lg ${fontClass}`}>
              {language === 'en' ? 'Redefining heritage and modern travel across Tamil Nadu. Premium comfort, professional drivers, and absolute transparency since 2014.' : t.hero.subtitle}
            </p>
            <div className="flex gap-5">
              {[Facebook, Twitter, Instagram].map((Icon, idx) => (
                <a key={idx} href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-geevee-orange transition-all text-white border border-white/5 shadow-xl">
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-xl font-black mb-10 border-b-4 border-geevee-orange pb-3 inline-block uppercase tracking-wider ${fontClass}`}>{txt.explore}</h4>
            <ul className={`space-y-5 text-slate-400 font-bold text-sm uppercase tracking-widest ${fontClass}`}>
              <li><a href="#home" className="hover:text-geevee-orange transition-all flex items-center gap-3"><span>&rsaquo;</span> {t.nav.home}</a></li>
              <li><a href="#services" className="hover:text-geevee-orange transition-all flex items-center gap-3"><span>&rsaquo;</span> {t.nav.packages}</a></li>
              <li><a href="#tariff" className="hover:text-geevee-orange transition-all flex items-center gap-3"><span>&rsaquo;</span> {t.nav.tariff}</a></li>
              <li><a href="#terms-anchor" className="hover:text-geevee-orange transition-all flex items-center gap-3"><span>&rsaquo;</span> Terms</a></li>
            </ul>
          </div>

          {/* Contact & Branches */}
          <div>
            <h4 className={`text-xl font-black mb-10 border-b-4 border-geevee-orange pb-3 inline-block uppercase tracking-wider ${fontClass}`}>{txt.locations}</h4>
            <ul className="space-y-8">
              <li className="flex items-start gap-5 text-slate-400">
                <div className="bg-geevee-orange/20 p-3 rounded-2xl text-geevee-orange border border-geevee-orange/20 shrink-0">
                   <MapPin size={24} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black text-geevee-orange uppercase tracking-widest mb-1 ${fontClass}`}>{txt.headOffice}</span>
                  <span className="font-bold text-base leading-relaxed text-slate-200">
                    99 Bharathi Nagar, Kilambakkam,<br />
                    Urapakkam, Chennai, TN 603210
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-5 text-slate-400">
                <div className="bg-blue-500/20 p-3 rounded-2xl text-blue-400 border border-blue-500/20 shrink-0">
                  <Landmark size={24} />
                </div>
                <div className="flex flex-col">
                  <span className={`text-[10px] font-black text-blue-400 uppercase tracking-widest mb-1 ${fontClass}`}>{txt.branches}</span>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-bold text-slate-200 text-sm">
                    {branches.map((branch, i) => (
                      <span key={i} className="flex items-center gap-1">
                        <span className="text-blue-500">•</span> {branch}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Book Now Section */}
          <div>
            <h4 className={`text-xl font-black mb-10 border-b-4 border-geevee-orange pb-3 inline-block uppercase tracking-wider ${fontClass}`}>{txt.contact}</h4>
            <div className="space-y-6 mb-8">
              <a href={`tel:${CONTACT_NUMBER}`} className="flex items-center gap-5 text-slate-400 group">
                <div className="bg-geevee-orange/20 p-3 rounded-2xl text-geevee-orange border border-geevee-orange/20 group-hover:bg-geevee-orange group-hover:text-white transition-all">
                  <Phone size={24} />
                </div>
                <span className="font-black text-2xl text-white group-hover:text-geevee-orange transition-colors">{CONTACT_NUMBER}</span>
              </a>
              <div className="flex items-center gap-5 text-slate-400">
                <div className="bg-geevee-orange/20 p-3 rounded-2xl text-geevee-orange border border-geevee-orange/20">
                  <Mail size={24} />
                </div>
                <span className="font-bold text-sm">bookings@tamilnadutaxitours.com</span>
              </div>
            </div>
            <button 
              onClick={handleBookClick}
              className={`w-full bg-geevee-orange text-white py-6 rounded-3xl font-black text-xl hover:bg-orange-600 transition-all shadow-2xl shadow-geevee-orange/30 active:scale-95 ${fontClass}`}
            >
              {txt.book}
            </button>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[11px] font-black uppercase tracking-[0.2em] text-slate-600">
          <p>© 2025 GEEVEE TRAVELS - ALL RIGHTS RESERVED.</p>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-all">Refund Policy</a>
            <button onClick={() => window.location.hash = '#admin'} className="hover:text-white transition-all no-print">Admin Portal</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
