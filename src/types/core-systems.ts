
// Core systems type definitions

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  type: string;
  priority: number;
  status: string;
  createdAt: Date;
  actionUrl?: string;
  completedAt?: Date;
  icon?: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  action: string;
  timestamp: Date;
  details?: Record<string, any>;
}

export interface SystemMetrics {
  systemHealth: number;
  activeUsers: number;
  responseTime: number;
  errorRate: number;
  lastUpdated: Date;
}

export interface AnalyticsData {
  views: number;
  impressions: {
    value: number;
    change?: number;
    withBoost?: number;
  };
  interactions: {
    value: number;
    change?: number;
  };
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
}

// System health and integrity types
export interface SystemStatus {
  operational: boolean;
  status: 'operational' | 'degraded' | 'offline';
  latency: number;
  lastCheck: Date;
}

export interface SystemIntegrityResult {
  valid: boolean;
  warnings: string[];
  errors: string[];
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  overallHealth: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string | null;
  expiry: Date | null;
  reason?: string;
}
