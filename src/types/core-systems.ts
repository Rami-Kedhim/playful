
export interface ModerateContentParams {
  content: string;
  contentType?: string;
  strictMode?: boolean;
  type?: string; // Add this field for compatibility
}

export interface ModerateContentResult {
  isAcceptable: boolean;
  reason?: string;
  score?: number;
  isSafe?: boolean; // Add this field for compatibility
  safe?: boolean; // Add this field for compatibility
}

export interface GenerateContentParams {
  prompt: string;
  options?: any;
}

export interface GenerateContentResult {
  content: string;
  tokens?: number; // Add this field for compatibility
}

export interface SentimentAnalysisResult {
  sentiment: "positive" | "negative" | "neutral" | "mixed";
  score: number;
  confidence: number;
  metadata: any; // Required property
}

export interface LucieAISystem {
  moderateContent: (params: ModerateContentParams) => Promise<ModerateContentResult>;
  generateContent: (params: GenerateContentParams) => Promise<GenerateContentResult>;
  analyzeContent: (content: string) => Promise<any>;
  analyzeSentiment: (text: string) => Promise<SentimentAnalysisResult>;
  getProfanityScore: (text: string) => number;
}

export interface SystemStatus {
  status: "operational" | "degraded" | "maintenance" | "offline";
  message?: string;
  lastUpdated: Date;
  components?: Record<string, "operational" | "degraded" | "offline">;
  isOperational?: boolean; // Add this field for compatibility
}

export interface SystemIntegrityResult {
  valid: boolean;
  issues?: string[];
  integrity?: {
    codeIntegrity: boolean;
    dataIntegrity: boolean;
    networkSecurity: boolean;
    database?: boolean; // Add this field for compatibility
  };
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
  activeConnections: number;
  load?: number; // Add this field for compatibility
}

export interface SessionValidationResult {
  valid: boolean; // Updated from isValid
  userId?: string;
  expiration?: Date;
  sessionData?: Record<string, any>;
}

export interface UberCoreSystem {
  getSystemStatus: () => Promise<SystemStatus>;
  checkSystemIntegrity: () => Promise<SystemIntegrityResult>;
  validateSession: (sessionId: string) => Promise<SessionValidationResult>;
  getSystemMetrics: () => Promise<SystemHealthMetrics>; // Add missing methods
  registerSystem: (name: string, system: any) => void;
  deregisterSystem: (name: string) => void;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  actionType: string;
  priority: "high" | "medium" | "low";
  url?: string;
}

export interface HermesInsight {
  id: string;
  description: string;
  category: string;
  importance: number;
  timestamp: Date;
  title?: string; // Add this field for compatibility
}

export interface HermesSystem {
  getInsights: () => Promise<HermesInsight[]>;
  getRecommendedActions: () => Promise<RecommendedAction[]>;
  calculateVisibilityScore: (profileId: string) => number;
  getRecommendedContent: (userId: string) => Promise<any[]>;
  trackUserActivity: (userId: string, activity: any) => void;
  optimize: (profileId: string) => Promise<boolean>;
  getOptimizationSuggestions: (profileId: string) => Promise<any[]>;
}

export interface OxumSystem {
  getBoostPackages: () => any[];
  calculateBoostScore: (profileId: string) => number;
  getProfileRanking: (profileId: string) => number;
  optimizeVisibility: (profileId: string, options?: any) => Promise<boolean>;
}
