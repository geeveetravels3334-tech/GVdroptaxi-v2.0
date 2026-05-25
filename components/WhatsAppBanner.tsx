
import React from 'react';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';
const WHATSAPP_URL = `https://wa.me/91${CONTACT_NUMBER}?text=${encodeURIComponent("Hi GVDROPTAXI, I'd like to book a ride.")}`;

const WhatsAppBanner: React.FC = () => {
    const { fontClass } = useLanguage();
    
    return (
        <section className="py-20 md:py-32 container mx-auto px-6 max-w-7xl">
        <div className="bg-[#25D366] rounded-[2.5rem] md:rounded-[4rem] p-12 md:p-24 relative overflow-hidden shadow-[0_40px_120px_-20px_rgba(37,211,102,0.3)] group border border-white/10">
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-1000 pointer-events-none">
                <MessageSquare size={400} />
            </div>
            
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                <div className="text-center lg:text-left max-w-2xl">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md rounded-full px-5 py-1.5 text-[10px] font-bold text-white uppercase tracking-[0.2em] mb-8 border border-white/20 shadow-sm">
                        Hyper-Fast Booking
                    </div>
                    <h2 className={`text-4xl md:text-7xl font-black text-white mb-6 leading-none tracking-tight ${fontClass}`}>
                        Instant WhatsApp Reservations
                    </h2>
                    <p className="text-white/80 text-lg md:text-2xl font-medium tracking-tight">
                        Experience concierge-level support with zero waiting time and transparent flat-rate pricing.
                    </p>
                </div>
                
                <a 
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full lg:w-auto premium-glass-btn-solid px-12 py-6 rounded-2xl font-black text-xs md:text-base uppercase tracking-[0.2em] flex items-center justify-center gap-4 active:scale-95 shadow-2xl group/btn text-[#040812]"
                >
                    Initiate Chat <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform text-[#040812]" />
                </a>
            </div>
            
            {/* Elegant lighting effect */}
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-[80px] pointer-events-none"></div>
        </div>
    </section>
    );
};

export default WhatsAppBanner;
