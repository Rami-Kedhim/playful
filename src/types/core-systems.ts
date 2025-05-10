
// Core system interfaces and types

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): SystemStatus;
  processInput(input: string, context: any): Promise<string>;
}

export interface GenerateContentParams {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  model?: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  text?: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

export interface ModerateContentParams {
  content: string;
  strictness?: 'low' | 'medium' | 'high';
}

export interface ModerateContentResult {
  flagged: boolean;
  reason?: string;
}

export interface SentimentAnalysisParams {
  text: string;
  options?: Record<string, any>;
}

export interface SentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  confidence?: number;
  scores?: {
    positive: number;
    negative: number;
    neutral: number;
    mixed?: number;
  };
}

export interface HermesSystem {
  name?: string;
  version?: string;
  initialize(): Promise<void>;
  trackEvent(eventName: string, data: any): void;
  getMetrics(): Promise<any>;
  calculateBoostScore(profileId: string): Promise<number>;
  calculateVisibilityScore(profileId: string): Promise<number>;
  getInsights(): Promise<HermesInsight[]>;
  recommendContent?(userId: string): Promise<string[]>;
  routeFlow(params: any): void; 
  connect(options: { system: string; connectionId: string; metadata: any; userId: string }): void;
  recommendNextAction(userId: string): { action: string; confidence: number };
  getSystemStatus(): any;
}

export interface HermesInsight {
  id: string;
  type: string;
  title: string;
  description: string;
  priority: number;
  timestamp: Date;
  metadata?: Record<string, any>;
  category?: string;
  confidence?: number;
  data?: Record<string, any>;
}

export interface OxumSystem {
  name?: string;
  version?: string;
  initialize(): Promise<boolean>;
  processImageFeatures(imageUrl: string): Promise<any>;
  boostAllocationEigen(profileId: string, level?: number): Promise<number[]>;
  checkSystemStatus(): any;
  calculateScore(profile: any): Promise<number>;
}

export interface SystemIntegrityResult {
  valid: boolean;
  overallStatus: string;
  modules: {
    authentication: string;
    encryption: string;
    validation: string;
  };
  recommendations: string[];
  timestamp: Date;
  codeIntegrity?: boolean;
  dataIntegrity?: boolean;
  networkSecurity?: boolean;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  expiry?: Date;
  reason?: string;
  isValid?: boolean;
  expiresAt?: Date;
  sessionType?: 'user' | 'admin' | 'system';
  permissions?: string[];
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  subsystems?: Array<{
    name: string;
    status: 'operational' | 'degraded' | 'maintenance' | 'outage';
  }>;
  lastUpdated?: Date;
  operational?: boolean;
  latency?: number;
  aiModels?: {
    conversation: string;
    generation: string;
    analysis: string;
  };
  metrics?: {
    responseTime?: number;
    activeSessions?: number;
    processingLoad?: number;
  };
}

export interface SystemHealthMetrics {
  uptime: number; // percentage
  responseTime: number; // milliseconds
  errorRate: number; // percentage
  memoryUsage: number; // percentage
  cpu?: number; // percentage
}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  name?: string;
  version?: string;
  initialize(): Promise<void>;
  getSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  checkSubsystemHealth(): Array<{ name: string; status: string; health: number }>;
  getHealthMetrics?(): SystemHealthMetrics;
  validateSession(token: string): SessionValidationResult;
  restartSubsystem?(name: string): Promise<boolean>;
  initializeAutomaticSeo?(): { success: boolean; message: string };
  initializeAI?(): void;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: number;
  actionType: string;
  actionUrl?: string;
  completed: boolean;
  deadline?: Date;
}
