
export interface SystemStatus {
  operational: boolean;
  isOperational?: boolean;
  performance: number;
  lastUpdate: string;
  serviceStatus: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
    payments: string;
  };
  isActive?: boolean;
  services?: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
    payments: string;
  };
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  lastReboot?: string;
}

export interface SystemIntegrityResult {
  integrity: number;
  overallStatus?: string;
  isValid?: boolean;
  status?: string;
  errors?: string[];
  warnings?: string[];
  lastChecked?: string;
  checks: {
    database: boolean;
    cache: boolean;
    filesystem: boolean;
    network: boolean;
  };
}

export interface OxumSystem {
  initialize(): Promise<void>;
  shutdown(): void;
  getSystemStatus(): SystemStatus;
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(txId: string): Promise<boolean>;
  getExchangeRate(from: string, to: string): Promise<number>;
  boostAllocationEigen(userId: string, boostLevel: number): Promise<number[]>;
  calculateScore(inputs: number[]): Promise<number>;
}

export interface ModerateContentParams {
  content: string;
  type?: 'text' | 'image' | 'video';
  context?: string;
  userId?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe: boolean;
  issues: string[];
  score: number;
}

export interface GenerateContentParams {
  prompt: string;
  type: 'text' | 'image';
  options?: any;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  language?: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
}

export interface LucieAISystem {
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiry: Date;
  username: string;
  timestamp: string;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
  load: number;
}

export interface UberCoreSystem {
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealthMetrics(): SystemHealthMetrics;
  validateSession(sessionId: string): SessionValidationResult;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionType: string;
  actionLink?: string;
  completed: boolean;
  createdAt: string;
}
