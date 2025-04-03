
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

/**
 * Fetch analytics data for a creator
 */
export const fetchCreatorAnalytics = async (creatorId: string, startDate: Date, endDate: Date) => {
  try {
    const { data, error } = await supabase
      .from('creator_analytics')
      .select('*')
      .eq('creator_id', creatorId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0])
      .order('date', { ascending: false });
      
    if (error) throw error;
    return data || [];
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
    const { data, error } = await supabase
      .from('creator_content')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
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
    const { data, error } = await supabase
      .from('creator_payouts')
      .select('*')
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
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
    const { data, error } = await supabase
      .from('creator_content')
      .insert(content)
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully",
      variant: "success",
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
    const { data, error } = await supabase
      .from('creator_content')
      .update(updates)
      .eq('id', contentId)
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully",
      variant: "success",
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
    const { error } = await supabase.rpc('track_content_view', {
      p_content_id: contentId,
      p_viewer_id: viewerId
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
    const { data, error } = await supabase
      .from('creator_payouts')
      .insert({
        creator_id: creatorId,
        amount,
        payout_method: payoutMethod,
        payout_details: payoutDetails,
        status: 'pending'
      })
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Payout requested",
      description: "Your payout request has been submitted successfully",
      variant: "success",
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
 * Add a review for a creator
 */
export const addCreatorReview = async (creatorId: string, reviewerId: string, rating: number, comment?: string) => {
  try {
    const { data, error } = await supabase
      .from('creator_reviews')
      .insert({
        creator_id: creatorId,
        reviewer_id: reviewerId,
        rating,
        comment
      })
      .select()
      .single();
      
    if (error) throw error;
    
    toast({
      title: "Review submitted",
      description: "Your review has been submitted successfully",
      variant: "success",
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

/**
 * Fetch reviews for a creator
 */
export const fetchCreatorReviews = async (creatorId: string) => {
  try {
    const { data, error } = await supabase
      .from('creator_reviews')
      .select(`
        *,
        reviewer:reviewer_id(id, username, avatar_url)
      `)
      .eq('creator_id', creatorId)
      .order('created_at', { ascending: false });
      
    if (error) throw error;
    return data || [];
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
