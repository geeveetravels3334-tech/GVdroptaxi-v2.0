
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface LogoProps {
  className?: string;
  isLight?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "w-20 h-20", isLight = false }) => {
  const [isBig, setIsBig] = useState(false);

  useEffect(() => {
    if (isBig) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isBig]);

  const LogoContent = () => {
    const [imgError, setImgError] = useState(false);
    
    if (imgError) {
      return (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-geevee-orange rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform">G</div>
          <div className="flex flex-col">
            <span className="font-black text-2xl tracking-tighter text-slate-900 dark:text-white leading-none">Geevee</span>
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-geevee-orange mt-1">Travels</span>
          </div>
        </div>
      );
    }

    return (
      <img 
        src="/logo.png" 
        className="w-full h-full object-contain"
        alt="Geevee Travels Logo"
        onError={() => setImgError(true)}
      />
    );
  };

  return (
    <>
      <div 
        className={`${className} cursor-pointer hover:scale-105 transition-all duration-300 relative group active:scale-95 flex items-center justify-center`}
        onClick={() => setIsBig(true)}
      >
        <LogoContent />
      </div>

      {isBig && (
        <div 
          className="fixed inset-0 z-[200] bg-slate-950/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in zoom-in duration-300"
          onClick={() => setIsBig(false)}
        >
          <button className="absolute top-12 right-12 text-white hover:text-geevee-orange transition-colors group" aria-label="Close Logo Preview">
            <X size={48} className="group-hover:rotate-90 transition-transform" />
          </button>
          <div className="w-full max-w-5xl aspect-video flex items-center justify-center">
            <img 
              src="/logo.png" 
              className="max-w-full max-h-full object-contain drop-shadow-[0_0_50px_rgba(243,112,33,0.3)]"
              alt="Geevee Travels Logo Large"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
