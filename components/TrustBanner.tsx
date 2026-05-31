import React from 'react';
import { Shield, Sparkles, Award, Star, Users } from 'lucide-react';

const TrustBanner: React.FC = () => {
  return (
    <div className="bg-[#0A101D] border-y border-white/5 py-12 lg:py-16 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl mb-4 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10 transition-colors">
              <Shield size={32} className="text-[#D4AF37]" />
            </div>
            <h4 className="text-white font-serif italic text-lg lg:text-xl mb-1">100% Secure</h4>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">End-to-End Encrypted</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl mb-4 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10 transition-colors">
              <Award size={32} className="text-[#D4AF37]" />
            </div>
            <h4 className="text-white font-serif italic text-lg lg:text-xl mb-1">Premium Fleet</h4>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Luxury Assured</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl mb-4 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10 transition-colors">
              <Star size={32} className="text-[#D4AF37]" />
            </div>
            <h4 className="text-white font-serif italic text-lg lg:text-xl mb-1">Top Rated</h4>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">4.9/5 Average</p>
          </div>

          <div className="flex flex-col items-center text-center group">
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl mb-4 group-hover:border-[#D4AF37]/30 group-hover:bg-[#D4AF37]/10 transition-colors">
              <Users size={32} className="text-[#D4AF37]" />
            </div>
            <h4 className="text-white font-serif italic text-lg lg:text-xl mb-1">Expert Chauffeurs</h4>
            <p className="text-[10px] text-slate-400 font-mono uppercase tracking-widest">Vetted & Trained</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TrustBanner;
