import { ServiceType, Vehicle, Route } from './types.ts';
import wagonRImg from './src/assets/images/wagon_r_tn_taxi_1779101069278.png';
import swiftDzireImg from './src/assets/images/swift_dzire_tn_taxi_1779101087848.png';
import etiosImg from './src/assets/images/toyota_etios_tn_taxi_1779101107987.png';
import ertigaImg from './src/assets/images/ertiga_tn_taxi_1779101128801.png';
import innovaImg from './src/assets/images/innova_tn_taxi_1779101146943.png';
import crystaImg from './src/assets/images/innova_crysta_tn_taxi_1779101167124.png';
import tempoTravellerImg from './src/assets/images/tempo_traveller_tn_taxi_1779101186262.png';

// Destination Images
import pondicherryImg from './src/assets/images/pondicherry_white_town_landmark_1779184656753.png';
import velankanniImg from './src/assets/images/velankanni_basilica_landmark_1779184676615.png';
import tiruvannamalaiImg from './src/assets/images/tiruvannamalai_temple_arunachala_1779184696910.png';
import mahabalipuramImg from './src/assets/images/mahabalipuram_shore_temple_landmark_1779184713692.png';
import kanchipuramImg from './src/assets/images/kanchipuram_temple_landmark_1779184733027.png';
import yercaudImg from './src/assets/images/yercaud_lake_hill_station_1779184750011.png';
import hogenakkalImg from './src/assets/images/hogenakkal_falls_nature_1779184769368.png';
import chennaiImg from './src/assets/images/chennai_marina_beach_coast_1779184785375.png';
import ootyImg from './src/assets/images/ooty_nilgiris_hill_station_1779184805867.png';
import kodaikanalImg from './src/assets/images/kodaikanal_lake_hills_view_1779184825615.png';
import rameswaramImg from './src/assets/images/rameswaram_pamban_bridge_sea_1779184843094.png';
import maduraiImg from './src/assets/images/madurai_meenakshi_temple_view_1779184862931.png';
import kanyakumariImg from './src/assets/images/kanyakumari_rock_memorial_sea_1779184886642.png';
import luxuryHeroImg from './src/assets/images/luxury_tn_hero_trip_1779327145138.png';
import tirupatiImg from './src/assets/images/tirupati_temple_spiritual_view_1779184908359.png';
import palaniImg from './src/assets/images/palani_temple_hill_top_1779184925874.png';
import panchabhootaImg from './src/assets/images/chambaram_nataraja_temple_panchabhoota_1779184943005.png';

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
    id: 'maruti-wagonr',
    name: 'Maruti WagonR',
    type: 'Mini',
    capacity: 4,
    pricePerKm: 14,
    image: wagonRImg,
    features: ['Compact & Agile', 'City Friendly', 'Economical', 'Clean Interior'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 1550 },
        { duration: '8 Hours', kms: '80 Kms', price: 2300 },
        { duration: '10 Hours', kms: '100 Kms', price: 2800 },
        { duration: '12 Hours', kms: '120 Kms', price: 3400 },
        { duration: '15 Hours', kms: '150 Kms', price: 4200 }
      ],
      outstation: { roundTrip: 14, oneWay: 15, driverBatta: 400 }
    }
  },
  {
    id: 'swift-dzire',
    name: 'Swift Dzire',
    type: 'Sedan',
    capacity: 4,
    pricePerKm: 14,
    image: swiftDzireImg,
    features: ['Luxury AC', 'Music System', 'Punctual Service', 'Clean Interior'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 1550 },
        { duration: '8 Hours', kms: '80 Kms', price: 2300 },
        { duration: '10 Hours', kms: '100 Kms', price: 2800 },
        { duration: '12 Hours', kms: '120 Kms', price: 3400 },
        { duration: '15 Hours', kms: '150 Kms', price: 4200 }
      ],
      outstation: { roundTrip: 14, oneWay: 15, driverBatta: 500 }
    }
  },
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    type: 'Sedan',
    capacity: 4,
    pricePerKm: 15,
    image: etiosImg,
    features: ['Spacious Cabin', 'Smooth Ride', 'Large Boot Space', 'Comfortable Seats'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 1600 },
        { duration: '8 Hours', kms: '80 Kms', price: 2400 },
        { duration: '10 Hours', kms: '100 Kms', price: 2900 },
        { duration: '12 Hours', kms: '120 Kms', price: 3500 },
        { duration: '15 Hours', kms: '150 Kms', price: 4400 }
      ],
      outstation: { roundTrip: 15, oneWay: 16, driverBatta: 500 }
    }
  },
  {
    id: 'ertiga-xylo',
    name: 'Ertiga / Xylo / Similar',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 18,
    image: ertigaImg,
    features: ['High Ground Clearance', 'Ample Leg Space', 'Premium Comfort', 'Dual AC'],
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
    id: 'toyota-innova',
    name: 'Toyota Innova',
    type: 'SUV',
    capacity: 7,
    pricePerKm: 20,
    image: innovaImg,
    features: ['Premium Cabin', 'Great Suspension', 'Highway Cruiser', 'Family Friendly'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2200 },
        { duration: '8 Hours', kms: '80 Kms', price: 3400 },
        { duration: '10 Hours', kms: '100 Kms', price: 4000 },
        { duration: '12 Hours', kms: '120 Kms', price: 4700 },
        { duration: '15 Hours', kms: '150 Kms', price: 5800 }
      ],
      outstation: { roundTrip: 20, oneWay: 20, driverBatta: 600 }
    }
  },
  {
    id: 'innova-crysta',
    name: 'Innova Crysta',
    type: 'Luxury SUV',
    capacity: 7,
    pricePerKm: 22,
    image: crystaImg,
    features: ['Elite Comfort', 'Superior Safety', 'Recliner Seats', 'VIP Travel'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 2500 },
        { duration: '10 Hours', kms: '100 Kms', price: 5000 },
        { duration: '15 Hours', kms: '150 Kms', price: 7500 }
      ],
      outstation: { roundTrip: 22, oneWay: "Not Available", driverBatta: 700 }
    }
  },
  {
    id: 'tempo-traveller',
    name: 'Tempo Traveller',
    type: 'Van',
    capacity: 12,
    pricePerKm: 26,
    image: tempoTravellerImg,
    features: ['Large Group Travel', 'High Roof', 'Entertainment System', 'Carrier'],
    pricing: {
      localPackages: [
        { duration: '5 Hours', kms: '50 Kms', price: 3500 },
        { duration: '10 Hours', kms: '100 Kms', price: 7000 },
        { duration: '15 Hours', kms: '150 Kms', price: 10500 }
      ],
      outstation: { roundTrip: 26, oneWay: "Not Available", driverBatta: 800 }
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

export const DEFAULT_DESTINATION_IMAGE = chennaiImg;

export const DESTINATION_IMAGES: Record<string, string> = {
  pondicherry: pondicherryImg,
  velankanni: velankanniImg,
  tiruvannamalai: tiruvannamalaiImg,
  mahabalipuram: mahabalipuramImg,
  kanchipuram: kanchipuramImg,
  yercaud: yercaudImg,
  hogenakkal: hogenakkalImg,
  chennai: chennaiImg,
  ooty: ootyImg,
  kodaikanal: kodaikanalImg,
  rameswaram: rameswaramImg,
  madurai: maduraiImg,
  kanyakumari: kanyakumariImg,
  luxuryHero: luxuryHeroImg,
  arupadaiveedu: palaniImg,
  panchabhoota: panchabhootaImg,
  tirupati: tirupatiImg,
};

export const POPULAR_ROUTES: Route[] = [
  { from: 'Chennai', to: 'Madurai', distance: '460 KM', duration: '8 Hours', price: 5999 },
  { from: 'Chennai', to: 'Pondicherry', distance: '165 KM', duration: '3.5 Hours', price: 2499 },
  { from: 'Chennai', to: 'Trichy', distance: '330 KM', duration: '6 Hours', price: 4499 },
  { from: 'Chennai', to: 'Coimbatore', distance: '510 KM', duration: '9 Hours', price: 6999 },
  { from: 'Chennai', to: 'Velankanni', distance: '315 KM', duration: '7 Hours', price: 4299 },
  { from: 'Chennai', to: 'Salem', distance: '350 KM', duration: '6.5 Hours', price: 4699 }
];