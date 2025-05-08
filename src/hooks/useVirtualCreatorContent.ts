import { useState, useEffect } from 'react';
import { ContentType, ContentItem } from '@/types/content';

interface VirtualCreatorContent {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  contentType: ContentType;
  creatorId: string;
  price: number;
  likes: number;
  views: number;
}

export function useVirtualCreatorContent(creatorId?: string) {
  const [content, setContent] = useState<VirtualCreatorContent[]>([
    // Mock content data
    {
      id: "content-1",
      title: "Exclusive Photoshoot",
      description: "Behind the scenes of my latest photoshoot",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.PHOTO,
      creatorId: "creator-1",
      price: 5,
      likes: 120,
      views: 450
    },
    {
      id: "content-2",
      title: "Beach Day Vibes",
      description: "Fun day at the beach",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.PHOTO,
      creatorId: "creator-1",
      price: 3,
      likes: 89,
      views: 320
    },
    {
      id: "content-3",
      title: "Workout Routine Video",
      description: "My daily workout routine",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.VIDEO,
      creatorId: "creator-1",
      price: 10,
      likes: 210,
      views: 780
    },
    {
      id: "content-4",
      title: "Exclusive Message",
      description: "Personal message just for you",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.MESSAGE,
      creatorId: "creator-1",
      price: 2,
      likes: 67,
      views: 150
    },
    {
      id: "content-5",
      title: "Evening Photoshoot",
      description: "Sunset vibes",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.PHOTO,
      creatorId: "creator-2",
      price: 7,
      likes: 145,
      views: 520
    },
    {
      id: "content-6",
      title: "Travel Vlog",
      description: "My trip to Paris",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.VIDEO,
      creatorId: "creator-2",
      price: 12,
      likes: 230,
      views: 890
    },
    {
      id: "content-7",
      title: "Secret Message",
      description: "Special content just for subscribers",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.MESSAGE,
      creatorId: "creator-2",
      price: 5,
      likes: 82,
      views: 180
    },
    {
      id: "content-8",
      title: "Night Out Photos",
      description: "Photos from last weekend",
      thumbnailUrl: "https://via.placeholder.com/300x200",
      contentType: ContentType.PHOTO,
      creatorId: "creator-2",
      price: 4,
      likes: 95,
      views: 340
    }
  ]);

  // Filter content by creator ID if provided
  const filteredContent = creatorId 
    ? content.filter(item => item.creatorId === creatorId)
    : content;

  return {
    content: filteredContent,
    totalItems: filteredContent.length,
    totalViews: filteredContent.reduce((sum, item) => sum + item.views, 0),
    totalLikes: filteredContent.reduce((sum, item) => sum + item.likes, 0)
  };
}
