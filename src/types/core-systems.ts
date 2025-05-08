
// Add this file if it doesn't exist or update it if it does

export interface SystemStatus {
  operational: boolean;
  isActive?: boolean;
  services: {
    [key: string]: string;
  };
  queueLength: number;
  processing: boolean;
  uptime: number;
  lastReboot: string;
  performance?: number;
  lastUpdate?: string;
  serviceStatus?: {
    [key: string]: {
      operational: boolean;
      latency?: number;
    };
  };
  isOperational?: boolean;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId: string;
  expiry: Date;
  username: string;
  timestamp: string;
}

export interface SystemIntegrityResult {
  isValid: boolean;
  status: string;
  errors: string[];
  warnings: string[];
  lastChecked: string;
  integrity?: number;
  checks?: {
    [key: string]: boolean;
  };
  overallStatus?: 'good' | 'warning' | 'critical';
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
  getSystemHealthMetrics(): SystemHealthMetrics;
  checkSystemIntegrity(): SystemIntegrityResult;
  validateSession(sessionId: string): SessionValidationResult;
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  shutdown(): void;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  shutdown(): void;
  getSystemStatus(): SystemStatus | Promise<SystemStatus>;
  getUserScore(userId: string): number;
  getProfileScore(profileId: string): number;
  boostScore(profileId: string): Promise<boolean>;
  boostAllocationEigen(profileId: string, boostLevel: number): Promise<number[]>;
  calculateRecommendations(userId: string): string[];
}

export interface ModerateContentParams {
  content: string;
  type?: 'text' | 'image' | 'video';
  userId?: string;
  strictness?: number;
}

export interface ModerateContentResult {
  allowed: boolean;
  categories: {
    [key: string]: number;
  };
  score: number;
  isSafe?: boolean;
  safe?: boolean;
}

export interface GenerateContentParams {
  prompt: string;
  type?: 'text' | 'image';
  maxTokens?: number;
  temperature?: number;
  userId?: string;
}

export interface GenerateContentResult {
  content: string;
  usage: {
    tokens: number;
  };
  moderated?: boolean;
  warnings?: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  language?: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  entities?: {
    [key: string]: {
      sentiment: 'positive' | 'negative' | 'neutral';
      score: number;
    };
  };
  confidence?: number;
}
