
import neuralHub from '@/services/neural/HermesOxumNeuralHub';
import sensoryPreferenceTracker from '@/services/behavioral/SensoryPreferenceTracker';
import emotionalPhaseAnalyzer from '@/services/behavioral/EmotionalPhaseAnalyzer';
import chaseHughesAnalyzer from '@/services/behavioral/ChaseHughesBehavioralAnalyzer';
import { toast } from '@/components/ui/use-toast';

/**
 * HermesOxumIntegration - Unified service that integrates all behavioral and neural components
 * Creates a seamless flow of behavioral data and insights across the application
 */
export class HermesOxumIntegration {
  private static instance: HermesOxumIntegration;
  private observers: Array<(insights: any) => void> = [];
  private isInitialized = false;
  
  private constructor() {}
  
  public static getInstance(): HermesOxumIntegration {
    if (!HermesOxumIntegration.instance) {
      HermesOxumIntegration.instance = new HermesOxumIntegration();
    }
    return HermesOxumIntegration.instance;
  }
  
  /**
   * Initialize the integration with the neural hub and behavioral services
   */
  public initialize(): void {
    if (this.isInitialized) return;
    
    console.log('Initializing HERMES-OXUM Integration');
    
    // Connect to neural hub metrics updates
    neuralHub.addObserver(metrics => {
      this.processNeuralHubMetrics(metrics);
    });
    
    this.isInitialized = true;
    
    // Initial notification
    toast({
      title: "HERMES-OXUM Integration Active",
      description: "Enhanced behavioral tracking and neural flow analysis enabled",
      variant: "default"
    });
  }
  
  /**
   * Process user interaction data and update all services
   */
  public processUserInteraction(
    userId: string, 
    interactionType: string,
    data: any
  ): void {
    if (!userId) return;
    
    // Update sensory preference tracking if there's message content
    if (interactionType === 'message' && data?.content) {
      sensoryPreferenceTracker.processMessage({
        content: data.content,
        timestamp: new Date(),
        userId
      });
    }
    
    // Update emotional phase tracking
    emotionalPhaseAnalyzer.trackInteraction(userId, interactionType, data);
    
    // Generate insights
    const insights = this.generateUserInsights(userId);
    
    // Notify observers
    this.notifyObservers(insights);
    
    console.log('HERMES-OXUM Integration processed interaction:', interactionType, insights);
  }
  
  /**
   * Process neural hub metrics and update services
   */
  private processNeuralHubMetrics(metrics: any): void {
    // Update neural hyperparameters based on metrics
    const modelParams = neuralHub.getModelParameters();
    
    // Adaptive adjustment based on system health
    const adaptiveParams = {
      ...modelParams,
      // Increase diffusion rate when stability is low
      diffusionRate: metrics.stability < 0.5 ? 
        modelParams.diffusionRate * 1.2 : modelParams.diffusionRate,
      
      // Decrease randomness when user engagement is high
      randomnessFactor: metrics.userEngagement > 0.7 ? 
        modelParams.randomnessFactor * 0.8 : modelParams.randomnessFactor
    };
    
    // Apply adaptive parameters
    neuralHub.updateModelParameters(adaptiveParams);
  }
  
  /**
   * Generate comprehensive user insights by combining data from all services
   */
  public generateUserInsights(userId: string): any {
    if (!userId) return {};
    
    // Get neural hub metrics
    const neuralMetrics = neuralHub.getHealthMetrics();
    
    // Get sensory preferences
    const sensoryPreferences = sensoryPreferenceTracker.getUserPreferences(userId);
    
    // Get emotional phase data
    const emotionalPhaseData = emotionalPhaseAnalyzer.getUserEmotionalData(userId);
    
    // Generate Chase Hughes behavioral profile
    const chaseHughesProfile = chaseHughesAnalyzer.createBehavioralProfile({
      primarySensoryPreference: sensoryPreferences.primary || 'visual',
      secondarySensoryPreference: sensoryPreferences.secondary,
      currentInfluencePhase: emotionalPhaseData.phase,
      influencePhaseProgress: emotionalPhaseData.progress,
      trustScore: neuralMetrics.stability * 100,
      desireScore: emotionalPhaseData.phase === 'desire' ? 
        emotionalPhaseData.progress : emotionalPhaseData.phase === 'action' || emotionalPhaseData.phase === 'loyalty' ? 
        80 : 40,
      engagementScore: emotionalPhaseData.engagementScore
    });
    
    // Combine all insights into a unified object
    return {
      neuralMetrics,
      sensoryPreferences,
      emotionalPhase: emotionalPhaseData,
      chaseHughesProfile
    };
  }
  
  /**
   * Register an observer to receive insights updates
   */
  public addObserver(callback: (insights: any) => void): void {
    this.observers.push(callback);
  }
  
  /**
   * Remove an observer
   */
  public removeObserver(callback: (insights: any) => void): void {
    this.observers = this.observers.filter(observer => observer !== callback);
  }
  
  /**
   * Notify all observers with updated insights
   */
  private notifyObservers(insights: any): void {
    this.observers.forEach(observer => observer(insights));
  }
  
  /**
   * Clear user data from all services
   */
  public clearUserData(userId: string): void {
    sensoryPreferenceTracker.clearUserData(userId);
    emotionalPhaseAnalyzer.clearUserData(userId);
  }
}

export const hermesOxumIntegration = HermesOxumIntegration.getInstance();
export default hermesOxumIntegration;
