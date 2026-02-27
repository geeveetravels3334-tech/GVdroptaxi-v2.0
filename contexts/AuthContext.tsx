
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types.ts';
import { AuthService } from '../services/auth.ts';
import { auth } from '../services/firebase.ts';
import { onAuthStateChanged } from 'firebase/auth';
import { Loader2 } from 'lucide-react';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  isAuthModalOpen: boolean;
  isLoading: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
      if (fbUser) {
        setUser(AuthService.mapFirebaseUserToUser(fbUser));
        setIsVerified(fbUser.emailVerified);
      } else {
        setUser(null);
        setIsVerified(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);
  const updateUser = (updatedUser: User) => setUser(updatedUser);

  const logout = async () => {
    try {
      await AuthService.signOut();
      // AuthModal will be opened automatically if needed by logic
      openAuthModal();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <div className="relative mb-4">
           <div className="absolute inset-0 bg-geevee-orange blur-xl opacity-20 rounded-full animate-pulse"></div>
           <Loader2 className="w-10 h-10 text-geevee-orange animate-spin relative z-10" />
        </div>
        <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">Authenticating...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isVerified,
      isAuthModalOpen, 
      isLoading,
      openAuthModal, 
      closeAuthModal, 
      logout,
      updateUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
