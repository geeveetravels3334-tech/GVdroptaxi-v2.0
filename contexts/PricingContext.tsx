
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ExtendedVehicle, DETAILED_VEHICLES } from '../constants.tsx';
import { PricingService, ExtraCharges, PackagePrice } from '../services/pricing.ts';

interface PricingContextType {
  vehicles: ExtendedVehicle[];
  extraCharges: ExtraCharges | null;
  packagePrices: PackagePrice[];
  loading: boolean;
  refreshVehicles: () => Promise<void>;
  updateVehiclePricing: (id: string, pricing: ExtendedVehicle['pricing']) => Promise<void>;
  updateGlobalCharges: (charges: ExtraCharges) => Promise<void>;
  updatePkgPrice: (id: string, price: number) => Promise<void>;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<ExtendedVehicle[]>(DETAILED_VEHICLES);
  const [extraCharges, setExtraCharges] = useState<ExtraCharges | null>(null);
  const [packagePrices, setPackagePrices] = useState<PackagePrice[]>([]);
  const [loading, setLoading] = useState(false); // start as false so we don't block render

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [vehiclesData, chargesData, pkgPricesData] = await Promise.all([
        PricingService.getVehicles(),
        PricingService.getExtraCharges(),
        PricingService.getPackagePrices()
      ]);
      setVehicles(vehiclesData);
      setExtraCharges(chargesData);
      setPackagePrices(pkgPricesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateVehiclePricing = async (id: string, pricing: ExtendedVehicle['pricing']) => {
    await PricingService.updatePricing(id, pricing);
    setVehicles(prev => prev.map(v => v.id === id ? { ...v, pricing } : v));
  };

  const updateGlobalCharges = async (charges: ExtraCharges) => {
    await PricingService.updateExtraCharges(charges);
    setExtraCharges(charges);
  };

  const updatePkgPrice = async (id: string, price: number) => {
    await PricingService.updatePackagePrice(id, price);
    setPackagePrices(prev => prev.map(p => p.id === id ? { ...p, price } : p));
  };

  return (
    <PricingContext.Provider value={{ 
      vehicles, 
      extraCharges,
      packagePrices,
      loading, 
      refreshVehicles: fetchData,
      updateVehiclePricing,
      updateGlobalCharges,
      updatePkgPrice
    }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};
