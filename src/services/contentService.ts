
import { supabase } from "@/integrations/supabase/client";

// Basic content type definitions
export type ContentType = "video" | "image" | "text";
export type ContentStatus = "draft" | "published" | "scheduled";
export type ContentVisibility = "public" | "subscribers" | "premium";

// Define the structure for a content item
export interface ContentItem {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  media_url: string;
  media_type: ContentType;
  thumbnail_url?: string;
  visibility: ContentVisibility;
  status: ContentStatus;
  is_premium: boolean;
  price: number;
  created_at: string;
  updated_at?: string;
  published_at?: string;
  scheduled_for?: string;
  views_count: number;
  likes_count: number;
  tags?: string[];
}

// Input for creating new content
export interface ContentCreateInput {
  id?: string;
  creator_id: string;
  title: string;
  description?: string;
  media_url: string;
  media_type: ContentType;
  thumbnail_url?: string;
  visibility: ContentVisibility;
  status: ContentStatus;
  is_premium?: boolean;
  price?: number;
  scheduled_for?: string;
  tags?: string[];
}

// Input for updating existing content
export interface ContentUpdateInput {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  media_url: string; // Making this required to match ContentCreateInput
  media_type: ContentType;
  thumbnail_url?: string;
  visibility: ContentVisibility;
  status?: ContentStatus;
  is_premium?: boolean;
  price?: number;
  scheduled_for?: string;
  tags?: string[];
}

// Mock data for creator content
const mockContent: ContentItem[] = [
  {
    id: "1",
    creator_id: "user-1",
    title: "Beach Photoshoot",
    description: "Summer vibes photoshoot at Malibu Beach",
    media_url: "https://example.com/beach.jpg",
    media_type: "image",
    thumbnail_url: "https://example.com/beach-thumb.jpg",
    visibility: "public",
    status: "published",
    is_premium: false,
    price: 0,
    created_at: "2023-05-10T12:00:00Z",
    updated_at: "2023-05-10T14:30:00Z",
    published_at: "2023-05-10T15:00:00Z",
    views_count: 1240,
    likes_count: 87
  },
  {
    id: "2",
    creator_id: "user-1",
    title: "Exclusive Workout Video",
    description: "Full body workout routine",
    media_url: "https://example.com/workout.mp4",
    media_type: "video",
    thumbnail_url: "https://example.com/workout-thumb.jpg",
    visibility: "premium",
    status: "published",
    is_premium: true,
    price: 9.99,
    created_at: "2023-05-15T10:00:00Z",
    updated_at: "2023-05-15T12:00:00Z",
    published_at: "2023-05-15T14:00:00Z",
    views_count: 320,
    likes_count: 45
  },
  {
    id: "3",
    creator_id: "user-1",
    title: "Upcoming Live Session",
    description: "Q&A with fans",
    media_url: "https://example.com/live.jpg",
    media_type: "image",
    thumbnail_url: "https://example.com/live-thumb.jpg",
    visibility: "subscribers",
    status: "scheduled",
    is_premium: false,
    price: 0,
    created_at: "2023-05-20T09:00:00Z",
    updated_at: "2023-05-20T10:00:00Z",
    scheduled_for: "2023-06-01T18:00:00Z",
    views_count: 0,
    likes_count: 0
  },
  {
    id: "4",
    creator_id: "user-1",
    title: "Draft Post",
    description: "Work in progress",
    media_url: "https://example.com/draft.jpg",
    media_type: "image",
    thumbnail_url: "https://example.com/draft-thumb.jpg",
    visibility: "public",
    status: "draft",
    is_premium: false,
    price: 0,
    created_at: "2023-05-22T11:00:00Z",
    updated_at: "2023-05-22T11:30:00Z",
    views_count: 0,
    likes_count: 0
  }
];

// Get content for a creator
export const getCreatorContent = async (
  creatorId: string,
  limit: number = 10,
  status?: string
): Promise<ContentItem[]> => {
  try {
    console.log(`Fetching content for creator: ${creatorId}, status filter: ${status || 'all'}`);
    
    // Use mock data instead of actual Supabase calls for now
    let filteredContent = [...mockContent];
    
    // Apply status filter if provided
    if (status) {
      filteredContent = filteredContent.filter(item => item.status === status);
    }
    
    // Filter by creator
    filteredContent = filteredContent.filter(item => item.creator_id === creatorId);
    
    // Apply limit
    filteredContent = filteredContent.slice(0, limit);
    
    return filteredContent;
  } catch (error) {
    console.error("Error fetching creator content:", error);
    return [];
  }
};

// Create new content
export const createContent = async (
  content: ContentCreateInput
): Promise<ContentItem | null> => {
  try {
    console.log("Creating new content:", content);
    
    // Generate mock data instead of actual DB insert
    const newContent: ContentItem = {
      id: `content-${Date.now()}`,
      creator_id: content.creator_id,
      title: content.title,
      description: content.description || "",
      media_url: content.media_url,
      media_type: content.media_type,
      thumbnail_url: content.thumbnail_url,
      visibility: content.visibility,
      status: content.status,
      is_premium: content.is_premium || false,
      price: content.price || 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: content.status === 'published' ? new Date().toISOString() : undefined,
      scheduled_for: content.scheduled_for,
      views_count: 0,
      likes_count: 0,
      tags: content.tags
    };
    
    mockContent.unshift(newContent);
    
    return newContent;
  } catch (error) {
    console.error("Error creating content:", error);
    return null;
  }
};

// Update existing content
export const updateContent = async (
  content: ContentUpdateInput
): Promise<ContentItem | null> => {
  try {
    console.log("Updating content:", content);
    
    // Find the content to update in our mock data
    const index = mockContent.findIndex(item => item.id === content.id);
    
    if (index === -1) {
      console.error(`Content with ID ${content.id} not found`);
      return null;
    }
    
    // Update the content
    const updatedContent: ContentItem = {
      ...mockContent[index],
      ...content,
      updated_at: new Date().toISOString()
    };
    
    // If status changed to published, update published_at
    if (content.status === 'published' && mockContent[index].status !== 'published') {
      updatedContent.published_at = new Date().toISOString();
    }
    
    // Replace the old content with the updated one
    mockContent[index] = updatedContent;
    
    return updatedContent;
  } catch (error) {
    console.error("Error updating content:", error);
    return null;
  }
};

// Delete content
export const deleteContent = async (contentId: string): Promise<boolean> => {
  try {
    console.log("Deleting content:", contentId);
    
    // Find the content to delete
    const index = mockContent.findIndex(item => item.id === contentId);
    
    if (index === -1) {
      console.error(`Content with ID ${contentId} not found`);
      return false;
    }
    
    // Remove the content
    mockContent.splice(index, 1);
    
    return true;
  } catch (error) {
    console.error("Error deleting content:", error);
    return false;
  }
};

// Publish a draft
export const publishContent = async (contentId: string): Promise<ContentItem | null> => {
  try {
    console.log("Publishing content:", contentId);
    
    // Find the content to publish
    const index = mockContent.findIndex(item => item.id === contentId);
    
    if (index === -1) {
      console.error(`Content with ID ${contentId} not found`);
      return null;
    }
    
    // Update the content status to published
    const publishedContent: ContentItem = {
      ...mockContent[index],
      status: "published",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };
    
    // Replace the old content with the published one
    mockContent[index] = publishedContent;
    
    return publishedContent;
  } catch (error) {
    console.error("Error publishing content:", error);
    return null;
  }
};
