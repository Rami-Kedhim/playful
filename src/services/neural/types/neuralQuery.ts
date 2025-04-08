
export interface NeuralQueryResponse {
  status: 'success' | 'error';
  data: any;
  metadata?: {
    processingTime: number;
    confidence: number;
    [key: string]: any;
  };
  error?: string;
}

export interface NeuralQuery {
  type: string;
  filters?: any;
  data?: any;
  options?: any;
}
