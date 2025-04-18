
export interface UberCoreService {
  initialize: () => Promise<void>;
  shutdown: () => Promise<void>;
  getStatus: () => Promise<UberCoreStatus>;
  configure: (config: UberCoreConfig) => Promise<void>;
  processUserInput: (input: string) => Promise<string>;
}

export interface OxumLearningService {
  initialize: (params: any) => Promise<void>;
  processInput: (input: string) => Promise<any>;
  getLearnedPatterns: () => Promise<any[]>;
}

export interface UberCoreStatus {
  isRunning: boolean;
  version: string;
  uptime: number;
  lastError: string | null;
  memoryUsage: number;
  processorLoad: number;
}

export interface UberCoreConfig {
  neuralDimension: number;
  learningRate: number;
  enableAdvancedFeatures: boolean;
  logLevel: 'debug' | 'info' | 'warning' | 'error';
}

export interface SystemHealthMetrics {
  cpuUsage: number;
  memoryUsage: number;
  networkLatency: number;
  systemLoad: number;
  memoryAllocation: number;
  networkThroughput: number;
  requestRate: number;
  averageResponseTime: number;
  errorRate: number;
}

export interface NeuralSystemMetricsResult {
  metrics: SystemHealthMetrics;
  status: "optimal" | "good" | "warning" | "critical";
  recommendations: string[];
  lastUpdated: Date;
  hasAnomalies: boolean;
  anomalies: any[];
  logs: string[];
  performance: {
    processingEfficiency: { current: number; historical: number[]; history?: any[]; processingEfficiency?: number; processingTrend?: 'up' | 'down' | 'stable'; recommendations?: string[]; };
    accuracyRate: { current: number; historical: number[]; history?: any[]; accuracyRate?: number; accuracyTrend?: 'up' | 'down' | 'stable'; recommendations?: string[]; };
  };
  refreshMetrics: () => Promise<void>;
  errorMessage: string | null;
}

export interface UberPersona {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  traits: string[];
  background: string;
  availability: {
    days: string[];
    hours: string[];
  };
  capabilities: {
    hasPhotos: boolean;
    hasVideos: boolean;
    hasStories: boolean;
    hasChat: boolean;
    hasBooking: boolean;
    hasLiveStream: boolean;
    hasExclusiveContent: boolean;
    hasContent: boolean;
    hasRealMeets: boolean;
    hasVirtualMeets: boolean;
  };
  monetization: {
    acceptsLucoin: boolean;
    acceptsTips: boolean;
    subscriptionPrice: number;
    unlockingPrice: number;
    boostingActive: boolean;
    meetingPrice: number;
  };
  stats: {
    followers: number;
    likes: number;
    views: number;
    rating: number;
  };
  ethnicity?: string;
  language?: string[];
}

export interface NeuralModel {
  id: string;
  name: string;
  type: string;
  version: string;
  capabilities: string[];
  status: 'active' | 'inactive' | 'training';
  performance: {
    accuracy: number;
    speed: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SuperlativeBrainHubProps {
  models: NeuralModel[];
}

export interface EscortScraper {
  setFilters: (filters: any) => void;
  scrape: () => Promise<any[]>;
}

export interface SystemLog {
  message: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'debug';
}
