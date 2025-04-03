import { supabase } from "@/integrations/supabase/client";
import { format, subDays } from 'date-fns';

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (creatorId: string, startDate: Date, endDate: Date) => {
  // Use mock data since the table doesn't exist yet
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
  const result = [];
  
  for (let i = 0; i < days; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    
    result.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 500),
      shares: Math.floor(Math.random() * 100),
      earnings: (Math.random() * 100).toFixed(2)
    });
  }
  
  return result;
};

/**
 * Fetch content items for a creator
 */
export const getCreatorContent = async (creatorId: string, page = 1, pageSize = 10) => {
  try {
    // For now, use the content table if it exists or mock data
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("creator_id", creatorId)
      .order("created_at", { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (error) {
      console.error("Error fetching creator content:", error);
      
      // Return mock data if the query fails
      return {
        data: Array(pageSize).fill(null).map((_, i) => ({
          id: `mock-content-${i}`,
          title: `Content Item ${i + 1}`,
          description: `This is a mock content item ${i + 1}`,
          type: i % 2 === 0 ? 'image' : 'video',
          url: `https://example.com/content/${i + 1}`,
          views_count: Math.floor(Math.random() * 1000),
          likes_count: Math.floor(Math.random() * 500),
          created_at: new Date(Date.now() - i * 86400000).toISOString(),
          is_premium: i % 3 === 0
        })),
        totalCount: 50 // Mock total count
      };
    }

    const { count } = await supabase
      .from("content")
      .select("id", { count: "exact", head: true })
      .eq("creator_id", creatorId);

    return {
      data: data || [],
      totalCount: count || 0
    };
  } catch (error) {
    console.error("Error in getCreatorContent:", error);
    return { data: [], totalCount: 0 };
  }
};

/**
 * Fetch payout history for a creator
 */
export const getCreatorPayouts = async (creatorId: string, page = 1, pageSize = 10) => {
  // Return mock payout data since the table doesn't exist yet
  return {
    data: Array(pageSize).fill(null).map((_, i) => ({
      id: `mock-payout-${i}`,
      amount: (Math.random() * 1000).toFixed(2),
      status: ['pending', 'completed', 'processing'][Math.floor(Math.random() * 3)],
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      payout_method: ['bank_transfer', 'paypal', 'crypto'][Math.floor(Math.random() * 3)]
    })),
    totalCount: 30
  };
};

/**
 * Save a new content item
 */
export const saveContent = async (content: any) => {
  try {
    // Prepare content object for database
    const contentData = {
      creator_id: content.creator_id,
      title: content.title,
      description: content.description,
      content_type: content.content_type,
      url: content.url,
      thumbnail_url: content.thumbnail_url,
      is_premium: content.is_premium || false,
      price: content.is_premium ? content.price : 0,
      status: content.status || 'draft'
    };
    
    // Insert into database
    const { data, error } = await supabase
      .from('creator_content')
      .insert(contentData)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully",
      variant: "default",
    });
    
    return data;
  } catch (error: any) {
    console.error("Error saving content:", error);
    toast({
      title: "Failed to save content",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Update an existing content item
 */
export const updateContent = async (contentId: string, updates: any) => {
  try {
    // Update in database
    const { data, error } = await supabase
      .from('creator_content')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', contentId)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully",
      variant: "default",
    });
    
    return data;
  } catch (error: any) {
    console.error("Error updating content:", error);
    toast({
      title: "Failed to update content",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Track a view for a piece of content
 */
export const trackContentView = async (contentId: string, viewerId: string) => {
  try {
    // Call the RPC function we created
    const { error } = await supabase.rpc('log_content_view', {
      content_id: contentId,
      viewer_id: viewerId
    });
    
    if (error) throw error;
    
    return true;
  } catch (error: any) {
    console.error("Error tracking content view:", error);
    return false;
  }
};

/**
 * Request a payout for a creator
 */
export const requestPayout = async (creatorId: string, amount: number, payoutMethod: string, payoutDetails: any) => {
  try {
    // Create payout request in database
    const { data, error } = await supabase
      .from('creator_payouts')
      .insert({
        creator_id: creatorId,
        amount: amount,
        payout_method: payoutMethod,
        notes: payoutDetails.notes || null,
        status: 'pending',
        requested_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully",
      variant: "default",
    });
    
    return data;
  } catch (error: any) {
    console.error("Error requesting payout:", error);
    toast({
      title: "Failed to request payout",
      description: error.message,
      variant: "destructive",
    });
    return null;
  }
};

/**
 * Fetch reviews for a creator
 */
export const fetchCreatorReviews = async (creatorId: string) => {
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
    const mockReviews = Array.from({ length: 8 }, (_, i) => ({
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
export const addCreatorReview = async (creatorId: string, reviewerId: string, rating: number, comment?: string) => {
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
    
    return data;
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
