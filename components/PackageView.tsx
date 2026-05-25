
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { DESTINATION_IMAGES, DEFAULT_DESTINATION_IMAGE } from '../constants.tsx';
import OptimizedImage from './OptimizedImage.tsx';
import { Clock, MapPin, CheckCircle, ArrowLeft, Phone, Share2, Shield, Sparkles, Map, AlertCircle, Printer, Calendar, X, MessageCircle } from 'lucide-react';
import { ItineraryStep } from '../translations.ts';

interface PackageViewProps {
  packageId: string;
  onBack: () => void;
}

const PackageView: React.FC<PackageViewProps> = ({ packageId, onBack }) => {
  const { t, fontClass } = useLanguage();
  const details = (t.packageDetails as any)[packageId];
  const CONTACT_NUMBER = '9025743325';

  if (!details) return <div className="text-center p-20 text-white">Package Not Found</div>;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const url = window.location.href.startsWith('http') ? window.location.href : 'https://tamilnadutaxitours.com';
        await navigator.share({
          title: details.title,
          text: `Check out this tour package: ${details.title}`,
          url: url
        });
      } catch (err) { 
        console.error("Share failed", err); 
      }
    }
  };

  return (
    <div className="min-h-screen bg-transparent pb-32 animate-in slide-in-from-right duration-700 transition-colors relative">
      {/* Cinematic Lighting for Package View */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden mix-blend-plus-lighter dark:mix-blend-screen opacity-50">
        <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/15 to-transparent dark:from-[#D4AF37]/10 dark:to-transparent rounded-full blur-[140px] mix-blend-multiply dark:mix-blend-screen animate-pulse-soft"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-bl from-[#111827]/10 to-transparent dark:from-[#0B0F1A]/30 dark:to-transparent rounded-full blur-[160px] mix-blend-multiply dark:mix-blend-screen animation-delay-2000"></div>
      </div>
      
      {/* Hero Header with Glass Overlay */}
      <div className="h-[45vh] md:h-[65vh] relative overflow-hidden bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/50 to-transparent z-10"></div>
        <OptimizedImage 
          src={DESTINATION_IMAGES[packageId] || DEFAULT_DESTINATION_IMAGE} 
          alt={details.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          containerClassName="absolute inset-0 bg-slate-900"
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 z-20"></div>

        <div className="absolute top-0 left-0 w-full p-6 md:p-12 z-50 flex justify-between items-start">
          <button 
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-6 md:px-8 py-3 rounded-2xl font-bold text-[10px] md:text-[11px] uppercase tracking-[0.2em] flex items-center gap-3 transition-all border border-white/20 shadow-2xl no-print active:scale-95"
          >
            <ArrowLeft size={16} /> Back
          </button>
          
          <div className="flex gap-3 md:gap-4 no-print">
             <button onClick={() => window.print()} className="p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl text-white transition-all border border-white/20 shadow-2xl"><Printer size={20} /></button>
             <button onClick={handleShare} className="p-3 md:p-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl rounded-2xl text-white transition-all border border-white/20 shadow-2xl"><Share2 size={20} /></button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-20 z-20">
          <div className="container mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 md:mb-6">
                 <span className="bg-luxury-gold text-[#0B0F1A] px-4 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl">Elite Package</span>
                 <span className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-4 py-1.5 md:py-2 rounded-xl text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 md:gap-3">
                    <MapPin size={14} className="text-luxury-gold-soft" /> {details.distance || 'Premium Sightseeing'}
                 </span>
              </div>
              <h1 className={`text-4xl md:text-7xl lg:text-8xl font-bold text-white leading-none tracking-tighter mb-4 md:mb-6 drop-shadow-2xl ${fontClass}`}>
                {details.title}
              </h1>
              {details.description && (
                <p className="text-sm md:text-xl text-white/80 font-medium leading-relaxed max-w-2xl drop-shadow-md">
                  {details.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl -mt-8 md:-mt-12 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8 md:space-y-12">
            
            {/* Tariff & Package Highlights */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glass-card p-8 rounded-3xl border-[#D4AF37]/20">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500">
                       <Shield size={24} />
                    </div>
                    <div className="text-right">
                      <div className="text-[10px] font-black text-[#9CA3AF] uppercase tracking-widest">Base Rate</div>
                      <div className="text-2xl font-black text-slate-900 dark:text-white">₹13 <span className="text-sm">/ KM</span></div>
                    </div>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Standard Package</h4>
                  <p className="text-slate-500 dark:text-[#D1D5DB] text-sm mb-6 leading-relaxed">Estimated for WagonR / Etios category vehicles.</p>
                  
                  <div className="space-y-4 mb-8">
                     <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-sm text-slate-500 dark:text-[#9CA3AF]">Total KM (approx)</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{details.distance}</span>
                     </div>
                     <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-white/5">
                        <span className="text-sm text-slate-500 dark:text-[#9CA3AF]">Included KM</span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{details.kmsIncluded}</span>
                     </div>
                     <div className="flex justify-between items-center pt-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">Package Total</span>
                        <span className="text-2xl font-black text-luxury-gold">{details.price}</span>
                     </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-white/5 rounded-2xl p-4">
                     <div className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest mb-3">Optional Add-ons</div>
                     <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-600 dark:text-white shadow-sm border border-slate-200 dark:border-white/10">SUV +₹5/KM</span>
                        <span className="px-3 py-1 bg-white dark:bg-slate-800 rounded-lg text-[10px] font-bold text-slate-600 dark:text-white shadow-sm border border-slate-200 dark:border-white/10">Innova +₹8/KM</span>
                     </div>
                  </div>
               </div>

               <div className="bg-slate-900 dark:bg-[#111827] p-8 rounded-3xl border border-slate-800 dark:border-[#D4AF37]/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 bg-luxury-gold text-[#0B0F1A] text-[9px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl z-10">Charges Info</div>
                  <h4 className="text-xl font-bold text-white mb-6">Extra Charges Grid</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                       <div className="p-2 bg-[#D4AF37]/20 rounded-xl text-luxury-gold"><CheckCircle size={18} /></div>
                       <div>
                          <p className="text-xs font-bold text-white">Driver Bata</p>
                          <p className="text-[10px] text-[#9CA3AF]">{details.driverBatta === 'Extra' ? 'Day bata applicable as per trip' : details.driverBatta}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                       <div className="p-2 bg-blue-500/20 rounded-xl text-blue-400"><CheckCircle size={18} /></div>
                       <div>
                          <p className="text-xs font-bold text-white">Toll & Parking</p>
                          <p className="text-[10px] text-[#9CA3AF]">Paid as per actual usage on road</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                       <div className="p-2 bg-purple-500/20 rounded-xl text-purple-400"><CheckCircle size={18} /></div>
                       <div>
                          <p className="text-xs font-bold text-white">State Permit</p>
                          <p className="text-[10px] text-[#9CA3AF]">If crossing state borders</p>
                       </div>
                    </div>
                    {packageId === 'yercaud' || packageId === 'hogenakkal' ? (
                       <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                          <div className="p-2 bg-amber-500/20 rounded-xl text-amber-400"><CheckCircle size={18} /></div>
                          <div>
                             <p className="text-xs font-bold text-white">Hills Charges</p>
                             <p className="text-[10px] text-slate-400">Extra for hill road driving</p>
                          </div>
                       </div>
                    ) : null}
                  </div>
               </div>
            </div>

            {/* Travel Itinerary Sections (From Details) */}
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-[#D4AF37]/20">
               <div className="flex items-center gap-5 mb-10">
                  <div className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl text-luxury-gold"><MapPin size={24} /></div>
                  <div>
                    <h3 className="text-sm font-bold text-[#9CA3AF] uppercase tracking-widest mb-1">{details.duration}</h3>
                    <h2 className={`text-2xl md:text-3xl font-bold text-slate-900 dark:text-white ${fontClass}`}>Travel Itinerary</h2>
                  </div>
               </div>
               
               <div className="space-y-0 relative">
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100 dark:bg-white/5"></div>
                  {details.itinerary.map((step: ItineraryStep, i: number) => (
                    <div key={i} className="relative pl-12 pb-10 last:pb-0 group">
                       <div className="absolute left-0 top-0 w-10 h-10 bg-white dark:bg-[#111827] border-4 border-slate-50 dark:border-slate-800 rounded-xl flex items-center justify-center text-xs font-black text-[#9CA3AF] shadow-md group-hover:bg-luxury-gold group-hover:text-[#0B0F1A] group-hover:border-luxury-gold/20 transition-all z-10">
                          {i + 1}
                       </div>
                       <div className="bg-slate-50 dark:bg-white/5 p-6 md:p-8 rounded-2xl border border-transparent shadow-sm hover:shadow-md transition-all">
                          <p className={`text-slate-800 dark:text-[#D1D5DB] font-bold leading-relaxed text-sm md:text-base ${fontClass}`}>
                            {step.text}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Inclusions */}
            <div className="glass-card rounded-[2.5rem] p-8 md:p-12 border-[#D4AF37]/20">
               <div className="flex items-center gap-5 mb-10">
                  <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-2xl text-green-500"><Sparkles size={24} /></div>
                  <h3 className={`text-2xl md:text-3xl font-bold text-slate-900 dark:text-white ${fontClass}`}>Premium Inclusions</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.inclusions.map((inc: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5">
                       <CheckCircle size={18} className="text-green-500 shrink-0" />
                       {inc}
                    </div>
                  ))}
               </div>
            </div>

            {/* Logistics & Vehicles */}
            <div className="bg-[#111827] rounded-[2.5rem] p-8 md:p-12 shadow-2xl border border-[#D4AF37]/25 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><Shield size={160} className="text-white" /></div>
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                 <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><MapPin className="text-luxury-gold-soft"/> Pickup & Drop</h3>
                    <ul className="space-y-4">
                       <li className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">A</div>
                         <p className="text-sm text-[#D1D5DB]">Customized pickup from your Home, Hotel, Airport, or Railway Station.</p>
                       </li>
                       <li className="flex items-start gap-4">
                         <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white text-[10px] font-bold shrink-0 mt-0.5">B</div>
                         <p className="text-sm text-[#D1D5DB]">Flexible drop points matching your departure requirements.</p>
                       </li>
                    </ul>
                 </div>
                 <div>
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3"><AlertCircle className="text-luxury-gold-soft"/> Vehicle Options</h3>
                    <div className="space-y-3">
                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                         <div>
                           <div className="text-sm font-bold text-white">Mini Category</div>
                           <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">WagonR / Similar • 4 Seats</div>
                         </div>
                         <div className="text-white font-bold">₹13/KM</div>
                       </div>
                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                         <div>
                           <div className="text-sm font-bold text-white">Sedan Class</div>
                           <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Etios / Dzire • 4 Seats</div>
                         </div>
                         <div className="text-white font-bold">₹14/KM</div>
                       </div>
                       <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                         <div>
                           <div className="text-sm font-bold text-white">Premium SUV</div>
                           <div className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Innova / Crysta • 6 Seats</div>
                         </div>
                         <div className="text-white font-bold">₹22/KM</div>
                       </div>
                    </div>
                 </div>
               </div>
            </div>

          </div>

          {/* Sidebar: Booking Form */}
          <div className="lg:col-span-1 space-y-6">
             <div className="glass-card rounded-[2.5rem] p-8 shadow-xl sticky top-24 transition-colors no-print border-[#D4AF37]/20">
                <div className="text-center mb-10">
                   <div className="w-20 h-20 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center text-luxury-gold-soft mx-auto mb-6 shadow-sm rotate-6 border border-[#D4AF37]/20">
                      <Phone size={32} />
                   </div>
                   <h3 className={`text-2xl font-bold text-slate-900 dark:text-white mb-2 ${fontClass}`}>Quick Reservation</h3>
                   <p className="text-xs text-slate-500 dark:text-[#D1D5DB] font-medium tracking-tight">Direct booking line for {details.title}</p>
                </div>

                <div className="space-y-4">
                   <a 
                     href={`https://wa.me/91${CONTACT_NUMBER}?text=Special Booking Inquiry: ${encodeURIComponent(details.title)}. Estimated Fare: ${details.price}. Please confirm availability.`}
                     className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20BE5C] text-white py-5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-green-500/20 transition-all active:scale-95"
                   >
                     <MessageCircle size={20} /> Chat on WhatsApp
                   </a>
                   <a 
                     href={`tel:${CONTACT_NUMBER}`}
                     className="flex items-center justify-center gap-3 w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 py-5 rounded-2xl font-bold text-xs uppercase tracking-widest shadow-lg transition-all active:scale-95 border border-white/5"
                   >
                     <Phone size={18} /> Priority Call: {CONTACT_NUMBER}
                   </a>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5">
                   <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                      <h5 className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-3">Booking Summary</h5>
                      <div className="space-y-2">
                        <div className="flex justify-between text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                          <span>Base Fare</span>
                          <span className="font-bold text-slate-900 dark:text-white">{details.price}</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                          <span>Driver Bata</span>
                          <span className="font-bold text-slate-900 dark:text-white">{details.driverBatta}</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-dashed border-slate-200 dark:border-white/10 flex justify-between items-center text-xs font-bold text-slate-900 dark:text-white">
                          <span>Est. Total</span>
                          <span className="text-lg text-luxury-gold">{details.price}*</span>
                        </div>
                        <p className="text-[9px] text-[#9CA3AF] italic mt-2 leading-tight">*Excludes Toll, Permit & Parking. Final fare based on actual KM.</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="glass-card p-8 rounded-[2.5rem] no-print border-[#D4AF37]/20">
                <div className="flex items-center gap-3 mb-4 text-slate-500 dark:text-[#9CA3AF]">
                   <AlertCircle size={20} className="text-luxury-gold-soft" />
                   <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Package Policy</span>
                </div>
                <p className={`text-[11px] text-slate-500 dark:text-[#D1D5DB] leading-relaxed ${fontClass}`}>
                   {t.packageDisclaimer} We maintain transparent billing for all extra charges like tolls and parking fees.
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageView;
