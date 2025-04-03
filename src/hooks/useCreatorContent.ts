
import { useState, useEffect, useCallback } from "react";
import { fetchCreatorContent, saveContent, updateContent, deleteContent, getContentDetail } from "@/services/creator";
import { CreatorContent } from "@/types/creator";
import { toast } from "@/components/ui/use-toast";

export const useCreatorContent = (creatorId: string) => {
  const [content, setContent] = useState<CreatorContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});
  const [selectedContent, setSelectedContent] = useState<CreatorContent | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const loadContent = useCallback(async (page = currentPage, currentFilters = filters) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchCreatorContent(creatorId, page, itemsPerPage, currentFilters);
      setContent(result.data);
      setTotalItems(result.totalCount);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "Failed to load content");
      console.error("Error loading creator content:", err);
      
      toast({
        title: "Failed to load content",
        description: err.message || "An error occurred while loading your content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [creatorId, currentPage, filters, itemsPerPage]);

  const handleSaveContent = async (contentData: Partial<CreatorContent>) => {
    try {
      const result = await saveContent(creatorId, contentData);
      if (result.success && result.data) {
        // Refresh content list
        loadContent();
        return result.data;
      }
      return null;
    } catch (err) {
      console.error("Error saving content:", err);
      return null;
    }
  };

  const handleUpdateContent = async (contentId: string, contentData: Partial<CreatorContent>) => {
    try {
      const result = await updateContent(contentId, contentData);
      if (result.success && result.data) {
        // Update the content in the local state
        setContent(prevContent => 
          prevContent.map(item => 
            item.id === contentId ? { ...item, ...contentData } : item
          )
        );
        return result.data;
      }
      return null;
    } catch (err) {
      console.error("Error updating content:", err);
      return null;
    }
  };

  const handleDeleteContent = async (contentId: string) => {
    try {
      const result = await deleteContent(contentId);
      if (result.success) {
        // Remove the content from the local state
        setContent(prevContent => 
          prevContent.filter(item => item.id !== contentId)
        );
        return true;
      }
      return false;
    } catch (err) {
      console.error("Error deleting content:", err);
      return false;
    }
  };

  const fetchContentDetail = async (contentId: string) => {
    setLoadingDetail(true);
    try {
      const result = await getContentDetail(contentId);
      if (result.success && result.data) {
        setSelectedContent(result.data);
        return result.data;
      }
      return null;
    } catch (err) {
      console.error("Error fetching content detail:", err);
      return null;
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (creatorId) {
      loadContent(1, filters);
    }
  }, [creatorId, loadContent]); // Don't add filters to dependency array to avoid infinite loops

  return {
    content,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    selectedContent,
    loadingDetail,
    setCurrentPage: (page: number) => loadContent(page, filters),
    setFilters: (newFilters: Record<string, any>) => {
      setFilters(newFilters);
      loadContent(1, newFilters);
    },
    saveContent: handleSaveContent,
    updateContent: handleUpdateContent,
    deleteContent: handleDeleteContent,
    getContentDetail: fetchContentDetail,
    refreshContent: () => loadContent(currentPage, filters)
  };
};

export default useCreatorContent;
