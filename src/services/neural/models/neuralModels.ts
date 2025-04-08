
/**
 * Neural Models - Default models initialization and management
 */
import { NeuralModel } from '../types/neuralHub';

/**
 * Initialize default neural models
 * @returns Array of default neural models
 */
export function initializeDefaultModels(): NeuralModel[] {
  return [
    {
      id: 'content-moderator-v2',
      name: 'Content Moderator',
      version: '2.1.0',
      status: 'active',
      capabilities: ['content-moderation', 'text-classification', 'image-classification'],
      specialization: ['harmful-content-detection', 'nsfw-detection', 'spam-detection'],
      performance: {
        accuracy: 0.95,
        latency: 120,
        throughput: 500
      },
      lastUpdate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
    },
    {
      id: 'user-personality-analyzer',
      name: 'Personality Analyzer',
      version: '1.3.0',
      status: 'active',
      capabilities: ['user-analysis', 'personality-prediction', 'preference-modeling'],
      specialization: ['behavior-prediction', 'interest-mapping'],
      performance: {
        accuracy: 0.87,
        latency: 350,
        throughput: 120
      },
      lastUpdate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
    },
    {
      id: 'recommendation-engine-pro',
      name: 'Recommendation Engine Pro',
      version: '3.0.1',
      status: 'active',
      capabilities: ['recommendations', 'content-matching', 'preference-analysis'],
      specialization: ['profile-matching', 'content-recommendation'],
      performance: {
        accuracy: 0.91,
        latency: 180,
        throughput: 320
      },
      lastUpdate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
    },
    {
      id: 'engagement-optimizer',
      name: 'Engagement Optimizer',
      version: '1.2.1',
      status: 'training',
      capabilities: ['engagement-analysis', 'messaging-optimization', 'response-prediction'],
      specialization: ['message-timing', 'content-engagement'],
      performance: {
        accuracy: 0.84,
        latency: 200,
        throughput: 240
      },
      lastUpdate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
    },
    {
      id: 'fraud-detector-advanced',
      name: 'Fraud Detector',
      version: '2.4.2',
      status: 'active',
      capabilities: ['fraud-detection', 'anomaly-detection', 'pattern-recognition'],
      specialization: ['payment-fraud', 'account-takeover', 'bot-detection'],
      performance: {
        accuracy: 0.97,
        latency: 300,
        throughput: 150
      },
      lastUpdate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000) // 10 days ago
    }
  ];
}
