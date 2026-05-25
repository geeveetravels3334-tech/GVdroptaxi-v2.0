import React, { useState, useEffect, useRef } from 'react';
import { Star, Quote, Send, User, MessageSquare, CheckCircle, MapPin, Loader2, ChevronDown, ChevronUp, PenTool, ChevronLeft, ChevronRight, Check, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext.tsx';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  archiveId: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    name: 'Anirudh S.',
    role: 'Chennai to Pondicherry',
    text: 'The travel experience was absolute perfection. The luxury SUV was immaculately maintained, driver details were shared well in advance, and the ride was exceptionally smooth. A true standard of premium custom travel.',
    rating: 5,
    date: '2 days ago',
    archiveId: '#TR-8842'
  },
  {
    name: 'Priya Raman',
    role: 'Airport Lounge Executive',
    text: 'Our corporate travel is fully managed through their premium fleet. For our high-profile clients arriving at Chennai International, they consistently deliver stellar punctuality, pristine hospitality, and matchless class.',
    rating: 5,
    date: '1 week ago',
    archiveId: '#TR-9120'
  },
  {
    name: 'Karthik Raja',
    role: 'Mahabalipuram Explorer',
    text: 'The scenic coastal drive was breathtaking. Excellent luxury suspension, premium climate zones, and a highly courteous chauffeur who knew the heritage routes perfectly. Truly a presidential transport experience.',
    rating: 5,
    date: '2 weeks ago',
    archiveId: '#TR-7751'
  },
  {
    name: 'Sarah Jenkins',
    role: 'Privileged Leisure Client',
    text: 'A flawless luxury travel booking from start to finish. Punctual airport transfer, transparent premium fares, and high-end vehicle ride comfort. Our weekend excursion was extraordinarily special.',
    rating: 5,
    date: '3 weeks ago',
    archiveId: '#TR-6310'
  },
  {
    name: 'Dr. Vignesh Kumar',
    role: 'Corporate Fleet Partner',
    text: 'Reliability and style are hard to pair together. This elite outstation service has consistently exceeded all our high corporate standards. Easily the most reliable premium chauffeured fleet in South India.',
    rating: 5,
    date: '1 month ago',
    archiveId: '#TR-1044'
  }
];

const Testimonials: React.FC = () => {
  const { fontClass } = useLanguage();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [isAutoplayActive, setIsAutoplayActive] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Feedback form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);

  // Autoplay handler
  useEffect(() => {
    if (isAutoplayActive && !isFormExpanded) {
      autoplayTimerRef.current = setInterval(() => {
        handleNextSlide();
      }, 7000);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplayActive, currentIndex, isFormExpanded, reviews.length]);

  const handlePrevSlide = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const handleSelectSlide = (idx: number) => {
    setSlideDirection(idx > currentIndex ? 'right' : 'left');
    setCurrentIndex(idx);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !text) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedArchiveId = `#TR-${Math.floor(1000 + Math.random() * 9000)}`;
      const newReview: Review = {
        name,
        role: role || 'Prestigious Client',
        text,
        rating,
        date: 'Just now',
        archiveId: generatedArchiveId
      };
      
      const updatedReviews = [newReview, ...reviews];
      setReviews(updatedReviews);
      setIsSubmitting(false);
      setSubmitted(true);
      setCurrentIndex(0); // View the newly submitted review immediately
      
      setTimeout(() => {
        setSubmitted(false);
        setIsFormExpanded(false);
        setName(''); 
        setRole(''); 
        setText(''); 
        setRating(5);
      }, 3000);
    }, 1500);
  };

  const activeReview = reviews[currentIndex];

  return (
    <div id="testimonials-section" className="container mx-auto px-4 max-w-7xl py-24 md:py-36 relative overflow-hidden">
      
      {/* Background Decorative Lighting Refractory Orbs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-slate-200/50 dark:bg-[#0C1E38]/20 blur-[150px] rounded-full pointer-events-none z-0"></div>

      {/* Grid Overlay Texture Matching Hero style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0"></div>

      {/* Redesigned Section Heading with Cinematic Glow and Luxury Badging */}
      <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto space-y-6 relative z-10">
        <div className="flex items-center justify-center gap-4">
           <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
           <span className="text-[10px] md:text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.45em] font-mono flex items-center gap-2">
             <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
             Discerning Narratives
           </span>
           <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
        </div>
        
        <h2 className={`text-4xl md:text-7xl font-normal text-slate-900 dark:text-white mb-6 tracking-tight ${fontClass}`} style={{ fontFamily: 'var(--font-serif)' }}>
          Voice of <span className="text-[#D4AF37] italic font-normal">Distinction</span>
        </h2>
        
        <p className="text-slate-600 dark:text-[#D1D5DB] text-base md:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
          Authentic testimonies from our most select corporate partners and global travelers who recognize unparalleled bespoke transport logistics.
        </p>
      </div>

      {/* Main Luxury Slider Carousel Workspace */}
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* autoplays progress indicator line on bottom side of title */}
        <div 
          className="relative glass-card rounded-[2.5rem] md:rounded-[3.5rem] p-8 sm:p-12 md:p-16 shadow-xl dark:shadow-[0_45px_135px_rgba(0,0,0,0.65)] hover:shadow-[0_45px_135px_rgba(212,175,55,0.1)] border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/45 transition-all duration-500 bg-white dark:bg-gradient-to-b dark:from-[#0C1E38]/85 dark:via-[#040812]/95 dark:to-[#040812] backdrop-blur-3xl overflow-hidden group min-h-[380px] flex flex-col justify-between premium-hover-lift cursor-pointer luxury-click"
          onMouseEnter={() => setIsAutoplayActive(false)}
          onMouseLeave={() => setIsAutoplayActive(true)}
        >
          {/* Subtle Dynamic Gold Light Halo following active review change */}
          <div className="absolute -top-24 -left-24 w-80 h-80 bg-[#D4AF37]/5 blur-[70px] rounded-full pointer-events-none group-hover:bg-[#D4AF37]/8 transition-all duration-1000"></div>
          
          {/* Elegant Oversized Line-art Quote Icon */}
          <Quote className="absolute top-10 right-10 stroke-1 stroke-[#D4AF37] text-transparent opacity-[0.05] group-hover:opacity-[0.12] transition-opacity duration-1000 pointer-events-none animate-slow-pulse" size={140} />

          <div className="relative z-10 flex-grow flex flex-col justify-between">
            {/* Slide Body Container with custom motion wrapper */}
            <div className="overflow-visible relative mb-8 md:mb-12">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ 
                    opacity: 0, 
                    x: slideDirection === 'right' ? 70 : -70,
                    scale: 0.98
                  }}
                  animate={{ 
                    opacity: 1, 
                    x: 0,
                    scale: 1
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: slideDirection === 'right' ? -70 : 70,
                    scale: 0.98
                  }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 md:space-y-8"
                >
                  {/* Rating Stars and Passport Status Badge */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    {/* Backlit Gold Star Rating Badge */}
                    <div className="flex gap-1.5 bg-[#D4AF37]/5 px-4 py-2 rounded-full border border-[#D4AF37]/20 w-fit">
                      {[...Array(5)].map((_, idx) => (
                        <Star 
                          key={idx} 
                          size={15} 
                          fill={idx < activeReview.rating ? '#D4AF37' : 'none'} 
                          className={idx < activeReview.rating ? 'text-[#D4AF37] filter drop-shadow-[0_0_5px_rgba(212,175,55,0.4)]' : 'text-white/10'} 
                        />
                      ))}
                    </div>

                    {/* Passport Travel Segment Badge */}
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-[9px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">
                      <MapPin size={10} className="text-[#D4AF37]" />
                      Route Verified
                    </div>
                  </div>

                  {/* Testimonial Core Quote */}
                   <div className="relative pl-6 sm:pl-8 border-l-2 border-[#D4AF37]/30 group-hover:border-[#D4AF37]/60 transition-colors duration-700">
                    <p className={`text-slate-800 dark:text-[#D1D5DB] text-lg sm:text-2xl md:text-3xl font-light leading-relaxed italic ${fontClass}`} style={{ fontFamily: 'var(--font-serif)' }}>
                      "{activeReview.text}"
                    </p>
                  </div>

                  {/* Customer Information Signature Footer */}
                  <div className="flex items-center gap-4 sm:gap-6 pt-4">
                    {/* Initials badge framed with elite details */}
                    <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] p-[1.5px] shadow-[0_10px_20px_rgba(212,175,55,0.15)]">
                      <div className="w-full h-full rounded-2xl bg-slate-100 dark:bg-[#040812] flex items-center justify-center text-[#D4AF37] dark:text-[#FCF6BA] font-serif italic text-xl font-bold">
                        {activeReview.name.charAt(0)}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">{activeReview.name}</h4>
                        <CheckCircle size={14} className="text-[#D4AF37]" />
                      </div>
                      <p className="text-[10px] font-bold text-slate-500 dark:text-[#9CA3AF] uppercase tracking-widest">{activeReview.role}</p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination Controls and Progress Grid Container */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-slate-200 dark:border-white/10 z-20">
              <div className="flex items-center gap-4">
                {/* Visual Digital Counter */}
                <span className="font-mono text-xs text-[#D4AF37] font-bold uppercase tracking-wider">
                  Archive {activeReview.archiveId}
                </span>
                <span className="h-4 w-[1px] bg-slate-200 dark:bg-white/10"></span>
                <span className="font-mono text-xs text-slate-500 dark:text-[#9CA3AF]">
                  <span className="text-[#D4AF37] dark:text-[#FCF6BA] font-bold">{(currentIndex + 1).toString().padStart(2, '0')}</span> / {reviews.length.toString().padStart(2, '0')}
                </span>
              </div>

              {/* Slider Progress Bar */}
              <div className="w-full sm:w-48 h-[3px] bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden relative">
                <div 
                  className="h-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] transition-all duration-500 ease-out shadow-[0_0_8px_rgba(212,175,55,0.6)]"
                  style={{ width: `${((currentIndex + 1) / reviews.length) * 100}%` }}
                ></div>
              </div>

              {/* Chevrons Layout */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handlePrevSlide}
                  aria-label="Previous Slide" 
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 focus:outline-none flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] active:scale-95 luxury-click group"
                >
                  <div className="group-hover:-translate-x-0.5 transition-transform duration-300">
                    <ChevronLeft size={18} />
                  </div>
                </button>
                <button 
                  onClick={handleNextSlide}
                  aria-label="Next Slide" 
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-300 hover:text-[#D4AF37] hover:border-[#D4AF37]/50 focus:outline-none flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_15px_rgba(212,175,55,0.15)] active:scale-95 luxury-click group"
                >
                  <div className="group-hover:translate-x-0.5 transition-transform duration-300">
                    <ChevronRight size={18} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Navigation Dot Carousel Row */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === currentIndex ? 'w-8 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.5)]' : 'w-2 bg-white/10 hover:bg-white/20'}`}
              aria-label={`Select review slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Collapsible Privilege Form Section for Logging traveler narrative */}
        <div className="mt-12 text-center">
          <button 
            onClick={() => {
              if (!submitted) {
                setIsFormExpanded(!isFormExpanded);
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-slate-200 dark:border-white/10 hover:border-[#D4AF37]/40 bg-slate-100 dark:bg-white/5 hover:bg-[#D4AF37]/10 text-slate-800 dark:text-white hover:text-[#D4AF37] dark:hover:text-[#FCF6BA] font-bold text-xs uppercase tracking-[0.25em] transition-all duration-500 shadow-xl active:scale-95 group luxury-click"
          >
            <div className="icon-hover-shift transition-transform duration-300">
              <PenTool size={14} className="text-[#D4AF37]" />
            </div>
            {isFormExpanded ? 'Close Form Gate' : 'Log Your Traveler Experience'}
            <ChevronDown size={14} className={`transform-gpu transition-transform duration-500 ${isFormExpanded ? 'rotate-180 text-[#FCF6BA]' : 'text-slate-400 group-hover:translate-y-0.5'}`} />
          </button>

          {/* Form Area Wrapper */}
          <AnimatePresence>
            {isFormExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <div className="relative rounded-[2rem] p-8 sm:p-10 md:p-12 shadow-[0_24px_72px_rgba(0,0,0,0.1)] dark:shadow-[0_24px_72px_rgba(0,0,0,0.5)] border border-slate-200 dark:border-white/10 bg-white dark:bg-gradient-to-b dark:from-[#0C1E38]/80 dark:to-[#040812] backdrop-blur-2xl text-left max-w-2xl mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none rounded-[2rem]"></div>
                  
                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-12 text-center space-y-6"
                    >
                      <div className="w-20 h-20 bg-[#D4AF37]/10 text-[#D4AF37] rounded-3xl flex items-center justify-center mx-auto border border-[#D4AF37]/25 shadow-2xl animate-pulse">
                        <Check size={36} />
                      </div>
                      <h4 className="text-2xl font-serif italic text-[#D4AF37] dark:text-[#FCF6BA]">Journey Synchronized</h4>
                      <p className="text-slate-600 dark:text-slate-300 text-sm max-w-sm mx-auto leading-relaxed">
                        Your traveler narrative has been successfully captured and indexed into our prestigious digital catalog archives. Thank you for traveling with us.
                      </p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                      <div className="space-y-2">
                        <h3 className="text-xl text-slate-800 dark:text-white font-serif italic">Privilege Feed Channel</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono uppercase tracking-widest">Digital Authentication Requested</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative group">
                          <label className="block text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 ml-1">Signature Identifier</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#D4AF37] transition-all"><User size={14} /></span>
                            <input 
                              required 
                              type="text" 
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              placeholder="e.g., ANIRUDH S."
                              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:ring-4 focus:ring-[#D4AF37]/10"
                            />
                          </div>
                        </div>

                        <div className="relative group">
                          <label className="block text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider mb-2 ml-1">Trajectory Channel</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#D4AF37] transition-all"><MapPin size={14} /></span>
                            <input 
                              type="text" 
                              value={role}
                              onChange={(e) => setRole(e.target.value)}
                              placeholder="e.g., CHENNAI EXECUTIVE"
                              className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:ring-4 focus:ring-[#D4AF37]/10"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Interactive Premium Backlit Star Rating Selector */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider ml-1">Prestige Rating</label>
                        <div className="flex gap-3 bg-slate-50 dark:bg-white/5 px-6 py-3.5 rounded-xl border border-slate-200 dark:border-white/10 w-fit">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              onMouseEnter={() => setHoverRating(star)}
                              onMouseLeave={() => setHoverRating(0)}
                              className="transition-all active:scale-75 hover:scale-125 focus:outline-none"
                              aria-label={`Rate ${star} star`}
                            >
                              <Star 
                                size={22} 
                                fill={star <= (hoverRating || rating) ? '#D4AF37' : 'none'} 
                                className={star <= (hoverRating || rating) ? 'text-[#D4AF37] filter drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]' : 'text-slate-300 dark:text-slate-700'}
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="block text-[9px] font-mono font-bold text-[#D4AF37] uppercase tracking-wider ml-1">Narrative Experience Log</label>
                        <div className="relative group">
                          <span className="absolute left-4 top-4 text-slate-500 group-focus-within:text-[#D4AF37] transition-all"><MessageSquare size={14} /></span>
                          <textarea 
                            required 
                            rows={4}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="TELL US ABOUT THE COMPOSURE AND SERVICE RELIABILITY..."
                            className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 focus:border-[#D4AF37] rounded-xl py-3.5 pl-11 pr-4 text-xs font-medium tracking-wide text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none transition-all focus:ring-4 focus:ring-[#D4AF37]/10 resize-none uppercase"
                          ></textarea>
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] hover:from-[#FCF6BA] hover:via-[#BF953F] hover:to-[#FCF6BA] text-[#040812] py-4 rounded-xl font-bold text-xs uppercase tracking-[0.25em] transition-all duration-500 shadow-[0_10px_20px_rgba(212,175,55,0.2)] active:scale-[0.97] flex items-center justify-center gap-3 focus:outline-none hover-glow-gold luxury-click group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 size={16} className="animate-spin text-[#040812]" /> Processing Transmission...
                          </>
                        ) : (
                          <>
                            <Send size={14} className="text-[#040812]" /> Deploy Traveler Manifest
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default Testimonials;
