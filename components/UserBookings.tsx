
import React, { useEffect, useState } from 'react';
import { X, Calendar, MapPin, Clock, Car, Loader2, RefreshCw } from 'lucide-react';
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
      case 'confirmed': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800/50';
      case 'completed': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
      case 'cancelled': return 'bg-red-50 dark:bg-red-900/30 text-red-500 border-red-100 dark:border-red-800/50';
      default: return 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/50';
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}></div>
      
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300 transition-colors">
        
        {/* Header */}
        <div className="bg-geevee-dark p-8 flex items-center justify-between shrink-0">
          <div>
            <h3 className="text-2xl font-black text-white">Your Journeys</h3>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
              History for +91 {user?.mobile}
            </p>
          </div>
          <button onClick={onClose} className="p-2 bg-white/10 text-white hover:bg-white/20 rounded-full transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 overflow-y-auto bg-slate-50 dark:bg-[#0a0a0a] flex-grow transition-colors">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <Loader2 size={32} className="animate-spin mb-4 text-geevee-orange" />
              <p className="font-bold text-xs uppercase tracking-widest">Loading Records...</p>
            </div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300 dark:text-slate-600">
                <Car size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">No Trips Found</h4>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">You haven't booked any trips with us yet.</p>
              <button onClick={onClose} className="bg-geevee-orange text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-orange-600 transition-all">
                Book Your First Ride
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-slate-50 dark:bg-white/5 rounded-2xl flex items-center justify-center text-slate-400 dark:text-slate-500 font-black text-sm shrink-0">
                        {new Date(booking.date).getDate()}
                        <span className="text-[8px] uppercase block -mt-1 ml-0.5">
                          {new Date(booking.date).toLocaleString('default', { month: 'short' })}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500">#{booking.bookingId || booking.id}</span>
                        </div>
                        <h4 className="font-black text-slate-900 dark:text-white text-lg flex items-center gap-2">
                          {booking.pickup.split(',')[0]} 
                          <span className="text-slate-300 dark:text-slate-600 text-sm">➔</span> 
                          {booking.drop.split(',')[0]}
                        </h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="block font-black text-geevee-orange text-xl">₹{booking.price || '---'}</span>
                      <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase">Estimated</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-white/5">
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <Car size={16} className="text-slate-300 dark:text-slate-600" />
                      <span className="text-xs font-bold">{booking.vehicle}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                      <Clock size={16} className="text-slate-300 dark:text-slate-600" />
                      <span className="text-xs font-bold">{booking.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/10 flex justify-between items-center shrink-0">
           <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500">Showing {bookings.length} records</p>
           <button onClick={fetchBookings} className="flex items-center gap-2 text-geevee-orange hover:bg-orange-50 dark:hover:bg-orange-900/20 px-4 py-2 rounded-xl transition-all">
              <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
              <span className="text-xs font-black uppercase tracking-widest">Refresh</span>
           </button>
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
