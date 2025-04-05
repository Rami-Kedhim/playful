
export interface BoostStatus {
  isActive: boolean;
  progress: number;
  remainingTime: string;
  expiresAt?: Date;
  boostPackage?: BoostPackage;
}

export interface BoostPackage {
  id: string;
  name: string;
  duration: string;
  price_lucoin: number;
  features?: string[];
}
