
import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Loader2, Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { AuthService } from '../services/auth.ts';
import Logo from './Logo.tsx';

type AuthMode = 'LOGIN' | 'SIGNUP' | 'VERIFY_SENT';

const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  
  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset state when modal opens
  useEffect(() => {
    if (isAuthModalOpen) {
      setMode('LOGIN');
      setEmail('');
      setPassword('');
      setError(null);
      setIsLoading(false);
      setIsGoogleLoading(false);
    }
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (mode === 'SIGNUP') {
        if (password.length < 6) throw new Error("Password must be at least 6 characters");
        await AuthService.signUp(email, password);
        // Successful signup shows verification message
        setMode('VERIFY_SENT');
      } else {
        await AuthService.signIn(email, password);
        // If unverified, the App shell will handle showing the VerificationScreen
        closeAuthModal();
      }
    } catch (err: any) {
      console.error("Auth Error:", err.message);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    setIsGoogleLoading(true);
    try {
      await AuthService.googleSignIn();
      closeAuthModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  if (mode === 'VERIFY_SENT') {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300" onClick={closeAuthModal}></div>
        <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
           <div className="w-20 h-20 bg-geevee-orange/10 rounded-3xl flex items-center justify-center text-geevee-orange mx-auto mb-8 shadow-inner">
             <Mail size={36} />
           </div>
           <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4">Check Your Inbox</h3>
           <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-8 leading-relaxed">
             We have sent you a verification email to <span className="text-geevee-orange font-black">{email}</span>. Please verify it and log in.
           </p>
           <button 
             onClick={() => setMode('LOGIN')}
             className="w-full bg-geevee-orange text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition-all active:scale-95"
           >
             Login
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={closeAuthModal}
      ></div>

      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3.5rem] overflow-hidden shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] animate-in zoom-in duration-500 transition-colors border border-white/10 flex flex-col max-h-full">
        <div className="bg-slate-900 p-8 md:p-12 text-center relative overflow-hidden shrink-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
            <Logo className="w-80 h-80 -translate-y-20 translate-x-40 rotate-12" isLight />
          </div>
          <button 
            onClick={closeAuthModal} 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white/30 hover:text-white transition-all bg-white/5 hover:bg-white/10 p-2 rounded-xl z-20"
          >
            <X size={24} />
          </button>
          
          <div className="relative z-10 pt-6 md:pt-10">
            <h3 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4 tracking-tighter">Elite Member Access</h3>
            <p className="text-geevee-orange text-[10px] font-bold uppercase tracking-[0.3em] opacity-80">
              {mode === 'LOGIN' ? 'Credential Verification Required' : 'Initialize New Account'}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12 lg:p-16 overflow-y-auto premium-scrollbar">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Secure Electronic Mail</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={20} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-geevee-orange/20 rounded-2xl py-5 pl-16 pr-6 font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] ml-2">Authentication Key</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={20} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-transparent focus:border-geevee-orange/20 rounded-2xl py-5 pl-16 pr-6 font-bold text-slate-900 dark:text-white outline-none transition-all shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 text-red-500 text-[10px] font-bold p-5 rounded-2xl flex items-start gap-4 border border-red-500/20 animate-in slide-in-from-top-2 tracking-wide uppercase">
                <AlertCircle size={18} className="shrink-0" />
                <p className="leading-relaxed">{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading}
              className="w-full premium-glass-btn-solid py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 luxury-click"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (mode === 'LOGIN' ? 'Verify Identity' : 'Establish Account')} 
              {!isLoading && <ArrowRight size={20} />}
            </button>

            <div className="relative py-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-white/5"></div>
              </div>
              <div className="relative flex justify-center text-[9px] uppercase font-bold tracking-[0.3em]">
                <span className="bg-white dark:bg-slate-900 px-6 text-slate-400 dark:text-slate-600">Unified Auth Protocol</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
              className="w-full premium-glass-btn py-5 rounded-2xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-sm active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-4 luxury-click"
            >
              {isGoogleLoading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              )}
              Google Identity Platform
            </button>

            <div className="text-center pt-8">
              <p className="text-[10px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em]">
                {mode === 'LOGIN' ? "Not a member yet? " : "Already registered? "}
                <button 
                  type="button"
                  onClick={() => {
                    setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
                    setError(null);
                  }}
                  className="text-slate-900 dark:text-white font-black hover:text-geevee-orange transition-colors underline underline-offset-4"
                >
                  {mode === 'LOGIN' ? 'Initiate Registration' : 'Access Now'}
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
