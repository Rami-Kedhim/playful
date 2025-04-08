
import { TrainingProgress } from '../types/neuralHub';

export class TrainingManager {
  private trainingJobs: Map<string, TrainingProgress> = new Map();
  
  // Get training progress for a specific model
  getTrainingProgress(modelId: string): TrainingProgress | undefined {
    return this.trainingJobs.get(modelId);
  }
  
  // Get all active training jobs
  getActiveTrainingJobs(): TrainingProgress[] {
    return Array.from(this.trainingJobs.values());
  }
  
  // Start training for a model
  startTraining(modelId: string, currentAccuracy: number, config: any = {}): boolean {
    if (this.trainingJobs.has(modelId)) {
      return false; // Already training
    }
    
    const startTime = new Date();
    const estimatedCompletionTime = new Date(
      startTime.getTime() + (Math.random() * 1000000 + 500000)
    );
    
    const progress: TrainingProgress = {
      modelId,
      status: 'running',
      progress: 0,
      accuracy: currentAccuracy,
      startTime,
      estimatedCompletionTime,
      trainingConfig: config
    };
    
    this.trainingJobs.set(modelId, progress);
    
    // Simulate training progress in background
    this.simulateTrainingProgress(modelId, currentAccuracy);
    
    return true;
  }
  
  // Stop training for a model
  stopTraining(modelId: string): boolean {
    if (!this.trainingJobs.has(modelId)) {
      return false; // Not training
    }
    
    this.trainingJobs.delete(modelId);
    return true;
  }
  
  // Simulate training progress for demo purposes
  private simulateTrainingProgress(modelId: string, startAccuracy: number): void {
    let progress = 0;
    const targetAccuracy = Math.min(0.99, startAccuracy + 0.05 + Math.random() * 0.1);
    
    const interval = setInterval(() => {
      if (!this.trainingJobs.has(modelId)) {
        clearInterval(interval);
        return;
      }
      
      progress += Math.random() * 5;
      const currentProgress = this.trainingJobs.get(modelId);
      
      if (!currentProgress) {
        clearInterval(interval);
        return;
      }
      
      if (progress >= 100) {
        // Training completed
        this.trainingJobs.set(modelId, {
          ...currentProgress,
          status: 'completed',
          progress: 100,
          accuracy: targetAccuracy
        });
        clearInterval(interval);
        return;
      }
      
      // Calculate interpolated accuracy based on progress
      const currentAccuracy = startAccuracy + (targetAccuracy - startAccuracy) * (progress / 100);
      
      this.trainingJobs.set(modelId, {
        ...currentProgress,
        progress,
        accuracy: currentAccuracy
      });
    }, 1000 + Math.random() * 2000); // Random update interval
  }
}
