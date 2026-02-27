
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Clock, MapPin, CheckCircle, ArrowLeft, Phone, Share2, Shield, Sparkles, Map, AlertCircle, Printer, Calendar, X } from 'lucide-react';
import { ItineraryStep } from '../translations.ts';

interface PackageViewProps {
  packageId: string;
  onBack: () => void;
}

const PackageView: React.FC<PackageViewProps> = ({ packageId, onBack }) => {
  const { t, fontClass } = useLanguage();
  const details = t.packageDetails[packageId];
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
        alert("Link copied to clipboard!");
      }
    } else {
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] pb-24 animate-in slide-in-from-right duration-500 transition-colors">
      
      {/* Hero Header with Glass Overlay */}
      <div className="h-[50vh] relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1582510003544-5243788d9d0d?q=80&w=2000&auto=format&fit=crop" 
          alt={details.title}
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />

        <div className="absolute top-0 left-0 w-full p-6 md:p-8 z-50 flex justify-between items-start">
          <button 
            onClick={onBack}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white px-5 py-2.5 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all border border-white/20 shadow-lg no-print"
          >
            <X size={16} /> Close
          </button>
          
          <div className="flex gap-3 no-print">
             <button onClick={() => window.print()} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full text-white transition-all border border-white/20"><Printer size={18} /></button>
             <button onClick={handleShare} className="p-3 bg-white/10 hover:bg-white/20 backdrop-blur-lg rounded-full text-white transition-all border border-white/20"><Share2 size={18} /></button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                   <span className="bg-geevee-orange text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">Premium Tour</span>
                   <span className="bg-black/30 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                      <Clock size={12} className="text-geevee-orange" /> {details.duration}
                   </span>
                </div>
                <h1 className={`text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2 drop-shadow-2xl ${fontClass}`}>
                  {details.title}
                </h1>
              </div>
              
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl min-w-[240px] shadow-2xl transform hover:scale-105 transition-transform">
                 <p className="text-[10px] font-bold text-white/70 uppercase tracking-widest mb-1">Total Package Cost</p>
                 <p className="text-3xl font-black text-white">{details.price}</p>
                 <p className="text-[9px] text-white/50 mt-1">*Excludes Toll & Parking</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-6xl -mt-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content: Itinerary */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-10 shadow-xl border border-slate-100 dark:border-white/10 transition-colors">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-geevee-orange"><Map size={24} /></div>
                  <h3 className={`text-2xl font-black text-slate-900 dark:text-white ${fontClass}`}>Tour Itinerary</h3>
               </div>
               
               <div className="space-y-0 relative">
                  {/* Vertical Line */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 dark:bg-white/10"></div>

                  {details.itinerary.map((step: ItineraryStep, i: number) => (
                    <div key={i} className="relative pl-14 pb-10 last:pb-0 group">
                       <div className="absolute left-0 top-0 w-10 h-10 bg-white dark:bg-slate-900 border-4 border-slate-100 dark:border-slate-800 rounded-full flex items-center justify-center text-xs font-black text-slate-400 dark:text-slate-500 shadow-md group-hover:bg-geevee-orange group-hover:text-white group-hover:border-geevee-orange transition-all z-10">
                          {i + 1}
                       </div>
                       <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-3xl group-hover:bg-white dark:group-hover:bg-white/[0.08] group-hover:shadow-lg transition-all border border-transparent group-hover:border-slate-100 dark:group-hover:border-white/10">
                          <h4 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                             <Calendar size={12} /> Day {Math.ceil((i + 1)/2)} Activity
                          </h4>
                          <p className={`text-slate-800 dark:text-slate-200 font-medium leading-relaxed text-sm md:text-base ${fontClass}`}>
                            {step.text}
                          </p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-10 shadow-xl border border-slate-100 dark:border-white/10 transition-colors">
               <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-slate-100 dark:bg-white/5 rounded-2xl text-geevee-orange"><Sparkles size={24} /></div>
                  <h3 className={`text-2xl font-black text-slate-900 dark:text-white ${fontClass}`}>Package Inclusions</h3>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {details.inclusions.map((inc: string, i: number) => (
                    <div key={i} className="flex items-center gap-4 text-sm font-bold text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-white/5 p-5 rounded-2xl border border-slate-100 dark:border-white/5 hover:border-geevee-orange/30 transition-colors">
                       <div className="bg-green-100 dark:bg-green-500/20 p-1.5 rounded-full text-green-600 dark:text-green-400 shrink-0">
                          <CheckCircle size={14} />
                       </div>
                       {inc}
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Sidebar: Booking Form */}
          <div className="lg:col-span-1 space-y-6">
             <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 shadow-xl border border-slate-100 dark:border-white/10 sticky top-24 transition-colors no-print">
                <div className="text-center mb-8">
                   <div className="w-20 h-20 bg-geevee-orange/10 dark:bg-geevee-orange/20 rounded-full flex items-center justify-center text-geevee-orange mx-auto mb-4 border border-geevee-orange/20">
                      <Phone size={36} />
                   </div>
                   <h3 className={`text-2xl font-black text-slate-900 dark:text-white mb-2 ${fontClass}`}>Ready to Book?</h3>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Customize this plan or book instantly.</p>
                </div>

                <div className="space-y-4">
                   <a 
                     href={`tel:${CONTACT_NUMBER}`}
                     className="block w-full bg-geevee-orange hover:bg-orange-600 text-white py-5 rounded-2xl font-black text-center uppercase tracking-widest shadow-xl shadow-geevee-orange/20 transition-all active:scale-95 text-sm"
                   >
                     Call Now
                   </a>
                   <a 
                     href={`https://wa.me/91${CONTACT_NUMBER}?text=I am interested in ${encodeURIComponent(details.title)}`}
                     className="block w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl font-black text-center uppercase tracking-widest shadow-xl shadow-green-500/20 transition-all active:scale-95 text-sm"
                   >
                     WhatsApp
                   </a>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/10">
                   <div className="flex items-start gap-3 bg-slate-50 dark:bg-white/5 p-4 rounded-2xl">
                      <Shield size={18} className="text-slate-400 mt-0.5" />
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                         <strong>Safe Travel Guarantee:</strong> Verified drivers, GPS tracked vehicles, and 24/7 support included.
                      </p>
                   </div>
                </div>
             </div>
             
             <div className="bg-slate-900 dark:bg-black text-white p-8 rounded-[3rem] shadow-xl no-print border dark:border-white/10">
                <div className="flex items-center gap-3 mb-4 text-geevee-orange">
                   <AlertCircle size={20} />
                   <span className="text-xs font-black uppercase tracking-widest">Important Note</span>
                </div>
                <p className={`text-xs text-slate-300 font-medium leading-relaxed ${fontClass}`}>
                   {t.packageDisclaimer}
                </p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PackageView;
