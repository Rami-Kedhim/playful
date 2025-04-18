
export interface UberCoreService {
  initialize: () => Promise<boolean>;
  shutdown: () => Promise<boolean>;
  status: () => 'active' | 'inactive' | 'initializing' | 'error';
  getStatus: () => Promise<UberCoreStatus>;
  configure: (config: UberCoreConfig) => Promise<boolean>;
  processUserInput: (input: string) => Promise<string>;
}

export interface UberCoreConfig {
  hilbertDimension?: number;
  neuralDepth?: number;
  quantumEnabled?: boolean;
  inclusionRules?: string[];
  exclusionPatterns?: string[];
  sensitivityLevel?: number;
  responseFormat?: 'text' | 'json' | 'html';
  maxTokens?: number;
  temperature?: number;
  apiKey?: string;
  modelVersion?: string;
}

export interface UberCoreStatus {
  status: 'active' | 'inactive' | 'initializing' | 'error';
  version: string;
  uptime: number;
  sessionCount: number;
  lastError?: string;
  memoryUsage: number;
  cpuUsage: number;
  availableModels: string[];
  activeModel: string;
  nodeCount: number;
  configuration: UberCoreConfig;
}
