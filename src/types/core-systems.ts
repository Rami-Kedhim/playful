
// Core system type definitions

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
