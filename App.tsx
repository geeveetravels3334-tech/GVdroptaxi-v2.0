
import React, { useState, useEffect } from 'react';
import { ChevronUp, Shield } from 'lucide-react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import BookingForm from './components/BookingForm.tsx';
import Services from './components/Services.tsx';
import PricingTable from './components/PricingTable.tsx';
import PopularRoutes from './components/PopularRoutes.tsx';
import RouteList from './components/RouteList.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import Testimonials from './components/Testimonials.tsx';
import TermsAndConditions from './components/TermsAndConditions.tsx';
import Footer from './components/Footer.tsx';
import FloatingAIButton from './components/FloatingAIButton.tsx';
import AirportTransfers from './components/AirportTransfers.tsx';
import TourPackagesSection from './components/TourPackagesSection.tsx';
import CorporateServices from './components/CorporateServices.tsx';
import PuducherrySpecial from './components/PuducherrySpecial.tsx';
import Fleet from './components/Fleet.tsx';
import PackageView from './components/PackageView.tsx';
import AdminPanel from './components/AdminPanel.tsx';
import AdminGate from './components/AdminGate.tsx';
import AuthModal from './components/AuthModal.tsx';
import UserBookings from './components/UserBookings.tsx';
import UserProfile from './components/UserProfile.tsx';
import AllPackages from './components/AllPackages.tsx';
import VerificationScreen from './components/VerificationScreen.tsx';
import Preloader from './components/Preloader.tsx';
import GoldParticles from './components/GoldParticles.tsx';
import LiveBookingNotification from './components/LiveBookingNotification.tsx';
import { ScrollReveal } from './components/ScrollReveal.tsx';
import { motion, AnimatePresence } from 'motion/react';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext.tsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';
import { PricingProvider } from './contexts/PricingContext.tsx';
import { APIProvider } from '@vis.gl/react-google-maps';

import WhatsAppBanner from './components/WhatsAppBanner.tsx';

const API_KEY =
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.GOOGLE_MAPS_PLATFORM_KEY ||
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const LiquidBackground = React.memo(() => (
  <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {/* Signature Haze Glow */}
      <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[120%] opacity-20 dark:opacity-30 transition-opacity bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent"></div>
      
      {/* Ambient Pulsing Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[#D4AF37]/5 blur-[80px] rounded-full"></div>
  </div>
));

// Memoized main content sections to prevent unnecessary re-renders on scroll/theme changes
const HomeSections = React.memo(({ onSelectPackage }: { onSelectPackage: (id: string | null) => void }) => {
  return (
    <>
      <div id="home">
        <Hero />
      </div>
      
      <div className="container mx-auto px-4 md:px-8 max-w-7xl -mt-10 lg:-mt-32 relative z-20">
        <BookingForm />
      </div>

      <section id="services">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <Services />
        </ScrollReveal>
      </section>

      <section id="packages">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <TourPackagesSection onSelectPackage={onSelectPackage} />
        </ScrollReveal>
      </section>

      <section id="why-choose-us">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <WhyChooseUs />
        </ScrollReveal>
      </section>

      <section id="fleet">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <Fleet />
        </ScrollReveal>
      </section>

      <section id="tariff">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <PricingTable id="tariff-anchor" />
        </ScrollReveal>
      </section>

      <section id="airport">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <AirportTransfers id="airport-anchor" />
        </ScrollReveal>
      </section>

      <section id="puducherry">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <PuducherrySpecial />
        </ScrollReveal>
      </section>

      <section id="routes">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <div className="max-w-7xl mx-auto">
              <PopularRoutes id="routes-anchor" />
              <RouteList />
          </div>
        </ScrollReveal>
      </section>

      <section id="corporate">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <CorporateServices />
        </ScrollReveal>
      </section>

      <section id="reviews">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <Testimonials />
        </ScrollReveal>
      </section>

      <section id="terms">
        <ScrollReveal delay={0.2} duration={0.8} direction="up">
          <TermsAndConditions id="terms-anchor" />
        </ScrollReveal>
      </section>

      <WhatsAppBanner />
    </>
  );
});

const AppContent: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isAllPackagesOpen, setIsAllPackagesOpen] = useState(false);
  
  // Auth state from context
  const { isAuthenticated, isVerified } = useAuth();
  
  // Theme State - Dual Pearl & Navy Atmosphere
  const [isDarkMode, setIsDarkMode] = useState(() => {
    try {
      const saved = localStorage.getItem('theme');
      return saved !== 'light';
    } catch {
      return true;
    }
  });

  // Security State
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [isAdminVerified, setIsAdminVerified] = useState(false);
  
  const [isUserBookingsOpen, setIsUserBookingsOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  
  // Use language hook to get the correct font family class
  const { fontClass } = useLanguage();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    let timeout: any;
    const handleScroll = () => {
      if (timeout) return;
      timeout = window.setTimeout(() => {
        setShowScrollTop(window.scrollY > 400);
        timeout = 0;
      }, 100);
    };
    
    const handleHashChange = () => {
      const isRoute = window.location.hash === '#admin';
      setIsAdminRoute(isRoute);
      if (!isRoute) {
        setIsAdminVerified(false); // Reset verification if navigating away
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);
    
    // Initial check
    if (window.location.hash === '#admin') {
      setIsAdminRoute(true);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPackage = (id: string | null) => {
    setSelectedPackageId(id);
    if (id) {
      setIsAllPackagesOpen(false); // Close list if specific package selected
      window.scrollTo(0, 0); // Scroll to top when opening a package
    }
  };

  const handleOpenAllPackages = () => {
    setSelectedPackageId(null);
    setIsAllPackagesOpen(true);
    window.scrollTo(0, 0);
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      try {
        localStorage.setItem('theme', next ? 'dark' : 'light');
        if (next) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (err) {
        console.error("Theme storage update failed", err);
      }
      return next;
    });
  };

  // Block access if user is logged in but not verified
  if (isAuthenticated && !isVerified) {
    return <VerificationScreen />;
  }

  // Admin Route Handler
  if (isAdminRoute) {
    if (!isAdminVerified) {
      return (
        <AdminGate 
          onVerified={() => setIsAdminVerified(true)} 
          onExit={() => { 
            window.location.hash = ''; 
            setIsAdminRoute(false);
          }} 
        />
      );
    }
    return (
      <AdminPanel onLogout={() => { 
        setIsAdminVerified(false);
        setIsAdminRoute(false);
        window.location.hash = ''; 
        window.scrollTo(0, 0);
      }} />
    );
  }

  // Unified rendering structure
  return (
    <div className={`min-h-screen ${fontClass || 'font-sans'} text-slate-900 dark:text-white transition-colors duration-300 relative`}>
      <Preloader />
      <LiquidBackground />
      <GoldParticles />
      
      <div className="relative z-10">
        <Navbar 
          onSelectPackage={handleSelectPackage} 
          onOpenMyTrips={() => setIsUserBookingsOpen(true)}
          onOpenProfile={() => setIsUserProfileOpen(true)}
          onOpenAllPackages={handleOpenAllPackages}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        <AnimatePresence mode="wait" initial={false}>
          {selectedPackageId ? (
            <motion.div
              key={`package-${selectedPackageId}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <PackageView packageId={selectedPackageId} onBack={() => setSelectedPackageId(null)} />
            </motion.div>
          ) : isAllPackagesOpen ? (
            <motion.div
              key="all-packages"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <AllPackages onSelectPackage={handleSelectPackage} onBack={() => setIsAllPackagesOpen(false)} />
            </motion.div>
          ) : (
            <motion.main
              key="home-main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <HomeSections onSelectPackage={handleSelectPackage} />
            </motion.main>
          )}
        </AnimatePresence>

        <Footer id="contact" />
        <FloatingAIButton />
        <LiveBookingNotification />
        <AuthModal />
        <UserBookings isOpen={isUserBookingsOpen} onClose={() => setIsUserBookingsOpen(false)} />
        <UserProfile isOpen={isUserProfileOpen} onClose={() => setIsUserProfileOpen(false)} />

        <button
          onClick={scrollToTop}
          className={`fixed bottom-24 md:bottom-10 right-6 md:right-8 p-4 bg-white/20 backdrop-blur-md border border-white/20 text-slate-900 dark:text-white rounded-2xl shadow-2xl transition-all duration-500 z-[90] hover:scale-110 active:scale-90 hover:bg-geevee-orange hover:text-white ${
            showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
          }`}
        >
          <ChevronUp size={24} />
        </button>

        {!selectedPackageId && !isAllPackagesOpen && (
          <div className="fixed bottom-8 left-8 z-[90] hidden xl:block">
            <div className="glass-card px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 transition-colors">
              <div className="bg-green-500/20 text-green-600 dark:text-green-400 p-1.5 rounded-full"><Shield size={16} /></div>
              <div>
                 <p className="text-[9px] font-black uppercase tracking-widest leading-none">Security Verified</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const App: React.FC = () => {
  if (!hasValidKey) {
    return (
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'100vh',fontFamily:'sans-serif', backgroundColor: '#040812', color: 'white'}}>
        <div style={{textAlign:'center',maxWidth:520, padding: 32, borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)'}}>
          <h2 style={{color: '#D4AF37', marginBottom: 16}}>Google Maps API Key Required</h2>
          <p><strong>Step 1:</strong> <a href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" target="_blank" rel="noopener" style={{color: '#D4AF37'}}>Get an API Key</a></p>
          <p><strong>Step 2:</strong> Add your key as a secret in AI Studio:</p>
          <ul style={{textAlign:'left',lineHeight:'1.8'}}>
            <li>Open <strong>Settings</strong> (⚙️ gear icon, <strong>top-right corner</strong>)</li>
            <li>Select <strong>Secrets</strong></li>
            <li>Type <code>GOOGLE_MAPS_PLATFORM_KEY</code> as the secret name, press <strong>Enter</strong></li>
            <li>Paste your API key as the value, press <strong>Enter</strong></li>
          </ul>
          <p style={{marginTop: 16}}>The app rebuilds automatically after you add the secret.</p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <AuthProvider>
        <PricingProvider>
          <LanguageProvider>
            <AppContent />
          </LanguageProvider>
        </PricingProvider>
      </AuthProvider>
    </APIProvider>
  );
};

export default App;
