
import { useState, useEffect } from "react";
import { fetchCreatorContent, saveContent, updateContent } from "@/services/creator/creatorContentService";
import { CreatorContent } from "@/types/creator";

export const useCreatorContent = (creatorId: string) => {
  const [content, setContent] = useState<CreatorContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [filters, setFilters] = useState<Record<string, any>>({});

  const loadContent = async (page = currentPage, filters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetchCreatorContent(creatorId, page, itemsPerPage, filters);
      setContent(result.data);
      setTotalItems(result.totalCount);
      setCurrentPage(page);
    } catch (err: any) {
      setError(err.message || "Failed to load content");
      console.error("Error loading creator content:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveContent = async (contentData: Partial<CreatorContent>) => {
    const result = await saveContent(creatorId, contentData);
    if (result.success && result.data) {
      // Refresh content list
      loadContent();
      return result.data;
    }
    return null;
  };

  const handleUpdateContent = async (contentId: string, contentData: Partial<CreatorContent>) => {
    const result = await updateContent(contentId, contentData);
    if (result.success) {
      // Update the content in the local state
      setContent(prevContent => 
        prevContent.map(item => 
          item.id === contentId ? { ...item, ...contentData } : item
        )
      );
      return result.data;
    }
    return null;
  };

  useEffect(() => {
    if (creatorId) {
      loadContent(1, filters);
    }
  }, [creatorId, filters]);

  return {
    content,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    setCurrentPage: (page: number) => loadContent(page, filters),
    setFilters: (newFilters: Record<string, any>) => {
      setFilters(newFilters);
      loadContent(1, newFilters);
    },
    saveContent: handleSaveContent,
    updateContent: handleUpdateContent,
    refreshContent: () => loadContent(currentPage, filters)
  };
};
