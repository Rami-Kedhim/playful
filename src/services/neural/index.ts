
// Correct imports and exports
import { uberCore } from './UberCore';
import { HermesOxumBrainHub } from './HermesOxumBrainHub';
import { HermesOxumNeuralHub } from './HermesOxumNeuralHub';
import { NeuralService } from './NeuralService';
import { OxumLearningService } from './OxumLearningService';
import { NeuralFaceDetection } from './NeuralFaceDetection';
import { NeuralVoiceCloning } from './NeuralVoiceCloning';
import { NeuralVoiceSynthesis } from './NeuralVoiceSynthesis';

// Export all services
export {
  uberCore,
  HermesOxumBrainHub,
  HermesOxumNeuralHub,
  NeuralService,
  OxumLearningService,
  NeuralFaceDetection,
  NeuralVoiceCloning,
  NeuralVoiceSynthesis
};

// Use export type for TypeScript interfaces when isolatedModules is enabled
export type { NeuralModel } from '../types/neural/NeuralSystemMetrics';
export type { NeuralServiceOptions } from './types/neuralService';
export type { NeuralSystemStatus } from './types/neuralSystem';
export type { NeuralProcessingOptions } from './types/neuralProcessing';
