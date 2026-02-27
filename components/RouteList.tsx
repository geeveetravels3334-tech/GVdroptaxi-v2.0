
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
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row items-baseline justify-between mb-10 gap-4 border-b border-slate-200 dark:border-white/10 pb-10">
        <div>
          <h2 className={`text-geevee-orange font-black tracking-[0.2em] uppercase mb-1 text-[10px] ${fontClass}`}>
            {language === 'ta' ? 'வழித்தடங்கள்' : 'SERVICE ROUTES'}
          </h2>
          <h3 className={`text-2xl font-black text-slate-900 dark:text-white ${fontClass}`}>
            {language === 'ta' ? 'சென்னை மற்றும் பிற முக்கிய நகரங்கள்' : 'Chennai & Major City Connections'}
          </h3>
        </div>
        
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder={language === 'ta' ? 'நகரத்தைத் தேடுங்கள்...' : 'Search cities...'} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-3 glass-card bg-white/10 dark:bg-black/20 border border-white/20 rounded-xl outline-none focus:border-geevee-orange transition-all font-bold text-xs text-slate-900 dark:text-white placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="relative glass-card p-8 rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
          {/* List */}
          {visibleDestinations.map((dest, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0 group cursor-pointer" onClick={() => window.location.href=`tel:${CONTACT_NUMBER}`}>
                <div className="flex items-center gap-3">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-50">Route {i+1}</span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-geevee-orange transition-colors">{dest}</span>
                </div>
                <div className="text-[10px] font-bold text-geevee-orange opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                    Book Now
                </div>
            </div>
          ))}
        </div>

        {hasMore && !isExpanded && (
           <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 dark:from-[#0a0a0a] to-transparent rounded-b-[2.5rem] pointer-events-none"></div>
        )}
      </div>

      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="group flex items-center gap-3 glass-card px-8 py-3 rounded-full hover:bg-white/10 border border-white/10 transition-all active:scale-95"
          >
            <span className="text-[11px] font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest group-hover:text-geevee-orange">
              {isExpanded ? 'Show Less' : 'View All Connections'}
            </span>
            <div className={`p-1 rounded-full bg-white/10 group-hover:bg-geevee-orange group-hover:text-white transition-colors ${isExpanded ? 'rotate-180' : ''}`}>
              <ChevronDown size={14} />
            </div>
          </button>
        </div>
      )}

      {filteredDestinations.length === 0 && (
        <div className="py-24 text-center">
          <MapPin size={32} className="mx-auto text-slate-400 mb-4" />
          <p className="text-xs font-black text-slate-500 uppercase tracking-widest">No matching connections found</p>
        </div>
      )}
    </div>
  );
};

export default RouteList;
