
export interface AuthUser {
  id: string;
  email?: string;
  avatar_url?: string;
  avatarUrl?: string;
  profileImageUrl?: string;
  username?: string;
  role?: UserRole;
  roles?: UserRole[];
  user_metadata?: Record<string, any>;
  lucoinsBalance?: number;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  MODERATOR = "moderator",
  ESCORT = "escort",
  CONTENT_CREATOR = "content_creator",
  PREMIUM = "premium"
}

export enum DatabaseGender {
  MALE = "male",
  FEMALE = "female",
  NON_BINARY = "non_binary",
  OTHER = "other",
  PREFER_NOT_TO_SAY = "prefer_not_to_say"
}

export interface UserProfile {
  id?: string;
  email?: string;
  name?: string;
  avatar_url?: string;
  phone_number?: string;
  location?: string;
  bio?: string;
  is_escort?: boolean;
  created_at?: string;
  updated_at?: string;
  username?: string;
  full_name?: string;
  gender?: DatabaseGender;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  error?: string;
  user?: AuthUser;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username?: string;
  fullName?: string;
  inviteCode?: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

export interface UpdatePasswordCredentials {
  oldPassword: string;
  newPassword: string;
}
