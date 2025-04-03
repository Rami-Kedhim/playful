
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ContentItem, getCreatorContent } from "@/services/contentService";
import { useContentFilters } from "./useContentFilters";
import { useContentActions } from "./useContentActions";
import { ContentFilters, UseCreatorContentReturn } from "./types";

export const useCreatorContent = (initialFilters: Partial<ContentFilters> = {}): UseCreatorContentReturn => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Get filter functionality
  const { filters, updateFilters, filteredContent } = useContentFilters(initialFilters);
  
  // Get content actions
  const { addContent, editContent, removeContent, publishDraft } = useContentActions(filters, setContent);
  
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
  
  return {
    content: filteredContent(content),
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
