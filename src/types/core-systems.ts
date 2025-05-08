
export interface SystemStatus {
  operational: boolean;
  isActive: boolean;
  services: {
    auth: 'active' | 'inactive' | 'degraded';
    analytics: 'active' | 'inactive' | 'degraded';
    ai: 'active' | 'inactive' | 'degraded';
    wallet: 'active' | 'inactive' | 'degraded';
    seo: 'active' | 'inactive' | 'degraded';
  };
  queueLength: number;
  processing: boolean;
  uptime: number;
  lastReboot: string;
  messageLength?: number; // Add this for UberCore
}

export interface SystemIntegrityResult {
  isValid: boolean;
  status: 'ok' | 'warning' | 'error';
  errors: string[];
  warnings: string[];
  lastChecked: string;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  load: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiry: Date;
  username: string;
  timestamp: string;
  sessionId?: string; // Add this for UberCore
}

export interface UberCoreSystem {
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealthMetrics(): SystemHealthMetrics;
  validateSession(sessionId: string): SessionValidationResult;
}

export interface OxumSystem {
  getSystemStatus(): {
    isOperational: boolean;
    performance: number;
    lastUpdate: string;
  };
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(transactionId: string): Promise<{
    isValid: boolean;
    amount: number;
    currency: string;
    timestamp: string;
  }>;
  getExchangeRate(from: string, to: string): number;
}

// Add missing types
export interface ModerateContentParams {
  content: string;
  userId?: string;
  strictness?: 'low' | 'medium' | 'high';
  contentType?: string;
  type?: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
  actionUrl?: string;
  icon?: string;
  completed?: boolean;
}

// Add analytics types
export interface AnalyticsData {
  views: number;
  additionalViews: number;
  engagementIncrease: number;
  rankingPosition: number;
  conversionRate: number;
  messageRate: number;
  bookingRate: number;
  change?: number;
  withBoost?: number;
  withoutBoost?: number;
  today?: number;
}

// Boost related types
export interface BoostAnalytics extends AnalyticsData {
  // Include AnalyticsData properties plus any additional ones
  boostEfficiency?: number;
  remainingTime?: string;
}

export interface BoostStatus {
  isActive: boolean;
  remainingTime: string;
  packageId?: string;
  expiresAt?: Date;
  startedAt?: Date;
  startTime?: Date;
  endTime?: Date;
  packageName?: string;
  activeBoostId?: string;
  progress?: number;
}

export interface BoostPackage {
  id: string;
  price: number;
  duration: number;
  boostMultiplier?: number;
  features?: string[];
}

export interface PulseBoost {
  id: string;
  price: number;
  price_ubx: number;
  duration: number;
  durationMinutes: number;
  name: string;
  description: string;
  features: string[];
  badgeColor?: string;
  isMostPopular?: boolean;
  boostPackage?: BoostPackage;
}

export interface EnhancedBoostStatus extends BoostStatus {
  boostPackage?: BoostPackage;
}
