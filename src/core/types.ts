
// Core types for UberCore system

export interface SystemResponse {
  success: boolean;
  message: string;
  timestamp: string;
  data?: any;
}

export interface CoreConfig {
  debug: boolean;
  environment: 'development' | 'staging' | 'production';
  version: string;
  features: {
    boostingEnabled: boolean;
    aiCompanions: boolean;
    metaverseGateway: boolean;
    tokenTransactions: boolean;
  };
}

export interface CoreStatus {
  operational: boolean;
  activeSubsystems: string[];
  version: string;
  uptime: number;
  lastRestart: Date;
  memoryUsage: number;
  errorRate: number;
}

export interface VisibilityScoreParams {
  profileId: string;
  boostFactor: number;
  completeness: number;
  activityLevel: number;
  reviewScore: number;
  verificationLevel: number;
  contentQuality: number;
}

export interface FlowDynamicsRequest {
  userId: string;
  targetProfileId: string;
  sourceType: string;
  actionType: string;
  metadata?: Record<string, any>;
}

export interface FlowDynamicsResponse {
  recommended: boolean;
  score: number;
  factors: Record<string, number>;
  recommendations: string[];
}

export interface SessionData {
  userId: string;
  sessionId: string;
  roles: string[];
  permissions: string[];
  expiresAt: Date;
  fingerprint: string;
  deviceId: string;
}
