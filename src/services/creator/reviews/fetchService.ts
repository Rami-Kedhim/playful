
import { supabase } from "@/integrations/supabase/client";
import { CreatorReview, PaginatedReviewsResponse } from "./types";
import { mockReviews } from "./mockData";

/**
 * Service for fetching creator reviews
 */
export const reviewFetchService = {
  /**
   * Fetch reviews for a specific creator
   */
  async getCreatorReviews(creatorId: string, limit: number = 10, offset: number = 0): Promise<CreatorReview[]> {
    try {
      // For demo purposes, return mock data
      return mockReviews.filter(review => review.creator_id === creatorId).slice(offset, offset + limit);
      
      // In a real implementation with Supabase:
      /*
      const { data, error } = await supabase
        .from('creator_reviews')
        .select(`
          *,
          reviewer:reviewer_id(id, username, avatar_url)
        `)
        .eq('creator_id', creatorId)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);
      
      if (error) {
        console.error('Error fetching creator reviews:', error);
        throw error;
      }
      
      return data as CreatorReview[];
      */
    } catch (error) {
      console.error('Error in getCreatorReviews:', error);
      throw error;
    }
  },
  
  /**
   * Fetch reviews for a specific creator with pagination and formatting
   */
  async fetchCreatorReviews(creatorId: string, page: number = 1, limit: number = 10): Promise<PaginatedReviewsResponse> {
    try {
      const offset = (page - 1) * limit;
      const reviews = await this.getCreatorReviews(creatorId, limit, offset);
      
      // In a real implementation, we would get the total count from the database
      const total = mockReviews.filter(review => review.creator_id === creatorId).length;
      
      return {
        data: reviews,
        total
      };
    } catch (error) {
      console.error('Error in fetchCreatorReviews:', error);
      throw error;
    }
  }
};
