
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
  private userInteractions: Record<string, {
    messages: { content: string; isUser: boolean; timestamp: Date }[];
    clickPatterns: { element: string; timeViewing: number; timestamp: Date }[];
    pageViews: { page: string; timeSpent: number; timestamp: Date }[];
    responseDelays: number[];
  }> = {};
  
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
    
    // Initialize user interactions record if it doesn't exist
    if (!this.userInteractions[userId]) {
      this.userInteractions[userId] = {
        messages: [],
        clickPatterns: [],
        pageViews: [],
        responseDelays: []
      };
    }
    
    // Track interaction based on type
    const now = new Date();
    
    switch (interactionType) {
      case 'message':
        if (data?.content) {
          // Add to messages history
          this.userInteractions[userId].messages.push({
            content: data.content,
            isUser: true,
            timestamp: now
          });
          
          // Update sensory preference tracking
          sensoryPreferenceTracker.processMessage({
            content: data.content,
            timestamp: now,
            userId
          });
        }
        break;
        
      case 'click':
        if (data?.element && data?.timeViewing) {
          this.userInteractions[userId].clickPatterns.push({
            element: data.element,
            timeViewing: data.timeViewing,
            timestamp: now
          });
        }
        break;
        
      case 'page_view':
        if (data?.page && data?.timeSpent) {
          this.userInteractions[userId].pageViews.push({
            page: data.page,
            timeSpent: data.timeSpent,
            timestamp: now
          });
        }
        break;
        
      case 'response_delay':
        if (typeof data?.delay === 'number') {
          this.userInteractions[userId].responseDelays.push(data.delay);
        }
        break;
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
    
    // Prepare interaction data for Chase Hughes analyzer
    const userInteractions = this.userInteractions[userId] || {
      messages: [],
      clickPatterns: [],
      pageViews: [],
      responseDelays: []
    };
    
    // Generate Chase Hughes behavioral profile
    const chaseHughesProfile = chaseHughesAnalyzer.createBehavioralProfile({
      messageHistory: userInteractions.messages.length > 0 ? 
        userInteractions.messages.map(m => ({ 
          content: m.content, 
          isUser: m.isUser 
        })) : 
        [
          { content: "I'm interested in learning more", isUser: true },
          { content: "Could you tell me about the features?", isUser: true }
        ],
      interactionHistory: {
        clickPatterns: userInteractions.clickPatterns.length > 0 ?
          userInteractions.clickPatterns.map(c => ({
            element: c.element,
            timeViewing: c.timeViewing
          })) : 
          [{ element: 'pricing-button', timeViewing: 30 }],
        pageViews: userInteractions.pageViews.length > 0 ?
          userInteractions.pageViews.map(p => ({
            page: p.page,
            timeSpent: p.timeSpent
          })) :
          [{ page: '/home', timeSpent: 120 }],
        responseDelays: userInteractions.responseDelays.length > 0 ?
          userInteractions.responseDelays : [2.5, 1.8]
      },
      contentPreferences: sensoryPreferences.primary ? [sensoryPreferences.primary] : []
    });
    
    // Combine all insights into a unified object
    return {
      neuralMetrics,
      sensoryPreferences,
      emotionalPhase: emotionalPhaseData,
      chaseHughesProfile,
      // Add auto-drive recommendations based on all data
      autoDrive: {
        // Recommended engagement strategy based on emotional phase
        recommendedStrategy: this.determineEngagementStrategy(
          emotionalPhaseData.phase, 
          chaseHughesProfile,
          sensoryPreferences
        ),
        // Content recommendations based on sensory preferences
        contentRecommendations: this.generateContentRecommendations(sensoryPreferences, emotionalPhaseData),
        // UI optimization suggestions based on Schauberger flow
        uiSuggestions: this.generateUISuggestions(neuralMetrics, emotionalPhaseData),
        // Determine if AI assistant (Lucie) should be triggered
        isLucieEnabled: this.shouldEnableLucie(chaseHughesProfile, emotionalPhaseData),
        // Action recommendations
        recommendedActions: this.generateRecommendedActions(chaseHughesProfile, emotionalPhaseData)
      }
    };
  }
  
  /**
   * Determine engagement strategy based on user state
   */
  private determineEngagementStrategy(
    emotionalPhase: string, 
    chaseHughesProfile: any,
    sensoryPreferences: any
  ): string {
    if (!emotionalPhase) return 'information_providing';
    
    switch(emotionalPhase) {
      case 'interest':
        return 'curiosity_building';
      case 'trust':
        return chaseHughesProfile.trustScore < 60 ? 
          'trust_building' : 'value_demonstration';
      case 'desire':
        return 'desire_amplification';
      case 'action':
        return 'call_to_action';
      case 'loyalty':
        return 'relationship_deepening';
      default:
        return 'information_providing';
    }
  }
  
  /**
   * Generate content recommendations based on sensory preferences
   */
  private generateContentRecommendations(sensoryPreferences: any, emotionalPhaseData: any): any[] {
    const recommendations = [];
    
    if (!sensoryPreferences.primary) return recommendations;
    
    // Based on primary sensory preference
    switch(sensoryPreferences.primary) {
      case 'visual':
        recommendations.push({
          type: 'visual',
          content: 'image_gallery',
          reason: 'Primary visual preference detected'
        });
        recommendations.push({
          type: 'visual',
          content: 'video_testimonial',
          reason: 'Visual demonstrations increase engagement'
        });
        break;
      case 'auditory':
        recommendations.push({
          type: 'auditory',
          content: 'audio_message',
          reason: 'Primary auditory preference detected'
        });
        recommendations.push({
          type: 'auditory',
          content: 'voice_interaction',
          reason: 'Voice interactions increase engagement'
        });
        break;
      case 'kinesthetic':
        recommendations.push({
          type: 'kinesthetic',
          content: 'interactive_element',
          reason: 'Primary kinesthetic preference detected'
        });
        recommendations.push({
          type: 'kinesthetic',
          content: '3d_viewer',
          reason: 'Interactive 3D experiences increase engagement'
        });
        break;
    }
    
    // Add phase-specific recommendations
    if (emotionalPhaseData.phase === 'desire') {
      recommendations.push({
        type: 'conversion',
        content: 'limited_offer',
        reason: 'User is in desire phase, ready for conversion'
      });
    }
    
    return recommendations;
  }
  
  /**
   * Generate UI suggestions based on metrics and emotional phase
   */
  private generateUISuggestions(neuralMetrics: any, emotionalPhaseData: any): any {
    // Default suggestion
    const suggestions = {
      colorScheme: 'default',
      layoutDensity: 'medium',
      animationLevel: 'medium',
      contentFocus: 'balanced',
      callToActionVisibility: 'standard'
    };
    
    // Adjust based on stability
    if (neuralMetrics.stability < 0.4) {
      suggestions.colorScheme = 'calming';
      suggestions.animationLevel = 'minimal';
    } else if (neuralMetrics.stability > 0.8) {
      suggestions.colorScheme = 'dynamic';
      suggestions.animationLevel = 'enhanced';
    }
    
    // Adjust based on user engagement
    if (neuralMetrics.userEngagement > 0.7) {
      suggestions.layoutDensity = 'high';
      suggestions.contentFocus = 'detailed';
    } else if (neuralMetrics.userEngagement < 0.3) {
      suggestions.layoutDensity = 'low';
      suggestions.contentFocus = 'simplified';
    }
    
    // Adjust based on emotional phase
    if (emotionalPhaseData.phase === 'trust' || emotionalPhaseData.phase === 'interest') {
      suggestions.callToActionVisibility = 'subtle';
    } else if (emotionalPhaseData.phase === 'desire' || emotionalPhaseData.phase === 'action') {
      suggestions.callToActionVisibility = 'prominent';
    }
    
    return suggestions;
  }
  
  /**
   * Determine if AI assistant should be enabled
   */
  private shouldEnableLucie(chaseHughesProfile: any, emotionalPhaseData: any): boolean {
    // Enable Lucie for users in desire phase or with high engagement score
    if (emotionalPhaseData.phase === 'desire' && emotionalPhaseData.progress > 60) {
      return true;
    }
    
    if (emotionalPhaseData.engagementScore > 70) {
      return true;
    }
    
    // Enable for users who need trust building
    if (emotionalPhaseData.phase === 'trust' && chaseHughesProfile.trustScore < 50) {
      return true;
    }
    
    return false;
  }
  
  /**
   * Generate recommended actions based on user profile
   */
  private generateRecommendedActions(chaseHughesProfile: any, emotionalPhaseData: any): string[] {
    const actions = [];
    
    // Phase-specific actions
    switch(emotionalPhaseData.phase) {
      case 'interest':
        actions.push('Show introductory content');
        actions.push('Present social proof elements');
        break;
      case 'trust':
        actions.push('Display testimonials');
        actions.push('Show security badges');
        actions.push('Offer free content sample');
        break;
      case 'desire':
        actions.push('Present exclusive offer');
        actions.push('Show limited availability');
        break;
      case 'action':
        actions.push('Simplify checkout process');
        actions.push('Show progress indicators');
        break;
      case 'loyalty':
        actions.push('Offer loyalty rewards');
        actions.push('Ask for referrals');
        break;
    }
    
    // Add technique-specific actions
    if (chaseHughesProfile.suggestedApproach?.technique) {
      switch(chaseHughesProfile.suggestedApproach.technique) {
        case 'social_proof':
          actions.push('Highlight popular choices');
          break;
        case 'scarcity_framing':
          actions.push('Display countdown timer');
          break;
        case 'reciprocity_trigger':
          actions.push('Offer free digital asset');
          break;
      }
    }
    
    return actions;
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
    
    // Clear local user interactions data
    if (this.userInteractions[userId]) {
      delete this.userInteractions[userId];
    }
  }
  
  /**
   * Track page view with automatic time spent calculation
   */
  public trackPageView(userId: string, page: string): () => void {
    const startTime = Date.now();
    
    // Return a function to call when leaving the page
    return () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // Time in seconds
      
      this.processUserInteraction(userId, 'page_view', {
        page,
        timeSpent
      });
    };
  }
  
  /**
   * Track element click with viewing time
   */
  public trackElementClick(userId: string, element: string, timeViewing: number): void {
    this.processUserInteraction(userId, 'click', {
      element,
      timeViewing
    });
  }
}

export const hermesOxumIntegration = HermesOxumIntegration.getInstance();
export default hermesOxumIntegration;
