
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image as ImageIcon, AlertCircle } from 'lucide-react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  objectPosition?: string;
}

const RELIABLE_FALLBACKS = [
  "https://images.unsplash.com/photo-1582510945154-159670050853?auto=format&fit=crop&q=60&w=800", // Marina Beach
  "https://images.unsplash.com/photo-1621682372775-533449e5502c?auto=format&fit=crop&q=60&w=800", // Ooty
  "https://images.unsplash.com/photo-1624386445963-7140f0c0ae2f?auto=format&fit=crop&q=60&w=800", // Kodaikanal
  "https://images.unsplash.com/photo-1582510003544-5243788d9d0d?auto=format&fit=crop&q=60&w=800", // Madurai
];

const OptimizedImage: React.FC<OptimizedImageProps> = ({ 
  src, 
  alt, 
  fallbackSrc,
  className = "",
  containerClassName = "relative overflow-hidden bg-slate-100 dark:bg-slate-900/50",
  aspectRatio,
  objectFit = "cover",
  objectPosition = "center"
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [displayedSrc, setDisplayedSrc] = useState(src);
  const [fallbackLevel, setFallbackLevel] = useState(0);

  // Synchronize internal source when prop changes
  useEffect(() => {
    if (src !== currentSrc) {
      setCurrentSrc(src);
      setIsLoaded(false);
      setIsError(false);
      setFallbackLevel(0);
    }
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    setDisplayedSrc(currentSrc);
    setIsError(false);
  };

  const handleError = () => {
    // Attempt fallback logic
    if (fallbackLevel === 0 && fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
      setFallbackLevel(1);
    } else {
      const idx = fallbackSrc ? fallbackLevel - 1 : fallbackLevel;
      if (idx < RELIABLE_FALLBACKS.length) {
        setCurrentSrc(RELIABLE_FALLBACKS[idx]);
        setFallbackLevel(prev => prev + 1);
      } else {
        setIsError(true);
        setIsLoaded(false);
      }
    }
  };

  const fitClass = objectFit === "cover" ? "object-cover" : "object-contain";

  // Is this the initial load (no displayed image yet)?
  const isInitialLoad = !displayedSrc;

  return (
    <div 
      className={`relative ${containerClassName}`} 
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <AnimatePresence>
        {!isLoaded && isInitialLoad && !isError && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div className="w-8 h-8 border-2 border-slate-200 dark:border-white/10 border-t-geevee-orange rounded-full animate-spin" />
          </motion.div>
        )}
        {isError && (
          <motion.div
            key="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900"
          >
            <AlertCircle size={24} className="text-slate-300 dark:text-slate-700 mb-2" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Image Unavailable</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background loading of the target image */}
      {currentSrc && currentSrc !== displayedSrc && !isError && (
        <img
          src={currentSrc}
          alt=""
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-px h-px opacity-0 pointer-events-none"
          style={{ visibility: 'hidden' }}
        />
      )}

      {/* Main visible image rendering */}
      {displayedSrc && !isError && (
        <img
          key={displayedSrc}
          src={displayedSrc}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full transition-opacity duration-300 ease-out ${fitClass} ${className}`}
          style={{ 
            objectPosition,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)'
          }}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
