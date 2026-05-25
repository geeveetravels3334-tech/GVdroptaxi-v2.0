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
  AlertTriangle,
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
  CreditCard,
  IndianRupee,
  Gauge
} from 'lucide-react';
import { BookingService } from '../services/booking.ts';
import Logo from './Logo.tsx';
import OptimizedImage from './OptimizedImage.tsx';
import { ServiceType } from '../types.ts';
import { usePricing } from '../contexts/PricingContext.tsx';
import { DETAILED_VEHICLES } from '../constants.tsx';
import { useLanguage } from '../contexts/LanguageContext.tsx';

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
  const [isAssigning, setIsAssigning] = useState(false);
  
  if (!isOpen || !booking) return null;

  const availableDrivers = drivers.filter(d => d.status === 'available');

  const handleConfirm = async () => {
    const driver = drivers.find(d => d.id === selectedDriverId);
    if (driver) {
      setIsAssigning(true);
      await onAssign(driver);
      setIsAssigning(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#162E4D] w-full max-w-md rounded-[2rem] border border-white/10 p-8 shadow-2xl animate-in zoom-in-95">
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
                    ? 'bg-[#D4AF37] text-[#040812] border-[#D4AF37]' 
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
            onClick={handleConfirm}
            disabled={!selectedDriverId || isAssigning}
            className="w-full bg-white text-black py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-[#040812] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
          >
            {isAssigning ? <Loader2 className="animate-spin" size={18} /> : null}
            {isAssigning ? 'Processing...' : 'Confirm Assignment'}
          </button>
        </div>
      </div>
    </div>
  );
};

const AddDriverModal: React.FC<{ isOpen: boolean; onClose: () => void; onSave: (data: any) => Promise<void> }> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    license: '',
    vehicleModel: 'Toyota Etios', // Default
    vehicleNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSave(formData);
    setIsSubmitting(false);
    setFormData({ name: '', mobile: '', license: '', vehicleModel: 'Toyota Etios', vehicleNumber: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#0C1E38] w-full max-w-md rounded-[2rem] border border-white/10 p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-white">Add New Pilot</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input required placeholder="Driver Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]" />
          <input required placeholder="Mobile Number" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]" />
          <input required placeholder="License Number" value={formData.license} onChange={e => setFormData({...formData, license: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]" />
          
          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Vehicle Model</label>
                <select value={formData.vehicleModel} onChange={e => setFormData({...formData, vehicleModel: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]">
                   {DETAILED_VEHICLES.map(v => <option key={v.id} value={v.name}>{v.name}</option>)}
                </select>
             </div>
             <div className="space-y-1">
                <label className="text-[10px] text-slate-500 uppercase font-bold ml-1">Vehicle No.</label>
                <input required placeholder="TN 01 AB 1234" value={formData.vehicleNumber} onChange={e => setFormData({...formData, vehicleNumber: e.target.value.toUpperCase()})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-[#D4AF37]" />
             </div>
          </div>
          
          <button type="submit" disabled={isSubmitting} className="w-full bg-[#D4AF37] text-[#040812] py-4 rounded-xl font-bold uppercase tracking-widest hover:brightness-110 transition-all flex items-center justify-center gap-2 mt-4">
            {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />} 
            {isSubmitting ? 'Registering...' : 'Register Driver'}
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
      <div className="bg-[#162E4D] w-full max-w-lg rounded-[2rem] border border-white/10 p-8 shadow-2xl">
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


const TariffManagement: React.FC = () => {
  const { vehicles, loading, updateVehiclePricing } = usePricing();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const startEditing = (vehicle: any) => {
    setEditingId(vehicle.id);
    setEditData(JSON.parse(JSON.stringify(vehicle.pricing)));
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditData(null);
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    try {
      await updateVehiclePricing(id, editData);
      setEditingId(null);
      setEditData(null);
    } catch (error) {
      console.error('Failed to save tariff:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const updateNestedField = (path: string, value: any) => {
    const newData = { ...editData };
    const keys = path.split('.');
    let current = newData;
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    setEditData(newData);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="animate-spin text-geevee-orange" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-3xl font-black text-white tracking-tight">Tariff Master</h3>
          <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">Global pricing control center & fare algorithms</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {vehicles.map((vehicle) => (
          <motion.div 
            key={vehicle.id}
            className="bg-slate-900/30 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="w-full lg:w-72">
                <div className="relative h-48 rounded-2xl overflow-hidden bg-slate-800 border border-white/10 group">
                  <OptimizedImage 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    containerClassName="w-full h-full bg-slate-800"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h4 className="text-white font-black text-xl tracking-tight">{vehicle.name}</h4>
                    <p className="text-geevee-orange font-bold text-[10px] uppercase tracking-widest">{vehicle.type}</p>
                  </div>
                </div>
              </div>

              <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Outstation One Way */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                    <MapPin size={14} /> One Way Tariff
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    {editingId === vehicle.id ? (
                      <div className="flex items-center gap-3">
                        <IndianRupee size={16} className="text-geevee-orange" />
                        <input 
                          type="text"
                          value={editData.outstation.oneWay}
                          onChange={(e) => {
                            const val = e.target.value;
                            const num = parseFloat(val);
                            updateNestedField('outstation.oneWay', isNaN(num) ? val : num);
                          }}
                          className="bg-slate-800 text-white font-black text-2xl w-full border-none focus:ring-0 rounded-lg p-2"
                        />
                      </div>
                    ) : (
                      <p className="text-3xl font-black text-white tracking-tighter">
                        {typeof vehicle.pricing.outstation.oneWay === 'number' ? `₹${vehicle.pricing.outstation.oneWay}/km` : vehicle.pricing.outstation.oneWay}
                      </p>
                    )}
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">Minimum 130KM apply</p>
                  </div>
                </div>

                {/* Outstation Round Trip */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                    <RefreshCw size={14} /> Round Trip Tariff
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    {editingId === vehicle.id ? (
                      <div className="flex items-center gap-3">
                        <IndianRupee size={16} className="text-geevee-orange" />
                        <input 
                          type="number"
                          value={editData.outstation.roundTrip}
                          onChange={(e) => updateNestedField('outstation.roundTrip', parseFloat(e.target.value))}
                          className="bg-slate-800 text-white font-black text-2xl w-full border-none focus:ring-0 rounded-lg p-2"
                        />
                      </div>
                    ) : (
                      <p className="text-3xl font-black text-white tracking-tighter">₹{vehicle.pricing.outstation.roundTrip}/km</p>
                    )}
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">Minimum 250KM daily</p>
                  </div>
                </div>

                {/* Driver Batta */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white/50 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Users size={14} /> Pilot Allowance
                  </div>
                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    {editingId === vehicle.id ? (
                      <div className="flex items-center gap-3">
                        <IndianRupee size={16} className="text-geevee-orange" />
                        <input 
                          type="number"
                          value={editData.outstation.driverBatta}
                          onChange={(e) => updateNestedField('outstation.driverBatta', parseFloat(e.target.value))}
                          className="bg-slate-800 text-white font-black text-2xl w-full border-none focus:ring-0 rounded-lg p-2"
                        />
                      </div>
                    ) : (
                      <p className="text-3xl font-black text-white tracking-tighter">₹{vehicle.pricing.outstation.driverBatta}</p>
                    )}
                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-2">Per Calendar Day</p>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-auto h-full flex flex-col justify-center gap-4">
                {editingId === vehicle.id ? (
                  <>
                    <button 
                      onClick={() => handleSave(vehicle.id)}
                      disabled={isSaving}
                      className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-2xl flex items-center justify-center transition-all shadow-xl shadow-green-500/20 active:scale-90"
                    >
                      {isSaving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                    </button>
                    <button 
                      onClick={cancelEditing}
                      disabled={isSaving}
                      className="w-14 h-14 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white border border-red-500/20 rounded-2xl flex items-center justify-center transition-all active:scale-90"
                    >
                      <X size={24} />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => startEditing(vehicle)}
                    className="w-14 h-14 bg-white/5 hover:bg-geevee-orange text-white rounded-2xl flex items-center justify-center border border-white/10 transition-all group/btn shadow-2xl active:scale-90"
                  >
                    <Settings size={28} className="group-hover/btn:rotate-90 transition-transform duration-500" />
                  </button>
                )}
              </div>
            </div>

            {/* Local Packages */}
            <div className="mt-10 pt-10 border-t border-white/5">
                <div className="flex items-center justify-between mb-6">
                    <h5 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">City Package Matrix</h5>
                    {editingId === vehicle.id && (
                        <button 
                           onClick={() => {
                               const newPkg = { duration: '4 Hours', kms: '40 Kms', price: 0 };
                               updateNestedField('localPackages', [...editData.localPackages, newPkg]);
                           }}
                           className="text-[9px] font-bold text-geevee-orange uppercase flex items-center gap-2 hover:opacity-80"
                        >
                            <Plus size={12} /> Add Package
                        </button>
                    )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {(editingId === vehicle.id ? editData.localPackages : vehicle.pricing.localPackages).map((pkg: any, idx: number) => (
                        <div key={idx} className="bg-white/[0.02] p-6 rounded-2xl border border-white/5 relative group/pkg">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <p className="text-white font-bold text-sm tracking-tight">{pkg.duration}</p>
                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{pkg.kms}</p>
                                </div>
                                {editingId === vehicle.id && (
                                    <button 
                                        onClick={() => {
                                            const newPkgs = [...editData.localPackages];
                                            newPkgs.splice(idx, 1);
                                            updateNestedField('localPackages', newPkgs);
                                        }}
                                        className="text-red-500/40 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <IndianRupee size={12} className="text-geevee-orange" />
                                {editingId === vehicle.id ? (
                                    <input 
                                        type="number"
                                        value={pkg.price}
                                        onChange={(e) => {
                                            const newPkgs = [...editData.localPackages];
                                            newPkgs[idx].price = parseFloat(e.target.value);
                                            updateNestedField('localPackages', newPkgs);
                                        }}
                                        className="bg-slate-800 text-white font-black text-lg w-full border-none focus:ring-0 rounded-lg p-1"
                                    />
                                ) : (
                                    <span className="text-xl font-black text-white tracking-tight">{pkg.price}</span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const PackagePricingManagement: React.FC = () => {
  const { packagePrices, updatePkgPrice, loading } = usePricing();
  const { t } = useLanguage();
  const [isSaving, setIsSaving] = useState<string | null>(null);

  const handleUpdate = async (id: string, price: number) => {
    setIsSaving(id);
    try {
      await updatePkgPrice(id, price);
    } catch (error) {
      console.error('Failed to update package price:', error);
    } finally {
      setIsSaving(null);
    }
  };

  if (loading) return null;

  return (
    <div className="bg-slate-900/30 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden transition-all">
      <div className="mb-10">
        <h3 className="text-2xl font-black text-white tracking-tight">Tour Package Tariffs</h3>
        <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">Fixed-price curated collections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packagePrices.map((pkg) => {
          const pkgInfo = t.packages.list?.find(p => p.id === pkg.id);
          return (
            <div key={pkg.id} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
              <div>
                <h4 className="text-white font-bold mb-1">{pkgInfo?.name || pkg.id}</h4>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mb-4">Starting Price</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="relative flex-grow">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-geevee-orange font-black">₹</span>
                  <input 
                    type="number"
                    defaultValue={pkg.price}
                    onBlur={(e) => {
                      const newPrice = parseFloat(e.target.value);
                      if (newPrice !== pkg.price) handleUpdate(pkg.id, newPrice);
                    }}
                    className="w-full bg-slate-950/50 border border-white/5 rounded-xl py-3 pl-10 pr-4 text-white font-black focus:border-geevee-orange/50 transition-all"
                  />
                </div>
                {isSaving === pkg.id && <Loader2 size={16} className="animate-spin text-geevee-orange" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GlobalSettingsManagement: React.FC = () => {
  const { extraCharges, updateGlobalCharges, loading } = usePricing();
  const [editData, setEditData] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (extraCharges) {
      setEditData(JSON.parse(JSON.stringify(extraCharges)));
    }
  }, [extraCharges]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateGlobalCharges(editData);
    } catch (error) {
      console.error('Failed to save global settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!editData || loading) return null;

  return (
    <div className="bg-slate-900/30 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden transition-all">
      <div className="mb-10">
        <h3 className="text-2xl font-black text-white tracking-tight">Global Policy & Fees</h3>
        <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">System-wide surcharge protocols</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Additional KM Charges */}
        <div className="space-y-6">
          <h5 className="text-[10px] text-geevee-orange font-black uppercase tracking-[0.4em]">Additional KM Charge</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">Sedan (₹/km)</label>
              <input 
                type="number" 
                value={editData.additionalKm.sedan}
                onChange={(e) => setEditData({...editData, additionalKm: {...editData.additionalKm, sedan: parseFloat(e.target.value)}})}
                className="bg-transparent text-white font-black text-xl w-full border-none focus:ring-0 p-0"
              />
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">SUV (₹/km)</label>
              <input 
                type="number" 
                value={editData.additionalKm.suv}
                onChange={(e) => setEditData({...editData, additionalKm: {...editData.additionalKm, suv: parseFloat(e.target.value)}})}
                className="bg-transparent text-white font-black text-xl w-full border-none focus:ring-0 p-0"
              />
            </div>
          </div>
        </div>

        {/* Extra Hours Charges */}
        <div className="space-y-6">
          <h5 className="text-[10px] text-geevee-orange font-black uppercase tracking-[0.4em]">Extra Hour Charge</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">Sedan (₹/hr)</label>
              <input 
                type="number" 
                value={editData.extraHours.sedan}
                onChange={(e) => setEditData({...editData, extraHours: {...editData.extraHours, sedan: parseFloat(e.target.value)}})}
                className="bg-transparent text-white font-black text-xl w-full border-none focus:ring-0 p-0"
              />
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">SUV (₹/hr)</label>
              <input 
                type="number" 
                value={editData.extraHours.suv}
                onChange={(e) => setEditData({...editData, extraHours: {...editData.extraHours, suv: parseFloat(e.target.value)}})}
                className="bg-transparent text-white font-black text-xl w-full border-none focus:ring-0 p-0"
              />
            </div>
          </div>
        </div>

        {/* Hill Charges */}
        <div className="space-y-6">
          <h5 className="text-[10px] text-geevee-orange font-black uppercase tracking-[0.4em]">Hill Station Surcharge</h5>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">Ooty (₹)</label>
              <input 
                type="number" 
                value={editData.hillCharges.ooty}
                onChange={(e) => setEditData({...editData, hillCharges: {...editData.hillCharges, ooty: parseFloat(e.target.value)}})}
                className="bg-transparent text-white font-black text-xl w-full border-none focus:ring-0 p-0"
              />
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <label className="block text-[9px] text-slate-500 font-bold uppercase tracking-widest mb-2">Kodaikanal (₹)</label>
              <input 
                type="number" 
                value={editData.hillCharges.kodai}
                onChange={(e) => setEditData({...editData, hillCharges: {...editData.hillCharges, kodai: parseFloat(e.target.value)}})}
                className="bg-transparent text-white font-black text-xl w-full border-none focus:ring-0 p-0"
              />
            </div>
          </div>
        </div>

        {/* Toll Policy */}
        <div className="space-y-6">
          <h5 className="text-[10px] text-geevee-orange font-black uppercase tracking-[0.4em]">Toll & Parking Policy</h5>
          <div className="bg-white/5 p-4 rounded-xl border border-white/5">
            <textarea 
              rows={3}
              value={editData.tollPolicy}
              onChange={(e) => setEditData({...editData, tollPolicy: e.target.value})}
              className="bg-transparent text-white font-bold text-sm w-full border-none focus:ring-0 p-0 resize-none"
            />
          </div>
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-geevee-orange hover:bg-geevee-orange/80 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-geevee-orange/20 transition-all active:scale-95 flex items-center gap-3"
        >
          {isSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          Save Global Config
        </button>
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
  const [actionLoading, setActionLoading] = useState<Record<string, boolean>>({});
  const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);
  
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

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message: string, type: 'success' | 'error' = 'success') => {
    setNotification({ message, type });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this booking record? This action cannot be undone.')) {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      try {
        await BookingService.deleteBooking(id);
        showNotification("Booking deleted successfully");
        await loadData();
      } catch (err) {
        showNotification("Failed to delete booking", "error");
      } finally {
        setActionLoading(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    setActionLoading(prev => ({ ...prev, [id]: true }));
    try {
      await BookingService.updateBookingStatus(id, status);
      showNotification(`Status updated to ${status}`);
      await loadData();
    } catch (err) {
      showNotification("Failed to update status", "error");
    } finally {
      setActionLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleAddDriver = async (driverData: any) => {
    try {
      await BookingService.addDriver(driverData);
      showNotification("Pilot registered to fleet");
      await loadData(true);
    } catch (err) {
      showNotification("Failed to register pilot", "error");
    }
  };

  const handleAssignDriver = async (driver: any) => {
    if (!assignModal.booking) return;
    const bookingId = assignModal.booking.id;
    setActionLoading(prev => ({ ...prev, [bookingId]: true }));
    try {
      await BookingService.assignDriver(bookingId, driver);
      showNotification(`Assigned ${driver.name} to Booking #${assignModal.booking.bookingId}`);
      setAssignModal({ isOpen: false, booking: null });
      await loadData(true);
    } catch (err) {
      showNotification("Failed to assign pilot", "error");
    } finally {
      setActionLoading(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const handleRemoveDriver = async (id: string) => {
    if(confirm("Remove this driver from the fleet?")) {
      setActionLoading(prev => ({ ...prev, [id]: true }));
      try {
        await BookingService.deleteDriver(id);
        showNotification("Pilot removed from fleet");
        await loadData(true);
      } catch (err) {
        showNotification("Failed to remove pilot", "error");
      } finally {
        setActionLoading(prev => ({ ...prev, [id]: false }));
      }
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
      <div className="flex min-h-screen items-center justify-center bg-[#0B1F3A] text-white flex-col gap-6">
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
      <div className="flex min-h-screen items-center justify-center bg-[#0B1F3A] text-white flex-col gap-6">
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
    <div className="flex min-h-screen bg-slate-950 text-slate-300 font-sans selection:bg-geevee-orange/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-geevee-orange/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-slate-900/40 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
      </div>

      <ManualBookingModal isOpen={showAddBooking} onClose={() => setShowAddBooking(false)} onSave={() => loadData(true)} />
      <AddDriverModal isOpen={showAddDriver} onClose={() => setShowAddDriver(false)} onSave={handleAddDriver} />
      <AssignDriverModal 
        isOpen={assignModal.isOpen} 
        booking={assignModal.booking} 
        drivers={drivers} 
        onClose={() => setAssignModal({isOpen: false, booking: null})} 
        onAssign={handleAssignDriver}
      />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-[300] pointer-events-none"
          >
            <div className={`px-10 py-5 rounded-[2rem] shadow-3xl border backdrop-blur-3xl flex items-center gap-4 font-bold text-xs uppercase tracking-[0.2em] ${
              notification.type === 'success' 
                ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border-red-500/20 text-red-400'
            }`}>
              <div className={`p-2 rounded-full ${notification.type === 'success' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                {notification.type === 'success' ? <CheckCircle size={18} /> : <X size={18} />}
              </div>
              {notification.message}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className="w-80 bg-slate-900/40 backdrop-blur-2xl border-r border-white/5 p-12 flex flex-col fixed h-full z-20">
        <div className="flex items-center gap-6 mb-20 group cursor-pointer" onClick={() => setActiveTab('dashboard')}>
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:scale-110 transition-transform shadow-xl">
            <Logo className="w-14 h-14" isLight />
          </div>
          <div>
            <h1 className="font-black text-2xl text-white leading-none tracking-tighter">TN OPERATIONS</h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.3em]">Command Active</p>
            </div>
          </div>
        </div>

        <nav className="flex-grow space-y-4">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Analytics' },
            { id: 'bookings', icon: Calendar, label: 'Reservations' },
            { id: 'drivers', icon: Users, label: 'Pilot Roster' },
            { id: 'fleet', icon: IndianRupee, label: 'Tariff Sync' },
            { id: 'settings', icon: Settings, label: 'Terminal' },
          ].map(item => (
            <button 
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-6 px-8 py-5 rounded-[1.5rem] font-bold text-sm transition-all relative group ${
                activeTab === item.id 
                  ? 'bg-geevee-orange text-white shadow-[0_20px_40px_-10px_rgba(197,160,89,0.3)]' 
                  : 'hover:bg-white/[0.03] text-slate-500 hover:text-white'
              }`}
            >
              <span className={`transition-all duration-500 ${activeTab === item.id ? 'text-white scale-110' : 'text-slate-600 group-hover:text-geevee-orange'}`}>
                <item.icon size={22} strokeWidth={2.5} />
              </span>
              <span className="tracking-tight">{item.label}</span>
              {item.id === 'bookings' && stats.pending > 0 && (
                <span className="ml-auto bg-white/10 text-white w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black backdrop-blur-md border border-white/10 group-hover:bg-white group-hover:text-geevee-orange transition-all">
                  {stats.pending}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button 
          onClick={onLogout}
          className="mt-8 flex items-center gap-6 px-10 py-6 bg-slate-800/20 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded-2xl font-bold text-sm transition-all border border-white/5 hover:border-red-500/20 group active:scale-[0.98]"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          <span>Sign Out</span>
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow ml-80 p-20 relative z-10">
        <header className="flex justify-between items-center mb-24">
          <div>
            <div className="flex items-center gap-3 text-geevee-orange font-bold text-[10px] uppercase tracking-[0.4em] mb-4 opacity-70">
              <Activity size={14} className="animate-pulse" /> System Real-Time Dashboard
            </div>
            <h2 className="text-6xl font-black text-white tracking-tighter capitalize">{activeTab}</h2>
          </div>
          
          <div className="flex items-center gap-10">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1 opacity-50">Operation Director</p>
              <p className="text-white font-bold text-lg tracking-tight">GeeVee Premium Fleet</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-geevee-orange via-orange-500 to-orange-700 rounded-[1.5rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-geevee-orange/30 ring-4 ring-geevee-orange/10 transition-transform hover:scale-105 cursor-pointer">
              G
            </div>
          </div>
        </header>

        {activeTab === 'dashboard' && (
          <div className={`space-y-16 transition-all duration-1000 ${isRefreshing ? 'opacity-40 blur-sm scale-[0.99]' : 'opacity-100 scale-100'}`}>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {[
                { label: 'Total Volume', value: stats.total, icon: <TrendingUp />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { label: 'Unresolved', value: stats.pending, icon: <Clock />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
                { label: 'Successful', value: stats.completed, icon: <CheckCircle />, color: 'text-green-400', bg: 'bg-green-500/10' },
                { label: 'Est. Revenue', value: `₹${(stats.estimatedRevenue / 1000).toFixed(1)}k`, icon: <CreditCard />, color: 'text-geevee-orange', bg: 'bg-geevee-orange/10' }
              ].map((stat, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  key={i} 
                  className="bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden group border-t-white/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none"></div>
                  <div className="flex items-center justify-between mb-10 relative z-10">
                    <div className={`${stat.bg} ${stat.color} p-5 rounded-3xl group-hover:scale-110 transition-transform shadow-inner`}>
                      {React.cloneElement(stat.icon as React.ReactElement<any>, { size: 32, strokeWidth: 2.5 })}
                    </div>
                  </div>
                  <h4 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.4em] mb-3 opacity-60">{stat.label}</h4>
                  <p className="text-5xl font-black text-white tracking-tighter">{stat.value}</p>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 bg-slate-900/40 backdrop-blur-xl p-12 rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
                 <div className="flex items-center justify-between mb-16 relative z-10">
                    <div>
                      <h3 className="text-2xl font-black text-white tracking-tight">Booking Velocity</h3>
                      <p className="text-xs text-slate-500 mt-2">Real-time engagement metrics</p>
                    </div>
                    <div className="flex gap-4">
                       <button onClick={() => loadData(true)} disabled={isRefreshing} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-slate-500 hover:text-geevee-orange transition-all active:scale-90">
                          {isRefreshing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCw size={18} />}
                       </button>
                    </div>
                 </div>
                 <div className="h-80 flex items-end gap-5 relative z-10">
                    {[40, 65, 30, 85, 45, 95, 55, 75, 50, 60, 80, 40].map((h, i) => (
                      <div key={i} className="flex-1 group relative h-full flex items-end">
                         <div 
                           style={{ height: `${h}%` }} 
                           className={`w-full bg-white/[0.03] group-hover:bg-geevee-orange group-hover:scale-x-110 rounded-t-2xl transition-all duration-700 relative overflow-hidden ${isRefreshing ? 'animate-pulse' : ''}`}
                         >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                         </div>
                         <div className="absolute bottom-[-30px] left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}%
                         </div>
                      </div>
                    ))}
                 </div>
                 <div className="flex justify-between mt-12 pt-10 border-t border-white/5 text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] relative z-10">
                    <span>Performance Archive</span>
                    <span className="text-geevee-orange">Active Link</span>
                 </div>
              </div>

              <div className="lg:col-span-4 bg-slate-900/40 backdrop-blur-xl p-12 rounded-[4rem] border border-white/5 shadow-2xl flex flex-col relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
                <h3 className="text-2xl font-black text-white tracking-tight mb-16 relative z-10">Trip Analysis</h3>
                <div className="flex-grow flex flex-col justify-center space-y-10 relative z-10">
                  {Object.entries(stats.serviceDist).length > 0 ? Object.entries(stats.serviceDist).map(([name, count]: [any, any]) => (
                    <div key={name} className="group">
                      <div className="flex justify-between mb-4 text-[10px] font-bold uppercase tracking-[0.3em] transition-colors group-hover:text-white">
                        <span className="text-slate-500 group-hover:text-slate-300">{name}</span>
                        <span className="text-geevee-orange">{count} Trips</span>
                      </div>
                      <div className="h-3 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(count / stats.total) * 100}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-geevee-orange rounded-full shadow-[0_0_20px_rgba(197,160,89,0.3)]" 
                        ></motion.div>
                      </div>
                    </div>
                  )) : (
                    <div className="text-center py-20">
                      <div className="w-16 h-16 bg-white/[0.02] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Activity size={24} className="text-slate-800" />
                      </div>
                      <p className="text-slate-700 text-[10px] font-bold uppercase tracking-[0.4em]">Zero Record Data</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-12">
            <div className="bg-slate-900/40 backdrop-blur-xl p-8 rounded-[3rem] border border-white/5 shadow-2xl flex flex-wrap items-center gap-10">
               <div className="relative flex-grow max-w-xl">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-600" size={20} />
                  <input 
                    type="text" 
                    placeholder="Search Record Intelligence..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/[0.03] border-2 border-transparent focus:border-geevee-orange/30 px-16 py-6 rounded-[2rem] text-sm font-bold text-white outline-none transition-all placeholder:text-slate-700 shadow-inner" 
                  />
               </div>
               
               <div className="flex items-center gap-4">
                  <div className="flex gap-2 bg-white/[0.02] p-2 rounded-[1.5rem] border border-white/5 shadow-inner">
                     {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(f => (
                       <button
                         key={f}
                         onClick={() => setStatusFilter(f)}
                         className={`px-6 py-3 rounded-[1.25rem] text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                           statusFilter === f ? 'bg-geevee-orange text-white shadow-xl' : 'text-slate-500 hover:text-slate-200'
                         }`}
                       >
                         {f}
                       </button>
                     ))}
                  </div>
               </div>

               <div className="flex items-center gap-4 ml-auto">
                 <button 
                   onClick={() => setShowAddBooking(true)}
                   className="px-8 py-5 bg-geevee-orange hover:bg-orange-600 text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(197,160,89,0.3)] group text-[11px]"
                 >
                   <Plus size={20} className="group-hover:rotate-90 transition-transform" />
                   <span>Manual Inject</span>
                 </button>

                 <button 
                   onClick={() => loadData(true)}
                   disabled={isRefreshing}
                   className="p-5 bg-white/[0.03] rounded-[1.5rem] text-slate-400 hover:text-geevee-orange border border-white/5 transition-all active:scale-90"
                 >
                   {isRefreshing ? <Loader2 size={22} className="animate-spin" /> : <RefreshCw size={22} />}
                 </button>
               </div>
            </div>

            <div className={`bg-slate-900/20 backdrop-blur-md rounded-[4rem] border border-white/5 shadow-2xl overflow-hidden transition-all duration-700 ${isRefreshing ? 'opacity-40 blur-md scale-[0.99]' : 'opacity-100 scale-100'}`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-white/[0.02] border-b border-white/5">
                    <tr>
                      <th className="px-12 py-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Log Identifier / Vector</th>
                      <th className="px-12 py-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Operational Parameters</th>
                      <th className="px-12 py-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Pilot Allocation</th>
                      <th className="px-12 py-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Node Status</th>
                      <th className="px-12 py-10 text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">Control Matrix</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredBookings.length > 0 ? filteredBookings.map((b, idx) => (
                      <motion.tr 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.02)" }}
                        key={b.id} 
                        className="transition-colors group"
                      >
                        <td className="px-12 py-12">
                          <div className="flex items-center gap-4 mb-4">
                             <span className="text-[10px] font-black text-geevee-orange bg-geevee-orange/10 px-3 py-1 rounded-full border border-geevee-orange/20 shadow-inner">#{b.bookingId || b.id.substring(0, 8)}</span>
                             {b.vehicle && <span className="text-[10px] font-bold text-slate-500 flex items-center gap-2 opacity-60"><Car size={14} className="text-geevee-orange" /> {b.vehicle}</span>}
                          </div>
                          <div className="flex items-center gap-4 text-white font-black text-xl tracking-tighter">
                            <span className="truncate max-w-[150px]">{b.pickup.split(',')[0]}</span>
                            <ArrowRight size={16} className="text-geevee-orange opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all" /> 
                            <span className="truncate max-w-[150px]">{b.drop.split(',')[0]}</span>
                          </div>
                          <div className="text-[10px] text-slate-600 mt-3 font-bold uppercase tracking-widest">{b.mobile} • {b.customerName}</div>
                        </td>
                        <td className="px-12 py-12">
                          <div className="flex flex-col gap-3">
                            <span className="text-sm font-bold text-slate-300 tracking-tight">{b.service}</span>
                            <div className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                               <Calendar size={14} className="text-geevee-orange" /> {b.date} • {b.time}
                            </div>
                            <span className="text-xs font-black text-white/50 bg-white/5 w-fit px-3 py-1 rounded-lg">₹{b.price}</span>
                          </div>
                        </td>
                        <td className="px-12 py-12">
                          {b.assignedDriver ? (
                            <div className="flex items-center gap-5">
                               <div className="w-12 h-12 rounded-2xl bg-slate-800/50 border border-white/5 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                                  <User size={18} />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-white tracking-tight">{b.assignedDriver.name}</p>
                                  {b.assignedDriver.vehicleNumber && (
                                    <p className="text-[9px] font-black text-geevee-orange bg-geevee-orange/10 px-2.5 py-1 rounded-lg w-fit mt-2 uppercase tracking-widest">
                                      {b.assignedDriver.vehicleNumber}
                                    </p>
                                  )}
                               </div>
                            </div>
                          ) : (
                            b.status !== 'cancelled' && b.status !== 'completed' ? (
                              <button 
                                onClick={() => setAssignModal({ isOpen: true, booking: b })}
                                className="px-6 py-3 bg-white/5 hover:bg-geevee-orange hover:text-white text-geevee-orange rounded-[1rem] text-[10px] font-black uppercase tracking-[0.2em] border-2 border-dashed border-white/5 hover:border-solid hover:border-geevee-orange transition-all flex items-center gap-3 shadow-inner active:scale-95"
                              >
                                <Plus size={14} /> Assign
                              </button>
                            ) : (
                              <span className="text-[10px] text-slate-800 font-bold uppercase tracking-[0.4em]">Finalized</span>
                            )
                          )}
                        </td>
                        <td className="px-12 py-12">
                          <StatusBadge status={b.status} />
                        </td>
                        <td className="px-12 py-12">
                          <div className="flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                            {actionLoading[b.id] ? (
                              <div className="p-4">
                                <Loader2 size={20} className="animate-spin text-geevee-orange" />
                              </div>
                            ) : (
                              <>
                                  {b.status === 'pending' && (
                                    <button onClick={() => handleUpdateStatus(b.id, 'confirmed')} className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20 hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/10 active:scale-90" title="Confirm"><Check size={20} /></button>
                                  )}
                                {b.status === 'confirmed' && (
                                  <button onClick={() => handleUpdateStatus(b.id, 'completed')} className="w-12 h-12 flex items-center justify-center bg-green-500/10 text-green-400 rounded-2xl border border-green-500/20 hover:bg-green-500 hover:text-white transition-all shadow-lg shadow-green-500/10 active:scale-90" title="Complete"><CheckCircle size={20} /></button>
                                )}
                                {b.status !== 'cancelled' && b.status !== 'completed' && (
                                  <button onClick={() => handleUpdateStatus(b.id, 'cancelled')} className="w-12 h-12 flex items-center justify-center bg-red-500/10 text-red-400 rounded-2xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all shadow-lg shadow-red-500/10 active:scale-90" title="Cancel"><X size={20} /></button>
                                )}
                                <button onClick={() => handleDelete(b.id)} className="w-12 h-12 flex items-center justify-center bg-white/5 text-slate-500 hover:text-white rounded-2xl border border-white/5 hover:bg-slate-800 transition-all active:scale-90" title="Purge Record"><Trash2 size={20} /></button>
                              </>
                            )}
                          </div>
                        </td>
                      </motion.tr>
                    )) : (
                      <tr>
                        <td colSpan={5} className="px-12 py-40 text-center">
                           <div className="w-20 h-20 bg-white/[0.02] rounded-full flex items-center justify-center mx-auto mb-8">
                              <Search size={32} className="text-slate-800" />
                           </div>
                           <p className="text-slate-600 font-bold uppercase tracking-[0.4em] text-sm">No synchronized intelligence found</p>
                           <button onClick={() => setSearchQuery('')} className="mt-8 text-geevee-orange font-bold text-[10px] uppercase tracking-widest hover:underline">Clear Filter Parameters</button>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'drivers' && (
          <div className="space-y-16">
             <div className="flex justify-between items-center bg-slate-900/40 backdrop-blur-xl p-10 rounded-[3rem] border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
                <div className="relative z-10">
                   <h3 className="text-3xl font-black text-white tracking-tight">Pilot Cadre</h3>
                   <p className="text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">Fleet deployment and availability matrix</p>
                </div>
                <button 
                  onClick={() => setShowAddDriver(true)}
                  className="px-10 py-5 bg-geevee-orange hover:bg-orange-600 text-white rounded-[1.5rem] font-bold uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center gap-4 shadow-3xl text-[11px] relative z-10 group"
                >
                  <Plus size={20} className="group-hover:rotate-90 transition-transform" /> 
                  <span>Register Pilot</span>
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {drivers.map((driver, idx) => (
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: idx * 0.1 }}
                     whileHover={{ y: -10, borderColor: "rgba(197,160,89,0.2)", backgroundColor: "rgba(15, 23, 42, 0.4)" }}
                     key={driver.id} 
                     className="bg-slate-900/30 backdrop-blur-md p-10 rounded-[3rem] border border-white/5 shadow-2xl group transition-all relative overflow-hidden"
                   >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
                      <div className="flex justify-between items-start mb-10 relative z-10">
                         <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-800/50 rounded-2xl flex items-center justify-center text-slate-500 border border-white/5 group-hover:scale-110 transition-transform shadow-inner">
                               <User size={28} />
                            </div>
                            <div>
                               <h4 className="text-xl font-bold text-white tracking-tight">{driver.name}</h4>
                               <p className="text-[10px] text-geevee-orange font-black uppercase tracking-[0.3em] mt-2 bg-geevee-orange/5 px-3 py-1 rounded-lg border border-geevee-orange/10">{driver.mobile}</p>
                            </div>
                         </div>
                         {actionLoading[driver.id] ? (
                            <div className="p-3">
                               <Loader2 size={20} className="animate-spin text-geevee-orange" />
                            </div>
                         ) : (
                            <button onClick={() => handleRemoveDriver(driver.id)} className="text-slate-700 hover:text-red-500 transition-all p-3 hover:bg-red-500/10 rounded-xl active:scale-90">
                               <Trash2 size={18} />
                            </button>
                         )}
                      </div>
                      
                      <div className="bg-white/[0.02] rounded-3xl p-6 mb-8 border border-white/5 relative z-10">
                         <div className="flex justify-between items-center mb-4">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] opacity-60">Asset Tag</span>
                            <span className="text-[10px] text-white font-black tracking-widest bg-white/[0.02] px-3 py-1 rounded-lg border border-white/5">{driver.vehicleNumber}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em] opacity-60">Hardware</span>
                            <span className="text-[10px] text-white/50 font-bold tracking-tight">{driver.vehicleModel}</span>
                         </div>
                      </div>

                      <div className="flex justify-between items-center relative z-10">
                         <DriverStatusBadge status={driver.status} />
                         <span className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] bg-white/[0.02] px-3 py-1 rounded-lg">{driver.totalTrips || 0} Missions</span>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>
        )}

        {activeTab === 'fleet' && (
          <div className="space-y-12">
            <TariffManagement />
            <PackagePricingManagement />
            <GlobalSettingsManagement />
          </div>
        )}

        {activeTab === 'settings' && (
           <div className="max-w-4xl space-y-16">
              <div className="bg-slate-900/40 backdrop-blur-xl p-12 rounded-[4rem] border border-white/5 shadow-2xl">
                 <h3 className="text-3xl font-black text-white tracking-tight mb-12">Core Preferences</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 hover:bg-white/[0.04] transition-all group">
                       <div className="flex items-center justify-between mb-8">
                          <div className="p-4 bg-geevee-orange/10 text-geevee-orange rounded-2xl">
                             <Activity size={24} />
                          </div>
                          <div className="w-14 h-8 bg-geevee-orange rounded-full relative p-1 cursor-pointer shadow-inner">
                             <div className="absolute right-1 top-1 w-6 h-6 bg-white rounded-full shadow-lg"></div>
                          </div>
                       </div>
                       <h4 className="text-white font-bold text-lg tracking-tight mb-2">Auto-Link Intelligence</h4>
                       <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest opacity-60">Automatically assign optimal pilot based on real-time vector proximity</p>
                    </div>

                    <div className="p-10 bg-white/[0.02] rounded-[3rem] border border-white/5 hover:bg-white/[0.04] transition-all group">
                       <div className="flex items-center justify-between mb-8">
                          <div className="p-4 bg-blue-500/10 text-blue-400 rounded-2xl">
                             <RefreshCw size={24} />
                          </div>
                          <div className="w-14 h-8 bg-white/10 rounded-full relative p-1 cursor-pointer">
                             <div className="absolute left-1 top-1 w-6 h-6 bg-white/40 rounded-full"></div>
                          </div>
                       </div>
                       <h4 className="text-white font-bold text-lg tracking-tight mb-2">Comms Uplink</h4>
                       <p className="text-xs text-slate-500 leading-relaxed font-bold uppercase tracking-widest opacity-60">Real-time SMS and satellite notification arrays for all node activity</p>
                    </div>
                 </div>
              </div>

              <div className="p-10 bg-red-500/5 rounded-[3rem] border border-red-500/10 flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
                       <AlertTriangle size={28} />
                    </div>
                    <div>
                       <h4 className="text-white font-bold text-lg tracking-tight">Danger Zone</h4>
                       <p className="text-[10px] text-red-500/50 uppercase font-black tracking-widest">Total record purge protocols</p>
                    </div>
                 </div>
                 <button className="px-10 py-5 bg-red-500 hover:bg-red-600 text-white rounded-[1.5rem] font-bold uppercase tracking-widest text-[11px] transition-all hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.3)] active:scale-95">
                    Purge All Archives
                 </button>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

export default AdminPanel;
