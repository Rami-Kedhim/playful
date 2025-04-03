
import { useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  ContentItem, 
  ContentCreateInput,
  ContentUpdateInput,
  createContent,
  updateContent,
  deleteContent,
  publishContent
} from "@/services/contentService";
import { ContentFilters, UseContentActionsReturn } from "./types";

export const useContentActions = (
  filters: ContentFilters, 
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>
): UseContentActionsReturn => {
  const { user } = useAuth();
  
  // Add new content
  const addContent = useCallback(async (newContent: ContentCreateInput) => {
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
  }, [user?.id, filters.status, setContent]);
  
  // Edit existing content
  const editContent = useCallback(async (updatedContent: ContentUpdateInput) => {
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
  }, [user?.id, filters.status, setContent]);
  
  // Delete content
  const removeContent = useCallback(async (id: string) => {
    try {
      await deleteContent(id);
      setContent(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
      throw err;
    }
  }, [setContent]);
  
  // Publish a draft
  const publishDraft = useCallback(async (id: string) => {
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
  }, [filters.status, setContent]);
  
  return {
    addContent,
    editContent,
    removeContent,
    publishDraft
  };
};
