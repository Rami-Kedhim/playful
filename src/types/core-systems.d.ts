
export interface CoreSystemStatus {
  operational: boolean;
  lastChecked: Date;
  version: string;
}

export interface RecommendedAction {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  type: 'optimization' | 'security' | 'visibility' | 'enhancement';
  actionUrl?: string;
  actionLabel?: string;
  completed?: boolean;
  icon?: string;
}

export interface ModerateContentParams {
  content: string;
  strictness?: number;
  type?: 'text' | 'image' | 'video' | 'audio';
  context?: string;
  contentType?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe?: boolean; // For backward compatibility
  score: number;
  issues?: string[];
  blockedCategories?: string[];
  category?: string;
  action?: 'allow' | 'review' | 'block';
}

export interface GenerateContentParams {
  prompt: string;
  options?: Record<string, any>;
}

export interface GenerateContentResult {
  content: string;
  moderated?: boolean; // For backward compatibility
  warnings?: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  options?: Record<string, any>;
}

export interface SentimentAnalysisResult {
  score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  confidence?: number; // For backward compatibility
}

export interface AnalyticsData {
  additionalViews?: number;
  engagementIncrease?: number;
  rankingPosition?: number;
  views?: number;
  conversionRate?: number;
  messageRate?: number;
  bookingRate?: number;
  impressions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  interactions?: {
    today?: number;
    yesterday?: number;
    weeklyAverage?: number;
    withBoost?: number;
    withoutBoost?: number;
    increase?: number;
    change?: number;
    value?: number;
  };
  rank?: {
    current?: number;
    previous?: number;
    change?: number;
  };
  totalBoosts?: number;
  activeBoosts?: number;
  averageBoostScore?: number;
  boostHistory?: Array<{
    date: Date;
    score: number;
  }>;
}

export interface SystemIntegrityResult {
  status: 'ok' | 'warning' | 'error';
  checks: Record<string, boolean>;
  errors: string[];
  overallStatus?: string;
}

export interface SystemStatus {
  operational: boolean;
  isActive?: boolean;
  services?: Record<string, string>;
  queueLength?: number;
  processing?: boolean;
  uptime?: number;
  lastReboot?: string;
}

export interface LucieAISystem {
  initialize(): Promise<boolean>;
  generateText(prompt: string): Promise<string>;
  moderateContent(params: ModerateContentParams): Promise<ModerateContentResult>;
  generateContent(prompt: string, options?: Record<string, any>): Promise<GenerateContentResult>;
  analyzeSentiment(params: SentimentAnalysisParams): Promise<SentimentAnalysisResult>;
  getSystemStatus(): SystemStatus;
  configure(options: Record<string, any>): void;
  generateResponse(params: GenerateContentParams): Promise<GenerateContentResult>;
  shutdown?: () => void;
}

export interface OxumSystem {
  initialize(): Promise<boolean>;
  shutdown(): void;
  getSystemStatus(): SystemStatus;
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(transactionId: string): Promise<boolean>;
  getExchangeRate(from: string, to: string): Promise<number>;
  boostAllocationEigen?(profileId: string, boostLevel: number): Promise<number>;
}
