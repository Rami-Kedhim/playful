
import { NeuralModel } from '../types/neuralHub';

// Generate neural models for the demo
export const generateNeuralModels = (): NeuralModel[] => {
  return [
    {
      id: 'semantic-analyzer-v2',
      name: 'Neural Semantic Analyzer',
      version: '2.0.0',
      capabilities: ['text-understanding', 'context-analysis', 'sentiment-detection'],
      status: 'active',
      performance: {
        accuracy: 0.94,
        latency: 85,
        resourceUsage: 0.45
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'text-processing'
    },
    {
      id: 'visual-recognition-v3',
      name: 'Visual Recognition Engine',
      version: '3.1.2',
      capabilities: ['object-detection', 'scene-recognition', 'facial-analysis'],
      status: 'active',
      performance: {
        accuracy: 0.91,
        latency: 120,
        resourceUsage: 0.65
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'image-processing'
    },
    {
      id: 'recommendation-engine-v1',
      name: 'Neural Recommendation Engine',
      version: '1.5.0',
      capabilities: ['content-recommendation', 'preference-learning', 'profile-matching'],
      status: 'active',
      performance: {
        accuracy: 0.87,
        latency: 110,
        resourceUsage: 0.55
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'recommendation-systems'
    },
    {
      id: 'conversation-agent-v2',
      name: 'Conversational Agent',
      version: '2.3.1',
      capabilities: ['dialogue-generation', 'personality-simulation', 'emotion-detection'],
      status: 'active',
      performance: {
        accuracy: 0.82,
        latency: 90,
        resourceUsage: 0.48
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'conversational-ai'
    },
    {
      id: 'pattern-detector-v1',
      name: 'Neural Pattern Detector',
      version: '1.0.3',
      capabilities: ['anomaly-detection', 'pattern-recognition', 'time-series-analysis'],
      status: 'inactive',
      performance: {
        accuracy: 0.79,
        latency: 150,
        resourceUsage: 0.70
      },
      createdAt: new Date(),
      updatedAt: new Date(),
      specialization: 'pattern-analysis'
    }
  ];
};

export default generateNeuralModels;
