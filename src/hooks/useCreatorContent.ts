
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { 
  getCreatorContent, 
  ContentItem, 
  ContentCreateInput, 
  ContentUpdateInput,
  createContent,
  updateContent,
  deleteContent,
  publishContent
} from "@/services/contentService";

export const useCreatorContent = (status?: string) => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchContent = async () => {
      setLoading(true);
      try {
        const data = await getCreatorContent(user.id, 100, status);
        setContent(data);
        setError(null);
      } catch (err) {
        console.error("Error in useCreatorContent:", err);
        setError("Failed to load your content. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [user?.id, status]);
  
  const addContent = async (newContent: ContentCreateInput) => {
    if (!user?.id) return null;
    
    // Ensure creator_id is set
    const contentWithCreator = {
      ...newContent,
      creator_id: user.id
    };
    
    const created = await createContent(contentWithCreator);
    if (created) {
      setContent(prev => [created, ...prev]);
    }
    return created;
  };
  
  const editContent = async (updatedContent: ContentUpdateInput) => {
    const updated = await updateContent(updatedContent);
    if (updated) {
      setContent(prev => 
        prev.map(item => item.id === updated.id ? updated : item)
      );
    }
    return updated;
  };
  
  const removeContent = async (contentId: string) => {
    const success = await deleteContent(contentId);
    if (success) {
      setContent(prev => prev.filter(item => item.id !== contentId));
    }
    return success;
  };
  
  const publishDraft = async (contentId: string) => {
    const published = await publishContent(contentId);
    if (published) {
      setContent(prev => 
        prev.map(item => item.id === published.id ? published : item)
      );
    }
    return published;
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
