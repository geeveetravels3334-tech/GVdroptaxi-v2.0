
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
import { LanguageProvider, useLanguage } from './contexts/LanguageContext.tsx';
import { AuthProvider, useAuth } from './contexts/AuthContext.tsx';

const AppContent: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [isAllPackagesOpen, setIsAllPackagesOpen] = useState(false);
  
  // Auth state from context
  const { isAuthenticated, isVerified } = useAuth();
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
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
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
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

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

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

  // Background Component - The Liquid Gradient
  const LiquidBackground = () => (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* Base Color */}
        <div className="absolute inset-0 bg-[#f8fafc] dark:bg-[#050505] transition-colors duration-500"></div>
        
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-400/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob"></div>
        <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-cyan-400/30 dark:bg-cyan-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-400/30 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute top-[40%] left-[40%] w-96 h-96 bg-geevee-orange/20 dark:bg-orange-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-60 animate-pulse-soft"></div>

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
    </div>
  );

  // Unified rendering structure
  return (
    <div className={`min-h-screen ${fontClass || 'font-sans'} text-slate-900 dark:text-white transition-colors duration-500 relative`}>
      <LiquidBackground />
      
      <div className="relative z-10">
        <Navbar 
          onSelectPackage={handleSelectPackage} 
          onOpenMyTrips={() => setIsUserBookingsOpen(true)}
          onOpenProfile={() => setIsUserProfileOpen(true)}
          onOpenAllPackages={handleOpenAllPackages}
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        
        {selectedPackageId ? (
          <PackageView packageId={selectedPackageId} onBack={() => setSelectedPackageId(null)} />
        ) : isAllPackagesOpen ? (
          <AllPackages onSelectPackage={handleSelectPackage} onBack={() => setIsAllPackagesOpen(false)} />
        ) : (
          <main id="home">
            <Hero />
            
            <div className="container mx-auto px-4 md:px-8 max-w-[1500px] -mt-10 lg:-mt-32 relative z-20">
              <BookingForm />
            </div>

            <section id="services" className="py-12 md:py-24">
              <Services />
            </section>

            <section id="fleet" className="pb-12 md:pb-24">
              <Fleet />
            </section>

            <section id="airport" className="py-12 md:py-24">
              <AirportTransfers />
            </section>

            <section id="packages" className="py-12 md:py-24">
              <TourPackagesSection onSelectPackage={handleSelectPackage} />
            </section>

            <section className="py-12 md:py-24">
              <PuducherrySpecial />
            </section>

            <section id="tariff" className="py-12 md:py-24">
              <PricingTable />
            </section>

            <section className="py-12 md:py-24">
              <CorporateServices />
            </section>

            <section id="routes" className="py-12 md:py-24">
              <PopularRoutes />
            </section>

            <section id="why-choose-us" className="py-12 md:py-24">
              <WhyChooseUs />
            </section>

            <section id="terms-anchor" className="py-12 md:py-24">
              <TermsAndConditions />
            </section>

            <section className="py-12 md:py-24">
              <RouteList />
            </section>

            <section id="reviews" className="py-12 md:py-24">
              <Testimonials />
            </section>
          </main>
        )}

        <Footer />
        <FloatingAIButton />
        <AuthModal />
        <UserBookings isOpen={isUserBookingsOpen} onClose={() => setIsUserBookingsOpen(false)} />
        <UserProfile isOpen={isUserProfileOpen} onClose={() => setIsUserProfileOpen(false)} />

        <button
          onClick={scrollToTop}
          className={`fixed bottom-10 right-8 p-4 bg-white/20 backdrop-blur-md border border-white/20 text-slate-900 dark:text-white rounded-2xl shadow-2xl transition-all duration-500 z-[90] hover:scale-110 active:scale-90 hover:bg-geevee-orange hover:text-white ${
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

const App: React.FC = () => (
  <AuthProvider>
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  </AuthProvider>
);

export default App;
