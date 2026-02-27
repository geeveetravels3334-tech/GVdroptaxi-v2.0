
import React, { useState, useEffect } from 'react';
import { Menu, X, User, LogOut, Moon, Sun, Globe, ChevronDown, LayoutGrid, Phone } from 'lucide-react';
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
  const { language, setLanguage, t, fontClass } = useLanguage();
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  const CONTACT_NUMBER = '9025743325';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'services', label: t.nav.packages }, // This ID triggers special logic
    { id: 'fleet', label: t.nav.fleet },
    { id: 'tariff', label: t.nav.tariff },
    { id: 'reviews', label: t.nav.reviews },
  ];

  // Desktop/General Navigation Handler
  const handleNavClick = (id: string) => {
    if (id === 'services') {
        // For desktop, usually scrolls to section or opens all packages
        // Here we scroll to section
    } else {
        onSelectPackage(null);
    }
    
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-md py-3 shadow-md border-b border-slate-100 dark:border-white/5' 
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="container mx-auto px-4 md:px-8 flex items-center justify-between relative">
        {/* Logo */}
        <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavClick('home')}
        >
          <div className="relative">
             <div className="absolute inset-0 bg-geevee-orange blur-lg opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></div>
             <Logo className="w-24 h-12 md:w-32 md:h-16 relative z-10" isLight={isDarkMode || (!isScrolled && !isMenuOpen)} />
          </div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6">
                {navLinks.map((link) => (
                    <li key={link.id}>
                        <button 
                            onClick={() => handleNavClick(link.id)}
                            className={`text-xs font-bold uppercase tracking-widest hover:text-geevee-orange transition-colors ${
                                isScrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-300'
                            } ${fontClass}`}
                        >
                            {link.label}
                        </button>
                    </li>
                ))}
            </ul>

            <div className="w-px h-6 bg-slate-200 dark:bg-white/10 mx-2"></div>

            {/* Language Switcher */}
            <div className="relative group">
               <button className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                  <Globe size={14} />
                  <span>{language}</span>
                  <ChevronDown size={10} />
               </button>
               <div className="absolute top-full right-0 mt-2 w-32 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform translate-y-2 group-hover:translate-y-0">
                  {['en', 'ta', 'hi', 'te', 'kn'].map((lang) => (
                     <button
                        key={lang}
                        onClick={() => setLanguage(lang as any)}
                        className={`w-full text-left px-4 py-2 text-xs font-bold uppercase hover:bg-slate-50 dark:hover:bg-white/5 ${
                            language === lang ? 'text-geevee-orange' : 'text-slate-600 dark:text-slate-400'
                        }`}
                     >
                        {lang === 'en' ? 'English' : 
                         lang === 'ta' ? 'தமிழ்' : 
                         lang === 'hi' ? 'हिंदी' : 
                         lang === 'te' ? 'తెలుగు' : 'ಕನ್ನಡ'}
                     </button>
                  ))}
               </div>
            </div>

            {/* Dark Mode Toggle */}
            <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full transition-colors ${
                    isScrolled 
                        ? 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-300' 
                        : 'hover:bg-white/10 text-white'
                }`}
            >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* User Profile / Auth */}
            {isAuthenticated && user ? (
                <div className="relative">
                   <button 
                      onClick={() => setShowProfileMenu(!showProfileMenu)}
                      className={`flex items-center gap-3 pl-1 pr-3 py-1 rounded-full border transition-all ${
                          isScrolled 
                            ? 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5' 
                            : 'border-white/20 bg-white/10 backdrop-blur-md'
                      }`}
                   >
                      <div className="w-8 h-8 rounded-full bg-geevee-orange text-white flex items-center justify-center font-black text-xs uppercase shadow-md">
                         {user.name.charAt(0)}
                      </div>
                      <span className={`text-xs font-bold hidden xl:block ${isScrolled ? 'text-slate-900 dark:text-white' : 'text-white'}`}>
                         {user.name.split(' ')[0]}
                      </span>
                      <ChevronDown size={12} className={isScrolled ? 'text-slate-500' : 'text-white/70'} />
                   </button>

                   {showProfileMenu && (
                       <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden animate-in fade-in slide-in-from-top-2">
                          <div className="p-4 border-b border-slate-50 dark:border-white/5">
                             <p className="text-sm font-black text-slate-900 dark:text-white truncate">{user.name}</p>
                             <p className="text-[10px] text-slate-500 font-bold truncate">{user.email}</p>
                          </div>
                          <div className="p-2">
                             <button 
                               onClick={() => { onOpenProfile(); setShowProfileMenu(false); }}
                               className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-geevee-orange flex items-center gap-2 transition-colors"
                             >
                                <User size={14} /> My Profile
                             </button>
                             <button 
                               onClick={() => { onOpenMyTrips(); setShowProfileMenu(false); }}
                               className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-geevee-orange flex items-center gap-2 transition-colors"
                             >
                                <LayoutGrid size={14} /> My Trips
                             </button>
                             <button 
                               onClick={() => { logout(); setShowProfileMenu(false); }}
                               className="w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 flex items-center gap-2 transition-colors"
                             >
                                <LogOut size={14} /> Logout
                             </button>
                          </div>
                       </div>
                   )}
                </div>
            ) : (
                <button 
                    onClick={openAuthModal}
                    className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                        isScrolled 
                            ? 'bg-geevee-dark text-white hover:bg-geevee-orange' 
                            : 'bg-white text-geevee-dark hover:bg-slate-100'
                    }`}
                >
                    Login
                </button>
            )}
        </div>

        {/* Mobile Toggle Section */}
        <div className="lg:hidden flex items-center gap-3">
             <button 
              onClick={toggleDarkMode}
              className={`p-3 rounded-xl transition-colors backdrop-blur-md ${
                  isScrolled || isMenuOpen
                      ? 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300' 
                      : 'bg-white/10 text-white border border-white/10'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-3 bg-geevee-orange rounded-xl text-white border border-white/10 active:scale-90 transition-transform shadow-lg hover:bg-orange-600"
            >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown (Merged Style) */}
      <div 
        className={`absolute top-full left-0 w-full bg-white dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-white/5 shadow-2xl lg:hidden flex flex-col overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
         <div className="flex flex-col gap-6 px-8 py-8 overflow-y-auto">
            {navLinks.map((link, i) => (
                <div key={link.id} className="flex flex-col">
                    <div className="flex items-center justify-between group">
                        <button 
                            onClick={() => {
                                if (link.id === 'services') {
                                    setMobileSubmenuOpen(!mobileSubmenuOpen);
                                } else {
                                    handleNavClick(link.id);
                                }
                            }}
                            className="text-2xl font-black text-slate-900 dark:text-white text-left uppercase tracking-tight hover:text-geevee-orange transition-colors flex-grow py-2"
                            style={{ transitionDelay: `${i * 50}ms` }}
                        >
                            {link.label}
                        </button>
                        
                        {/* Dropdown Arrow for Packages */}
                        {link.id === 'services' && (
                             <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setMobileSubmenuOpen(!mobileSubmenuOpen);
                                }}
                                className={`text-slate-900 dark:text-white transition-transform duration-300 p-2 ${mobileSubmenuOpen ? 'rotate-180 text-geevee-orange' : ''}`}
                             >
                                <ChevronDown size={24} />
                             </button>
                        )}
                    </div>

                    {/* Expandable Submenu for Tour Plans */}
                    {link.id === 'services' && (
                        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${mobileSubmenuOpen ? 'max-h-[60vh] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                            <div className="flex flex-col gap-4 pl-4 border-l-2 border-slate-200 dark:border-white/10 ml-2 py-4">
                                 {/* Option to View Grid */}
                                 <button
                                    onClick={() => {
                                        onOpenAllPackages();
                                        setIsMenuOpen(false);
                                    }}
                                    className="text-left text-sm font-black text-geevee-orange uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors"
                                >
                                    View All Packages
                                </button>
                                
                                {/* List of specific packages */}
                                {t.packages.list.map((pkg: any) => (
                                    <button
                                        key={pkg.id}
                                        onClick={() => {
                                            onSelectPackage(pkg.id);
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-left text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                    >
                                        {pkg.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ))}

            <div className="h-px bg-slate-100 dark:bg-white/5 w-full my-4"></div>

            {/* Mobile Language & Auth Controls */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-3">
                    {['en', 'ta', 'hi', 'te', 'kn'].map((lang) => (
                        <button
                            key={lang}
                            onClick={() => { setLanguage(lang as any); setIsMenuOpen(false); }}
                            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                                language === lang 
                                    ? 'bg-geevee-orange text-white border-geevee-orange' 
                                    : 'bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-white/10'
                            }`}
                        >
                            {lang === 'en' ? 'ENG' : 
                             lang === 'ta' ? 'தமிழ்' : 
                             lang === 'hi' ? 'हिंदी' : 
                             lang === 'te' ? 'తెలుగు' : 'ಕನ್ನಡ'}
                        </button>
                    ))}
                </div>

                {isAuthenticated && user ? (
                    <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl border border-slate-200 dark:border-white/10 mb-8">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-geevee-orange text-white flex items-center justify-center font-black text-lg uppercase shadow-lg">
                                {user.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-slate-900 dark:text-white font-black text-lg">{user.name}</p>
                                <p className="text-slate-500 text-xs font-bold">{user.email}</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button 
                                onClick={() => { onOpenProfile(); setIsMenuOpen(false); }}
                                className="bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
                            >
                                Profile
                            </button>
                            <button 
                                onClick={() => { onOpenMyTrips(); setIsMenuOpen(false); }}
                                className="bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 text-slate-900 dark:text-white py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
                            >
                                My Trips
                            </button>
                            <button 
                                onClick={() => { logout(); setIsMenuOpen(false); }}
                                className="col-span-2 bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 text-red-500 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <button 
                        onClick={() => { openAuthModal(); setIsMenuOpen(false); }}
                        className="w-full bg-slate-900 dark:bg-white text-white dark:text-black py-5 rounded-2xl font-black text-lg uppercase tracking-widest hover:bg-geevee-orange dark:hover:bg-geevee-orange hover:text-white transition-all mb-8 shadow-xl"
                    >
                        Login / Sign Up
                    </button>
                )}
            </div>
         </div>
      </div>
    </header>
  );
};

export default Navbar;
