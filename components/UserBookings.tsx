import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Clock, Car, Loader2, RefreshCw, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.tsx';
import { BookingService } from '../services/booking.ts';

interface UserBookingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserBookings: React.FC<UserBookingsProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && user?.mobile) {
      fetchBookings();
    }
  }, [isOpen, user]);

  const fetchBookings = async () => {
    setLoading(true);
    if (user?.mobile) {
      const data = await BookingService.getUserBookings(user.mobile);
      setBookings(data);
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-900/30 text-green-400 border-green-800/50';
      case 'completed': return 'bg-[#D4AF37]/10 text-[#FCF6BA] border-[#D4AF37]/30';
      case 'cancelled': return 'bg-red-950/30 text-red-400 border-red-900/50';
      default: return 'bg-amber-900/30 text-amber-400 border-amber-800/50';
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose}></div>
      
      <div className="relative bg-gradient-to-b from-[#0C1E38]/95 via-[#040812]/98 to-[#040812] w-full max-w-3xl rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_45px_135px_rgba(0,0,0,0.85)] flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-500 border border-[#D4AF37]/25">
        
        {/* Header */}
        <div className="bg-slate-950/80 p-8 md:p-10 flex items-center justify-between shrink-0 relative overflow-hidden border-b border-[#D4AF37]/15">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-[#D4AF37]">
            <Car size={160} />
          </div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="bg-[#D4AF37]/10 p-3 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37] hidden sm:block">
              <Sparkles size={24} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight italic">Your Voyage History</h3>
              <p className="text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.25em] mt-2">
                Elite Passenger logs • +91 {user?.mobile}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-2xl transition-all border border-white/10 relative z-10"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-10 overflow-y-auto bg-[#040812]/40 backdrop-blur-sm flex-grow">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <Loader2 size={40} className="animate-spin mb-6 text-[#D4AF37] opacity-60" />
              <p className="font-bold text-[10px] uppercase tracking-[0.3em] text-slate-300 animate-pulse">Syncing Voyage Records...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-[#D4AF37]/5 rounded-[2rem] flex items-center justify-center mx-auto mb-8 text-[#D4AF37] border border-[#D4AF37]/20 shadow-inner">
                <Car size={36} />
              </div>
              <h4 className="text-2xl font-serif text-[#FCF6BA] mb-3">No Active Voyages</h4>
              <p className="text-slate-400 text-sm font-medium mb-10 max-w-xs mx-auto leading-relaxed">Your luxury travel history is currently empty. Initiate your first masterclass journey today.</p>
              <button 
                onClick={onClose} 
                className="premium-glass-btn-solid px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em]"
              >
                Initiate First Ride
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white/5 p-6 md:p-8 rounded-[2rem] border border-white/5 hover:border-[#D4AF37]/25 shadow-xl transition-all duration-500 overflow-hidden relative group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
                    <div className="flex gap-5">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl flex flex-col items-center justify-center text-[#D4AF37] font-bold border border-white/10 shadow-sm shrink-0">
                        <span className="text-md font-serif leading-none">{new Date(booking.date).getDate()}</span>
                        <span className="text-[8px] uppercase tracking-widest mt-1 opacity-70">
                          {new Date(booking.date).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-widest border ${getStatusColor(booking.status)} shadow-sm`}>
                            {booking.status}
                          </span>
                          <span className="text-[9px] font-black text-slate-500 tracking-widest uppercase">#{booking.bookingId || booking.id.slice(0, 8)}</span>
                        </div>
                        <h4 className="font-bold text-white text-lg md:text-xl tracking-tight flex items-center gap-2 group-hover:text-[#FCF6BA] transition-colors">
                          {booking.pickup.split(',')[0]} 
                          <ArrowRight size={14} className="text-[#D4AF37] opacity-60" /> 
                          {booking.drop.split(',')[0]}
                        </h4>
                      </div>
                    </div>
                    <div className="md:text-right border-t md:border-t-0 border-white/5 pt-4 md:pt-0">
                      <p className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-1">Luxury Estimate</p>
                      <p className="text-2xl md:text-3xl font-serif text-[#FCF6BA] tracking-tight">₹{booking.price || '---'}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-5 border-t border-white/5">
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="w-9 h-9 bg-[#040812]/50 rounded-xl flex items-center justify-center text-[#D4AF37] border border-white/5">
                        <Car size={16} />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Model</p>
                        <span className="text-xs font-bold block text-white">{booking.vehicle}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-slate-300">
                      <div className="w-9 h-9 bg-[#040812]/50 rounded-xl flex items-center justify-center text-[#D4AF37] border border-white/5">
                        <Clock size={16} />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">Departure</p>
                        <span className="text-xs font-bold block text-white">{booking.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-6 md:p-8 bg-slate-950/80 border-t border-[#D4AF37]/15 flex justify-between items-center shrink-0">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Archives • {bookings.length} Voyage Entries</p>
           <button 
             onClick={fetchBookings} 
             disabled={loading}
             className="flex items-center gap-3 text-[#FCF6BA] border border-white/5 hover:border-[#D4AF37]/45 hover:bg-[#D4AF37]/10 px-6 py-3.5 rounded-2xl transition-all shadow-sm active:scale-95 duration-500 bg-white/5"
           >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">{loading ? 'Syncing...' : 'Refresh Logs'}</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
