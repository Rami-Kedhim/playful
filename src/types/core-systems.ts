
// Core system types

export interface SystemStatus {
  isActive?: boolean;
  isOperational: boolean;
  lastCheck: Date;
  version: string;
  uptime: number;
}

export interface SystemMetrics {
  cpuUsage: number;
  memoryUsage: number;
  requestsPerMinute: number;
  averageResponseTime: number;
  errorRate: number;
  activeConnections: number;
}

export type SystemHealthMetrics = SystemMetrics;

// Hermes System Interfaces
export interface HermesSystem {
  id: string;
  name: string;
  calculateVisibilityScore: (data: any) => number;
  generateInsight: (data: any) => HermesInsight;
  status: SystemStatus;
}

export interface HermesInsight {
  id: string;
  timestamp: Date;
  score: number;
  recommendation: string;
  data: any;
  confidence: number;
}

// Lucie AI System Interfaces
export interface LucieAISystem {
  id: string;
  name: string;
  version: string;
  status: SystemStatus;
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  analyzeSentiment: (params: SentimentAnalysisParams) => Promise<SentimentAnalysisResult>;
}

export interface GenerateContentParams {
  prompt: string;
  context?: any;
  maxLength?: number;
  temperature?: number;
  format?: string;
}

export interface GenerateContentResult {
  content: string;
  metadata: {
    tokensUsed: number;
    generationTime: number;
    model: string;
  };
  status: 'success' | 'error' | 'partial';
  error?: string;
}

export interface ModerateContentParams {
  content: string;
  contentType: 'text' | 'image' | 'video';
  strictness?: 'low' | 'medium' | 'high';
}

export interface ModerateContentResult {
  isApproved: boolean;
  reasons?: string[];
  score: number;
  categories: {
    [category: string]: number;
  };
}

export interface SentimentAnalysisParams {
  text: string;
  detailed?: boolean;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  entities?: Array<{
    entity: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }>;
}

// Oxum System Interfaces
export interface OxumSystem {
  id: string;
  name: string;
  version: string;
  status: SystemStatus;
  metrics: SystemMetrics;
}

// Validation Results
export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  sessionId?: string;
  expiration?: Date;
  permissions?: string[];
  error?: string;
}

export interface SystemIntegrityResult {
  isIntact: boolean;
  score: number;
  issues: string[];
  recommendations: string[];
  lastCheck: Date;
}

// UberCore System Interface
export interface UberCoreSystem {
  id: string;
  name: string;
  version: string;
  status: SystemStatus;
  validateSession: (token: string) => Promise<SessionValidationResult>;
  checkSystemIntegrity: () => Promise<SystemIntegrityResult>;
  getSystemMetrics: () => SystemMetrics;
}
