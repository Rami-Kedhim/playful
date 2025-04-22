
export interface BoostManagerContainerProps {
  profileId?: string;
  creatorId?: string;
  profileCompleteness?: number;
  isVerified?: boolean;
  rating?: number;
  profileCreatedDate?: Date;
  country?: string;
  role?: 'verified' | 'regular' | 'AI';
  ubxBalance?: number;
}
