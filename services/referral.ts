
export const ReferralService = {
  validateCode: async (code: string, currentUserId?: string) => {
    if (!code) return { valid: false, message: 'Enter a code' };
    
    // Mock validation since Firestore is disabled
    // Accepts 'FIRST10' or anything starting with 'GVDROP'
    const cleanCode = code.toUpperCase().trim();
    
    if (cleanCode === 'FIRST10') {
        return { valid: true, discount: 0, message: 'Promo applied' }; // Promo handled in component
    }

    if (cleanCode.startsWith('GVDROP')) {
        return { valid: true, referrerId: 'mock-user', referrerName: 'Referrer', discount: 399 };
    }

    return { valid: false, message: 'Invalid referral code' };
  },

  creditReferrer: async (code: string, amount: number = 399) => {
    // Mock logic - no database to update
    console.log(`Crediting referrer ${code} with ₹${amount}`);
    return true;
  },

  addCashback: async (userId: string, amount: number) => {
    // Mock logic
    console.log(`Adding cashback ₹${amount} to user ${userId}`);
  }
};
