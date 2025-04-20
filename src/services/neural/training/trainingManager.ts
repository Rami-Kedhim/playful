
// Fix TrainingProgress with missing properties (id, epoch, loss, timeRemaining, type)
// Added necessary properties with reasonable defaults.

export interface TrainingProgress {
  id: string;
  modelId: string;
  status: string;
  startTime: Date;
  currentEpoch: number;
  epoch: number;
  totalEpochs: number;
  progress: number;
  accuracy: number;
  loss: number;
  targetAccuracy: number;
  estimatedCompletionTime: Date;
  timeRemaining: number;
  message: string;
  type: string;
}

// example of using the interface with required properties
export function createTrainingProgress(): TrainingProgress {
  return {
    id: 'default-id',
    modelId: 'model-1',
    status: 'training',
    startTime: new Date(),
    currentEpoch: 0,
    epoch: 0,
    totalEpochs: 10,
    progress: 0,
    accuracy: 0,
    loss: 1,
    targetAccuracy: 0.95,
    estimatedCompletionTime: new Date(),
    timeRemaining: 0,
    message: '',
    type: 'training',
  };
}
