import { supabase } from "@/integrations/supabase/client";
import { CreatorContent } from "@/types/creator";

export const fetchCreatorContent = async (
  creatorId: string,
  page = 1,
  itemsPerPage = 10,
  filters: Record<string, any> = {}
): Promise<{ data: CreatorContent[]; totalCount: number }> => {
  try {
    // In a real application, this would be a Supabase query
    // For now, we'll mock some data
    const mockContent: CreatorContent[] = Array.from({ length: 20 }).map((_, index) => ({
      id: `content-${index + 1}`,
      title: `Content ${index + 1}`,
      description: index % 3 === 0 ? `Description for content ${index + 1}` : undefined,
      content_type: index % 2 === 0 ? 'video' : 'image',
      url: `https://example.com/content/${index + 1}`,
      thumbnail_url: `https://picsum.photos/seed/content${index + 1}/400/300`,
      is_premium: index % 3 === 0,
      price: index % 3 === 0 ? (index + 1) * 5 : null,
      status: index % 5 === 0 ? 'draft' : 'published',
      created_at: new Date(Date.now() - index * 86400000).toISOString(),
      views_count: Math.floor(Math.random() * 1000),
      likes_count: Math.floor(Math.random() * 100),
    }));

    // Apply filters
    let filteredContent = [...mockContent];
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredContent = filteredContent.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        (item.description && item.description.toLowerCase().includes(searchTerm))
      );
    }
    
    if (filters.content_type) {
      filteredContent = filteredContent.filter(item => 
        item.content_type === filters.content_type
      );
    }
    
    if (filters.status) {
      filteredContent = filteredContent.filter(item => 
        item.status === filters.status
      );
    }

    // Calculate pagination
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedContent = filteredContent.slice(startIndex, endIndex);
    
    return {
      data: paginatedContent,
      totalCount: filteredContent.length
    };
  } catch (err) {
    console.error("Error fetching creator content:", err);
    throw new Error("Failed to fetch creator content");
  }
};

export const uploadCreatorContent = async (
  creatorId: string,
  file: File,
  metadata: Record<string, any> = {}
): Promise<{ success: boolean; data?: { url: string; id: string } }> => {
  try {
    // Generate a unique filename
    const filename = `${creatorId}_${Date.now()}_${file.name.replace(/\s+/g, '_')}`;
    const filePath = `${creatorId}/${filename}`;
    
    // In a real app, this would upload to Supabase storage
    // For now, we'll mock a successful upload
    
    // Return mock response
    return {
      success: true,
      data: {
        url: `https://example.com/content/${filePath}`,
        id: `file_${Date.now()}`
      }
    };
  } catch (err) {
    console.error("Error uploading content:", err);
    return { success: false };
  }
};

export const saveContent = async (
  creatorId: string,
  contentData: Partial<CreatorContent>
): Promise<{ success: boolean; data?: CreatorContent }> => {
  try {
    // In a real application, this would be a Supabase insert
    // For now, we'll mock the response
    const newContent: CreatorContent = {
      id: `content-${Date.now()}`,
      title: contentData.title || 'Untitled',
      description: contentData.description,
      content_type: contentData.content_type || 'image',
      url: contentData.url || '',
      thumbnail_url: contentData.thumbnail_url,
      is_premium: contentData.is_premium || false,
      price: contentData.price || null,
      status: contentData.status || 'draft',
      created_at: new Date().toISOString(),
      views_count: 0,
      likes_count: 0,
    };
    
    return {
      success: true,
      data: newContent
    };
  } catch (err) {
    console.error("Error saving content:", err);
    return { success: false };
  }
};

export const updateContent = async (
  contentId: string,
  contentData: Partial<CreatorContent>
): Promise<{ success: boolean; data?: CreatorContent }> => {
  try {
    // In a real application, this would be a Supabase update
    // For now, we'll mock the response
    return {
      success: true,
      data: {
        id: contentId,
        title: contentData.title || 'Untitled',
        description: contentData.description,
        content_type: contentData.content_type || 'image',
        url: contentData.url || '',
        thumbnail_url: contentData.thumbnail_url,
        is_premium: contentData.is_premium || false,
        price: contentData.price || null,
        status: contentData.status || 'published',
        created_at: new Date().toISOString(),
        views_count: contentData.views_count || 0,
        likes_count: contentData.likes_count || 0,
      }
    };
  } catch (err) {
    console.error("Error updating content:", err);
    return { success: false };
  }
};
