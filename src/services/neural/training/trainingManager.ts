
import { TrainingProgress } from '../types/neuralHub';

export class TrainingManager {
  private activeJobs: Map<string, TrainingProgress> = new Map();
  private updateIntervals: Map<string, NodeJS.Timeout> = new Map();
  
  constructor() {
    // Initialize with empty jobs
  }
  
  getActiveTrainingJobs(): TrainingProgress[] {
    return Array.from(this.activeJobs.values());
  }
  
  startTraining(modelId: string, baseAccuracy: number, trainingConfig?: any): boolean {
    // Check if job already exists for this model
    if (this.activeJobs.has(modelId)) {
      console.warn(`Training job already exists for model ${modelId}`);
      return false;
    }
    
    // Default config
    const config = {
      epochs: 10,
      targetAccuracy: Math.min(baseAccuracy + 0.1, 0.99),
      ...trainingConfig
    };
    
    // Create new job
    const now = new Date();
    const estimatedCompletionTime = new Date(now.getTime() + (config.epochs * 30000)); // 30s per epoch
    
    const job: TrainingProgress = {
      modelId,
      status: 'training', // Using 'training' instead of 'running'
      startTime: now,
      currentEpoch: 1,
      totalEpochs: config.epochs,
      progress: 10, // Start at 10%
      accuracy: baseAccuracy,
      targetAccuracy: config.targetAccuracy,
      estimatedCompletionTime,
      message: 'Training initialized and running.'
    };
    
    this.activeJobs.set(modelId, job);
    
    // Set up interval to update progress
    const updateInterval = setInterval(() => this.updateTrainingProgress(modelId), 2000);
    this.updateIntervals.set(modelId, updateInterval);
    
    console.log(`Started training for model ${modelId}`);
    return true;
  }
  
  stopTraining(modelId: string): boolean {
    if (!this.activeJobs.has(modelId)) {
      console.warn(`No active training job for model ${modelId}`);
      return false;
    }
    
    const job = this.activeJobs.get(modelId)!;
    job.status = 'failed'; // Using 'failed' instead of 'stopped'
    job.message = 'Training stopped by user.';
    
    // Clear interval
    if (this.updateIntervals.has(modelId)) {
      clearInterval(this.updateIntervals.get(modelId)!);
      this.updateIntervals.delete(modelId);
    }
    
    console.log(`Stopped training for model ${modelId}`);
    return true;
  }
  
  private updateTrainingProgress(modelId: string): void {
    if (!this.activeJobs.has(modelId)) return;
    
    const job = this.activeJobs.get(modelId)!;
    
    // Don't update if job is not in training state
    if (job.status !== 'training') return;
    
    // Update epoch and progress
    job.currentEpoch = Math.min(job.currentEpoch + 1, job.totalEpochs);
    job.progress = Math.floor((job.currentEpoch / job.totalEpochs) * 100);
    
    // Update accuracy - gradually approach target accuracy
    const remainingEpochs = job.totalEpochs - job.currentEpoch + 1;
    const accuracyStep = (job.targetAccuracy - job.accuracy) / (remainingEpochs + 1);
    job.accuracy = job.accuracy + accuracyStep + (Math.random() * 0.01 - 0.005); // Add some noise
    job.accuracy = Math.min(job.accuracy, job.targetAccuracy); // Cap at target
    
    // Update status based on progress
    if (job.progress < 25) {
      job.message = 'Training in initial stage. Building model understanding.';
    } else if (job.progress < 50) {
      job.message = 'Training in progress. Learning patterns.';
    } else if (job.progress < 75) {
      job.message = 'Training advancing. Refining model accuracy.';
    } else {
      job.message = 'Training in final stage. Optimizing model parameters.';
    }
    
    // Check if training is complete
    if (job.currentEpoch >= job.totalEpochs) {
      job.status = 'completed';
      job.progress = 100;
      job.message = `Training completed successfully. Final accuracy: ${(job.accuracy * 100).toFixed(2)}% (${job.targetAccuracy >= job.accuracy ? 'Target met' : 'Target not reached'})`;
      
      // Clear interval
      if (this.updateIntervals.has(modelId)) {
        clearInterval(this.updateIntervals.get(modelId)!);
        this.updateIntervals.delete(modelId);
      }
    }
  }
}
