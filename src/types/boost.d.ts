export interface BoostPackage {
  id: string;
  name: string;
  description?: string;
  price: number;
  price_lucoin?: number;
  duration: string;
  features?: string[];
  durationMinutes?: number;
  costUBX?: number;
}
