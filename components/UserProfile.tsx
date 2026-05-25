import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { AuthService } from '../services/auth.ts';
import { User, Mail, Phone, Camera, Save, X, Loader2, Edit2, Sparkles } from 'lucide-react';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const updatedFirebaseUser = await AuthService.updateUserProfile(name);
      const updatedUser = AuthService.mapFirebaseUserToUser(updatedFirebaseUser);
      if (updatedUser) {
        updateUser(updatedUser);
      }
      setMessage({ type: 'success', text: 'Credentials updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-gradient-to-b from-[#0C1E38]/95 via-[#040812]/98 to-[#040812] w-full max-w-lg rounded-[3rem] md:rounded-[4rem] shadow-[0_45px_135px_rgba(0,0,0,0.85)] overflow-hidden border border-[#D4AF37]/25 relative">
        
        {/* Header */}
        <div className="bg-slate-950/80 p-10 text-white relative overflow-hidden border-b border-[#D4AF37]/15">
           <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37]/10 rounded-full blur-[80px] -mr-16 -mt-16 pointer-events-none"></div>
           
           <button 
             onClick={onClose}
             className="absolute top-8 right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 text-slate-300 hover:text-white"
           >
             <X size={20} />
           </button>

           <h2 className="text-2.5xl md:text-3xl font-serif text-white tracking-tight italic">Elite Boarding Credentials</h2>
           <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.25em] mt-3">Member Credentials Protocol</p>
        </div>

        <div className="p-8 md:p-12 space-y-8 bg-[#040812]/40 backdrop-blur-sm">
           {/* Avatar Section */}
           <div className="flex justify-center -mt-20 md:-mt-22 mb-4 relative z-10">
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-r from-[#BF953F] via-[#FCF6BA] to-[#AA771C] border-4 border-[#040812] shadow-2xl flex items-center justify-center text-[#040812] text-3xl font-black uppercase rotate-3 hover:rotate-0 transition-transform duration-500 group">
                 <span className="group-hover:scale-110 transition-transform">{user.name.charAt(0)}</span>
              </div>
           </div>

           {message && (
             <div className={`p-4 rounded-xl text-[10px] font-bold text-center uppercase tracking-widest ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
               {message.text}
             </div>
           )}

           <div className="space-y-6">
              {/* Name Field */}
              <div className="space-y-3">
                 <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2 leading-none">Identity Specification</label>
                 <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">
                       <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-16 pr-6 py-4.5 rounded-2xl bg-white/5 text-white border-2 ${isEditing ? 'border-[#D4AF37]/50 focus:border-[#D4AF37]' : 'border-white/5'} focus:outline-none transition-all font-bold shadow-sm text-sm`}
                    />
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D4AF37] transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                 </div>
              </div>

              {/* Email Field (Read Only) */}
              <div className="space-y-3">
                 <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2 leading-none">Communication Node</label>
                 <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 opacity-60">
                       <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full pl-16 pr-6 py-4.5 rounded-2xl bg-white/[0.02] border-2 border-transparent text-slate-400 font-bold cursor-not-allowed opacity-60 text-sm"
                    />
                 </div>
              </div>

              {/* Mobile Field (Read Only) */}
              <div className="space-y-3">
                 <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2 leading-none">Verification Telephony</label>
                 <div className="relative">
                    <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 opacity-60">
                       <Phone size={18} />
                    </div>
                    <input 
                      type="tel" 
                      value={user.mobile || 'Not Linked'}
                      disabled
                      className="w-full pl-16 pr-6 py-4.5 rounded-2xl bg-white/[0.02] border-2 border-transparent text-slate-400 font-bold cursor-not-allowed opacity-60 text-sm"
                    />
                 </div>
                 <p className="text-[8px] text-slate-500 pl-2 uppercase font-black tracking-widest opacity-60">Security restricted: Modification requires support ticket.</p>
              </div>
           </div>

           {/* Action Buttons */}
           {isEditing && (
             <div className="flex gap-4 pt-4 border-t border-white/5">
                <button 
                  onClick={() => { setIsEditing(false); setName(user.name); }}
                  className="flex-1 py-4.5 rounded-2xl font-bold text-slate-400 hover:text-white transition-all text-[10px] uppercase tracking-[0.25em] hover:bg-white/5"
                >
                  Discard
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="premium-glass-btn-solid flex-1 py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3"
                >
                  {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  Commit Changes
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
