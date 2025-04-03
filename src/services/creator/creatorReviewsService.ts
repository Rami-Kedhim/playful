
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
    // This would fetch actual data from the database in production
    
    // Generate mock review data
    const mockReviews: CreatorReview[] = Array(15).fill(null).map((_, i) => ({
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
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedData = mockReviews.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      totalCount: mockReviews.length
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
    // This would save to the database in production
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReview: CreatorReview = {
      id: `review-${Date.now()}`,
      creator_id: creatorId,
      reviewer_id: reviewerId,
      reviewer: {
        id: reviewerId,
        username: `user${reviewerId.substring(5)}`,
        avatar_url: `https://avatars.dicebear.com/api/avataaars/${reviewerId}.svg`,
      },
      rating,
      comment: comment || null,
      created_at: new Date().toISOString(),
    };
    
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully",
    });
    
    return {
      success: true,
      data: newReview
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
