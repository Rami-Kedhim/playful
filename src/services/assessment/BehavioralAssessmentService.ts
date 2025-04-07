
import { 
  TrustLevel, 
  PriceSensitivity, 
  ConsumerDecisionStage,
  BehavioralLoop,
  ValueOrientation
} from '@/types/enhancedBehavioral';

// Types for Assessment
export type InfluencePhase = 'interest' | 'trust' | 'desire' | 'action' | 'loyalty';

export type MicroExpression = 
  | 'interest'
  | 'confusion'
  | 'doubt'
  | 'excitement'
  | 'hesitation'
  | 'conviction'
  | 'objection'
  | 'consideration';

export type InfluenceTechnique = 
  | 'social_proof'
  | 'scarcity'
  | 'authority'
  | 'reciprocity'
  | 'commitment'
  | 'liking'
  | 'unity';

export interface AssessmentInsight {
  title: string;
  description: string;
  category: string;
  severityLevel: 'low' | 'medium' | 'high';
  recommendedActions: string[];
}

export interface AssessmentResult {
  overallScore: number;
  engagementHealthScore: number;
  conversionPotentialScore: number;
  retentionRiskScore: number;
  summary: string;
  strengthAreas: string[];
  improvementAreas: string[];
  insights: AssessmentInsight[];
  flags: {
    title: string;
    description: string;
    severityLevel: 'low' | 'medium' | 'high';
    recommendedActions: string[];
  }[];
  psychographicProfile: {
    personalityTraits: string[];
    interests: string[];
    values: string[];
    motivations: string[];
  };
}

export interface BehaviorEvent {
  eventType: string;
  timestamp: Date;
  metadata: Record<string, any>;
}

export interface BehaviorAssessment {
  userBehavior: BehaviorEvent[];
  influencePhase: InfluencePhase;
  microExpressions: MicroExpression[];
  influenceTechniques: InfluenceTechnique[];
  suggestedApproach: {
    technique: InfluenceTechnique;
    implementation: string;
  };
}

class BehavioralAssessmentService {
  // Assess price sensitivity based on behavior
  assessPriceSensitivity(behavior: BehaviorEvent[]): PriceSensitivity {
    // Look for price-related behaviors
    const priceCheckCount = behavior.filter(event => 
      event.eventType === 'price_check' || 
      event.eventType === 'discount_search'
    ).length;
    
    const abandonedCarts = behavior.filter(event => 
      event.eventType === 'cart_abandon'
    ).length;
    
    // Calculate a price sensitivity score
    let sensitivityScore = 0;
    
    if (priceCheckCount > 5) sensitivityScore += 30;
    else if (priceCheckCount > 2) sensitivityScore += 20;
    else if (priceCheckCount > 0) sensitivityScore += 10;
    
    if (abandonedCarts > 2) sensitivityScore += 50;
    else if (abandonedCarts > 0) sensitivityScore += 30;
    
    // Map score to enum
    if (sensitivityScore >= 50) return PriceSensitivity.High;
    if (sensitivityScore >= 20) return PriceSensitivity.Moderate;
    return PriceSensitivity.Low;
  }
  
  // Determine consumer decision stage
  determineDecisionStage(behavior: BehaviorEvent[]): ConsumerDecisionStage {
    // Count different types of behavior events
    const researchEvents = behavior.filter(event => 
      event.eventType === 'view_information' || 
      event.eventType === 'read_details' ||
      event.eventType === 'search_query'
    ).length;
    
    const comparisonEvents = behavior.filter(event => 
      event.eventType === 'compare_items' || 
      event.eventType === 'toggle_features' ||
      event.eventType === 'view_alternatives'
    ).length;
    
    const purchaseEvents = behavior.filter(event => 
      event.eventType === 'add_to_cart' || 
      event.eventType === 'view_cart' ||
      event.eventType === 'checkout_start'
    ).length;
    
    const postPurchaseEvents = behavior.filter(event => 
      event.eventType === 'leave_review' || 
      event.eventType === 'submit_feedback'
    ).length;
    
    // Determine stage based on predominant behavior
    if (postPurchaseEvents > 0) return ConsumerDecisionStage.PostPurchaseEvaluation;
    if (purchaseEvents > comparisonEvents && purchaseEvents > researchEvents) return ConsumerDecisionStage.PurchaseDecision;
    if (comparisonEvents > researchEvents) return ConsumerDecisionStage.AlternativeEvaluation;
    if (researchEvents > 0) return ConsumerDecisionStage.InformationSearch;
    return ConsumerDecisionStage.ProblemRecognition;
  }
  
  // Assess trust level based on behavior
  assessTrustLevel(behavior: BehaviorEvent[]): TrustLevel {
    // Look for trust-indicating behaviors
    const highTrustActions = behavior.filter(event => 
      event.eventType === 'provide_personal_info' || 
      event.eventType === 'save_payment_method' ||
      event.eventType === 'refer_friend'
    ).length;
    
    const moderateTrustActions = behavior.filter(event => 
      event.eventType === 'subscribe_newsletter' || 
      event.eventType === 'create_account'
    ).length;
    
    const lowTrustActions = behavior.filter(event => 
      event.eventType === 'read_reviews' || 
      event.eventType === 'check_security' ||
      event.eventType === 'view_privacy_policy'
    ).length;
    
    // Calculate trust score
    let trustScore = 0;
    trustScore += highTrustActions * 20;
    trustScore += moderateTrustActions * 10;
    trustScore -= lowTrustActions * 5; // Checking security policies may indicate lower trust
    
    // Ensure score is within bounds
    trustScore = Math.max(trustScore, 0);
    trustScore = Math.min(trustScore, 100);
    
    // Map to trust level enum
    if (trustScore >= 70) return TrustLevel.High;
    if (trustScore >= 40) return TrustLevel.Moderate;
    return TrustLevel.Low;
  }
  
  // Create behavioral assessment based on events
  createBehavioralAssessment(behaviorEvents: BehaviorEvent[]): BehaviorAssessment {
    // Default assessment
    let assessment: BehaviorAssessment = {
      userBehavior: behaviorEvents,
      influencePhase: 'interest' as InfluencePhase,
      microExpressions: ['interest'],
      influenceTechniques: ['social_proof'],
      suggestedApproach: {
        technique: 'social_proof',
        implementation: 'Show number of users who have purchased this item'
      }
    };
    
    // Determine influence phase based on behavior
    const viewCount = behaviorEvents.filter(e => e.eventType.includes('view')).length;
    const interactionCount = behaviorEvents.filter(e => e.eventType.includes('click') || e.eventType.includes('select')).length;
    const conversionEvents = behaviorEvents.filter(e => e.eventType.includes('purchase') || e.eventType.includes('subscribe')).length;
    const repeatEvents = behaviorEvents.filter(e => e.eventType.includes('repeat_purchase') || e.eventType.includes('renew')).length;
    
    if (repeatEvents > 0) {
      assessment.influencePhase = 'loyalty';
    } else if (conversionEvents > 0) {
      assessment.influencePhase = 'action';
    } else if (interactionCount > viewCount) {
      assessment.influencePhase = 'desire';
    } else if (viewCount > 3) {
      assessment.influencePhase = 'trust';
    } else {
      assessment.influencePhase = 'interest';
    }
    
    // Identify micro-expressions based on behavior patterns
    assessment.microExpressions = this.identifyMicroExpressions(behaviorEvents);
    
    // Determine effective influence techniques
    assessment.influenceTechniques = this.determineInfluenceTechniques(behaviorEvents, assessment.influencePhase);
    
    // Suggest the most effective approach
    assessment.suggestedApproach = {
      technique: assessment.influenceTechniques[0],
      implementation: this.getImplementationSuggestion(assessment.influenceTechniques[0], assessment.influencePhase)
    };
    
    return assessment;
  }
  
  // Identify micro-expressions from behavior
  private identifyMicroExpressions(events: BehaviorEvent[]): MicroExpression[] {
    const expressions: MicroExpression[] = [];
    
    // Look for patterns indicating specific micro-expressions
    if (events.some(e => e.eventType === 'hover_time_extended')) {
      expressions.push('interest');
    }
    
    if (events.some(e => e.eventType === 'back_button')) {
      expressions.push('confusion');
    }
    
    if (events.some(e => e.eventType === 'view_reviews_multiple')) {
      expressions.push('doubt');
    }
    
    if (events.some(e => e.eventType === 'quick_clicks_multiple')) {
      expressions.push('excitement');
    }
    
    // Default if no expressions detected
    if (expressions.length === 0) {
      expressions.push('interest');
    }
    
    return expressions;
  }
  
  // Determine effective influence techniques based on behavior and phase
  private determineInfluenceTechniques(events: BehaviorEvent[], phase: InfluencePhase): InfluenceTechnique[] {
    const techniques: InfluenceTechnique[] = [];
    
    // Different techniques are effective at different phases
    switch (phase) {
      case 'interest':
        techniques.push('social_proof');
        if (events.some(e => e.eventType === 'view_limited_offer')) {
          techniques.push('scarcity');
        }
        break;
        
      case 'trust':
        techniques.push('authority');
        techniques.push('social_proof');
        break;
        
      case 'desire':
        techniques.push('scarcity');
        techniques.push('reciprocity');
        break;
        
      case 'action':
        techniques.push('commitment');
        techniques.push('scarcity');
        break;
        
      case 'loyalty':
        techniques.push('reciprocity');
        techniques.push('unity');
        break;
    }
    
    // If no techniques determined, default to social proof
    if (techniques.length === 0) {
      techniques.push('social_proof');
    }
    
    return techniques;
  }
  
  // Get specific implementation suggestion for influence technique
  private getImplementationSuggestion(technique: InfluenceTechnique, phase: InfluencePhase): string {
    switch (technique) {
      case 'social_proof':
        return 'Show customer testimonials and usage statistics';
      
      case 'scarcity':
        return 'Display limited time offer with countdown timer';
      
      case 'authority':
        return 'Highlight expert endorsements and certifications';
      
      case 'reciprocity':
        return 'Offer a free gift or discount with purchase';
      
      case 'commitment':
        return 'Implement a progress tracker for completion';
      
      case 'liking':
        return 'Personalize communications based on user preferences';
      
      case 'unity':
        return 'Create an exclusive community or membership benefit';
      
      default:
        return 'Show number of people who have purchased';
    }
  }
  
  // Analyze user behavior and generate assessment report
  public async analyzeUserBehavior(
    userId: string, 
    behaviorEvents: BehaviorEvent[]
  ): Promise<AssessmentResult> {
    // Create a detailed assessment report
    const trustLevel = this.assessTrustLevel(behaviorEvents);
    const priceSensitivity = this.assessPriceSensitivity(behaviorEvents);
    const decisionStage = this.determineDecisionStage(behaviorEvents);
    const behavioralAssessment = this.createBehavioralAssessment(behaviorEvents);
    
    // Calculate scores
    const engagementScore = this.calculateEngagementScore(behaviorEvents, behavioralAssessment);
    const conversionScore = this.calculateConversionPotential(trustLevel, priceSensitivity, behavioralAssessment);
    const retentionRiskScore = this.calculateRetentionRisk(behaviorEvents, behavioralAssessment);
    
    // Overall score is weighted average
    const overallScore = Math.round(
      (engagementScore * 0.3) + 
      (conversionScore * 0.4) + 
      ((100 - retentionRiskScore) * 0.3)
    );
    
    // Generate insights based on scores and assessment
    const insights = this.generateInsights(
      trustLevel, 
      priceSensitivity, 
      behavioralAssessment,
      engagementScore,
      conversionScore,
      retentionRiskScore
    );
    
    // Generate summary
    const summary = this.generateSummary(
      overallScore,
      engagementScore,
      conversionScore,
      retentionRiskScore,
      behavioralAssessment.influencePhase
    );
    
    // Identify strengths and improvement areas
    const strengthAreas = this.identifyStrengths(
      trustLevel, 
      priceSensitivity,
      engagementScore,
      conversionScore,
      retentionRiskScore
    );
    
    const improvementAreas = this.identifyImprovementAreas(
      trustLevel,
      priceSensitivity,
      engagementScore,
      conversionScore,
      retentionRiskScore
    );
    
    // Generate psychographic profile
    const psychographicProfile = this.generatePsychographicProfile(behaviorEvents, behavioralAssessment);
    
    // Final assessment result
    return {
      overallScore,
      engagementHealthScore: engagementScore,
      conversionPotentialScore: conversionScore,
      retentionRiskScore,
      summary,
      strengthAreas,
      improvementAreas,
      insights,
      flags: insights.filter(insight => insight.severityLevel !== 'low'),
      psychographicProfile
    };
  }
  
  // Calculate engagement score
  private calculateEngagementScore(events: BehaviorEvent[], assessment: BehaviorAssessment): number {
    // Base score
    let score = 50;
    
    // Add points based on engagement metrics
    const viewEvents = events.filter(e => e.eventType.includes('view')).length;
    const clickEvents = events.filter(e => e.eventType.includes('click')).length;
    const timeSpent = events.reduce((total, e) => {
      if (e.metadata && e.metadata.timeSpent) {
        return total + e.metadata.timeSpent;
      }
      return total;
    }, 0);
    
    // Engagement factors
    if (viewEvents > 10) score += 10;
    else if (viewEvents > 5) score += 5;
    
    if (clickEvents > 20) score += 20;
    else if (clickEvents > 10) score += 10;
    else if (clickEvents > 5) score += 5;
    
    if (timeSpent > 600) score += 20; // More than 10 minutes
    else if (timeSpent > 300) score += 10; // More than 5 minutes
    
    // Adjust based on influence phase
    if (assessment.influencePhase === 'desire' || assessment.influencePhase === 'action') {
      score += 10;
    }
    
    // Cap score at 0-100
    return Math.max(0, Math.min(100, score));
  }
  
  // Calculate conversion potential
  private calculateConversionPotential(
    trustLevel: TrustLevel, 
    priceSensitivity: PriceSensitivity, 
    assessment: BehaviorAssessment
  ): number {
    // Base score
    let score = 50;
    
    // Trust level impact
    if (trustLevel === TrustLevel.High) {
      score += 20;
    } else if (trustLevel === TrustLevel.Moderate) {
      score += 10;
    }
    
    // Price sensitivity impact (inverse relationship)
    if (priceSensitivity === PriceSensitivity.Low) {
      score += 20;
    } else if (priceSensitivity === PriceSensitivity.Moderate) {
      score += 10;
    }
    
    // Influence phase impact
    if (assessment.influencePhase === 'action') {
      score += 20;
    } else if (assessment.influencePhase === 'desire') {
      score += 15;
    } else if (assessment.influencePhase === 'trust') {
      score += 5;
    }
    
    // Micro-expressions impact
    if (assessment.microExpressions.includes('excitement')) {
      score += 10;
    }
    if (assessment.microExpressions.includes('conviction')) {
      score += 10;
    }
    if (assessment.microExpressions.includes('doubt')) {
      score -= 10;
    }
    
    // Cap score at 0-100
    return Math.max(0, Math.min(100, score));
  }
  
  // Calculate retention risk
  private calculateRetentionRisk(events: BehaviorEvent[], assessment: BehaviorAssessment): number {
    // Base risk score
    let riskScore = 50;
    
    // Look for risk indicators
    const abandonEvents = events.filter(e => 
      e.eventType === 'cart_abandon' || 
      e.eventType === 'exit_during_checkout'
    ).length;
    
    const frustrationEvents = events.filter(e => 
      e.eventType === 'error_encountered' || 
      e.eventType === 'multiple_attempts'
    ).length;
    
    const loyaltyEvents = events.filter(e => 
      e.eventType === 'repeat_purchase' || 
      e.eventType === 'join_loyalty'
    ).length;
    
    // Adjust risk based on events
    if (abandonEvents > 2) riskScore += 20;
    else if (abandonEvents > 0) riskScore += 10;
    
    if (frustrationEvents > 3) riskScore += 25;
    else if (frustrationEvents > 0) riskScore += 15;
    
    if (loyaltyEvents > 0) riskScore -= 20;
    
    // Influence phase impact
    if (assessment.influencePhase === 'loyalty') {
      riskScore -= 20;
    } else if (assessment.influencePhase === 'action') {
      riskScore -= 10;
    }
    
    // Cap score at 0-100
    return Math.max(0, Math.min(100, riskScore));
  }
  
  // Generate insights based on assessment
  private generateInsights(
    trustLevel: TrustLevel,
    priceSensitivity: PriceSensitivity,
    assessment: BehaviorAssessment,
    engagementScore: number,
    conversionScore: number,
    retentionRiskScore: number
  ): AssessmentInsight[] {
    const insights: AssessmentInsight[] = [];
    
    // Trust-based insights
    if (Number(trustLevel) < Number(TrustLevel.Moderate)) {
      insights.push({
        title: 'Low Trust Detected',
        description: 'User exhibits caution in interactions and information sharing',
        category: 'trust',
        severityLevel: 'high',
        recommendedActions: [
          'Display security badges prominently',
          'Highlight privacy guarantees',
          'Showcase testimonials from similar users'
        ]
      });
    }
    
    // Price sensitivity insights
    if (Number(priceSensitivity) > Number(PriceSensitivity.Moderate)) {
      insights.push({
        title: 'High Price Sensitivity',
        description: 'User shows significant concern about pricing and value',
        category: 'pricing',
        severityLevel: 'medium',
        recommendedActions: [
          'Emphasize value proposition',
          'Consider tiered pricing options',
          'Highlight cost-benefit comparison'
        ]
      });
    }
    
    // Engagement insights
    if (engagementScore < 40) {
      insights.push({
        title: 'Low Engagement',
        description: 'User has minimal interaction with content',
        category: 'engagement',
        severityLevel: 'high',
        recommendedActions: [
          'Introduce interactive elements',
          'Personalize content recommendations',
          'Implement engagement hooks'
        ]
      });
    }
    
    // Conversion insights
    if (conversionScore < 30) {
      insights.push({
        title: 'Low Conversion Potential',
        description: 'User shows limited signals of purchase intent',
        category: 'conversion',
        severityLevel: 'medium',
        recommendedActions: [
          'Focus on trust-building content',
          'Simplify the conversion path',
          'Offer risk-free trials or guarantees'
        ]
      });
    }
    
    // Retention risk insights
    if (retentionRiskScore > 70) {
      insights.push({
        title: 'High Retention Risk',
        description: 'User shows signals of potential churn',
        category: 'retention',
        severityLevel: 'high',
        recommendedActions: [
          'Implement proactive support outreach',
          'Offer retention incentives',
          'Address potential friction points'
        ]
      });
    }
    
    return insights;
  }
  
  // Generate summary text
  private generateSummary(
    overallScore: number,
    engagementScore: number,
    conversionScore: number,
    retentionRiskScore: number,
    influencePhase: InfluencePhase
  ): string {
    let summary = '';
    
    // Overall assessment
    if (overallScore >= 70) {
      summary = 'This user exhibits excellent engagement and conversion potential with a healthy behavioral profile. ';
    } else if (overallScore >= 50) {
      summary = 'This user shows moderate engagement with reasonable conversion potential. ';
    } else {
      summary = 'This user demonstrates limited engagement with significant improvement opportunities. ';
    }
    
    // Add phase-specific insights
    summary += `They are currently in the ${influencePhase} phase of the behavioral journey. `;
    
    // Add risk assessment
    if (retentionRiskScore > 70) {
      summary += 'There are concerning signals regarding retention that should be addressed urgently.';
    } else if (retentionRiskScore > 50) {
      summary += 'Some retention risk factors are present that merit attention.';
    } else {
      summary += 'Retention indicators are positive at this time.';
    }
    
    return summary;
  }
  
  // Identify strength areas
  private identifyStrengths(
    trustLevel: TrustLevel,
    priceSensitivity: PriceSensitivity,
    engagementScore: number,
    conversionScore: number,
    retentionRiskScore: number
  ): string[] {
    const strengths: string[] = [];
    
    if (Number(trustLevel) >= Number(TrustLevel.Moderate)) {
      strengths.push('Healthy trust level');
    }
    
    if (Number(priceSensitivity) <= Number(PriceSensitivity.Moderate)) {
      strengths.push('Favorable price sensitivity');
    }
    
    if (engagementScore >= 60) {
      strengths.push('Strong content engagement');
    }
    
    if (conversionScore >= 60) {
      strengths.push('High conversion potential');
    }
    
    if (retentionRiskScore <= 40) {
      strengths.push('Low retention risk');
    }
    
    // Default if no strengths identified
    if (strengths.length === 0) {
      strengths.push('Active exploration behavior');
    }
    
    return strengths;
  }
  
  // Identify improvement areas
  private identifyImprovementAreas(
    trustLevel: TrustLevel,
    priceSensitivity: PriceSensitivity,
    engagementScore: number,
    conversionScore: number,
    retentionRiskScore: number
  ): string[] {
    const improvements: string[] = [];
    
    if (Number(trustLevel) < Number(TrustLevel.Moderate)) {
      improvements.push('Trust building needed');
    }
    
    if (Number(priceSensitivity) > Number(PriceSensitivity.Moderate)) {
      improvements.push('Value perception requires enhancement');
    }
    
    if (engagementScore < 50) {
      improvements.push('Content engagement needs improvement');
    }
    
    if (conversionScore < 40) {
      improvements.push('Conversion funnel optimization required');
    }
    
    if (retentionRiskScore > 60) {
      improvements.push('Retention strategy needs attention');
    }
    
    // Default if no improvement areas identified
    if (improvements.length === 0) {
      improvements.push('Enhanced personalization opportunities');
    }
    
    return improvements;
  }
  
  // Generate psychographic profile
  private generatePsychographicProfile(
    events: BehaviorEvent[],
    assessment: BehaviorAssessment
  ): {
    personalityTraits: string[];
    interests: string[];
    values: string[];
    motivations: string[];
  } {
    // Default profile
    const profile = {
      personalityTraits: ['attentive'],
      interests: ['technology'],
      values: ['quality'],
      motivations: ['discovery']
    };
    
    // Enhance based on events and assessment
    if (assessment.influencePhase === 'desire' || assessment.influencePhase === 'action') {
      profile.personalityTraits.push('decisive');
      profile.motivations.push('achievement');
    }
    
    if (assessment.microExpressions.includes('doubt')) {
      profile.personalityTraits.push('cautious');
      profile.values.push('security');
    }
    
    if (assessment.microExpressions.includes('excitement')) {
      profile.personalityTraits.push('enthusiastic');
      profile.motivations.push('novelty');
    }
    
    // Add interests based on event content
    const contentInterests = events
      .filter(e => e.metadata && e.metadata.contentType)
      .map(e => e.metadata.contentType);
      
    if (contentInterests.length > 0) {
      // Get unique interests
      const uniqueInterests = [...new Set(contentInterests)];
      profile.interests.push(...uniqueInterests.slice(0, 3)); // Add up to 3 interests
    }
    
    return profile;
  }
}

export default new BehavioralAssessmentService();
