
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { CreatorContent } from "@/types/creator";

/**
 * Fetch content items for a creator
 */
export const fetchCreatorContent = async (
  creatorId: string,
  page = 1,
  pageSize = 10,
  filters: Record<string, any> = {}
): Promise<{ data: CreatorContent[], totalCount: number }> => {
  try {
    // This would fetch actual data from the database in production
    // Generate mock data for now
    
    const mockContent: CreatorContent[] = Array(25).fill(null).map((_, i) => ({
      id: `content-${i}`,
      title: `Content Item ${i + 1}`,
      description: `This is a description for content item ${i + 1}`,
      content_type: ['image', 'video', 'article'][Math.floor(Math.random() * 3)],
      url: `https://example.com/content/${i + 1}`,
      thumbnail_url: `https://example.com/thumbnails/${i + 1}.jpg`,
      is_premium: Math.random() > 0.7,
      price: Math.random() > 0.7 ? parseFloat((5 + Math.random() * 15).toFixed(2)) : null,
      status: ['published', 'draft', 'archived'][Math.floor(Math.random() * 3)],
      created_at: new Date(Date.now() - i * 86400000 * 3).toISOString(),
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 200),
    }));
    
    // Apply pagination
    const startIndex = (page - 1) * pageSize;
    const paginatedData = mockContent.slice(startIndex, startIndex + pageSize);
    
    return {
      data: paginatedData,
      totalCount: mockContent.length
    };
  } catch (error) {
    console.error("Error fetching creator content:", error);
    return { data: [], totalCount: 0 };
  }
};

/**
 * Upload content file
 */
export const uploadCreatorContent = async (
  creatorId: string,
  file: File,
  onProgress?: (progress: number) => void
): Promise<{ success: boolean, url?: string, error?: string }> => {
  try {
    // In production, this would upload to Supabase storage
    // Simulate upload progress
    if (onProgress) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;
        onProgress(Math.min(progress, 100));
        if (progress >= 100) clearInterval(interval);
      }, 300);
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      url: `https://example.com/uploads/${Date.now()}_${file.name}`
    };
  } catch (error: any) {
    console.error("Error uploading content:", error);
    return {
      success: false,
      error: error.message || "Failed to upload file"
    };
  }
};

/**
 * Save content metadata
 */
export const saveContent = async (
  creatorId: string,
  contentData: Partial<CreatorContent>
): Promise<{ success: boolean, data?: CreatorContent, error?: string }> => {
  try {
    // This would save to the database in production
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const savedContent: CreatorContent = {
      id: contentData.id || `content-${Date.now()}`,
      title: contentData.title || "Untitled",
      description: contentData.description || "",
      content_type: contentData.content_type || "image",
      url: contentData.url || "",
      thumbnail_url: contentData.thumbnail_url || "",
      is_premium: contentData.is_premium || false,
      price: contentData.price || null,
      status: contentData.status || "draft",
      created_at: contentData.created_at || new Date().toISOString(),
      views_count: contentData.views_count || 0,
      likes_count: contentData.likes_count || 0,
    };
    
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully",
    });
    
    return {
      success: true,
      data: savedContent
    };
  } catch (error: any) {
    console.error("Error saving content:", error);
    
    toast({
      title: "Error saving content",
      description: error.message || "Failed to save content",
      variant: "destructive",
    });
    
    return {
      success: false,
      error: error.message || "Failed to save content"
    };
  }
};

/**
 * Update existing content
 */
export const updateContent = async (
  contentId: string,
  contentData: Partial<CreatorContent>
): Promise<{ success: boolean, data?: CreatorContent, error?: string }> => {
  try {
    // This would update in the database in production
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully",
    });
    
    return {
      success: true,
      data: {
        ...contentData,
        id: contentId,
      } as CreatorContent
    };
  } catch (error: any) {
    console.error("Error updating content:", error);
    
    toast({
      title: "Error updating content",
      description: error.message || "Failed to update content",
      variant: "destructive",
    });
    
    return {
      success: false,
      error: error.message || "Failed to update content"
    };
  }
};
