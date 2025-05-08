
// Define missing content types
export interface ContentItem {
  id: string;
  title: string;
  description?: string;
  type: string;
  url?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName?: string;
  isPublic: boolean;
  price?: number;
  viewCount?: number;
  likeCount?: number;
}

export enum ContentType {
  VIDEO = 'video',
  IMAGE = 'image',
  AUDIO = 'audio',
  TEXT = 'text',
  PDF = 'pdf',
  LIVESTREAM = 'livestream'
}

export interface ContentUnlockOptions {
  price?: number;
  subscription?: boolean;
  freePreview?: boolean;
  expiryDate?: string;
  allowedViews?: number;
}

export interface VirtualContent {
  id: string;
  type: ContentType;
  title: string;
  description: string;
  thumbnailUrl?: string;
  url?: string;
  price?: number;
  isLocked: boolean;
  unlockOptions?: ContentUnlockOptions;
  creatorId: string;
  creatorName?: string;
  createdAt: string;
  tags?: string[];
  metadata?: Record<string, any>;
}
