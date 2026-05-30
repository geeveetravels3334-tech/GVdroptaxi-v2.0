import { getSupabase } from './supabase.ts';

const isBrowser = typeof window !== 'undefined';

export interface CustomerData {
  mobile: string;
  name: string;
  email: string;
  referral_code: string;
  referred_by?: string;
  total_points: number;
  redeemed_points: number;
  loyalty_tier: 'Silver' | 'Gold' | 'Platinum';
  created_at: string;
}

export interface ReferralData {
  id: string;
  referrer_mobile: string;
  referred_mobile: string;
  points_awarded: number;
  status: 'pending' | 'completed';
  created_at: string;
}

const generateReferralCode = () => {
    return 'GVR' + Math.random().toString(36).substring(2, 7).toUpperCase();
};

export const CustomerService = {
  getCustomer: async (mobile: string): Promise<CustomerData | null> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('mobile', mobile)
        .single();
        
      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching customer:', error);
      }
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  },

  createCustomer: async (customer: Partial<CustomerData>): Promise<CustomerData | null> => {
    try {
      const supabase = getSupabase();
      
      const newCustomer = {
         ...customer,
         referral_code: generateReferralCode(),
         total_points: 0,
         redeemed_points: 0,
         loyalty_tier: 'Silver',
      };
      
      if (customer.referred_by) {
         // Also add to referrals table
         const { error: refError } = await supabase.from('referrals').insert({
             referrer_mobile: customer.referred_by,
             referred_mobile: customer.mobile,
             points_awarded: 100, // First referral bonus
             status: 'completed'
         });
         
         if (!refError) {
             // add points to referrer
             const referrer = await CustomerService.getCustomer(customer.referred_by);
             if (referrer) {
                  await supabase.from('customers')
                    .update({ total_points: (referrer.total_points || 0) + 100 })
                    .eq('mobile', referrer.mobile);
             }
         }
      }

      const { data, error } = await supabase
        .from('customers')
        .upsert([newCustomer])
        .select()
        .single();
        
      if (error) {
        console.error('Error creating customer:', error);
        return null;
      }
      return data;
    } catch (err) {
       console.error(err);
       return null;
    }
  },

  getAllReferralsForUser: async (mobile: string): Promise<ReferralData[]> => {
      try {
          const supabase = getSupabase();
          const { data, error } = await supabase
             .from('referrals')
             .select('*')
             .eq('referrer_mobile', mobile)
             .order('created_at', { ascending: false });
          
          if (error) {
             console.error('Error fetching referrals:', error);
             return [];
          }
          return data || [];
      } catch (err) {
          console.error(err);
          return [];
      }
  },
  
  updateLoyaltyTier: async (mobile: string, totalTrips: number): Promise<void> => {
      let tier = 'Silver';
      if (totalTrips >= 15) tier = 'Platinum';
      else if (totalTrips >= 5) tier = 'Gold';
      
      const supabase = getSupabase();
      await supabase.from('customers').update({ loyalty_tier: tier }).eq('mobile', mobile);
  },
  
  redeemPoints: async (mobile: string, pointsToRedeem: number): Promise<boolean> => {
      try {
          const supabase = getSupabase();
          const customer = await CustomerService.getCustomer(mobile);
          if (!customer) return false;
          const available = (customer.total_points || 0) - (customer.redeemed_points || 0);
          
          if (available >= pointsToRedeem) {
              await supabase.from('customers')
                .update({ redeemed_points: (customer.redeemed_points || 0) + pointsToRedeem })
                .eq('mobile', mobile);
              return true;
          }
          return false;
      } catch (err) {
          return false;
      }
  },
  
  getAdminStats: async () => {
       const supabase = getSupabase();
       const { data: refs } = await supabase.from('referrals').select('*');
       const { data: custs } = await supabase.from('customers').select('*');
       
       return {
           totalReferrals: refs?.length || 0,
           totalPointsIssued: custs?.reduce((acc, curr) => acc + (curr.total_points||0), 0) || 0,
           topReferrers: custs?.filter((c: any) => c.total_points > 0).sort((a:any, b:any) => b.total_points - a.total_points).slice(0, 5) || [],
           tiers: {
               silver: custs?.filter((c:any) => c.loyalty_tier === 'Silver').length || 0,
               gold: custs?.filter((c:any) => c.loyalty_tier === 'Gold').length || 0,
               platinum: custs?.filter((c:any) => c.loyalty_tier === 'Platinum').length || 0
           }
       };
  }
};
