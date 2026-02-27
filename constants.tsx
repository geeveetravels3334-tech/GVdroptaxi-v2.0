import { ServiceType, Vehicle, Route } from './types.ts';

export const MAJOR_AIRPORTS = [
  "Chennai International Airport (MAA)",
  "Coimbatore International Airport (CJB)",
  "Madurai International Airport (IXM)",
  "Trichy International Airport (TRZ)",
  "Salem Airport (SXV)",
  "Tuticorin Airport (TCR)"
];

export interface VehiclePricing {
  localPackages: {
    duration: string;
    kms: string;
    price: number;
  }[];
  outstation: {
    roundTrip: number;
    oneWay: string | number;
    driverBatta: number;
  };
}

export interface ExtendedVehicle extends Vehicle {
  pricing: VehiclePricing;
}

export const DETAILED_VEHICLES: ExtendedVehicle[] = [
  {
    id: 'mini-wagonr',
    name: 'Maruti WagonR',
    type: 'Mini',
    capacity: 4,
    pricePerKm: 13,
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1200&auto=format&fit=crop',
    features: ['Compact & Economical', 'AC', 'Music System', 'Perfect for 4'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 1400 },
        { duration: '8 Hours', kms: '80 Kms', price: 2100 },
        { duration: '10 Hours', kms: '100 Kms', price: 2600 },
        { duration: '12 Hours', kms: '120 Kms', price: 3100 },
        { duration: '15 Hours', kms: '150 Kms', price: 3900 }
      ],
      outstation: { roundTrip: 13, oneWay: 15, driverBatta: 400 }
    }
  },
  {
    id: 'swift-dzire',
    name: 'Swift Dzire',
    type: 'Sedan',
    capacity: 4,
    pricePerKm: 14,
    image: 'https://images.unsplash.com/photo-1631248749830-9b04859a101b?q=75&w=600&auto=format&fit=crop',
    features: ['AC', 'Music System', 'Carrier Available', 'Clean Seats'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 1600 },
        { duration: '8 Hours', kms: '80 Kms', price: 2400 },
        { duration: '10 Hours', kms: '100 Kms', price: 2900 },
        { duration: '12 Hours', kms: '120 Kms', price: 3500 },
        { duration: '15 Hours', kms: '150 Kms', price: 4400 }
      ],
      outstation: { roundTrip: 14, oneWay: 16, driverBatta: 500 }
    }
  },
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    type: 'Sedan',
    capacity: 4,
    pricePerKm: 14,
    image: 'https://images.unsplash.com/photo-1721544431872-359f14798670?q=75&w=600&auto=format&fit=crop',
    features: ['Comfortable Ride', 'Spacious Boot', 'Reliable', 'Clean Seats'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 1600 },
        { duration: '8 Hours', kms: '80 Kms', price: 2400 },
        { duration: '10 Hours', kms: '100 Kms', price: 2900 },
        { duration: '12 Hours', kms: '120 Kms', price: 3500 },
        { duration: '15 Hours', kms: '150 Kms', price: 4400 }
      ],
      outstation: { roundTrip: 14, oneWay: 16, driverBatta: 500 }
    }
  },
  {
    id: 'mahindra-marazzo',
    name: 'Mahindra Marazzo',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 18,
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=75&w=600&auto=format&fit=crop',
    features: ['Luxury AC', 'Ample Leg Space', 'Premium Interior', 'Expert Driver'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2100 },
        { duration: '8 Hours', kms: '80 Kms', price: 3200 },
        { duration: '10 Hours', kms: '100 Kms', price: 3800 },
        { duration: '12 Hours', kms: '120 Kms', price: 4600 },
        { duration: '15 Hours', kms: '150 Kms', price: 5600 }
      ],
      outstation: { roundTrip: 18, oneWay: 20, driverBatta: 500 }
    }
  },
  {
    id: 'mahindra-xylo',
    name: 'Mahindra Xylo',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 18,
    image: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?q=75&w=600&auto=format&fit=crop',
    features: ['Reliable SUV', 'Spacious Interiors', 'Smooth Ride', 'Carrier'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2100 },
        { duration: '8 Hours', kms: '80 Kms', price: 3200 },
        { duration: '10 Hours', kms: '100 Kms', price: 3800 },
        { duration: '12 Hours', kms: '120 Kms', price: 4600 },
        { duration: '15 Hours', kms: '150 Kms', price: 5600 }
      ],
      outstation: { roundTrip: 18, oneWay: 20, driverBatta: 500 }
    }
  },
  {
    id: 'chevrolet-tavera',
    name: 'Chevrolet Tavera',
    type: 'SUV',
    capacity: 9,
    pricePerKm: 18,
    image: 'https://images.unsplash.com/photo-1517524008436-bbdb53c24436?q=75&w=600&auto=format&fit=crop',
    features: ['9-Seater Option', 'Best for Groups', 'Great Performance', 'Sturdy'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2200 },
        { duration: '8 Hours', kms: '80 Kms', price: 3200 },
        { duration: '10 Hours', kms: '100 Kms', price: 3800 },
        { duration: '12 Hours', kms: '120 Kms', price: 4600 },
        { duration: '15 Hours', kms: '150 Kms', price: 5600 }
      ],
      outstation: { roundTrip: 18, oneWay: 20, driverBatta: 500 }
    }
  },
  {
    id: 'toyota-innova',
    name: 'Toyota Innova',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 19,
    image: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?q=600&auto=format&fit=crop',
    features: ['Comfort King', 'Highly Recommended', 'Dual AC', 'Clean Car'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2200 },
        { duration: '8 Hours', kms: '80 Kms', price: 3400 },
        { duration: '10 Hours', kms: '100 Kms', price: 4000 },
        { duration: '12 Hours', kms: '120 Kms', price: 4700 },
        { duration: '15 Hours', kms: '150 Kms', price: 5800 }
      ],
      outstation: { roundTrip: 19, oneWay: 21, driverBatta: 500 }
    }
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    type: 'Luxury SUV',
    capacity: 7,
    pricePerKm: 22,
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=75&w=600&auto=format&fit=crop',
    features: ['Premium Luxury', 'Maximum Comfort', 'Excellent Ride', 'Safety First'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2500 },
        { duration: '10 Hours', kms: '100 Kms', price: 5000 },
        { duration: '15 Hours', kms: '150 Kms', price: 7500 }
      ],
      outstation: { roundTrip: 22, oneWay: "NOT AVAILABLE", driverBatta: 700 }
    }
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    type: 'Van',
    capacity: 12,
    pricePerKm: 26,
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=75&w=800&auto=format&fit=crop',
    features: ['Large Groups', 'High Roof', 'Entertainment System', 'Carrier'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 3500 },
        { duration: '10 Hours', kms: '100 Kms', price: 7000 },
        { duration: '15 Hours', kms: '150 Kms', price: 10500 }
      ],
      outstation: { roundTrip: 26, oneWay: "NOT AVAILABLE", driverBatta: 800 }
    }
  }
];

export const ALL_DESTINATIONS = [
  "Tenkasi", "Kallakurichi", "Mayiladuthurai", "Kodaikanal", "Perambalur", "Thiruvarur", "Courtallam", "Mannargudi", "Pudukkottai",
  "Palani", "Thirukoilur", "Jayankondam", "Sankarankoil", "Ulundurpet", "Sirkazhi", "Rajapalayam", "Pudukottai", "Ambur", "Virudhunagar",
  "Arakkonam", "Gudiyatham", "Natham", "Cheyyar", "Melmaruvathur", "Paramakudi", "Gingee", "Panruti", "Arani", "Chengalpattu",
  "Tirupattur", "Tindivanam", "Ranipet", "Sivagangai", "Theni", "Kulithalai", "Kumbakonam", "Chidambaram", "Tirupati (AP)",
  "Bangalore (KA)", "Thiruchendur", "Nellore (AP)", "Mysore (KA)", "Kovilpatti", "Ongole (AP)", "Mangalore (KA)", "Rasipuram",
  "Guntur (AP)", "Coonoor", "Tiruchengode", "Rajahmundry (AP)", "Hubli (KA)", "Udumalpet", "Vijayawada (AP)", "Belgaum (KA)",
  "Kakinada (AP)", "Udupi (KA)", "Karaikudi", "Vishakhapatnam (AP)", "Davangere (KA)", "Sankarankovil", "Chittoor (AP)",
  "Tumkur (KA)", "Sattur", "Kadapa (AP)", "Chikmagalur (KA)", "Tirumala (AP)", "Shivamogga (KA)", "Kanyakumari", "Eluru (AP)",
  "Dharwad (KA)", "Rameswaram", "Machilipatnam (AP)", "Karwar (KA)", "Pollachi", "Anantapur (AP)", "Bellary (KA)", "Ooty",
  "Srikalahasti (AP)", "Hosur (KA)", "Kochi (KL)", "Thrissur (KL)", "Kozhikode (KL)", "Munnar (KL)", "Alappuzha (KL)",
  "Wayanad (KL)", "Trivandrum (KL)", "Palakkad (KL)", "Kollam (KL)", "Kottayam (KL)", "Idukki (KL)", "Kannur (KL)",
  "Bangalore", "Hyderabad", "Mumbai", "Pune", "Ahmedabad", "Delhi", "Kolkata", "Coimbatore", "Madurai", "Trichy", "Salem",
  "Mysore", "Mangalore", "Goa", "Vijayawada", "Visakhapatnam", "Tirupati", "Nellore", "Guntur", "Rajahmundry", "Kakinada",
  "Bhubaneswar", "Jaipur", "Chandigarh", "Lucknow", "Indore", "Bhopal", "Nagpur", "Aurangabad", "Nashik", "Surat", "Vadodara",
  "Patna", "Ranchi", "Guwahati", "Shimla", "Dehradun", "Udaipur", "Jodhpur", "Amritsar", "Varanasi", "Allahabad"
];

export const VEHICLES: Vehicle[] = DETAILED_VEHICLES.map(({ pricing, ...rest }) => rest);

export const POPULAR_ROUTES: Route[] = [
  { from: 'Chennai', to: 'Madurai', distance: '460 KM', duration: '8 Hours', price: 5999 },
  { from: 'Chennai', to: 'Pondicherry', distance: '165 KM', duration: '3.5 Hours', price: 2499 },
  { from: 'Chennai', to: 'Trichy', distance: '330 KM', duration: '6 Hours', price: 4499 },
  { from: 'Chennai', to: 'Coimbatore', distance: '510 KM', duration: '9 Hours', price: 6999 },
  { from: 'Chennai', to: 'Velankanni', distance: '315 KM', duration: '7 Hours', price: 4299 },
  { from: 'Chennai', to: 'Salem', distance: '350 KM', duration: '6.5 Hours', price: 4699 }
];