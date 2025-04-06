
import { supabase } from "@/integrations/supabase/client";
import { CreatorReview } from "./types";
import { mockReviews } from "./mockData";

/**
 * Service for managing creator reviews mutations (add, update, delete)
 */
export const reviewMutationService = {
  /**
   * Add a new review for a creator
   */
  async addReview(review: Omit<CreatorReview, 'id' | 'created_at' | 'reviewer'>): Promise<CreatorReview> {
    try {
      // For demo purposes, create a mock review
      const mockReviewer = {
        id: review.reviewer_id,
        username: `user_${Math.floor(Math.random() * 1000)}`,
        avatar_url: `https://i.pravatar.cc/150?u=${review.reviewer_id}`
      };
      
      const newReview: CreatorReview = {
        id: `review_${Date.now()}`,
        ...review,
        created_at: new Date(),
        reviewer: mockReviewer
      };
      
      // In a real implementation with Supabase:
      /*
      const { data, error } = await supabase
        .from('creator_reviews')
        .insert([{
          reviewer_id: review.reviewer_id,
          creator_id: review.creator_id,
          rating: review.rating,
          comment: review.comment
        }])
        .select(`
          *,
          reviewer:reviewer_id(id, username, avatar_url)
        `)
        .single();
      
      if (error) {
        console.error('Error adding creator review:', error);
        throw error;
      }
      
      return data as CreatorReview;
      */
      
      return newReview;
    } catch (error) {
      console.error('Error in addReview:', error);
      throw error;
    }
  },
  
  /**
   * Update an existing review
   */
  async updateReview(reviewId: string, updates: Partial<Pick<CreatorReview, 'rating' | 'comment'>>): Promise<CreatorReview> {
    try {
      // For demo purposes, update mock review
      const reviewIndex = mockReviews.findIndex(r => r.id === reviewId);
      if (reviewIndex === -1) {
        throw new Error('Review not found');
      }
      
      const updatedReview = {
        ...mockReviews[reviewIndex],
        ...updates
      };
      
      // In a real implementation with Supabase:
      /*
      const { data, error } = await supabase
        .from('creator_reviews')
        .update({
          rating: updates.rating,
          comment: updates.comment
        })
        .eq('id', reviewId)
        .select(`
          *,
          reviewer:reviewer_id(id, username, avatar_url)
        `)
        .single();
      
      if (error) {
        console.error('Error updating creator review:', error);
        throw error;
      }
      
      return data as CreatorReview;
      */
      
      return updatedReview;
    } catch (error) {
      console.error('Error in updateReview:', error);
      throw error;
    }
  },
  
  /**
   * Delete a review
   */
  async deleteReview(reviewId: string): Promise<void> {
    try {
      // In a real implementation with Supabase:
      /*
      const { error } = await supabase
        .from('creator_reviews')
        .delete()
        .eq('id', reviewId);
      
      if (error) {
        console.error('Error deleting creator review:', error);
        throw error;
      }
      */
      
      // For demo purposes, just log the deletion
      console.log(`Review ${reviewId} would be deleted`);
    } catch (error) {
      console.error('Error in deleteReview:', error);
      throw error;
    }
  }
};
