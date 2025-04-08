
export interface NeuralServiceConfig {
  enabled: boolean;
  priority: number;
  autonomyLevel: number;
  resourceAllocation: number;
  [key: string]: any;
}
