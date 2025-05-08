
export interface ModerateContentParams {
  content: string;
  contentType: string;
  context?: string; // Add context property since it's being used
}

export interface ModerateContentResult {
  isSafe: boolean; 
  safe?: boolean; // Add this for backward compatibility
  score: number;
  issues: string[];
  blockedCategories: string[];
}

export interface GenerateContentResult {
  content: string;
  moderated?: boolean; // Add for backward compatibility
  originalLength: number;
  moderatedLength: number;
  warnings: string[];
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number; // Add for backward compatibility
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(text: string): Promise<SentimentAnalysisResult>;
  getSystemStatus(): { operational: boolean; modules: Record<string, string> };
  configure(options: Record<string, any>): void;
  generateResponse(input: string): Promise<string>;
}

export interface SystemStatus {
  operational: boolean;
  latency: number;
  uptime: number;
  messageLength?: number; // Add for backward compatibility
  services: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
  };
}

export interface SystemIntegrityResult {
  valid: boolean;
  isValid?: boolean; // Add for backward compatibility 
  message: string;
  details: {
    database: string;
    fileSystem: string;
    network: string;
  };
}

export interface SystemHealthMetrics {
  load?: number; // Add for backward compatibility
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
  isValid?: boolean; // Add for backward compatibility
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
  id: string;
  title: string;
  description: string;
  action: string;
  priority: 'high' | 'medium' | 'low';
  target?: string;
  icon?: string;
}

export interface OxumSystem {
  checkSystemStatus(): Promise<any>;
  boostAllocationEigen(): Promise<any>;
  calculateBoostScore(): Promise<any>;
  configure(): Promise<any>;
}
