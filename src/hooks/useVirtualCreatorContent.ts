import { useState, useEffect, useCallback } from "react";
import { ContentType } from "./useVirtualContent";
import { logContentAction, logContentError } from "@/utils/debugUtils";

interface VirtualContentItem {
  id: string;
  creatorId: string;
  type: ContentType;
  price: number;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

interface ContentResponse {
  loading: boolean;
  error: string | null;
  content: VirtualContentItem[];
  hasMore: boolean;
  loadMore: () => void;
  refreshContent: () => void;
}

export const useVirtualCreatorContent = (creatorId: string, initialLimit = 6): ContentResponse => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [content, setContent] = useState<VirtualContentItem[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [limit, setLimit] = useState(initialLimit);

  const fetchVirtualContent = useCallback(async (creatorId: string, limit: number) => {
    setLoading(true);
    setError(null);
    
    try {
      logContentAction('Fetching virtual content', { creatorId, limit });
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
        },
        {
          id: `${creatorId}-photo-3`,
          creatorId,
          type: "photo",
          price: 7,
          thumbnailUrl: "https://picsum.photos/seed/photo3/400/400",
          title: "Exclusive Photo 3",
          description: "More premium content"
        },
        {
          id: `${creatorId}-video-2`,
          creatorId,
          type: "video",
          price: 20,
          thumbnailUrl: "https://picsum.photos/seed/video2/400/400",
          title: "Behind the Scenes",
          description: "See how the magic happens"
        },
        {
          id: `${creatorId}-message-2`,
          creatorId,
          type: "message",
          price: 12,
          title: "Secret Message",
          description: "For your eyes only"
        },
        {
          id: `${creatorId}-photo-4`,
          creatorId,
          type: "photo",
          price: 9,
          thumbnailUrl: "https://picsum.photos/seed/photo4/400/400",
          title: "Exclusive Photo 4",
          description: "Limited edition content"
        }
      ];
      
      // Return only the number of items requested
      const limitedContent = mockContent.slice(0, limit);
      setHasMore(limitedContent.length < mockContent.length);
      setContent(limitedContent);
      logContentAction('Fetched virtual content', { count: limitedContent.length, hasMore: limitedContent.length < mockContent.length });
    } catch (err: any) {
      console.error("Error fetching virtual content:", err);
      logContentError('Fetching virtual content', err);
      setError(err.message || "Failed to load content");
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    if (creatorId) {
      fetchVirtualContent(creatorId, limit);
    }
  }, [creatorId, limit, fetchVirtualContent]);

  const loadMore = useCallback(() => {
    logContentAction('Loading more content', { currentLimit: limit, newLimit: limit + initialLimit });
    setLimit(prevLimit => prevLimit + initialLimit);
  }, [limit, initialLimit]);

  const refreshContent = useCallback(() => {
    logContentAction('Refreshing content', { creatorId, limit });
    fetchVirtualContent(creatorId, limit);
  }, [creatorId, limit, fetchVirtualContent]);
  
  return {
    loading,
    error,
    content,
    hasMore,
    loadMore,
    refreshContent
  };
};

export default useVirtualCreatorContent;
