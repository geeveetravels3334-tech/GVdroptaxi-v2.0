
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Phone, MapPin, Calendar, Clock, CheckCircle2, Search, Car, RefreshCcw, Loader2, ChevronDown, ChevronUp, Check, Navigation, AlertTriangle, Calculator, TicketPercent } from 'lucide-react';
import { ServiceType } from '../types.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { BookingService } from '../services/booking.ts';
import { ReferralService } from '../services/referral.ts';
import { DETAILED_VEHICLES } from '../constants.tsx';
import { calculateTripFare } from '../utils/pricing.ts';

const WHATSAPP_BOOKING_NUMBER = '9025743325';

interface LocationSuggestion {
  display_name: string;
  lat: string;
  lon: string;
}

interface RouteInfo {
  distanceDisplay: string;
  durationDisplay: string;
}

interface FareEstimate {
  amount: number;
  breakdown: string;
  originalAmount?: number;
  discountApplied?: number;
}

const BookingForm: React.FC = () => {
  const { t, language, fontClass } = useLanguage();
  const { user } = useAuth();

  const [service, setService] = useState<ServiceType>(ServiceType.ONE_WAY);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [time, setTime] = useState('');
  const [mobile, setMobile] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState<string | null>(null);
  
  const [pickupCoords, setPickupCoords] = useState<[number, number] | null>(null);
  const [dropCoords, setDropCoords] = useState<[number, number] | null>(null);
  
  const [distanceKm, setDistanceKm] = useState<number>(0);
  const [fareEstimate, setFareEstimate] = useState<FareEstimate | null>(null);
  
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false);
  
  const [pickupSuggestions, setPickupSuggestions] = useState<LocationSuggestion[]>([]);
  const [dropSuggestions, setDropSuggestions] = useState<LocationSuggestion[]>([]);
  const [isSearchingPickup, setIsSearchingPickup] = useState(false);
  const [isSearchingDrop, setIsSearchingDrop] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  const [referralCode, setReferralCode] = useState('');
  const [isReferralValid, setIsReferralValid] = useState(false);
  const [referralError, setReferralError] = useState<string | null>(null);
  const [referralDiscount, setReferralDiscount] = useState(0);
  const [isCheckingReferral, setIsCheckingReferral] = useState(false);
  
  const [promoCode, setPromoCode] = useState('');
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [isCheckingPromo, setIsCheckingPromo] = useState(false);
  const [isFirstBooking, setIsFirstBooking] = useState(true);
  const [showOffersInput, setShowOffersInput] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);

  const pickupTimeoutRef = useRef<number | null>(null);
  const dropTimeoutRef = useRef<number | null>(null);

  const isBaseInfoFilled = pickup.trim() !== '' && drop.trim() !== '' && date !== '' && time !== '' && (service !== ServiceType.ROUND_TRIP || returnDate !== '');

  const placeholders = {
    en: { pickup: 'City Name', drop: 'Destination City/Area', mobile: 'Enter mobile number' },
    ta: { pickup: 'நகரத்தின் பெயர்', drop: 'செல்லும் இடம்', mobile: 'மொபைல் எண்' },
    hi: { pickup: 'शहर का नाम', drop: 'गंतव्य शहर/क्षेत्र', mobile: 'मोबाइल नंबर' },
    te: { pickup: 'నగరం పేరు', drop: 'గమ్యం నగరం/ప్రాంతం', mobile: 'మొబైల్ నంబర్' },
    kn: { pickup: 'ನಗರದ ಹೆಸರು', drop: 'ಗಮ್ಯಸ್ಥಾನ ನಗರ/ಪ್ರದೇಶ', mobile: 'ಮೊಬైಲ್ ಸಂಖ್ಯೆ' },
  };

  const ph = placeholders[language] || placeholders.en;

  const selectedVehicle = useMemo(() => 
    DETAILED_VEHICLES.find(v => v.id === selectedVehicleId)
  , [selectedVehicleId]);

  const filteredVehicles = useMemo(() => {
    let list = DETAILED_VEHICLES;
    if (service === ServiceType.ONE_WAY) {
      list = list.filter(v => v.pricing.outstation.oneWay !== "NOT AVAILABLE");
    }
    return list;
  }, [service]);

  useEffect(() => {
    const checkHistory = async () => {
      if (mobile && mobile.length >= 10) {
        const bookings = await BookingService.getUserBookings(mobile);
        setIsFirstBooking(bookings.length === 0);
      }
    };
    checkHistory();
  }, [mobile]);

  useEffect(() => {
    if (user && user.mobile) {
      setMobile(user.mobile);
    }
  }, [user]);

  useEffect(() => {
    if (distanceKm > 0 && selectedVehicle && service) {
      const result = calculateTripFare(distanceKm, service, selectedVehicle, date, returnDate);
      
      if (result.isAvailable && result.total > 0) {
        let finalAmount = result.total;
        let appliedDiscount = 0;

        if (isPromoValid) {
           appliedDiscount = Math.round(result.total * 0.10); 
           setPromoDiscount(appliedDiscount);
        } else if (isReferralValid) {
           appliedDiscount = referralDiscount;
        }

        finalAmount = Math.max(0, result.total - appliedDiscount);

        setFareEstimate({
          amount: finalAmount,
          originalAmount: result.total,
          discountApplied: appliedDiscount,
          breakdown: result.breakdown
        });
      } else {
        setFareEstimate(null);
      }
    } else {
      setFareEstimate(null);
    }
  }, [distanceKm, selectedVehicle, service, referralDiscount, isReferralValid, isPromoValid, promoDiscount, date, returnDate]);

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d * 1.28;
  };

  useEffect(() => {
    if (pickupCoords && dropCoords) {
      setIsCalculatingRoute(true);
      const dist = calculateDistance(pickupCoords[0], pickupCoords[1], dropCoords[0], dropCoords[1]);
      setDistanceKm(dist);

      const hours = Math.floor(dist / 52); 
      const mins = Math.round(((dist / 52) - hours) * 60);
      
      const timer = setTimeout(() => {
        setRouteInfo({
          distanceDisplay: `${Math.round(dist)} KM`,
          durationDisplay: `${hours > 0 ? `${hours}h ` : ''}${mins}m`
        });
        setIsCalculatingRoute(false);
      }, 600);
      
      return () => clearTimeout(timer);
    } else {
      setRouteInfo(null);
      setDistanceKm(0);
      setIsCalculatingRoute(false);
    }
  }, [pickupCoords, dropCoords]);

  const handleSearch = (query: string, type: 'pickup' | 'drop') => {
    if (type === 'pickup') setPickup(query);
    else setDrop(query);
    const timeoutRef = type === 'pickup' ? pickupTimeoutRef : dropTimeoutRef;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    if (query.length >= 3) {
      timeoutRef.current = window.setTimeout(() => { fetchSuggestions(query, type); }, 1000);
    }
  };

  const fetchSuggestions = async (query: string, type: 'pickup' | 'drop') => {
    const setter = type === 'pickup' ? setIsSearchingPickup : setIsSearchingDrop;
    const suggestionsSetter = type === 'pickup' ? setPickupSuggestions : setDropSuggestions;
    setter(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query + ', Tamil Nadu')}&limit=5`);
      const data = await response.json();
      suggestionsSetter(data);
    } catch (e) { setSearchError("Search issue. Please try again."); }
    finally { setter(false); }
  };

  const handleSelectSuggestion = (suggestion: LocationSuggestion, type: 'pickup' | 'drop') => {
    let name = suggestion.display_name.split(',')[0];
    name = name.replace(/District/gi, '').trim();

    const coords: [number, number] = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
    if (type === 'pickup') { setPickup(name); setPickupCoords(coords); setPickupSuggestions([]); }
    else { setDrop(name); setDropCoords(coords); setDropSuggestions([]); }
  };

  const handleVehicleSelect = (id: string) => { 
    setSelectedVehicleId(id); 
    setShowVehicleSelection(false); 
  };

  const handleApplyReferral = async () => {
    if (!referralCode.trim()) return;
    setIsPromoValid(false);
    setPromoCode('');
    setPromoDiscount(0);
    setIsCheckingReferral(true);
    setReferralError(null);
    try {
      const result = await ReferralService.validateCode(referralCode, user?.id);
      if (result.valid) {
        setIsReferralValid(true);
        setReferralDiscount(result.discount || 0);
      } else {
        setIsReferralValid(false);
        setReferralError(result.message || 'Invalid code');
        setReferralDiscount(0);
      }
    } catch (e) { setReferralError('Validation failed'); } finally { setIsCheckingReferral(false); }
  };

  const handleApplyPromo = () => {
    if (!promoCode.trim()) return;
    setIsReferralValid(false);
    setReferralCode('');
    setReferralDiscount(0);
    setIsCheckingPromo(true);
    setPromoError(null);
    setTimeout(() => {
      const code = promoCode.toUpperCase();
      if (code === 'FIRST10') {
        if (isFirstBooking) {
          setIsPromoValid(true);
        } else {
          setIsPromoValid(false);
          setPromoError("This code is valid for first-time bookings only.");
        }
      } else {
        setIsPromoValid(false);
        setPromoError("Invalid promo code.");
      }
      setIsCheckingPromo(false);
    }, 800);
  };

  const handleReset = () => {
    setIsRefreshing(true);
    setPickup(''); setDrop(''); setDate(''); setReturnDate(''); setTime('');
    if (!user) setMobile('');
    setPickupCoords(null); setDropCoords(null);
    setSelectedVehicleId(null); setService(ServiceType.ONE_WAY); setShowVehicleSelection(false);
    setDistanceKm(0); setFareEstimate(null); setBookingId(null); setRouteInfo(null);
    setReferralCode(''); setIsReferralValid(false); setReferralDiscount(0); 
    setPromoCode(''); setIsPromoValid(false); setPromoDiscount(0);
    setShowOffersInput(false);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isBaseInfoFilled || !selectedVehicleId) return;
    if (!mobile || mobile.trim().length < 10) {
      alert("Please enter a valid 10-digit mobile number to proceed.");
      return;
    }
    const whatsappWindow = window.open('', '_blank');
    if (whatsappWindow) {
      whatsappWindow.document.write(`<html><head><title>Redirecting...</title></head><body style="background:#f0f9ff; display:flex; justify-content:center; align-items:center; height:100vh; margin:0; font-family:sans-serif; color:#0f172a;"><div style="text-align:center"><h2>Processing your booking...</h2><div style="margin-top:20px; width:40px; height:40px; border:4px solid #F37021; border-top:4px solid transparent; border-radius:50%; animation:spin 1s linear infinite; margin-left:auto; margin-right:auto;"></div><style>@keyframes spin {0%{transform:rotate(0deg);}100%{transform:rotate(360deg);}}</style></div></body></html>`);
    }
    setIsSubmitting(true);
    let finalDiscountAmount = 0;
    let appliedCode = null;
    if (isPromoValid) {
      finalDiscountAmount = promoDiscount;
      appliedCode = promoCode;
    } else if (isReferralValid) {
      finalDiscountAmount = referralDiscount;
      appliedCode = referralCode;
    }
    const bookingData = {
      service,
      pickup,
      drop,
      date,
      returnDate: service === ServiceType.ROUND_TRIP ? returnDate : undefined,
      time,
      mobile,
      customerName: user ? user.name : 'Guest',
      vehicle: selectedVehicle?.name,
      price: fareEstimate?.amount,
      referralCode: appliedCode,
      discountAmount: finalDiscountAmount
    };
    try {
      let finalBookingId = '';
      try {
        const savedBooking = await BookingService.saveBooking(bookingData);
        finalBookingId = savedBooking.bookingId;
      } catch (dbError) {
        finalBookingId = `OFF-${Date.now().toString().slice(-6)}`;
      }
      setBookingId(finalBookingId);
      let msg = `*New Booking Request ${finalBookingId}*\n*Geevee Travels*\nService: ${service}\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nTime: ${time}`;
      if (service === ServiceType.ROUND_TRIP && returnDate) {
        msg += `\nReturn Date: ${returnDate}`;
      }
      if (user) msg += `\nCustomer: ${user.name}`;
      if (mobile) msg += `\nMobile: ${mobile}`;
      msg += `\nVehicle: ${selectedVehicle?.name}`;
      if (fareEstimate) {
        msg += `\n\n*Fare Breakdown:*`;
        if (finalDiscountAmount > 0) {
           msg += `\nOriginal: ₹${fareEstimate.originalAmount}`;
           msg += `\nDiscount: -₹${finalDiscountAmount} (Code: ${appliedCode})`;
           msg += `\n*Final Fare: ₹${fareEstimate.amount}*`;
        } else {
           msg += `\nEst. Fare: ₹${fareEstimate.amount}`;
        }
        msg += `\n(${fareEstimate.breakdown})`;
      }
      msg += `\n\nBooking ID: ${finalBookingId}`;
      const waUrl = `https://wa.me/91${WHATSAPP_BOOKING_NUMBER}?text=${encodeURIComponent(msg)}`;
      if (whatsappWindow) whatsappWindow.location.href = waUrl;
      else window.location.href = waUrl;
      setIsSuccess(true);
    } catch (criticalError) {
      if (whatsappWindow) whatsappWindow.close();
      alert("Unexpected error processing request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) return (
    <div className="glass-card rounded-[4rem] p-16 md:p-24 text-center shadow-3xl max-w-5xl mx-auto animate-in zoom-in duration-500 transform-gpu transition-colors">
      <div className="w-32 h-32 bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center mx-auto mb-10 shadow-inner animate-[bounce_1s_infinite]">
        <CheckCircle2 size={64} />
      </div>
      <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">{t.booking.success}</h2>
      <div className="inline-block bg-white/20 dark:bg-white/5 px-6 py-2 rounded-xl mb-8">
         <p className="text-slate-600 dark:text-slate-400 font-bold tracking-widest text-sm uppercase">Booking ID: <span className="text-slate-900 dark:text-white">{bookingId}</span></p>
      </div>
      <p className="text-slate-600 dark:text-slate-400 text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
        {t.booking.successDesc}
      </p>
      <button 
        onClick={handleReset}
        className="bg-slate-900 dark:bg-geevee-orange text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-geevee-orange dark:hover:bg-orange-600 transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 mx-auto"
      >
        <RefreshCcw size={20} /> Book Another Trip
      </button>
    </div>
  );

  return (
    <div className="relative transform-gpu">
      {/* Replaced solid background with glass-card class */}
      <div className="relative glass-card rounded-[3.5rem] p-4 md:p-12 shadow-3xl max-w-4xl mx-auto flex flex-col gap-8 transform-gpu transition-colors backdrop-blur-xl">
        {/* Left Side: Form */}
        <div className="w-full">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`text-3xl font-black text-slate-900 dark:text-white ${fontClass}`}>{t.nav.bookNow}</h2>
            
            {/* Service Type Toggles */}
            <div className="flex bg-white/40 dark:bg-white/5 p-1.5 rounded-xl gap-1 border border-white/20">
              {[ServiceType.ONE_WAY, ServiceType.ROUND_TRIP].map((st) => (
                <button
                  key={st}
                  onClick={() => { setService(st); setSelectedVehicleId(null); setFareEstimate(null); }}
                  className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all transform-gpu ${service === st ? 'bg-white dark:bg-slate-800 text-geevee-dark dark:text-white shadow-md' : 'text-slate-500 hover:text-slate-600 dark:hover:text-slate-200'}`}
                >
                  {st === ServiceType.ONE_WAY ? t.booking.onewaydrop : t.booking.roundtrip}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleBooking} className="space-y-6 relative z-10">
            {/* Location Inputs with Suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 relative">
              <div className="relative group z-30">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-geevee-orange transition-colors">
                  {isSearchingPickup ? <Loader2 className="animate-spin" size={20} /> : <MapPin size={20} />}
                </div>
                <input 
                  type="text" 
                  value={pickup}
                  onChange={(e) => handleSearch(e.target.value, 'pickup')}
                  placeholder={ph.pickup}
                  className="w-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-slate-800 border-2 border-transparent focus:border-geevee-orange rounded-2xl py-5 pl-14 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all text-sm shadow-sm focus:shadow-xl"
                />
                {pickupSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 mt-2 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    {pickupSuggestions.map((s, i) => (
                      <button key={i} type="button" onClick={() => handleSelectSuggestion(s, 'pickup')} className="w-full text-left px-5 py-3 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-bold text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-white/5 last:border-0 flex items-center gap-2">
                        <MapPin size={12} className="text-slate-300 dark:text-slate-600" /> {s.display_name.split(',')[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative group z-20">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-geevee-orange transition-colors">
                  {isSearchingDrop ? <Loader2 className="animate-spin" size={20} /> : <Navigation size={20} />}
                </div>
                <input 
                  type="text" 
                  value={drop}
                  onChange={(e) => handleSearch(e.target.value, 'drop')}
                  placeholder={ph.drop}
                  className="w-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-slate-800 border-2 border-transparent focus:border-geevee-orange rounded-2xl py-5 pl-14 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all text-sm shadow-sm focus:shadow-xl"
                />
                {dropSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 mt-2 rounded-2xl shadow-2xl border border-slate-100 dark:border-white/10 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                    {dropSuggestions.map((s, i) => (
                      <button key={i} type="button" onClick={() => handleSelectSuggestion(s, 'drop')} className="w-full text-left px-5 py-3 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-bold text-slate-600 dark:text-slate-300 border-b border-slate-50 dark:border-white/5 last:border-0 flex items-center gap-2">
                        <Navigation size={12} className="text-slate-300 dark:text-slate-600" /> {s.display_name.split(',')[0]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className={`grid grid-cols-1 ${service === ServiceType.ROUND_TRIP ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-5`}>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-geevee-orange transition-colors"><Calendar size={20} /></div>
                <input 
                  type="date" 
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-slate-800 border-2 border-transparent focus:border-geevee-orange rounded-2xl py-5 pl-14 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all text-sm shadow-sm focus:shadow-xl uppercase tracking-widest"
                />
              </div>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-geevee-orange transition-colors"><Clock size={20} /></div>
                <input 
                  type="time" 
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-slate-800 border-2 border-transparent focus:border-geevee-orange rounded-2xl py-5 pl-14 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all text-sm shadow-sm focus:shadow-xl uppercase tracking-widest"
                />
              </div>
              {service === ServiceType.ROUND_TRIP && (
                <div className="relative group">
                  <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-geevee-orange transition-colors"><Calendar size={20} /></div>
                  <input 
                    type="date" 
                    value={returnDate}
                    min={date}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-slate-800 border-2 border-transparent focus:border-geevee-orange rounded-2xl py-5 pl-14 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all text-sm shadow-sm focus:shadow-xl uppercase tracking-widest"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest pointer-events-none hidden lg:block">Return</div>
                </div>
              )}
            </div>

            {/* Mobile Number */}
            <div className="relative group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 group-focus-within:text-geevee-orange transition-colors"><Phone size={20} /></div>
              <input 
                type="tel" 
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                placeholder={ph.mobile}
                className="w-full bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/[0.08] focus:bg-white dark:focus:bg-slate-800 border-2 border-transparent focus:border-geevee-orange rounded-2xl py-5 pl-14 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all text-sm shadow-sm focus:shadow-xl tracking-widest"
              />
            </div>

            {/* Collapsible Vehicle Selection */}
            {isBaseInfoFilled && (
              <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div 
                  className={`bg-white/40 dark:bg-white/5 border-2 ${selectedVehicleId ? 'border-geevee-orange' : 'border-white/20 dark:border-white/5'} rounded-2xl p-5 cursor-pointer shadow-sm hover:shadow-md transition-all group backdrop-blur-sm`}
                  onClick={() => setShowVehicleSelection(!showVehicleSelection)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${selectedVehicleId ? 'bg-geevee-orange text-white' : 'bg-white/50 dark:bg-white/5 text-slate-400 dark:text-slate-500'}`}>
                        <Car size={24} />
                      </div>
                      <div>
                        <span className="block text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Selected Vehicle</span>
                        <h4 className={`text-lg font-black ${selectedVehicleId ? 'text-geevee-dark dark:text-white' : 'text-slate-400 dark:text-slate-500'}`}>
                          {selectedVehicle?.name || t.booking.selectVehicle}
                        </h4>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${showVehicleSelection ? 'rotate-180' : ''} text-slate-400 dark:text-slate-600`}>
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                <div className={`grid transition-all duration-500 ease-in-out overflow-hidden ${showVehicleSelection ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-1">
                      {filteredVehicles.map((v) => (
                        <div 
                          key={v.id}
                          onClick={() => handleVehicleSelect(v.id)}
                          className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02] ${selectedVehicleId === v.id ? 'border-geevee-orange bg-orange-50/50 dark:bg-geevee-orange/10' : 'border-transparent hover:border-slate-200 dark:hover:border-white/20 bg-white/40 dark:bg-white/5 backdrop-blur-sm'}`}
                        >
                          <div className="flex-grow">
                            <h5 className="font-bold text-slate-900 dark:text-white text-sm">{v.name}</h5>
                            <div className="flex justify-between items-center mt-1">
                              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{v.capacity} Seater</span>
                              <span className="text-xs font-black text-geevee-orange">₹{v.pricePerKm}/km</span>
                            </div>
                          </div>
                          {selectedVehicleId === v.id && <CheckCircle2 className="text-geevee-orange" size={20} />}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Offers & Estimate Section */}
            {selectedVehicleId && fareEstimate && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                
                {/* Coupon Toggle */}
                <div className="mb-4">
                   <button 
                     type="button" 
                     onClick={() => setShowOffersInput(!showOffersInput)}
                     className="text-xs font-black text-geevee-orange hover:text-orange-700 flex items-center gap-2 transition-colors uppercase tracking-widest"
                   >
                     {showOffersInput ? <ChevronUp size={14} /> : <ChevronDown size={14} />} 
                     Have a Promo Code?
                   </button>
                   
                   {showOffersInput && (
                     <div className="mt-3 bg-white/40 dark:bg-white/5 p-4 rounded-2xl flex flex-col gap-3 border border-white/20 dark:border-white/10 animate-in slide-in-from-top-2 backdrop-blur-sm">
                        {/* Promo Input */}
                        <div className="flex gap-2">
                           <input 
                             type="text" 
                             placeholder="Promo Code" 
                             value={promoCode}
                             onChange={(e) => setPromoCode(e.target.value)}
                             disabled={isReferralValid}
                             className="flex-grow bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 dark:border-white/10 focus:border-geevee-orange dark:focus:border-geevee-orange outline-none disabled:opacity-50 dark:text-white"
                           />
                           <button 
                             type="button" 
                             onClick={handleApplyPromo}
                             disabled={isCheckingPromo || isReferralValid || !promoCode}
                             className="bg-slate-900 dark:bg-geevee-orange text-white px-4 rounded-xl font-bold text-xs disabled:opacity-50"
                           >
                             {isCheckingPromo ? <Loader2 className="animate-spin" size={14} /> : 'Apply'}
                           </button>
                        </div>
                        {isPromoValid && <p className="text-[10px] text-green-600 dark:text-green-400 font-bold flex items-center gap-1"><Check size={10} /> Code Applied! 10% Discount included.</p>}
                        {promoError && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={10} /> {promoError}</p>}

                        <div className="h-px bg-slate-200 dark:bg-white/10 w-full"></div>

                        {/* Referral Input */}
                        <div className="flex gap-2">
                           <input 
                             type="text" 
                             placeholder="Referral Code" 
                             value={referralCode}
                             onChange={(e) => setReferralCode(e.target.value)}
                             disabled={isPromoValid}
                             className="flex-grow bg-white dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-bold border border-slate-200 dark:border-white/10 focus:border-geevee-orange dark:focus:border-geevee-orange outline-none disabled:opacity-50 dark:text-white"
                           />
                           <button 
                             type="button" 
                             onClick={handleApplyReferral}
                             disabled={isCheckingReferral || isPromoValid || !referralCode}
                             className="bg-slate-900 dark:bg-geevee-orange text-white px-4 rounded-xl font-bold text-xs disabled:opacity-50"
                           >
                             {isCheckingReferral ? <Loader2 className="animate-spin" size={14} /> : 'Apply'}
                           </button>
                        </div>
                        {isReferralValid && <p className="text-[10px] text-green-600 dark:text-green-400 font-bold flex items-center gap-1"><Check size={10} /> Referral Valid! ₹{referralDiscount} OFF included.</p>}
                        {referralError && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertTriangle size={10} /> {referralError}</p>}
                     </div>
                   )}
                </div>

                <div className="bg-geevee-dark text-white p-6 rounded-[2rem] relative overflow-hidden shadow-xl border border-white/5">
                  <div className="absolute top-0 right-0 p-6 opacity-5"><Calculator size={100} /></div>
                  
                  <div className="relative z-10">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Estimated Fare</span>
                      <div className="text-right">
                        {fareEstimate.discountApplied ? (
                           <>
                             <span className="block text-sm text-slate-400 line-through font-bold">₹{fareEstimate.originalAmount}</span>
                             <span className="text-3xl font-black text-green-400">₹{fareEstimate.amount}</span>
                           </>
                        ) : (
                           <span className="text-3xl font-black text-geevee-orange">₹{fareEstimate.amount}</span>
                        )}
                      </div>
                    </div>
                    <div className="h-px bg-white/10 my-3"></div>
                    <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{fareEstimate.breakdown}</p>
                    {fareEstimate.discountApplied && (
                       <p className="text-[10px] text-green-400 font-bold mt-2 uppercase tracking-widest flex items-center gap-2">
                          <TicketPercent size={12} /> Savings: ₹{fareEstimate.discountApplied}
                       </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting || !selectedVehicleId}
              className="w-full bg-geevee-orange hover:bg-orange-600 text-white py-6 rounded-2xl font-black text-lg shadow-[0_20px_40px_-10px_rgba(243,112,33,0.4)] hover:shadow-orange-600/40 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  {t.booking.confirm} <CheckCircle2 className="group-hover:scale-110 transition-transform" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
