
export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
  ESCORT = 'escort',
  CREATOR = 'creator',
  MODERATOR = 'moderator',
  AI = 'ai'
}

export interface User {
  id: string;
  name?: string;
  email: string;
  role: UserRole;
}

export interface UserProfile {
  id: string;
  userId: string;
  displayName?: string;
  bio?: string;
  location?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}
