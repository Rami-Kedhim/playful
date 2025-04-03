
import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ContentItem, getCreatorContent } from "@/services/contentService";
import { useContentFilters } from "./useContentFilters";
import { useContentActions } from "./useContentActions";
import { ContentFilters, UseCreatorContentReturn, ContentError } from "./types";

// Cache timeouts in milliseconds
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useCreatorContent = (initialFilters: Partial<ContentFilters> = {}): UseCreatorContentReturn => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ContentError | null>(null);
  
  // Add cache timestamp
  const cacheTimestamp = useRef<number>(0);
  const isMounted = useRef(true);
  
  // Get filter functionality
  const { filters, updateFilters, filteredContent } = useContentFilters(initialFilters);
  
  // Get content actions
  const { addContent, editContent, removeContent, publishDraft } = useContentActions(filters, setContent);
  
  // Create a function to check if we should bypass cache
  const shouldFetchData = useCallback((forceRefresh = false) => {
    if (forceRefresh) return true;
    const now = Date.now();
    return now - cacheTimestamp.current > CACHE_DURATION;
  }, []);
  
  // Fetch content with enhanced caching and error handling
  const fetchContent = useCallback(async (forceRefresh = false) => {
    if (!user?.id) {
      const authError = new Error("User not authenticated") as ContentError;
      authError.type = "permission_error";
      setError(authError);
      return;
    }
    
    // Check if we can use cached data
    if (!shouldFetchData(forceRefresh) && content.length > 0) {
      console.log("Using cached content data");
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching creator content with status: ${filters.status}`);
      const result = await getCreatorContent(user.id, 100, filters.status);
      
      // Update only if component is still mounted
      if (isMounted.current) {
        setContent(result);
        cacheTimestamp.current = Date.now();
      }
    } catch (err) {
      console.error("Error fetching creator content:", err);
      
      if (isMounted.current) {
        const fetchError = new Error(
          err instanceof Error ? err.message : "Failed to fetch content"
        ) as ContentError;
        fetchError.type = "fetch_error";
        fetchError.details = err;
        setError(fetchError);
      }
    } finally {
      if (isMounted.current) {
        setLoading(false);
      }
    }
  }, [user?.id, filters.status, content.length, shouldFetchData]);
  
  // Exposed refresh method
  const refresh = useCallback(async () => {
    await fetchContent(true);
  }, [fetchContent]);
  
  // Fetch content on mount and when dependencies change
  useEffect(() => {
    fetchContent();
    
    // Cleanup function
    return () => {
      isMounted.current = false;
    };
  }, [user?.id, filters.status, fetchContent]);
  
  // Reset isMounted ref on component mount
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  
  return {
    content: filteredContent(content),
    loading,
    error,
    filters,
    updateFilters,
    filteredContent,
    addContent,
    editContent,
    removeContent,
    publishDraft,
    refresh
  };
};
