
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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={closeAuthModal}
      ></div>

      <div className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in duration-300 transition-colors">
        <div className="bg-geevee-dark p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Logo className="w-64 h-64 -translate-y-12 translate-x-32 rotate-12" isLight />
          </div>
          <button 
            onClick={closeAuthModal} 
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          
          <div className="relative z-10">
            <h3 className="text-2xl font-black text-white mb-2">Welcome to Geevee Travels</h3>
            <p className="text-geevee-orange text-[10px] font-black uppercase tracking-[0.2em]">
              {mode === 'LOGIN' ? 'Access Your Account' : 'Create New Account'}
            </p>
          </div>
        </div>

        <div className="p-8 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 font-bold text-slate-900 dark:text-white outline-none focus:border-geevee-orange transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 dark:text-slate-600" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 rounded-xl py-3 pl-12 pr-4 font-bold text-slate-900 dark:text-white outline-none focus:border-geevee-orange transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-xs font-bold p-4 rounded-xl flex items-start gap-3 border border-red-100 animate-in slide-in-from-top-2">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-geevee-orange text-white py-4 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-4"
            >
              {isLoading ? <Loader2 className="animate-spin" /> : (mode === 'LOGIN' ? 'Login' : 'Sign Up')} 
              {!isLoading && <ArrowRight size={20} />}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100 dark:border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="bg-white dark:bg-slate-900 px-4 text-slate-400">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={isLoading || isGoogleLoading}
              className="w-full bg-white dark:bg-white/5 border-2 border-slate-100 dark:border-white/10 text-slate-900 dark:text-white py-4 rounded-2xl font-black text-sm shadow-sm hover:bg-slate-50 dark:hover:bg-white/10 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
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
              Continue with Google
            </button>

            <div className="text-center pt-4">
              <p className="text-xs font-medium text-slate-400">
                {mode === 'LOGIN' ? "Don't have an account? " : "Already have an account? "}
                <button 
                  type="button"
                  onClick={() => {
                    setMode(mode === 'LOGIN' ? 'SIGNUP' : 'LOGIN');
                    setError(null);
                  }}
                  className="text-geevee-dark dark:text-white font-black hover:underline"
                >
                  {mode === 'LOGIN' ? 'Sign Up' : 'Login'}
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
