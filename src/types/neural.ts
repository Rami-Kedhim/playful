
export interface SystemLog {
  message: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error';
}

export interface SystemPerformance {
  processingEfficiency: number;
  processingTrend: 'up' | 'down' | 'stable';
  accuracyRate: number;
  accuracyTrend: 'up' | 'down' | 'stable';
  history: number[];
  recommendations: string[];
}

export interface SystemHealthMetrics {
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface NeuralSystemMetricsResult {
  logs: SystemLog[];
  performance: SystemPerformance;
  refreshMetrics: () => void;
  errorMessage: string | null;
  isLoading: boolean;
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
  healthMetrics?: SystemHealthMetrics;
}

// Add types for date utilities with proper argument counts
export type ContentStatus = 'active' | 'expiring' | 'expired';

export const calculateExpiryDate = (startDate: Date | string, durationDays: number = 180): Date => {
  const date = startDate instanceof Date ? startDate : new Date(startDate);
  return new Date(date.getTime() + durationDays * 24 * 60 * 60 * 1000);
};

export const calculateDaysRemaining = (expiryDate: Date | string): number => {
  const expiry = expiryDate instanceof Date ? expiryDate : new Date(expiryDate);
  const today = new Date();
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const determineContentStatus = (expiryDate: Date | string): ContentStatus => {
  const daysRemaining = calculateDaysRemaining(expiryDate);
  
  if (daysRemaining <= 0) return 'expired';
  if (daysRemaining <= 7) return 'expiring';
  return 'active';
};

export const calculateRenewalCost = (originalPrice: number, discountPercentage: number = 10): number => {
  return originalPrice * (1 - discountPercentage / 100);
};
