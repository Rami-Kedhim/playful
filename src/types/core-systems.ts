
// Core System Types

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  icon?: string;
  actionType: 'link' | 'function' | 'dialog';
  action: string | (() => void);
  priority: number;
  context?: Record<string, any>;
  isCompleted?: boolean;
  isHidden?: boolean;
}

export interface SystemStatus {
  operational: boolean;
  latency: number;
  aiModels: {
    conversation: string;
    generation: string;
    analysis: string;
  };
  lastUpdated: Date;
  metrics?: {
    responseTime?: number;
    activeSessions?: number;
    processingLoad?: number;
  };
}

export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  conversionRate: number;
  averageSessionTime: number;
  peakUserTime?: string;
  apiRequestsPerMinute?: number;
  errorRate?: number;
}
