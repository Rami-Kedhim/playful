
import { useState, useCallback, useMemo } from "react";
import { ContentItem } from "@/services/contentService";
import { ContentFilters, UseContentFiltersReturn, SortOption, contentFiltersSchema } from "./types";

export const useContentFilters = (initialFilters: Partial<ContentFilters> = {}): UseContentFiltersReturn => {
  // Validate and set default filters
  const validatedInitialFilters = useMemo(() => {
    const defaultFilters: ContentFilters = {
      status: "published",
      searchQuery: "",
      contentType: undefined,
      sort: "newest"
    };
    
    // Create a complete ContentFilters object with explicitly defined values
    const completeFilters: ContentFilters = {
      status: initialFilters.status !== undefined ? initialFilters.status : defaultFilters.status,
      searchQuery: initialFilters.searchQuery !== undefined ? initialFilters.searchQuery : defaultFilters.searchQuery,
      contentType: initialFilters.contentType,
      sort: initialFilters.sort !== undefined ? initialFilters.sort : defaultFilters.sort
    };
    
    try {
      return contentFiltersSchema.parse(completeFilters);
    } catch (error) {
      console.warn("Invalid filter format, using defaults:", error);
      return defaultFilters;
    }
  }, [initialFilters]);
  
  const [filters, setFilters] = useState<ContentFilters>(validatedInitialFilters);
  
  // Update filters with validation
  const updateFilters = useCallback((newFilters: Partial<ContentFilters>) => {
    setFilters(prev => {
      // We need to ensure we return a properly typed ContentFilters object
      const updatedFilters: ContentFilters = {
        status: newFilters.status !== undefined ? newFilters.status : prev.status,
        searchQuery: newFilters.searchQuery !== undefined ? newFilters.searchQuery : prev.searchQuery,
        contentType: newFilters.contentType !== undefined ? newFilters.contentType : prev.contentType,
        sort: newFilters.sort !== undefined ? newFilters.sort : prev.sort
      };
      
      try {
        return contentFiltersSchema.parse(updatedFilters);
      } catch (error) {
        console.warn("Invalid filter update:", error);
        return prev;
      }
    });
  }, []);
  
  // Apply filters and sorting to content with improved memoization
  const filteredContent = useCallback((content: ContentItem[]) => {
    // Create a memoization cache key based on filters and content length
    const cacheKey = `${filters.status}-${filters.searchQuery}-${filters.contentType}-${filters.sort}-${content.length}`;
    
    return useMemo(() => {
      console.log("Recalculating filtered content");
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
    }, [content, cacheKey]); // Dependency on the cache key for efficient memoization
  }, [filters]);
  
  return {
    filters,
    updateFilters,
    filteredContent
  };
};
