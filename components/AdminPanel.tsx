import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Calendar, 
  Settings, 
  LogOut, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  Trash2,
  Car,
  Search,
  ArrowRight,
  Check,
  X,
  RefreshCw,
  Activity,
  Loader2,
  MapPin,
  Users,
  Briefcase,
  Fuel,
  Plus,
  Save,
  User,
  Phone,
  BadgeCheck,
  CreditCard
} from 'lucide-react';
import { BookingService } from '../services/booking.ts';
import { DETAILED_VEHICLES } from '../constants.tsx';
import Logo from './Logo.tsx';
import { ServiceType } from '../types.ts';

interface AdminPanelProps {
  onLogout: () => void;
}

const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const styles: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
    confirmed: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20'
  };
  return (
    <motion.span 
      key={status}
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 500, damping: 25 }}
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles[status] || styles.pending} inline-block`}
    >
      {status}
    </motion.span>
  );
};

const DriverStatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const isAvailable = status === 'available';
  return (
    <motion.span 
      key={status}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-1 w-fit ${
      isAvailable ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
    }`}>
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className={`w-1.5 h-1.5 rounded-full ${isAvailable ? 'bg-green-500' : 'bg-orange-500'}`}
      ></motion.div>
      {status === 'available' ? 'Available' : 'On Duty'}
    </motion.span>
  );
};

const AssignDriverModal: React.FC<{ 
  isOpen: boolean; 
  booking: any; 
  drivers: any[]; 
  onClose: () => void; 
  onAssign: (driver: any) => void;
}> = ({ isOpen, booking, drivers, onClose, onAssign }) => {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  
  if (!isOpen || !booking) return null;

  const availableDrivers = drivers.filter(d => d.status === 'available');

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121212] w-full max-w-md rounded-[2rem] border border-white/10 p-8 shadow-2xl animate-in zoom-in-95">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-black text-white">Assign Duty</h3>
            <p className="text-xs text-slate-500 mt-1">Booking #{booking.bookingId}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={20} /></button>
        </div>

        <div className="mb-6 bg-white/5 p-4 rounded-xl border border-white/5">
           <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
              <MapPin size={14} className="text-geevee-orange" />
              {booking.pickup.split(',')[0]} ➔ {booking.drop.split(',')[0]}
           </div>
           <div className="flex gap-4 text-xs text-slate-400">
              <span>{booking.date}</span>
              <span>{booking.time}</span>
              <span>{booking.vehicle}</span>
           </div>
        </div>
        
        <div className="space-y-4">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Select Pilot</label>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {availableDrivers.length > 0 ? availableDrivers.map(driver => (
              <button
                key={driver.id}
                onClick={() => setSelectedDriverId(driver.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between ${
                  selectedDriverId === driver.id 
                    ? 'bg-geevee-orange text-white border-geevee-orange' 
                    : 'bg-white/5 text-slate-300 border-white/10 hover:border-white/30'
                }`}
              >
                <div>
                  <p className="font-bold text-sm">{driver.name}</p>
                  <p className="text-[10px] opacity-70 flex items-center gap-1">
                    <Car size={10} /> {driver.vehicleModel} • {driver.vehicleNumber || 'N/A'}
                  </p>
                </div>
                {selectedDriverId === driver.id && <CheckCircle size={18} />}
              </button>
            )) : (
              <p className="text-sm text-slate-500 text-center py-4">No drivers currently available.</p>
            )}
          </div>
          
          <button 
            onClick={() => {
              const driver = drivers.find(d => d.id === selectedDriverId);
              if (driver) onAssign(driver);
            }}
            disabled={!selectedDriverId}
            className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-geevee-orange hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
};

const AddDriverModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (data: any) => void }> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    license: '',
    vehicleModel: 'Toyota Etios', // Default
    vehicleNumber: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setFormData({ name: '', mobile: '', license: '', vehicleModel: 'Toyota Etios', vehicleNumber: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121212] w-full max-w-md rounded-[2rem] border border-white/10 p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-white">Add New Pilot</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Driver Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
          <input required placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
          <input required placeholder="License Number" value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Vehicle Model</label>
                <select value={formData.vehicleModel} onChange={e => setFormData({...formData, vehicleModel: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange">
                   {DETAILED_VEHICLES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Vehicle No.</label>
                <input required placeholder="TN 01 AB 1234" value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value.toUpperCase()})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
             </div>
          </div>
          
          <button type="submit" className="w-full bg-geevee-orange text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4">
            <Plus size={18} /> Register Driver
          </button>
        </form>
      </div>
    </div>
  );
};

const ManualBookingModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: () => void }> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    customerName: '',
    mobile: '',
    pickup: '',
    drop: '',
    date: '',
    time: '',
    vehicle: 'Toyota Etios',
    service: ServiceType.ONE_WAY,
    price: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await BookingService.saveBooking({
      ...formData,
      price: Number(formData.price)
    });
    setIsSaving(false);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#121212] w-full max-w-lg rounded-[2rem] border border-white/10 p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-white">New Manual Booking</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Customer Name" value={formData.customerName} onChange={e => setFormData({...formData, customerName: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
            <input required placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="Pickup Location" value={formData.pickup} onChange={e => setFormData({...formData, pickup: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
            <input required placeholder="Drop Location" value={formData.drop} onChange={e => setFormData({...formData, drop: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <input required type="date" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
            <input required type="time" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange">
              {DETAILED_VEHICLES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
            </select>
            <select value={formData.service} onChange={e => setFormData({...formData, service: e.target.value as ServiceType})} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange">
              {Object.values(ServiceType).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <input required type="number" placeholder="Agreed Price (₹)" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-geevee-orange font-bold tracking-wider" />
          
          <button type="submit" disabled={isSaving} className="w-full bg-geevee-orange text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
            {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />} Create Record
          </button>
        </form>
      </div>
    </div>
  );
};

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  
  // Modals
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [assignModal, setAssignModal] = useState<{ isOpen: boolean; booking: any | null }>({ isOpen: false, booking: null });

  const loadData = useCallback(async (force = false) => {
    if (force) setIsRefreshing(true);
    setLoadError(null);
    
    try {
      if (force) await new Promise(resolve => setTimeout(resolve, 600));

      const b = await BookingService.getAllBookings();
      const s = await BookingService.getStats();
      const d = await BookingService.getDrivers();
      
      setBookings(b);
      setStats(s);
      setDrivers(d);
    } catch (err) {
      console.error("Failed to load admin data", err);
      setLoadError("Unable to synchronize with server database.");
    } finally {
      setIsLoading(false);
      if (force) setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this booking record? This action cannot be undone.')) {
      await BookingService.deleteBooking(id);
      loadData();
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    await BookingService.updateBookingStatus(id, status);
    loadData();
  };

  const handleAddDriver = async (driverData: any) => {
    await BookingService.addDriver(driverData);
    loadData(true);
  };

  const handleAssignDriver = async (driver: any) => {
    if (!assignModal.booking) return;
    await BookingService.assignDriver(assignModal.booking.id, driver);
    setAssignModal({ isOpen: false, booking: null });
    loadData(true);
  };

  const handleRemoveDriver = async (id: string) => {
    if(confirm("Remove this driver from the fleet?")) {
      await BookingService.deleteDriver(id);
      loadData(true);
    }
  };

  const filteredBookings = useMemo(() => {
    return bookings.filter(b => {
      const matchesSearch = (b.pickup + b.drop + (b.bookingId || '') + b.mobile).toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || b.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [bookings, searchQuery, statusFilter]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white flex-col gap-6">
        <div className="relative">
           <div className="absolute inset-0 bg-geevee-orange blur-xl opacity-20 rounded-full animate-pulse"></div>
           <Logo className="w-24 h-24 relative z-10" isLight />
        </div>
        <div className="flex flex-col items-center gap-2">
           <Loader2 className="animate-spin text-geevee-orange" size={24} />
           <p className="font-black tracking-[0.3em] text-[10px] text-slate-500 uppercase">Establishing Secure Link</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] text-white flex-col gap-6">
        <div className="bg-red-500/10 p-6 rounded-3xl border border-red-500/20 text-center max-w-md">
           <div className="w-12 h-12 bg-red-500/20 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-4">
              <LogOut size={24} />
           </div>
           <h3 className="text-xl font-black text-white mb-2">Connection Failed</h3>
           <p className="text-slate-400 text-sm mb-6">{loadError}</p>
           <div className="flex gap-4 justify-center">
              <button onClick={() => loadData(true)} className="px-6 py-3 bg-white text-black rounded-xl font-bold text-sm hover:bg-slate-200 transition-colors">Retry Sync</button>
              <button onClick={onLogout} className="px-6 py-3 bg-transparent border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/5 transition-colors">Exit Panel</button>
           </div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-slate-300 font-sans selection:bg-geevee-orange/30">
      <ManualBookingModal isOpen={showAddBooking} onClose={() => setShowAddBooking(false)} onSave={() => loadData(true)} />
      <AddDriverModal isOpen={showAddDriver} onClose={() => setShowAddDriver(false)} onSave={handleAddDriver} />
      <AssignDriverModal 
        isOpen={assignModal.isOpen} 
        booking={assignModal.booking} 
        drivers={drivers} 
        onClose={() => setAssignModal({isOpen: false, booking: null})} 
        onAssign={handleAssignDriver}
      />
      
      {/* Sidebar */}
      <aside className="w-80 bg-[#0f0f0f] border-r border-white/5 p-10 flex flex-col fixed h-full z-20">
        <div className="flex items-center gap-5 mb-16">
          <div className="p-2 bg-white/5 rounded-2xl border border-white/10">
            <Logo className="w-14 h-14" isLight />
          </div>
          <div>
            <h1 className="font-black text-xl text-white leading-none tracking-tight">TN ADMIN</h1>
            <p className="text-[10px] text-geevee-orange font-black uppercase tracking-[0.2em] mt-1.5">Command Center</p>
          </div>
        </div>

        <nav className="flex-grow space-y-3">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Overview' },
            { id: 'bookings', icon: Calendar, label: 'Bookings' },
            { id: 'drivers', icon: User, label: 'Drivers' },
            { id: 'fleet', icon: Car, label: 'Fleet Sync' },
            { id: 'settings', icon: Settings, label: 'System' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-5 px-6 py-4 rounded-[1.25rem] font-black text-sm transition-all relative group ${
                activeTab === item.id 
                  ? 'bg-geevee-orange text-white shadow-2xl shadow-geevee-orange/20' 
                  : 'hover:bg-white/5 text-slate-500 hover:text-slate-200'
              }`}
            >
              <span className={activeTab === item.id ? 'text-white' : 'text-slate-600 group-hover:text-geevee-orange transition-colors'}>
                <item.icon size={20} />
              </span>
              {item.label}
              {item.id === 'bookings' && stats.pending > 0 && (
                <span className="ml-auto bg-white text-geevee-orange w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-lg">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-auto flex items-center gap-5 px-8 py-5 bg-white/5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-2xl font-black text-sm transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={20} /> Logout Session
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-80 p-16">
        <header className="flex justify-between items-center mb-16">
          <div>
            <h2 className="text-4xl font-black text-white tracking-tight capitalize mb-2">{activeTab}</h2>
            <div className="flex items-center gap-3 text-slate-500 font-bold text-sm">
              <Clock size={16} className="text-geevee-orange" />
              Real-time synchronization active
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Active Admin</span>
              <span className="text-white font-black">TN Taxi Operations</span>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-geevee-orange to-orange-700 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-2xl shadow-geevee-orange/30">
              G
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className={`space-y-12 transition-opacity duration-500 ${isRefreshing ? 'opacity-40' : 'opacity-100'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Total Volume', value: stats.total, icon: <TrendingUp />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                { label: 'Unresolved', value: stats.pending, icon: <Clock />, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                { label: 'Successful', value: stats.completed, icon: <CheckCircle />, color: 'text-green-500', bg: 'bg-green-500/10' },
                { label: 'Est. Revenue', value: `₹${(stats.estimatedRevenue / 1000).toFixed(1)}k`, icon: <Activity />, color: 'text-geevee-orange', bg: 'bg-geevee-orange/10' }
              ].map((stat, i) => (
                <motion.div 
                  whileHover={{ y: -5, scale: 1.02 }}
                  key={i} 
                  className="bg-[#121212] p-8 rounded-[2.5rem] border border-white/5 shadow-xl relative overflow-hidden group"
                >
                  <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                      {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 28 })}
                    </div>
                  </div>
                  <h4 className="text-slate-500 font-black text-[10px] uppercase tracking-[0.2em] mb-2">{stat.label}</h4>
                  <p className="text-4xl font-black text-white">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              <div className="lg:col-span-8 bg-[#121212] p-10 rounded-[3rem] border border-white/5 shadow-xl">
                 <div className="flex items-center justify-between mb-12">
                    <h3 className="text-xl font-black text-white">Booking Velocity</h3>
                    <div className="flex gap-4">
                       <button onClick={() => loadData(true)} disabled={isRefreshing} className="p-2 text-slate-500 hover:text-geevee-orange">
                          {isRefreshing ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
                       </button>
                    </div>
                 </div>
                 <div className="h-64 flex items-end gap-4">
                    {[40, 65, 30, 85, 45, 95, 55, 75, 50, 60, 80, 40].map((h, i) => (
                      <div key={i} className="flex-1 group relative">
                         <div 
                           style={{ height: `${h}%` }} 
                           className={`bg-white/5 group-hover:bg-geevee-orange rounded-t-lg transition-all duration-700 ${isRefreshing ? 'animate-pulse' : ''}`}
                         ></div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-6 pt-6 border-t border-white/5 text-[9px] font-black text-slate-600 uppercase tracking-widest">
                    <span>Recent History</span>
                    <span>Live Tracking</span>
                 </div>
              </div>

              <div className="lg:col-span-4 bg-[#121212] p-10 rounded-[3rem] border border-white/5 shadow-xl flex flex-col">
                <h3 className="text-xl font-black text-white mb-12">Trip Composition</h3>
                <div className="flex-grow flex flex-col justify-center space-y-8">
                  {Object.entries(stats.serviceDist).length > 0 ? Object.entries(stats.serviceDist).map(([name, count]: [any, any]) => (
                    <div key={name}>
                      <div className="flex justify-between mb-3 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">{name}</span>
                        <span className="text-white">{count}</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-geevee-orange rounded-full transition-all duration-1000" 
                          style={{ width: `${(count / stats.total) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center text-slate-600 text-[10px] font-black uppercase">No Data Records</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-8">
            <div className="bg-[#121212] p-6 rounded-[2rem] border border-white/5 shadow-xl flex flex-wrap items-center gap-6">
               <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search ID, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 px-14 py-4 rounded-2xl text-sm font-bold text-white outline-none focus:ring-2 focus:ring-geevee-orange/20 transition-all" 
                  />
               </div>
               
               <div className="flex items-center gap-3">
                  <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/5">
                     {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                       <button
                         key={f}
                         onClick={() => setStatusFilter(f)}
                         className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                           statusFilter === f ? 'bg-geevee-orange text-white' : 'text-slate-500 hover:text-slate-300'
                         }`}
                       >
                         {f}
                       </button>
                     ))}
                  </div>
               </div>

               <button 
                 onClick={() => setShowAddBooking(true)}
                 className="ml-auto p-4 bg-geevee-orange hover:bg-orange-600 text-white rounded-2xl border border-transparent transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-geevee-orange/20"
               >
                 <Plus size={20} />
                 <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">New Booking</span>
               </button>

               <button 
                 onClick={() => loadData(true)}
                 disabled={isRefreshing}
                 className="p-4 bg-white/5 rounded-2xl text-slate-400 hover:text-geevee-orange border border-white/10 transition-all active:scale-95 flex items-center justify-center gap-2"
               >
                 {isRefreshing ? <Loader2 size={20} className="animate-spin text-geevee-orange" /> : <RefreshCw size={20} />}
               </button>
            </div>

            <div className={`bg-[#121212] rounded-[3rem] border border-white/5 shadow-xl overflow-hidden transition-opacity ${isRefreshing ? 'opacity-50' : 'opacity-100'}`}>
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">ID / Route</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Travel Logistics</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Assigned Driver</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredBookings.length > 0 ? filteredBookings.map((b) => (
                    <motion.tr 
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      whileHover={{ x: 4, backgroundColor: "rgba(255, 255, 255, 0.04)" }}
                      key={b.id} 
                      className="transition-colors group cursor-default"
                    >
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3 mb-2">
                           <span className="text-[10px] font-black text-geevee-orange bg-geevee-orange/10 px-2 py-0.5 rounded">#{b.bookingId || b.id.substring(0, 8)}</span>
                           {b.vehicle && <span className="text-[10px] font-bold text-slate-500 flex items-center gap-1"><Car size={10} /> {b.vehicle}</span>}
                        </div>
                        <div className="flex items-center gap-3 text-white font-black text-lg">
                          {b.pickup.split(',')[0]} <ArrowRight size={14} className="text-slate-600" /> {b.drop.split(',')[0]}
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1 font-medium">{b.mobile} • {b.customerName}</div>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col gap-1.5">
                          <span className="text-sm font-bold text-slate-300">{b.service}</span>
                          <span className="text-[11px] font-medium text-slate-500 flex items-center gap-2">
                             <Calendar size={12} /> {b.date} • {b.time}
                          </span>
                          <span className="text-[11px] font-medium text-slate-500">Price: ₹{b.price}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        {b.assignedDriver ? (
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                                <User size={14} />
                             </div>
                             <div>
                                <p className="text-sm font-bold text-white">{b.assignedDriver.name}</p>
                                {b.assignedDriver.vehicleNumber && (
                                  <p className="text-[9px] font-black text-geevee-orange bg-geevee-orange/10 px-1.5 py-0.5 rounded w-fit mt-0.5">
                                    {b.assignedDriver.vehicleNumber}
                                  </p>
                                )}
                             </div>
                          </div>
                        ) : (
                          b.status !== 'cancelled' && b.status !== 'completed' ? (
                            <button 
                              onClick={() => setAssignModal({ isOpen: true, booking: b })}
                              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-geevee-orange rounded-lg text-[10px] font-bold uppercase tracking-widest border border-dashed border-white/20 transition-all flex items-center gap-2"
                            >
                              <Plus size={12} /> Assign Duty
                            </button>
                          ) : (
                            <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">N/A</span>
                          )
                        )}
                      </td>
                      <td className="px-10 py-8">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                          {b.status === 'pending' && (
                            <button onClick={() => handleUpdateStatus(b.id, 'confirmed')} className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all" title="Confirm"><Check size={18} /></button>
                          )}
                          {b.status === 'confirmed' && (
                            <button onClick={() => handleUpdateStatus(b.id, 'completed')} className="p-2.5 bg-green-500/10 text-green-500 rounded-xl hover:bg-green-500 hover:text-white transition-all" title="Complete"><CheckCircle size={18} /></button>
                          )}
                          {b.status !== 'cancelled' && b.status !== 'completed' && (
                            <button onClick={() => handleUpdateStatus(b.id, 'cancelled')} className="p-2.5 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all" title="Cancel"><X size={18} /></button>
                          )}
                          <button onClick={() => handleDelete(b.id)} className="p-2.5 bg-white/5 text-slate-500 hover:text-white rounded-xl transition-all" title="Delete Record"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </motion.tr>
                  )) : (
                    <tr>
                      <td colSpan={5} className="px-10 py-32 text-center">
                         <div className="text-slate-500 font-black uppercase tracking-widest">No matching records found</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-8">
             <div className="flex justify-between items-center bg-[#121212] p-6 rounded-[2rem] border border-white/5 shadow-xl">
                <div>
                   <h3 className="text-xl font-black text-white">Pilot Roster</h3>
                   <p className="text-xs text-slate-500 mt-1">Manage driver availability and profiles</p>
                </div>
                <button 
                  onClick={() => setShowAddDriver(true)}
                  className="px-4 py-2 bg-geevee-orange text-white rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-orange-600 transition-all flex items-center gap-2"
                >
                  <Plus size={16} /> Add Pilot
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drivers.map(driver => (
                   <motion.div 
                     whileHover={{ y: -5, borderColor: "rgba(243, 112, 33, 0.3)" }}
                     key={driver.id} 
                     className="bg-[#121212] p-6 rounded-[2rem] border border-white/5 shadow-lg group transition-all"
                   >
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-slate-400">
                               <User size={20} />
                            </div>
                            <div>
                               <h4 className="text-white font-bold">{driver.name}</h4>
                               <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{driver.mobile}</p>
                            </div>
                         </div>
                         <button onClick={() => handleRemoveDriver(driver.id)} className="text-slate-600 hover:text-red-500 transition-colors p-2">
                            <Trash2 size={16} />
                         </button>
                      </div>
                      
                      <div className="bg-white/5 rounded-xl p-4 mb-4">
                         <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Vehicle</span>
                            <span className="text-[10px] text-white font-bold">{driver.vehicleNumber}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-bold uppercase">Model</span>
                            <span className="text-[10px] text-white font-bold">{driver.vehicleModel}</span>
                         </div>
                      </div>

                      <div className="flex justify-between items-center">
                         <DriverStatusBadge status={driver.status} />
                         <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{driver.totalTrips || 0} Trips</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'fleet' && (
           <div className="flex flex-col items-center justify-center h-96 text-slate-500">
              <Car size={48} className="mb-4 text-slate-700" />
              <h3 className="text-xl font-bold mb-2">Fleet Management</h3>
              <p className="text-sm">Real-time GPS tracking and maintenance logs coming soon.</p>
           </div>
        )}

        {activeTab === 'settings' && (
           <div className="max-w-2xl">
              <div className="bg-[#121212] p-8 rounded-[2rem] border border-white/5">
                 <h3 className="text-xl font-black text-white mb-6">System Preferences</h3>
                 <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                       <div>
                          <h4 className="text-white font-bold text-sm">Auto-Assignment</h4>
                          <p className="text-xs text-slate-500">Automatically assign nearest driver</p>
                       </div>
                       <div className="w-12 h-6 bg-geevee-orange rounded-full relative">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                       </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                       <div>
                          <h4 className="text-white font-bold text-sm">Notifications</h4>
                          <p className="text-xs text-slate-500">SMS alerts for new bookings</p>
                       </div>
                       <div className="w-12 h-6 bg-white/10 rounded-full relative">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white/50 rounded-full"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;
