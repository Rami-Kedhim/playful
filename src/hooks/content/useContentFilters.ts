
import { useState, useCallback, useMemo } from "react";
import { ContentItem } from "@/services/contentService";
import { ContentFilters, UseContentFiltersReturn, SortOption } from "./types";

export const useContentFilters = (initialFilters: Partial<ContentFilters> = {}): UseContentFiltersReturn => {
  const [filters, setFilters] = useState<ContentFilters>({
    status: initialFilters.status || "published",
    searchQuery: initialFilters.searchQuery || "",
    contentType: initialFilters.contentType,
    sort: initialFilters.sort || "newest"
  });
  
  // Update filters
  const updateFilters = useCallback((newFilters: Partial<ContentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);
  
  // Apply filters and sorting to content
  const filteredContent = useCallback((content: ContentItem[]) => {
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
  }, [filters]);
  
  return {
    filters,
    updateFilters,
    filteredContent
  };
};
