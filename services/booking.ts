
import { ReferralService } from './referral.ts';
import { getSupabase } from './supabase.ts';

// Helper to generate the custom Booking ID format: Ryymm0001
const generateBookingId = (serviceType: string, createdAt: string) => {
  const typeMap: Record<string, string> = {
    'One Way Drop': 'O',
    'Round Trip': 'R',
    'Local / Airport': 'L'
  };
  
  const typeChar = typeMap[serviceType] || 'G'; 
  
  const date = new Date(createdAt);
  const year = date.getFullYear().toString().slice(-2); // e.g. "25"
  const month = date.toLocaleString('en-US', { month: 'short' }).substring(0, 2).toLowerCase();
  const sequence = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  
  return `${typeChar}${year}${month}${sequence}`;
};

export const BookingService = {
  // --- Driver Management ---
  getDrivers: async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('drivers')
      .select('*');
    
    if (error) {
      console.error("Supabase Error (getDrivers):", error);
      return [];
    }
    return (data || []).map((d: any) => ({
      id: d.id,
      name: d.name,
      mobile: d.mobile,
      license: d.license,
      vehicleModel: d.vehicle_model,
      vehicleNumber: d.vehicle_number,
      status: d.status,
      joinedAt: d.joined_at,
      totalTrips: d.total_trips
    }));
  },

  addDriver: async (driverData: any) => {
    const supabase = getSupabase();
    const newDriver = {
      name: driverData.name,
      mobile: driverData.mobile,
      license: driverData.license,
      vehicle_model: driverData.vehicleModel,
      vehicle_number: driverData.vehicleNumber,
      status: 'available',
      joined_at: new Date().toISOString(),
      total_trips: 0
    };

    const { data, error } = await supabase
      .from('drivers')
      .insert([newDriver])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error (addDriver):", error);
      throw error;
    }
    
    return {
      id: data.id,
      name: data.name,
      mobile: data.mobile,
      license: data.license,
      vehicleModel: data.vehicle_model,
      vehicleNumber: data.vehicle_number,
      status: data.status,
      joinedAt: data.joined_at,
      totalTrips: data.total_trips
    };
  },

  deleteDriver: async (id: string) => {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('drivers')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Supabase Error (deleteDriver):", error);
      throw error;
    }
  },

  // --- Booking Management ---
  saveBooking: async (data: any) => {
    const supabase = getSupabase();
    const timestamp = new Date().toISOString();
    const displayId = generateBookingId(data.service, timestamp);

    const bookingData = {
      service_type: data.service,
      pickup_location: data.pickup,
      drop_location: data.drop,
      pickup_date: data.date,
      return_date: data.returnDate || null,
      pickup_time: data.time,
      mobile: data.mobile,
      customer_name: data.customerName,
      vehicle: data.vehicle,
      price: data.price,
      applied_referral_code: data.referralCode || null,
      discount_amount: data.discountAmount || 0,
      status: 'confirmed',
      created_at: timestamp,
      booking_display_id: displayId,
      assigned_driver: null
    };

    const { data: insertedData, error } = await supabase
      .from('bookings')
      .insert([bookingData])
      .select()
      .single();

    if (error) {
      console.error("Supabase Error (saveBooking):", error);
      throw error;
    }

    return { 
      id: insertedData.id, 
      bookingId: displayId,
      ...insertedData 
    };
  },

  getAllBookings: async () => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error (getAllBookings):", error);
      return [];
    }

    return (data || []).map((b: any) => ({
      id: b.id,
      bookingId: b.booking_display_id,
      service: b.service_type,
      pickup: b.pickup_location,
      drop: b.drop_location,
      date: b.pickup_date,
      returnDate: b.return_date,
      time: b.pickup_time,
      mobile: b.mobile,
      customerName: b.customer_name,
      vehicle: b.vehicle,
      price: b.price,
      status: b.status,
      timestamp: b.created_at,
      assignedDriver: b.assigned_driver
    }));
  },

  getUserBookings: async (mobile: string) => {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('mobile', mobile)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase Error (getUserBookings):", error);
      return [];
    }

    return (data || []).map((b: any) => ({
      id: b.id,
      bookingId: b.booking_display_id,
      service: b.service_type,
      pickup: b.pickup_location,
      drop: b.drop_location,
      date: b.pickup_date,
      returnDate: b.return_date,
      time: b.pickup_time,
      vehicle: b.vehicle,
      price: b.price,
      status: b.status,
      timestamp: b.created_at,
      assignedDriver: b.assigned_driver
    }));
  },

  updateBookingStatus: async (id: string, status: string) => {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error("Supabase Error (updateBookingStatus):", error);
      return false;
    }
    return true;
  },

  assignDriver: async (bookingId: string, driver: any) => {
    const supabase = getSupabase();
    // 1. Update Booking
    const { error: bookingError } = await supabase
      .from('bookings')
      .update({ 
        assigned_driver: driver,
        status: 'confirmed' 
      })
      .eq('id', bookingId);
    
    if (bookingError) {
      console.error("Supabase Error (assignDriver - booking):", bookingError);
      return false;
    }

    // 2. Update Driver Status
    // First get current trips to increment
    const { data: driverData, error: fetchError } = await supabase
      .from('drivers')
      .select('total_trips')
      .eq('id', driver.id)
      .single();

    if (fetchError) {
      console.error("Supabase Error (assignDriver - fetch driver):", fetchError);
      return false;
    }

    const { error: driverError } = await supabase
      .from('drivers')
      .update({ 
        status: 'on-duty',
        total_trips: (driverData?.total_trips || 0) + 1
      })
      .eq('id', driver.id);

    if (driverError) {
      console.error("Supabase Error (assignDriver - driver update):", driverError);
      return false;
    }

    return true;
  },

  deleteBooking: async (id: string) => {
    const supabase = getSupabase();
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Supabase Error (deleteBooking):", error);
      throw error;
    }
  },

  getStats: async () => {
    const bookings = await BookingService.getAllBookings();
    const total = bookings.length;
    
    const serviceDist = bookings.reduce((acc: any, b: any) => {
      acc[b.service] = (acc[b.service] || 0) + 1;
      return acc;
    }, {});

    const statusDist = bookings.reduce((acc: any, b: any) => {
      acc[b.status] = (acc[b.status] || 0) + 1;
      return acc;
    }, {});

    const revenue = bookings
      .filter((b: any) => b.status !== 'cancelled')
      .reduce((sum: number, b: any) => sum + (Number(b.price) || 0), 0);

    return {
      total,
      pending: statusDist['pending'] || 0,
      confirmed: statusDist['confirmed'] || 0,
      completed: statusDist['completed'] || 0,
      cancelled: statusDist['cancelled'] || 0,
      estimatedRevenue: revenue,
      serviceDist
    };
  }
};
