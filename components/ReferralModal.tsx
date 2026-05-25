
import React, { useState } from 'react';
import { X, Copy, Gift, Wallet, Share2, Sparkles, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';

interface ReferralModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReferralModal: React.FC<ReferralModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const referralCode = user?.referralCode || 'TN-GUEST';
  const walletBalance = user?.walletBalance || 0;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = referralCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        const url = window.location.href.startsWith('http') ? window.location.href : 'https://tamilnadutaxitours.com';
        await navigator.share({
          title: 'Join Tamilnadu Taxi Tours',
          text: `Use my code ${referralCode} to get ₹399 off your first premium cab ride with Tamilnadu Taxi Tours!`,
          url: url
        });
      } catch (err) {
        console.error('Share failed', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[3rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-500 border border-white/20 flex flex-col max-h-[90vh] transition-colors">
        
        {/* Header Section */}
        <div className="bg-geevee-dark relative p-8 md:p-12 overflow-hidden shrink-0">
           {/* Abstract Background Shapes */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-geevee-orange/20 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
           <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/10 rounded-full blur-[60px] -ml-12 -mb-12 pointer-events-none"></div>
           
           <button 
             onClick={onClose} 
             className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-20"
           >
             <X size={20} />
           </button>

           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                 <div className="inline-flex items-center gap-2 bg-geevee-orange text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4 shadow-lg">
                    <Sparkles size={12} />
                    Referral Program
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black text-white mb-2 leading-tight">
                    Invite & <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Earn ₹399</span>
                 </h2>
                 <p className="text-slate-400 font-medium text-sm md:text-base max-w-xs">
                    Give friends a discount, get cashback in your wallet.
                 </p>
              </div>

              {/* Animated Gift Icon */}
              <div className="relative group">
                 <div className="absolute inset-0 bg-geevee-orange blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
                 <div className="w-32 h-32 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-[2.5rem] border border-white/20 flex items-center justify-center shadow-2xl relative z-10 transform group-hover:-translate-y-2 transition-transform duration-500">
                    <Gift size={64} className="text-geevee-orange drop-shadow-lg" />
                 </div>
                 <div className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-black px-2 py-1 rounded-full shadow-lg animate-bounce">
                    NEW
                 </div>
              </div>
           </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 md:p-12 overflow-y-auto bg-slate-50 dark:bg-[#0B1F3A] transition-colors">
           
           {/* Wallet Balance Card */}
           <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-xl border border-slate-100 dark:border-white/5 flex items-center justify-between mb-8 relative overflow-hidden group transition-colors">
              <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-green-50 dark:from-green-900/10 to-transparent opacity-50"></div>
              
              <div className="flex items-center gap-5 relative z-10">
                 <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-400 shadow-inner">
                    <Wallet size={32} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">Your Wallet Balance</p>
                    <p className="text-4xl font-black text-slate-900 dark:text-white">₹{walletBalance}</p>
                 </div>
              </div>
              
              <div className="hidden md:block">
                 <button className="text-xs font-bold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-4 py-2 rounded-xl hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors">
                    View History
                 </button>
              </div>
           </div>

           {/* Copy Code Section */}
           <div className="mb-10 text-center">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-4 uppercase tracking-wider">Your Unique Referral Code</p>
              <div 
                onClick={copyToClipboard}
                className="bg-slate-900 dark:bg-white p-2 rounded-[2rem] inline-flex items-center gap-2 shadow-2xl cursor-pointer hover:scale-[1.02] active:scale-[0.98] transition-all group max-w-full"
              >
                 <div className="bg-white/10 dark:bg-slate-900/10 px-8 py-4 rounded-[1.5rem] border border-white/10 dark:border-slate-900/10 min-w-[200px]">
                    <span className="text-2xl md:text-3xl font-black text-white dark:text-slate-900 tracking-widest font-mono select-all">{referralCode}</span>
                 </div>
                 <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${copied ? 'bg-green-500 text-white' : 'bg-geevee-orange text-white group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:text-geevee-orange'}`}>
                    {copied ? <Check size={24} /> : <Copy size={24} />}
                 </div>
              </div>
              <p className={`text-[10px] font-bold mt-3 transition-opacity ${copied ? 'text-green-600 dark:text-green-400 opacity-100' : 'opacity-0'}`}>
                 Code copied to clipboard!
              </p>
           </div>

           {/* Steps */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 dark:bg-white/10 -z-10 -translate-y-1/2"></div>
              
              {[
                { title: 'Share Code', desc: 'Share your code with friends & family.' },
                { title: 'They Book', desc: 'They get ₹399 OFF on their first trip.' },
                { title: 'You Earn', desc: 'You get ₹399 cashback in wallet.' }
              ].map((step, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-white/5 text-center shadow-lg relative transition-colors">
                   <div className="w-8 h-8 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full flex items-center justify-center font-black text-sm mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-md">
                      {i + 1}
                   </div>
                   <h4 className="font-black text-slate-900 dark:text-white text-sm mb-1">{step.title}</h4>
                   <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{step.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10 flex justify-center shrink-0">
           <button 
             onClick={handleShare}
             className="w-full md:w-auto px-12 py-4 premium-glass-btn-solid rounded-2xl font-black text-xs uppercase tracking-[0.2em] active:scale-95 transition-all flex items-center justify-center gap-3"
           >
              <Share2 size={20} />
              Share Now
           </button>
        </div>

      </div>
    </div>
  );
};

export default ReferralModal;
