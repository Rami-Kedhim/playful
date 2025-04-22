
import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/auth';
import { useUBX } from '@/hooks/useUBX';

interface VirtualContent {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  contentUrl: string;
  price: number;
  creatorId: string;
  createdAt: string;
  contentType: string;
  isOwned?: boolean;
}

export const useVirtualContent = (contentId?: string) => {
  const [content, setContent] = useState<VirtualContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const { processTransaction } = useUBX();
  
  useEffect(() => {
    if (!contentId) {
      setLoading(false);
      return;
    }
    
    const fetchContent = async () => {
      try {
        setLoading(true);
        
        // In a real implementation, this would fetch from Supabase or an API
        // For now, use mock data
        setTimeout(() => {
          const mockContent: VirtualContent = {
            id: contentId,
            title: "Virtual Experience Demo",
            description: "A sample virtual content experience",
            thumbnailUrl: "https://placehold.co/600x400",
            contentUrl: "https://example.com/virtual-content",
            price: 50,
            creatorId: "creator-123",
            createdAt: new Date().toISOString(),
            contentType: "virtual_experience", 
            isOwned: Math.random() > 0.5
          };
          
          setContent(mockContent);
          setLoading(false);
        }, 800);
        
      } catch (err: any) {
        console.error("Error fetching virtual content:", err);
        setError(err.message || "Failed to load content");
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [contentId]);
  
  const purchaseContent = async (): Promise<boolean> => {
    if (!content || !user) return false;
    
    try {
      setLoading(true);
      
      // Process UBX transaction
      const result = await processTransaction({
        amount: content.price,
        type: 'debit',
        description: `Purchased virtual content: ${content.title}`
      });
      
      if (result) {
        // Update local state to mark content as owned
        setContent(prev => prev ? {...prev, isOwned: true} : null);
        return true;
      }
      
      return false;
    } catch (err: any) {
      console.error("Error purchasing content:", err);
      setError(err.message || "Failed to purchase content");
      return false;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    content,
    loading,
    error,
    isOwned: content?.isOwned || false,
    purchaseContent
  };
};

export default useVirtualContent;
