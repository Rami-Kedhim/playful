
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
  errors?: string[];
  warnings?: string[];
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
  isSafe?: boolean; // Compatible property
  issues?: string[];
  blockedCategories?: string[];
  category?: string;
  action?: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'neutral' | 'negative';
  score: number;
  confidence?: number; // Added for compatibility
}

export interface UberCoreSystem {
  getSystemStatus(): Promise<SystemStatus>;
  checkSystemIntegrity(): Promise<SystemIntegrityResult>;
  validateSession(token: string): Promise<SessionValidationResult>;
  getSystemHealthMetrics(): Promise<SystemHealthMetrics>;
  initialize(): Promise<boolean>;
  getSystemHealth(): Promise<SystemHealthMetrics>;
}

export interface OxumSystem {
  initialize(): Promise<void>;
  getSystemStatus(): Promise<SystemStatus>;
  shutdown(): void;
  calculatePayment?: (amount: number, currency: string) => Promise<number>;
  verifyTransaction?: (transactionId: string) => Promise<boolean>;
  processPayment?: (amount: number, currency: string) => Promise<boolean>;
  validateTransaction?: (txId: string) => Promise<boolean>;
  getExchangeRate?: (from: string, to: string) => Promise<number>;
  boostAllocationEigen?: (userId: string, boostLevel: number) => Promise<number[]>;
  calculateScore?: (inputs: number[]) => Promise<number>;
  emitEvent?: (event: string, data: any) => void;
  checkSystemStatus?: () => { operational: boolean; traffic: string; loadFactor: number };
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): Promise<SystemStatus>;
  configure(options: Record<string, any>): void;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
  shutdown(): void;
}

export interface ModerateContentParams {
  content: string;
  type?: 'text' | 'image' | 'video';
  options?: Record<string, any>;
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings: string[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface SentimentAnalysisParams {
  text: string;
  options?: Record<string, any>;
}
