
// Core BrainHub types
export interface PsychologyModel {
  emotionalAnalysis: boolean;
  personalityModeling: boolean;
  behaviourPrediction: boolean;
  sentimentAnalysis: boolean;
  [key: string]: boolean;
}

export interface PhysicsModel {
  collisionDetection: boolean;
  gravitationalEffects: boolean;
  fluidDynamics: boolean;
  particleSystems: boolean;
  [key: string]: boolean;
}

export interface EconomicsModel {
  dynamicPricing: boolean;
  demandForecasting: boolean;
  marketSimulation: boolean;
  transactionAnalysis: boolean;
  [key: string]: boolean;
}

export interface RoboticsModel {
  inverseKinematics: boolean;
  pathPlanning: boolean;
  sensorIntegration: boolean;
  controlSystems: boolean;
  [key: string]: boolean;
}

export interface BrainHubConfig {
  psychology: PsychologyModel;
  physics: PhysicsModel;
  economics: EconomicsModel;
  robotics: RoboticsModel;
  geoLegalFilteringEnabled: boolean;
  neuroEmotionEnabled: boolean;
  predictiveModulationEnabled: boolean;
}

// Request & Response types
export interface BrainHubRequest {
  type: string;
  data: any;
  options?: any;
}

export interface BrainHubResponse {
  success: boolean;
  data: any;
  error?: string;
}
