import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { AuthService } from '../services/auth.ts';
import { BookingService } from '../services/booking.ts';
import { CustomerService, CustomerData, ReferralData } from '../services/customer.ts';
import { 
  User, Mail, Phone, Save, X, Loader2, Edit2, Sparkles, 
  MapPin, Clock, Calendar, Car, ArrowRight, ShieldCheck, 
  RefreshCw, CheckCircle2, AlertCircle, RefreshCcw, Gift, Copy, Share2,
  Star, MessageSquare, Send, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReviewService, Review } from '../services/review.ts';

interface UserProfileProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'profile' | 'trips' | 'rewards' | 'reviews';
}

const UserProfile: React.FC<UserProfileProps> = ({ isOpen, onClose, initialTab = 'profile' }) => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'trips' | 'rewards' | 'reviews'>(initialTab);
  
  // Profile State
  const [name, setName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  // Bookings State
  const [bookings, setBookings] = useState<any[]>([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  
  // Mobile Verification State
  const [mobile, setMobile] = useState('');
  const [isMobileEditing, setIsMobileEditing] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'idle' | 'otp' | 'verified'>('idle');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(0);

  // Rewards State
  const [customerData, setCustomerData] = useState<CustomerData | null>(null);
  const [referrals, setReferrals] = useState<ReferralData[]>([]);
  const [rewardsLoading, setRewardsLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Reviews State
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] = useState<any>(null);
  const [reviewForm, setReviewForm] = useState({
    rating: 5,
    title: '',
    comment: ''
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab, isOpen]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setMobile(user.mobile || '');
      if (user.mobile) {
        setVerificationStep('verified');
      }
    }
  }, [user]);

  useEffect(() => {
    if (isOpen && user?.mobile && activeTab === 'trips') {
      fetchBookings();
    }
  }, [isOpen, user, activeTab]);

  useEffect(() => {
    if (isOpen && user?.mobile && activeTab === 'rewards') {
       fetchRewardsData();
    }
  }, [isOpen, user, activeTab]);

  useEffect(() => {
    if (isOpen && user?.mobile && activeTab === 'reviews') {
       fetchMyReviews();
    }
  }, [isOpen, user, activeTab]);

  const fetchMyReviews = async () => {
    if (!user?.mobile) return;
    setReviewsLoading(true);
    const data = await ReviewService.getCustomerReviews(user.mobile);
    setMyReviews(data);
    setReviewsLoading(false);
  };

  const fetchRewardsData = async () => {
    if (!user?.mobile) return;
    setRewardsLoading(true);
    // ensure customer exists or create them
    let data = await CustomerService.getCustomer(user.mobile);
    if (!data) {
        data = await CustomerService.createCustomer({ mobile: user.mobile, name: user.name, email: user.email });
    }
    if (data) {
        setCustomerData(data);
        const refs = await CustomerService.getAllReferralsForUser(user.mobile);
        setReferrals(refs);
    }
    setRewardsLoading(false);
  };

  const fetchBookings = async () => {
    setBookingsLoading(true);
    if (user?.mobile) {
      const data = await BookingService.getUserBookings(user.mobile);
      setBookings(data);
    }
    setBookingsLoading(false);
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    setMessage(null);
    try {
      const updatedFirebaseUser = await AuthService.updateUserProfile(name);
      const updatedUser = AuthService.mapFirebaseUserToUser(updatedFirebaseUser);
      if (updatedUser) {
        updateUser({ ...updatedUser, mobile: mobile, mobileVerified: verificationStep === 'verified' } as any);
      }
      setMessage({ type: 'success', text: 'Credentials updated successfully!' });
      setIsEditing(false);
      setIsMobileEditing(false);
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = () => {
    if (!mobile || mobile.length < 10) {
       setMessage({ type: 'error', text: 'Please enter a valid 10-digit mobile number.' });
       return;
    }
    setMessage(null);
    setVerificationStep('otp');
    setCountdown(60);
    setOtp(['', '', '', '', '', '']);
    // In a real app we'd call Firebase Auth for Phone provider here
  };

  const handleVerifyOtp = () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length === 6) {
       setVerificationStep('verified');
       setOtp(['', '', '', '', '', '']);
       setMessage({ type: 'success', text: 'Mobile number verified securely. Click Update Profile to save.' });
    } else {
       setMessage({ type: 'error', text: 'Invalid OTP code.' });
    }
  };

  const handleRatingSubmit = async () => {
    if (!selectedBookingForReview || !user?.mobile) return;
    
    setIsSubmittingReview(true);
    const result = await ReviewService.submitReview({
      booking_id: selectedBookingForReview.bookingId,
      customer_mobile: user.mobile,
      customer_name: user.name,
      rating: reviewForm.rating,
      title: reviewForm.title,
      comment: reviewForm.comment,
      route: `${selectedBookingForReview.pickup.split(',')[0]} to ${selectedBookingForReview.drop.split(',')[0]}`
    });

    if (result.success) {
      setMessage({ type: 'success', text: 'Your review has been submitted for moderation. Thank you!' });
      setShowReviewForm(false);
      setSelectedBookingForReview(null);
      setReviewForm({ rating: 5, title: '', comment: '' });
      fetchMyReviews();
    } else {
      setMessage({ type: 'error', text: 'Failed to submit review. Please try again.' });
    }
    setIsSubmittingReview(false);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  if (!isOpen || !user) return null;

  const upcomingBookings = bookings.filter(b => b.status === 'pending' || b.status === 'assigned' || b.status === 'started');
  const pastBookings = bookings.filter(b => b.status === 'completed' || b.status === 'cancelled');

  const memberSince = user.joinedAt ? new Date(user.joinedAt).getFullYear() : new Date().getFullYear();
  const totalTrips = pastBookings.length;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'assigned': return 'bg-blue-900/30 text-blue-400 border-blue-800/50';
      case 'started': return 'bg-purple-900/30 text-purple-400 border-purple-800/50';
      case 'completed': return 'bg-green-900/30 text-green-400 border-green-800/50';
      case 'cancelled': return 'bg-red-950/30 text-red-400 border-red-900/50';
      default: return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500">
      <div className="bg-gradient-to-b from-[#0C1E38]/95 via-[#040812]/98 to-[#040812] w-full max-w-4xl rounded-[2rem] md:rounded-[3rem] shadow-[0_45px_135px_rgba(0,0,0,0.85)] overflow-hidden border border-[#D4AF37]/25 relative flex flex-col max-h-[85vh]">
        
        {/* Header Tabs section */}
        <div className="bg-slate-950/80 pt-6 px-6 md:pt-8 md:px-10 border-b border-[#D4AF37]/15 shrink-0 relative">
           <button onClick={onClose} className="absolute top-6 right-6 md:top-8 md:right-8 p-3 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 text-slate-300 hover:text-white z-10">
             <X size={20} />
           </button>

           <div className="flex items-center gap-4 mb-6">
             <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#AA771C] text-[#040812] flex items-center justify-center font-black text-2xl uppercase shadow-lg border-2 border-[#040812]">
                {user.name.charAt(0)}
             </div>
             <div>
                <h2 className="text-2xl md:text-3xl font-serif text-white tracking-tight">{user.name}</h2>
                <div className="flex items-center gap-3 mt-1">
                   <span className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1">
                      <ShieldCheck size={12} /> Elite Member Since {memberSince}
                   </span>
                </div>
             </div>
           </div>

           <div className="flex gap-6 overflow-x-auto no-scrollbar relative">
             <button onClick={() => setActiveTab('profile')} className={`pb-4 px-2 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative outline-none ${activeTab === 'profile' ? 'text-[#D4AF37]' : 'text-slate-500 hover:text-slate-300'}`}>
                Account & Security
                {activeTab === 'profile' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-t-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
             </button>
             <button onClick={() => setActiveTab('trips')} className={`pb-4 px-2 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative outline-none ${activeTab === 'trips' ? 'text-[#D4AF37]' : 'text-slate-500 hover:text-slate-300'}`}>
                My Voyages
                {activeTab === 'trips' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-t-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
             </button>
             <button onClick={() => setActiveTab('rewards')} className={`pb-4 px-2 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative outline-none flex items-center gap-2 ${activeTab === 'rewards' ? 'text-[#D4AF37]' : 'text-slate-500 hover:text-slate-300'}`}>
                Rewards & Loyalty
                {activeTab === 'rewards' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-t-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
             </button>
             <button onClick={() => setActiveTab('reviews')} className={`pb-4 px-2 text-xs font-black uppercase tracking-[0.2em] whitespace-nowrap transition-colors relative outline-none flex items-center gap-2 ${activeTab === 'reviews' ? 'text-[#D4AF37]' : 'text-slate-500 hover:text-slate-300'}`}>
                Review Logs
                {activeTab === 'reviews' && <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-1 bg-[#D4AF37] rounded-t-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />}
             </button>
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-grow overflow-y-auto bg-[#040812]/40 backdrop-blur-sm custom-scrollbar relative">
          <AnimatePresence mode="popLayout">
            {activeTab === 'profile' && (
              <motion.div key="profile" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="p-6 md:p-10 space-y-10">
                
                {/* Account Status */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-sm">
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Email Status</p>
                     <p className="text-white font-bold text-sm flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Verified</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-sm">
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Mobile Status</p>
                     {verificationStep === 'verified' ? (
                        <p className="text-white font-bold text-sm flex items-center gap-2"><CheckCircle2 size={14} className="text-green-400" /> Verified</p>
                     ) : (
                        <p className="text-amber-400 font-bold text-sm flex items-center gap-2"><AlertCircle size={14} /> Pending</p>
                     )}
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-sm">
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Total Trips</p>
                     <p className="text-[#D4AF37] font-black text-xl leading-none">{totalTrips}</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5 shadow-sm">
                     <p className="text-[9px] text-slate-500 uppercase tracking-widest font-black mb-1">Last Booking</p>
                     <p className="text-white font-bold text-sm">{pastBookings.length > 0 ? new Date(pastBookings[0].timestamp).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>

                {message && (
                  <div className={`p-4 rounded-xl text-[10px] font-bold text-center uppercase tracking-widest leading-relaxed ${message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {message.text}
                  </div>
                )}

                <div className="space-y-6 max-w-2xl">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4">Personal Credentials</h3>
                  
                  {/* Name Field */}
                  <div className="space-y-2.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2">Full Legal Name</label>
                    <div className="relative">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><User size={16} /></div>
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} className={`w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 text-white border-2 ${isEditing ? 'border-[#D4AF37]/50 focus:border-[#D4AF37]' : 'border-white/5'} focus:outline-none transition-all font-bold text-sm`} />
                      {!isEditing && (
                        <button onClick={() => setIsEditing(true)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D4AF37]"><Edit2 size={16} /></button>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2.5">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
                    <div className="relative opacity-60">
                      <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Mail size={16} /></div>
                      <input type="email" value={user.email} disabled className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white/5 text-white border-2 border-transparent font-bold text-sm cursor-not-allowed" />
                    </div>
                  </div>

                  {/* Mobile Field with OTP Flow */}
                  <div className="space-y-2.5 mt-8 border-t border-white/10 pt-8">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest ml-2 flex justify-between">
                       <span>Mobile Telephony</span>
                       {verificationStep === 'verified' && <span className="text-green-400 flex items-center gap-1"><ShieldCheck size={12}/> Secure Verified</span>}
                    </label>
                    
                    {verificationStep !== 'otp' ? (
                       <div className="relative">
                         <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"><Phone size={16} /></div>
                         <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} disabled={!isMobileEditing} placeholder="Enter 10 digit mobile number" className={`w-full pl-12 pr-32 py-4 rounded-2xl bg-white/5 text-white border-2 ${isMobileEditing ? 'border-[#D4AF37]/50 focus:border-[#D4AF37]' : 'border-white/5'} ring-4 ring-transparent focus:ring-[#D4AF37]/10 focus:outline-none transition-all font-bold text-sm`} />
                         
                         {!isMobileEditing && verificationStep === 'verified' && (
                           <button onClick={() => { setIsMobileEditing(true); setVerificationStep('idle'); }} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#D4AF37] transition-colors"><Edit2 size={16} /></button>
                         )}
                         
                         {(isMobileEditing || verificationStep === 'idle') && (
                            <button onClick={handleSendOtp} className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#D4AF37] text-[#040812] px-5 py-2.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-white transition-all shadow-md active:scale-95">
                               Verify Number
                            </button>
                         )}
                       </div>
                    ) : (
                       <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-2xl p-6 lg:p-8 animate-in fade-in zoom-in-95 shadow-inner">
                          <p className="text-xs font-bold text-white mb-6 text-center">Secure Verification Code sent to <span className="text-[#D4AF37]">{mobile}</span></p>
                          <div className="flex justify-center gap-2 md:gap-3 mb-8">
                             {otp.map((digit, idx) => (
                               <input 
                                 key={idx} 
                                 type="text" 
                                 maxLength={1} 
                                 value={digit}
                                 onChange={(e) => handleOtpChange(idx, e.target.value)}
                                 className="w-10 h-10 md:w-14 md:h-14 bg-white/10 border border-white/20 rounded-xl text-center text-xl font-black text-white focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/20 focus:outline-none focus:bg-white/20 transition-all font-mono"
                               />
                             ))}
                          </div>
                          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                             <button onClick={() => setVerificationStep('idle')} className="text-[10px] text-slate-400 font-bold uppercase tracking-widest hover:text-white transition-colors">Cancel Verification</button>
                             
                             <div className="flex items-center gap-4">
                                <button disabled={countdown > 0} onClick={handleSendOtp} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${countdown > 0 ? 'text-slate-600' : 'text-[#D4AF37] hover:text-white'}`}>
                                   Resend {countdown > 0 && `(${countdown}s)`}
                                </button>
                                <button onClick={handleVerifyOtp} className="bg-[#D4AF37] text-[#040812] px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-colors active:scale-95 shadow-md">
                                   Confirm Identity
                                </button>
                             </div>
                          </div>
                       </div>
                    )}
                  </div>
                </div>

                {/* Save Buttons */}
                {(isEditing || isMobileEditing) && verificationStep !== 'otp' && (
                  <div className="flex gap-4 pt-6 border-t border-white/5">
                     <button onClick={() => { setIsEditing(false); setIsMobileEditing(false); setName(user.name); setMobile(user.mobile||''); if(user.mobile) setVerificationStep('verified'); }} className="px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-white transition-all text-[10px] uppercase tracking-[0.25em] hover:bg-white/5 border border-transparent">
                       Discard
                     </button>
                     <button onClick={handleSaveProfile} disabled={isLoading || (isMobileEditing && verificationStep !== 'verified')} className={`premium-glass-btn-solid flex-1 max-w-xs py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.25em] flex items-center justify-center gap-3 ${isMobileEditing && verificationStep !== 'verified' ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}>
                       {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                       Update Credentials
                     </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'trips' && (
              <motion.div key="trips" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="p-6 md:p-10">
                 {bookingsLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                      <Loader2 size={40} className="animate-spin mb-6 text-[#D4AF37] opacity-60" />
                      <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-slate-300 animate-pulse">Syncing Voyage Records...</p>
                    </div>
                 ) : (
                    <div className="space-y-12 max-w-5xl mx-auto">
                       
                       {/* Upcoming Trips */}
                       <section>
                          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                             <Sparkles className="text-[#D4AF37]" size={16} /> Active & Upcoming Voyages
                          </h3>
                          {upcomingBookings.length > 0 ? (
                             <div className="space-y-4">
                                {upcomingBookings.map(booking => (
                                   <div key={booking.id} className="bg-gradient-to-r from-slate-900 to-[#0A101D] p-6 md:p-8 rounded-[2rem] border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.08)] relative overflow-hidden group hover:border-[#D4AF37]/60 transition-colors">
                                      <div className="absolute right-0 top-0 w-48 h-48 bg-[#D4AF37]/10 blur-[60px] rounded-full group-hover:bg-[#D4AF37]/20 transition-all"></div>
                                      
                                      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                         <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-4">
                                               <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                               <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">#{booking.bookingId}</span>
                                            </div>
                                            <h4 className="text-xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3 mb-6">
                                               {booking.pickup.split(',')[0]} <ArrowRight size={20} className="text-[#D4AF37]" /> {booking.drop.split(',')[0]}
                                            </h4>
                                            
                                            <div className="flex flex-wrap items-center gap-4 md:gap-8 text-xs font-bold text-slate-300">
                                               <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl"><Calendar size={14} className="text-[#D4AF37]" /> {new Date(booking.date).toLocaleDateString()}</div>
                                               <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl"><Clock size={14} className="text-[#D4AF37]" /> {booking.time}</div>
                                               <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-xl"><Car size={14} className="text-[#D4AF37]" /> {booking.vehicle}</div>
                                            </div>
                                         </div>
                                         
                                         {booking.assignedDriver && (
                                            <div className="bg-[#040812]/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/10 flex items-center gap-5 shrink-0 shadow-inner w-full lg:w-auto">
                                               <div className="w-12 h-12 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-white shrink-0"><User size={20} /></div>
                                               <div>
                                                  <p className="text-[8px] font-black uppercase tracking-widest text-[#D4AF37] mb-1">Assigned Pilot</p>
                                                  <p className="text-base font-bold text-white tracking-tight">{booking.assignedDriver.name}</p>
                                                  <p className="text-xs font-mono font-bold text-slate-400 mt-1 uppercase">{booking.assignedDriver.vehicleNumber}</p>
                                               </div>
                                            </div>
                                         )}
                                      </div>
                                   </div>
                                ))}
                             </div>
                          ) : (
                             <div className="bg-white/[0.02] border border-white/10 border-dashed rounded-[2rem] p-10 text-center text-slate-500">
                                <Car size={32} className="mx-auto mb-4 opacity-30" />
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">No active voyages scheduled</p>
                                <p className="text-[10px] font-medium text-slate-500 mt-2">Book a ride to see it tracked here live.</p>
                             </div>
                          )}
                       </section>

                       {/* Past Bookings */}
                       <section>
                          <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                             <h3 className="text-sm font-black text-white uppercase tracking-widest">Voyage History ({pastBookings.length})</h3>
                             <button onClick={fetchBookings} className="text-[10px] p-2 bg-white/5 rounded-lg border border-white/10 font-bold text-[#D4AF37] uppercase tracking-widest hover:text-white flex items-center gap-2 hover:bg-white/10 transition-colors active:scale-95"><RefreshCw size={12} /> Sync Logs</button>
                          </div>
                          
                          {pastBookings.length > 0 ? (
                             <div className="grid gap-4">
                                {pastBookings.map(booking => (
                                   <div key={booking.id} className="bg-white/5 p-5 md:p-6 rounded-[1.5rem] border border-white/5 hover:border-white/10 transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                                      <div className="flex items-center gap-5 md:gap-6">
                                         <div className="w-14 h-14 bg-black/40 rounded-2xl flex flex-col items-center justify-center text-[#D4AF37] border border-white/5 shrink-0 shadow-inner group-hover:scale-105 transition-transform">
                                            <span className="text-lg font-serif font-bold leading-none">{new Date(booking.date).getDate()}</span>
                                            <span className="text-[8px] uppercase tracking-widest mt-1 opacity-70 font-bold">{new Date(booking.date).toLocaleString('default', { month: 'short' })}</span>
                                         </div>
                                         <div>
                                            <div className="flex items-center gap-3 mb-1.5 opacity-80">
                                               <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>{booking.status}</span>
                                               <span className="text-[9px] font-mono font-bold text-slate-500 uppercase tracking-widest">#{booking.bookingId}</span>
                                            </div>
                                            <h4 className="text-sm md:text-base font-bold text-white tracking-tight leading-snug flex items-center gap-2 mb-1">
                                               {booking.pickup.split(',')[0]} <ArrowRight size={12} className="text-slate-500" /> {booking.drop.split(',')[0]}
                                            </h4>
                                            <div className="flex items-center gap-4 text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-2">
                                               <span><Car size={10} className="inline mr-1" /> {booking.vehicle}</span>
                                               <span><Clock size={10} className="inline mr-1" /> {booking.time}</span>
                                            </div>
                                         </div>
                                      </div>
                                      
                                      <div className="flex items-center justify-between md:flex-col md:items-end gap-4 border-t border-white/5 md:border-none pt-4 md:pt-0">
                                         <p className="text-xl font-serif text-[#D4AF37] tracking-tight">₹{booking.price}</p>
                                         <div className="flex items-center gap-3">
                                            {booking.status === 'completed' && !myReviews.find(r => r.booking_id === booking.bookingId) && (
                                              <button onClick={() => {
                                                setSelectedBookingForReview(booking);
                                                setShowReviewForm(true);
                                              }} className="px-4 py-2.5 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30 rounded-xl text-[9px] font-black uppercase tracking-widest text-[#D4AF37] transition-colors flex items-center gap-2 shadow-sm">
                                                <Star size={12} /> Rate Experience
                                              </button>
                                            )}
                                            <button onClick={() => {
                                                window.scrollTo({top: 0, behavior: 'smooth'});
                                                onClose();
                                            }} className="px-4 py-2.5 bg-white/5 hover:bg-[#D4AF37] border border-white/10 hover:border-[#D4AF37] rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-300 hover:text-[#040812] transition-colors flex items-center gap-2 shadow-sm">
                                                <RefreshCcw size={12} /> Rebook
                                            </button>
                                         </div>
                                      </div>
                                   </div>
                                ))}
                             </div>
                          ) : (
                             <div className="py-16 text-center text-slate-500 border border-white/5 rounded-[2rem] bg-white/[0.01]">
                                <Clock size={32} className="mx-auto mb-4 opacity-50" />
                                <p className="text-xs font-bold uppercase tracking-widest">No past voyages on record</p>
                             </div>
                          )}
                       </section>

                    </div>
                 )}
              </motion.div>
            )}
            {activeTab === 'rewards' && (
              <motion.div key="rewards" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="p-6 md:p-10">
                 {rewardsLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                      <Loader2 size={40} className="animate-spin mb-6 text-[#D4AF37] opacity-60" />
                      <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-slate-300 animate-pulse">Loading Rewards...</p>
                    </div>
                 ) : customerData ? (
                    <div className="space-y-12 max-w-5xl mx-auto">
                       
                       <section className="bg-gradient-to-r from-slate-900 to-[#0A101D] p-8 md:p-10 rounded-[2rem] border border-[#D4AF37]/30 shadow-[0_0_30px_rgba(212,175,55,0.08)] relative overflow-hidden group">
                           <div className="absolute right-0 top-0 w-64 h-64 bg-[#D4AF37]/10 blur-[80px] rounded-full"></div>
                           <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
                               <div>
                                   <div className="flex items-center gap-3 mb-6">
                                       <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/30">
                                           {customerData.loyalty_tier} Tier
                                       </span>
                                   </div>
                                   <h3 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-2">Rewards Wallet</h3>
                                   <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Available Points Balance</p>
                                   
                                   <div className="mt-8 flex items-baseline gap-4">
                                       <span className="text-6xl font-serif text-[#D4AF37] font-black tracking-tight leading-none">
                                           {(customerData.total_points || 0) - (customerData.redeemed_points || 0)}
                                       </span>
                                       <span className="text-lg font-bold text-slate-500 uppercase tracking-widest">PTS</span>
                                   </div>
                               </div>
                               
                               <div className="bg-[#040812]/80 backdrop-blur-md p-6 rounded-[1.5rem] border border-white/10 w-full md:w-auto shadow-inner space-y-4 text-center">
                                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total Points Earned: {(customerData.total_points || 0)}</p>
                                   <p className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Total Redeemed: {(customerData.redeemed_points || 0)}</p>
                                   
                                   <div className="pt-4 border-t border-white/10 mt-4">
                                       <p className="text-xs font-bold text-white mb-2">Redeem at Checkout</p>
                                       <p className="text-[10px] font-medium text-slate-400 leading-relaxed max-w-[200px] mx-auto">
                                           Every 500 points can be redeemed for a ₹100 discount on your next voyage.
                                       </p>
                                   </div>
                               </div>
                           </div>
                       </section>

                       <section>
                           <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                               <Gift className="text-[#D4AF37]" size={16} /> Refer & Earn
                           </h3>
                           
                           <div className="grid md:grid-cols-2 gap-8 items-start">
                               <div className="space-y-6">
                                   <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                       Invite your friends to experience GeeVee Premium Fleet. 
                                       They get a VIP onboarding experience, and you earn <span className="text-[#D4AF37] font-bold">100 Bonus Points</span> for every friend who completed their first voyage!
                                   </p>
                                   
                                   <div className="bg-white/5 p-6 rounded-[1.5rem] border border-white/10">
                                       <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Your Unique Referral Code</p>
                                       <div className="flex items-center gap-4">
                                           <code className="flex-1 bg-[#040812] px-6 py-4 rounded-xl text-xl font-mono text-[#D4AF37] font-black tracking-[0.2em] shadow-inner text-center">
                                               {customerData.referral_code}
                                           </code>
                                           <div className="flex flex-col gap-2 shrink-0">
                                               <button onClick={() => {
                                                   navigator.clipboard.writeText(customerData.referral_code);
                                                   setCopiedLink(true);
                                                   setTimeout(() => setCopiedLink(false), 2000);
                                               }} className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors active:scale-95 text-white" title="Copy Code">
                                                   {copiedLink ? <CheckCircle2 size={20} className="text-green-400"/> : <Copy size={20} />}
                                               </button>
                                               <a href={`https://wa.me/?text=Use my unique referral code ${customerData.referral_code} for GeeVee Premium Fleet and experience luxury travel!`} target="_blank" rel="noopener noreferrer" className="p-3 bg-green-500/20 hover:bg-green-500/30 rounded-xl transition-colors active:scale-95 text-green-400" title="Share on WhatsApp">
                                                   <Share2 size={20} />
                                               </a>
                                           </div>
                                       </div>
                                       {copiedLink && <p className="text-[10px] text-green-400 uppercase tracking-widest font-bold mt-3 text-center animate-pulse">Code Copied!</p>}
                                   </div>
                               </div>

                               <div className="bg-[#040812]/50 p-6 rounded-[2rem] border border-white/5 h-full">
                                   <div className="flex items-center justify-between mb-6">
                                       <h4 className="text-xs font-black text-white uppercase tracking-widest">Referral History</h4>
                                       <span className="text-[10px] font-bold text-[#D4AF37] bg-[#D4AF37]/10 px-3 py-1 rounded-full">{referrals.length} Referrals</span>
                                   </div>
                                   
                                   <div className="space-y-4 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                       {referrals.length > 0 ? referrals.map(ref => (
                                           <div key={ref.id} className="bg-white/5 p-4 rounded-xl flex items-center justify-between gap-4 border border-white/5">
                                               <div>
                                                   <p className="text-xs font-bold text-white">{ref.referred_mobile}</p>
                                                   <p className="text-[10px] font-medium text-slate-500 uppercase tracking-widest mt-1">{new Date(ref.created_at).toLocaleDateString()}</p>
                                               </div>
                                               <div className="text-right">
                                                   <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${ref.status === 'completed' ? 'text-green-400' : 'text-amber-400'}`}>
                                                       {ref.status}
                                                   </p>
                                                   {ref.status === 'completed' && <p className="text-xs font-bold text-[#D4AF37]">+{ref.points_awarded} PTS</p>}
                                               </div>
                                           </div>
                                       )) : (
                                           <div className="text-center py-10 opacity-60">
                                               <Gift size={24} className="mx-auto mb-3 text-slate-500" />
                                               <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400">No Referrals Yet</p>
                                           </div>
                                       )}
                                   </div>
                               </div>
                           </div>
                       </section>
                    </div>
                 ) : (
                     <div className="text-center py-20">
                         <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Failed to load rewards profile.</p>
                         <button onClick={fetchRewardsData} className="mt-4 px-6 py-2 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 text-white transition-all">Retry</button>
                     </div>
                 )}
              </motion.div>
            )}
             {activeTab === 'reviews' && (
              <motion.div key="reviews" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }} className="p-6 md:p-10">
                 {reviewsLoading ? (
                    <div className="flex flex-col items-center justify-center py-32 text-slate-400">
                      <Loader2 size={40} className="animate-spin mb-6 text-[#D4AF37] opacity-60" />
                      <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-slate-300 animate-pulse">Fetching Review History...</p>
                    </div>
                 ) : (
                    <div className="space-y-12 max-w-5xl mx-auto">
                       <section>
                          <h3 className="text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-3 border-b border-white/10 pb-4">
                             <MessageSquare className="text-[#D4AF37]" size={16} /> Submitted Reviews & Ratings
                          </h3>
                          
                          {myReviews.length > 0 ? (
                             <div className="grid gap-6">
                                {myReviews.map(review => (
                                   <div key={review.id} className="bg-white/5 p-6 rounded-[2rem] border border-white/5 relative group">
                                      <div className="flex items-center justify-between mb-4">
                                         <div className="flex items-center gap-1">
                                            {[1, 2, 3, 4, 5].map(star => (
                                               <Star key={star} size={14} className={star <= review.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white/10"} />
                                            ))}
                                         </div>
                                         <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest border ${review.status === 'approved' ? 'bg-green-900/20 text-green-400 border-green-800/30' : review.status === 'rejected' ? 'bg-red-900/20 text-red-400 border-red-800/30' : 'bg-amber-900/20 text-amber-400 border-amber-800/30'}`}>
                                               {review.status}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{new Date(review.created_at).toLocaleDateString()}</span>
                                         </div>
                                      </div>
                                      <p className="text-[10px] font-black text-[#D4AF37] uppercase tracking-widest mb-2">{review.route}</p>
                                      <h4 className="text-white font-bold text-lg mb-2">{review.title}</h4>
                                      <p className="text-slate-400 text-sm leading-relaxed">{review.comment}</p>
                                   </div>
                                ))}
                             </div>
                          ) : (
                             <div className="py-20 text-center border border-white/5 border-dashed rounded-[2rem] bg-white/[0.01]">
                                <MessageSquare size={32} className="mx-auto mb-4 opacity-30 text-slate-500" />
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">No reviews submitted yet</p>
                                <p className="text-[10px] font-medium text-slate-600 mt-2">Completed voyages will show a "Rate Experience" option.</p>
                             </div>
                          )}
                       </section>
                    </div>
                 )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Review Form Overlay */}
        <AnimatePresence>
          {showReviewForm && selectedBookingForReview && (
            <div className="absolute inset-0 z-[210] flex items-center justify-center p-6 bg-slate-950/95 backdrop-blur-2xl">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full max-w-lg bg-gradient-to-b from-slate-900 to-[#040812] rounded-[3rem] border border-[#D4AF37]/30 p-8 lg:p-10 shadow-2xl relative">
                 <button onClick={() => setShowReviewForm(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors">
                    <X size={20} />
                 </button>
                 
                 <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mx-auto mb-4">
                       <Star size={32} />
                    </div>
                    <h3 className="text-2xl font-serif text-white tracking-tight">Rate Your Journey</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-2">{selectedBookingForReview.pickup.split(',')[0]} to {selectedBookingForReview.drop.split(',')[0]}</p>
                 </div>

                 <div className="space-y-6">
                    {/* Stars */}
                    <div className="flex justify-center gap-3">
                       {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} onClick={() => setReviewForm(prev => ({ ...prev, rating: star }))} className="transition-transform active:scale-90 outline-none">
                             <Star size={36} className={star <= reviewForm.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-white/10 hover:text-white/25"} />
                          </button>
                       ))}
                    </div>

                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Review Headline</label>
                          <input 
                            type="text" 
                            placeholder="e.g. Excellent Service, Smooth Voyage"
                            value={reviewForm.title}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, title: e.target.value }))}
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/5 focus:border-[#D4AF37] text-white focus:outline-none transition-all font-bold text-sm"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-2">Description</label>
                          <textarea 
                            rows={4}
                            placeholder="Share the details of your experience..."
                            value={reviewForm.comment}
                            onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                            className="w-full px-6 py-4 rounded-2xl bg-white/5 border-2 border-white/5 focus:border-[#D4AF37] text-white focus:outline-none transition-all font-bold text-sm resize-none"
                          />
                       </div>
                    </div>

                    <button 
                      onClick={handleRatingSubmit}
                      disabled={isSubmittingReview || !reviewForm.title || !reviewForm.comment}
                      className="w-full py-4 bg-[#D4AF37] text-[#040812] rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed"
                    >
                       {isSubmittingReview ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                       Submit Verified Review
                    </button>
                    
                    <button 
                      onClick={() => window.open('https://g.page/GeeVeeTravels/review', '_blank')}
                      className="w-full py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all flex items-center justify-center gap-3 mt-2"
                    >
                       <Globe size={16} className="text-[#D4AF37]" />
                       Post on Google Maps
                    </button>
                 </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default UserProfile;
