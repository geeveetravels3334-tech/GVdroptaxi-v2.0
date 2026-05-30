
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

const isBrowser = typeof window !== 'undefined';

export const BookingService = {
  // --- Driver Management ---
  getDrivers: async () => {
    if (isBrowser) {
      const res = await fetch('/api/drivers');
      return res.json();
    }
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

  updateDriver: async (driverData: any) => {
    if (isBrowser) {
      const res = await fetch(`/api/drivers/${driverData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driverData)
      });
      return res.json();
    }
    const supabase = getSupabase();
    const { error } = await supabase
      .from('drivers')
      .update({
        name: driverData.name,
        mobile: driverData.mobile,
        license: driverData.license,
        vehicle_model: driverData.vehicleModel,
        vehicle_number: driverData.vehicleNumber
      })
      .eq('id', driverData.id);

    if (error) {
      console.error("Supabase Error (updateDriver):", error);
      throw error;
    }
    return true;
  },

  addDriver: async (driverData: any) => {
    if (isBrowser) {
      const res = await fetch('/api/drivers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(driverData)
      });
      return res.json();
    }
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
    if (isBrowser) {
      await fetch(`/api/drivers/${id}`, { method: 'DELETE' });
      return;
    }
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
  saveBooking: async (inputData: any) => {
    if (isBrowser) {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData)
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to save booking');
      }
      return res.json();
    }
    const supabase = getSupabase();
    const timestamp = new Date().toISOString();
    const displayId = generateBookingId(inputData.service || 'One Way Drop', timestamp);

    // Safeguard columns to prevent undefined/null fields and ensure exact mapping
    const bookingData: any = {
      booking_display_id: displayId,
      service_type: String(inputData.service || 'One Way Drop'),
      pickup_location: String(inputData.pickup || ''),
      drop_location: String(inputData.drop || ''),
      pickup_date: String(inputData.date || ''),
      pickup_time: String(inputData.time || ''),
      return_date: inputData.returnDate || null,
      vehicle: String(inputData.vehicle || ''),
      price: String(inputData.price || '0'),
      customer_name: inputData.customerName || 'Guest',
      mobile: String(inputData.mobile || ''),
      status: 'pending',
      applied_referral_code: inputData.referralCode || null,
      discount_amount: Number(inputData.discountAmount || 0),
      created_at: timestamp
    };

    console.log("PRE-INSERT CHECK - Payload:", bookingData);

    try {
      const { error } = await supabase
        .from('bookings')
        .insert([bookingData]);
      
      if (error) {
        console.error("SUPABASE INSERT ERROR OBJECT:", error);
        throw error;
      }
      
      console.log("SUPABASE INSERT COMPLETED SUCCESSFULLY");
      return { 
        success: true,
        bookingId: displayId 
      };
    } catch (e: any) {
      console.error("CRITICAL SUPABASE FAILURE:", e.message || e);
      throw e;
    }
  },

  getAllBookings: async () => {
    if (isBrowser) {
      const res = await fetch('/api/bookings');
      return res.json();
    }
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
      assignedDriver: b.assigned_driver,
      driverShared: b.driver_shared,
      customerShared: b.customer_shared,
      sharedAt: b.shared_at
    }));
  },

  getUserBookings: async (mobile: string) => {
    if (isBrowser) {
      const res = await fetch(`/api/bookings/user/${mobile}`);
      return res.json();
    }
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
      assignedDriver: b.assigned_driver,
      driverShared: b.driver_shared,
      customerShared: b.customer_shared,
      sharedAt: b.shared_at
    }));
  },

  updateBookingStatus: async (id: string, status: string) => {
    if (isBrowser) {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      return res.ok;
    }
    const supabase = getSupabase();
    const { data: booking, error: fetchError } = await supabase
      .from('bookings')
      .select('assigned_driver')
      .eq('id', id)
      .single();

    if (fetchError) {
      console.error("Supabase Error (fetch booking driver):", fetchError);
      return false;
    }

    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error("Supabase Error (updateBookingStatus):", error);
      return false;
    }

    // Release the driver if completed or cancelled
    if ((status === 'completed' || status === 'cancelled') && booking?.assigned_driver?.id) {
      const { error: driverError } = await supabase
        .from('drivers')
        .update({ status: 'available' })
        .eq('id', booking.assigned_driver.id);
      
      if (driverError) {
         console.error("Supabase Error (release driver):", driverError);
      }
    }

    return true;
  },

  assignDriver: async (bookingId: string, driver: any) => {
    if (isBrowser) {
      const res = await fetch(`/api/bookings/${bookingId}/assign`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driver })
      });
      return res.ok;
    }
    const supabase = getSupabase();
    // 1. Update Booking
    const { error: bookingError } = await supabase
      .from('bookings')
      .update({ 
        assigned_driver: driver,
        status: 'assigned' 
      })
      .eq('id', bookingId);
    
    if (bookingError) {
      console.error("Supabase Error (assignDriver - booking):", bookingError);
      return false;
    }

    // 2. Insert into Trip Assignments
    const { error: assignError } = await supabase
      .from('trip_assignments')
      .insert([{
        booking_id: bookingId,
        driver_id: driver.id,
        status: 'Assigned'
      }]);

    if (assignError) {
      console.error("Supabase Error (assignDriver - assignment):", assignError);
      // We don't necessarily fail the whole operation if this secondary record fails, 
      // but it's good to log.
    }

    // 3. Update Driver Status
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

  markTripShared: async (bookingId: string, target: 'driver' | 'customer') => {
    if (isBrowser) {
      const res = await fetch(`/api/bookings/${bookingId}/share`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target })
      });
      return res.ok;
    }
    const supabase = getSupabase();
    
    const updateData: any = { shared_at: new Date().toISOString() };
    if (target === 'driver') updateData.driver_shared = true;
    if (target === 'customer') updateData.customer_shared = true;

    const { error } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', bookingId);
    
    if (error) {
      console.error("Supabase Error (markTripShared):", error);
      return false;
    }
    return true;
  },

  deleteBooking: async (id: string) => {
    if (isBrowser) {
      await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      return;
    }
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
    if (isBrowser) {
      const res = await fetch('/api/stats');
      return res.json();
    }
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
      assigned: statusDist['assigned'] || 0,
      started: statusDist['started'] || 0,
      completed: statusDist['completed'] || 0,
      cancelled: statusDist['cancelled'] || 0,
      estimatedRevenue: revenue,
      serviceDist
    };
  }
};
