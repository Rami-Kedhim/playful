
export enum ContentType {
  PHOTO = "photo",
  VIDEO = "video",
  MESSAGE = "message",
  AUDIO = "audio",
  STORY = "story",
  LIVESTREAM = "livestream"
}

export interface VirtualContent {
  id: string;
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  contentUrl?: string;
  type: ContentType;
  price: number;
  creatorId: string;
  unlocked?: boolean;
}

export interface ContentUnlockOptions {
  creatorId: string;
  contentId: string;
  contentType: ContentType;
  price: number;
}

export interface ContentCreator {
  id: string;
  name: string;
  username: string;
  bio?: string;
  avatarUrl?: string;
  isVerified?: boolean;
  isOnline?: boolean;
  rating?: number;
  tags?: string[];
}
