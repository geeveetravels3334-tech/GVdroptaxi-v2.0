
import { collection, doc, getDocs, setDoc, updateDoc, query, orderBy, deleteDoc, getDoc } from 'firebase/firestore';
import { db, auth } from './firebase.ts';
import { ExtendedVehicle } from '../constants.tsx';
import { DETAILED_VEHICLES } from '../constants.tsx';

const COLLECTION_NAME = 'vehicles';
const SETTINGS_COLLECTION = 'settings';
const PRICING_SETTINGS_DOC = 'pricing_config';
const PACKAGES_COLLECTION = 'packages';

export interface ExtraCharges {
  additionalKm: { sedan: number; suv: number };
  extraHours: { sedan: number; suv: number };
  hillCharges: { ooty: number; kodai: number };
  tollPolicy: string;
}

export interface PackagePrice {
  id: string;
  price: number;
}

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

const DEFAULT_EXTRA_CHARGES: ExtraCharges = {
  additionalKm: { sedan: 25, suv: 35 },
  extraHours: { sedan: 250, suv: 350 },
  hillCharges: { ooty: 500, kodai: 1000 },
  tollPolicy: 'All tolls and parking fees are calculated as per actuals and receipts will be provided.'
};

const DEFAULT_PACKAGE_PRICES: PackagePrice[] = [
  { id: 'ooty', price: 8499 },
  { id: 'kodaikanal', price: 7999 },
  { id: 'rameswaram', price: 8500 },
  { id: 'madurai', price: 3500 },
  { id: 'kanyakumari', price: 9000 },
  { id: 'yercaud', price: 6500 }
];

export const PricingService = {
  /**
   * Fetches all vehicles with pricing from Firestore.
   */
  async getVehicles(): Promise<ExtendedVehicle[]> {
    try {
      const q = query(collection(db, COLLECTION_NAME), orderBy('id'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        if (auth.currentUser) {
          console.log('No vehicles found in Firestore, seeding defaults...');
          await this.seedDefaults().catch(e => console.warn('Seeding failed:', e));
          const freshSnapshot = await getDocs(q);
          if (!freshSnapshot.empty) {
            return freshSnapshot.docs.map(doc => doc.data() as ExtendedVehicle);
          }
        }
        return DETAILED_VEHICLES;
      }
      
      let vehicles = snapshot.docs.map(doc => doc.data() as ExtendedVehicle);
      
      // One-time migration to ensure the new 7 vehicle categories are seeded
      const needsMigration = vehicles.some(v => v.pricing?.localPackages?.length < 3 && v.id !== 'maruti-wagonr') || vehicles.length === 0;
      if (needsMigration) {
        if (auth.currentUser) {
          console.log('Migrating vehicles to new tariff structure...');
          await this.seedDefaults().catch(e => console.warn('Seeding failed:', e));
          const freshSnapshot = await getDocs(q);
          if (!freshSnapshot.empty) {
            vehicles = freshSnapshot.docs.map(doc => doc.data() as ExtendedVehicle);
          }
        } else {
          // If not logged in, just show the updated local constants
          return DETAILED_VEHICLES;
        }
      }
      
      // Ensure latest local images override whatever string was saved in Firestore
      vehicles = vehicles.map(v => {
        const localDef = DETAILED_VEHICLES.find(d => d.id === v.id);
        if (localDef) {
          v.image = localDef.image;
        }
        return v;
      });

      return vehicles;
    } catch (error: any) {
      if (error?.message?.includes('offline') || error?.code === 'unavailable') {
        console.warn('Firestore is offline or unavailable. Using default vehicles.');
      } else {
        console.warn('Error fetching vehicles, using defaults:', error);
      }
      return DETAILED_VEHICLES; // Standard fallback without throwing
    }
  },

  /**
   * Fetches package prices.
   */
  async getPackagePrices(): Promise<PackagePrice[]> {
    try {
      const q = query(collection(db, PACKAGES_COLLECTION));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        if (auth.currentUser) {
          console.log('Seeding default package prices...');
          for (const pkg of DEFAULT_PACKAGE_PRICES) {
            await this.updatePackagePrice(pkg.id, pkg.price).catch(() => {});
          }
          const freshSnapshot = await getDocs(q);
          if (!freshSnapshot.empty) {
             return freshSnapshot.docs.map(doc => doc.data() as PackagePrice);
          }
        }
        return DEFAULT_PACKAGE_PRICES;
      }
      
      return snapshot.docs.map(doc => doc.data() as PackagePrice);
    } catch (error: any) {
      if (error?.message?.includes('offline') || error?.code === 'unavailable') {
        console.warn('Firestore is offline or unavailable. Using default package prices.');
      } else {
        console.warn('Error fetching package prices, using defaults:', error);
      }
      return DEFAULT_PACKAGE_PRICES; // Standard fallback
    }
  },

  /**
   * Updates a package price.
   */
  async updatePackagePrice(id: string, price: number): Promise<void> {
    const path = `${PACKAGES_COLLECTION}/${id}`;
    try {
      await setDoc(doc(db, PACKAGES_COLLECTION, id), { id, price });
    } catch (error) {
      if (error instanceof Error && error.message.includes('permission')) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
      throw error;
    }
  },

  /**
   * Fetches global pricing settings.
   */
  async getExtraCharges(): Promise<ExtraCharges> {
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, PRICING_SETTINGS_DOC);
      const snapshot = await getDoc(docRef);
      
      if (!snapshot.exists()) {
        if (auth.currentUser) {
          await this.updateExtraCharges(DEFAULT_EXTRA_CHARGES).catch(() => {});
          const freshSnapshot = await getDoc(docRef);
          if (freshSnapshot.exists()) {
            return freshSnapshot.data() as ExtraCharges;
          }
        }
        return DEFAULT_EXTRA_CHARGES;
      }
      
      return snapshot.data() as ExtraCharges;
    } catch (error: any) {
      if (error?.message?.includes('offline') || error?.code === 'unavailable') {
        console.warn('Firestore is offline or unavailable. Using default extra charges.');
      } else {
        console.warn('Could not fetch extra charges from Firestore. Using default.', error);
      }
      return DEFAULT_EXTRA_CHARGES; // Standard fallback
    }
  },

  /**
   * Updates global pricing settings.
   */
  async updateExtraCharges(charges: ExtraCharges): Promise<void> {
    const path = `${SETTINGS_COLLECTION}/${PRICING_SETTINGS_DOC}`;
    try {
      const docRef = doc(db, SETTINGS_COLLECTION, PRICING_SETTINGS_DOC);
      await setDoc(docRef, charges);
    } catch (error) {
      if (error instanceof Error && error.message.includes('permission')) {
        handleFirestoreError(error, OperationType.WRITE, path);
      }
      throw error;
    }
  },

  /**
   * Seeds the default vehicle data into Firestore.
   */
  async seedDefaults() {
    try {
      // Cleanup obsolete vehicle references first
      const q = query(collection(db, COLLECTION_NAME));
      const snapshot = await getDocs(q);
      const validIds = DETAILED_VEHICLES.map(v => v.id);
      
      for (const docSnapshot of snapshot.docs) {
        if (!validIds.includes(docSnapshot.id)) {
          await deleteDoc(doc(db, COLLECTION_NAME, docSnapshot.id));
        }
      }

      // Seed the latest vehicles
      for (const vehicle of DETAILED_VEHICLES) {
        await setDoc(doc(db, COLLECTION_NAME, vehicle.id), vehicle);
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('permission')) {
        handleFirestoreError(error, OperationType.WRITE, COLLECTION_NAME);
      }
      throw error;
    }
  },

  /**
   * Updates pricing details for a specific vehicle.
   */
  async updatePricing(vehicleId: string, pricing: ExtendedVehicle['pricing']): Promise<void> {
    const path = `${COLLECTION_NAME}/${vehicleId}`;
    try {
      const vehicleRef = doc(db, COLLECTION_NAME, vehicleId);
      await updateDoc(vehicleRef, {
        pricing: pricing,
        pricePerKm: pricing.outstation.roundTrip // Sync pricePerKm for legacy usage
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, path);
    }
  }
};
