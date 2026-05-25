import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Crown, Compass, Sparkles } from 'lucide-react';
import Logo from './Logo';

// Pre-configured particles for cinematic background drift - reduced for performance
const PARTICLES = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 1,
  x: Math.random() * 100,
  y: Math.random() * 100,
  duration: Math.random() * 12 + 8,
  delay: Math.random() * -10,
  opacity: Math.random() * 0.3 + 0.1,
}));

const Preloader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Preparing Your Premium Journey');

  useEffect(() => {
    // Elegant organic progress simulation
    const startTime = Date.now();
    const duration = 3200; // Perfect length for cinematic introduction

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / duration) * 100, 100);
      
      // Fine-grained easing for loading feeling
      const easedProgress = Math.floor(pct);
      setProgress(easedProgress);

      if (easedProgress >= 100) {
        setStatusText('Ready For Departure');
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } else if (easedProgress > 80) {
        setStatusText('Designing Bespoke Route...');
      } else if (easedProgress > 55) {
        setStatusText('Selecting Premium Fleet...');
      } else if (easedProgress > 30) {
        setStatusText('Securing Private Concierge...');
      } else {
        setStatusText('Preparing Your Premium Journey');
      }

      if (elapsed < duration) {
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {};
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            scale: 1.02,
            filter: 'blur(10px)',
            transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[200] bg-[#040812] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Depth Radial Overlay and Ambient Lighting */}
          <div className="absolute inset-0 bg-radial-vignette opacity-90 z-0" />
          
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {/* Deep Signature Amber Glow */}
            <motion.div 
              animate={{
                scale: [1, 1.15, 0.95, 1],
                opacity: [0.15, 0.22, 0.18, 0.15],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-[10%] left-[20%] w-[65vw] h-[65vw] bg-[#D4AF37]/8 blur-[130px] rounded-full"
            />
            {/* Deep Royal Navy Backlight */}
            <motion.div 
              animate={{
                scale: [1, 0.9, 1.1, 1],
                opacity: [0.12, 0.18, 0.14, 0.12],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2
              }}
              className="absolute bottom-[15%] right-[15%] w-[55vw] h-[55vw] bg-blue-500/5 blur-[150px] rounded-full"
            />
          </div>

          {/* Drifting Golden Embers */}
          <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
            {PARTICLES.map((p) => (
              <motion.div
                key={p.id}
                className="absolute bg-gradient-to-br from-[#FCF6BA]/40 to-[#BF953F]/40 rounded-full"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  opacity: p.opacity,
                  filter: 'blur(0.5px)',
                }}
                animate={{
                  y: ['0vh', '-110vh'],
                  x: [`0px`, `${Math.sin(p.id) * 40}px`],
                  opacity: [0, p.opacity, p.opacity, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: p.delay,
                }}
              />
            ))}
          </div>

          {/* Subtle concentric compass grid rings */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none z-0">
            <div className="w-[500px] h-[500px] border border-white rounded-full animate-[spin_180s_infinite_linear]" />
            <div className="absolute w-[350px] h-[350px] border border-dashed border-[#D4AF37] rounded-full animate-[spin_100s_infinite_linear_reverse]" />
            <div className="absolute w-[200px] h-[200px] border border-white rounded-full animate-[spin_50s_infinite_linear]" />
          </div>

          {/* Central Glassmorphic Cinematic Stage */}
          <div className="relative z-20 flex flex-col items-center">
            
            {/* Elegant glass shield containing branding */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="px-12 py-16 md:px-20 md:py-24 rounded-[3rem] bg-gradient-to-b from-[#081326]/30 to-[#040812]/50 border border-white/[0.04] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl flex flex-col items-center max-w-[90vw] md:max-w-xl mx-auto relative group overflow-hidden"
            >
              {/* Premium Top border highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
              {/* Luxury reflection swipe animation over the card container */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full animate-light-swipe pointer-events-none" />

              {/* Shimmering Metallic Gold Logo Container */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="mb-14 relative"
              >
                {/* Background gold glow flare under the logo */}
                <div className="absolute inset-0 bg-[#D4AF37]/10 filter blur-[35px] rounded-full scale-95 animate-slow-pulse lg:block hidden pointer-events-none" />
                
                {/* Shiny metallic sweep layer */}
                <div className="relative group overflow-hidden rounded-xl">
                  <Logo className="w-64 h-16 md:w-80 md:h-20 drop-shadow-[0_4px_24px_rgba(212,175,55,0.15)] filter saturate-110" isLight={true} />
                  
                  {/* Subtle sweep line */}
                  <motion.div 
                    animate={{
                      left: ['-100%', '200%']
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      repeatDelay: 1.5
                    }}
                    className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] pointer-events-none"
                  />
                </div>
              </motion.div>

              {/* Bespoke Cinematic Progression block */}
              <div className="flex flex-col items-center gap-8 w-full">
                
                {/* Signature Emblem & Header Title */}
                <div className="flex items-center gap-3">
                  <Compass size={14} className="text-[#D4AF37]/60 animate-[spin_10s_infinite_linear]" />
                  <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[1em] leading-none select-none">
                    Signature
                  </span>
                  <Crown size={14} className="text-[#D4AF37]/60 animate-pulse" />
                </div>

                {/* Laser-Thin Premium Loading Bar */}
                <div className="w-56 md:w-72 h-[1px] bg-white/[0.07] rounded-full relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeOut' }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] shadow-[0_0_8px_rgba(252,246,186,0.6)]"
                  />
                  {/* Gold Sparkle Flare tracking leading edge of loaded bar */}
                  <motion.div 
                    style={{ left: `${Math.max(0, progress - 2)}%` }}
                    className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full text-white filter blur-[1px] shadow-[0_0_8px_#FCF6BA] pointer-events-none"
                  />
                </div>
                
                {/* Status and Text */}
                <div className="flex flex-col items-center gap-2">
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={statusText}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="text-[#FCF6BA] text-[11px] md:text-xs font-medium uppercase tracking-[0.5em] text-center select-none will-change-transform transform-gpu"
                      style={{ transform: 'translate3d(0,0,0)' }}
                    >
                      {statusText}
                    </motion.div>
                  </AnimatePresence>
                  
                  <div className="text-white/20 text-[9px] font-bold uppercase tracking-[0.3em] font-mono">
                    {progress}%
                  </div>
                </div>

              </div>
            </motion.div>
          </div>

          {/* Bottom Luxury Signature Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="absolute bottom-16 md:bottom-20 flex flex-col items-center gap-4 z-20 pointer-events-none select-none"
          >
            <div className="h-px w-14 bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent"></div>
            <div className="flex items-center gap-2">
              <Sparkles size={8} className="text-[#D4AF37]/50 animate-pulse" />
              <span className="text-white/25 text-[8px] font-black uppercase tracking-[0.6em]">The Heritage Collection</span>
              <Sparkles size={8} className="text-[#D4AF37]/50 animate-pulse" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
