
export interface ModerateContentParams {
  content: string;
  contentType: string;
  // Remove context property that's causing issues
}

export interface ModerateContentResult {
  isSafe: boolean; // Changed from 'safe' to 'isSafe' to match implementation
  score: number;
  issues: string[];
  blockedCategories: string[];
}

export interface GenerateContentResult {
  content: string;
  // Remove moderated property that's causing issues
  originalLength: number;
  moderatedLength: number;
  warnings: string[];
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  // Remove confidence property that's causing issues
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  getSystemStatus(): { operational: boolean; modules: Record<string, string> };
  configure(options: Record<string, any>): void;
  // Add the missing method that's required by the interface
  generateResponse(input: string): Promise<string>;
}

export interface SystemStatus {
  operational: boolean;
  latency: number;
  uptime: number;
  // Remove messageLength property that's causing issues
  services: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
  };
}

export interface SystemIntegrityResult {
  // Changed from 'isValid' to match implementation
  valid: boolean; 
  message: string;
  details: {
    database: string;
    fileSystem: string;
    network: string;
  };
}

export interface SystemHealthMetrics {
  // Remove 'load' property that's causing issues
  memory: number;
  latency: number;
  errorRate: number;
  averageResponseTime: number;
  systemLoad: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface SessionValidationResult {
  valid: boolean;
  userId?: string;
  sessionId?: string;
  expiresAt?: Date;
}

export interface UberCoreSystem {
  initialize(): Promise<boolean>;
  shutdown(): Promise<void>;
  checkSystemStatus(): SystemStatus;
  checkSystemIntegrity(): SystemIntegrityResult;
  getSystemHealth(): SystemHealthMetrics;
  validateUserSession(token: string): SessionValidationResult;
}

export interface RecommendedAction {
  id: string; // Add missing property
  title: string;
  description: string;
  action: string; // Add missing property
  priority: 'high' | 'medium' | 'low';
  target?: string;
  icon?: string;
}

export interface OxumSystem {
  checkSystemStatus(): Promise<any>; // Add missing method
  boostAllocationEigen(): Promise<any>; // Add missing method
  calculateBoostScore(): Promise<any>; // Add missing method
  configure(): Promise<any>; // Add missing method
}
