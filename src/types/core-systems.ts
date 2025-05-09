
export interface HermesInsight {
  type: string;
  title: string;
  description: string;
  value: number;
  change?: number;
  data?: any;
}

export interface LucieAISystem {
  initialize(): Promise<void>;
  generateContent(prompt: string, options?: any): Promise<GenerateContentResult>;
  shutdown(): Promise<void>;
  moderateContent?(params: any): Promise<any>;
  analyzeSentiment?(params: any): Promise<any>;
  getSystemStatus?(): any;
}

export interface GenerateContentResult {
  content: string;
  tokens: number;
  moderated?: boolean;
  moderationFlags?: string[];
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  boostAllocationEigen(profileId: string, boostLevel: number): Promise<number[]>;
  calculateScore?(inputs: number[]): Promise<number>;
  shutdown(): void;
  checkSystemStatus?(): { operational: boolean; traffic?: number; loadFactor?: number };
  processPayment?(amount: number, currency: string): Promise<boolean>;
}

export interface HermesSystem {
  trackEvent(actionType: string, data: Record<string, any>): void;
  getInsights(profileId: string): Promise<HermesInsight[]>;
}

export interface ModerateContentParams {
  content: string;
  type: 'text' | 'image' | 'video';
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe: boolean;
  score: number;
  issues: string[];
  blockedCategories: string[];
  category: string;
  action: string;
}

export interface SentimentAnalysisParams {
  text: string;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: string;
  confidence: number;
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface SystemStatus {
  operational: boolean;
  isActive: boolean;
  services?: Record<string, string>;
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  lastReboot?: string;
}

export interface SystemIntegrityResult {
  valid: boolean;
  status: string;
  errors: string[];
  warnings: string[];
  lastChecked: string;
  integrity: number;
  checks?: Record<string, boolean>;
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
  username: string;
  timestamp: string;
}

export interface RecommendedAction {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  cta?: string;
  link?: string;
}

export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
  getSystemHealth(): Promise<SystemHealthMetrics>;
  validateSession(token: string): Promise<SessionValidationResult>;
  checkSubsystemHealth(): { name: string, status: string, health: number }[];
}
