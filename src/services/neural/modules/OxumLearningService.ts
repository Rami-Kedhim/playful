
export interface ProcessingResult {
  id: string;
  status: 'success' | 'failed' | 'processing';
  result: any;
  metadata?: Record<string, any>;
  timestamp: Date;
}

export interface OxumLearningService {
  process: (input: any) => Promise<ProcessingResult>;
  getCulturalContexts: () => Promise<string[]>;
}
