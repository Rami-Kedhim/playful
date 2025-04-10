
export interface PsychologyModel {
  emotionalAnalysis: boolean;
  personalityModeling: boolean;
  behaviourPrediction: boolean;
  sentimentAnalysis: boolean;
}

export interface PhysicsModel {
  collisionDetection: boolean;
  gravitationalEffects: boolean;
  fluidDynamics: boolean;
  particleSystems: boolean;
}

export interface EconomicsModel {
  dynamicPricing: boolean;
  demandForecasting: boolean;
  marketSimulation: boolean;
  transactionAnalysis: boolean;
}

export interface RoboticsModel {
  inverseKinematics: boolean;
  pathPlanning: boolean;
  sensorIntegration: boolean;
  controlSystems: boolean;
}

export interface BrainHubRequest {
  type: string;
  data: any;
  filters?: Record<string, any>;
}

export interface BrainHubResponse {
  success: boolean;
  data: any | null;
  error?: string;
}

export interface EmotionalState {
  dominantEmotion: string;
  emotionIntensity: number;
  emotionVector: Record<string, number>;
}
