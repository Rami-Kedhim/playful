
export interface BoostManagerContainerProps {
  creatorId: string;
  profileCompleteness: number;
  isVerified: boolean;
  rating: number;
  profileCreatedDate: Date;
  country: string;
  role: 'verified' | 'regular' | 'AI';
  lucoinBalance: number;
}
