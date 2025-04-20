import { supabase } from "@/integrations/supabase/client";
import { CreatorContent } from "@/types/creator";
import { uploadFile } from "@/services/storageService";

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
      creatorId: creatorId,
      title: `Content ${index + 1}`,
      description: index % 3 === 0 ? `Description for content ${index + 1}` : undefined,
      contentType: index % 2 === 0 ? 'video' : 'image',
      url: `https://example.com/content/${index + 1}`,
      thumbnailUrl: `https://picsum.photos/seed/content${index + 1}/400/300`,
      isPremium: index % 3 === 0,
      price: index % 3 === 0 ? (index + 1) * 5 : null,
      status: index % 5 === 0 ? 'draft' : 'published',
      createdAt: new Date(Date.now() - index * 86400000).toISOString(),
      viewCount: Math.floor(Math.random() * 1000),
      likeCount: Math.floor(Math.random() * 100),
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
    
    if (filters.contentType) {
      filteredContent = filteredContent.filter(item => 
        item.contentType === filters.contentType
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
    
    // Use the storage service to upload the file
    const result = await uploadFile(file, 'creator-content', `${creatorId}`);
    
    if (!result.success) {
      throw new Error(result.error || "Failed to upload file");
    }
    
    // Return successful response with the file URL
    return {
      success: true,
      data: {
        url: result.url || '',
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
      creatorId: creatorId,
      title: contentData.title || 'Untitled',
      description: contentData.description,
      contentType: contentData.content_type || 'image',
      url: contentData.url || '',
      thumbnailUrl: contentData.thumbnail_url,
      isPremium: contentData.is_premium || false,
      price: contentData.price || null,
      status: contentData.status || 'draft',
      createdAt: new Date().toISOString(),
      viewCount: 0,
      likeCount: 0,
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
        creatorId: contentData.creatorId || 'default-creator',
        title: contentData.title || 'Untitled',
        description: contentData.description,
        contentType: contentData.content_type || 'image',
        url: contentData.url || '',
        thumbnailUrl: contentData.thumbnail_url,
        isPremium: contentData.is_premium || false,
        price: contentData.price || null,
        status: contentData.status || 'published',
        createdAt: new Date().toISOString(),
        viewCount: contentData.viewCount || 0,
        likeCount: contentData.likeCount || 0,
      }
    };
  } catch (err) {
    console.error("Error updating content:", err);
    return { success: false };
  }
};

export const deleteContent = async (
  contentId: string
): Promise<{ success: boolean }> => {
  try {
    // In a real application, this would be a Supabase delete
    // For now, we'll mock a successful deletion
    
    return {
      success: true
    };
  } catch (err) {
    console.error("Error deleting content:", err);
    return { success: false };
  }
};

export const getContentDetail = async (
  contentId: string
): Promise<{ success: boolean; data?: CreatorContent }> => {
  try {
    // In a real application, this would be a Supabase query
    // For now, we'll mock a response
    
    const mockContent: CreatorContent = {
      id: contentId,
      creatorId: `creator-${Date.now()}`,
      title: `Content Detail ${contentId}`,
      description: `Detailed description for content ${contentId}`,
      contentType: Math.random() > 0.5 ? 'video' : 'image',
      url: `https://example.com/content/${contentId}`,
      thumbnailUrl: `https://picsum.photos/seed/content${contentId}/400/300`,
      isPremium: Math.random() > 0.7,
      price: Math.random() > 0.7 ? Math.floor(Math.random() * 50) + 5 : null,
      status: Math.random() > 0.2 ? 'published' : 'draft',
      createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000).toISOString(),
      viewCount: Math.floor(Math.random() * 1000),
      likeCount: Math.floor(Math.random() * 100),
    };
    
    return {
      success: true,
      data: mockContent
    };
  } catch (err) {
    console.error("Error fetching content detail:", err);
    return { success: false };
  }
};
