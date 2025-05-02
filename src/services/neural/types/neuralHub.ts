
export interface INeuralHub {
  processRequest: (request: NeuralRequest) => Promise<NeuralResponse>;
  registerModule: (moduleType: string, module: any) => void;
  getModule: (moduleType: string) => any;
  getSystemStatus: () => NeuralSystemStatus;
}

export interface NeuralRequest {
  type: string;
  data: any;
  options?: any;
}

export interface NeuralResponse {
  success: boolean;
  data?: any;
  error?: string;
}

export interface NeuralSystemStatus {
  operational: boolean;
  uptime: number;
  activeModules: string[];
  processingQueue: number;
  latency: number;
}
