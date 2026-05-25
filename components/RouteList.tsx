
import React, { useState } from 'react';
import { ALL_DESTINATIONS } from '../constants.tsx';
import { Search, MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const CONTACT_NUMBER = '9025743325';
const INITIAL_VISIBLE_COUNT = 10;

const RouteList: React.FC = () => {
  const { language, fontClass } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const filteredDestinations = ALL_DESTINATIONS.filter(dest => 
    dest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visibleDestinations = isExpanded 
    ? filteredDestinations 
    : filteredDestinations.slice(0, INITIAL_VISIBLE_COUNT);

  const hasMore = filteredDestinations.length > INITIAL_VISIBLE_COUNT;

  return (
    <div className="container mx-auto px-4 py-20 md:py-32 max-w-5xl">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-8 border-b border-slate-200 dark:border-white/10 pb-12">
        <div>
          <h2 className={`text-geevee-orange font-bold tracking-[0.3em] uppercase mb-3 text-[10px] ${fontClass}`}>
            {language === 'ta' ? 'வழித்தடங்கள்' : 'Strategic Network'}
          </h2>
          <h3 className={`text-4xl font-bold text-slate-900 dark:text-white tracking-tight ${fontClass}`}>
            {language === 'ta' ? 'சென்னை மற்றும் பிற முக்கிய நகரங்கள்' : 'Chennai & Major City Hubs'}
          </h3>
        </div>
        
        <div className="relative w-full md:w-72">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder={language === 'ta' ? 'நகரத்தைத் தேடுங்கள்...' : 'Find your destination...'} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 rounded-2xl outline-none focus:border-geevee-orange transition-all font-bold text-sm text-slate-900 dark:text-white placeholder:text-slate-400 shadow-sm"
          />
        </div>
      </div>

      <div className="relative bg-white dark:bg-white/[0.02] p-10 md:p-16 rounded-[2.5rem] md:rounded-[3.5rem] border border-slate-200 dark:border-white/5 backdrop-blur-md shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
          {/* List */}
          {visibleDestinations.map((dest, i) => (
            <div key={i} className="flex items-center justify-between py-5 border-b border-slate-100 dark:border-white/[0.03] last:border-0 group cursor-pointer hover:translate-x-2 transition-transform" onClick={() => window.location.href=`tel:${CONTACT_NUMBER}`}>
                <div className="flex items-center gap-5">
                    <span className="text-[10px] font-bold text-slate-300 dark:text-slate-600 uppercase tracking-widest">#{i+1}</span>
                    <span className="text-lg font-bold text-slate-700 dark:text-slate-300 group-hover:text-geevee-orange transition-colors tracking-tight">{dest}</span>
                </div>
                <div className="text-[10px] font-bold text-geevee-orange opacity-0 group-hover:opacity-100 transition-all uppercase tracking-[0.2em] translate-x-4 group-hover:translate-x-0">
                    Book Now
                </div>
            </div>
          ))}
        </div>

        {hasMore && !isExpanded && (
           <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white dark:from-slate-900 to-transparent rounded-b-[3.5rem] pointer-events-none"></div>
        )}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-4 premium-glass-btn-solid px-10 py-4 rounded-full transition-all active:scale-95 shadow-xl"
          >
            <span className="text-[11px] font-bold uppercase tracking-widest">
              {isExpanded ? 'Collapse List' : 'View Full Connectivity'}
            </span>
            <div className={`p-1.5 rounded-full bg-white/10 dark:bg-white/20 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={16} />
            </div>
          </button>
        </div>
      )}

      {filteredDestinations.length === 0 && (
        <div className="py-32 text-center">
          <div className="w-20 h-20 bg-slate-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
            <MapPin size={32} className="text-slate-300" />
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching connections established</p>
        </div>
      )}
    </div>
  );
};

export default RouteList;
