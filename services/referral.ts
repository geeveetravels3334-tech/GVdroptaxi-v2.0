
import { getSupabase } from './supabase.ts';
import { CustomerService } from './customer.ts';

export const ReferralService = {
  validateCode: async (code: string, currentUserId?: string, currentUserMobile?: string) => {
    if (!code) return { valid: false, message: 'Enter a code' };
    
    // First verify it's not a promo
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'FIRST10') {
        return { valid: true, discount: 0, message: 'Promo applied' }; 
    }

    // Now query the DB
    try {
        const supabase = getSupabase();
        const { data: customer, error } = await supabase.from('customers').select('*').eq('referral_code', cleanCode).single();
        if (error || !customer) {
            return { valid: false, message: 'Invalid referral code' };
        }
        
        // Cannot refer yourself
        if (currentUserMobile && customer.mobile === currentUserMobile) {
            return { valid: false, message: 'Cannot use your own code' };
        }

        return { valid: true, referrerId: customer.mobile, referrerName: customer.name, discount: 0 }; // Discount can be 0 here since points are given instead, OR we can give them ₹100 flat discount for using a referral code
    } catch {
       return { valid: false, message: 'Network error validating code' };
    }
  },

  creditReferrer: async (code: string, amount: number = 0) => {
      // not used if we hand it in CreateCustomer directly
      return true;
  },

  redeemPoints: async (mobile: string, pointsToRedeem: number) => {
      return await CustomerService.redeemPoints(mobile, pointsToRedeem);
  },

  addCashback: async (userId: string, amount: number) => {
      return;
  }
};
