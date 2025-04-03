
import { supabase } from "@/lib/supabase";
import { toast } from "@/components/ui/use-toast";

export interface ContentItem {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  media_url: string;
  media_type: "image" | "video";
  visibility: "public" | "subscribers" | "premium";
  status: "draft" | "published" | "scheduled";
  scheduled_for?: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  creator_id: string;
  views_count: number;
  likes_count: number;
  comments_count: number;
}

export interface ContentCreateInput {
  title: string;
  description: string;
  thumbnail_url?: string;
  media_url: string;
  media_type: "image" | "video";
  visibility: "public" | "subscribers" | "premium";
  status: "draft" | "published" | "scheduled";
  scheduled_for?: string;
  tags: string[];
  creator_id: string;
}

export interface ContentUpdateInput extends Partial<Omit<ContentCreateInput, "creator_id">> {
  id: string;
}

// Get content for a specific creator
export const getCreatorContent = async (creatorId: string, limit = 10, status?: string): Promise<ContentItem[]> => {
  try {
    let query = supabase
      .from("content")
      .select("*")
      .eq("creator_id", creatorId)
      .order("created_at", { ascending: false })
      .limit(limit);
    
    if (status) {
      query = query.eq("status", status);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Error fetching creator content:", error);
    return [];
  }
};

// Get a single content item by ID
export const getContentById = async (contentId: string): Promise<ContentItem | null> => {
  try {
    const { data, error } = await supabase
      .from("content")
      .select("*")
      .eq("id", contentId)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

// Create a new content item
export const createContent = async (content: ContentCreateInput): Promise<ContentItem | null> => {
  try {
    const { data, error } = await supabase
      .from("content")
      .insert([content])
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Content created",
      description: "Your content has been saved successfully.",
    });
    
    return data;
  } catch (error) {
    console.error("Error creating content:", error);
    
    toast({
      title: "Error creating content",
      description: "There was a problem saving your content.",
      variant: "destructive",
    });
    
    return null;
  }
};

// Update an existing content item
export const updateContent = async (content: ContentUpdateInput): Promise<ContentItem | null> => {
  try {
    const { data, error } = await supabase
      .from("content")
      .update(content)
      .eq("id", content.id)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully.",
    });
    
    return data;
  } catch (error) {
    console.error("Error updating content:", error);
    
    toast({
      title: "Error updating content",
      description: "There was a problem updating your content.",
      variant: "destructive",
    });
    
    return null;
  }
};

// Delete a content item
export const deleteContent = async (contentId: string): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from("content")
      .delete()
      .eq("id", contentId);
    
    if (error) throw error;
    
    toast({
      title: "Content deleted",
      description: "Your content has been deleted successfully.",
    });
    
    return true;
  } catch (error) {
    console.error("Error deleting content:", error);
    
    toast({
      title: "Error deleting content",
      description: "There was a problem deleting your content.",
      variant: "destructive",
    });
    
    return false;
  }
};

// Publish a draft content
export const publishContent = async (contentId: string): Promise<ContentItem | null> => {
  try {
    const { data, error } = await supabase
      .from("content")
      .update({ status: "published", updated_at: new Date().toISOString() })
      .eq("id", contentId)
      .select()
      .single();
    
    if (error) throw error;
    
    toast({
      title: "Content published",
      description: "Your content is now visible to your audience.",
    });
    
    return data;
  } catch (error) {
    console.error("Error publishing content:", error);
    
    toast({
      title: "Error publishing content",
      description: "There was a problem publishing your content.",
      variant: "destructive",
    });
    
    return null;
  }
};
