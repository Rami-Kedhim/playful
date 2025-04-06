
import { ReviewStats } from "./types";
import { mockReviews } from "./mockData";
import { supabase } from "@/integrations/supabase/client";

/**
 * Service for calculating statistics related to reviews
 */
export const reviewStatsService = {
  /**
   * Get average rating for a creator
   */
  async getAverageRating(creatorId: string): Promise<ReviewStats> {
    try {
      // For demo purposes, calculate from mock data
      const creatorReviews = mockReviews.filter(review => review.creator_id === creatorId);
      const totalReviews = creatorReviews.length;
      
      if (totalReviews === 0) {
        return { averageRating: 0, totalReviews: 0 };
      }
      
      const sum = creatorReviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = sum / totalReviews;
      
      return { averageRating, totalReviews };
      
      // In a real implementation with Supabase:
      /*
      const { data, error } = await supabase
        .from('creator_reviews')
        .select('rating')
        .eq('creator_id', creatorId);
      
      if (error) {
        console.error('Error fetching ratings:', error);
        throw error;
      }
      
      const totalReviews = data.length;
      
      if (totalReviews === 0) {
        return { averageRating: 0, totalReviews: 0 };
      }
      
      const sum = data.reduce((acc, { rating }) => acc + rating, 0);
      const averageRating = sum / totalReviews;
      
      return { averageRating, totalReviews };
      */
    } catch (error) {
      console.error('Error in getAverageRating:', error);
      throw error;
    }
  }
};
