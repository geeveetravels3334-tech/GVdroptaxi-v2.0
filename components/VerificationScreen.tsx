
import React from 'react';
import { Mail, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import Logo from './Logo.tsx';

const VerificationScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed inset-0 z-[300] bg-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Logo className="w-full h-full scale-150 rotate-12" isLight />
      </div>
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-[4rem] p-12 md:p-20 text-center shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] border border-white/10 animate-in zoom-in-95 duration-500">
        <div className="w-32 h-32 bg-slate-50 dark:bg-white/5 rounded-[2.5rem] flex items-center justify-center text-geevee-orange mx-auto mb-12 shadow-inner border border-slate-100 dark:border-white/5">
          <Mail size={56} className="opacity-80" />
        </div>
        
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-tighter leading-tight">Verification Protocol</h2>
        
        <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-12 leading-relaxed px-4">
          A secure verification link has been transmitted to <span className="text-geevee-orange font-bold underline underline-offset-4">{user?.email}</span>. Please confirm identity to establish secure access.
        </p>
        
        <div className="space-y-6">
          <button 
            onClick={logout}
            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 py-6 rounded-2xl font-bold text-[11px] uppercase tracking-[0.3em] shadow-2xl hover:bg-geevee-orange dark:hover:bg-geevee-orange hover:text-white transition-all active:scale-95 flex items-center justify-center gap-4"
          >
            Access Secure Login
          </button>
          
          <div className="pt-6 border-t border-slate-100 dark:border-white/5 mt-10">
            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-600 uppercase tracking-[0.2em] leading-relaxed max-w-[280px] mx-auto">
              Deployment of verification mail may take up to 120 seconds. Ensure spam filters are monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;
