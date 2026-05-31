import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MapPin, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

interface ActivityItem {
  id: string;
  type: 'booking' | 'confirm' | 'dispatch' | 'completed';
  message: string;
  sub: string;
  time: string;
}

const ACTIVITIES: ActivityItem[] = [
  {
    id: 'act-1',
    type: 'booking',
    message: 'New premium dispatch requested',
    sub: 'Chennai International Airport to Pondicherry',
    time: 'Just now',
  },
  {
    id: 'act-2',
    type: 'confirm',
    message: 'Elite ride scheduled & confirmed',
    sub: 'Bespoke corporate tour • Toyota Innova Crysta',
    time: '2 mins ago',
  },
  {
    id: 'act-3',
    type: 'dispatch',
    message: 'Private chauffeur assigned',
    sub: 'Premium route via ECR Scenic Highway mapped',
    time: '5 mins ago',
  },
  {
    id: 'act-4',
    type: 'completed',
    message: 'Bespoke journey completed seamlessly',
    sub: 'Madurai Heritage Tour • Toyota Fortuner',
    time: '12 mins ago',
  },
  {
    id: 'act-5',
    type: 'booking',
    message: 'New luxury booking received',
    sub: 'Pondicherry French Quarter to Chennai OMR',
    time: '15 mins ago',
  },
  {
    id: 'act-6',
    type: 'confirm',
    message: 'VIP Transfer Secured',
    sub: 'Elite Airport Chauffeur Service confirmed',
    time: '18 mins ago',
  },
];

const LiveBookingNotification: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Initial entrance delay
    const initialDelay = setTimeout(() => {
      setVisible(true);
    }, 6000); // Appear shortly after preloader completes

    // Cycle activity loop with smooth transitions
    const interval = setInterval(() => {
      setVisible(false);
      
      // Wait for exit animation, then update index and fade in the next activity
      setTimeout(() => {
        setCurrentIdx((prev) => (prev + 1) % ACTIVITIES.length);
        setVisible(true);
      }, 800);

    }, 11000); // Display each for 11 seconds

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  const currentActivity = ACTIVITIES[currentIdx];

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'booking':
        return <Sparkles className="text-[#D4AF37] w-4.5 h-4.5" />;
      case 'confirm':
        return <CheckCircle2 className="text-[#FCF6BA] w-4.5 h-4.5" />;
      case 'dispatch':
        return <Compass className="text-[#BF953F] w-4.5 h-4.5" />;
      case 'completed':
        return <ShieldCheck className="text-emerald-400 w-4.5 h-4.5" />;
      default:
        return <MapPin className="text-[#D4AF37] w-4.5 h-4.5" />;
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] max-w-[90vw] w-[380px] pointer-events-none select-none hide-on-keyboard-mobile">
      <AnimatePresence mode="wait">
        {visible && currentActivity && (
          <motion.div
            key={currentActivity.id}
            initial={{ opacity: 0, scale: 0.9, y: 35, x: 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0, 
              x: 0,
              transition: { 
                type: 'spring',
                stiffness: 100,
                damping: 18,
                mass: 1,
              }
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.93, 
              y: -20, 
              transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
            }}
            className="pointer-events-auto bg-gradient-to-r from-[#081326]/95 via-[#040812]/98 to-[#0C1E38]/95 border border-[#D4AF37]/25 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.65)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.12)] backdrop-blur-xl relative overflow-hidden transition-all duration-700 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/[0.015] before:to-transparent before:pointer-events-none"
          >
            {/* Top golden borders */}
            <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/45 to-transparent" />
            <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            {/* Glowing spot */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/4 filter blur-[25px] rounded-full pointer-events-none animate-slow-pulse" />

            <div className="flex gap-4 items-start relative z-10">
              {/* Luxury Icon Shield */}
              <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center shrink-0 shadow-inner group relative">
                <div className="absolute inset-0 bg-[#D4AF37]/5 blur-sm rounded-xl opacity-40 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  {getIcon(currentActivity.type)}
                </div>
              </div>

              {/* Message Block */}
              <div className="flex-grow min-w-0 pr-2">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-white/40 text-[9px] font-bold uppercase tracking-[0.25em] font-mono shrink-0">
                    Live Dispatch Activity
                  </span>
                  <span className="text-[#D4AF37]/75 text-[9px] font-bold uppercase tracking-wider font-mono">
                    {currentActivity.time}
                  </span>
                </div>
                
                <h4 className="text-slate-100 font-bold text-[13px] tracking-tight mb-0.5 leading-snug">
                  {currentActivity.message}
                </h4>
                
                <p className="text-slate-400 font-medium text-[11px] leading-relaxed truncate">
                  {currentActivity.sub}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveBookingNotification;
