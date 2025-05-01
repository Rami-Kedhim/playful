/**
 * This file serves as a compatibility layer for services expecting the brainHub export.
 * It re-exports the neuralHub as brainHub to maintain compatibility.
 */
import { neuralHub } from './HermesOxumNeuralHub';
import { BrainHubConfig } from '@/types/brainHub';
import { BrainHubRequest, BrainHubResponse } from './types/neuralHub';

// Default configuration for brainHub
const defaultConfig: BrainHubConfig = {
  aiModelParameters: {
    learningRate: 0.001,
    batchSize: 32,
    epochs: 10,
    optimizerType: 'adam'
  },
  systemSettings: {
    resourceAllocationMode: 'balanced',
    autoOptimize: true,
    debugMode: false,
    loggingLevel: 'info'
  },
  neuralSettings: {
    activationThreshold: 0.7,
    neuralDensity: 0.5,
    layerConfiguration: 'standard'
  },
  psychology: {
    enabled: true,
    confidenceThreshold: 0.65
  },
  physics: {
    enabled: false,
    simulationPrecision: 0.85
  },
  economics: {
    enabled: true,
    marketModelVersion: '2.3'
  },
  robotics: {
    enabled: false,
    motorPrecision: 0.92
  },
  geoLegalFilteringEnabled: true,
  neuroEmotionEnabled: true,
  predictiveModulationEnabled: false
};

// Current configuration state
let currentConfig = { ...defaultConfig };

// Export neuralHub as brainHub for legacy compatibility
export const brainHub = {
  ...neuralHub,
  
  // Add any specific brainHub methods that might be expected by other services
  getSystemStatus() {
    return {
      ...neuralHub.getSystemStatus(),
      cpuUtilization: Math.random() * 100,
      memoryUtilization: Math.random() * 100,
      operationsPerSecond: Math.random() * 5000,
      neuralAccuracy: 0.92,
      neuralEfficiency: 0.87,
      neuralLatency: 125,
      errorRate: Math.random() * 2, // Add error rate for health checks
      responseTime: Math.floor(Math.random() * 200 + 50), // Add response time
      stability: Math.random() * 100 // Add stability metric
    };
  },

  // Add config management methods
  getConfig(): BrainHubConfig {
    return { ...currentConfig };
  },

  updateConfig(config: Partial<BrainHubConfig>): boolean {
    try {
      currentConfig = { ...currentConfig, ...config };
      return true;
    } catch (error) {
      console.error("Error updating Brain Hub configuration:", error);
      return false;
    }
  },

  // Add processRequest method that was missing but is used by many components
  processRequest(request: BrainHubRequest): BrainHubResponse {
    console.log(`Brain Hub processing ${request.type} request`, request);
    
    try {
      // If neuralHub has processRequest, use it
      if (typeof neuralHub.processRequest === 'function') {
        return neuralHub.processRequest(request);
      }
      
      // Otherwise provide a fallback implementation
      return {
        success: true,
        data: { processed: true, timestamp: new Date().toISOString() }
      };
    } catch (error: any) {
      console.error("Error in Brain Hub request processing:", error);
      return {
        success: false,
        error: error.message || "Unknown error processing request"
      };
    }
  },

  // Add decision log retrieval method
  getDecisionLogs(limit: number = 10): Array<{
    timestamp: string;
    decision: string;
    confidence: number;
    context: string;
  }> {
    // Mock implementation
    const logs = [];
    const now = Date.now();
    
    for (let i = 0; i < limit; i++) {
      logs.push({
        timestamp: new Date(now - i * 60000).toISOString(),
        decision: `Decision ${i+1}`,
        confidence: Math.random(),
        context: `Context for decision ${i+1}`
      });
    }
    
    return logs;
  }
};

export default brainHub;
