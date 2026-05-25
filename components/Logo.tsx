
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

  const LogoSVG = ({ isLight }: { isLight: boolean }) => {
    const primaryColor = "#C5A059"; // Signature Gold
    const deepNavy = "#050B14";
    const textColor = isLight ? "#FFFFFF" : deepNavy;

    return (
      <svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <defs>
          <linearGradient id="signatureGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#C5A059', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#E6D5B8', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#A88444', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Decorative Monogram Shield */}
        <g transform="translate(20, 25)">
          <path 
            d="M 50,0 L 100,20 L 100,80 C 100,110 50,130 50,130 C 50,130 0,110 0,80 L 0,20 Z" 
            fill="url(#signatureGoldGradient)" 
            opacity="0.1"
          />
          <path 
            d="M 50,2 L 95,20 L 95,78 C 95,105 50,125 50,125 C 50,125 5,105 5,78 L 5,20 Z" 
            fill="none" 
            stroke="url(#signatureGoldGradient)" 
            strokeWidth="3"
          />
          <text 
            x="50" 
            y="85" 
            textAnchor="middle" 
            fill="url(#signatureGoldGradient)" 
            className="tracking-tighter"
            style={{ 
              fontSize: '60px', 
              fontWeight: 900, 
              fontFamily: '"Outfit", sans-serif',
            }}
          >
            GV
          </text>
        </g>

        {/* Brand Typography */}
        <g transform="translate(140, 85)">
          <text 
            x="0" 
            y="0" 
            fill={textColor} 
            style={{ 
              fontSize: '52px', 
              fontWeight: 900, 
              fontFamily: '"Outfit", sans-serif', 
              letterSpacing: '-2px',
              textTransform: 'uppercase'
            }}
          >
            GV
          </text>
          <text 
            x="75" 
            y="0" 
            fill="url(#signatureGoldGradient)" 
            style={{ 
              fontSize: '52px', 
              fontWeight: 900, 
              fontFamily: '"Outfit", sans-serif', 
              letterSpacing: '-2px',
              textTransform: 'uppercase'
            }}
          >
            DROPTAXI
          </text>
          
          <text 
            x="2" 
            y="30" 
            fill={textColor} 
            style={{ 
              fontSize: '11px', 
              fontWeight: 900, 
              fontFamily: '"Outfit", sans-serif', 
              letterSpacing: '0.6em',
              textTransform: 'uppercase',
              opacity: 0.5
            }}
          >
            SIGNATURE COLLECTION • EST 2012
          </text>
        </g>
      </svg>
    );
  };

  const LogoContent = () => {
    return <LogoSVG isLight={isLight} />;
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
          className="fixed inset-0 z-[200] bg-[#0B1F3A]/95 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in zoom-in duration-300"
          onClick={() => setIsBig(false)}
        >
          <button className="absolute top-12 right-12 text-white hover:text-luxury-gold transition-colors group" aria-label="Close Logo Preview">
            <X size={48} className="group-hover:rotate-90 transition-transform" />
          </button>
          <div className="w-full max-w-5xl aspect-video flex items-center justify-center">
            <LogoSVG isLight={true} />
          </div>
        </div>
      )}
    </>
  );
};

export default Logo;
