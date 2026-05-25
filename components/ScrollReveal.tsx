import React, { useState, useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  duration?: number;
  scale?: boolean;
  blur?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.8,
  scale = true,
  blur = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 768);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '-50px 0px',
        threshold: 0.02
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    // Fallback: If for some reason the observer doesn't fire, ensure content becomes visible
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
    };
  }, []);

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100 scale-100';
    
    // Low performance offset fallback for mobile viewports
    if (isMobile) {
      const scaleStr = scale ? 'scale-[0.99]' : 'scale-100';
      switch (direction) {
        case 'up': return `translate-y-2 opacity-0 ${scaleStr} translate3z(0)`;
        case 'down': return `-translate-y-2 opacity-0 ${scaleStr} translate3z(0)`;
        case 'left': return `translate-x-2 opacity-0 ${scaleStr} translate3z(0)`;
        case 'right': return `-translate-x-2 opacity-0 ${scaleStr} translate3z(0)`;
        case 'none': return `opacity-0 ${scaleStr} translate3z(0)`;
        default: return `translate-y-2 opacity-0 ${scaleStr} translate3z(0)`;
      }
    }

    const scaleStr = scale ? 'scale-[0.98]' : 'scale-100';
    switch (direction) {
      case 'up': return `translate-y-8 opacity-0 ${scaleStr} translate3z(0)`;
      case 'down': return `-translate-y-8 opacity-0 ${scaleStr} translate3z(0)`;
      case 'left': return `translate-x-8 opacity-0 ${scaleStr} translate3z(0)`;
      case 'right': return `-translate-x-8 opacity-0 ${scaleStr} translate3z(0)`;
      case 'none': return `opacity-0 ${scaleStr} translate3z(0)`;
      default: return `translate-y-8 opacity-0 ${scaleStr} translate3z(0)`;
    }
  };

  const style: React.CSSProperties = {
    transitionProperty: 'transform, opacity',
    transitionDuration: `${duration}s`,
    transitionDelay: `${delay}s`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    willChange: 'transform, opacity',
    transform: isVisible ? 'translate3d(0, 0, 0) scale(1)' : undefined,
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`transition-all transform-gpu will-change-[transform,opacity] ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};


