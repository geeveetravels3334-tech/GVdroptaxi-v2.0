
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
    <div className="min-h-screen bg-black text-slate-300 flex items-center justify-center p-4 overflow-hidden relative font-mono">
      {/* Background Grid & Effects */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#F37021 1px, transparent 1px), linear-gradient(90deg, #F37021 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black"></div>

      {/* Main Security Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl overflow-hidden shadow-3xl">
        
        {/* Header */}
        <div className={`p-6 border-b border-white/5 flex items-center justify-between transition-colors duration-500 ${status === 'DENIED' ? 'bg-red-900/20' : 'bg-white/5'}`}>
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${status === 'VERIFIED' ? 'bg-green-500 text-black' : status === 'DENIED' ? 'bg-red-500 text-white' : 'bg-geevee-orange text-black'}`}>
              {status === 'VERIFIED' ? <Unlock size={18} /> : status === 'DENIED' ? <AlertOctagon size={18} /> : <Lock size={18} />}
            </div>
            <div>
              <h2 className="text-white font-bold text-sm tracking-widest uppercase">Admin Gate</h2>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Level 2 Security</p>
            </div>
          </div>
          <button onClick={onExit} className="text-slate-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Status Display */}
          <div className="mb-8 text-center min-h-[100px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-black/50 p-6 relative">
             {status === 'IDLE' && (
               <>
                 <Shield size={40} className="text-slate-600 mb-3" />
                 <p className="text-xs text-slate-400 uppercase tracking-widest animate-pulse">System Secured</p>
                 <p className="text-[9px] text-slate-600 mt-1">Awaiting Credentials</p>
               </>
             )}
             {status === 'SCANNING' && (
               <>
                 <Scan size={40} className="text-geevee-orange mb-3 animate-spin" />
                 <p className="text-xs text-geevee-orange uppercase tracking-widest">Verifying Identity...</p>
                 <div className="w-full h-1 bg-white/10 mt-3 rounded-full overflow-hidden">
                    <div className="h-full bg-geevee-orange animate-[loading_1.5s_ease-in-out]"></div>
                 </div>
               </>
             )}
             {status === 'VERIFIED' && (
               <>
                 <div className="relative">
                   <div className="absolute inset-0 bg-green-500 blur-xl opacity-20"></div>
                   <Fingerprint size={40} className="text-green-500 mb-3 relative z-10" />
                 </div>
                 <p className="text-xs text-green-500 font-bold uppercase tracking-widest">Access Granted</p>
                 <p className="text-[9px] text-green-700 mt-1">Redirecting to Dashboard...</p>
               </>
             )}
             {status === 'DENIED' && (
               <>
                 <AlertTriangle size={40} className="text-red-500 mb-3" />
                 <p className="text-xs text-red-500 font-bold uppercase tracking-widest">Access Denied</p>
                 <p className="text-[9px] text-red-700 mt-1">Invalid Passkey Provided</p>
               </>
             )}
          </div>

          {/* Locked State */}
          {isLocked ? (
             <div className="text-center py-6 bg-red-500/10 rounded-2xl border border-red-500/20">
                <p className="text-red-500 font-bold text-sm mb-2 uppercase tracking-widest">System Locked</p>
                <p className="text-xs text-slate-400">Too many failed attempts.<br/>Please contact system administrator.</p>
                <button onClick={onExit} className="mt-6 text-xs text-white underline hover:text-red-400">Return to Home</button>
             </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleVerify} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                  <KeyRound size={12} /> Enter Passkey
                </label>
                <div className="relative group">
                  <input 
                    type="password" 
                    value={passkey}
                    onChange={(e) => setPasskey(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-center text-white font-bold tracking-[0.5em] outline-none focus:border-geevee-orange focus:bg-white/10 transition-all placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-700"
                    placeholder="••••••••"
                    autoFocus
                    disabled={status === 'SCANNING' || status === 'VERIFIED'}
                  />
                  <div className="absolute inset-0 rounded-xl bg-geevee-orange/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity"></div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={!passkey || status !== 'IDLE'}
                className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-geevee-orange hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
              >
                Authenticate <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          )}

        </div>
        
        {/* Footer */}
        <div className="bg-black/50 p-4 border-t border-white/5 text-center">
           <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-1">
              Restricted Area • Unauthorized Access Prohibited
           </p>
           <p className="text-[9px] text-slate-700 cursor-pointer hover:text-geevee-orange/50 transition-colors">
              Hint: tamilnadu2025
           </p>
        </div>
      </div>
    </div>
  );
};

export default AdminGate;
