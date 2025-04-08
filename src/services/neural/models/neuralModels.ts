
/**
 * Neural models initialization and management
 */
import { NeuralModel } from '../types/neuralHub';
import { v4 as uuidv4 } from 'uuid';

/**
 * Initialize default neural models
 */
export function initializeDefaultModels(): NeuralModel[] {
  return [
    {
      id: uuidv4(),
      name: 'HermesGPT-Core',
      description: 'General purpose language model for application integration',
      version: '2.4.1',
      status: 'active',
      parameters: 12500,
      specialization: ['natural-language-processing', 'text-generation', 'conversation'],
      capabilities: ['chat', 'content-generation', 'translation', 'summarization'],
      performance: {
        accuracy: 0.92,
        latency: 120,
        throughput: 35
      }
    },
    {
      id: uuidv4(),
      name: 'OxumVision',
      description: 'Visual understanding and generation model',
      version: '1.8.0',
      status: 'active',
      parameters: 8700,
      specialization: ['computer-vision', 'image-processing', 'multimedia'],
      capabilities: ['image-recognition', 'object-detection', 'scene-understanding'],
      performance: {
        accuracy: 0.89,
        latency: 180,
        throughput: 22
      }
    },
    {
      id: uuidv4(),
      name: 'NexusEmbed',
      description: 'Vector embedding generator for semantic understanding',
      version: '3.1.2',
      status: 'active',
      parameters: 1800,
      specialization: ['embeddings', 'similarity-search', 'document-indexing'],
      capabilities: ['document-retrieval', 'semantic-search', 'clustering'],
      performance: {
        accuracy: 0.95,
        latency: 15,
        throughput: 250
      }
    },
    {
      id: uuidv4(),
      name: 'BehaviorPredict',
      description: 'User behavior prediction and content recommendation',
      version: '2.0.5',
      status: 'active',
      parameters: 4200,
      specialization: ['recommendation', 'personalization', 'behavior-analysis'],
      capabilities: ['content-recommendation', 'preference-prediction', 'trend-analysis'],
      performance: {
        accuracy: 0.87,
        latency: 65,
        throughput: 180
      }
    },
    {
      id: uuidv4(),
      name: 'HermesGPT-Expert',
      description: 'Advanced specialized language model for expert domains',
      version: '1.2.0',
      status: 'training',
      parameters: 38000,
      specialization: ['expert-knowledge', 'reasoning', 'domain-adaptation'],
      capabilities: ['complex-reasoning', 'domain-expertise', 'technical-writing'],
      performance: {
        accuracy: 0.94,
        latency: 350,
        throughput: 12
      }
    }
  ];
}
