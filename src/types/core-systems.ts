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
