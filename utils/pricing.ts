import { ServiceType } from '../types.ts';
import { ExtendedVehicle } from '../constants.tsx';

interface FareResult {
  total: number;
  breakdown: string;
  isAvailable: boolean;
}

/**
 * Calculates the estimated fare for a trip.
 * 
 * @param distanceKm - The one-way distance in kilometers.
 * @param serviceType - The type of service (One Way, Round Trip, etc).
 * @param vehicle - The selected vehicle object containing pricing details.
 * @param startDate - Optional start date string (YYYY-MM-DD).
 * @param endDate - Optional end date string (YYYY-MM-DD).
 * @returns FareResult object with total price and breakdown text, or availability status.
 */
export const calculateTripFare = (
  distanceKm: number,
  serviceType: ServiceType,
  vehicle: ExtendedVehicle,
  startDate?: string,
  endDate?: string
): FareResult => {
  // Guard clauses
  if (!vehicle || distanceKm <= 0) {
    return { total: 0, breakdown: '', isAvailable: false };
  }

  const { pricing } = vehicle;
  let total = 0;
  let breakdown = '';

  // 1. ONE WAY CALCULATION
  if (serviceType === ServiceType.ONE_WAY) {
    if (typeof pricing.outstation.oneWay === 'string' && pricing.outstation.oneWay.toUpperCase() === "NOT AVAILABLE") {
      return { total: 0, breakdown: 'Service not available for this vehicle', isAvailable: false };
    }
    
    let ratePerKm = typeof pricing.outstation.oneWay === 'number' 
      ? pricing.outstation.oneWay 
      : parseFloat(pricing.outstation.oneWay as string) || 0;

    if (vehicle.type === 'Sedan') {
      ratePerKm = 13;
    }

    // Minimum distance rule: 130km
    const minDistance = 130;
    const billableDistance = Math.max(distanceKm, minDistance);

    const baseFare = Math.round(billableDistance * ratePerKm);
    
    // Add Driver Batta if applicable (for outstation). Wait, requirement is "Driver Bata Extra". I will include it.
    const driverBatta = pricing.outstation.driverBatta;
    total = baseFare; // Batta is Extra
    
    const distText = distanceKm < minDistance ? `${minDistance} km (Min)` : `${Math.round(distanceKm)} km`;
    breakdown = `${distText} x ₹${ratePerKm} = ₹${baseFare}\n+ ₹${driverBatta} Driver Bata Extra\n+ Toll Extra\n+ Permit Extra\n+ Hills Charges Extra`;
  }

  // 2. ROUND TRIP CALCULATION
  else if (serviceType === ServiceType.ROUND_TRIP) {
    let ratePerKm = pricing.outstation.roundTrip;
    
    if (vehicle.type === 'Sedan') {
      ratePerKm = 13;
    }
    
    // Logic: (Distance * 2) * Rate + Driver Batta
    // Round trip implies returning to origin, so distance is doubled.
    const totalDistance = distanceKm * 2;
    
    // Minimum km rule: 250km per day
    let days = 1;
    if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
            const diffTime = Math.abs(end.getTime() - start.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            days = Math.max(1, diffDays + 1); // Inclusive of start and end date
        } else {
             // Fallback if dates are invalid
             days = totalDistance > 600 ? Math.ceil(totalDistance / 300) : 1;
        }
    } else {
        // Fallback: Estimate days based on distance (Assuming ~300km per day)
        days = totalDistance > 600 ? Math.ceil(totalDistance / 300) : 1;
    }

    // New Requirement: Minimum daily coverage: 250 KM
    const minKmPerDay = 250;
    const minTotalKm = minKmPerDay * days;
    const billableDistance = Math.max(totalDistance, minTotalKm);
    
    const baseFare = Math.round(billableDistance * ratePerKm);
    const totalBatta = pricing.outstation.driverBatta * days;

    total = baseFare; // Batta is Extra
    
    const distText = totalDistance < minTotalKm ? `${minTotalKm} km (Min for ${days} days)` : `${Math.round(billableDistance)} km (Up & Down)`;
    breakdown = `${distText} x ₹${ratePerKm} = ₹${baseFare}\n+ ₹${totalBatta} Driver Bata Extra (${days} days)\n+ Toll Extra\n+ Permit Extra\n+ Hills Charges Extra`;
  }

  // 3. LOCAL / AIRPORT
  else if (serviceType === ServiceType.LOCAL) {
    // Local trips are package based (time/dist), difficult to estimate purely on Map A-to-B distance
    // without duration data. We fallback to the base package price.
    
    // Find a package that fits the distance approx
    const suitablePackage = pricing.localPackages.find(p => {
        const pkgKm = parseInt(p.kms.split(' ')[0]);
        return pkgKm >= distanceKm;
    }) || pricing.localPackages[pricing.localPackages.length - 1]; // Default to largest if very far

    total = suitablePackage.price;
    breakdown = `Base Package: ${suitablePackage.duration} / ${suitablePackage.kms}`;
  }

  return {
    total,
    breakdown,
    isAvailable: true
  };
};