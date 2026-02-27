
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Clock, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Star } from 'lucide-react';

interface AllPackagesProps {
  onSelectPackage: (id: string) => void;
  onBack: () => void;
}

const PACKAGE_IMAGES: Record<string, string> = {
  velankanni: "https://images.unsplash.com/photo-1543743560-6101c4475453?q=80&w=1000&auto=format&fit=crop",
  tiruvannamalai: "https://images.unsplash.com/photo-1619837504398-8e62d9406003?q=80&w=1000&auto=format&fit=crop",
  arupadaiveedu: "https://images.unsplash.com/photo-1582510003544-5243788d9d0d?q=80&w=1000&auto=format&fit=crop",
  panchabhoota: "https://images.unsplash.com/photo-1620121693356-9a2da38290c4?q=80&w=1000&auto=format&fit=crop",
  kanchipuram: "https://images.unsplash.com/photo-1627894483216-2138af692e32?q=80&w=1000&auto=format&fit=crop",
  mahabalipuram: "https://images.unsplash.com/photo-1590050752117-238cb0fb9d4d?q=80&w=1000&auto=format&fit=crop",
  tirupati: "https://images.unsplash.com/photo-1643270438332-9b2478330761?q=80&w=1000&auto=format&fit=crop",
  pondicherry: "https://images.unsplash.com/photo-1582512390196-80948f070669?q=80&w=1000&auto=format&fit=crop"
};

const AllPackages: React.FC<AllPackagesProps> = ({ onSelectPackage, onBack }) => {
  const { t, language, fontClass } = useLanguage();
  const packagesList = t.packages.list || [];
  const packageDetails = t.packageDetails || {};

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] animate-in fade-in duration-500 transition-colors">
      {/* Header Hero */}
      <div className="bg-geevee-dark text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-geevee-orange/20 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <button 
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest group bg-white/5 w-fit px-4 py-2 rounded-full border border-white/5"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-geevee-orange text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-6 uppercase shadow-lg">
              <Sparkles size={14} />
              {language === 'ta' ? 'அனைத்து தொகுப்புகள்' : 'Premium Collections'}
            </div>
            <h1 className={`text-4xl md:text-6xl font-black mb-6 leading-tight ${fontClass}`}>
              {t.packages.sectionTitle}
            </h1>
            <p className={`text-slate-400 text-lg md:text-xl font-medium max-w-2xl leading-relaxed ${fontClass}`}>
              {t.packages.sectionSubtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-4 -mt-16 pb-24 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {packagesList.map((pkgItem: any) => {
            const details = packageDetails[pkgItem.id];
            const image = PACKAGE_IMAGES[pkgItem.id] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1000&auto=format&fit=crop";
            
            return (
              <div 
                key={pkgItem.id}
                className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-white/10 overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col md:flex-row h-auto md:min-h-[340px]"
              >
                {/* Image Section */}
                <div className="w-full md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <img 
                    src={image} 
                    alt={pkgItem.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:bg-gradient-to-r"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 md:hidden">
                     {details && (
                       <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-white text-[10px] font-bold flex items-center gap-1">
                          <Clock size={12} /> {details.duration}
                       </div>
                     )}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                       <h3 className={`text-2xl font-black text-slate-900 dark:text-white leading-tight ${fontClass}`}>
                          {pkgItem.name}
                       </h3>
                       {details && (
                         <div className="hidden md:flex bg-slate-50 dark:bg-white/5 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide items-center gap-1 shrink-0 border border-slate-200 dark:border-white/10">
                            <Clock size={12} /> {details.duration}
                         </div>
                       )}
                    </div>

                    {details && (
                      <>
                        <div className="flex items-center gap-2 mb-6">
                           <div className="flex gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={12} className="text-amber-400 fill-amber-400" />
                              ))}
                           </div>
                           <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Top Rated</span>
                        </div>

                        <ul className="space-y-3 mb-8">
                          {details.itinerary.slice(0, 2).map((step: any, idx: number) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-400 font-medium">
                              <CheckCircle size={16} className="text-geevee-orange shrink-0 mt-0.5" />
                              <span className="line-clamp-2">{step.text}</span>
                            </li>
                          ))}
                          {details.itinerary.length > 2 && (
                             <li className="text-[10px] font-bold text-slate-400 dark:text-slate-500 pl-7 uppercase tracking-wider">
                                + {details.itinerary.length - 2} more stops
                             </li>
                          )}
                        </ul>
                      </>
                    )}
                  </div>

                  <div className="flex items-end justify-between pt-6 border-t border-slate-50 dark:border-white/10">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Starting From</p>
                       <p className="text-2xl font-black text-geevee-orange">{details ? details.price.replace('Starts at ', '') : 'Contact'}</p>
                    </div>
                    <button 
                      onClick={() => onSelectPackage(pkgItem.id)}
                      className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-geevee-orange dark:hover:bg-geevee-orange hover:text-white dark:hover:text-white transition-all flex items-center gap-2 group/btn shadow-lg"
                    >
                      View Details
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AllPackages;
