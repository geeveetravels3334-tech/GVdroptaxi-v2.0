
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendEmailVerification,
  signInWithPopup,
  GoogleAuthProvider,
  User as FirebaseUser,
  updateProfile
} from "firebase/auth";
import { auth } from './firebase.ts';
import { User } from '../types.ts';

const googleProvider = new GoogleAuthProvider();

export const AuthService = {
  // Sign Up
  signUp: async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Send verification email
      await sendEmailVerification(userCredential.user);
      // Sign out immediately so they aren't "logged in" until verified
      await signOut(auth);
      return userCredential.user;
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        throw new Error("User already exists. Please sign in");
      }
      throw error;
    }
  },

  // Sign In
  signIn: async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error: any) {
      // Unified error message for incorrect credentials as per requirements
      if (
        error.code === 'auth/invalid-credential' || 
        error.code === 'auth/user-not-found' || 
        error.code === 'auth/wrong-password' ||
        error.code === 'auth/invalid-email'
      ) {
        throw new Error("Email or password is incorrect");
      }
      throw error;
    }
  },

  // Google Sign In
  googleSignIn: async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error: any) {
      // Specific handling for domain unauthorized error
      if (error.code === 'auth/unauthorized-domain') {
        throw new Error(`Domain Unauthorized: Please add '${window.location.hostname}' to your 'Authorized Domains' in the Firebase Console (Authentication > Settings).`);
      }
      console.error("Google Sign-in Error:", error);
      throw new Error("Could not complete Google sign-in. Please try again.");
    }
  },

  // Sign Out
  signOut: async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  },

  // Update User Profile
  updateUserProfile: async (displayName: string, photoURL?: string) => {
    const user = auth.currentUser;
    if (user) {
      await updateProfile(user, {
        displayName,
        photoURL
      });
      return user;
    }
    throw new Error("No user logged in");
  },

  // Map Firebase User to App User
  mapFirebaseUserToUser: (fbUser: FirebaseUser | null): User | null => {
    if (!fbUser) return null;

    return {
      id: fbUser.uid,
      email: fbUser.email || '',
      name: fbUser.displayName || fbUser.email?.split('@')[0] || 'User',
      mobile: fbUser.phoneNumber || '',
      joinedAt: fbUser.metadata.creationTime || new Date().toISOString(),
      lastLogin: fbUser.metadata.lastSignInTime || new Date().toISOString(),
      walletBalance: 0
    };
  }
};
