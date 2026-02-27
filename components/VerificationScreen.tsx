
import React from 'react';
import { Mail, CheckCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import Logo from './Logo.tsx';

const VerificationScreen: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div className="fixed inset-0 z-[300] bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <Logo className="w-full h-full scale-150 rotate-12" isLight />
      </div>
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-10 md:p-16 text-center shadow-3xl border border-white/10 animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-geevee-orange/10 rounded-3xl flex items-center justify-center text-geevee-orange mx-auto mb-10 shadow-inner">
          <Mail size={48} />
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-6 leading-tight">Verify Your Email</h2>
        
        <p className="text-slate-600 dark:text-slate-400 text-lg font-medium mb-12 leading-relaxed">
          We have sent you a verification email to <span className="text-geevee-orange font-black">{user?.email}</span>. Please verify it and log in.
        </p>
        
        <div className="space-y-4">
          <button 
            onClick={logout}
            className="w-full bg-geevee-orange text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-orange-600 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            Login
          </button>
          
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-4">
            Haven't received it? Check your spam folder.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationScreen;
