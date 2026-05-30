import { getSupabase } from './supabase.ts';

export interface Review {
  id: string;
  booking_id: string;
  customer_mobile: string;
  customer_name: string;
  rating: number;
  title: string;
  comment: string;
  route: string;
  status: 'pending' | 'approved' | 'rejected';
  is_featured: boolean;
  created_at: string;
}

export const ReviewService = {
  submitReview: async (review: Partial<Review>) => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .insert([{ ...review, status: 'pending' }])
        .select()
        .single();
        
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.error('Error submitting review:', err);
      return { success: false, error: err };
    }
  },

  getCustomerReviews: async (mobile: string): Promise<Review[]> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('customer_mobile', mobile)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching customer reviews:', err);
      return [];
    }
  },

  getApprovedReviews: async (): Promise<Review[]> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching approved reviews:', err);
      return [];
    }
  },

  getFeaturedReviews: async (): Promise<Review[]> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('status', 'approved')
        .eq('is_featured', true)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching featured reviews:', err);
      return [];
    }
  },

  // Admin Level Methods
  getAllReviewsForAdmin: async (): Promise<Review[]> => {
    try {
      const supabase = getSupabase();
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      return data || [];
    } catch (err) {
      console.error('Error fetching reviews for admin:', err);
      return [];
    }
  },

  updateReviewStatus: async (id: string, status: 'approved' | 'rejected', isFeatured?: boolean) => {
    try {
      const supabase = getSupabase();
      const updateData: any = { status };
      if (typeof isFeatured === 'boolean') updateData.is_featured = isFeatured;
      
      const { error } = await supabase
        .from('reviews')
        .update(updateData)
        .eq('id', id);
        
      if (error) throw error;
      return { success: true };
    } catch (err) {
      console.error('Error updating review status:', err);
      return { success: false, error: err };
    }
  },

  getTrustMetrics: async () => {
    try {
        const supabase = getSupabase();
        // Get all completed bookings count
        const { count: totalTrips } = await supabase
            .from('bookings')
            .select('*', { count: 'exact', head: true })
            .eq('status', 'completed');

        // Get approved reviews metrics
        const { data: reviews } = await supabase
            .from('reviews')
            .select('rating')
            .eq('status', 'approved');

        const avgRating = reviews && reviews.length > 0 
            ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length 
            : 4.8; // Default fallback

        return {
            totalTrips: totalTrips || 1200,
            avgRating: parseFloat(avgRating.toFixed(1)),
            verifiedReviewsCount: reviews?.length || 0,
            happyCustomers: (totalTrips || 1200) + (reviews?.length || 0)
        };
    } catch (err) {
        return { totalTrips: 1200, avgRating: 4.8, verifiedReviewsCount: 0, happyCustomers: 1200 };
    }
  }
};
