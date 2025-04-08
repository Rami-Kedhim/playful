
/**
 * Neural Service - Higher level operations for the neural system
 */
import { neuralHub } from './HermesOxumNeuralHub';
import { NeuralModel, ModelParameters } from './types/neuralHub';
import { calculateSystemEfficiency } from './models/modelParameters';

class NeuralService {
  /**
   * Get models suitable for a specific task
   * @param task Task description
   * @param minAccuracy Minimum required accuracy
   * @returns Array of suitable models
   */
  getSuitableModels(task: string, minAccuracy: number = 0.8): NeuralModel[] {
    const allModels = neuralHub.getModels();
    
    // Filter models based on task keywords and minimum accuracy
    return allModels.filter(model => {
      // Only consider active models
      if (model.status !== 'active') return false;
      
      // Check if model has sufficient accuracy
      if (model.performance.accuracy < minAccuracy) return false;
      
      // Match task with model capabilities and specialization
      const taskWords = task.toLowerCase().split(/\s+/);
      
      // Check if any capabilities or specializations match task keywords
      const hasMatchingCapability = model.capabilities.some(cap => 
        taskWords.some(word => cap.toLowerCase().includes(word))
      );
      
      const hasMatchingSpecialization = model.specialization?.some(spec => 
        taskWords.some(word => spec.toLowerCase().includes(word))
      ) || false;
      
      return hasMatchingCapability || hasMatchingSpecialization;
    });
  }
  
  /**
   * Optimize model parameters for a specific goal
   * @param goal What to optimize for: 'speed', 'accuracy', 'efficiency', or 'balance'
   * @returns Optimized parameters
   */
  optimizeParameters(goal: 'speed' | 'accuracy' | 'efficiency' | 'balance'): ModelParameters {
    const currentParams = neuralHub.getModelParameters();
    
    let optimizedParams: ModelParameters = { ...currentParams };
    
    switch (goal) {
      case 'speed':
        // Optimize for faster processing
        if (optimizedParams.decayConstant !== undefined) optimizedParams.decayConstant = 0.3;
        if (optimizedParams.cyclePeriod !== undefined) optimizedParams.cyclePeriod = 12;
        if (optimizedParams.harmonicCount !== undefined) optimizedParams.harmonicCount = 2;
        break;
        
      case 'accuracy':
        // Optimize for accuracy
        if (optimizedParams.decayConstant !== undefined) optimizedParams.decayConstant = 0.15;
        if (optimizedParams.growthFactor !== undefined) optimizedParams.growthFactor = 1.8;
        if (optimizedParams.harmonicCount !== undefined) optimizedParams.harmonicCount = 5;
        if (optimizedParams.bifurcationPoint !== undefined) optimizedParams.bifurcationPoint = 0.7;
        break;
        
      case 'efficiency':
        // Optimize for resource efficiency
        if (optimizedParams.decayConstant !== undefined) optimizedParams.decayConstant = 0.25;
        if (optimizedParams.growthFactor !== undefined) optimizedParams.growthFactor = 1.2;
        if (optimizedParams.cyclePeriod !== undefined) optimizedParams.cyclePeriod = 18;
        if (optimizedParams.harmonicCount !== undefined) optimizedParams.harmonicCount = 2;
        if (optimizedParams.attractorStrength !== undefined) optimizedParams.attractorStrength = 0.5;
        break;
        
      case 'balance':
        // Balanced approach
        if (optimizedParams.decayConstant !== undefined) optimizedParams.decayConstant = 0.2;
        if (optimizedParams.growthFactor !== undefined) optimizedParams.growthFactor = 1.5;
        if (optimizedParams.cyclePeriod !== undefined) optimizedParams.cyclePeriod = 24;
        if (optimizedParams.harmonicCount !== undefined) optimizedParams.harmonicCount = 3;
        if (optimizedParams.bifurcationPoint !== undefined) optimizedParams.bifurcationPoint = 0.6;
        if (optimizedParams.attractorStrength !== undefined) optimizedParams.attractorStrength = 0.6;
        break;
    }
    
    // Calculate efficiency score for optimized parameters
    const efficiency = calculateSystemEfficiency(optimizedParams);
    console.log(`Optimized parameters for ${goal}. Efficiency score: ${efficiency.toFixed(2)}`);
    
    // Update parameters in neural hub
    neuralHub.updateModelParameters(optimizedParams);
    
    return optimizedParams;
  }
  
  /**
   * Run a batch of predictions using the best available model
   * @param inputs Array of inputs to process
   * @param capability Required model capability
   * @returns Promise resolving to array of results
   */
  async runBatchPredictions(inputs: any[], capability: string): Promise<any[]> {
    // Get suitable models with the required capability
    const suitableModels = neuralHub.getModelsByCapability(capability);
    
    if (suitableModels.length === 0) {
      throw new Error(`No active models found with capability: ${capability}`);
    }
    
    // Sort by accuracy to get the best model
    const bestModel = suitableModels.sort((a, b) => 
      b.performance.accuracy - a.performance.accuracy
    )[0];
    
    // Process each input with the best model
    const results = await Promise.all(
      inputs.map(input => neuralHub.runInference(bestModel.id, input))
    );
    
    return results;
  }
}

// Singleton instance
export const neuralService = new NeuralService();
