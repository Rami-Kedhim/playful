
// Core System Type Definitions

export interface SystemStatus {
  operational: boolean;
  isActive?: boolean; // Added for UberCore support
  services?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
  };
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  lastReboot?: string;
  // Oxum-specific properties
  performance?: number;
  lastUpdate?: string;
  serviceStatus?: {
    payments: string;
    wallet: string;
    credits: string;
    analytics: string;
    exchange: string;
    boosts: string;
  };
}

export interface SystemIntegrityResult {
  valid: boolean;
  status?: string;
  errors: string[];
  warnings: string[];
  lastChecked: string;
  integrity?: number;
  checks?: {
    database: boolean;
    cache: boolean;
    filesystem: boolean;
    network: boolean;
  }
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  storage: number;
  network: number;
  load: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiresAt: string;
  timestamp?: string; // Added for Orus support
  username?: string;  // Added for UberCore support
}

export interface ModerateContentResult {
  safe?: boolean;
  approved: boolean;
  categories: string[];
  score: number;
  reason?: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  confidence?: number;
}

export interface UberCoreSystem {
  getSystemStatus(): Promise<SystemStatus>;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  validateSession(token: string): Promise<SessionValidationResult>;
  getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
  initialize(): Promise<boolean>;
  getSystemHealth(): Promise<SystemHealthMetrics>;
}
