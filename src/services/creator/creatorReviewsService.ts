import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CreatorReview } from "@/types/creator";

/**
 * Fetch reviews for a creator
 */
export const fetchCreatorReviews = async (creatorId: string): Promise<CreatorReview[]> => {
  try {
    // Try to fetch real reviews from database
    const { data: realReviews, error } = await supabase
      .from('creator_reviews')
      .select(`
        id,
        creator_id,
        reviewer_id,
        rating,
        comment,
        created_at,
        profiles:reviewer_id (
          id,
          username,
          avatar_url
        )
      `)
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // If we have real reviews, use them
    if (realReviews && realReviews.length > 0) {
      return realReviews.map(review => ({
        ...review,
        reviewer: review.profiles
      }));
    }
    
    // Otherwise generate mock review data for demonstration
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
    // Insert review into database
    const { data, error } = await supabase
      .from('creator_reviews')
      .insert({
        creator_id: creatorId,
        reviewer_id: reviewerId,
        rating: rating,
        comment: comment || null
      })
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully",
      variant: "default",
    });
    
    return data as CreatorReview;
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
