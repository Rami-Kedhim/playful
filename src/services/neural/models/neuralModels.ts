
/**
 * Neural Models - Default models for the neural system
 */
import { NeuralModel } from '../types/neuralHub';
import { initializeDefaultParameters } from './modelParameters';

export const createBaseNeuralModels = (): NeuralModel[] => {
  const now = new Date();
  const baseTime = new Date();
  
  return [
    {
      id: 'adaptive-cognitive-core-v1',
      name: 'Adaptive Cognitive Core',
      version: '1.0.0',
      capabilities: ['user-behavior-analysis', 'platform-optimization', 'content-adaptation'],
      specialization: ['behavioral-patterns', 'user-engagement', 'dynamic-adjustments'],
      status: 'active',
      performance: {
        accuracy: 0.88,
        latency: 120,
        resourceUsage: 0.65,
        throughput: 1000,
        precision: 0.86,
        recall: 0.89,
        f1Score: 0.87
      },
      createdAt: new Date(baseTime.getTime() - 90 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseTime.getTime() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'contextual-awareness-grid-v1',
      name: 'Multilevel Contextual Awareness Grid',
      version: '1.0.0',
      capabilities: ['context-recognition', 'geo-personalization', 'temporal-adaptation'],
      specialization: ['location-services', 'time-awareness', 'cultural-context'],
      status: 'active',
      performance: {
        accuracy: 0.92,
        latency: 85,
        resourceUsage: 0.48,
        throughput: 750,
        precision: 0.91,
        recall: 0.93,
        f1Score: 0.92
      },
      createdAt: new Date(baseTime.getTime() - 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseTime.getTime() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'emotional-prediction-v1',
      name: 'Quantum Emotional Prediction Engine',
      version: '1.0.0',
      capabilities: ['emotion-recognition', 'interaction-adaptation', 'engagement-optimization'],
      specialization: ['microbehavior-analysis', 'affective-computing', 'user-satisfaction'],
      status: 'training',
      performance: {
        accuracy: 0.78,
        latency: 45,
        resourceUsage: 0.35,
        throughput: 1500,
        precision: 0.76,
        recall: 0.79,
        f1Score: 0.77
      },
      createdAt: new Date(baseTime.getTime() - 45 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseTime.getTime() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      id: 'neurosemantic-cluster-v1',
      name: 'Neurosemantic Cluster',
      version: '0.9.5',
      capabilities: ['memory-formation', 'personality-adaptation', 'relationship-simulation'],
      specialization: ['personality-development', 'emotional-memory', 'narrative-generation'],
      status: 'training',
      performance: {
        accuracy: 0.82,
        latency: 180,
        resourceUsage: 0.78,
        throughput: 400,
        precision: 0.81,
        recall: 0.84,
        f1Score: 0.82
      },
      createdAt: new Date(baseTime.getTime() - 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    },
    {
      id: 'ethical-defense-core-v1',
      name: 'Ethical Algorithmic Defense Core',
      version: '1.1.0',
      capabilities: ['bias-detection', 'compliance-monitoring', 'ethical-verification'],
      specialization: ['legal-compliance', 'ethics', 'risk-assessment'],
      status: 'active',
      performance: {
        accuracy: 0.95,
        latency: 90,
        resourceUsage: 0.45,
        throughput: 200,
        precision: 0.96,
        recall: 0.94,
        f1Score: 0.95
      },
      createdAt: new Date(baseTime.getTime() - 120 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(baseTime.getTime() - 15 * 24 * 60 * 60 * 1000)
    }
  ];
};
