
import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Crown, Globe, ChevronDown, LayoutGrid, Sun, Moon } from 'lucide-react';
import Logo from './Logo.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';

interface NavbarProps {
  onSelectPackage: (id: string | null) => void;
  onOpenMyTrips: () => void;
  onOpenProfile: () => void;
  onOpenAllPackages: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onSelectPackage, 
  onOpenMyTrips, 
  onOpenProfile,
  onOpenAllPackages, 
  isDarkMode, 
  toggleDarkMode 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileSubmenuOpen, setMobileSubmenuOpen] = useState(false);
  const { language, setLanguage, t, fontClass, availableLanguages } = useLanguage();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'tariff', label: 'Tariff' },
    { id: 'packages', label: 'Packages' },
    { id: 'fleet', label: 'Fleet' },
    { id: 'contact', label: 'Contact' },
  ];

  // Desktop/General Navigation Handler
  const handleNavClick = (id: string) => {
    // If we are currently viewing a package or all packages, we need to go back home first
    onSelectPackage(null);
    
    // Smooth scroll to section
    // We use a small timeout to ensure App component has time to render the sections if they were hidden
    setTimeout(() => {
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          const offset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
      }
    }, 100);
    
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ease-out pointer-events-none ${
        isScrolled || isMenuOpen ? 'p-3 md:p-4' : 'p-4 md:p-6'
      }`}
    >
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-500 pointer-events-auto z-[-1] ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      <nav 
        className={`mx-auto container max-w-7xl relative pointer-events-auto transition-all duration-500 ease-out bg-white/95 dark:bg-[#0B0F1A]/92 backdrop-blur-2xl border border-slate-200 dark:border-[#D4AF37]/25 rounded-[1.5rem] md:rounded-[2.5rem] px-5 md:px-8 flex items-center justify-between shadow-2xl ${
          isScrolled ? 'py-2 md:py-3 border-[#D4AF37]/50 ring-1 ring-[#D4AF37]/20 shadow-[#D4AF37]/5' : 'py-3 md:py-5'
        }`}
      >
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-3 rounded-xl transition-all active:scale-95 z-30 bg-slate-100 dark:bg-white/5 text-[#D4AF37] border border-slate-200 dark:border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#040812]"
        >
          {isMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
        </button>

        {/* Logo - Start */}
        <div 
          className="flex items-center cursor-pointer group z-20 shrink-0" 
          onClick={() => handleNavClick('home')}
        >
          <div className="relative transform-gpu">
             <div className="absolute -inset-4 bg-[#D4AF37] blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity rounded-full duration-700"></div>
             <Logo className={`transition-all duration-500 group-hover:scale-105 ${
               isScrolled || isMenuOpen ? 'w-24 h-6 md:w-36 md:h-9' : 'w-28 h-8 md:w-48 md:h-12'
             }`} isLight={isDarkMode} />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden lg:flex items-center flex-grow justify-center gap-6">
          <ul className="flex items-center gap-6 xl:gap-10">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button 
                  onClick={() => handleNavClick(link.id)}
                  className={`text-[10px] xl:text-[11px] font-black uppercase tracking-[0.3em] text-slate-700 dark:text-slate-200 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-all relative group/link py-1 ${fontClass}`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)] transition-all duration-500 group-hover/link:w-full rounded-full"></span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 lg:gap-4 justify-end">
          <div className="hidden lg:block w-px h-8 bg-slate-900/10 dark:bg-white/10 opacity-30"></div>

           {/* Language / Theme / Profile Toggle Wrapper */}
          <div className="flex items-center gap-2 lg:gap-3">
            {/* Desktop Language Switcher - Compact Dropdown Style */}
            <div className="hidden lg:block relative group/lang">
               <button className="flex items-center gap-2 bg-slate-100 dark:bg-white/5 px-4 py-2.5 rounded-2xl border border-slate-200 dark:border-white/10 text-[9px] font-black uppercase tracking-widest text-[#D4AF37] hover:bg-slate-200 dark:hover:bg-white/10 transition-all">
                  <Globe size={14} />
                  {language === 'en' ? 'English' : language === 'ta' ? 'தமிழ்' : language === 'hi' ? 'हिंदी' : language === 'te' ? 'తెలుగు' : 'ಕನ್ನಡ'}
                  <ChevronDown size={12} className="group-hover/lang:rotate-180 transition-transform" />
               </button>
               
               <div className="absolute top-full right-0 mt-3 w-44 bg-white dark:bg-[#040812] border border-slate-200 dark:border-[#D4AF37]/30 rounded-2xl shadow-2xl overflow-hidden opacity-0 invisible group-hover/lang:opacity-100 group-hover/lang:visible transition-all duration-300 transform translate-y-2 group-hover/lang:translate-y-0 z-50">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={`w-full px-6 py-4 text-left text-[10px] font-bold uppercase tracking-widest transition-all hover:bg-[#D4AF37] hover:text-[#040812] ${
                        language === lang.code ? 'bg-[#D4AF37]/10 text-[#D4AF37]' : 'text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {lang.nativeName}
                    </button>
                  ))}
               </div>
            </div>

            {/* Desktop Theme Switcher Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden lg:flex items-center justify-center p-3 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:text-[#D4AF37] dark:hover:text-[#D4AF37] backdrop-blur-md transition-all active:scale-95 cursor-pointer shadow-sm hover:border-[#D4AF37]/35 luxury-click group/theme"
              title={isDarkMode ? "Celestial Pearl light mode" : "Ancestral Navy dark mode"}
            >
              <div className="icon-hover-rotate transition-transform duration-500">
                {isDarkMode ? <Sun size={14} /> : <Moon size={14} />}
              </div>
            </button>

            {/* Premium Book Now Button */}
            <button 
              onClick={() => handleNavClick('home')}
              className="hidden sm:flex items-center gap-2 bg-[#D4AF37] hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-[#040812] text-[#040812] px-5 xl:px-6 py-3 rounded-2xl font-black text-[10px] xl:text-[11px] uppercase tracking-[0.2em] transition-all duration-500 shadow-lg hover:shadow-[#D4AF37]/40 active:scale-95 luxury-click"
            >
              Book Now
            </button>

            <div 
              className="p-3 rounded-2xl border border-[#D4AF37]/35 bg-[#D4AF37]/5 text-[#D4AF37] backdrop-blur-md animate-slow-pulse shadow-sm flex items-center justify-center shrink-0"
              title="GeeVee Travels Signature Elite Standard"
            >
              <Crown size={20} />
            </div>

            {isAuthenticated && user ? (
              <div className="relative z-[150]">
                 <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-[1.25rem] border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-white/5 backdrop-blur-md shadow-sm active:scale-95 transition-all outline-none"
                 >
                    <div className="w-10 h-10 rounded-xl bg-[#D4AF37] text-[#040812] flex items-center justify-center font-black text-sm uppercase shadow-2xl transform transition-all group-hover/profile:rotate-12 group-hover/profile:scale-110">
                       {user.name.charAt(0)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden xl:block text-slate-800 dark:text-white">
                       {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown size={14} className={`text-slate-800/55 dark:text-white/50 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`} />
                 </button>

                 {/* Click outside overlay */}
                 {showProfileMenu && (
                   <div className="fixed inset-0 z-40" onClick={() => setShowProfileMenu(false)}></div>
                 )}

                 <div className={`absolute top-full right-0 mt-4 w-72 bg-white dark:bg-[#040812] backdrop-blur-3xl rounded-[2rem] shadow-2xl border border-slate-200 dark:border-[#D4AF37]/30 overflow-hidden transition-all duration-300 transform z-[160] origin-top-right ${showProfileMenu ? 'opacity-100 visible scale-100 translate-y-0' : 'opacity-0 invisible scale-95 translate-y-4'}`}>
                    <div className="p-8 border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-gradient-to-br dark:from-white/[0.02] dark:to-transparent">
                       <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] mb-2 opacity-70">Authenticated User</p>
                       <p className="text-xl font-black truncate tracking-tighter text-slate-900 dark:text-white">{user.name}</p>
                    </div>
                    <div className="p-4 space-y-1">
                       <button onClick={() => { onOpenProfile(); setShowProfileMenu(false); }} className="w-full text-left px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#D4AF37] flex items-center gap-4 transition-all">
                          <div className="p-2.5 bg-slate-900/5 dark:bg-white/5 rounded-xl"><User size={16} /></div>
                          Dashboard
                       </button>
                       <button onClick={() => { onOpenMyTrips(); setShowProfileMenu(false); }} className="w-full text-left px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-[#D4AF37] flex items-center gap-4 transition-all">
                          <div className="p-2.5 bg-slate-900/5 dark:bg-white/5 rounded-xl"><LayoutGrid size={16} /></div>
                          My Trips
                       </button>
                       <div className="my-3 h-px bg-slate-200 dark:bg-white/10 mx-6"></div>
                       <button onClick={() => { logout(); setShowProfileMenu(false); }} className="w-full text-left px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] text-red-500 hover:bg-red-500/10 flex items-center gap-4 transition-all">
                          <div className="p-2.5 bg-red-500/10 rounded-xl"><LogOut size={16} /></div>
                          Logout
                       </button>
                    </div>
                 </div>
              </div>
            ) : (
                <button 
                    onClick={openAuthModal}
                    className="px-5 lg:px-7 py-3 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-[0.98] border border-slate-200 dark:border-[#D4AF37]/30 text-slate-600 dark:text-[#D4AF37] hover:bg-slate-100 dark:hover:bg-[#D4AF37]/5 transition-all transition-all duration-300 luxury-click"
                >
                    Sign In
                </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Improved Drawer Style) */}
      <div 
        className={`absolute top-[calc(100%+0.5rem)] left-0 w-full bg-white dark:bg-[#0B0F1A] backdrop-blur-2xl border border-slate-200 dark:border-[#D4AF37]/25 rounded-[2.5rem] shadow-[0_32px_128px_rgba(0,0,0,0.1)] lg:hidden flex flex-col overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
          isMenuOpen ? 'max-h-[90vh] opacity-100 translate-y-0 scale-100' : 'max-h-0 opacity-0 -translate-y-10 scale-95 pointer-events-none'
        }`}
      >
         <div className="flex flex-col gap-6 px-8 py-10 overflow-y-auto">
            {navLinks.map((link, i) => (
                <div key={link.id} className="flex flex-col">
                    <div className="flex items-center justify-between group">
                        <button 
                            onClick={() => handleNavClick(link.id)}
                            className="text-2xl font-black text-slate-800 dark:text-white text-left uppercase tracking-tight hover:text-[#D4AF37] dark:hover:text-luxury-gold-soft transition-all flex-grow py-3"
                            style={{ transitionDelay: `${i * 40}ms` }}
                        >
                            {link.label}
                        </button>
                        
                        {link.id === 'packages' && (
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMobileSubmenuOpen(!mobileSubmenuOpen);
                                }}
                                className={`text-slate-400 dark:text-white/40 transition-transform duration-500 p-2 ${mobileSubmenuOpen ? 'rotate-180 text-[#D4AF37] dark:text-[#D4AF37]' : ''}`}
                             >
                                <ChevronDown size={28} />
                             </button>
                        )}
                    </div>

                    {/* Expandable Submenu for Tour Plans */}
                    {link.id === 'packages' && (
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileSubmenuOpen ? 'max-h-[60vh] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#D4AF37]/20 ml-2 py-4">
                                 <button
                                    onClick={() => {
                                        onOpenAllPackages();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-left text-xs font-black text-[#D4AF37] uppercase tracking-[0.2em] hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    View All Packages
                                </button>
                                
                                {t.packages.list.slice(0, 5).map((pkg: any) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => {
                                            onSelectPackage(pkg.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-left text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-[#D4AF37] transition-colors"
                                    >
                                        {pkg.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="h-px bg-slate-200 dark:bg-white/10 w-full my-6"></div>

            {/* Mobile Actions: Language & Theme */}
            <div className="grid grid-cols-2 gap-4">
                {/* Theme Toggle */}
                <button
                  onClick={() => { toggleDarkMode(); }}
                  className="flex items-center justify-between gap-3 px-6 py-5 rounded-2xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] text-slate-700 dark:text-slate-200"
                >
                   <span className="text-[10px] font-black uppercase tracking-widest">{isDarkMode ? 'Pearl' : 'Navy'}</span>
                   {isDarkMode ? <Sun size={18} className="text-[#D4AF37]" /> : <Moon size={18} className="text-[#D4AF37]" />}
                </button>

                {/* Language Switcher */}
                <div className="flex bg-slate-100 dark:bg-white/10 p-1 rounded-2xl border border-slate-200 dark:border-white/10 overflow-x-auto no-scrollbar">
                   {availableLanguages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code as any)}
                        className={`flex-none py-4 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                          language === lang.code ? 'bg-[#D4AF37] text-[#040812]' : 'text-slate-500'
                        }`}
                      >
                        {lang.code === 'en' ? 'ENG' : lang.nativeName}
                      </button>
                   ))}
                </div>
            </div>

            {!isAuthenticated ? (
               <button 
                  onClick={() => { openAuthModal(); setIsMenuOpen(false); }}
                  className="w-full bg-[#D4AF37] text-[#040812] py-5 rounded-2xl font-black text-sm uppercase tracking-[0.3em] active:scale-95 transition-all shadow-xl shadow-[#D4AF37]/25"
               >
                  Verify Access
               </button>
            ) : (
               <div className="flex flex-col gap-3">
                  <button onClick={() => { onOpenProfile(); setIsMenuOpen(false); }} className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white font-bold text-xs uppercase tracking-widest">Dashboard Account</button>
                  <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full p-4 rounded-2xl border border-red-500/20 text-red-500 font-bold text-xs uppercase tracking-widest bg-red-500/5">Terminate Session</button>
               </div>
            )}
         </div>
      </div>
    </header>
  );
};

export default Navbar;
