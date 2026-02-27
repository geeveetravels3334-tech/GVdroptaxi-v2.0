
import { ReferralService } from './referral.ts';

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

// --- Mock Database (LocalStorage) ---
const DRIVER_STORAGE_KEY = 'geevee_drivers_db';
const BOOKING_STORAGE_KEY = 'geevee_bookings_db';

const getLocalDrivers = () => {
  try {
    const data = localStorage.getItem(DRIVER_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const saveLocalDrivers = (drivers: any[]) => {
  localStorage.setItem(DRIVER_STORAGE_KEY, JSON.stringify(drivers));
};

const getLocalBookings = () => {
  try {
    const data = localStorage.getItem(BOOKING_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch { return []; }
};

const saveLocalBookings = (bookings: any[]) => {
  localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(bookings));
};

export const BookingService = {
  // --- Driver Management ---
  getDrivers: async () => {
    return getLocalDrivers();
  },

  addDriver: async (driverData: any) => {
    const drivers = getLocalDrivers();
    const newDriver = {
      id: `DRV-${Date.now().toString().slice(-5)}`,
      ...driverData,
      status: 'available',
      joinedAt: new Date().toISOString(),
      totalTrips: 0
    };
    drivers.push(newDriver);
    saveLocalDrivers(drivers);
    return newDriver;
  },

  deleteDriver: async (id: string) => {
    const drivers = getLocalDrivers().filter((d: any) => d.id !== id);
    saveLocalDrivers(drivers);
  },

  // --- Booking Management ---
  saveBooking: async (data: any) => {
    const timestamp = new Date().toISOString();
    const displayId = generateBookingId(data.service, timestamp);

    const bookingData = {
      id: `bk_${Date.now()}`,
      serviceType: data.service,
      pickupLocation: data.pickup,
      dropLocation: data.drop,
      pickupDate: data.date,
      returnDate: data.returnDate || null,
      pickupTime: data.time,
      mobile: data.mobile,
      customerName: data.customerName,
      vehicle: data.vehicle,
      price: data.price,
      appliedReferralCode: data.referralCode || null,
      discountAmount: data.discountAmount || 0,
      status: 'pending',
      createdAt: timestamp,
      bookingDisplayId: displayId,
      assignedDriver: null
    };

    const bookings = getLocalBookings();
    bookings.push(bookingData);
    saveLocalBookings(bookings);

    // Return format expected by UI
    return { 
      id: bookingData.id, 
      bookingId: displayId,
      ...bookingData 
    };
  },

  getAllBookings: async () => {
    const bookings = getLocalBookings();
    return bookings.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((b: any) => ({
        id: b.id,
        bookingId: b.bookingDisplayId,
        service: b.serviceType,
        pickup: b.pickupLocation,
        drop: b.dropLocation,
        date: b.pickupDate,
        returnDate: b.returnDate,
        time: b.pickupTime,
        mobile: b.mobile,
        customerName: b.customerName,
        vehicle: b.vehicle,
        price: b.price,
        status: b.status,
        timestamp: b.createdAt,
        assignedDriver: b.assignedDriver
      }));
  },

  getUserBookings: async (mobile: string) => {
    const bookings = getLocalBookings();
    return bookings
      .filter((b: any) => b.mobile === mobile)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((b: any) => ({
        id: b.id,
        bookingId: b.bookingDisplayId,
        service: b.serviceType,
        pickup: b.pickupLocation,
        drop: b.dropLocation,
        date: b.pickupDate,
        returnDate: b.returnDate,
        time: b.pickupTime,
        vehicle: b.vehicle,
        price: b.price,
        status: b.status,
        timestamp: b.createdAt,
        assignedDriver: b.assignedDriver
      }));
  },

  updateBookingStatus: async (id: string, status: string) => {
    const bookings = getLocalBookings();
    const idx = bookings.findIndex((b: any) => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      saveLocalBookings(bookings);
      return true;
    }
    return false;
  },

  assignDriver: async (bookingId: string, driver: any) => {
    const bookings = getLocalBookings();
    const idx = bookings.findIndex((b: any) => b.id === bookingId);
    
    if (idx !== -1) {
      bookings[idx].assignedDriver = driver;
      bookings[idx].status = 'confirmed';
      saveLocalBookings(bookings);

      // Update Driver Status
      const drivers = getLocalDrivers();
      const driverIdx = drivers.findIndex((d: any) => d.id === driver.id);
      if (driverIdx >= 0) {
        drivers[driverIdx].status = 'on-duty';
        drivers[driverIdx].totalTrips += 1;
        saveLocalDrivers(drivers);
      }
      return true;
    }
    return false;
  },

  deleteBooking: async (id: string) => {
    const bookings = getLocalBookings();
    const newBookings = bookings.filter((b: any) => b.id !== id);
    saveLocalBookings(newBookings);
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
