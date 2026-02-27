
import React, { useState } from 'react';
import { DETAILED_VEHICLES } from '../constants.tsx';
import { IndianRupee, Clock, MapPin, AlertCircle, Fuel, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';

const PricingTable: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'outstation'>('local');
  const { language, t, fontClass } = useLanguage();

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className={`text-geevee-orange font-black tracking-[0.3em] uppercase mb-4 text-xs ${fontClass}`}>
          {language === 'ta' ? 'விலை பட்டியல்' : 'Transparent Tariff'}
        </h2>
        <h3 className={`text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 ${fontClass}`}>
          {language === 'ta' ? 'வெளிப்படையான கட்டணங்கள்' : 'Simple, Honest Pricing'}
        </h3>
        
        {/* Glassmorphic Tab Switcher */}
        <div className="inline-flex p-1.5 glass-card rounded-2xl shadow-inner border border-slate-200 dark:border-white/10 transition-colors backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('local')}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase transition-all duration-300 ${activeTab === 'local' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            {language === 'ta' ? 'உள்ளூர்' : 'Local Packages'}
          </button>
          <button 
            onClick={() => setActiveTab('outstation')}
            className={`px-8 py-3 rounded-xl font-black text-xs uppercase transition-all duration-300 ${activeTab === 'outstation' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-lg scale-105' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'}`}
          >
            {language === 'ta' ? 'வெளியூர்' : 'Outstation Tariff'}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto glass-card rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-white/10 mb-12 transition-colors">
        {activeTab === 'local' ? (
          <table className="w-full text-left min-w-[900px]">
            <thead className="bg-white/40 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
              <tr>
                <th className="p-6 pl-10 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Vehicle Class</th>
                <th className="p-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">5 Hrs<br/><span className="opacity-50">50 Kms</span></th>
                <th className="p-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">8 Hrs<br/><span className="opacity-50">80 Kms</span></th>
                <th className="p-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">10 Hrs<br/><span className="opacity-50">100 Kms</span></th>
                <th className="p-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">12 Hrs<br/><span className="opacity-50">120 Kms</span></th>
                <th className="p-6 pr-10 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] text-center">15 Hrs<br/><span className="opacity-50">150 Kms</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {DETAILED_VEHICLES.map((v) => (
                <tr key={v.id} className="hover:bg-white/40 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 pl-10">
                    <div className="flex flex-col">
                      <span className="block font-black text-slate-900 dark:text-white text-lg leading-tight group-hover:text-geevee-orange transition-colors">{v.name}</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{v.type}</span>
                    </div>
                  </td>
                  {[50, 80, 100, 120, 150].map((kms) => {
                    const pkg = v.pricing.localPackages.find(p => parseInt(p.kms) === kms);
                    return (
                      <td key={kms} className="p-6 text-center">
                        {pkg ? (
                          <div className="bg-white/40 dark:bg-white/5 border border-slate-100 dark:border-white/5 rounded-xl py-2 px-3 inline-block min-w-[90px]">
                            <span className="block text-lg font-black text-slate-900 dark:text-white">₹{pkg.price}</span>
                          </div>
                        ) : (
                          <span className="text-slate-200 dark:text-slate-800 text-2xl font-black">·</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left min-w-[700px]">
            <thead className="bg-white/40 dark:bg-white/5 border-b border-slate-100 dark:border-white/10">
              <tr>
                <th className="p-6 pl-10 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Vehicle Class</th>
                <th className="p-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Round Trip <span className="opacity-50">(Per Km)</span></th>
                <th className="p-6 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">One Way <span className="opacity-50">(Per Km)</span></th>
                <th className="p-6 pr-10 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Driver Allowance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5">
              {DETAILED_VEHICLES.map((v) => (
                <tr key={v.id} className="hover:bg-white/40 dark:hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6 pl-10">
                    <span className="block font-black text-slate-900 dark:text-white text-lg leading-tight group-hover:text-geevee-orange transition-colors">{v.name}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest mt-1">{v.type}</span>
                  </td>
                  <td className="p-6">
                    <span className="text-2xl font-black text-slate-900 dark:text-white">₹{v.pricing.outstation.roundTrip}</span>
                  </td>
                  <td className="p-6">
                    {typeof v.pricing.outstation.oneWay === 'number' ? (
                      <span className="text-2xl font-black text-slate-900 dark:text-white">₹{v.pricing.outstation.oneWay}</span>
                    ) : (
                      <span className="px-3 py-1 bg-red-50 dark:bg-red-500/10 text-red-500 rounded text-[10px] font-black uppercase tracking-widest border border-red-100 dark:border-red-500/20">{v.pricing.outstation.oneWay}</span>
                    )}
                  </td>
                  <td className="p-6 pr-10">
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-bold bg-amber-50 dark:bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-100 dark:border-amber-500/20 w-fit">
                      <IndianRupee size={14} />
                      {v.pricing.outstation.driverBatta} / day
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-black text-white p-8 rounded-[2rem] shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-8 border border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-geevee-orange/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="bg-white/10 p-4 rounded-2xl shadow-inner border border-white/10 backdrop-blur-md">
          <AlertCircle size={32} className="text-geevee-orange" />
        </div>
        <div className="flex-grow relative z-10 text-center md:text-left">
          <h4 className={`text-xl font-black mb-2 ${fontClass}`}>Transparent Billing Promise</h4>
          <p className={`text-slate-400 text-sm font-medium leading-relaxed ${fontClass}`}>
            {t.packageDisclaimer} We believe in zero hidden charges. All tolls and parking fees are calculated as per actuals and receipts will be provided.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <Fuel size={24} />, title: "Additional Kms", desc: "Sedan: ₹25/Km | SUV: ₹35/Km." },
          { icon: <Clock size={24} />, title: "Extra Hours", desc: "Sedan: ₹250/Hr | SUV: ₹350/Hr." },
          { icon: <MapPin size={24} />, title: "Hill Charges", desc: "Ooty/Kodaikanal: ₹500 - ₹1000." }
        ].map((item, i) => (
          <div key={i} className="glass-card p-6 rounded-[2rem] flex flex-col items-center text-center shadow-lg hover:shadow-xl hover:border-geevee-orange dark:hover:border-geevee-orange transition-all duration-300 group">
            <div className="bg-white/40 dark:bg-white/5 p-4 rounded-2xl text-slate-400 group-hover:text-white group-hover:bg-geevee-orange transition-all mb-4 shadow-inner">
                {React.cloneElement(item.icon as React.ReactElement, { size: 24 })}
            </div>
            <h4 className="font-black text-slate-900 dark:text-white mb-2 uppercase text-xs tracking-widest">{item.title}</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
