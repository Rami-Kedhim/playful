
export interface AIProfile {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  tags?: string[];
  abilities?: string[];
  pricing?: {
    hourly?: number;
    message?: number;
  };
  rating?: number;
  reviewCount?: number;
  online?: boolean;
  categories?: string[];
}
