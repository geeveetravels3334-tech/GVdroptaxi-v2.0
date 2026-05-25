
import React from 'react';
import { MapPin, Sparkles, Phone, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { DESTINATION_IMAGES } from '../constants.tsx';
import OptimizedImage from './OptimizedImage.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';
const WHATSAPP_NUMBER = '9025743325';

const PuducherrySpecial: React.FC = () => {
  const { language, fontClass } = useLanguage();

  const handleWhatsApp = () => {
    const msg = `*Featured Route Booking: Chennai to Puducherry*\nI saw the special ₹2499 offer on your website and would like to book a trip.`;
    window.open(`https://wa.me/91${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="container mx-auto px-4 max-w-7xl py-20 md:py-32 relative">
      {/* Cinematic Soft Gold Lighting Backlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="relative glass-card rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_45px_135px_rgba(0,0,0,0.65)] border border-white/10 hover:border-[#D4AF37]/35 bg-gradient-to-b from-[#0C1E38]/85 via-[#040812]/95 to-[#040812] backdrop-blur-3xl min-h-[600px] flex flex-col lg:flex-row transition-all duration-1000 group premium-hover-lift z-10">
        
        {/* Visual Side */}
        <div className="lg:w-1/2 relative h-80 lg:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-slate-950/40 mix-blend-multiply z-10"></div>
          <OptimizedImage 
            src={DESTINATION_IMAGES['pondicherry']} 
            alt="Puducherry French Quarter" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4s] ease-out md:group-hover:scale-110 opacity-75 group-hover:opacity-95"
            containerClassName="absolute inset-0 bg-[#040812]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040812] via-[#040812]/20 to-transparent z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent opacity-80 mix-blend-color-dodge z-10 animate-slow-pulse"></div>
          
          <div className="absolute bottom-12 left-12 z-20">
            <div className="bg-white/5 backdrop-blur-md border border-[#D4AF37]/30 px-6 py-2 rounded-full inline-flex items-center gap-3 mb-6 shadow-xl">
              <Sparkles className="text-[#D4AF37] animate-slow-pulse" size={14} />
              <span className="text-[10px] font-bold text-[#FCF6BA] uppercase tracking-[0.25em]">Iconic Coastal Route</span>
            </div>
            <h4 className="text-[#FCF6BA] text-4xl md:text-5xl font-serif italic tracking-tight mb-2">Chennai ↔ Puducherry</h4>
            <p className="text-[#D4AF37] text-[10px] font-black tracking-[0.45em] uppercase leading-none mt-2">The French Connection</p>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative">
          <div className="mb-12 text-center lg:text-left">
            <h2 className={`text-[#D4AF37] font-black tracking-[0.5em] uppercase mb-6 text-[10px] ${fontClass}`}>
              {language === 'ta' ? 'சிறப்பு சலுகை' : 'Signature Experience'}
            </h2>
            <h3 className={`text-4xl md:text-6xl font-normal text-white mb-8 leading-tight tracking-tight ${fontClass}`} style={{ fontFamily: 'var(--font-serif)' }}>
              {language === 'en' ? (
                <>Experience The <span className="text-[#D4AF37] italic font-normal">French Riviera</span> Of India</>
              ) : (
                <>இந்தியாவின் <span className="text-[#D4AF37] italic font-normal">பிரஞ்சு ரிவியரா</span> பயணம்</>
              )}
            </h3>
            <p className="text-[#D1D5DB] font-medium text-lg leading-relaxed max-w-xl">
              Escape to the coastal charm of Pondicherry with our premier point-to-point luxury service. Enjoy custom interiors, premium climate configuration, and expert steering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all duration-700 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm">
                  <MapPin size={20} />
                </div>
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-none">Doorstep Pickup</span>
              </div>
              <p className="font-bold text-white text-lg tracking-tight uppercase">Anywhere in Chennai</p>
            </div>

            <div className="bg-white/5 border border-white/5 p-8 rounded-2xl hover:border-[#D4AF37]/30 transition-all duration-700 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37] border border-[#D4AF37]/20 shadow-sm">
                  <MapPin size={20} />
                </div>
                <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest leading-none">Arrival Point</span>
              </div>
              <p className="font-bold text-white text-lg tracking-tight uppercase">Anywhere in Puducherry</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-10 border-t border-white/10 pt-12">
            <div className="text-center sm:text-left">
              <span className="block text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-2 leading-none">Curated Fixed Fare</span>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl md:text-6xl font-serif text-[#FCF6BA] tracking-tighter">₹2499</span>
                <span className="text-[11px] font-bold px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] border border-[#D4AF37]/20 rounded-lg uppercase tracking-widest">All-Inclusive</span>
              </div>
            </div>

            <div className="flex gap-4 w-full sm:w-auto">
              <button 
                onClick={handleWhatsApp} 
                className="flex-1 sm:flex-none bg-[#25D366] hover:bg-[#128C7E] text-white px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-xl active:scale-95 text-[10px] uppercase tracking-widest"
              >
                <MessageSquare size={16} />
                WhatsApp
              </button>
              <button 
                onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`} 
                className="flex-1 sm:flex-none premium-glass-btn-solid px-8 py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-500 shadow-xl active:scale-95 text-[10px] uppercase tracking-widest"
              >
                <Phone size={16} />
                Secure Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuducherrySpecial;
