
export interface SystemStatus {
  isOperational: boolean;
  performance: number;
  lastUpdate: string;
  serviceStatus: {
    auth: string;
    analytics: string;
    ai: string;
    wallet: string;
    seo: string;
    payments: string;
  };
}

export interface SystemIntegrityResult {
  integrity: number;
  overallStatus: string;
  checks: {
    database: boolean;
    cache: boolean;
    filesystem: boolean;
    network: boolean;
  };
}

export interface OxumSystem {
  getSystemStatus(): SystemStatus;
  processPayment(amount: number, currency: string): Promise<boolean>;
  validateTransaction(txId: string): Promise<boolean>;
  getExchangeRate(from: string, to: string): Promise<number>;
  boostAllocationEigen(matrix: number[][]): Promise<number[]>;
  calculateScore(inputs: number[]): Promise<number>;
}

export interface ModerateContentParams {
  content: string;
  type: 'text' | 'image' | 'video';
  context?: string;
  userId?: string;
}

export interface ModerateContentResult {
  isSafe: boolean;
  safe: boolean;
  issues: string[];
  score: number;
}

export interface GenerateContentParams {
  prompt: string;
  type: 'text' | 'image';
  options?: any;
}

export interface GenerateContentResult {
  content: string;
  moderated: boolean;
  warnings: string[];
}

export interface SentimentAnalysisParams {
  text: string;
  language?: string;
}

export interface SentimentAnalysisResult {
  sentiment: 'positive' | 'negative' | 'neutral';
  score: number;
  confidence: number;
}
