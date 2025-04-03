
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CreatorReview } from "@/types/creator";

/**
 * Fetch reviews for a creator
 */
export const fetchCreatorReviews = async (
  creatorId: string,
  page = 1,
  pageSize = 10
): Promise<{ data: CreatorReview[], totalCount: number }> => {
  try {
    // Calculate pagination range
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    // Fetch reviews from database
    const { data, error, count } = await supabase
      .from('creator_reviews')
      .select(`
        id,
        creator_id,
        reviewer_id,
        rating,
        comment,
        created_at,
        profiles!reviewer_id (
          id,
          username,
          avatar_url
        )
      `, { count: 'exact' })
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error("Error fetching creator reviews:", error);
      throw error;
    }
    
    // Transform the data to match our interface
    const formattedReviews = data?.map(review => ({
      id: review.id,
      creator_id: review.creator_id,
      reviewer_id: review.reviewer_id,
      reviewer: {
        id: review.profiles.id,
        username: review.profiles.username || `user${review.reviewer_id.substring(0, 4)}`,
        avatar_url: review.profiles.avatar_url || `https://avatars.dicebear.com/api/avataaars/${review.reviewer_id}.svg`
      },
      rating: review.rating,
      comment: review.comment,
      created_at: review.created_at
    })) || [];
    
    // If no reviews found, return mock data for the demo
    if (!data || data.length === 0) {
      const mockReviews: CreatorReview[] = Array(5).fill(null).map((_, i) => ({
        id: `review-${i}`,
        creator_id: creatorId,
        reviewer_id: `user-${i + 100}`,
        reviewer: {
          id: `user-${i + 100}`,
          username: `user${i + 100}`,
          avatar_url: `https://avatars.dicebear.com/api/avataaars/${i + 100}.svg`,
        },
        rating: Math.ceil(Math.random() * 5),
        comment: Math.random() > 0.2 
          ? `This is review number ${i + 1}. The creator is ${['amazing', 'great', 'good', 'fantastic', 'wonderful'][Math.floor(Math.random() * 5)]}.` 
          : null,
        created_at: new Date(Date.now() - i * 86400000 * 2).toISOString(),
      }));
      
      return {
        data: mockReviews,
        totalCount: mockReviews.length
      };
    }
    
    return {
      data: formattedReviews as CreatorReview[],
      totalCount: count || 0
    };
  } catch (error) {
    console.error("Error fetching creator reviews:", error);
    return { data: [], totalCount: 0 };
  }
};

/**
 * Add a review for a creator
 */
export const addCreatorReview = async (
  creatorId: string,
  reviewerId: string,
  rating: number,
  comment?: string
): Promise<{ success: boolean, data?: CreatorReview, error?: string }> => {
  try {
    // Add the review to the database
    const { data, error } = await supabase
      .from('creator_reviews')
      .insert([{
        creator_id: creatorId,
        reviewer_id: reviewerId,
        rating,
        comment: comment || null
      }])
      .select(`
        id,
        creator_id,
        reviewer_id,
        rating,
        comment,
        created_at,
        profiles!reviewer_id (
          id,
          username,
          avatar_url
        )
      `)
      .single();
    
    if (error) {
      // Check if it's a duplicate review error
      if (error.code === '23505') {
        throw new Error("You have already reviewed this creator. Edit your existing review instead.");
      }
      throw error;
    }
    
    // Transform the data to match our interface
    const reviewData: CreatorReview = {
      id: data.id,
      creator_id: data.creator_id,
      reviewer_id: data.reviewer_id,
      reviewer: {
        id: data.profiles.id,
        username: data.profiles.username || `user${data.reviewer_id.substring(0, 4)}`,
        avatar_url: data.profiles.avatar_url || `https://avatars.dicebear.com/api/avataaars/${data.reviewer_id}.svg`
      },
      rating: data.rating,
      comment: data.comment,
      created_at: data.created_at
    };
    
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully",
    });
    
    return {
      success: true,
      data: reviewData
    };
  } catch (error: any) {
    console.error("Error adding review:", error);
    
    toast({
      title: "Error submitting review",
      description: error.message || "Failed to submit review",
      variant: "destructive",
    });
    
    return {
      success: false,
      error: error.message || "Failed to submit review"
    };
  }
};
