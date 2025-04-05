
import { supabase } from "@/integrations/supabase/client";

// Review type definition
export interface CreatorReview {
  id: string;
  reviewer_id: string;
  creator_id: string;
  rating: number;
  comment?: string;
  created_at: Date | string;
  reviewer?: {
    id: string;
    username: string;
    avatar_url?: string;
  };
}

/**
 * Service for managing creator reviews
 */
export const creatorReviewsService = {
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
  },
  
  /**
   * Get average rating for a creator
   */
  async getAverageRating(creatorId: string): Promise<{ averageRating: number; totalReviews: number }> {
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

// Mock data for demo purposes
const mockReviews: CreatorReview[] = [
  {
    id: 'review1',
    reviewer_id: 'user1',
    creator_id: 'creator1',
    rating: 5,
    comment: 'Amazing experience! Love the content.',
    created_at: '2023-10-15T12:00:00Z',
    reviewer: {
      id: 'user1',
      username: 'JohnDoe',
      avatar_url: 'https://i.pravatar.cc/150?u=user1'
    }
  },
  {
    id: 'review2',
    reviewer_id: 'user2',
    creator_id: 'creator1',
    rating: 4,
    comment: 'Great content but could use more frequent updates.',
    created_at: '2023-10-10T14:30:00Z',
    reviewer: {
      id: 'user2',
      username: 'JaneSmith',
      avatar_url: 'https://i.pravatar.cc/150?u=user2'
    }
  },
  {
    id: 'review3',
    reviewer_id: 'user3',
    creator_id: 'creator2',
    rating: 5,
    comment: 'Best creator I've subscribed to!',
    created_at: '2023-10-05T09:20:00Z',
    reviewer: {
      id: 'user3',
      username: 'BobJones',
      avatar_url: 'https://i.pravatar.cc/150?u=user3'
    }
  },
];

export default creatorReviewsService;
