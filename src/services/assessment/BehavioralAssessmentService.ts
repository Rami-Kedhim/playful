
import { EnhancedBehavioralProfile, BrandResonanceStage, BehavioralLoop, ConsumerDecisionStage } from '@/types/enhancedBehavioral';
import { ChaseHughesBehavioralProfile } from '@/types/chaseHughes';

export class BehavioralAssessmentService {
  /**
   * Generates a comprehensive assessment based on the enhanced behavioral profile
   */
  public generateAssessment(profile: EnhancedBehavioralProfile) {
    // Calculate core assessment scores
    const scores = this.calculateScores(profile);
    
    // Generate personalized recommendations
    const recommendations = this.generateRecommendations(profile);
    
    // Create summary of insights
    const insightSummary = this.createInsightSummary(profile);
    
    // Create a Chase Hughes profile for persuasion framework
    const chaseHughesProfile = this.createChaseHughesProfile(profile);
    
    return {
      assessmentId: `assessment-${Date.now()}`,
      userId: profile.standardProfile.userId,
      timestamp: new Date().toISOString(),
      scores,
      recommendations,
      insightSummary,
      chaseHughesProfile
    };
  }
  
  /**
   * Calculates the core assessment scores based on the profile
   */
  private calculateScores(profile: EnhancedBehavioralProfile) {
    // Calculate engagement potential
    const engagementPotential = this.calculateEngagementPotential(profile);
    
    // Calculate content affinity
    const contentAffinity = this.calculateContentAffinity(profile);
    
    // Calculate monetization propensity
    const monetizationPropensity = this.calculateMonetizationPropensity(profile);
    
    // Calculate retention likelihood
    const retentionLikelihood = profile.marketingOptimizations.retentionRisk ? 
      100 - (profile.marketingOptimizations.retentionRisk * 100) : 
      70; // Default value if not available
    
    return {
      engagementPotential,
      contentAffinity,
      monetizationPropensity,
      retentionLikelihood
    };
  }
  
  /**
   * Calculates the engagement potential score
   */
  private calculateEngagementPotential(profile: EnhancedBehavioralProfile): number {
    let score = 50; // Base score
    
    // Adjust based on behavioral loop stage
    switch (profile.psychographicProfile.behavioralLoop) {
      case BehavioralLoop.Discovery:
        score += 10;
        break;
      case BehavioralLoop.Engagement:
        score += 20;
        break;
      case BehavioralLoop.Conversion:
        score += 15;
        break;
      case BehavioralLoop.Retention:
        score += 25;
        break;
      case BehavioralLoop.Advocacy:
        score += 30;
        break;
    }
    
    // Adjust based on brand resonance
    switch (profile.psychographicProfile.brandResonance) {
      case BrandResonanceStage.Awareness:
        score += 5;
        break;
      case BrandResonanceStage.Consideration:
        score += 10;
        break;
      case BrandResonanceStage.Preference:
        score += 15;
        break;
      case BrandResonanceStage.Purchase:
        score += 20;
        break;
      case BrandResonanceStage.Loyalty:
        score += 25;
        break;
    }
    
    // Cap the score between 0-100
    return Math.min(100, Math.max(0, score));
  }
  
  /**
   * Calculates content affinity score
   */
  private calculateContentAffinity(profile: EnhancedBehavioralProfile): number {
    let score = 50; // Base score
    
    // Adjust based on decision stage
    switch (profile.psychographicProfile.decisionStage) {
      case ConsumerDecisionStage.ProblemRecognition:
        score += 10;
        break;
      case ConsumerDecisionStage.InformationSearch:
        score += 20;
        break;
      case ConsumerDecisionStage.AlternativeEvaluation:
        score += 15;
        break;
      case ConsumerDecisionStage.PurchaseDecision:
        score += 5;
        break;
      case ConsumerDecisionStage.PostPurchaseEvaluation:
        score += 10;
        break;
    }
    
    // Adjust based on content preferences
    if (profile.marketingOptimizations.contentPreferences.includes('videos')) {
      score += 10;
    }
    
    if (profile.marketingOptimizations.contentPreferences.includes('images')) {
      score += 5;
    }
    
    // Cap the score between 0-100
    return Math.min(100, Math.max(0, score));
  }
  
  /**
   * Calculates monetization propensity score
   */
  private calculateMonetizationPropensity(profile: EnhancedBehavioralProfile): number {
    let score = 40; // Base score
    
    // Adjust based on value orientation and price sensitivity
    if (profile.psychographicProfile.valueOrientation && profile.psychographicProfile.priceSensitivity) {
      if (profile.psychographicProfile.valueOrientation === 'emotional') {
        score += 10;
      }
      
      switch (profile.psychographicProfile.priceSensitivity) {
        case 'low':
          score += 20;
          break;
        case 'moderate':
          score += 10;
          break;
        case 'high':
          score -= 10;
          break;
      }
    }
    
    // Adjust based on engagement patterns if available
    if (profile.psychographicProfile.engagementPatterns) {
      if (profile.psychographicProfile.engagementPatterns.includes('high_intent')) {
        score += 15;
      }
    }
    
    // Adjust based on suggested price points
    if (profile.marketingOptimizations.suggestedPricePoints && profile.marketingOptimizations.lifetimeValueEstimate) {
      const maxPricePoint = Math.max(...profile.marketingOptimizations.suggestedPricePoints);
      if (maxPricePoint > 25) {
        score += 10;
      }
    }
    
    // Cap the score between 0-100
    return Math.min(100, Math.max(0, score));
  }
  
  /**
   * Generates personalized recommendations based on the profile
   */
  private generateRecommendations(profile: EnhancedBehavioralProfile): string[] {
    const recommendations: string[] = [];
    
    // Add recommendations based on behavioral loop stage
    switch (profile.psychographicProfile.behavioralLoop) {
      case BehavioralLoop.Discovery:
        recommendations.push("Focus on educational content to build awareness");
        recommendations.push("Use social proof to establish credibility");
        break;
      case BehavioralLoop.Engagement:
        recommendations.push("Provide interactive experiences to deepen engagement");
        recommendations.push("Showcase relevant features based on identified interests");
        break;
      case BehavioralLoop.Conversion:
        recommendations.push("Address potential objections preemptively");
        recommendations.push("Create subtle urgency without applying pressure");
        break;
      case BehavioralLoop.Retention:
        recommendations.push("Provide exclusive content to reward loyalty");
        recommendations.push("Introduce community features to build deeper connection");
        break;
      case BehavioralLoop.Advocacy:
        recommendations.push("Create sharing incentives to leverage advocacy");
        recommendations.push("Provide recognition for community contributions");
        break;
    }
    
    // Add recommendations based on trust level and identified signals
    if (profile.psychographicProfile.trustLevel && profile.psychographicProfile.identifiedSignals) {
      if (profile.psychographicProfile.trustLevel === 'low') {
        recommendations.push("Build trust through transparent communication");
        recommendations.push("Offer risk-free trials to lower perceived risk");
      }
      
      if (profile.psychographicProfile.identifiedSignals.includes('interest')) {
        recommendations.push("Capitalize on detected interest by providing more detailed information");
      }
      
      if (profile.psychographicProfile.identifiedSignals.includes('confusion')) {
        recommendations.push("Simplify messaging to address detected confusion");
      }
      
      if (profile.psychographicProfile.identifiedSignals.includes('consideration')) {
        recommendations.push("Provide comparison tools to assist in the evaluation process");
      }
    }
    
    // Add recommendations based on retention risk
    if (profile.marketingOptimizations.retentionRisk) {
      if (profile.marketingOptimizations.retentionRisk > 0.7) {
        recommendations.push("High churn risk detected - implement immediate engagement strategy");
        recommendations.push("Consider special retention offer to prevent churn");
      } else if (profile.marketingOptimizations.retentionRisk > 0.4) {
        recommendations.push("Moderate churn risk - increase value demonstration");
      }
    }
    
    return recommendations;
  }
  
  /**
   * Creates a summary of key insights from the profile
   */
  private createInsightSummary(profile: EnhancedBehavioralProfile): string {
    // Extract key values
    const {
      behavioralLoop,
      brandResonance,
      trustLevel,
      identifiedSignals,
    } = profile.psychographicProfile;
    
    const {
      retentionRisk,
      recommendedApproach,
      messagingTone,
    } = profile.marketingOptimizations;
    
    // Create a narrative summary
    let summary = `This user is currently in the ${behavioralLoop} stage of their journey, `;
    summary += `with a ${brandResonance} level of brand connection. `;
    
    if (trustLevel) {
      summary += `They exhibit ${trustLevel} trust, `;
    }
    
    if (identifiedSignals && identifiedSignals.length > 0) {
      summary += `showing signals of ${identifiedSignals.join(', ')}. `;
    }
    
    summary += `\n\nThe recommended approach is "${recommendedApproach}" with a "${messagingTone}" tone. `;
    
    if (retentionRisk) {
      const riskPercentage = Math.round(retentionRisk * 100);
      summary += `There is a ${riskPercentage}% risk of churn that should be addressed.`;
    }
    
    return summary;
  }
  
  /**
   * Creates a Chase Hughes behavioral profile for persuasion framework
   */
  private createChaseHughesProfile(profile: EnhancedBehavioralProfile): ChaseHughesBehavioralProfile {
    // Map the enhanced profile to Chase Hughes framework
    const sensoryPreference = this.determineSensoryPreference(profile);
    const influencePhase = this.mapToInfluencePhase(profile.psychographicProfile.behavioralLoop);
    const influencePhaseProgress = this.calculateInfluencePhaseProgress(profile);
    
    const chaseProfile: ChaseHughesBehavioralProfile = {
      primarySensoryPreference: sensoryPreference,
      currentInfluencePhase: influencePhase,
      influencePhaseProgress: influencePhaseProgress,
      detectedMicroExpressions: this.mapToMicroExpressions(profile.psychographicProfile.identifiedSignals),
      responsiveToTechniques: this.determineTechniques(profile),
      suggestedApproach: {
        technique: this.determineTechnique(profile),
        languagePattern: this.determineLanguagePattern(profile)
      },
      trustScore: this.calculateTrustScore(profile),
      desireScore: this.calculateDesireScore(profile),
      engagementScore: this.calculateEngagementScore(profile)
    };
    
    return chaseProfile;
  }
  
  /**
   * Maps behavioral loop to Chase Hughes influence phase
   */
  private mapToInfluencePhase(loop: BehavioralLoop): string {
    switch (loop) {
      case BehavioralLoop.Discovery: return 'interest';
      case BehavioralLoop.Engagement: return 'trust';
      case BehavioralLoop.Conversion: return 'desire';
      case BehavioralLoop.Retention: return 'loyalty';
      default: return 'interest';
    }
  }
  
  /**
   * Determines the primary sensory preference
   */
  private determineSensoryPreference(profile: EnhancedBehavioralProfile): 'visual' | 'auditory' | 'kinesthetic' {
    const contentPreferences = profile.marketingOptimizations.contentPreferences || [];
    
    if (contentPreferences.includes('videos') || contentPreferences.includes('images')) {
      return 'visual';
    }
    
    if (contentPreferences.includes('audio') || contentPreferences.includes('podcasts')) {
      return 'auditory';
    }
    
    return 'kinesthetic';
  }
  
  /**
   * Maps identified signals to microexpressions
   */
  private mapToMicroExpressions(signals: string[] = []): string[] {
    const expressionMap: {[key: string]: string} = {
      'interest': 'happiness',
      'excitement': 'happiness',
      'confusion': 'confusion',
      'consideration': 'surprise',
      'hesitation': 'fear'
    };
    
    return signals.map(signal => expressionMap[signal] || 'neutral');
  }
  
  /**
   * Determines responsive techniques based on profile
   */
  private determineTechniques(profile: EnhancedBehavioralProfile): string[] {
    const techniques: string[] = [];
    
    if (profile.psychographicProfile.trustLevel === 'low') {
      techniques.push('social_proof');
      techniques.push('authority_positioning');
    } else if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Conversion) {
      techniques.push('reciprocity_trigger');
      techniques.push('scarcity_framing');
    } else {
      techniques.push('yes_ladder');
      techniques.push('likeability_enhancement');
    }
    
    return techniques;
  }
  
  /**
   * Calculates influence phase progress
   */
  private calculateInfluencePhaseProgress(profile: EnhancedBehavioralProfile): number {
    // This would be more sophisticated in a real implementation
    switch (profile.psychographicProfile.behavioralLoop) {
      case BehavioralLoop.Discovery:
        return Math.floor(Math.random() * 50) + 30; // 30-80%
      case BehavioralLoop.Engagement:
        return Math.floor(Math.random() * 40) + 40; // 40-80%
      case BehavioralLoop.Conversion:
        return Math.floor(Math.random() * 30) + 60; // 60-90%
      case BehavioralLoop.Retention:
        return Math.floor(Math.random() * 20) + 75; // 75-95%
      default:
        return 50;
    }
  }
  
  /**
   * Determines the optimal persuasion technique
   */
  private determineTechnique(profile: EnhancedBehavioralProfile): string {
    if (profile.psychographicProfile.trustLevel === 'low') {
      return 'social_proof';
    } else if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Conversion) {
      return 'reciprocity_trigger';
    } else {
      return 'yes_ladder';
    }
  }
  
  /**
   * Determines the optimal language pattern
   */
  private determineLanguagePattern(profile: EnhancedBehavioralProfile): string {
    if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Discovery) {
      return "Before I show you more, I'd like to understand what specifically interests you most...";
    } else if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Engagement) {
      return "Many users like you have found that...";
    } else {
      return "You seem like someone who values quality, which is why...";
    }
  }
  
  /**
   * Calculates trust score based on profile
   */
  private calculateTrustScore(profile: EnhancedBehavioralProfile): number {
    const trustLevelMap: {[key: string]: number} = {
      'low': 30,
      'moderate': 60,
      'high': 85
    };
    
    const baseScore = profile.psychographicProfile.trustLevel ? 
      trustLevelMap[profile.psychographicProfile.trustLevel] : 50;
    
    // Adjust based on behavioral signals
    const behavioralAdjustment = profile.psychographicProfile.identifiedSignals?.includes('interest') ? 10 : 0;
    
    return Math.min(100, Math.max(0, baseScore + behavioralAdjustment));
  }
  
  /**
   * Calculates desire score based on profile
   */
  private calculateDesireScore(profile: EnhancedBehavioralProfile): number {
    const loopScoreMap: {[key: string]: number} = {
      [BehavioralLoop.Discovery]: 20,
      [BehavioralLoop.Engagement]: 40,
      [BehavioralLoop.Conversion]: 70,
      [BehavioralLoop.Retention]: 60,
      [BehavioralLoop.Advocacy]: 80
    };
    
    const baseScore = loopScoreMap[profile.psychographicProfile.behavioralLoop] || 40;
    
    // Adjust based on brand resonance
    const resonanceAdjustment = profile.psychographicProfile.brandResonance === BrandResonanceStage.Preference ? 15 : 0;
    
    return Math.min(100, Math.max(0, baseScore + resonanceAdjustment));
  }
  
  /**
   * Calculates engagement score based on profile
   */
  private calculateEngagementScore(profile: EnhancedBehavioralProfile): number {
    // Base score from behavioral loop
    let baseScore = 50;
    
    if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Engagement) {
      baseScore = 70;
    } else if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Conversion) {
      baseScore = 80;
    } else if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Retention) {
      baseScore = 85;
    }
    
    // Retention risk adjustment (inverse relationship)
    const retentionAdjustment = profile.marketingOptimizations.retentionRisk ? 
      -Math.round(profile.marketingOptimizations.retentionRisk * 20) : 0;
    
    return Math.min(100, Math.max(0, baseScore + retentionAdjustment));
  }
  
  /**
   * Gets priority insights based on the profile
   */
  public getPriorityInsights(profile: EnhancedBehavioralProfile): string[] {
    const insights: string[] = [];
    
    // Add insight based on trust level
    if (profile.psychographicProfile.trustLevel === 'low') {
      insights.push("Trust building is the top priority - focus on credibility signals");
    } else if (profile.psychographicProfile.trustLevel === 'high') {
      insights.push("High trust established - leverage for deeper engagement");
    }
    
    // Add insight based on behavioral loop
    if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Discovery) {
      insights.push("User is in early discovery phase - focus on education and awareness");
    } else if (profile.psychographicProfile.behavioralLoop === BehavioralLoop.Conversion) {
      insights.push("User is in conversion phase - address friction points and objections");
    }
    
    // Add insight based on retention risk
    if (profile.marketingOptimizations.retentionRisk && profile.marketingOptimizations.retentionRisk > 0.6) {
      insights.push(`High retention risk (${Math.round(profile.marketingOptimizations.retentionRisk * 100)}%) - immediate attention needed`);
    }
    
    // Add insight based on lifetime value
    if (profile.marketingOptimizations.lifetimeValueEstimate && profile.marketingOptimizations.lifetimeValueEstimate > 100) {
      insights.push(`High lifetime value potential (${profile.marketingOptimizations.lifetimeValueEstimate}) - invest in relationship`);
    }
    
    return insights;
  }
  
  /**
   * Gets insights filtered by category
   */
  public getInsightsByCategory(profile: EnhancedBehavioralProfile, category: string): string[] {
    switch (category) {
      case 'engagement':
        return this.getEngagementInsights(profile);
      case 'monetization':
        return this.getMonetizationInsights(profile);
      case 'retention':
        return this.getRetentionInsights(profile);
      case 'messaging':
        return this.getMessagingInsights(profile);
      default:
        return this.getPriorityInsights(profile);
    }
  }
  
  /**
   * Gets engagement-specific insights
   */
  private getEngagementInsights(profile: EnhancedBehavioralProfile): string[] {
    const insights: string[] = [];
    
    // Content preference insights
    insights.push(`Primary content preference: ${profile.marketingOptimizations.contentPreferences[0] || 'Not determined'}`);
    
    // Behavioral loop insights
    insights.push(`User is in the ${profile.psychographicProfile.behavioralLoop} stage of the behavioral loop`);
    
    // Identified signals insights
    if (profile.psychographicProfile.identifiedSignals && profile.psychographicProfile.identifiedSignals.length > 0) {
      insights.push(`Key signals detected: ${profile.psychographicProfile.identifiedSignals.join(', ')}`);
    }
    
    return insights;
  }
  
  /**
   * Gets monetization-specific insights
   */
  private getMonetizationInsights(profile: EnhancedBehavioralProfile): string[] {
    const insights: string[] = [];
    
    // Price sensitivity insights
    insights.push(`Price sensitivity: ${profile.psychographicProfile.priceSensitivity || 'Not determined'}`);
    
    // Decision stage insights
    if (profile.psychographicProfile.decisionStage) {
      insights.push(`Decision stage: ${profile.psychographicProfile.decisionStage}`);
    }
    
    // Value orientation insights
    if (profile.psychographicProfile.valueOrientation) {
      insights.push(`Value orientation: ${profile.psychographicProfile.valueOrientation}`);
    }
    
    // Price point insights
    if (profile.marketingOptimizations.suggestedPricePoints && profile.marketingOptimizations.suggestedPricePoints.length > 0) {
      insights.push(`Suggested price points: ${profile.marketingOptimizations.suggestedPricePoints.join(', ')}`);
    }
    
    return insights;
  }
  
  /**
   * Gets retention-specific insights
   */
  private getRetentionInsights(profile: EnhancedBehavioralProfile): string[] {
    const insights: string[] = [];
    
    // Trust level insights
    insights.push(`Trust level: ${profile.psychographicProfile.trustLevel || 'Not determined'}`);
    
    // Behavioral loop insights
    insights.push(`Behavioral loop stage: ${profile.psychographicProfile.behavioralLoop || 'Not determined'}`);
    
    // Retention risk insights
    if (profile.marketingOptimizations.retentionRisk !== undefined) {
      const riskPercentage = Math.round(profile.marketingOptimizations.retentionRisk * 100);
      insights.push(`Retention risk: ${riskPercentage}%`);
    }
    
    // Price sensitivity insights
    insights.push(`Price sensitivity: ${profile.psychographicProfile.priceSensitivity || 'Not determined'}`);
    
    return insights;
  }
  
  /**
   * Gets messaging-specific insights
   */
  private getMessagingInsights(profile: EnhancedBehavioralProfile): string[] {
    const insights: string[] = [];
    
    // Recommended approach insights
    insights.push(`Recommended messaging approach: ${profile.marketingOptimizations.recommendedApproach}`);
    
    // Tone insights
    insights.push(`Optimal messaging tone: ${profile.marketingOptimizations.messagingTone}`);
    
    // Next best action insights
    if (profile.marketingOptimizations.nextBestAction) {
      insights.push(`Next best action: ${profile.marketingOptimizations.nextBestAction}`);
    }
    
    // Content preferences insights
    insights.push(`Content preferences: ${profile.marketingOptimizations.contentPreferences.join(', ')}`);
    
    return insights;
  }
}
