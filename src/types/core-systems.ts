
export interface HermesInsight {
  id: string;
  title: string;
  description: string;
  confidence: number;
  timestamp: Date;
  tags?: string[];
  category?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export interface GenerateContentParams {
  prompt: string;
  options?: {
    temperature?: number;
    maxTokens?: number;
    topP?: number;
    frequencyPenalty?: number;
    presencePenalty?: number;
    stopSequences?: string[];
    model?: string;
  };
  context?: string;
  systemPrompt?: string;
}

export interface GenerateContentResult {
  content: string;
  usage?: {
    promptTokens?: number;
    responseTokens?: number;
    totalTokens?: number;
  };
  model?: string;
}

export interface ModerateContentResult extends GenerateContentResult {
  isSafe?: boolean;
  categories?: {
    sexual: boolean;
    violence: boolean;
    hate: boolean;
    selfHarm: boolean;
    harassment: boolean;
  };
}

export interface SentimentAnalysisResult extends GenerateContentResult {
  sentiment?: 'positive' | 'negative' | 'neutral';
  score?: number;
  aspects?: Array<{
    aspect: string;
    sentiment: 'positive' | 'negative' | 'neutral';
    score: number;
  }>;
}

export interface HermesSystem {
  initialize(): Promise<void>;
  trackEvent(eventName: string, data: any): void;
  getMetrics(): Promise<any>;
  getInsights(): Promise<HermesInsight[]>;
}

export interface LucieAISystem {
  generateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  summarize(text: string): Promise<string>;
  analyze(content: string): Promise<any>;
  extractEntities(text: string): Promise<any[]>;
  verifyContentSafety(content: string): Promise<boolean>;
  moderateContent(params: GenerateContentParams): Promise<GenerateContentResult>;
  analyzeSentiment(params: GenerateContentParams): Promise<GenerateContentResult>;
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  validateSession(token: string): Promise<boolean>;
  checkPermission(userId: string, resource: string, action: string): Promise<boolean>;
}

export interface UberCoreSystem {
  lucieAI: LucieAISystem;
  hermesSystem: HermesSystem;
  oxumSystem: OxumSystem;
  initialize(): Promise<void>;
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'offline';
  version: string;
  lastChecked: Date;
  components: {
    [key: string]: 'operational' | 'degraded' | 'offline';
  };
}

export interface SystemIntegrityResult {
  codeIntegrity: boolean;
  dataIntegrity: boolean;
  networkSecurity: boolean;
  timestamp: Date;
  valid: boolean;
  details?: Record<string, any>;
}

export interface SystemHealthMetrics {
  memory: number;
  cpu: number;
  network: {
    latency: number;
    throughput: number;
  };
  score: number;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  type: string;
  actionUrl?: string;
  icon?: string;
}

export interface SessionValidationResult {
  isValid: boolean;
  userId?: string;
  expiry?: Date;
  permissions?: string[];
}
