
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (creatorId: string, startDate: Date, endDate: Date) => {
  try {
    // Mock data generation
    const mockData = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      mockData.push({
        date: currentDate.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 100),
        revenue: parseFloat((Math.random() * 50).toFixed(2)),
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
    // Generate mock content data
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
      is_published: i < 8,
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
    // Generate mock payout data
    const mockPayouts = Array.from({ length: 5 }, (_, i) => ({
      id: `payout-${i}`,
      creator_id: creatorId,
      amount: parseFloat((Math.random() * 500 + 100).toFixed(2)),
      status: ['pending', 'completed', 'completed', 'completed', 'failed'][i],
      payout_method: ['stripe', 'paypal', 'bank_transfer', 'crypto', 'stripe'][i],
      payout_details: {},
      created_at: new Date(Date.now() - i * 30 * 86400000).toISOString(),
      processed_at: i !== 0 ? new Date(Date.now() - i * 30 * 86400000 + 86400000).toISOString() : null
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Add ID and timestamp fields
    const newContent = {
      ...content,
      id: `content-${Date.now()}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully",
      variant: "default",
    });
    
    return newContent;
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedContent = {
      ...updates,
      id: contentId,
      updated_at: new Date().toISOString()
    };
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully",
      variant: "default",
    });
    
    return updatedContent;
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
    // Simulate tracking a view
    console.log(`Tracking view: Content ID ${contentId}, Viewer ID ${viewerId}`);
    
    // In a real implementation, this would update a view counter and possibly store viewing statistics
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
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const payoutRequest = {
      id: `payout-${Date.now()}`,
      creator_id: creatorId,
      amount,
      payout_method: payoutMethod,
      payout_details: payoutDetails,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully",
      variant: "default",
    });
    
    return payoutRequest;
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
 * Add a review for a creator
 */
export const addCreatorReview = async (creatorId: string, reviewerId: string, rating: number, comment?: string) => {
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const review = {
      id: `review-${Date.now()}`,
      creator_id: creatorId,
      reviewer_id: reviewerId,
      rating,
      comment,
      created_at: new Date().toISOString()
    };
    
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully",
      variant: "default",
    });
    
    return review;
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

/**
 * Fetch reviews for a creator
 */
export const fetchCreatorReviews = async (creatorId: string) => {
  try {
    // Generate mock review data
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
