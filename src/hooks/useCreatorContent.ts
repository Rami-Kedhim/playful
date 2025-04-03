
import { useState, useEffect } from "react";
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

export const useCreatorContent = (status: ContentStatus = "published") => {
  const { user } = useAuth();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Fetch content on mount and when dependencies change
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await getCreatorContent(user.id, 100, status);
        setContent(result);
      } catch (err) {
        console.error("Error fetching creator content:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch content"));
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [user?.id, status]);
  
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
        if (createdContent.status === status) {
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
        if (result.status !== status) {
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
        if (status === "draft") {
          setContent(prev => prev.filter(item => item.id !== id));
        } 
        // If we're viewing published, add the published item
        else if (status === "published") {
          setContent(prev => [published, ...prev]);
        }
        return published;
      }
    } catch (err) {
      console.error("Error publishing content:", err);
      throw err;
    }
  };
  
  return {
    content,
    loading,
    error,
    addContent,
    editContent,
    removeContent,
    publishDraft
  };
};
