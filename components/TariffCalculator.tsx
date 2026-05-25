import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  IndianRupee, 
  MapPin, 
  Navigation, 
  Calculator, 
  Fuel, 
  Clock, 
  Crown, 
  HelpCircle, 
  CheckCircle2, 
  ChevronRight, 
  Sparkles,
  Compass,
  Plane
} from 'lucide-react';
import { usePricing } from '../contexts/PricingContext.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

// Preset scenic premium routes with pre-calculated distances
const PRESET_ROUTES = [
  { from: 'Chennai', to: 'Pondicherry', distance: 165 },
  { from: 'Chennai', to: 'Ooty', distance: 560, hasHills: true },
  { from: 'Chennai', to: 'Kodaikanal', distance: 520, hasHills: true },
  { from: 'Chennai', to: 'Madurai', distance: 460 },
  { from: 'Chennai', to: 'Velankanni', distance: 315 },
  { from: 'Chennai', to: 'Tirupati', distance: 135, hasPermit: true },
  { from: 'Chennai', to: 'Bangalore', distance: 350, hasPermit: true },
  { from: 'Pondicherry', to: 'Chennai', distance: 165 },
];

const TariffCalculator: React.FC = () => {
  const { language, t, fontClass } = useLanguage();
  const { vehicles, extraCharges, loading } = usePricing();

  // Selected Service Type & Configuration
  const [tripType, setTripType] = useState<'local' | 'oneway' | 'roundtrip'>('oneway');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>('');
  
  // Locations & Distances
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [customDistance, setCustomDistance] = useState<number>(150);
  const [daysCount, setDaysCount] = useState<number>(1);
  const [localPackageKms, setLocalPackageKms] = useState<number>(100); // 50, 80, 100, 120, 150

  // Optional Overrides / Perks
  const [includeDriverBatta, setIncludeDriverBatta] = useState(true);
  const [includeTolls, setIncludeTolls] = useState(false);
  const [includeStatePermit, setIncludeStatePermit] = useState(false);
  const [includeHillsCharge, setIncludeHillsCharge] = useState(false);

  // Suggested drop destinations
  const [showPickupSuggestions, setShowPickupSuggestions] = useState(false);
  const [showDropSuggestions, setShowDropSuggestions] = useState(false);

  const WHATSAPP_NUMBER = '9025743325';

  const POPULAR_CITIES = [
    'Chennai', 'Bangalore', 'Madurai', 'Kochi', 'Tirupati', 
    'Coimbatore', 'Pondicherry', 'Hyderabad', 'Mysore', 'Trichy',
    'Salem', 'Vellore', 'Tanjore', 'Mahabalipuram', 'Tambaram', 'Koyambedu'
  ];

  const handlePickupChange = (val: string) => {
    setPickup(val);
    setShowPickupSuggestions(true);
  };

  const handleDropChange = (val: string) => {
    setDrop(val);
    setShowDropSuggestions(true);
  };

  const selectSuggestion = (val: string, type: 'pickup' | 'drop') => {
    if (type === 'pickup') {
      setPickup(val);
      setShowPickupSuggestions(false);
    } else {
      setDrop(val);
      setShowDropSuggestions(false);
    }
  };

  const filteredPickupSuggestions = POPULAR_CITIES.filter(c => c.toLowerCase().includes(pickup.toLowerCase().trim()));
  const filteredDropSuggestions = POPULAR_CITIES.filter(c => c.toLowerCase().includes(drop.toLowerCase().trim()));

  // Set default vehicle when loaded
  useEffect(() => {
    if (vehicles && vehicles.length > 0 && !selectedVehicleId) {
      setSelectedVehicleId(vehicles[1]?.id || vehicles[0]?.id);
    }
  }, [vehicles, selectedVehicleId]);

  // Handle preset route selection
  const handleSelectPresetRoute = (route: typeof PRESET_ROUTES[0]) => {
    setPickup(route.from);
    setDrop(route.to);
    setCustomDistance(route.distance);
    if (route.hasHills) {
      setIncludeHillsCharge(true);
    } else {
      setIncludeHillsCharge(false);
    }
    if (route.hasPermit) {
      setIncludeStatePermit(true);
    } else {
      setIncludeStatePermit(false);
    }
    setShowPickupSuggestions(false);
    setShowDropSuggestions(false);
  };

  const selectedVehicle = vehicles.find(v => v.id === selectedVehicleId) || vehicles[0];

  // Helper values
  const isSedan = selectedVehicle?.type?.toLowerCase().includes('sedan') || selectedVehicle?.type?.toLowerCase().includes('mini');
  const baseRatePerKm = selectedVehicle
    ? (tripType === 'oneway' 
        ? (typeof selectedVehicle.pricing?.outstation?.oneWay === 'number' 
            ? selectedVehicle.pricing.outstation.oneWay 
            : selectedVehicle.pricing.outstation.roundTrip) 
        : selectedVehicle.pricing?.outstation?.roundTrip || selectedVehicle.pricePerKm)
    : 15;

  const currentDriverBattaRate = selectedVehicle?.pricing?.outstation?.driverBatta || 500;

  // Real-time calculated costs
  const calculateCosts = () => {
    if (!selectedVehicle) {
      return {
        baseFare: 0,
        driverBattaTotal: 0,
        tollEstimate: 0,
        permitTotal: 0,
        hillsTotal: 0,
        grandTotal: 0,
        distanceToBill: 0,
      };
    }

    let baseFare = 0;
    let distanceToBill = customDistance;

    // 1. Calculations by Trip Type
    if (tripType === 'local') {
      // Find matching local package kms
      const localPackage = selectedVehicle.pricing?.localPackages?.find(
        (p) => parseInt(p.kms) === localPackageKms
      ) || selectedVehicle.pricing?.localPackages?.[0];

      baseFare = localPackage ? localPackage.price : (localPackageKms * 20);
      distanceToBill = localPackageKms;
    } else if (tripType === 'roundtrip') {
      // Outstation Round Trip has a standard minimum distance of 250 KM per day
      const minDistanceForDays = daysCount * 250;
      distanceToBill = Math.max(customDistance * 2, minDistanceForDays); // Round trip implies 2x distance, or standard min.
      baseFare = distanceToBill * baseRatePerKm;
    } else {
      // Outstation One Way
      baseFare = customDistance * baseRatePerKm;
      distanceToBill = customDistance;
    }

    // 2. Chauffeur Allowance (Driver Batta)
    let driverBattaTotal = 0;
    if (includeDriverBatta) {
      if (tripType === 'local') {
        // Local package standard half-day batta or small portion
        driverBattaTotal = Math.round(currentDriverBattaRate * 0.5);
      } else {
        driverBattaTotal = currentDriverBattaRate * daysCount;
      }
    }

    // 3. Toll Fees (Auto calculation option)
    let tollEstimate = 0;
    if (includeTolls) {
      // average toll gates in TN: ~₹100 per 70 Kms
      tollEstimate = Math.ceil(distanceToBill / 70) * 85;
    }

    // 4. State Permits
    let permitTotal = 0;
    if (includeStatePermit) {
      // State permits across state lines (Karnataka, Andhra Pradesh, Pondicherry)
      permitTotal = isSedan 
        ? (extraCharges?.additionalKm?.sedan ? 900 : 800) 
        : (extraCharges?.additionalKm?.suv ? 1300 : 1200);
    }

    // 5. Hills Surcharge
    let hillsTotal = 0;
    if (includeHillsCharge) {
      // Hill pass climbing fees
      hillsTotal = isSedan
        ? (extraCharges?.hillCharges?.ooty || 600)
        : (extraCharges?.hillCharges?.kodai || 1000);
    }

    // 6. Grand total
    const grandTotal = baseFare + driverBattaTotal + tollEstimate + permitTotal + hillsTotal;

    return {
      baseFare: Math.round(baseFare),
      driverBattaTotal: Math.round(driverBattaTotal),
      tollEstimate: Math.round(tollEstimate),
      permitTotal: Math.round(permitTotal),
      hillsTotal: Math.round(hillsTotal),
      grandTotal: Math.round(grandTotal),
      distanceToBill,
    };
  };

  const costs = calculateCosts();

  return (
    <div className="p-4 md:p-8 xl:p-12 text-slate-900 dark:text-white bg-gradient-to-b from-slate-50 to-white dark:from-[#111827] dark:to-[#0B0F1A] rounded-[2.5rem] border border-slate-200 dark:border-white/[0.04] shadow-xl dark:shadow-none">
      {/* Banner introduction with metallic header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-white/5">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
            <Crown size={18} className="animate-pulse" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] font-mono">Dynamic AI Fare Matrix</span>
          </div>
          <h4 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Premium Tariff Estimator
          </h4>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/5 dark:bg-white/5 border border-slate-950/10 dark:border-white/10 px-4 py-2.5 rounded-2xl backdrop-blur-md">
          <Calculator className="text-[#D4AF37] w-5 h-5 animate-bounce" />
          <div className="text-right">
            <span className="block text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">Status</span>
            <span className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-widest font-mono">Live Sync Complete</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Inputs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Service Selector Tabs */}
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
              Select Trip Class
            </label>
            <div className="grid grid-cols-3 p-1.5 bg-slate-900/5 dark:bg-white/5 rounded-2xl border border-slate-950/5 dark:border-white/5 backdrop-blur-sm">
              <button
                type="button"
                onClick={() => {
                  setTripType('oneway');
                  setDaysCount(1);
                }}
                className={`py-3.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  tripType === 'oneway' ? 'bg-[#D4AF37] text-[#040812] shadow-lg scale-102' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                One Way Drop
              </button>
              <button
                type="button"
                onClick={() => {
                  setTripType('roundtrip');
                }}
                className={`py-3.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  tripType === 'roundtrip' ? 'bg-[#D4AF37] text-[#040812] shadow-lg scale-102' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => {
                  setTripType('local');
                }}
                className={`py-3.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-wider transition-all duration-300 ${
                  tripType === 'local' ? 'bg-[#D4AF37] text-[#040812] shadow-lg scale-102' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Local Package
              </button>
            </div>
          </div>

          {/* Location Autocomplete Presets */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Preset Elite Destinations
              </label>
              <span className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-wider">Fast-Route Map</span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {PRESET_ROUTES.slice(0, 6).map((route, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPresetRoute(route)}
                  className="px-4 py-2 bg-slate-900/[0.03] dark:bg-white/[0.03] border border-slate-950/5 dark:border-white/5 hover:border-[#D4AF37]/30 hover:bg-[#D4AF37]/5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 transition-all flex items-center gap-1.5 active:scale-95 duration-300"
                >
                  <Compass size={12} className="text-[#D4AF37]" />
                  {route.from === 'Chennai' ? '' : `${route.from} ➔ `}{route.to} ({route.distance} KM)
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Route Form fields - Only shown for Outstations */}
          {tripType !== 'local' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Pickup Hub
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] opacity-60"><MapPin size={16} /></span>
                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) => handlePickupChange(e.target.value)}
                    onFocus={() => setShowPickupSuggestions(true)}
                    placeholder="e.g. Chennai Airport, OMR, Adyar"
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                  />
                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {showPickupSuggestions && pickup.trim().length > 0 && filteredPickupSuggestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {filteredPickupSuggestions.map(city => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => selectSuggestion(city, 'pickup')}
                            className="w-full text-left px-5 py-3 text-xs font-bold hover:bg-[#D4AF37]/10 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-white/5 last:border-0 luxury-click"
                          >
                            {city}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-2 relative">
                <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                  Drop Tour Hub
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D4AF37] opacity-60"><Navigation size={16} /></span>
                  <input
                    type="text"
                    value={drop}
                    onChange={(e) => handleDropChange(e.target.value)}
                    onFocus={() => setShowDropSuggestions(true)}
                    placeholder="e.g. Pondicherry, Ooty Hills, Madurai"
                    className="w-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm font-semibold outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/10 transition-all placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white"
                  />
                  {/* Suggestions Dropdown */}
                  <AnimatePresence>
                    {showDropSuggestions && drop.trim().length > 0 && filteredDropSuggestions.length > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden"
                      >
                        {filteredDropSuggestions.map(city => (
                          <button
                            key={city}
                            type="button"
                            onClick={() => selectSuggestion(city, 'drop')}
                            className="w-full text-left px-5 py-3 text-xs font-bold hover:bg-[#D4AF37]/10 text-slate-700 dark:text-slate-300 border-b border-slate-100 dark:border-white/5 last:border-0 luxury-click"
                          >
                            {city}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          )}

          {/* Distance adjust slider/picker for manual tuning */}
          {tripType !== 'local' ? (
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/5 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2">
                  <Fuel size={16} className="text-[#D4AF37]" />
                  <span className="font-bold text-slate-700 dark:text-slate-200">Bespoke Distance Map</span>
                </div>
                <div className="flex items-center gap-1 shadow-inner bg-slate-100 dark:bg-[#040812] border border-slate-200 dark:border-white/10 px-4 py-1.5 rounded-lg font-mono">
                  <span className="text-[#D4AF37] font-black text-lg">{customDistance}</span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">KM</span>
                </div>
              </div>

              <input
                type="range"
                min="50"
                max="1200"
                step="10"
                value={customDistance}
                onChange={(e) => setCustomDistance(parseInt(e.target.value))}
                className="w-full accent-[#D4AF37] h-1.5 bg-slate-200 dark:bg-white/5 rounded-lg appearance-none cursor-pointer"
              />

              <div className="flex justify-between text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono">
                <span>50 KM</span>
                <span>400 KM (Standard)</span>
                <span>800 KM</span>
                <span>1200 KM</span>
              </div>
            </div>
          ) : (
            /* Local package specification options */
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Choose Base Hours & Distance Pack
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { label: '5 Hrs', kms: 50 },
                  { label: '8 Hrs', kms: 80 },
                  { label: '10 Hrs', kms: 100 },
                  { label: '12 Hrs', kms: 120 },
                  { label: '15 Hrs', kms: 150 },
                ].map((pack) => (
                  <button
                    key={pack.kms}
                    type="button"
                    onClick={() => {
                      setLocalPackageKms(pack.kms);
                    }}
                    className={`py-3 rounded-xl border font-bold text-xs transition-all duration-300 flex flex-col items-center justify-center gap-1 ${
                      localPackageKms === pack.kms
                        ? 'bg-[#D4AF37] text-[#040812] border-[#D4AF37] scale-105 shadow-lg'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/30'
                    }`}
                  >
                    <span className="font-black text-[13px]">{pack.label}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wider opacity-80">{pack.kms} KMs</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Multi-day outstation trip duration tuner */}
          {tripType === 'roundtrip' && (
            <div className="glass-card p-6 rounded-2xl border border-slate-200 dark:border-white/5 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="space-y-1">
                <span className="block text-sm font-bold text-slate-700 dark:text-slate-200">Trip Duration (Days)</span>
                <span className="block text-xs text-slate-500 dark:text-slate-400">Min 250 KM credited per day block.</span>
              </div>
              
              <div className="flex items-center gap-2 border border-slate-200 dark:border-white/10 p-1.5 rounded-xl bg-slate-100 dark:bg-white/5 shrink-0">
                <button
                  type="button"
                  onClick={() => setDaysCount(Math.max(1, daysCount - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-black/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#040812] transition-colors font-black text-lg"
                >
                  -
                </button>
                <span className="px-6 font-mono font-black text-lg text-slate-900 dark:text-white">{daysCount} Days</span>
                <button
                  type="button"
                  onClick={() => setDaysCount(daysCount + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-200 dark:bg-black/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#040812] transition-colors font-black text-lg"
                >
                  +
                </button>
              </div>
            </div>
          )}

          {/* Premium Vehicle selection row */}
          <div className="space-y-3">
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                Chassis Carriage Selection
              </label>
              <span className="text-slate-400 text-[10px] font-mono">Capacity Filter Included</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vehicles?.map((v) => (
                <div
                  key={v.id}
                  onClick={() => setSelectedVehicleId(v.id)}
                  className={`group p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 relative overflow-hidden flex items-center justify-between gap-4 ${
                    selectedVehicleId === v.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.03] hover:border-[#D4AF37]/30 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={v.image} 
                      alt={v.name} 
                      className="w-16 h-10 object-contain filter saturate-110 drop-shadow-[0_4px_10px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] transform group-hover:scale-105 transition-transform" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-slate-100">{v.name}</h5>
                      <span className="text-[10px] text-[#D4AF37]/80 font-bold uppercase tracking-wider">{v.type} ({v.capacity} Seats)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-bold text-slate-500 dark:text-slate-400 lowercase">outstation rate</span>
                    <span className="text-sm font-black text-[#D4AF37]">₹{v.pricing?.outstation?.roundTrip || v.pricePerKm}/KM</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Supplementary Dynamic Multipliers (Toggles) */}
          <div className="space-y-4">
            <label className="block text-[10px] font-black uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 mb-1">
              Supplementary Multipliers & Surcharges
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Chauffeur Allowance */}
              <div 
                onClick={() => setIncludeDriverBatta(!includeDriverBatta)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${includeDriverBatta ? 'border-[#D4AF37]/35 bg-[#D4AF37]/5' : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.02]'}`}
              >
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">Driver Allowance</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Batta for meals & local lodgings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#D4AF37]">₹{currentDriverBattaRate} / Day</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${includeDriverBatta ? 'bg-[#D4AF37]' : 'bg-slate-300 dark:bg-white/10'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white dark:bg-[#040812] transition-transform ${includeDriverBatta ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>

              {/* State boundary Crossway permit */}
              <div 
                onClick={() => setIncludeStatePermit(!includeStatePermit)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${includeStatePermit ? 'border-[#D4AF37]/35 bg-[#D4AF37]/5' : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.02]'}`}
              >
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">Interstate Permit</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Border transport tax (e.g. KA, AP, PY)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500 dark:text-slate-300">Auto</span>
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${includeStatePermit ? 'bg-[#D4AF37]' : 'bg-slate-300 dark:bg-white/10'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white dark:bg-[#040812] transition-transform ${includeStatePermit ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>

              {/* Highway toll estimates */}
              <div 
                onClick={() => setIncludeTolls(!includeTolls)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${includeTolls ? 'border-[#D4AF37]/35 bg-[#D4AF37]/5' : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.02]'}`}
              >
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">Highway Toll Gates</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Dynamic simulation of highway tolls</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${includeTolls ? 'bg-[#D4AF37]' : 'bg-slate-300 dark:bg-white/10'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white dark:bg-[#040812] transition-transform ${includeTolls ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>

              {/* Mountain pass climb surcharge */}
              <div 
                onClick={() => setIncludeHillsCharge(!includeHillsCharge)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${includeHillsCharge ? 'border-[#D4AF37]/35 bg-[#D4AF37]/5' : 'border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-white/[0.02]'}`}
              >
                <div>
                  <span className="block text-xs font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">Hill Pass Surcharge</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">High stress mountain pass climb (Ooty/Kodai/Yercaud)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-6 rounded-full p-1 transition-colors ${includeHillsCharge ? 'bg-[#D4AF37]' : 'bg-slate-300 dark:bg-white/10'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white dark:bg-[#040812] transition-transform ${includeHillsCharge ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side: Luxury Receipt breakdown & confirmation CTA */}
        <div className="lg:col-span-5 h-full lg:sticky lg:top-24">
          <div className="bg-white dark:bg-[#0B0F1A] border border-slate-200 dark:border-[#D4AF37]/25 rounded-[2rem] p-6 shadow-2xl relative overflow-hidden before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#D4AF37]/45 before:to-transparent">
            {/* Soft decorative visual cues */}
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.015] pointer-events-none"><Crown size={180} className="text-slate-900 dark:text-white" /></div>
            
            {/* Header branding */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-5 mb-6">
              <div>
                <span className="text-[8px] font-black uppercase tracking-[0.4em] text-[#D4AF37] block mb-1">PRO-FORMA INVOICE</span>
                <span className="text-slate-400 dark:text-white/30 text-[9px] font-mono leading-none font-bold uppercase tracking-widest">
                  EST-#{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </div>
              <Compass className="text-[#D4AF37]/60 w-5 h-5 animate-[spin_60s_infinite_linear]" />
            </div>

            {/* Line items detailed matrix */}
            <div className="space-y-4.5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Chassis Class Selected</span>
                <span className="text-slate-900 dark:text-white font-bold">{selectedVehicle?.name || 'Class Executive Sedans'}</span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Base Voyage Type</span>
                <span className="text-[#D4AF37] font-black uppercase tracking-wider">
                  {tripType === 'local' ? 'Local Package' : tripType === 'roundtrip' ? 'Outstation Round' : 'Outstation One Way'}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">Billed Distance Block</span>
                <span className="text-slate-900 dark:text-white font-mono font-bold">{costs.distanceToBill} KMs</span>
              </div>

              {tripType !== 'local' && (
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Outstation Base Rate</span>
                  <span className="text-slate-900 dark:text-white font-mono">₹{baseRatePerKm}/KM</span>
                </div>
              )}

              {/* Invoice calculation values with animated transitions */}
              <div className="border-t border-slate-200 dark:border-white/5 pt-4 space-y-3.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-semibold">Base Travel Fare</span>
                  <span className="text-slate-900 dark:text-white font-bold font-mono">₹{costs.baseFare.toLocaleString('en-IN')}</span>
                </div>

                {/* Optional items */}
                {includeDriverBatta && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold flex items-center gap-1.5">
                      Chauffeur Daily Batta
                      <span className="text-[9px] px-1.5 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-300 font-mono rounded">
                        x{tripType === 'local' ? '0.5' : daysCount}
                      </span>
                    </span>
                    <span className="text-slate-900 dark:text-white font-semibold font-mono">₹{costs.driverBattaTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {includeStatePermit && costs.permitTotal > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Border State Permit Fee</span>
                    <span className="text-slate-900 dark:text-white font-semibold font-mono">₹{costs.permitTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {includeTolls && costs.tollEstimate > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Highway Infrastructure Tolls (Est)</span>
                    <span className="text-slate-900 dark:text-white font-semibold font-mono">₹{costs.tollEstimate.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {includeHillsCharge && costs.hillsTotal > 0 && (
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-semibold">Mountain Pass Surcharge</span>
                    <span className="text-slate-900 dark:text-white font-semibold font-mono">₹{costs.hillsTotal.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>

              {/* Total display segment */}
              <div className="border-t border-[#D4AF37]/30 bg-gradient-to-r from-transparent via-[#D4AF37]/5 to-transparent p-4 rounded-xl flex flex-col items-center justify-center gap-1.5 mt-6">
                <span className="text-[9px] font-black uppercase tracking-[0.35em] text-slate-500 dark:text-slate-400">Estimated Total Fare</span>
                <div className="flex items-center gap-1.5">
                  <span className="text-[#D4AF37] text-3xl font-black font-mono">
                    ₹{costs.grandTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[8px] font-bold text-slate-500 dark:text-slate-400 text-center uppercase tracking-widest block leading-normal mt-1">
                  *Excludes interstate parking and local tourism entrance taxes
                </span>
              </div>
            </div>

            {/* Elite VIP Assurance badging */}
            <div className="bg-slate-900/5 dark:bg-white/[0.02] border border-slate-950/10 dark:border-white/5 p-4 rounded-xl mt-6 flex gap-3.5 items-start">
              <CheckCircle2 size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-left">
                <span className="block text-[10px] font-black uppercase tracking-wider text-slate-900 dark:text-slate-200">GeeVee Premium Pledge</span>
                <span className="block text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                  Fixed pricing transparent pledge. No hidden night-riding premiums or fuel surcharge shock factors.
                </span>
              </div>
            </div>

            {/* Quick pre-filled prompt link for reservation */}
            <a
              href={`https://wa.me/91${WHATSAPP_NUMBER}?text=Hello%20GeeVee%20Travels%2C%20I%20would%20like%20to%20enquire%20for%20a%20Premium%20Voyage.%20Trip%20Type%3A%20${tripType}%20VehClass%3A%20${selectedVehicle?.name}%20Distance%3A%20${costs.distanceToBill}KM%20Est%20Total%3A%20INR%20${costs.grandTotal}`}
              target="_blank"
              rel="noreferrer"
              className="mt-6 w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:scale-103 active:scale-97 text-[#0B0F1A] py-4.5 rounded-xl font-black text-xs uppercase tracking-[0.25em] flex items-center justify-center gap-3.5 shadow-lg dark:shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition-all ease-out duration-300 luxury-click"
            >
              <span>Instant Dispatch Booking</span>
              <ChevronRight size={14} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TariffCalculator;
