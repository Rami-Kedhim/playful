
export type ContentItemType = "escort" | "creator" | "livecam";

export interface ContentItem {
  id: string;
  title: string;
  image: string;
  type: ContentItemType;
  rating: number;
  price: string | number;
  location?: string;
  featured?: boolean;
}

export interface MediaResource {
  id: string;
  url: string;
  type: 'image' | 'video';
  thumbnail?: string;
  title?: string;
  description?: string;
}

export interface SearchFilters {
  query?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  services?: string[];
  sortBy?: 'price' | 'rating' | 'distance' | 'popularity';
  sortDir?: 'asc' | 'desc';
}
