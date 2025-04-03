
import { useState, useEffect } from "react";
import { ContentType } from "./useVirtualContent";

interface VirtualContentItem {
  id: string;
  creatorId: string;
  type: ContentType;
  price: number;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

export const useVirtualCreatorContent = (creatorId: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<VirtualContentItem[]>([]);

  useEffect(() => {
    const fetchVirtualContent = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real implementation, this would be a fetch call to your API
        // For now, we'll mock data based on the creatorId
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
        
        // Mock data
        const mockContent: VirtualContentItem[] = [
          {
            id: `${creatorId}-photo-1`,
            creatorId,
            type: "photo",
            price: 5,
            thumbnailUrl: "https://picsum.photos/seed/photo1/400/400",
            title: "Exclusive Photo 1",
            description: "Special content just for you"
          },
          {
            id: `${creatorId}-photo-2`,
            creatorId,
            type: "photo",
            price: 8,
            thumbnailUrl: "https://picsum.photos/seed/photo2/400/400",
            title: "Exclusive Photo 2",
            description: "Premium content"
          },
          {
            id: `${creatorId}-video-1`,
            creatorId,
            type: "video",
            price: 15,
            thumbnailUrl: "https://picsum.photos/seed/video1/400/400",
            title: "Private Video",
            description: "Exclusive video content"
          },
          {
            id: `${creatorId}-message-1`,
            creatorId,
            type: "message",
            price: 10,
            title: "Personal Message",
            description: "Unlock this special message from me"
          }
        ];
        
        setContent(mockContent);
      } catch (err: any) {
        console.error("Error fetching virtual content:", err);
        setError(err.message || "Failed to load content");
      } finally {
        setLoading(false);
      }
    };
    
    if (creatorId) {
      fetchVirtualContent();
    }
  }, [creatorId]);
  
  return {
    loading,
    error,
    content
  };
};

export default useVirtualCreatorContent;
