
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { Sparkles, ArrowRight, Compass, Clock, Map, ChevronDown, ChevronUp } from 'lucide-react';

interface TourPackagesSectionProps {
  onSelectPackage: (id: string) => void;
}

const TourPackagesSection: React.FC<TourPackagesSectionProps> = ({ onSelectPackage }) => {
  const { t, language, fontClass } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  
  const packagesList = t.packages.list || [];
  const packageDetails = t.packageDetails || {};
  
  const displayedPackages = isExpanded ? packagesList : packagesList.slice(0, 3);

  return (
    <section className="py-24 bg-slate-50 dark:bg-[#0a0a0a] relative overflow-hidden transition-colors duration-500">
      {/* Background Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-geevee-orange/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/50 dark:bg-white/5 backdrop-blur-md text-geevee-orange px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-6 uppercase border border-geevee-orange/20 shadow-sm">
            <Sparkles size={14} />
            {language === 'ta' ? 'சுற்றுலா திட்டங்கள்' : 'Exclusive Tour Plans'}
          </div>
          <h2 className={`text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight ${fontClass}`}>
            {t.packages.sectionTitle}
          </h2>
          <p className={`text-slate-500 dark:text-slate-400 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed ${fontClass}`}>
            {t.packages.sectionSubtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedPackages.map((pkgItem: any) => {
            const details = packageDetails[pkgItem.id];
            return (
              <div 
                key={pkgItem.id}
                className="group relative bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-white/10 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col h-full"
              >
                {/* Header Area (Gradient + Glass) */}
                <div className="h-56 bg-gradient-to-br from-slate-800 to-black relative p-8 flex flex-col justify-between overflow-hidden">
                  {/* Abstract Pattern Overlay */}
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
                  
                  <div className="absolute top-0 right-0 p-4 opacity-10 text-white transform group-hover:scale-110 transition-transform duration-700">
                    <Compass size={140} />
                  </div>
                  
                  <div className="relative z-10">
                     <h3 className={`text-2xl font-black text-white mb-3 leading-tight drop-shadow-md ${fontClass}`}>
                        {pkgItem.name}
                     </h3>
                     {details && (
                       <div className="flex flex-wrap gap-2">
                          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            <Clock size={12} className="text-geevee-orange" />
                            {details.duration}
                          </div>
                       </div>
                     )}
                  </div>
                  
                  {/* Floating Action Button Effect */}
                  <div className="absolute bottom-6 right-6 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                     <div className="bg-geevee-orange text-white p-3 rounded-full shadow-lg shadow-orange-500/30">
                       <ArrowRight size={20} />
                     </div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow bg-white dark:bg-slate-900 relative transition-colors">
                  {details && (
                     <div className="mb-8">
                        <div className="flex items-center justify-between mb-3">
                           <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Package Cost</span>
                           <div className="bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 border border-green-100 dark:border-green-500/20 px-2 py-1 rounded text-[9px] font-black uppercase tracking-wider">Best Value</div>
                        </div>
                        <div className="flex items-baseline gap-1">
                           <span className="text-3xl font-black text-slate-900 dark:text-white">{details.price}</span>
                           <span className="text-xs font-bold text-slate-400 dark:text-slate-500">/ trip</span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-3 flex items-center gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-geevee-orange"></span>
                           Includes fuel & driver batta
                        </p>
                     </div>
                  )}

                  <div className="mt-auto pt-6 border-t border-slate-50 dark:border-white/5">
                    <button 
                      onClick={() => onSelectPackage(pkgItem.id)}
                      className="w-full py-4 bg-slate-50 dark:bg-white/5 hover:bg-slate-900 dark:hover:bg-white text-slate-900 dark:text-white hover:text-white dark:hover:text-black rounded-2xl font-black text-xs uppercase tracking-[0.15em] flex items-center justify-center gap-3 transition-all duration-300 group/btn border border-slate-200 dark:border-white/10 hover:border-transparent"
                    >
                      View Itinerary
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Expand/Collapse Button */}
        {packagesList.length > 3 && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="group flex items-center gap-2 bg-white dark:bg-white/10 text-slate-900 dark:text-white px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl hover:bg-geevee-orange hover:text-white dark:hover:bg-geevee-orange transition-all duration-300 border border-slate-100 dark:border-white/10"
            >
              {isExpanded ? (
                <>
                  {t.packages.closeBtn}
                  <ChevronUp size={16} className="group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  {t.packages.exploreBtn}
                  <ChevronDown size={16} className="group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default TourPackagesSection;
