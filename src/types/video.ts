
export interface Video {
  id: string;
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  views: number;
  viewCount?: number; // For compatibility
  isPublished: boolean;
  isPremium: boolean;
  escortId: string;
  creatorId?: string;
  createdAt: string | Date;
  updatedAt?: string | Date;
  tags?: string[];
  categories?: string[];
}
