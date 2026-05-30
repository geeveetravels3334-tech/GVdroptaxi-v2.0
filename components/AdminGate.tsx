
import React, { useState, useEffect } from 'react';
import { Shield, Lock, Unlock, AlertTriangle, Scan, KeyRound, ChevronRight, X, AlertOctagon, Fingerprint } from 'lucide-react';

interface AdminGateProps {
  onVerified: () => void;
  onExit: () => void;
}

const AdminGate: React.FC<AdminGateProps> = ({ onVerified, onExit }) => {
  const [passkey, setPasskey] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SCANNING' | 'VERIFIED' | 'DENIED'>('IDLE');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // The secret passkey is 'tamilnadu2025'
  // Base64 encoded: dGFtaWxuYWR1MjAyNQ==
  const ENCRYPTED_KEY = 'dGFtaWxuYWR1MjAyNQ==';

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (isLocked || !passkey) return;

    setStatus('SCANNING');

    // Artificial Security Delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    try {
      if (btoa(passkey) === ENCRYPTED_KEY) {
        setStatus('VERIFIED');
        setTimeout(onVerified, 1000);
      } else {
        setStatus('DENIED');
        setAttempts(prev => prev + 1);
        setPasskey('');
        
        if (attempts >= 2) {
          setIsLocked(true);
        } else {
          setTimeout(() => setStatus('IDLE'), 2000);
        }
      }
    } catch (err) {
      setStatus('DENIED');
      setTimeout(() => setStatus('IDLE'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex items-center justify-center p-4 overflow-hidden relative font-sans">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#C5A059 1px, transparent 1px), linear-gradient(90deg, #C5A059 1px, transparent 1px)', 
             backgroundSize: '100px 100px' 
           }}>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-geevee-orange/10 via-transparent to-transparent"></div>

      {/* Main Security Card */}
      <div className="relative z-10 w-full max-w-xl bg-slate-900 border border-white/5 rounded-[4rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)]">
        
        {/* Header */}
        <div className={`p-12 border-b border-white/5 flex items-center justify-between transition-all duration-1000 ${status === 'DENIED' ? 'bg-red-500/10' : 'bg-white/[0.02]'}`}>
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-xl ${status === 'VERIFIED' ? 'bg-green-500 text-black' : status === 'DENIED' ? 'bg-red-500 text-white' : 'bg-slate-800 text-white'}`}>
              {status === 'VERIFIED' ? <Unlock size={28} /> : status === 'DENIED' ? <AlertOctagon size={28} /> : <Shield size={28} />}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">Security Protocol</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-2 font-bold opacity-60">Authentication Tier 7 • Deep Sea Level</p>
            </div>
          </div>
          <button 
            onClick={onExit} 
            className="p-3 bg-white/5 hover:bg-white/10 text-white/30 hover:text-white rounded-2xl transition-all border border-white/5"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-12 md:p-20">
          
          {/* Status Display */}
          <div className="mb-12 text-center min-h-[160px] flex flex-col items-center justify-center border border-white/[0.03] rounded-[2.5rem] bg-white/[0.01] p-10 relative overflow-hidden group">
             <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
             
             {status === 'IDLE' && (
               <>
                 <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 border border-white/5 shadow-inner">
                   <Lock size={32} className="text-slate-600" />
                 </div>
                 <p className="text-[11px] text-slate-500 uppercase tracking-[0.4em] font-bold animate-slow-pulse">Encryption Synchronized</p>
                 <p className="text-[9px] text-slate-700 mt-2 uppercase tracking-widest font-bold">Awaiting Cipher Input</p>
               </>
             )}
             {status === 'SCANNING' && (
               <>
                 <Scan size={64} className="text-geevee-orange mb-8 animate-slow-pulse" />
                 <p className="text-[11px] text-geevee-orange font-bold uppercase tracking-[0.4em]">Decryption in Progress...</p>
                 <div className="w-full max-w-xs h-1 bg-white/[0.05] mt-6 rounded-full overflow-hidden">
                    <div className="h-full bg-geevee-orange animate-[loading_1.5s_ease-in-out]"></div>
                 </div>
               </>
             )}
             {status === 'VERIFIED' && (
               <>
                 <div className="relative mb-6">
                   <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 animate-slow-pulse"></div>
                   <Fingerprint size={64} className="text-green-500 relative z-10" />
                 </div>
                 <p className="text-sm text-green-500 font-bold uppercase tracking-[0.4em]">Identity Reconciled</p>
                 <p className="text-[9px] text-green-700 font-bold uppercase tracking-widest mt-2">Initializing Command Interface...</p>
               </>
             )}
             {status === 'DENIED' && (
               <>
                 <AlertTriangle size={64} className="text-red-500 mb-8 animate-bounce" />
                 <p className="text-sm text-red-500 font-bold uppercase tracking-[0.4em]">System Violation</p>
                 <p className="text-[9px] text-red-700 font-bold uppercase tracking-widest mt-2">Discrepancy Detected in Cipher String</p>
               </>
             )}
          </div>

          {/* Locked State */}
          {isLocked ? (
             <div className="text-center p-12 bg-red-500/5 rounded-[2.5rem] border border-red-500/20">
                <p className="text-red-500 font-bold text-lg mb-4 uppercase tracking-[0.2em]">Terminal Lockdown</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest leading-loose font-bold">Multiple verification failures. Access point suspended. Security logs transmitted.</p>
                <button 
                  onClick={onExit} 
                  className="mt-10 bg-red-500 text-white px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-red-600 transition-all active:scale-95"
                >
                  Terminate Interface
                </button>
             </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleVerify} className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] flex items-center justify-center gap-3 opacity-60">
                  <KeyRound size={12} className="text-geevee-orange" /> Authentication Key Sequence
                </label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full bg-white/[0.03] border-2 border-transparent focus:border-geevee-orange/30 rounded-[2rem] px-8 py-6 text-center text-white font-bold tracking-[0.8em] text-2xl outline-none transition-all placeholder:tracking-normal placeholder:font-bold placeholder:text-slate-600 shadow-inner"
                    placeholder="••••••••"
                    autoFocus
                    disabled={status === 'SCANNING' || status === 'VERIFIED'}
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={!passkey || status !== 'IDLE'}
                className="w-full bg-white text-slate-900 py-6 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-geevee-orange hover:text-white transition-all disabled:opacity-30 disabled:cursor-not-allowed group shadow-2xl active:scale-[0.98]"
              >
                Authenticate Sequence <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
            </form>
          )}

        </div>
        
        {/* Footer */}
        <div className="bg-black/40 p-10 border-t border-white/5 text-center">
           <p className="text-[9px] text-slate-600 uppercase tracking-[0.4em] font-bold mb-3 opacity-40">
              Encrypted Tunnel Protocol 2.5.4
           </p>
           <button 
             onClick={onExit}
             className="text-[9px] text-slate-700 uppercase tracking-widest font-bold hover:text-white transition-all"
           >
              Return to Surface
           </button>
        </div>
      </div>
    </div>
  );
};

export default AdminGate;
