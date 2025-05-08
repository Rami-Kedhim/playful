
// Core systems types

export interface ModerateContentParams {
  content: string;
  strictness?: 'low' | 'medium' | 'high';
  contentType?: string;
  userId?: string;
}

export interface ModerateContentResult {
  moderated: boolean;
  safe?: boolean;
  flags?: string[];
  reason?: string;
  score?: number;
}

export interface GenerateContentParams {
  prompt: string;
  length?: number;
  style?: string;
  parameters?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings: string[];
  usage?: {
    tokens: number;
    cost: number;
  };
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number;
  score: number;
  entities?: {
    name: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }[];
}

export interface SystemStatus {
  operational: boolean;
  isActive?: boolean;
  status?: string;
  services?: Record<string, string>;
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  performance?: number;
  lastUpdate?: string;
  lastReboot?: string;
  serviceStatus?: Record<string, boolean>;
}

export interface SystemIntegrityResult {
  valid: boolean;
  status?: string;
  errors: string[];
  warnings: string[];
  lastChecked: string;
  integrity?: number;
  checks?: Record<string, boolean>;
}

export interface SystemHealthMetrics {
  cpu: number;
  memory: number;
  storage?: number;
  disk?: number;
  network: number;
  load: number;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiresAt: string;
  username?: string;
  timestamp: string;
}

export interface UberCoreSystem {
  getSystemStatus(): Promise<SystemStatus>;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
  validateSession(token: string): Promise<SessionValidationResult>;
  initialize(): Promise<boolean>;
  getSystemHealth(): Promise<Record<string, number>>;
}

export interface LucieAISystem {
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  getSystemStatus(): Promise<SystemStatus>;
  recommendActions(userId: string, context: string): Promise<RecommendedAction[]>;
}

export interface OxumSystem {
  checkSystemStatus(): SystemStatus;
  getSystemStatus(): Promise<SystemStatus>;
  boostAllocationEigen(profileId: string, boostLevel: number): Promise<number[]>;
  calculatePayment(amount: number, currency: string): Promise<number>;
  verifyTransaction(transactionId: string): Promise<boolean>;
}

export interface HermesSystem {
  connect(options: { system: string; connectionId: string; userId: string; metadata?: any }): boolean;
  disconnect(connectionId: string): boolean;
  routeFlow(options: { source: string; destination: string; params?: any }): void;
  calculateVisibilityScore(profileId: string): number;
  recommendNextAction(userId: string): RecommendedAction;
}

export interface RecommendedAction {
  type: string;
  action?: string;
  description: string;
  priority: number;
  cta: string;
  route?: string;
}
