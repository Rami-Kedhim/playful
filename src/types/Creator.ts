
import { VerificationLevel } from './verification';

export interface Creator {
  id: string;
  name: string;
  bio?: string;
  avatarUrl?: string;
  location?: string;
  rating?: number;
  services?: string[];
  verificationLevel?: VerificationLevel;
  isVerified?: boolean;
  tags?: string[];
  rates?: Record<string, number>;
  price?: number;
  responseRate?: number;
}
