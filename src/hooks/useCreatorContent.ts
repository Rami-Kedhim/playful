
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ContentItem, 
  ContentCreateInput,
  ContentUpdateInput,
  getCreatorContent,
  createContent,
  updateContent,
  deleteContent,
  publishContent
} from "@/services/contentService";

type ContentStatus = "published" | "draft" | "scheduled";
type SortOption = "newest" | "oldest" | "title_asc" | "title_desc" | "most_viewed" | "least_viewed";

interface ContentFilters {
  status: ContentStatus;
  searchQuery: string;
  contentType?: string;
  sort: SortOption;
}

export const useCreatorContent = (initialFilters: Partial<ContentFilters> = {}) => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<ContentFilters>({
    status: initialFilters.status || "published",
    searchQuery: initialFilters.searchQuery || "",
    contentType: initialFilters.contentType,
    sort: initialFilters.sort || "newest"
  });
  
  // Fetch content on mount and when dependencies change
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getCreatorContent(user.id, 100, filters.status);
        setContent(result);
      } catch (err) {
        console.error("Error fetching creator content:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch content"));
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [user?.id, filters.status]);
  
  // Add new content
  const addContent = async (newContent: ContentCreateInput) => {
    if (!user?.id) throw new Error("User not authenticated");
    
    try {
      const createdContent = await createContent({
        ...newContent,
        creator_id: user.id
      });
      
      if (createdContent) {
        // Only update state if the created content matches the current status filter
        if (createdContent.status === filters.status) {
          setContent(prev => [createdContent, ...prev]);
        }
        return createdContent;
      }
    } catch (err) {
      console.error("Error adding content:", err);
      throw err;
    }
  };
  
  // Edit existing content
  const editContent = async (updatedContent: ContentUpdateInput) => {
    if (!user?.id) throw new Error("User not authenticated");
    
    try {
      const result = await updateContent(updatedContent);
      
      if (result) {
        // If status changed, we might need to remove it from the current view
        if (result.status !== filters.status) {
          setContent(prev => prev.filter(item => item.id !== result.id));
        } else {
          // Update the item in the current view
          setContent(prev => 
            prev.map(item => item.id === result.id ? result : item)
          );
        }
        return result;
      }
    } catch (err) {
      console.error("Error updating content:", err);
      throw err;
    }
  };
  
  // Delete content
  const removeContent = async (id: string) => {
    try {
      await deleteContent(id);
      setContent(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
      throw err;
    }
  };
  
  // Publish a draft
  const publishDraft = async (id: string) => {
    try {
      const published = await publishContent(id);
      
      if (published) {
        // If we're viewing drafts, remove the published item
        if (filters.status === "draft") {
          setContent(prev => prev.filter(item => item.id !== id));
        } 
        // If we're viewing published, add the published item
        else if (filters.status === "published") {
          setContent(prev => [published, ...prev]);
        }
        return published;
      }
    } catch (err) {
      console.error("Error publishing content:", err);
      throw err;
    }
  };
  
  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ContentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Get filtered content
  const filteredContent = useCallback(() => {
    let result = [...content];
    
    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      result = result.filter(item => 
        item.title.toLowerCase().includes(query) || 
        (item.description && item.description.toLowerCase().includes(query))
      );
    }
    
    // Filter by content type
    if (filters.contentType) {
      result = result.filter(item => item.media_type === filters.contentType);
    }
    
    // Sort content
    switch (filters.sort) {
      case "newest":
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      case "oldest":
        result.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        break;
      case "title_asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title_desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "most_viewed":
        result.sort((a, b) => (b.views_count || 0) - (a.views_count || 0));
        break;
      case "least_viewed":
        result.sort((a, b) => (a.views_count || 0) - (b.views_count || 0));
        break;
      default:
        break;
    }
    
    return result;
  }, [content, filters]);
  
  return {
    content: filteredContent(),
    loading,
    error,
    filters,
    updateFilters,
    addContent,
    editContent,
    removeContent,
    publishDraft
  };
};
