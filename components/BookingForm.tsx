
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, MapPin, Calendar, Clock, CheckCircle2, Search, Car, RefreshCcw, Loader2, ChevronDown, ChevronUp, Check, Navigation, AlertTriangle, Calculator, TicketPercent, ArrowRight, MessageSquare, X, Mail } from 'lucide-react';
import { ServiceType } from '../types.ts';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { useAuth } from '../contexts/AuthContext.tsx';
import { BookingService } from '../services/booking.ts';
import { ReferralService } from '../services/referral.ts';
import { CustomerService, CustomerData } from '../services/customer.ts';
import { usePricing } from '../contexts/PricingContext.tsx';
import { calculateTripFare } from '../utils/pricing.ts';
import emailjs from '@emailjs/browser';
import { getSupabase } from '../services/supabase.ts';
import { 
  OFFLINE_CITIES_DATABASE, 
  searchOfflineSuggestions, 
  calculateOfflineDistance, 
  estimatePremiumOfflineFareByVehicle,
  OfflineCity 
} from '../utils/geoData.ts';

const WHATSAPP_BOOKING_NUMBER = '9025743325';

interface LocationSuggestion {
  display_name: string;
  place_id?: string;
  lat?: string;
  lon?: string;
  main_text?: string;
  secondary_text?: string;
  matched_substrings?: any[];
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
  rangeDisplay?: string;
  tollEstimate?: number;
  driverBatta?: number;
  hillCharges?: number;
  nightCharges?: number;
}

interface SuggestionListProps {
  suggestions: LocationSuggestion[];
  onSelect: (suggestion: LocationSuggestion) => void;
  renderHighlight: (text: string, matches?: any[]) => React.ReactNode;
}

const SuggestionList = React.memo<SuggestionListProps>(({ suggestions, onSelect, renderHighlight }) => (
  <AnimatePresence>
    {suggestions.length > 0 && (
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 5 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute top-[calc(100%+0.75rem)] left-0 right-0 bg-[#040812]/95 backdrop-blur-xl rounded-[2rem] shadow-[0_24px_56px_-12px_rgba(0,0,0,0.85)] border border-white/10 overflow-hidden z-[100] ring-1 ring-white/5 will-change-transform"
      >
        <div className="max-h-[320px] overflow-y-auto premium-scrollbar">
          {suggestions.map((s, i) => (
            <button 
              key={`${s.display_name}-${s.lat || ''}-${s.lon || ''}-${i}`} 
              type="button" 
              onClick={() => onSelect(s)} 
              className="w-full text-left px-8 py-5 hover:bg-white/10 transition-all text-[11px] font-bold text-[#D1D5DB] border-b border-white/5 last:border-0 flex items-center gap-5 group/suggest outline-none focus:bg-white/10"
            >
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center group-hover/suggest:bg-[#D4AF37]/10 group-hover/suggest:border-[#D4AF37]/30 border border-transparent transition-all duration-300">
                <MapPin size={16} className="opacity-40 group-hover/suggest:text-[#D4AF37] group-hover/suggest:opacity-100 group-hover/suggest:scale-110 transition-all" /> 
              </div>
              <div className="flex flex-col">
                <div className="text-[13px] md:text-sm tracking-tight font-serif italic text-white group-hover/suggest:text-[#D4AF37] transition-colors">
                  {renderHighlight(s.display_name.split(',')[0], s.matched_substrings)}
                </div>
                {s.secondary_text && (
                  <span className="text-[9px] font-mono font-bold text-[#9CA3AF] uppercase tracking-widest mt-0.5 opacity-60 group-hover/suggest:opacity-100 transition-opacity">
                    {s.secondary_text}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));

const PLACEHOLDERS = {
  en: { pickup: 'City Name', drop: 'Destination City/Area', mobile: 'Enter mobile number' },
  ta: { pickup: 'நகரத்தின் பெயர்', drop: 'செல்லும் இடம்', mobile: 'மொபைல் எண்' },
  hi: { pickup: 'शहर का नाम', drop: 'गंतव्य शहर/क्षेत्र', mobile: 'मोबाइल नंबर' },
  te: { pickup: 'నగరం పేరు', drop: 'గమ్యం నగరం/ప్రాంతం', mobile: 'మొబైల్ నంబర్' },
  kn: { pickup: 'ನಗರದ ಹೆಸರು', drop: 'ಗಮ್ಯಸ್ಥಾನ ನಗರ/ಪ್ರದೇಶ', mobile: 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' },
};

// Populate popular location list dynamically from our robust offline city directory (static cache outside render loop)
const POPULAR_CITIES: LocationSuggestion[] = OFFLINE_CITIES_DATABASE.slice(0, 15).map(city => ({
  display_name: city.name,
  main_text: city.name,
  secondary_text: `${city.tamilName} • ${city.region}`,
  lat: String(city.coords[0]),
  lon: String(city.coords[1])
}));

const BookingForm: React.FC = () => {
  const { t, language, fontClass } = useLanguage();
  const { user } = useAuth();
  const { vehicles: DETAILED_VEHICLES, loading: isPricingLoading } = usePricing();
  
  const isMapsDegraded = true;
  const [manualDistance, setManualDistance] = useState<number>(150); // Default manual fallback distance 150 KM

  const [service, setService] = useState<ServiceType>(ServiceType.ONE_WAY);
  const [pickup, setPickup] = useState('');
  const [drop, setDrop] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [time, setTime] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
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
  
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [pointsRedeemed, setPointsRedeemed] = useState(false);
  const [pointsDiscount, setPointsDiscount] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [showVehicleSelection, setShowVehicleSelection] = useState(false);

  const pickupTimeoutRef = useRef<number | null>(null);
  const dropTimeoutRef = useRef<number | null>(null);

  const isBaseInfoFilled = pickup.trim() !== '' && drop.trim() !== '' && date !== '' && time !== '' && (service !== ServiceType.ROUND_TRIP || returnDate !== '');

  const ph = PLACEHOLDERS[language] || PLACEHOLDERS.en;

  const selectedVehicle = useMemo(() => 
    DETAILED_VEHICLES.find(v => v.id === selectedVehicleId)
  , [selectedVehicleId]);

  const filteredVehicles = useMemo(() => {
    let list = DETAILED_VEHICLES;
    if (service === ServiceType.ONE_WAY) {
      list = list.filter(v => {
        const oneWayPrice = v.pricing.outstation.oneWay;
        return typeof oneWayPrice === 'number' || (typeof oneWayPrice === 'string' && oneWayPrice.toUpperCase() !== "NOT AVAILABLE");
      });
    }
    return list;
  }, [service, DETAILED_VEHICLES]);

  useEffect(() => {
    let timeoutId: number;
    const checkHistory = async () => {
      if (mobile && mobile.length >= 10) {
        const bookings = await BookingService.getUserBookings(mobile);
        setIsFirstBooking(bookings.length === 0);
      }
    };

    if (mobile && mobile.length >= 10) {
      timeoutId = window.setTimeout(() => {
        checkHistory();
      }, 500);
    }
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [mobile]);

  useEffect(() => {
    const fetchCustomer = async () => {
       if (user?.mobile) {
           const c = await CustomerService.getCustomer(user.mobile);
           if (c) setCustomerData(c);
       }
    };
    fetchCustomer();
  }, [user?.mobile]);

  const handleApplyPoints = () => {
    if (!customerData) return;
    const availablePoints = (customerData.total_points || 0) - (customerData.redeemed_points || 0);
    if (availablePoints >= 500 && !pointsRedeemed) {
       // Redeem blocks of 500 points for ₹100 discount
       const blocks = Math.floor(availablePoints / 500);
       setPointsDiscount(blocks * 100);
       setPointsRedeemed(true);
    }
  };

  const handleRemovePoints = () => {
    setPointsDiscount(0);
    setPointsRedeemed(false);
  };

  const getAvailablePoints = () => {
     return customerData ? ((customerData.total_points || 0) - (customerData.redeemed_points || 0)) : 0;
  };

  useEffect(() => {
    if (user && user.mobile) {
      setMobile(user.mobile);
    }
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  // FARE ENGINE: Advanced calculations with offline precision
  useEffect(() => {
    if (!selectedVehicleId || !selectedVehicle) {
      setFareEstimate(null);
      return;
    }

    const currentDist = distanceKm;
    const currentService = service;
    const currentIsMapsDegradedValue = isMapsDegraded;
    const currentPickupCoords = pickupCoords;
    const currentDropCoords = dropCoords;

    const calculateFare = () => {
      // Logic for determining which distance to use
      const primaryDistance = (currentPickupCoords && currentDropCoords && !currentIsMapsDegradedValue) ? currentDist : manualDistance;

      const breakdown = estimatePremiumOfflineFareByVehicle(
        primaryDistance, 
        currentService === ServiceType.ROUND_TRIP, 
        selectedVehicle.name
      );

      let finalAmount = breakdown.minTotal;
      let appliedDiscount = 0;

      if (isPromoValid) {
         appliedDiscount = Math.round(breakdown.minTotal * 0.10); 
      } else if (isReferralValid) {
         appliedDiscount = referralDiscount;
      }

      appliedDiscount += pointsDiscount;

      finalAmount = Math.max(0, breakdown.minTotal - appliedDiscount);

      setFareEstimate(prev => {
        // Prevent update if same values to avoid flickering
        if (prev && 
            prev.amount === finalAmount && 
            prev.discountApplied === appliedDiscount &&
            prev.rangeDisplay === breakdown.rangeDisplay) return prev;
            
        return {
          amount: finalAmount,
          originalAmount: breakdown.minTotal,
          discountApplied: appliedDiscount,
          breakdown: breakdown.breakdownString,
          rangeDisplay: breakdown.rangeDisplay,
          tollEstimate: breakdown.tollEstimate,
          driverBatta: breakdown.driverBatta,
          hillCharges: breakdown.hillCharges,
          nightCharges: breakdown.nightCharges
        };
      });
    };

    calculateFare();
  }, [distanceKm, selectedVehicle, selectedVehicleId, manualDistance, service, referralDiscount, isReferralValid, isPromoValid, promoDiscount, date, returnDate, isMapsDegraded]);

  const calculateDistance = async (lat1: number, lon1: number, lat2: number, lon2: number): Promise<{distance: number, durationText: string, distanceText: string}> => {
    // 1. Calculate Haversine offline distance first (highly optimized, no network)
    const R = 6371; // Earth radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const rawDistance = R * c;
    const drivingEstDistance = Math.round(rawDistance * 1.28); // Adding ~28% buffer to approximate real road-route distance

    const hours = Math.floor(drivingEstDistance / 55); 
    const mins = Math.round(((drivingEstDistance / 52) - hours) * 60);
    const fallbackResult = {
      distance: drivingEstDistance,
      distanceText: `${drivingEstDistance} KM`,
      durationText: `${hours > 0 ? `${hours}h ` : ''}${mins > 0 ? `${mins}m` : '0m'}`
    };

    return fallbackResult;
  };

  // Consolidated City Coordinate Lookup
  useEffect(() => {
    const pKey = pickup.toLowerCase().trim();
    if (pKey) {
      const match = OFFLINE_CITIES_DATABASE.find(c => 
        c.name.toLowerCase() === pKey || 
        c.tamilName.toLowerCase() === pKey
      );
      if (match) {
        setPickupCoords(prev => (prev?.[0] === match.coords[0] && prev?.[1] === match.coords[1] ? prev : match.coords));
      }
    }
  }, [pickup]);

  useEffect(() => {
    const dKey = drop.toLowerCase().trim();
    if (dKey) {
      const match = OFFLINE_CITIES_DATABASE.find(c => 
        c.name.toLowerCase() === dKey || 
        c.tamilName.toLowerCase() === dKey
      );
      if (match) {
        setDropCoords(prev => (prev?.[0] === match.coords[0] && prev?.[1] === match.coords[1] ? prev : match.coords));
      }
    }
  }, [drop]);

  useEffect(() => {
    if (!pickup.trim() || !drop.trim()) {
      setRouteInfo(null);
      setDistanceKm(0);
    }
  }, [pickup, drop]);

  // Decoupled distance calculator: Runs only when coordinates change.
  useEffect(() => {
    const fetchDistance = () => {
      if (pickupCoords && dropCoords) {
        const result = calculateOfflineDistance(pickup, drop, pickupCoords, dropCoords);
        
        setDistanceKm(result.distance);
        setRouteInfo({
          distanceDisplay: result.distanceText,
          durationDisplay: result.durationText
        });
        
        setManualDistance(Math.round(result.distance));
      } else if (pickup.trim() && drop.trim()) {
        const display = `${manualDistance} KM (Est.)`;
        const duration = `${Math.floor(manualDistance / 55)}h ${Math.round(((manualDistance / 55) % 1) * 60)}m`;
        
        setDistanceKm(manualDistance);
        setRouteInfo({
          distanceDisplay: display,
          durationDisplay: duration
        });
      }
    };
    fetchDistance();
  }, [pickupCoords, dropCoords, pickup, drop, manualDistance]);

  // High speed debounced query handler: only updates text, coordinate lookup is decoupled
  const handleSearch = useCallback((query: string, type: 'pickup' | 'drop') => {
    if (type === 'pickup') setPickup(query);
    else setDrop(query);
    
    const trimmedQuery = query.trim();
    const tRef = type === 'pickup' ? pickupTimeoutRef : dropTimeoutRef;
    if (tRef.current) window.clearTimeout(tRef.current);
    
    if (trimmedQuery.length < 1) {
      if (type === 'pickup') { setPickupSuggestions(POPULAR_CITIES); setPickupCoords(null); }
      else { setDropSuggestions(POPULAR_CITIES); setDropCoords(null); }
      return;
    }

    tRef.current = window.setTimeout(() => {
      const offlineResults = searchOfflineSuggestions(trimmedQuery);
      const formattedResults: LocationSuggestion[] = offlineResults.map(city => ({
        display_name: city.name,
        main_text: city.name,
        secondary_text: `${city.tamilName} • ${city.region}`,
        lat: String(city.coords[0]),
        lon: String(city.coords[1])
      }));

      if (type === 'pickup') setPickupSuggestions(formattedResults);
      else setDropSuggestions(formattedResults);
    }, 300);
  }, []);

  const renderHighlightedText = useCallback((text: string, matches?: any[]) => {
    return <span className="opacity-90">{text}</span>;
  }, []);

  const handleSelectSuggestion = useCallback((suggestion: LocationSuggestion, type: 'pickup' | 'drop') => {
    let name = suggestion.display_name.split(',')[0];
    name = name.replace(/District/gi, '').trim();

    if (type === 'pickup') { 
      setPickup(name); 
      setPickupSuggestions([]); 
    } else { 
      setDrop(name); 
      setDropSuggestions([]); 
    }

    // Direct pre-calculated offline coordinates support
    if (suggestion.lat && suggestion.lon) {
      const coords: [number, number] = [parseFloat(suggestion.lat), parseFloat(suggestion.lon)];
      if (type === 'pickup') setPickupCoords(coords);
      else setDropCoords(coords);
    }
  }, []);

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
      const result = await ReferralService.validateCode(referralCode, user?.id, user?.mobile);
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
    setPickup(''); setDrop(''); setDate(''); setReturnDate(''); setTime('');
    if (!user) setMobile('');
    setPickupCoords(null); setDropCoords(null);
    setSelectedVehicleId(null); setService(ServiceType.ONE_WAY); setShowVehicleSelection(false);
    setDistanceKm(0); setFareEstimate(null); setBookingId(null); setRouteInfo(null);
    setReferralCode(''); setIsReferralValid(false); setReferralDiscount(0); 
    setPromoCode(''); setIsPromoValid(false); setPromoDiscount(0);
    setShowOffersInput(false);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("BOOKING BUTTON CLICKED");
    if (isSubmitting) {
       console.log("Blocking: already submitting");
       return;
    }

    if (!isBaseInfoFilled || !selectedVehicleId) {
       console.log("VALIDATION FAILED", { isBaseInfoFilled, selectedVehicleId, service, pickup, drop, date, time });
       if (!isBaseInfoFilled) {
         alert("Please fill in all location and date/time details.");
       } else if (!selectedVehicleId) {
         alert("Please select a vehicle to proceed.");
       }
       return;
    }

    if (!mobile || mobile.trim().length < 10) {
      console.log("VALIDATION FAILED: Mobile length", mobile?.length);
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    console.log("BOOKING SUBMIT STARTED");
    setIsSubmitting(true);
    
    const finalDiscountApplied = fareEstimate?.discountApplied || 0;
    const appliedCode = isPromoValid ? promoCode : (isReferralValid ? referralCode : null);

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
      discountAmount: finalDiscountApplied
    };

    // 1. BACKGROUND DB SAVE
    (async () => {
      try {
        console.log("SUPABASE INSERT START - Payload:", bookingData);
        const result = await BookingService.saveBooking(bookingData);
        if (result.success) {
          console.log("SUPABASE INSERT SUCCESS - ID:", result.bookingId);
          setBookingId(result.bookingId); // Update to the real DB ID
          
          if (user?.mobile) {
              if (pointsRedeemed) { // Consume Redeemed Points
                  const pointsCost = (pointsDiscount / 100) * 500;
                  await ReferralService.redeemPoints(user.mobile, pointsCost);
              }
              // Create or Update Customer, use appliedCode as referred_by. 
              // `createCustomer` automatically handles referral logic if `referred_by` is provided and the customer is new.
              const existingCust = await CustomerService.getCustomer(user.mobile);
              if (!existingCust && appliedCode && !isPromoValid) {
                  // Find referrer mobile by code
                  const { data: refOwner } = await getSupabase().from('customers').select('mobile').eq('referral_code', appliedCode.toUpperCase()).single();
                  await CustomerService.createCustomer({
                     mobile: user.mobile,
                     name: user.name,
                     email: user.email,
                     referred_by: refOwner?.mobile
                  });
              } else if (!existingCust) {
                  await CustomerService.createCustomer({
                     mobile: user.mobile,
                     name: user.name,
                     email: user.email
                  });
              } else {
                  // User exists, just completed a booking, give them points for the booking? (Bonus Points)
                  await CustomerService.updateLoyaltyTier(user.mobile, (existingCust.loyalty_tier === 'Platinum' ? 15 : existingCust.loyalty_tier === 'Gold' ? 5 : 0) + 1); // Mock trip inc
              }
          }
        }
        
        // Email notifications
        const emailjsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const emailjsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const emailjsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
        
        if (emailjsServiceId && emailjsTemplateId && emailjsPublicKey && result.bookingId) {
           const commonParams = {
            to_email: 'geeveetravels3334@gmail.com',
            booking_id: result.bookingId,
            customer_name: user ? user.name : 'Guest',
            mobile: mobile,
            service_type: service,
            pickup_location: pickup,
            drop_location: drop,
            pickup_date: date,
            pickup_time: time,
            vehicle: selectedVehicle?.name,
            price: fareEstimate?.amount
           };
           emailjs.send(emailjsServiceId, emailjsTemplateId, commonParams, emailjsPublicKey).catch(() => {});
        }
      } catch (err) {
        console.error("BACKGROUND BOOKING ERROR:", err);
      } finally {
        setIsSubmitting(false);
      }
    })();

    // 2. Prepare WhatsApp Message
    // Use a temporary ID for WhatsApp if the real one isn't back yet, or just generic
    const msgBookingId = `GEE-${Date.now().toString().slice(-6)}`;
    const msg = `*Booking Order ✅*\n*Geevee Travels*\n\nService: ${service}\nPickup: ${pickup}\nDrop: ${drop}\nDate: ${date}\nTime: ${time}${service === ServiceType.ROUND_TRIP ? `\nReturn: ${returnDate}` : ''}\nVehicle: ${selectedVehicle?.name}\nCost: ₹${fareEstimate?.amount}\nMobile: ${mobile}\nRef ID: ${msgBookingId}`;
    const waUrl = `https://wa.me/91${WHATSAPP_BOOKING_NUMBER}?text=${encodeURIComponent(msg)}`;

    // 3. TRIGGER ACTIONS (Instant for user)
    console.log("WHATSAPP REDIRECT");
    window.open(waUrl, '_blank');
    setIsSuccess(true);
  };

  if (isSuccess) return (
    <div className="bg-[#0B0F1A] border border-[#D4AF37]/20 rounded-[2.5rem] md:rounded-[3.5rem] p-8 sm:p-16 md:p-24 text-center shadow-[0_24px_64px_-16px_rgba(0,0,0,0.6)] max-w-5xl mx-auto animate-in zoom-in duration-500 relative overflow-hidden">
      {/* Cinematic Lighting Refraction & Sunset Glow Backlight */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent opacity-40 pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/15 via-transparent to-transparent opacity-80 mix-blend-color-dodge z-0 animate-slow-pulse pointer-events-none"></div>

      <div className="relative z-10">
        <div className="w-28 h-28 bg-[#D4AF37]/10 text-[#D4AF37] rounded-[2rem] flex items-center justify-center mx-auto mb-10 border border-[#D4AF37]/25 shadow-[0_15px_30px_rgba(212,175,55,0.15)] animate-[pulse_2s_infinite]">
          <CheckCircle2 size={56} />
        </div>
        <h2 className="text-3xl md:text-5xl font-normal text-white mb-6 tracking-tight font-serif italic" style={{ fontFamily: 'var(--font-serif)' }}>
          Booking Confirmed <span className="text-luxury-gold-soft italic font-normal">Successfully</span>
        </h2>
        <div className="inline-block bg-white/5 border border-white/10 px-6 py-2.5 rounded-xl mb-8">
           <p className="text-[#D4AF37] font-mono font-bold tracking-widest text-xs uppercase">Booking ID: <span className="text-white font-sans">{bookingId}</span></p>
        </div>
        <p className="text-[#D1D5DB] text-xl font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
          {t.booking.successDesc}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a 
            href={`https://wa.me/91${WHATSAPP_BOOKING_NUMBER}?text=${encodeURIComponent('Hi GVDROPTAXI, I just made a booking with ID: ' + (bookingId || ''))}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white px-12 py-5 rounded-2xl font-bold text-lg transition-all shadow-xl hover:shadow-2xl active:scale-95 flex items-center justify-center gap-3 w-full md:w-auto"
          >
            <MessageSquare size={20} /> Open WhatsApp Chat
          </a>
          <button 
            onClick={handleReset}
            className="bg-white/5 hover:bg-white/10 text-white px-8 py-5 rounded-2xl font-bold text-sm transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 w-full md:w-auto border border-white/10"
          >
            <RefreshCcw size={16} /> Book Another
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div 
      id="booking-form"
      className="relative transform-gpu animate-slide-up"
    >
      {/* Frosted glass form container */}
      <div className="relative rounded-[2.5rem] md:rounded-[3rem] p-8 lg:p-12 xl:p-16 shadow-[0_32px_80px_rgba(0,0,0,0.6)] max-w-7xl mx-auto transform-gpu transition-all duration-1000 bg-gradient-to-b from-[#111827]/85 via-[#0B0F1A]/95 to-[#0B0F1A] backdrop-blur-xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/45 shadow-[0_0_50px_rgba(212,175,55,0.05)]">
        
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-transparent opacity-45 pointer-events-none z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent opacity-80 z-0 animate-pulse-soft pointer-events-none"></div>

        <form id="booking-form-primary" onSubmit={handleBooking} className="flex flex-col lg:flex-row gap-12 lg:gap-16 relative z-10">
          {/* Left Side: Form Controls */}
          <div className="flex-grow lg:w-7/12">
            <div className="mb-10 md:mb-12">
              <h2 className={`text-4xl md:text-6xl text-white ${fontClass} tracking-tight mb-4`} style={{ fontFamily: 'var(--font-serif)' }}>
                Secure <span className="text-luxury-gold-soft italic font-normal">Your Journey</span>
              </h2>
              <p className="text-[#9CA3AF] font-medium text-lg">
                {t.hero.bookNow || "Experience premium custom travel planning tailored to your destination."}
              </p>
              {isMapsDegraded && (
                <div className="inline-flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-mono font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse"></span>
                  Geev Travel Premium South-India Directory Active
                </div>
              )}
            </div>

            
            {/* Service Type Toggles */}
            <div className="flex bg-white/5 backdrop-blur-lg p-1.5 md:p-2 rounded-2xl md:rounded-[2rem] gap-1.5 md:gap-2 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.2)] mb-10 md:mb-12 w-full sm:w-fit">
              {[ServiceType.ONE_WAY, ServiceType.ROUND_TRIP].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => { setService(st); setSelectedVehicleId(null); setFareEstimate(null); }}
                  className={`flex-1 sm:flex-none px-4 md:px-8 py-3.5 md:py-4 rounded-xl md:rounded-[1.5rem] text-[10px] md:text-[11px] font-black uppercase tracking-[0.25em] transition-all duration-500 ${service === st ? 'bg-gradient-to-r from-[#D4AF37] to-[#B38E22] text-[#040812] shadow-[0_10px_25px_-5px_rgba(212,175,55,0.3)] scale-105' : 'text-[#9CA3AF] hover:text-white'}`}
                >
                  {st === ServiceType.ONE_WAY ? t.booking.onewaydrop : t.booking.roundtrip}
                </button>
              ))}
            </div>

            <div className="space-y-8 md:space-y-10 relative z-10">
              {/* Location Inputs with Suggestions - Grid Refactoring for Compactness */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 relative">
                <div className="relative group z-30">
                  <div className="flex items-center justify-between mb-2 md:mb-4 ml-2">
                    <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] font-mono">Departure Vector</label>
                    <AnimatePresence>
                      {pickupCoords && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          className="text-[#D4AF37] flex items-center gap-1 text-[8px] font-bold uppercase tracking-tighter"
                        >
                          <Check size={10} strokeWidth={3} /> Verified
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative">
                    <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all duration-500 group-focus-within:scale-110 z-10 pointer-events-none">
                      {isSearchingPickup ? <Loader2 className="animate-spin w-5 h-5 md:w-6 md:h-6 text-[#BF953F]" /> : <MapPin className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                    <input 
                      type="text" 
                      value={pickup}
                      onChange={(e) => handleSearch(e.target.value, 'pickup')}
                      onFocus={(e) => handleSearch(e.target.value, 'pickup')}
                      onBlur={() => setTimeout(() => setPickupSuggestions([]), 300)}
                      placeholder={ph.pickup}
                      autoComplete="off"
                      className={`w-full bg-white/5 border ${pickupCoords ? 'border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/10' : 'border-white/10'} focus:border-[#D4AF37]/50 focus:ring-4 focus:ring-[#D4AF37]/5 rounded-xl md:rounded-[1.75rem] py-4 md:py-6 pl-14 md:pl-16 pr-10 md:pr-12 font-bold text-white outline-none transition-all text-sm md:text-base placeholder-[#9CA3AF]/60 focus:shadow-[0_0_40px_rgba(212,175,55,0.15)] backdrop-blur-sm`}
                    />
                    {pickup && (
                      <button 
                         type="button" 
                         onClick={() => { setPickup(''); setPickupCoords(null); setPickupSuggestions(POPULAR_CITIES); }}
                         className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 text-[#9CA3AF] hover:text-[#D4AF37] transition-colors z-10"
                      >
                         <X size={16} />
                      </button>
                    )}
                    <SuggestionList 
                      suggestions={pickupSuggestions} 
                      onSelect={(s) => handleSelectSuggestion(s, 'pickup')} 
                      renderHighlight={renderHighlightedText} 
                    />
                  </div>
                </div>

                <div className="relative group z-20">
                  <div className="flex items-center justify-between mb-2 md:mb-4 ml-2">
                    <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] font-mono">Destination Point</label>
                    <AnimatePresence>
                      {dropCoords && (
                        <motion.span 
                          initial={{ scale: 0, opacity: 0 }} 
                          animate={{ scale: 1, opacity: 1 }} 
                          className="text-[#D4AF37] flex items-center gap-1 text-[8px] font-bold uppercase tracking-tighter"
                        >
                          <Check size={10} strokeWidth={3} /> Target Locked
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="relative">
                    <div className="absolute left-5 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all duration-500 group-focus-within:scale-110 z-10 pointer-events-none">
                      {isSearchingDrop ? <Loader2 className="animate-spin w-5 h-5 md:w-6 md:h-6 text-[#BF953F]" /> : <Navigation className="w-5 h-5 md:w-6 md:h-6" />}
                    </div>
                    <input 
                      type="text" 
                      value={drop}
                      onChange={(e) => handleSearch(e.target.value, 'drop')}
                      onFocus={(e) => handleSearch(e.target.value, 'drop')}
                      onBlur={() => setTimeout(() => setDropSuggestions([]), 300)}
                      placeholder={ph.drop}
                      autoComplete="off"
                      className={`w-full bg-white/5 border ${dropCoords ? 'border-[#D4AF37]/40 ring-1 ring-[#D4AF37]/10' : 'border-white/10'} focus:border-[#D4AF37]/50 focus:ring-4 focus:ring-[#D4AF37]/5 rounded-xl md:rounded-[1.75rem] py-4 md:py-6 pl-14 md:pl-16 pr-10 md:pr-12 font-bold text-white outline-none transition-all text-sm md:text-base placeholder-[#9CA3AF]/60 focus:shadow-[0_0_40px_rgba(212,175,55,0.15)] backdrop-blur-sm`}
                    />
                    {drop && (
                      <button 
                        type="button" 
                        onClick={() => { setDrop(''); setDropCoords(null); setDropSuggestions(POPULAR_CITIES); }}
                        className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 p-2 text-[#9CA3AF] hover:text-[#D4AF37] transition-colors z-10"
                      >
                        <X size={16} />
                      </button>
                    )}
                    <SuggestionList 
                      suggestions={dropSuggestions} 
                      onSelect={(s) => handleSelectSuggestion(s, 'drop')} 
                      renderHighlight={renderHighlightedText} 
                    />
                  </div>
                </div>
              </div>

              {/* Compact Grid for Mobile: Date and Time on one row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
                <div className="col-span-1 relative group">
                  <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-2 md:mb-4 ml-2 font-mono">Launch Date</label>
                  <div className="relative">
                    <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all"><Calendar size={16} /></div>
                    <input 
                      type="date" 
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`w-full bg-white/5 border ${date ? 'border-[#D4AF37]/30' : 'border-white/10'} focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 rounded-xl md:rounded-[1.5rem] py-4 md:py-6 pl-12 md:pl-16 pr-4 font-bold text-white outline-none transition-all text-[11px] md:text-sm uppercase tracking-wider backdrop-blur-sm`}
                    />
                  </div>
                </div>
                <div className="col-span-1 relative group">
                  <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-2 md:mb-4 ml-2 font-mono">Time Slot</label>
                  <div className="relative">
                    <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all"><Clock size={16} /></div>
                    <input 
                      type="time" 
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className={`w-full bg-white/5 border ${time ? 'border-[#D4AF37]/30' : 'border-white/10'} focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 rounded-xl md:rounded-[1.5rem] py-4 md:py-6 pl-12 md:pl-16 pr-4 font-bold text-white outline-none transition-all text-[11px] md:text-sm uppercase tracking-wider backdrop-blur-sm`}
                    />
                  </div>
                </div>
                {service === ServiceType.ROUND_TRIP ? (
                  <div className="col-span-1 relative group">
                    <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-2 md:mb-4 ml-2 font-mono">Return Sync</label>
                    <div className="relative">
                      <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all"><Calendar size={16} /></div>
                      <input 
                        type="date" 
                        value={returnDate}
                        min={date}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className={`w-full bg-white/5 border ${returnDate ? 'border-[#D4AF37]/30' : 'border-white/10'} focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 rounded-xl md:rounded-[1.5rem] py-4 md:py-6 pl-12 md:pl-16 pr-4 font-bold text-white outline-none transition-all text-[11px] md:text-sm uppercase tracking-wider backdrop-blur-sm`}
                      />
                    </div>
                  </div>
                ) : null}
                <div className={`${service === ServiceType.ROUND_TRIP ? 'col-span-1' : 'col-span-2 sm:col-span-1'} relative group`}>
                  <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-2 md:mb-4 ml-2 font-mono">Mobile Link</label>
                  <div className="relative">
                    <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all"><Phone size={16} /></div>
                    <input 
                      type="tel" 
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder={ph.mobile}
                      className={`w-full bg-white/5 border ${mobile.length === 10 ? 'border-[#D4AF37]/30' : 'border-white/10'} focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 rounded-xl md:rounded-[1.5rem] py-4 md:py-6 pl-12 md:pl-16 pr-4 font-bold text-white outline-none transition-all text-[11px] md:text-sm backdrop-blur-sm`}
                    />
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 relative group">
                  <label className="block text-[9px] md:text-[10px] font-bold text-[#D4AF37] uppercase tracking-[0.35em] mb-2 md:mb-4 ml-2 font-mono">Email (Optional)</label>
                  <div className="relative">
                    <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#9CA3AF] group-focus-within:text-[#D4AF37] transition-all"><Mail size={16} /></div>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="For booking confirmation"
                      className={`w-full bg-white/5 border ${email.includes('@') ? 'border-[#D4AF37]/30' : 'border-white/10'} focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 rounded-xl md:rounded-[1.5rem] py-4 md:py-6 pl-12 md:pl-16 pr-4 font-bold text-white outline-none transition-all text-[11px] md:text-sm backdrop-blur-sm`}
                    />
                  </div>
                </div>
              </div>

              {/* Collapsible Vehicle Selection */}
              {isBaseInfoFilled && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                  <div 
                    className={`bg-white/5 border-2 ${selectedVehicleId ? 'border-[#D4AF37]/60 shadow-[0_20px_50px_rgba(212,175,55,0.15)]' : 'border-white/10 hover:border-[#D4AF37]/35'} rounded-3xl p-6 md:p-8 cursor-pointer transition-all duration-500 group relative overflow-hidden`}
                    onClick={() => setShowVehicleSelection(!showVehicleSelection)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <div className={`p-4 rounded-2xl transition-all duration-700 ${selectedVehicleId ? 'bg-[#D4AF37] text-[#040812] shadow-2xl scale-110' : 'bg-white/5 text-[#9CA3AF] border border-white/10'}`}>
                          <Car size={28} />
                        </div>
                        <div>
                          <span className="block text-[11px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-1 font-mono">Executive Fleet</span>
                          <h4 className={`text-xl md:text-2xl font-serif italic ${selectedVehicleId ? 'text-white' : 'text-[#9CA3AF]'}`}>
                            {selectedVehicle?.name || t.booking.selectVehicle}
                          </h4>
                        </div>
                      </div>
                      <div className={`transition-all duration-700 flex items-center justify-center w-10 h-10 bg-white/5 border border-white/10 rounded-full shadow-lg ${showVehicleSelection ? 'rotate-180 bg-[#D4AF37] text-[#040812]' : 'text-[#9CA3AF] group-hover:scale-110 group-hover:border-[#D4AF37]/45'}`}>
                        <ChevronDown size={20} />
                      </div>
                    </div>
                  </div>

                  <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${showVehicleSelection ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-4 font-sans">
                        {isPricingLoading ? (
                          <div className="col-span-full py-20 flex flex-col items-center justify-center text-[#9CA3AF]">
                             <Loader2 size={32} className="animate-spin mb-4 text-[#D4AF37]" />
                             <p className="text-[10px] font-mono font-bold uppercase tracking-[0.3em]">Loading Premium Fleet...</p>
                          </div>
                        ) : filteredVehicles.map((v) => (
                          <div 
                            key={v.id}
                            onClick={() => handleVehicleSelect(v.id)}
                            className={`group relative p-4 md:p-6 rounded-3xl border-2 cursor-pointer transition-all duration-500 hover:-translate-y-1 ${selectedVehicleId === v.id ? 'border-[#D4AF37]/80 bg-[#D4AF37]/10 shadow-2xl shadow-[#D4AF37]/10' : 'border-white/10 bg-white/5 hover:border-[#D4AF37]/40 hover:bg-white/10'}`}
                          >
                            <div className="flex flex-col gap-3 md:gap-4">
                              <div className="flex justify-between items-start">
                                <h5 className="font-serif text-white italic text-base md:text-lg tracking-tight group-hover:text-[#D4AF37] transition-colors">{v.name}</h5>
                                <div className={`p-1.5 md:p-2 rounded-lg md:rounded-xl transition-all duration-500 ${selectedVehicleId === v.id ? 'bg-[#D4AF37] text-[#040812] shadow-lg' : 'bg-white/5 text-[#9CA3AF] group-hover:text-[#D4AF37] group-hover:bg-[#D4AF37]/10'}`}>
                                  <Car size={14} className="md:w-4 md:h-4" />
                                </div>
                              </div>
                              <div className="space-y-1">
                                 <div className="flex items-center gap-2 md:gap-3">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]"></span>
                                    <p className="text-[8px] md:text-[9px] font-mono font-bold text-[#9CA3AF] uppercase tracking-[0.3em]">{v.capacity} Seats{v.type === 'SUV' && ' • Elite'}</p>
                                 </div>
                                 <p className="text-lg md:text-xl font-normal text-[#FCF6BA] tracking-tight font-serif italic">₹{service === ServiceType.ONE_WAY ? v.pricing.outstation.oneWay : v.pricing.outstation.roundTrip}<span className="text-[9px] md:text-[10px] text-[#9CA3AF] font-mono ml-1 uppercase">/km</span></p>
                              </div>
                            </div>
                            {selectedVehicleId === v.id && (
                               <div className="absolute top-3 right-3 md:top-4 md:right-4 animate-in zoom-in duration-500">
                                  <div className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] text-[#040812] p-1 rounded-full shadow-lg"><Check size={10} className="md:w-3 md:h-3" /></div>
                                </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trust Indicators for Mobile */}
              <div className="lg:hidden flex flex-wrap items-center justify-between gap-3 mt-4 mb-2 pt-4 border-t border-white/5 opacity-80 px-2">
                 <div className="flex items-center gap-1.5 text-[9px] text-[#FCF6BA] font-mono tracking-widest uppercase font-bold">
                   <CheckCircle2 size={12} className="text-[#D4AF37]" /> Secure
                 </div>
                 <div className="flex items-center gap-1.5 text-[9px] text-[#FCF6BA] font-mono tracking-widest uppercase font-bold">
                   <CheckCircle2 size={12} className="text-[#D4AF37]" /> Verified
                 </div>
                 <div className="flex items-center gap-1.5 text-[9px] text-[#FCF6BA] font-mono tracking-widest uppercase font-bold">
                   <CheckCircle2 size={12} className="text-[#D4AF37]" /> 24/7 Support
                 </div>
              </div>

              {/* Gold Premium Submit CTA for Mobile */}
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="lg:hidden w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:from-[#FCF6BA] hover:via-[#BF953F] hover:to-[#FCF6BA] text-[#040812] py-6 rounded-[1.5rem] md:rounded-2xl font-black text-base disabled:opacity-45 disabled:cursor-not-allowed flex items-center justify-center gap-4 group active:scale-[0.98] uppercase tracking-[0.3em] shadow-[0_15px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] transition-all duration-500"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin text-[#040812]" size={24} /> Sending Booking...
                  </>
                ) : (
                  <>
                    {t.booking.confirm} <ArrowRight size={20} className="group-hover:translate-x-3 transition-transform duration-500 text-[#040812]" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Side: Summary & Valuation (5/12 width or fixed equivalent) */}
          <div className="lg:w-5/12 flex flex-col gap-8">
            {selectedVehicleId && fareEstimate ? (
              <div className="sticky top-32 space-y-8 animate-in fade-in slide-in-from-right-12 duration-1000">
                <div className="bg-[#040812] text-white rounded-[3rem] p-10 md:p-12 relative overflow-hidden shadow-[0_48px_128px_-16px_rgba(0,0,0,0.6)] border border-[#D4AF37]/25 group transition-all duration-700 min-h-[500px] flex flex-col justify-between">
                  {/* Glowing highlights inside dynamic valuation summary card */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/10 via-transparent to-transparent opacity-40 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none z-0"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-[#D4AF37]/10 via-transparent to-transparent opacity-80 mix-blend-color-dodge pointer-events-none animate-slow-pulse z-0"></div>
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-1000 z-0 pointer-events-none"><Calculator size={200} /></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-5 mb-8">
                      <div className="bg-white/5 p-4 rounded-2xl border border-white/10"><Calculator size={24} className="text-[#D4AF37]" /></div>
                      <span className="text-[10px] font-mono font-black text-[#9CA3AF] uppercase tracking-[0.5em] z-10">Valuation Certificate</span>
                    </div>

                    <div className="space-y-8 mb-12">
                         <div>
                          <p className="text-[10px] font-mono font-bold text-[#9CA3AF] uppercase tracking-[0.3em] mb-4">Route Metrics</p>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[#D4AF37]/20 transition-all text-center">
                                <Navigation size={14} className="text-[#D4AF37] mx-auto mb-2" />
                                <div className="h-7 display-flex items-center justify-center">
                                  {isCalculatingRoute ? <Loader2 size={16} className="animate-spin text-[#D4AF37] mx-auto opacity-70" /> : <p className="text-xl font-serif text-[#FCF6BA] italic">{routeInfo?.distanceDisplay || '--'}</p>}
                                </div>
                                <p className="text-[9px] font-mono font-bold text-[#9CA3AF] uppercase mt-2">Distance</p>
                             </div>
                             <div className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-[#D4AF37]/20 transition-all text-center">
                                <Clock size={14} className="text-[#D4AF37] mx-auto mb-2" />
                                <div className="h-7 display-flex items-center justify-center">
                                  {isCalculatingRoute ? <Loader2 size={16} className="animate-spin text-[#D4AF37] mx-auto opacity-70" /> : <p className="text-xl font-serif text-[#FCF6BA] italic">{routeInfo?.durationDisplay || '--'}</p>}
                                </div>
                                <p className="text-[9px] font-mono font-bold text-[#9CA3AF] uppercase mt-2">Est. Duration</p>
                             </div>
                          </div>
                       </div>

                       <div>
                        {pickup.trim() && drop.trim() && (!pickupCoords || !dropCoords || isMapsDegraded) && (
                           <div className="bg-white/5 border border-white/5 hover:border-[#D4AF37]/35 rounded-[2rem] p-6 mb-8 text-left transition-all">
                             <div className="flex justify-between items-center mb-3">
                               <label className="text-[10px] font-mono font-bold text-[#D4AF37] uppercase tracking-[0.25em]">Custom Distance</label>
                               <span className="text-[#FCF6BA] font-serif italic text-lg">{manualDistance} KM</span>
                             </div>
                             <input 
                               type="range" 
                               min="20" 
                               max="800" 
                               step="5"
                               value={manualDistance} 
                               onChange={(e) => setManualDistance(Number(e.target.value))}
                               className="w-full accent-[#D4AF37] cursor-pointer bg-white/10 rounded-lg appearance-none h-1"
                             />
                             <div className="flex justify-between text-[8px] text-[#9CA3AF] font-mono mt-2 uppercase tracking-wide">
                               <span>20 KM</span>
                               <span>Slide to adjust fare</span>
                               <span>800 KM</span>
                             </div>
                           </div>
                        )}
                        <p className="text-[10px] font-mono font-gray-500 uppercase tracking-[0.3em] mb-2">Protocol Details</p>
                          {isCalculatingRoute ? <div className="h-10 w-full animate-pulse bg-white/5 rounded-lg"></div> : (
                            <div className="space-y-4">
                              <p className="text-sm text-slate-300 leading-relaxed italic opacity-85 whitespace-pre-line">{fareEstimate?.breakdown || 'Awaiting route selection...'}</p>
                              {fareEstimate?.amount ? (
                                <div className="flex flex-wrap gap-2 text-[8px] font-mono font-bold text-[#FCF6BA] uppercase tracking-widest mt-2">
                                  {fareEstimate?.driverBatta ? (
                                    <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">Driver Batta: ₹{fareEstimate.driverBatta}/day</span>
                                  ) : <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">Driver Batta: Extra</span>}
                                  {fareEstimate?.tollEstimate ? (
                                    <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">Est. Tollway: ~₹{fareEstimate.tollEstimate}</span>
                                  ) : <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">Tolls: Extra</span>}
                                  {fareEstimate?.hillCharges ? (
                                    <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">Hill Station Charge: Included</span>
                                  ) : null}
                                  {fareEstimate?.nightCharges ? (
                                    <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">Night Charge: Included</span>
                                  ) : null}
                                  <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-2 py-1 rounded">No State Permits & Tolls Pre-paid</span>
                                </div>
                              ) : null}
                            </div>
                          )}
                       </div>
                    </div>
                  </div>

                  <div className="relative z-10 border-t border-white/10 pt-10 mt-auto">
                    {fareEstimate?.discountApplied ? (
                         <div className="space-y-4">
                            <div className="flex justify-between items-end">
                               <span className="text-sm text-slate-400 font-mono font-bold uppercase tracking-widest opacity-60">Valuation:</span>
                               <span className="text-2xl text-slate-500 line-through font-serif italic">₹{fareEstimate.originalAmount}</span>
                            </div>
                            <div className="flex justify-between items-end">
                               <span className="text-sm text-[#D4AF37] font-mono font-bold uppercase tracking-widest">Digital Gain:</span>
                               <span className="text-xl text-green-400 font-bold">-₹{fareEstimate.discountApplied}</span>
                            </div>
                            <div className="flex justify-between items-end pt-6">
                               <span className="text-[11px] font-mono font-bold text-[#9CA3AF] uppercase tracking-[0.4em]">Est. Fare Range (Discounted)</span>
                               <span className="text-4xl md:text-5xl lg:text-5xl font-normal text-[#FCF6BA] tracking-tight drop-shadow-[0_0_35px_rgba(212,175,55,0.25)] font-serif italic">{fareEstimate.rangeDisplay || `₹${fareEstimate.amount}`}</span>
                            </div>
                         </div>
                      ) : (
                         <div className="flex justify-between items-end">
                            <div>
                               <p className="text-[10px] text-slate-400 font-mono font-bold uppercase tracking-[0.5em] mb-4">Ultimate Range (Est.)</p>
                               <span className="text-4xl md:text-5xl lg:text-5xl font-normal text-[#FCF6BA] tracking-tight font-serif italic drop-shadow-[0_0_35px_rgba(212,175,55,0.25)]">{fareEstimate?.rangeDisplay ? fareEstimate.rangeDisplay : (fareEstimate?.amount ? `₹${fareEstimate.amount}` : '--')}</span>
                            </div>
                         </div>
                      )}
                      
                      {/* Trust Indicators */}
                      <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/5 opacity-80">
                         <div className="flex items-center gap-1.5 text-[9px] text-[#FCF6BA] font-mono tracking-widest uppercase font-bold">
                           <CheckCircle2 size={12} className="text-[#D4AF37]" /> Secure Booking
                         </div>
                         <div className="flex items-center gap-1.5 text-[9px] text-[#FCF6BA] font-mono tracking-widest uppercase font-bold">
                           <CheckCircle2 size={12} className="text-[#D4AF37]" /> Verified Drivers
                         </div>
                         <div className="flex items-center gap-1.5 text-[9px] text-[#FCF6BA] font-mono tracking-widest uppercase font-bold">
                           <CheckCircle2 size={12} className="text-[#D4AF37]" /> 24/7 Support
                         </div>
                      </div>

                      {/* Premium Gold CTA for Desktop */}
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="hidden lg:flex w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:from-[#FCF6BA] hover:via-[#BF953F] hover:to-[#FCF6BA] text-[#040812] py-6 rounded-2xl font-black text-xs uppercase tracking-[0.25em] transition-all duration-500 mt-10 items-center justify-center gap-4 group shadow-[0_15px_30px_rgba(212,175,55,0.25)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)]"
                      >
                         {isSubmitting ? <><Loader2 className="animate-spin text-[#040812]" size={20} /> SENDING BOOKING...</> : <>{t.booking.confirm} <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform text-[#040812]" /></>}
                      </button>
                  </div>
                </div>

                {/* Coupon Access Toggle styled as beautiful frosted metal */}
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8">
                   <button 
                     type="button" 
                     onClick={() => setShowOffersInput(!showOffersInput)}
                     className="w-full flex items-center justify-between text-[11px] font-mono font-black uppercase tracking-[0.4em] text-[#9CA3AF] hover:text-[#D4AF37] transition-colors"
                   >
                     <div className="flex items-center gap-3">
                        <TicketPercent size={18} className="text-[#D4AF37]" />
                        Apply Exclusive Privilege
                     </div>
                     {showOffersInput ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                   </button>
                   
                   {showOffersInput && (
                     <div className="mt-8 space-y-4 animate-in slide-in-from-top-4 duration-500 font-sans">
                        <div className="flex gap-2">
                           <input 
                             type="text" 
                             placeholder="PROMO ARCHIVE" 
                             value={promoCode}
                             onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                             disabled={isReferralValid}
                             className="flex-grow bg-[#040812] border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase outline-none focus:border-[#D4AF37]/60 text-white placeholder-slate-600 focus:ring-2 focus:ring-[#D4AF37]/20"
                           />
                           <button type="button" onClick={handleApplyPromo} className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:scale-105 active:scale-95 text-[#040812] px-6 py-4.5 rounded-xl font-bold text-[10px] uppercase transition-all shadow-[0_5px_15px_rgba(212,175,55,0.15)] flex items-center justify-center">Verify</button>
                        </div>
                        <div className="flex gap-2">
                           <input 
                             type="text" 
                             placeholder="AFFILIATE LINK" 
                             value={referralCode}
                             onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                             disabled={isPromoValid}
                             className="flex-grow bg-[#040812] border border-white/10 p-4 rounded-xl text-[10px] font-black uppercase outline-none focus:border-[#D4AF37]/60 text-white placeholder-slate-600 focus:ring-2 focus:ring-[#D4AF37]/20"
                           />
                           <button type="button" onClick={handleApplyReferral} className="bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:scale-105 active:scale-95 text-[#040812] px-6 py-4.5 rounded-xl font-bold text-[10px] uppercase transition-all shadow-[0_5px_15px_rgba(212,175,55,0.15)] flex items-center justify-center">Verify</button>
                        </div>
                        {isPromoValid && <p className="text-[9px] text-green-400 font-mono font-bold uppercase tracking-widest text-center">FIRST10 Integrated</p>}
                        {isReferralValid && <p className="text-[9px] text-green-400 font-mono font-bold uppercase tracking-widest text-center">Legacy Credit Validated</p>}

                        {user && getAvailablePoints() > 0 && (
                            <div className="pt-4 border-t border-white/10 mt-4">
                                <p className="text-[9px] text-[#D4AF37] font-bold uppercase tracking-[0.2em] mb-3 text-center">Rewards Wallet</p>
                                <div className="flex items-center justify-between bg-[#040812] p-4 rounded-xl border border-white/5">
                                    <div>
                                        <p className="text-white font-bold text-xs">{getAvailablePoints()} Points Available</p>
                                        <p className="text-[9px] text-slate-500 uppercase tracking-widest mt-1">500 PTS = ₹100 OFF</p>
                                    </div>
                                    {getAvailablePoints() >= 500 ? (
                                        pointsRedeemed ? (
                                            <button type="button" onClick={handleRemovePoints} className="px-4 py-2 bg-red-900/40 text-red-400 rounded-lg text-[9px] font-black uppercase tracking-widest border border-red-900/50 hover:bg-red-900/60 transition-colors">REMOVE OFF</button>
                                        ) : (
                                            <button type="button" onClick={handleApplyPoints} className="px-4 py-2 bg-[#D4AF37] text-[#040812] rounded-lg text-[9px] font-black uppercase tracking-widest border border-[#D4AF37] hover:brightness-110 transition-colors shadow-sm">REDEEM NOW</button>
                                        )
                                    ) : (
                                        <div className="px-4 py-2 bg-white/5 text-slate-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-white/5">NOT ENOUGH</div>
                                    )}
                                </div>
                                {pointsRedeemed && <p className="text-[9px] text-green-400 font-mono font-bold uppercase tracking-widest text-center mt-3">₹{pointsDiscount} Points Discount Applied</p>}
                            </div>
                        )}
                     </div>
                   )}
                </div>
              </div>
            ) : (
              <div className="h-full bg-white/5 border border-white/10 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center opacity-80 min-h-[400px]">
                 <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center mb-8"><Calculator size={32} className="text-[#D4AF37]/60" /></div>
                 <p className="text-[11px] font-mono font-black uppercase tracking-[0.5em] text-[#D4AF37]">Valuation Awaiting Parameters</p>
                 <p className="text-sm font-medium text-[#D1D5DB] mt-4 max-w-[200px]">Complete the journey vectors to calculate final valuation</p>
              </div>
            )}
          </div>
        </form>

        <div className="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-700 mt-16">
           <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent"></div>
           <p className="text-center text-[10px] font-mono font-bold text-slate-400 uppercase tracking-[0.6em]">
              Geevee Travels Premium Luxury Logistics
           </p>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
