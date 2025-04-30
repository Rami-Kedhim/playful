
import { BoostStatus } from './boost';

export interface PulseBoost {
  id: string;
  name: string;
  description?: string;
  durationMinutes?: number;
  duration: string;
  visibility: string;
  costUBX: number;
  color?: string;
  badgeColor?: string;
  features: string[];
  visibility_increase: number;
  price: number;
}

export interface EnhancedBoostStatus extends BoostStatus {
  activeBoostId?: string;
}
