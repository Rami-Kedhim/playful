export interface UserProfile {
  id: string;
  username: string;
  email: string;
  displayName: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  joinedDate: Date;
  lastActive?: Date;
  isVerified: boolean;
  preferences?: Record<string, any>;
  notifications?: Record<string, boolean>;
  website?: string; // Add the missing property
}
