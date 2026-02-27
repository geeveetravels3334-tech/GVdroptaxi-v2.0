
import React from 'react';
import { MapPin, Sparkles, Phone, MessageSquare } from 'lucide-react';
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
    <div className="container mx-auto px-4">
      <div className="relative glass-card bg-black/40 rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 min-h-[500px] flex flex-col lg:flex-row transition-colors backdrop-blur-xl group">
        
        {/* Visual Side */}
        <div className="lg:w-1/2 relative h-64 lg:h-auto overflow-hidden">
          <div className="absolute inset-0 bg-slate-900/50 mix-blend-multiply z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1582512390196-80948f070669?q=80&w=1200&auto=format&fit=crop" 
            alt="Puducherry French Quarter" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>
          
          <div className="absolute bottom-8 left-8 z-20">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-2xl inline-flex items-center gap-2 mb-4 shadow-lg">
              <Sparkles className="text-amber-400" size={16} />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">Top Rated Getaway</span>
            </div>
            <h4 className="text-white text-3xl font-black drop-shadow-lg">Chennai ↔ Puducherry</h4>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:w-1/2 p-8 md:p-16 flex flex-col justify-center text-white relative">
          <div className="mb-10">
            <h2 className={`text-geevee-orange font-black tracking-[0.3em] uppercase mb-4 text-sm ${fontClass}`}>
              {language === 'ta' ? 'சிறப்பு சலுகை' : 'Featured Route'}
            </h2>
            <h3 className={`text-4xl md:text-5xl font-black mb-6 leading-tight ${fontClass}`}>
              {language === 'en' ? (
                <>Experience The <span className="text-geevee-orange">French Riviera</span> Of The East</>
              ) : (
                <>கிழக்கின் <span className="text-geevee-orange">பிரஞ்சு ரிவியரா</span> பயணத்தை அனுபவியுங்கள்</>
              )}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-geevee-orange rounded-lg text-white">
                  <MapPin size={16} />
                </div>
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Pickup</span>
              </div>
              <p className="font-bold text-sm">Anywhere in Chennai</p>
            </div>

            <div className="bg-white/5 border border-white/10 p-5 rounded-[1.5rem] hover:bg-white/10 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500 rounded-lg text-white">
                  <MapPin size={16} />
                </div>
                <span className="text-[10px] font-black text-white/50 uppercase tracking-widest">Drop</span>
              </div>
              <p className="font-bold text-sm">Anywhere in Puducherry</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center sm:text-left">
              <span className="block text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1">Total Fare</span>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-white">₹2499</span>
                <span className="text-sm font-bold text-geevee-orange">ALL-IN</span>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={handleWhatsApp} className="bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                <MessageSquare size={18} />
                WhatsApp
              </button>
              <button onClick={() => window.location.href = `tel:${CONTACT_NUMBER}`} className="bg-white text-black hover:bg-slate-200 px-6 py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95">
                <Phone size={18} />
                Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PuducherrySpecial;
