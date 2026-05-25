import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseAlpha: number;
  alpha: number;
  alphaSpeed: number;
  speedY: number;
  speedOdor: number; // phase shift for wobble
  wobbleSpeed: number;
  wobbleRange: number;
  depth: number; // 3D depth layer
  color: string;
}

const GoldParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Handle high DPI displays for retina sharpness
    const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle density: proportional to viewport size, but capped for optimal performance
    const maxParticles = Math.min(35, Math.floor((width * height) / 35000));
    const particles: Particle[] = [];

    const goldHues = [
      'rgba(212, 175, 55, ', // #D4AF37 Metallic Gold
      'rgba(252, 246, 186, ', // #FCF6BA Champagne High-light
      'rgba(191, 149, 63, ',  // #BF953F Dark Gold
      'rgba(250, 218, 94, ',  // Royal Amber
    ];

    const createParticle = (isInitial = false): Particle => {
      const depth = Math.random() * 0.8 + 0.2; // 0.2 to 1.0 (depth layers)
      const size = (Math.random() * 2 + 0.6) * depth;
      const hueTemplate = goldHues[Math.floor(Math.random() * goldHues.length)];
      
      return {
        x: Math.random() * width,
        y: isInitial ? Math.random() * height : height + 20,
        size,
        baseAlpha: Math.random() * 0.3 + 0.1,
        alpha: 0, // start at 0 and fade in to prevent sudden pops
        alphaSpeed: Math.random() * 0.01 + 0.003,
        speedY: (Math.random() * 0.35 + 0.15) * depth * -1, // moves upwards
        speedOdor: Math.random() * 100,
        wobbleSpeed: Math.random() * 0.01 + 0.005,
        wobbleRange: Math.random() * 1.5 + 0.5,
        depth,
        color: hueTemplate,
      };
    };

    // Initialize initial batch
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // Parallax mouse tracker
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = (e.clientX - width / 2) * 0.05;
      mouseRef.current.targetY = (e.clientY - height / 2) * 0.05;
      mouseRef.current.active = true;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Fade factor for initial loading screen overlay transition
    let globalFadeIn = 0;

    const animate = () => {
      // Clear with soft trails for organic movement persistence
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.03; // dampened for stability
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      if (globalFadeIn < 1) {
        globalFadeIn += 0.005; // gracefully fade in component over 3-4 seconds
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Animate soft glow respiration (alpha breathing)
        p.speedOdor += p.wobbleSpeed;
        const currentWobble = Math.sin(p.speedOdor) * p.wobbleRange;
        
        // Soft alpha pulse
        const targetAlpha = p.baseAlpha * (0.7 + Math.sin(p.speedOdor) * 0.3);
        p.alpha += (targetAlpha - p.alpha) * 0.1;

        // Apply velocities & Parallax mouse drift according to layer depth
        const parallaxX = mouse.active ? mouse.x * p.depth : 0;
        const parallaxY = mouse.active ? mouse.y * p.depth : 0;

        p.y += p.speedY;
        const animatedX = p.x + currentWobble + parallaxX;
        const animatedY = p.y + parallaxY;

        // Draw particle
        ctx.beginPath();
        
        ctx.fillStyle = `${p.color}${p.alpha * globalFadeIn})`;
        ctx.arc(animatedX, animatedY, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Recycle particles setting off screen
        if (animatedY < -10 || animatedX < -20 || animatedX > width + 20) {
          particles[i] = createParticle(false);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[1]"
      style={{ mixBlendMode: 'screen', backfaceVisibility: 'hidden' }}
    />
  );
};

export default GoldParticles;
