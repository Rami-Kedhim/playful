
export interface EnhancedBoostStatus {
  isActive: boolean;
  packageId?: string;
  activeBoostId?: string;
  startTime?: Date;
  endTime?: Date;
  remainingTime?: string;
  visibilityScore?: number;
  packageName?: string;
}

export interface PulseBoost {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  duration: string;
  visibility: string;
  costUBX: number;
  color?: string;
  badgeColor?: string;
  features: string[];
  visibility_increase: number;
  price: number;
}
