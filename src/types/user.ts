
export interface User {
  id: string;
  email?: string;
  username?: string;
  displayName?: string;
  profileImageUrl?: string;
  roles?: string[];
  emailVerified?: boolean;
  phoneVerified?: boolean;
  isVerified?: boolean;
  ubxBalance?: number;
  created_at?: Date | string;
}
