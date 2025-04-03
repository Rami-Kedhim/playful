
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CreatorReview } from "@/types/creator";

/**
 * Fetch reviews for a creator
 */
export const fetchCreatorReviews = async (creatorId: string): Promise<CreatorReview[]> => {
  try {
    // Generate mock review data for demonstration
    const mockReviews: CreatorReview[] = Array.from({ length: 8 }, (_, i) => ({
      id: `review-${i}`,
      creator_id: creatorId,
      reviewer_id: `user-${i}`,
      reviewer: {
        id: `user-${i}`,
        username: `user${i}`,
        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
      },
      rating: Math.floor(Math.random() * 3) + 3, // 3-5 stars
      comment: i % 2 === 0 ? `This is a great creator! Review ${i}` : null,
      created_at: new Date(Date.now() - i * 86400000 * 3).toISOString()
    }));
    
    return mockReviews;
  } catch (error: any) {
    console.error("Error fetching creator reviews:", error);
    toast({
      title: "Failed to fetch reviews",
      description: error.message,
      variant: "destructive",
    });
    return [];
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
): Promise<CreatorReview | null> => {
  try {
    // For now, return a mock success response
    
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully",
      variant: "default",
    });
    
    const mockReview: CreatorReview = {
      id: `review-${Date.now()}`,
      creator_id: creatorId,
      reviewer_id: reviewerId,
      reviewer: {
        id: reviewerId,
        username: "current_user",
        avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=currentuser"
      },
      rating: rating,
      comment: comment || null,
      created_at: new Date().toISOString()
    };
    
    return mockReview;
  } catch (error: any) {
    console.error("Error submitting review:", error);
    toast({
      title: "Failed to submit review",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};
