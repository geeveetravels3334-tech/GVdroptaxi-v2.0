
import React, { useState } from 'react';
import { IndianRupee, Clock, MapPin, AlertCircle, Fuel, Info, Loader2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { usePricing } from '../contexts/PricingContext.tsx';
import TariffCalculator from './TariffCalculator.tsx';

interface PricingTableProps {
  id?: string;
}

const PricingTable: React.FC<PricingTableProps> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<'local' | 'outstation' | 'calculator'>('calculator');
  const { language, t, fontClass } = useLanguage();
  const { vehicles, extraCharges, loading } = usePricing();

  if (loading) {
    return (
      <div id={id} className="container mx-auto px-4 max-w-7xl py-24 flex flex-col items-center justify-center">
        <Loader2 size={48} className="animate-spin text-[#D4AF37] mb-8" />
        <p className="text-sm font-black uppercase tracking-[0.4em] text-[#9CA3AF]">Syncing Tariff Matrix...</p>
      </div>
    );
  }

  return (
    <div id={id} className="container mx-auto px-4 max-w-7xl">
      <div className="text-center mb-12">
        <h2 className={`text-[#D4AF37] font-black tracking-[0.4em] uppercase mb-4 text-[10px] md:text-xs ${fontClass}`}>
          {language === 'ta' ? 'விலை பட்டியல்' : 'Transparent Tariff'}
        </h2>
        <h3 className={`text-4xl md:text-6xl font-black text-slate-800 dark:text-white mb-8 tracking-tight ${fontClass}`}>
          {language === 'ta' ? 'வெளிப்படையான கட்டணங்கள்' : 'Simple, Honest Pricing'}
        </h3>
        
        {/* Tab Switcher */}
        <div className="inline-flex p-1.5 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 w-full sm:w-auto overflow-x-auto hide-scrollbar backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('calculator')}
            className={`px-6 md:px-10 py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap luxury-click ${activeTab === 'calculator' ? 'bg-[#D4AF37] text-[#040812] shadow-xl font-black' : 'text-[#9CA3AF] hover:text-[#D4AF37]'}`}
          >
            {language === 'ta' ? 'கட்டண கணக்கீடு' : 'Premium Calculator'}
          </button>
          <button 
            onClick={() => setActiveTab('local')}
            className={`px-6 md:px-10 py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap luxury-click ${activeTab === 'local' ? 'bg-[#D4AF37] text-[#040812] shadow-xl font-black' : 'text-[#9CA3AF] hover:text-[#D4AF37]'}`}
          >
            {language === 'ta' ? 'உள்ளூர்' : 'Local Packages'}
          </button>
          <button 
            onClick={() => setActiveTab('outstation')}
            className={`px-6 md:px-10 py-3 rounded-xl font-bold text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 whitespace-nowrap luxury-click ${activeTab === 'outstation' ? 'bg-[#D4AF37] text-[#040812] shadow-xl font-black' : 'text-[#9CA3AF] hover:text-[#D4AF37]'}`}
          >
            {language === 'ta' ? 'வெளியூர்' : 'Outstation Tariff'}
          </button>
        </div>
      </div>

      {activeTab === 'calculator' ? (
        <div className="mb-12">
          <TariffCalculator />
        </div>
      ) : (
        <div className="overflow-x-auto glass-card rounded-[2.5rem] shadow-2xl border border-slate-200 dark:border-white/5 mb-12 transition-colors">
          {activeTab === 'local' ? (
            <table className="w-full text-left min-w-[900px]">
              <thead className="bg-[#111827] border-b border-white/10 text-center">
                <tr>
                  <th className="p-6 pl-10 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] text-left">Vehicle Class</th>
                  <th className="p-6 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] text-center">5 Hrs<br/><span className="text-[#D4AF37]/80">50 Kms</span></th>
                  <th className="p-6 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] text-center">8 Hrs<br/><span className="text-[#D4AF37]/80">80 Kms</span></th>
                  <th className="p-6 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] text-center">10 Hrs<br/><span className="text-[#D4AF37]/80">100 Kms</span></th>
                  <th className="p-6 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] text-center">12 Hrs<br/><span className="text-[#D4AF37]/80">120 Kms</span></th>
                  <th className="p-6 pr-10 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em] text-center">15 Hrs<br/><span className="text-[#D4AF37]/80">150 Kms</span></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-[#D4AF37]/5 transition-colors group">
                    <td className="p-6 pl-10">
                      <div className="flex flex-col">
                        <span className="block font-black text-slate-800 dark:text-white text-lg leading-tight group-hover:text-[#D4AF37] transition-colors">{v.name}</span>
                        <span className="text-[10px] text-[#D4AF37]/80 font-black uppercase tracking-[0.2em] mt-1">{v.type}</span>
                      </div>
                    </td>
                    {[50, 80, 100, 120, 150].map((kms) => {
                      const pkg = v.pricing.localPackages.find(p => parseInt(p.kms) === kms);
                      return (
                        <td key={kms} className="p-6 text-center">
                          {pkg ? (
                            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-xl py-2px-4 inline-block min-w-[100px] py-1.5">
                              <span className="block text-lg font-bold text-[#D4AF37]">₹{pkg.price}</span>
                            </div>
                          ) : (
                            <span className="text-slate-300 dark:text-white/20 text-2xl font-bold">·</span>
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
              <thead className="bg-[#111827] border-b border-white/10">
                <tr>
                  <th className="p-6 pl-10 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em]">Vehicle Class</th>
                  <th className="p-6 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em]">Round Trip <span className="text-[#D4AF37]/80">(Per Km)</span></th>
                  <th className="p-6 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em]">One Way <span className="text-[#D4AF37]/80">(Per Km)</span></th>
                  <th className="p-6 pr-10 text-[10px] font-black text-[#9CA3AF] uppercase tracking-[0.3em]">Driver Allowance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/5">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-[#D4AF37]/5 transition-colors group">
                    <td className="p-6 pl-10">
                      <span className="block font-black text-slate-800 dark:text-white text-lg leading-tight group-hover:text-[#D4AF37] transition-colors">{v.name}</span>
                      <span className="text-[10px] text-[#D4AF37]/80 font-black uppercase tracking-[0.2em] mt-1">{v.type}</span>
                    </td>
                    <td className="p-6">
                      <span className="text-2xl font-black text-[#D4AF37]">₹{v.pricing.outstation.roundTrip}</span>
                    </td>
                    <td className="p-6">
                      {typeof v.pricing.outstation.oneWay === 'number' ? (
                        <span className="text-2xl font-black text-slate-800 dark:text-white">₹{v.pricing.outstation.oneWay}</span>
                      ) : (
                        <span className="px-3 py-1 bg-red-500/10 text-red-400 rounded text-[10px] font-black uppercase tracking-widest border border-red-500/20">{v.pricing.outstation.oneWay}</span>
                      )}
                    </td>
                    <td className="p-6 pr-10">
                      <div className="flex items-center gap-2 text-[#D4AF37] font-black bg-[#D4AF37]/10 px-3 py-1.5 rounded-lg border border-[#D4AF37]/20 w-fit">
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
      )}

      <div className="bg-gradient-to-br from-[#0C1E38] to-[#040812] text-white p-6 md:p-12 rounded-[2.5rem] shadow-2xl mb-12 flex flex-col md:flex-row items-center gap-6 md:gap-8 border border-[#D4AF37]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="bg-white/5 p-4 rounded-2xl shadow-inner border border-white/5 backdrop-blur-md shrink-0">
          <AlertCircle size={32} className="text-[#D4AF37]" />
        </div>
        <div className="flex-grow relative z-10 text-center md:text-left">
          <h4 className={`text-xl font-black mb-3 ${fontClass}`}>Transparent Billing Promise</h4>
          <p className={`text-slate-300 dark:text-[#D1D5DB] text-sm md:text-base font-semibold leading-relaxed max-w-3xl ${fontClass}`}>
            {t.packageDisclaimer} {extraCharges?.tollPolicy || 'All tolls and parking fees are calculated as per actuals and receipts will be provided.'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            icon: <Fuel size={24} />, 
            title: "Additional Kms", 
            desc: extraCharges 
              ? `Sedan: ₹${extraCharges.additionalKm.sedan}/Km | SUV: ₹${extraCharges.additionalKm.suv}/Km.` 
              : "Sedan: ₹25/Km | SUV: ₹35/Km." 
          },
          { 
            icon: <Clock size={24} />, 
            title: "Extra Hours", 
            desc: extraCharges 
              ? `Sedan: ₹${extraCharges.extraHours.sedan}/Hr | SUV: ₹${extraCharges.extraHours.suv}/Hr.` 
              : "Sedan: ₹250/Hr | SUV: ₹350/Hr." 
          },
          { 
            icon: <MapPin size={24} />, 
            title: "Hill Charges", 
            desc: extraCharges 
              ? `Ooty/Kodaikanal: ₹${extraCharges.hillCharges.ooty} - ₹${extraCharges.hillCharges.kodai}.` 
              : "Ooty/Kodaikanal: ₹500 - ₹1000." 
          }
        ].map((item, i) => (
          <div key={i} className="glass-card p-8 rounded-2xl flex flex-col items-center text-center shadow-2xl border border-white/10 hover:border-[#D4AF37]/45 transition-all duration-300 group">
            <div className="bg-white/5 p-4 rounded-xl text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-[#040812] transition-all mb-4 border border-white/10 shadow-lg">
                {item.icon}
            </div>
            <h4 className="font-black text-white mb-2 uppercase text-[10px] tracking-[0.3em]">{item.title}</h4>
            <p className="text-xs text-[#D1D5DB] font-semibold leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingTable;
