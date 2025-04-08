
/**
 * Neural Models - Default models for the neural system
 */
import { NeuralModel, ModelParameters } from '../types/neuralHub';
import { initializeDefaultParameters } from './modelParameters';

export const createBaseNeuralModels = (): NeuralModel[] => {
  const baseTime = new Date();
  
  const defaultParams: ModelParameters = initializeDefaultParameters();
  
  return [
    {
      id: 'adaptive-cognitive-core-v1',
      name: 'Adaptive Cognitive Core',
      version: '1.0.0',
      description: 'Self-optimizing system that learns from platform activity',
      capabilities: ['user-behavior-analysis', 'platform-optimization', 'content-adaptation'],
      specialization: ['behavioral-patterns', 'user-engagement', 'dynamic-adjustments'],
      parameters: {
        ...defaultParams,
        learningRate: 0.005,
        batchSize: 64,
        hiddenLayers: [256, 128, 64]
      },
      performance: {
        accuracy: 0.88,
        precision: 0.86,
        recall: 0.84,
        f1Score: 0.85,
        latency: 120,
        throughput: 1000
      },
      status: 'active',
      created: new Date(baseTime.getTime() - 90 * 24 * 60 * 60 * 1000),
      updated: new Date(baseTime.getTime() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'contextual-awareness-grid-v1',
      name: 'Multilevel Contextual Awareness Grid',
      version: '1.0.0',
      description: 'Adds contextual awareness to all platform modules',
      capabilities: ['context-recognition', 'geo-personalization', 'temporal-adaptation'],
      specialization: ['location-services', 'time-awareness', 'cultural-context'],
      parameters: {
        ...defaultParams,
        learningRate: 0.003,
        epochs: 20,
        embeddingSize: 512
      },
      performance: {
        accuracy: 0.92,
        precision: 0.89,
        recall: 0.88,
        f1Score: 0.89,
        latency: 85,
        throughput: 750
      },
      status: 'active',
      created: new Date(baseTime.getTime() - 60 * 24 * 60 * 60 * 1000),
      updated: new Date(baseTime.getTime() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'emotional-prediction-v1',
      name: 'Quantum Emotional Prediction Engine',
      version: '1.0.0',
      description: 'Predicts user emotional states based on behavior patterns',
      capabilities: ['emotion-recognition', 'interaction-adaptation', 'engagement-optimization'],
      specialization: ['microbehavior-analysis', 'affective-computing', 'user-satisfaction'],
      parameters: {
        ...defaultParams,
        learningRate: 0.002,
        batchSize: 32,
        dropout: 0.3
      },
      performance: {
        accuracy: 0.78,
        precision: 0.76,
        recall: 0.82,
        f1Score: 0.79,
        latency: 45,
        throughput: 1500
      },
      status: 'training',
      created: new Date(baseTime.getTime() - 45 * 24 * 60 * 60 * 1000),
      updated: new Date(baseTime.getTime() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'neurosemantic-cluster-v1',
      name: 'Neurosemantic Cluster',
      version: '0.9.5',
      description: 'Enables AI companions to evolve personalized behaviors',
      capabilities: ['memory-formation', 'personality-adaptation', 'relationship-simulation'],
      specialization: ['personality-development', 'emotional-memory', 'narrative-generation'],
      parameters: {
        ...defaultParams,
        learningRate: 0.001,
        epochs: 30,
        hiddenLayers: [512, 256, 128, 64]
      },
      performance: {
        accuracy: 0.82,
        precision: 0.79,
        recall: 0.81,
        f1Score: 0.80,
        latency: 180,
        throughput: 400
      },
      status: 'training',
      created: new Date(baseTime.getTime() - 30 * 24 * 60 * 60 * 1000),
      updated: new Date()
    },
    {
      id: 'ethical-defense-core-v1',
      name: 'Ethical Algorithmic Defense Core',
      version: '1.1.0',
      description: 'Ensures ethical compliance and monitors algorithmic bias',
      capabilities: ['bias-detection', 'compliance-monitoring', 'ethical-verification'],
      specialization: ['legal-compliance', 'ethics', 'risk-assessment'],
      parameters: {
        ...defaultParams,
        learningRate: 0.0005,
        batchSize: 16,
        epochs: 50
      },
      performance: {
        accuracy: 0.95,
        precision: 0.97,
        recall: 0.93,
        f1Score: 0.95,
        latency: 90,
        throughput: 200
      },
      status: 'active',
      created: new Date(baseTime.getTime() - 120 * 24 * 60 * 60 * 1000),
      updated: new Date(baseTime.getTime() - 15 * 24 * 60 * 60 * 1000)
    }
  ];
};
