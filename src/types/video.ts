
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  thumbnail?: string;
  duration: number;
  viewCount: number;
  views: number;
  createdAt: string;
  isPremium: boolean;
  isPublished: boolean;
  escortId: string;
}

// Export the Video interface for direct usage elsewhere
