
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  name: string;
  isVerified?: boolean;
  createdAt: string;
}

export interface UserProfile {
  id: string | number;
  userId?: string | number;
  email?: string;
  name: string;
  avatar_url?: string;
  location?: string;
  bio?: string;
  verified?: boolean;
  website?: string;
  phone?: string;
  phone_number?: string;
}
