import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { AuthService } from '../services/auth.ts';
import { User, Mail, Phone, Camera, Save, X, Loader2, Edit2 } from 'lucide-react';

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
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-white/10 relative">
        
        {/* Header */}
        <div className="bg-slate-900 dark:bg-black p-6 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-geevee-orange/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
           
           <button 
             onClick={onClose}
             className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
           >
             <X size={18} />
           </button>

           <h2 className="text-2xl font-black uppercase tracking-wide relative z-10">My Profile</h2>
           <p className="text-slate-400 text-xs font-medium relative z-10">Manage your account details</p>
        </div>

        <div className="p-6 md:p-8 space-y-6">
           {/* Avatar Section */}
           <div className="flex justify-center -mt-16 mb-4 relative z-10">
              <div className="w-24 h-24 rounded-full bg-geevee-orange border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center text-white text-3xl font-black uppercase">
                 {user.name.charAt(0)}
                 {/* Optional: Edit Avatar Button */}
                 {/* <button className="absolute bottom-0 right-0 bg-slate-900 text-white p-2 rounded-full border-2 border-white shadow-md">
                    <Camera size={14} />
                 </button> */}
              </div>
           </div>

           {message && (
             <div className={`p-3 rounded-xl text-xs font-bold text-center ${message.type === 'success' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
               {message.text}
             </div>
           )}

           <div className="space-y-4">
              {/* Name Field */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Full Name</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                       <User size={18} />
                    </div>
                    <input 
                      type="text" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border ${isEditing ? 'border-geevee-orange' : 'border-slate-200 dark:border-white/10'} focus:outline-none focus:border-geevee-orange transition-colors font-bold text-slate-900 dark:text-white`}
                    />
                    {!isEditing && (
                      <button 
                        onClick={() => setIsEditing(true)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-geevee-orange transition-colors"
                      >
                        <Edit2 size={16} />
                      </button>
                    )}
                 </div>
              </div>

              {/* Email Field (Read Only) */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                       <Mail size={18} />
                    </div>
                    <input 
                      type="email" 
                      value={user.email}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed"
                    />
                 </div>
              </div>

              {/* Mobile Field (Read Only) */}
              <div className="space-y-1">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Mobile Number</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                       <Phone size={18} />
                    </div>
                    <input 
                      type="tel" 
                      value={user.mobile || 'Not linked'}
                      disabled
                      className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-transparent text-slate-500 dark:text-slate-400 font-medium cursor-not-allowed"
                    />
                 </div>
                 <p className="text-[10px] text-slate-400 pl-1">To update mobile number, please contact support.</p>
              </div>
           </div>

           {/* Action Buttons */}
           {isEditing && (
             <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => { setIsEditing(false); setName(user.name); }}
                  className="flex-1 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave}
                  disabled={isLoading}
                  className="flex-1 bg-geevee-orange text-white py-3 rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                  Save Changes
                </button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
