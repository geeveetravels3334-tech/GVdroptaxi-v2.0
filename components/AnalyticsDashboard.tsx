import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie, 
  Legend 
} from 'recharts';
import { 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  CreditCard, 
  Activity, 
  Search, 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Award, 
  Star, 
  Compass, 
  User, 
  Car, 
  ShieldCheck,
  RefreshCw,
  Phone,
  MessageCircle,
  TrendingDown,
  Gauge
} from 'lucide-react';

// Custom utility to clean mobile links
const getWhatsAppLink = (mobile: string, text: string) => {
  if (!mobile) return '';
  let clean = mobile.replace(/[\s\-\(\)\+]/g, '');
  if (clean.length === 10 && !clean.startsWith('91')) {
    clean = '91' + clean;
  }
  return `https://wa.me/${clean}?text=${encodeURIComponent(text)}`;
};

interface AnalyticsDashboardProps {
  bookings: any[];
  drivers: any[];
  isRefreshing: boolean;
  onRefresh: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = React.memo(({ 
  bookings = [], 
  drivers = [], 
  isRefreshing, 
  onRefresh 
}) => {
  const [dateRange, setDateRange] = useState<'7days' | '30days' | 'all'>('all');
  const [driverSearch, setDriverSearch] = useState('');

  // 1. Process Core Analytical Data
  const stats = useMemo(() => {
    // Filter bookings based on selected date range
    const now = new Date();
    const filteredByRange = bookings.filter((b: any) => {
      if (dateRange === 'all') return true;
      if (!b.date) return false;
      
      const bookingDate = new Date(b.date);
      const diffTime = Math.abs(now.getTime() - bookingDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (dateRange === '7days') return diffDays <= 7;
      if (dateRange === '30days') return diffDays <= 30;
      return true;
    });

    const totalVolume = filteredByRange.length;
    
    // Status breakdowns
    const pendingCount = filteredByRange.filter((b: any) => b.status === 'pending').length;
    const assignedCount = filteredByRange.filter((b: any) => b.status === 'assigned').length;
    const startedCount = filteredByRange.filter((b: any) => b.status === 'started').length;
    const completedCount = filteredByRange.filter((b: any) => b.status === 'completed').length;
    const cancelledCount = filteredByRange.filter((b: any) => b.status === 'cancelled').length;

    // Revenue calculations
    const completedRevenue = filteredByRange
      .filter((b: any) => b.status === 'completed')
      .reduce((sum: number, b: any) => sum + (Number(b.price) || 0), 0);

    const projectedRevenue = filteredByRange
      .filter((b: any) => b.status !== 'cancelled')
      .reduce((sum: number, b: any) => sum + (Number(b.price) || 0), 0);

    // service/package breakups
    const serviceGroups = filteredByRange.reduce((acc: Record<string, { count: number; revenue: number }>, b: any) => {
      const sName = b.service || 'Bespoke Package';
      if (!acc[sName]) acc[sName] = { count: 0, revenue: 0 };
      acc[sName].count += 1;
      if (b.status !== 'cancelled') {
        acc[sName].revenue += (Number(b.price) || 0);
      }
      return acc;
    }, {});

    const popularServices = Object.entries(serviceGroups).map(([name, data]: [string, any]) => ({
      name,
      value: data.count,
      revenue: data.revenue
    })).sort((a, b) => b.value - a.value);

    // Vehicle utilization details
    const vehicleGroups = filteredByRange.reduce((acc: Record<string, { count: number; revenue: number }>, b: any) => {
      const vName = b.vehicle || 'Luxury Fleet Select';
      if (!acc[vName]) acc[vName] = { count: 0, revenue: 0 };
      acc[vName].count += 1;
      if (b.status !== 'cancelled') {
        acc[vName].revenue += (Number(b.price) || 0);
      }
      return acc;
    }, {});

    const vehicleUsage = Object.entries(vehicleGroups).map(([name, data]: [string, any]) => ({
      name,
      value: data.count,
      revenue: data.revenue
    })).sort((a, b) => b.value - a.value);

    // Top booked route analysis
    const routeGroups = filteredByRange.reduce((acc: Record<string, { count: number; revenue: number }>, b: any) => {
      if (!b.pickup || !b.drop) return acc;
      const cleanPickup = b.pickup.split(',')[0].trim();
      const cleanDrop = b.drop.split(',')[0].trim();
      const routeKey = `${cleanPickup} → ${cleanDrop}`;

      if (!acc[routeKey]) acc[routeKey] = { count: 0, revenue: 0 };
      acc[routeKey].count += 1;
      if (b.status !== 'cancelled') {
        acc[routeKey].revenue += (Number(b.price) || 0);
      }
      return acc;
    }, {});

    const topRoutes = Object.entries(routeGroups).map(([name, data]: [string, any]) => ({
      name,
      count: data.count,
      revenue: data.revenue,
      percentage: totalVolume > 0 ? Math.round((data.count / totalVolume) * 100) : 0
    })).sort((a, b) => b.count - a.count).reverse().slice(0, 5);

    // Time Series grouping for Booking Velocity (Daily counts)
    const dailyGroups = filteredByRange.reduce((acc: Record<string, { bookings: number; revenue: number }>, b: any) => {
      if (!b.date) return acc;
      // Normalizing date display string e.g. "2026-05-25" -> Short month date like "25 May"
      let dateLabel = b.date;
      try {
        const d = new Date(b.date);
        dateLabel = d.toLocaleDateString('default', { day: 'numeric', month: 'short' });
      } catch (e) {}

      if (!acc[dateLabel]) acc[dateLabel] = { bookings: 0, revenue: 0 };
      acc[dateLabel].bookings += 1;
      if (b.status === 'completed') {
        acc[dateLabel].revenue += (Number(b.price) || 0);
      }
      return acc;
    }, {});

    // For better line formatting, sort daily metrics chronologically (relying on raw booking objects array timestamps order)
    const dailyVolume = Object.entries(dailyGroups).map(([name, data]: [string, any]) => ({
      name,
      bookings: data.bookings,
      revenue: data.revenue
    })).slice(-10); // Show last 10 days for cleaner render

    // Monthly revenue grouping
    const monthlyGroups = filteredByRange.reduce((acc: Record<string, { revenue: number; bookings: number }>, b: any) => {
      if (!b.date) return acc;
      let monthLabel = 'Undated';
      try {
        const d = new Date(b.date);
        monthLabel = d.toLocaleDateString('default', { month: 'short', year: 'numeric' });
      } catch (e) {}

      if (!acc[monthLabel]) acc[monthLabel] = { revenue: 0, bookings: 0 };
      if (b.status === 'completed') {
        acc[monthLabel].revenue += (Number(b.price) || 0);
      }
      acc[monthLabel].bookings += 1;
      return acc;
    }, {});

    const monthlyRevenue = Object.entries(monthlyGroups).map(([name, data]: [string, any]) => ({
      name,
      revenue: data.revenue,
      bookings: data.bookings
    }));

    // Driver Analytics & Performance
    const driverPerformance = drivers.map((d: any) => {
      // Find bookings allocated to this driver
      const driverBookings = bookings.filter((b: any) => b.assignedDriver && b.assignedDriver.id === d.id);
      const completedTrips = driverBookings.filter((b: any) => b.status === 'completed').length;
      const onDutyTrips = driverBookings.filter((b: any) => b.status === 'started' || b.status === 'assigned').length;
      const generatedRevenue = driverBookings
        .filter((b: any) => b.status === 'completed')
        .reduce((sum: number, b: any) => sum + (Number(b.price) || 0), 0);

      return {
        ...d,
        completedTrips,
        onDutyTrips,
        generatedRevenue
      };
    }).sort((a: any, b: any) => b.completedTrips - a.completedTrips);

    return {
      totalVolume,
      pendingCount,
      assignedCount,
      startedCount,
      completedCount,
      cancelledCount,
      completedRevenue,
      projectedRevenue,
      popularServices,
      vehicleUsage,
      topRoutes,
      dailyVolume,
      monthlyRevenue,
      driverPerformance,
      filteredBookingsCount: filteredByRange.length
    };
  }, [bookings, drivers, dateRange]);

  // Luxury Color Palette for Pie Charts
  const LUXURY_COLORS = [
    '#D4AF37', // Premium Gold
    '#FCF6BA', // Pale Champagne
    '#F59E0B', // Bright Amber
    '#10B981', // Forest Emerald
    '#3B82F6', // Royal Sapphire
    '#8B5CF6', // Imperial Purple
    '#EC4899'  // Ruby Velvet
  ];

  const filteredDriverPerformance = useMemo(() => {
    return stats.driverPerformance.filter((d: any) => {
      return (d.name || '').toLowerCase().includes(driverSearch.toLowerCase()) || 
             (d.vehicleNumber || '').toLowerCase().includes(driverSearch.toLowerCase());
    });
  }, [stats.driverPerformance, driverSearch]);

  return (
    <div className="space-y-8 lg:space-y-16">
      {/* Header and Filter Control Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-6 lg:p-10 bg-slate-900/30 backdrop-blur-xl rounded-2xl lg:rounded-[3rem] border border-white/5 relative overflow-hidden gap-6 lg:gap-8">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
        <div className="relative z-10">
          <h3 className="text-xl lg:text-3xl font-black text-white tracking-tight flex items-center gap-3">
            <Activity className="text-geevee-orange" size={24} /> Chauffeur Command Intelligence
          </h3>
          <p className="text-[10px] lg:text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">
            Unified live metrics and business analytics of GeeVee Travels
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-4 w-full lg:w-auto">
          {/* Timeframe Filter Buttons */}
          <div className="flex bg-white/[0.02] border border-white/5 p-1 rounded-xl lg:p-1.5 lg:rounded-2xl shadow-inner gap-1 w-full sm:w-auto overflow-x-auto">
            {[
              { id: 'all', label: 'All Era' },
              { id: '30days', label: 'Last 30 Days' },
              { id: '7days', label: 'Last 7 Days' }
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setDateRange(range.id as any)}
                className={`px-3 lg:px-5 py-2 lg:py-2.5 rounded-lg lg:rounded-xl text-[9px] lg:text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap flex-grow sm:flex-none ${
                  dateRange === range.id 
                    ? 'bg-geevee-orange text-white shadow-lg' 
                    : 'text-slate-500 hover:text-slate-200'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>

          {/* Sync Button */}
          <button 
            onClick={onRefresh}
            disabled={isRefreshing}
            className="p-3 lg:p-4 bg-white/[0.03] hover:bg-white/[0.06] rounded-xl lg:rounded-2xl text-slate-400 hover:text-geevee-orange border border-white/5 transition-all active:scale-90 shadow-lg ml-auto lg:ml-0"
            title="Force Synchronize with Supabase Node"
          >
            <RefreshCw size={18} className={`transition-transform duration-1000 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. PREMIUM STRATEGIC METRICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
        {[
          { 
            label: 'Secured Revenue', 
            subtitle: 'Completed booking billings',
            value: `₹${stats.completedRevenue.toLocaleString('en-IN')}`, 
            icon: <CreditCard className="text-[#D4AF37]" />, 
            bg: 'bg-gradient-to-br from-[#D4AF37]/10 to-transparent border-t-[#D4AF37]/20',
            glow: 'rgba(212,175,55,0.05)'
          },
          { 
            label: 'Projection Vector', 
            subtitle: 'Non-cancelled operations',
            value: `₹${stats.projectedRevenue.toLocaleString('en-IN')}`, 
            icon: <TrendingUp className="text-emerald-400" />, 
            bg: 'bg-gradient-to-br from-emerald-500/10 to-transparent border-t-emerald-500/20',
            glow: 'rgba(16,185,129,0.05)'
          },
          { 
            label: 'Missions Secured', 
            subtitle: 'Total bookings cataloged',
            value: stats.totalVolume, 
            icon: <ShieldCheck className="text-blue-400" />, 
            bg: 'bg-gradient-to-br from-blue-500/10 to-transparent border-t-blue-500/20',
            glow: 'rgba(59,130,246,0.05)'
          },
          { 
            label: 'Active Deployments', 
            subtitle: 'Assigned & active pilots',
            value: stats.assignedCount + stats.startedCount, 
            icon: <Gauge className="text-purple-400" />, 
            bg: 'bg-gradient-to-br from-purple-500/10 to-transparent border-t-purple-500/20',
            glow: 'rgba(139,92,246,0.05)'
          }
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            key={i} 
            style={{ boxShadow: `0 30px 60px -15px rgba(0,0,0,0.5), inset 0 0 12px ${stat.glow}` }}
            className={`bg-slate-900/35 backdrop-blur-2xl p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-white/5 relative overflow-hidden group border-t-2`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
            <div className="flex items-center justify-between mb-6 lg:mb-8 relative z-10">
              <div className="bg-white/5 p-3 lg:p-4 rounded-xl lg:rounded-2xl group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">{stat.subtitle}</span>
            </div>
            <h4 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-2">{stat.label}</h4>
            <p className="text-2xl lg:text-4xl font-black text-white tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* 3. CHART GRID: DAILY BOOKINGS (LINE) & MONTHLY REVENUE (BAR) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Daily Booking Velocity */}
        <div className="bg-slate-900/30 backdrop-blur-xl p-6 lg:p-10 rounded-2xl lg:rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <TrendingUp size={18} className="text-geevee-orange" /> Engagement Velocity
              </h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1 opacity-50">Daily bookings trends</p>
            </div>
          </div>

          <div className="h-64 lg:h-80 w-full relative z-10 text-xs translate-x-[-10px]">
            {stats.dailyVolume.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={stats.dailyVolume} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorBookings" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#475569" strokeWidth={0.5} tickLine={false} style={{ fontSize: '9px', fontWeight: 'bold' }} />
                  <YAxis stroke="#475569" strokeWidth={0.5} tickLine={false} style={{ fontSize: '9px', fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0c1a2e', 
                      borderColor: '#D4AF37', 
                      borderRadius: '16px', 
                      color: 'white',
                      fontFamily: 'sans-serif',
                      fontSize: '11px'
                    }} 
                  />
                  <Area type="monotone" dataKey="bookings" stroke="#D4AF37" strokeWidth={2.5} fillOpacity={1} fill="url(#colorBookings)" name="Bookings Count" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <Clock className="text-slate-500 animate-pulse mb-4" size={32} />
                <span className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">Waiting for booking datasets</span>
              </div>
            )}
          </div>
        </div>

        {/* Monthly Revenue Projection */}
        <div className="bg-slate-900/30 backdrop-blur-xl p-6 lg:p-10 rounded-2xl lg:rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div>
              <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <CreditCard size={18} className="text-geevee-orange" /> Capital Inflow
              </h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest font-black mt-1 opacity-50">Monthly Completed Billings</p>
            </div>
          </div>

          <div className="h-64 lg:h-80 w-full relative z-10 text-xs translate-x-[-10px]">
            {stats.monthlyRevenue.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.monthlyRevenue} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                  <XAxis dataKey="name" stroke="#475569" strokeWidth={0.5} tickLine={false} style={{ fontSize: '9px', fontWeight: 'bold' }} />
                  <YAxis stroke="#475569" strokeWidth={0.5} tickLine={false} style={{ fontSize: '9px', fontWeight: 'bold' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#0c1a2e', 
                      borderColor: '#D4AF37', 
                      borderRadius: '16px', 
                      color: 'white',
                      fontSize: '11px'
                    }} 
                    formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="revenue" fill="#D4AF37" radius={[8, 8, 0, 0]}>
                    {stats.monthlyRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={LUXURY_COLORS[index % LUXURY_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex flex-col items-center justify-center">
                <Clock className="text-slate-500 animate-pulse mb-4" size={32} />
                <span className="text-slate-600 text-[10px] uppercase tracking-widest font-bold">Waiting for ledger details</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. DONUT PIE VISUALS: POPULAR PACKAGES & VEHICLE CLASS STATS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
        {/* Popular Tour Packages / Services */}
        <div className="bg-slate-900/30 backdrop-blur-xl p-6 lg:p-10 rounded-2xl lg:rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
          <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight mb-8 flex items-center gap-2 relative z-10">
            <Compass size={18} className="text-geevee-orange" /> Package Distribution
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            <div className="md:col-span-5 h-48 lg:h-64">
              {stats.popularServices.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.popularServices}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.popularServices.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={LUXURY_COLORS[index % LUXURY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} bookings`]} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">No Package Data</div>
              )}
            </div>

            <div className="md:col-span-7 space-y-2 lg:space-y-3.5">
              {stats.popularServices.slice(0, 4).map((srv, idx) => (
                <div key={srv.name} className="flex justify-between items-center group bg-white/[0.01] hover:bg-white/[0.03] p-3 rounded-xl lg:rounded-2xl border border-white/5 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full" style={{ backgroundColor: LUXURY_COLORS[idx % LUXURY_COLORS.length] }}></span>
                    <span className="text-[10px] lg:text-[11px] font-bold text-slate-300 group-hover:text-white capitalize transition-colors truncate max-w-[120px]">{srv.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] lg:text-[11px] font-black text-[#D4AF37]">{srv.value} bookings</span>
                    <p className="text-[8px] text-slate-500 font-bold tracking-wider leading-none">₹{srv.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Class stats */}
        <div className="bg-slate-900/30 backdrop-blur-xl p-6 lg:p-10 rounded-2xl lg:rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
          <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight mb-8 flex items-center gap-2 relative z-10">
            <Car size={18} className="text-geevee-orange" /> Fleet Utilization
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center relative z-10">
            <div className="md:col-span-5 h-48 lg:h-64">
              {stats.vehicleUsage.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stats.vehicleUsage}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {stats.vehicleUsage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={LUXURY_COLORS[(index + 2) % LUXURY_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} trips`]} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center text-slate-600 text-[10px] uppercase font-bold tracking-widest">No Fleet Metrics</div>
              )}
            </div>

            <div className="md:col-span-7 space-y-2 lg:space-y-3.5">
              {stats.vehicleUsage.slice(0, 4).map((veh, idx) => (
                <div key={veh.name} className="flex justify-between items-center group bg-white/[0.01] hover:bg-white/[0.03] p-3 rounded-xl lg:rounded-2xl border border-white/5 transition-all">
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full" style={{ backgroundColor: LUXURY_COLORS[(idx + 2) % LUXURY_COLORS.length] }}></span>
                    <span className="text-[10px] lg:text-[11px] font-bold text-slate-300 group-hover:text-white capitalize transition-colors truncate max-w-[120px]">{veh.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] lg:text-[11px] font-black text-[#D4AF37]">{veh.value} trips</span>
                    <p className="text-[8px] text-slate-500 font-bold tracking-wider leading-none">₹{veh.revenue.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 5. ROAD VECTOR ANALYSIS (MOST BOOKED ROUTES) */}
      <div className="bg-slate-900/30 backdrop-blur-xl p-6 lg:p-10 rounded-2xl lg:rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
        <div className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h4 className="text-xl lg:text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <MapPin size={22} className="text-geevee-orange" /> Main Transit Vectors
            </h4>
            <p className="text-[10px] lg:text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">High-volume pickup to dropoff run matrices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-8 relative z-10">
          {stats.topRoutes.length > 0 ? stats.topRoutes.map((route, i) => (
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              key={route.name}
              className="bg-white/[0.01] hover:bg-white/[0.03] p-5 lg:p-6 rounded-2xl lg:rounded-[2rem] border border-white/5 transition-all relative overflow-hidden text-center group"
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-geevee-orange/10 text-geevee-orange rounded-full flex items-center justify-center mx-auto mb-4 lg:mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>

              <h5 className="font-bold text-white text-xs tracking-tight line-clamp-2 min-h-[40px] mb-4">
                {route.name}
              </h5>

              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-[8px] lg:text-[10px] uppercase font-black tracking-widest text-slate-500">
                  <span>Count</span>
                  <span className="text-[#D4AF37]">{route.count} Runs</span>
                </div>
                {/* Micro Progress Bar */}
                <div className="h-1.5 bg-white/[0.03] rounded-full overflow-hidden border border-white/5">
                  <div className="h-full bg-geevee-orange rounded-full" style={{ width: `${route.percentage}%` }}></div>
                </div>
                <div className="flex justify-between text-[8px] font-bold text-slate-600">
                  <span>Usage share</span>
                  <span>{route.percentage}%</span>
                </div>
              </div>
              
              <div className="bg-white/[0.02] p-2 rounded-xl mt-4 lg:mt-6">
                <span className="text-[10px] font-mono font-bold text-slate-400">₹{route.revenue.toLocaleString()}</span>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-20 text-slate-600 text-xs font-bold uppercase tracking-widest">
              Awaiting flight analytics data
            </div>
          )}
        </div>
      </div>

      {/* 6. PILOT PERFORMANCE ANALYSIS MATRIX */}
      <div className="bg-slate-900/30 backdrop-blur-xl p-6 lg:p-10 rounded-2xl lg:rounded-[4rem] border border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] to-transparent pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 relative z-10">
          <div>
            <h4 className="text-xl lg:text-2xl font-black text-white tracking-tight flex items-center gap-3">
              <Award size={22} className="text-geevee-orange" /> Pilot Analytics
            </h4>
            <p className="text-[10px] lg:text-xs text-slate-500 mt-2 font-bold uppercase tracking-widest opacity-60">Completed assignments audit</p>
          </div>

          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
            <input 
              type="text" 
              placeholder="Search pilot stats..."
              value={driverSearch}
              onChange={(e) => setDriverSearch(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/5 focus:border-geevee-orange/30 pl-11 pr-4 py-3 rounded-full text-[10px] lg:text-xs font-bold text-white outline-none transition-all placeholder:text-slate-700 shadow-inner" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative z-10">
          {filteredDriverPerformance.length > 0 ? filteredDriverPerformance.map((dr, idx) => (
            <motion.div 
              whileHover={{ y: -6, scale: 1.01 }}
              key={dr.id}
              className="bg-white/[0.01] hover:bg-slate-900/40 p-6 lg:p-8 rounded-2xl lg:rounded-[2.5rem] border border-white/5 transition-all relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-6 lg:mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform text-slate-400">
                    <User size={20} />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm lg:text-base tracking-tight truncate max-w-[120px]">{dr.name}</h5>
                    <p className="text-[9px] sm:text-[10px] font-black text-geevee-orange bg-geevee-orange/5 border border-geevee-orange/10 px-2 py-0.5 rounded uppercase tracking-wider mt-1 w-fit">{dr.mobile}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <a 
                    href={`tel:${dr.mobile}`}
                    className="p-1.5 bg-blue-500/10 text-blue-400 rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                    title="Call Pilot"
                  >
                    <Phone size={11} />
                  </a>
                  <a 
                    href={getWhatsAppLink(dr.mobile, `Hello ${dr.name}, regarding operational roster schedule.`)}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-1.5 bg-[#25D366]/10 text-[#25D366] rounded-full hover:bg-[#25D366] hover:text-white transition-all shadow-sm"
                    title="Notify Pilot via WhatsApp"
                  >
                    <MessageCircle size={11} />
                  </a>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-white/5">
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-white/[0.02] p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-white/5">
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1.5">Trips</p>
                    <span className="text-base lg:text-lg font-black text-white">{dr.completedTrips}</span>
                  </div>
                  <div className="bg-white/[0.02] p-3 lg:p-4 rounded-xl lg:rounded-2xl border border-white/5">
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest mb-1.5 font-black text-geevee-orange">Revenue</p>
                    <span className="text-base lg:text-lg font-black text-[#D4AF37]">₹{dr.generatedRevenue.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-xl text-[9px] lg:text-[10px] font-bold">
                  <span className="text-slate-500">Status</span>
                  <span className={`px-2 py-0.5 rounded text-[8px] uppercase tracking-wider ${dr.status === 'available' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'}`}>
                    {dr.status}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-white/[0.01] p-3 rounded-xl text-[9px] lg:text-[10px] font-bold">
                  <span className="text-slate-500 truncate max-w-[80px]">Asset</span>
                  <span className="text-white/70 font-mono tracking-tight text-[8px] lg:text-[9px] truncate ml-2">{dr.vehicleNumber || 'Unassigned'} • {dr.vehicleModel}</span>
                </div>
              </div>
            </motion.div>
          )) : (
            <div className="col-span-full text-center py-20 text-slate-600 text-xs font-bold uppercase tracking-widest">
              Awaiting roster analysis or no matches found
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
