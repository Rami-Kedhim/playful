import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (creatorId: string, startDate: Date, endDate: Date) => {
  try {
    // Check if we have real data
    const { data: realData, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: true });
    
    if (error) throw error;
    
    // If we have real data, use it
    if (realData && realData.length > 0) {
      return realData.map(item => ({
        date: item.date,
        views: item.views || 0,
        likes: item.likes || 0,
        shares: item.shares || 0,
        earnings: item.earnings || 0,
        revenue: item.earnings || 0, // For backward compatibility
        subscribers: Math.floor(Math.random() * 5) // Not tracked yet, using mock data
      }));
    }
    
    // Otherwise generate mock data for demonstration
    const mockData = [];
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      mockData.push({
        date: currentDate.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100),
        likes: Math.floor(Math.random() * 50),
        shares: Math.floor(Math.random() * 20),
        revenue: parseFloat((Math.random() * 50).toFixed(2)),
        earnings: parseFloat((Math.random() * 50).toFixed(2)),
        subscribers: Math.floor(Math.random() * 10)
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return mockData;
  } catch (error: any) {
    console.error("Error fetching creator analytics:", error);
    toast({
      title: "Failed to fetch analytics",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Fetch content items for a creator
 */
export const fetchCreatorContent = async (creatorId: string) => {
  try {
    // Try to fetch real content from database
    const { data: realContent, error } = await supabase
      .from('creator_content')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // If we have real content, use it
    if (realContent && realContent.length > 0) {
      return realContent;
    }
    
    // Otherwise generate mock content for demonstration
    const mockContent = Array.from({ length: 10 }, (_, i) => ({
      id: `content-${i}`,
      creator_id: creatorId,
      title: `Content Item ${i}`,
      description: `Description for content item ${i}`,
      content_type: i % 2 === 0 ? 'video' : 'image',
      url: `https://example.com/content/${i}`,
      thumbnail_url: `https://example.com/thumbnails/${i}.jpg`,
      is_premium: i % 3 === 0,
      price: i % 3 === 0 ? parseFloat((Math.random() * 20 + 5).toFixed(2)) : 0,
      status: i < 8 ? 'published' : 'draft',
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 500),
      created_at: new Date(Date.now() - i * 86400000).toISOString(),
      updated_at: new Date(Date.now() - i * 43200000).toISOString(),
      published_at: i < 8 ? new Date(Date.now() - i * 86400000).toISOString() : null
    }));
    
    return mockContent;
  } catch (error: any) {
    console.error("Error fetching creator content:", error);
    toast({
      title: "Failed to fetch content",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
};

/**
 * Fetch payout history for a creator
 */
export const fetchCreatorPayouts = async (creatorId: string) => {
  try {
    // Try to fetch real payouts from database
    const { data: realPayouts, error } = await supabase
      .from('creator_payouts')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    
    // If we have real payouts, use them
    if (realPayouts && realPayouts.length > 0) {
      return realPayouts;
    }
    
    // Otherwise generate mock payout data for demonstration
    const mockPayouts = Array.from({ length: 5 }, (_, i) => ({
      id: `payout-${i}`,
      creator_id: creatorId,
      amount: parseFloat((Math.random() * 500 + 100).toFixed(2)),
      status: ['pending', 'completed', 'completed', 'completed', 'failed'][i],
      payout_method: ['stripe', 'paypal', 'bank_transfer', 'crypto', 'stripe'][i],
      transaction_id: `tx-${Math.random().toString(36).substring(2, 10)}`,
      requested_at: new Date(Date.now() - i * 30 * 86400000).toISOString(),
      processed_at: i !== 0 ? new Date(Date.now() - i * 30 * 86400000 + 86400000).toISOString() : null,
      notes: i === 4 ? "Failed due to invalid account details" : null
    }));
    
    return mockPayouts;
  } catch (error: any) {
    console.error("Error fetching creator payouts:", error);
    toast({
      title: "Failed to fetch payouts",
      description: error.message,
      variant: "destructive",
    });
    return [];
  }
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
