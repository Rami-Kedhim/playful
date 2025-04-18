
export interface Video {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  duration: number;
  viewCount: number;
  views: number;
  createdAt: string;
  isPremium: boolean;
  isPublished: boolean;
  escortId: string;
}
