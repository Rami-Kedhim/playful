
import { supabase } from "@/integrations/supabase/client";
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
  id?: string;
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

export interface ContentUpdateInput extends Partial<ContentCreateInput> {
  id: string;
}

// Get content for a specific creator
export const getCreatorContent = async (creatorId: string, limit = 10, status?: string): Promise<ContentItem[]> => {
  try {
    // For now, we'll use mock data since the 'content' table doesn't exist yet
    const mockContent: ContentItem[] = Array.from({ length: Math.floor(Math.random() * 10) + 1 }, (_, i) => ({
      id: `content-${i}`,
      title: `Content ${i}`,
      description: `Description for content ${i}`,
      thumbnail_url: `https://picsum.photos/seed/${i}/300/200`,
      media_url: `https://example.com/media/${i}`,
      media_type: i % 2 === 0 ? "image" : "video",
      visibility: ["public", "subscribers", "premium"][i % 3] as "public" | "subscribers" | "premium",
      status: ["draft", "published", "scheduled"][i % 3] as "draft" | "published" | "scheduled",
      scheduled_for: i % 3 === 2 ? new Date(Date.now() + 86400000 * i).toISOString() : undefined,
      created_at: new Date(Date.now() - 86400000 * i).toISOString(),
      updated_at: new Date(Date.now() - 43200000 * i).toISOString(),
      tags: [`tag${i}`, `category${i % 3}`],
      creator_id: creatorId,
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 100),
      comments_count: Math.floor(Math.random() * 50)
    }));
    
    if (status) {
      return mockContent.filter(item => item.status === status);
    }
    
    return mockContent;
  } catch (error) {
    console.error("Error fetching creator content:", error);
    return [];
  }
};

// Get a single content item by ID
export const getContentById = async (contentId: string): Promise<ContentItem | null> => {
  try {
    // Use mock data
    const mockContent: ContentItem = {
      id: contentId,
      title: `Content ${contentId}`,
      description: `Description for content ${contentId}`,
      thumbnail_url: `https://picsum.photos/seed/${contentId}/300/200`,
      media_url: `https://example.com/media/${contentId}`,
      media_type: Math.random() > 0.5 ? "image" : "video",
      visibility: ["public", "subscribers", "premium"][Math.floor(Math.random() * 3)] as "public" | "subscribers" | "premium",
      status: ["draft", "published", "scheduled"][Math.floor(Math.random() * 3)] as "draft" | "published" | "scheduled",
      scheduled_for: Math.random() > 0.7 ? new Date(Date.now() + 86400000).toISOString() : undefined,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 43200000).toISOString(),
      tags: [`tag1`, `category2`],
      creator_id: `creator-${Math.floor(Math.random() * 10)}`,
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 100),
      comments_count: Math.floor(Math.random() * 50)
    };
    
    return mockContent;
  } catch (error) {
    console.error("Error fetching content:", error);
    return null;
  }
};

// Create a new content item
export const createContent = async (content: ContentCreateInput): Promise<ContentItem | null> => {
  try {
    // Create a mock content item
    const newContent: ContentItem = {
      id: content.id || `content-${Date.now()}`,
      title: content.title,
      description: content.description,
      thumbnail_url: content.thumbnail_url || "https://picsum.photos/seed/default/300/200",
      media_url: content.media_url,
      media_type: content.media_type,
      visibility: content.visibility,
      status: content.status,
      scheduled_for: content.scheduled_for,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      tags: content.tags || [],
      creator_id: content.creator_id,
      views_count: 0,
      likes_count: 0,
      comments_count: 0
    };
    
    toast({
      title: "Content created",
      description: "Your content has been saved successfully.",
    });
    
    return newContent;
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
    // Create a mock updated content item
    const updatedContent: ContentItem = {
      id: content.id,
      title: content.title || "Default Title",
      description: content.description || "Default Description",
      thumbnail_url: content.thumbnail_url || "https://picsum.photos/seed/default/300/200",
      media_url: content.media_url || "https://example.com/media/default",
      media_type: content.media_type || "image",
      visibility: content.visibility || "public",
      status: content.status || "draft",
      scheduled_for: content.scheduled_for,
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      tags: content.tags || [],
      creator_id: content.creator_id || "unknown-creator",
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 100),
      comments_count: Math.floor(Math.random() * 50)
    };
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully.",
    });
    
    return updatedContent;
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
    // No actual deletion needed for mock data
    
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
    // Mock publish by creating a published content item
    const publishedContent: ContentItem = {
      id: contentId,
      title: `Content ${contentId}`,
      description: `Description for content ${contentId}`,
      thumbnail_url: `https://picsum.photos/seed/${contentId}/300/200`,
      media_url: `https://example.com/media/${contentId}`,
      media_type: Math.random() > 0.5 ? "image" : "video",
      visibility: ["public", "subscribers", "premium"][Math.floor(Math.random() * 3)] as "public" | "subscribers" | "premium",
      status: "published",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date().toISOString(),
      tags: [`tag1`, `category2`],
      creator_id: `creator-${Math.floor(Math.random() * 10)}`,
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 100),
      comments_count: Math.floor(Math.random() * 50)
    };
    
    toast({
      title: "Content published",
      description: "Your content is now visible to your audience.",
    });
    
    return publishedContent;
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
