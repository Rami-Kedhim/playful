
export interface Video {
  id: string;
  url: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  title?: string;
  duration?: number;
  viewCount?: number;
  createdAt?: string;
  isPremium?: boolean;
  views?: number;
  isPublished?: boolean;
  escortId?: string;
  videoUrl?: string;
}

export default Video;
