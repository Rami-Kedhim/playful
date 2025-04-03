
import { ReactNode } from "react";

export interface CommentUser {
  id: string;
  name: string;
  avatar: string;
}

export interface Comment {
  id: string;
  user: CommentUser;
  content: string;
  contentId: string;
  contentTitle: string;
  createdAt: Date;
  likes: number;
  isLiked: boolean;
  isFlagged: boolean;
}

export type CommentFilterType = 'all' | 'flagged' | 'liked';
