
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { POPULAR_ROUTES } from '../constants.tsx';

const CONTACT_NUMBER = '9025743325';

const PopularRoutes: React.FC = () => {
  const handleBook = (from: string, to: string) => {
    window.location.href = `tel:${CONTACT_NUMBER}`;
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-blue-900 dark:text-blue-400 font-bold tracking-widest uppercase mb-4">Popular Choices</h2>
          <h3 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white transition-colors">Top One-Way Routes</h3>
        </div>
        <p className="text-slate-500 dark:text-slate-400 max-w-md font-medium transition-colors">Fixed all-inclusive prices for these popular routes. No hidden driver allowances or night charges.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POPULAR_ROUTES.map((route, i) => (
          <div key={i} className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all border border-slate-100 dark:border-white/5 group">
            <div className="flex items-center justify-between mb-8">
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm text-blue-900 dark:text-blue-400 font-bold text-xs uppercase group-hover:bg-blue-900 dark:group-hover:bg-blue-600 group-hover:text-white transition-all border dark:border-white/5">
                  From
                </div>
                <span className="font-bold text-slate-900 dark:text-white mt-2 transition-colors">{route.from}</span>
              </div>
              <ArrowRight className="text-blue-900 dark:text-blue-400 opacity-30" />
              <div className="flex flex-col items-center gap-1">
                <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm text-blue-900 dark:text-blue-400 font-bold text-xs uppercase group-hover:bg-blue-900 dark:group-hover:bg-blue-600 group-hover:text-white transition-all border dark:border-white/5">
                  To
                </div>
                <span className="font-bold text-slate-900 dark:text-white mt-2 transition-colors">{route.to}</span>
              </div>
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-white/5 mb-6 transition-colors">
              <div className="text-center flex-1 border-r border-slate-100 dark:border-white/5">
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Distance</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{route.distance}</span>
              </div>
              <div className="text-center flex-1">
                <span className="block text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase">Time</span>
                <span className="font-bold text-slate-700 dark:text-slate-300">{route.duration}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="block text-xs font-bold text-slate-400 dark:text-slate-500 uppercase">Starting at</span>
                <span className="text-2xl font-black text-blue-900 dark:text-blue-400 transition-colors">₹{route.price}</span>
              </div>
              <button 
                onClick={() => handleBook(route.from, route.to)}
                className="bg-amber-400 dark:bg-geevee-orange px-6 py-3 rounded-xl font-bold text-blue-900 dark:text-white shadow-lg shadow-amber-400/20 dark:shadow-geevee-orange/20 hover:scale-105 transition-all"
              >
                Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularRoutes;
