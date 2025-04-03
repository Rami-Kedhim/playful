
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
    let query = supabase
      .from('creator_content')
      .select('*', { count: 'exact' })
      .eq('creator_id', creatorId);
    
    // Apply filters if any
    if (filters.status) {
      query = query.eq('status', filters.status);
    }
    
    if (filters.isPremium !== undefined) {
      query = query.eq('is_premium', filters.isPremium);
    }
    
    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    // Apply pagination
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      console.error("Error fetching creator content:", error);
      throw error;
    }
    
    // If no data found, return empty array with count 0
    if (!data || data.length === 0) {
      // For demo purposes, generate mock data
      const mockContent: CreatorContent[] = Array(10).fill(null).map((_, i) => ({
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
      
      return {
        data: mockContent.slice(0, pageSize),
        totalCount: mockContent.length
      };
    }
    
    return {
      data: data as CreatorContent[],
      totalCount: count || 0
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
    // Generate a unique file path
    const fileExt = file.name.split('.').pop();
    const filePath = `${creatorId}/${Date.now()}.${fileExt}`;
    
    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('creator_content')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      throw error;
    }
    
    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('creator_content')
      .getPublicUrl(data.path);
    
    return {
      success: true,
      url: publicUrl
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
    const { data, error } = await supabase
      .from('creator_content')
      .insert([{
        creator_id: creatorId,
        title: contentData.title || "Untitled",
        description: contentData.description || "",
        content_type: contentData.content_type || "image",
        url: contentData.url || "",
        thumbnail_url: contentData.thumbnail_url || "",
        is_premium: contentData.is_premium || false,
        price: contentData.price || null,
        status: contentData.status || "draft"
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Content saved",
      description: "Your content has been saved successfully",
    });
    
    return {
      success: true,
      data: data as CreatorContent
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
    const { data, error } = await supabase
      .from('creator_content')
      .update({
        title: contentData.title,
        description: contentData.description,
        content_type: contentData.content_type,
        url: contentData.url,
        thumbnail_url: contentData.thumbnail_url,
        is_premium: contentData.is_premium,
        price: contentData.price,
        status: contentData.status,
        updated_at: new Date().toISOString()
      })
      .eq('id', contentId)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    toast({
      title: "Content updated",
      description: "Your content has been updated successfully",
    });
    
    return {
      success: true,
      data: data as CreatorContent
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
