
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
import { ContentFilters, UseContentActionsReturn, ContentError } from "./types";

export const useContentActions = (
  filters: ContentFilters, 
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>
): UseContentActionsReturn => {
  const { user } = useAuth();
  
  // Create a security error helper
  const createSecurityError = useCallback((message: string, type: ContentError['type']): ContentError => {
    const error = new Error(message) as ContentError;
    error.type = type;
    return error;
  }, []);
  
  // Validate user permissions
  const validateUserPermissions = useCallback(() => {
    if (!user?.id) {
      throw createSecurityError("User not authenticated", "permission_error");
    }
    return user.id;
  }, [user, createSecurityError]);
  
  // Add new content with enhanced security and validation
  const addContent = useCallback(async (newContent: ContentCreateInput) => {
    const userId = validateUserPermissions();
    
    try {
      // Validate required fields
      if (!newContent.title || !newContent.media_url || !newContent.media_type) {
        throw createSecurityError("Missing required content fields", "validation_error");
      }
      
      const createdContent = await createContent({
        ...newContent,
        creator_id: userId
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
      
      // Create typed error
      const contentError = createSecurityError(
        err instanceof Error ? err.message : "Failed to create content", 
        "create_error"
      );
      contentError.details = err;
      
      throw contentError;
    }
  }, [user?.id, filters.status, setContent, validateUserPermissions, createSecurityError]);
  
  // Edit existing content with security enhancements
  const editContent = useCallback(async (updatedContent: ContentUpdateInput) => {
    validateUserPermissions();
    
    try {
      // Validate content ownership (could be enhanced with a backend check)
      if (updatedContent.creator_id !== user?.id) {
        throw createSecurityError("You can only edit your own content", "permission_error");
      }
      
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
      
      const contentError = createSecurityError(
        err instanceof Error ? err.message : "Failed to update content", 
        "update_error"
      );
      contentError.details = err;
      
      throw contentError;
    }
  }, [user?.id, filters.status, setContent, validateUserPermissions, createSecurityError]);
  
  // Delete content with enhanced security
  const removeContent = useCallback(async (id: string) => {
    validateUserPermissions();
    
    try {
      // Request deletion - server should verify ownership
      await deleteContent(id);
      setContent(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Error deleting content:", err);
      
      const contentError = createSecurityError(
        err instanceof Error ? err.message : "Failed to delete content", 
        "delete_error"
      );
      contentError.details = err;
      
      throw contentError;
    }
  }, [setContent, validateUserPermissions, createSecurityError]);
  
  // Publish a draft with enhanced security
  const publishDraft = useCallback(async (id: string) => {
    validateUserPermissions();
    
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
      
      const contentError = createSecurityError(
        err instanceof Error ? err.message : "Failed to publish content", 
        "update_error"
      );
      contentError.details = err;
      
      throw contentError;
    }
  }, [filters.status, setContent, validateUserPermissions, createSecurityError]);
  
  return {
    addContent,
    editContent,
    removeContent,
    publishDraft
  };
};
