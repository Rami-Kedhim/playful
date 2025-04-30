
export interface SystemIntegrityResult {
  overallStatus: 'healthy' | 'warning' | 'critical';
  score: number;
  modules: {
    name: string;
    status: 'online' | 'degraded' | 'offline';
    reliability: number;
  }[];
  issues: {
    module: string;
    severity: 'low' | 'medium' | 'high';
    description: string;
  }[];
  recommendations: string[];
}

export interface SignalAnalysisResult {
  strength: number;
  clarity: number;
  interference: number;
  trustScore: number;
  source: string;
  timestamp: Date;
}

export interface SessionValidationResult {
  isValid: boolean;
  details?: Record<string, any>;
}
