import React, { useState } from 'react';
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, ArrowUp, ShieldCheck, HelpCircle } from 'lucide-react';
import Logo from './Logo.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';

interface FooterProps {
  id?: string;
}

const Footer: React.FC<FooterProps> = ({ id }) => {
  const [clickCount, setClickCount] = useState(0);
  const { language, t, fontClass } = useLanguage();

  const handleBookClick = () => {
    window.location.href = `tel:${CONTACT_NUMBER}`;
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    te: { explore: 'లింకులు', locations: 'స్థానాలు', contact: 'సంಪ್ರదించండి', book: 'బుక్ చేయండి', headOffice: 'ಪ್ರಧಾನ కార్యಾಲయం', branches: 'మా శాఖలు' },
    kn: { explore: 'ಅನ್ವೇಷಿಸಿ', locations: 'ಸ್ಥಳಗಳು', contact: 'ಸಂಪರ್ಕಿಸಿ', book: 'ಬುಕ್ ಮಾಡಿ', headOffice: 'ಕೇಂದ್ರ ಕಚೇರಿ', branches: 'ನಮ್ಮ ಶಾಖೆಗಳು' },
  };

  const txt = content[language] || content.en;

  return (
    <footer id={id} className="bg-slate-50 dark:bg-[#0B0F1A] text-slate-900 dark:text-slate-100 pt-28 pb-12 relative overflow-hidden border-t border-slate-200 dark:border-[#D4AF37]/20 shadow-[0_-16px_64px_rgba(0,0,0,0.05)] dark:shadow-[0_-16px_64px_rgba(0,0,0,0.7)]">
      
      {/* Soft Sunset Glow & Ambient Light Orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-bl from-[#D4AF37]/5 to-transparent blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-50" style={{ animation: 'orbFloatOne 25s infinite ease-in-out alternate' }}></div>
        <div className="absolute bottom-0 left-1/3 w-[500px] h-[500px] bg-gradient-to-tr from-slate-200/40 dark:from-[#111827]/30 via-transparent to-transparent blur-[140px] rounded-full mix-blend-multiply dark:mix-blend-screen opacity-60" style={{ animation: 'orbFloatTwo 30s infinite ease-in-out alternate-reverse' }}></div>
        {/* Subtle Luxury Linework texture */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.01)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] opacity-70"></div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10 font-sans">
        
        {/* Top Segment: Brand logo & Call to action in one premium bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center pb-16 border-b border-slate-900/5 dark:border-white/5 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 text-center md:text-left">
            <div 
              className="cursor-pointer transition-transform duration-700 hover:scale-105"
              onClick={handleLogoClick}
              title="Click 3 times for Admin Gateway"
            >
              <Logo className="w-52 h-26 sm:w-64 sm:h-32 -ml-3" isLight={true} />
            </div>
            <div className="hidden md:block h-12 w-[1px] bg-[#D4AF37]/20"></div>
            <div>
              <p className="text-[#D4AF37] font-mono text-[10px] font-bold uppercase tracking-[0.4em] mb-1">
                Heritage Signature Fleet
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-xs tracking-wider max-w-sm">
                Since 2012, conveying distinguished travelers across pristine South Indian destinations.
              </p>
            </div>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center justify-center gap-3 bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 hover:border-[#D4AF37]/40 text-slate-600 dark:text-slate-300 hover:text-[#D4AF37] dark:hover:text-[#FCF6BA] px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-bold transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)] focus:outline-none"
            aria-label="Scroll back to top gate"
          >
            Return to Top Gate
            <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform text-[#D4AF37]" />
          </button>
        </div>

        {/* Middle Segment: Comprehensive Grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 py-16">
          
          {/* Col 1: Distinctive Identity Intro (5/12 width on desktop) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse"></span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-[0.35em]">
                  Corporate Ethics Protocol
                </span>
              </div>
              <h4 className="text-2xl text-slate-900 dark:text-white font-serif italic tracking-tight">
                Crafting <span className="text-[#D4AF37]">Legendary</span> Journeys
              </h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                We represent the perfect symmetry of timeless hospitality and strict operational integrity. Every route is structured specifically to preserve promptness, exquisite ride quality, and bespoke passenger control.
              </p>
            </div>

            {/* Elite contact details inline */}
            <div className="pt-2 space-y-3 font-mono text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3 group">
                <Mail size={14} className="text-[#D4AF37]" />
                <a href="mailto:geeveetravels@outlook.com" className="hover:text-[#D4AF37] dark:hover:text-[#FCF6BA] transition-colors uppercase tracking-wider">geeveetravels@outlook.com</a>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck size={14} className="text-[#D4AF37]" />
                <span className="uppercase tracking-wider">Verified VIP Transport Provider</span>
              </div>
            </div>

            {/* Gold-toned Premium Social Handles */}
            <div className="flex gap-4 pt-4">
              {[
                { Icon: Facebook, href: "#", name: "Facebook" },
                { Icon: Twitter, href: "#", name: "Twitter" },
                { Icon: Instagram, href: "#", name: "Instagram" }
              ].map(({ Icon, href, name }, idx) => (
                <a 
                  key={idx} 
                  href={href} 
                  aria-label={name}
                  className="w-11 h-11 bg-slate-900/5 dark:bg-white/5 hover:bg-[#D4AF37]/10 rounded-xl flex items-center justify-center hover:text-[#D4AF37] dark:hover:text-[#FCF6BA] text-slate-600 dark:text-slate-300 border border-slate-950/10 dark:border-white/10 hover:border-[#D4AF37]/45 transition-all duration-500 md:hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(212,175,55,0.15)] group"
                >
                  <Icon size={18} className="md:group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Map (2/12) */}
          <div className="lg:col-span-2 space-y-6">
            <h5 className="text-[10px] font-bold font-mono text-[#D4AF37] uppercase tracking-[0.35em]">
              Directory
            </h5>
            <ul className="space-y-4 text-xs font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              <li>
                <a href="#home" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/0 group-hover:bg-[#D4AF37] group-hover:scale-150 transition-all"></span>
                  {t.nav.home}
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/0 group-hover:bg-[#D4AF37] group-hover:scale-150 transition-all"></span>
                  {t.nav.packages}
                </a>
              </li>
              <li>
                <a href="#tariff" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/0 group-hover:bg-[#D4AF37] group-hover:scale-150 transition-all"></span>
                  {t.nav.tariff}
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-3 group">
                  <span className="w-1 h-1 rounded-full bg-[#D4AF37]/0 group-hover:bg-[#D4AF37] group-hover:scale-150 transition-all"></span>
                  Reservations
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Operational nodes (2/12) */}
          <div className="lg:col-span-2 space-y-6">
             <h5 className="text-[10px] font-bold font-mono text-[#D4AF37] uppercase tracking-[0.35em]">
               {txt.locations}
             </h5>
             <div className="space-y-6">
                <div className="space-y-1.5">
                   <p className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">{txt.headOffice}</p>
                   <p className="text-xs font-serif italic text-slate-700 dark:text-slate-200">
                     Bharathi Nagar Elite, <br />Chennai, TN 603210
                   </p>
                </div>
                <div className="space-y-2.5">
                   <p className="text-[10px] font-bold text-slate-500 font-mono uppercase tracking-widest">{txt.branches}</p>
                   <div className="flex flex-wrap gap-2 pt-1">
                      {branches.map((branch, i) => (
                        <span key={i} className="text-[9px] font-bold font-mono text-slate-600 dark:text-slate-300 hover:text-[#D4AF37] bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 px-2.5 py-1 rounded transition-colors cursor-default uppercase tracking-wider">
                          {branch}
                        </span>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Col 4: Direct Wire Communications (3/12) */}
          <div className="lg:col-span-3 space-y-6">
             <h5 className="text-[10px] font-bold font-mono text-[#D4AF37] uppercase tracking-[0.35em]">
               High Priority Wire
             </h5>
             <div className="space-y-6">
                <a href={`tel:${CONTACT_NUMBER}`} className="block p-5 bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 hover:border-[#D4AF37]/35 rounded-2xl group transition-all duration-500 hover:shadow-[0_12px_32px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-xl flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37]/15 transition-all duration-500">
                         <Phone size={20} />
                      </div>
                      <div>
                         <span className="block text-[8px] font-bold text-slate-500 dark:text-slate-400 font-mono uppercase tracking-widest mb-0.5">Concierge Desk</span>
                         <p className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-[#D4AF37] dark:group-hover:text-[#FCF6BA] transition-colors font-serif italic">
                           {CONTACT_NUMBER}
                         </p>
                      </div>
                   </div>
                </a>

                <button 
                  onClick={handleBookClick}
                  className="w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:from-[#FCF6BA] hover:via-[#BF953F] hover:to-[#FCF6BA] text-[#0B0F1A] py-4 rounded-xl font-bold text-xs uppercase tracking-[0.25em] transition-all duration-500 active:scale-95 shadow-[0_10px_25px_rgba(212,175,55,0.2)] focus:outline-none hover-glow-gold luxury-click"
                >
                  {txt.book}
                </button>
             </div>
          </div>

        </div>

        {/* Global Security Sublayer, fine lines, absolute precision copyrights */}
        <div className="pt-10 mt-6 border-t border-slate-900/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] font-bold font-mono uppercase tracking-[0.45em] text-slate-500">
          <div className="flex items-center gap-4 text-center md:text-left">
             <span className="w-6 h-[1px] bg-[#D4AF37]/30 hidden sm:block"></span>
             <p className="tracking-widest">
               © 2026 SIGNATURE COLLECTION BY GEEVEE TRAVELS. ALL DATA SECURED.
             </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
            <a href="#" className="hover:text-[#D4AF37] transition-all duration-300">Privacy Protocol</a>
            <a href="#" className="hover:text-[#D4AF37] transition-all duration-300">Refund Logic</a>
            <div className="flex items-center gap-2.5">
               <span className="w-1.5 h-1.5 rounded-full bg-geevee-orange shadow-[0_0_6px_rgba(234,88,12,0.6)] animate-pulse"></span>
               <button 
                 onClick={() => {
                   window.location.hash = '#admin';
                   window.scrollTo(0, 0);
                 }} 
                 className="hover:text-geevee-orange transition-all duration-300 font-black text-[#D4AF37] border border-[#D4AF37]/20 px-3 py-1 rounded-lg bg-white/5"
               >
                 Admin Access
               </button>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
