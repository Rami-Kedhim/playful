
import { AssessmentResult, AssessmentInsight, AssessmentCategory, AssessmentSeverityLevel } from '@/types/assessment';
import { EnhancedBehavioralProfile, BrandResonanceStage, BehavioralLoop, ConsumerDecisionStage } from '@/types/enhancedBehavioral';
import { v4 as uuidv4 } from 'uuid';

/**
 * Service for generating behavioral assessments based on Hughes-Chernev-Keller framework
 */
export class BehavioralAssessmentService {
  /**
   * Generate a comprehensive assessment based on the enhanced behavioral profile
   */
  public generateAssessment(userId: string, profile: EnhancedBehavioralProfile): AssessmentResult {
    const insights: AssessmentInsight[] = [];
    
    // Add insights from different assessment categories
    this.addEngagementInsights(profile, insights);
    this.addConversionInsights(profile, insights);
    this.addRetentionInsights(profile, insights);
    this.addMonetizationInsights(profile, insights);
    this.addTrustInsights(profile, insights);
    
    // Calculate overall scores
    const engagementHealthScore = this.calculateEngagementScore(profile, insights);
    const conversionPotentialScore = this.calculateConversionPotentialScore(profile, insights);
    const retentionRiskScore = profile.marketingOptimizations.retentionRisk;
    
    // Calculate overall assessment score (weighted average)
    const overallScore = Math.round(
      (engagementHealthScore * 0.3) + 
      (conversionPotentialScore * 0.3) + 
      ((100 - retentionRiskScore) * 0.4)
    );
    
    // Generate strength and improvement areas
    const strengthAreas = this.identifyStrengthAreas(insights, profile);
    const improvementAreas = this.identifyImprovementAreas(insights, profile);
    
    // Create assessment summary
    const summary = this.generateSummary(overallScore, strengthAreas, improvementAreas, profile);
    
    return {
      userId,
      timestamp: new Date(),
      overallScore,
      insights,
      summary,
      strengthAreas,
      improvementAreas,
      engagementHealthScore,
      conversionPotentialScore,
      retentionRiskScore
    };
  }
  
  /**
   * Add engagement-related insights based on behavioral loop and brand resonance
   */
  private addEngagementInsights(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): void {
    const { behavioralLoop, brandResonance } = profile.psychographicProfile;
    
    // Analyze behavioral loop stage (Chase Hughes framework)
    if (behavioralLoop === 'discovery') {
      insights.push(this.createInsight(
        'engagement',
        'Early Discovery Stage Detected',
        'User is in the initial discovery phase, which presents an opportunity to shape their experience.',
        'opportunity',
        70,
        80,
        [
          'Focus on clear value proposition messaging',
          'Offer a guided introduction to key features',
          'Provide social proof early in the experience'
        ]
      ));
    } else if (behavioralLoop === 'engagement') {
      insights.push(this.createInsight(
        'engagement',
        'Active Engagement Pattern',
        'User is actively engaging but hasn\'t made significant investment.',
        'opportunity',
        75,
        85,
        [
          'Introduce progressive challenges or goals',
          'Highlight community aspects of the platform',
          'Offer small commitment opportunities with clear benefits'
        ]
      ));
    } else if (behavioralLoop === 'investment') {
      insights.push(this.createInsight(
        'engagement',
        'Investment Behaviors Emerging',
        'User is showing commitment through time or resource investment.',
        'positive',
        85,
        90,
        [
          'Acknowledge their commitment with personalized messaging',
          'Introduce exclusive features or content',
          'Create pathways to deeper platform integration'
        ]
      ));
    } else if (behavioralLoop === 'identity' || behavioralLoop === 'advocacy') {
      insights.push(this.createInsight(
        'engagement',
        'Strong Identity Alignment',
        'User identifies strongly with the platform or has begun advocacy behaviors.',
        'positive',
        95,
        95,
        [
          'Offer advocacy opportunities and recognition',
          'Create exclusive community leadership roles',
          'Provide early access to new features'
        ]
      ));
    }
    
    // Analyze brand resonance stage (Keller framework)
    if (brandResonance === 'awareness' || brandResonance === 'performance') {
      insights.push(this.createInsight(
        'engagement',
        'Early Brand Relationship',
        'User is still developing their relationship with the brand.',
        brandResonance === 'awareness' ? 'warning' : 'opportunity',
        65,
        75,
        [
          'Strengthen brand associations through consistent touchpoints',
          'Emphasize functional benefits and reliability',
          'Create memorable interaction patterns'
        ]
      ));
    } else if (brandResonance === 'imagery' || brandResonance === 'judgments') {
      insights.push(this.createInsight(
        'engagement',
        'Developing Brand Connection',
        'User is forming opinions and emotional connections to the brand.',
        'opportunity',
        80,
        85,
        [
          'Reinforce positive judgments with social proof',
          'Align imagery with user\'s self-concept',
          'Create moments of delight in the user experience'
        ]
      ));
    } else if (brandResonance === 'feelings' || brandResonance === 'resonance') {
      insights.push(this.createInsight(
        'engagement',
        'Strong Brand Relationship',
        'User has developed emotional connection and loyalty to the brand.',
        'positive',
        90,
        90,
        [
          'Nurture community participation and belonging',
          'Create exclusive experiences for loyal users',
          'Invite deeper participation in brand evolution'
        ]
      ));
    }
  }
  
  /**
   * Add conversion-related insights based on decision stage and value orientation
   */
  private addConversionInsights(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): void {
    const { decisionStage, valueOrientation, priceSensitivity } = profile.psychographicProfile;
    
    // Analyze decision stage (Kotler framework)
    if (decisionStage === 'problem_recognition' || decisionStage === 'information_search') {
      insights.push(this.createInsight(
        'conversion',
        'Early Purchase Decision Stage',
        'User is still recognizing needs or gathering information.',
        'warning',
        60,
        80,
        [
          'Focus on education rather than closing',
          'Provide comparative information',
          'Address common objections proactively'
        ]
      ));
    } else if (decisionStage === 'evaluation') {
      insights.push(this.createInsight(
        'conversion',
        'Active Evaluation Phase',
        'User is comparing options and weighing alternatives.',
        'opportunity',
        75,
        85,
        [
          'Highlight unique value propositions',
          'Provide clear comparison with alternatives',
          'Reduce friction in the decision process'
        ]
      ));
    } else if (decisionStage === 'purchase_decision') {
      insights.push(this.createInsight(
        'conversion',
        'Ready to Purchase',
        'User has moved to the purchase decision phase.',
        'opportunity',
        90,
        90,
        [
          'Minimize friction in the purchase process',
          'Provide last-minute assurance',
          'Create urgency if appropriate'
        ]
      ));
    } else if (decisionStage === 'post_purchase') {
      insights.push(this.createInsight(
        'conversion',
        'Post-Purchase Opportunity',
        'User has completed a purchase and may be receptive to additional offers.',
        'opportunity',
        85,
        85,
        [
          'Reinforce purchase decision with positive messaging',
          'Consider relevant cross-sell opportunities',
          'Encourage sharing purchase experience'
        ]
      ));
    }
    
    // Analyze value orientation (Chernev framework)
    if (valueOrientation === 'economic') {
      if (priceSensitivity > 80) {
        insights.push(this.createInsight(
          'conversion',
          'High Price Sensitivity',
          'User is highly focused on economic value and price considerations.',
          'warning',
          70,
          85,
          [
            'Emphasize cost-saving aspects',
            'Consider entry-level pricing with upgrade path',
            'Focus on long-term value and ROI'
          ]
        ));
      } else {
        insights.push(this.createInsight(
          'conversion',
          'Value-Conscious Orientation',
          'User is value-conscious but not extremely price sensitive.',
          'opportunity',
          75,
          80,
          [
            'Highlight value-to-price ratio',
            'Offer bundle options for better perceived value',
            'Use price anchoring techniques'
          ]
        ));
      }
    } else if (valueOrientation === 'functional') {
      insights.push(this.createInsight(
        'conversion',
        'Feature-Focused Mindset',
        'User is primarily concerned with functionality and features.',
        'opportunity',
        80,
        85,
        [
          'Focus messaging on specifications and capabilities',
          'Provide detailed comparison charts',
          'Highlight technical superiority'
        ]
      ));
    } else if (valueOrientation === 'emotional') {
      insights.push(this.createInsight(
        'conversion',
        'Emotion-Driven Decisions',
        'User makes decisions based on emotional factors and experiences.',
        'opportunity',
        85,
        80,
        [
          'Use storytelling in marketing approaches',
          'Focus on experiential aspects of offerings',
          'Create emotional connection through design and messaging'
        ]
      ));
    } else if (valueOrientation === 'symbolic') {
      insights.push(this.createInsight(
        'conversion',
        'Status and Identity Focus',
        'User values symbolic and status aspects of purchases.',
        'opportunity',
        85,
        75,
        [
          'Highlight exclusivity and premium positioning',
          'Show status signaling opportunities',
          'Emphasize membership and belonging'
        ]
      ));
    }
  }
  
  /**
   * Add retention-related insights based on trustLevel and signals
   */
  private addRetentionInsights(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): void {
    const { trustLevel, identifiedSignals } = profile.psychographicProfile;
    const { retentionRisk } = profile.marketingOptimizations;
    
    // Analyze trust and retention risk
    if (trustLevel < 50) {
      insights.push(this.createInsight(
        'retention',
        'Critical Trust Deficit',
        'User has an unusually low trust level which presents a significant retention risk.',
        'critical',
        90,
        85,
        [
          'Address potential trust barriers immediately',
          'Provide transparent communication about practices',
          'Create low-risk, high-value interactions to rebuild trust'
        ]
      ));
    } else if (trustLevel < 70) {
      insights.push(this.createInsight(
        'retention',
        'Trust Development Needed',
        'User has moderate trust levels that could benefit from strengthening.',
        'warning',
        75,
        80,
        [
          'Implement progressive trust-building interactions',
          'Provide social proof and testimonials',
          'Ensure consistent and reliable experiences'
        ]
      ));
    } else {
      insights.push(this.createInsight(
        'retention',
        'Strong Trust Foundation',
        'User has high trust levels that provide a solid foundation for long-term engagement.',
        'positive',
        85,
        85,
        [
          'Leverage trust for deeper platform engagement',
          'Consider ambassador or advocacy programs',
          'Use trusted relationship for feedback and co-creation'
        ]
      ));
    }
    
    // Analyze specific behavior signals (Hughes framework)
    if (identifiedSignals.includes('distrust') || identifiedSignals.includes('resistance')) {
      insights.push(this.createInsight(
        'retention',
        'Resistance Signals Detected',
        'User is showing signs of resistance or distrust in their behaviors.',
        'warning',
        80,
        75,
        [
          'Identify specific friction points causing resistance',
          'Address concerns openly and transparently',
          'Provide reassurance through social proof and guarantees'
        ]
      ));
    }
    
    if (identifiedSignals.includes('confusion')) {
      insights.push(this.createInsight(
        'retention',
        'Engagement Confusion',
        'User is showing signs of confusion in their interaction patterns.',
        'warning',
        75,
        70,
        [
          'Simplify current user journeys',
          'Provide clearer guidance and tooltips',
          'Consider a personalized onboarding refresher'
        ]
      ));
    }
    
    // Analyze retention risk directly
    if (retentionRisk > 70) {
      insights.push(this.createInsight(
        'retention',
        'High Retention Risk',
        'User shows multiple indicators of potential churn.',
        'critical',
        90,
        80,
        [
          'Implement immediate retention intervention',
          'Consider personalized outreach or offers',
          'Address specific pain points identified in usage patterns'
        ]
      ));
    } else if (retentionRisk > 40) {
      insights.push(this.createInsight(
        'retention',
        'Moderate Retention Risk',
        'Some risk factors present for potential disengagement.',
        'warning',
        75,
        75,
        [
          'Proactively address engagement patterns',
          'Introduce new value-aligned features',
          'Reestablish core value propositions'
        ]
      ));
    }
  }
  
  /**
   * Add monetization-related insights based on value orientation and price sensitivity
   */
  private addMonetizationInsights(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): void {
    const { valueOrientation, priceSensitivity, engagementPatterns } = profile.psychographicProfile;
    const { suggestedPricePoints, lifetimeValueEstimate } = profile.marketingOptimizations;
    
    // Price sensitivity insights (Chernev framework)
    if (priceSensitivity > 80) {
      insights.push(this.createInsight(
        'monetization',
        'High Price Sensitivity',
        'User shows strong price sensitivity that may impact monetization strategies.',
        'warning',
        80,
        85,
        [
          'Consider entry-level pricing with clear upgrade paths',
          'Focus on demonstrable ROI in marketing',
          'Bundle offerings to improve perceived value'
        ]
      ));
    } else if (priceSensitivity < 40) {
      insights.push(this.createInsight(
        'monetization',
        'Low Price Sensitivity',
        'User shows minimal price sensitivity, suggesting opportunity for premium offerings.',
        'opportunity',
        85,
        80,
        [
          'Present premium options first in offers',
          'Emphasize quality and exclusivity over cost',
          'Consider luxury or status-oriented pricing strategies'
        ]
      ));
    }
    
    // Analyze value orientation for monetization approaches
    if (valueOrientation === 'economic') {
      insights.push(this.createInsight(
        'monetization',
        'Cost-Benefit Focus',
        'User evaluates offerings primarily on economic utility.',
        'opportunity',
        75,
        80,
        [
          'Highlight cost savings and economic benefits',
          'Consider bulk pricing or volume discounts',
          'Focus on quantifiable value metrics'
        ]
      ));
    } else if (valueOrientation === 'functional') {
      insights.push(this.createInsight(
        'monetization',
        'Feature-Value Alignment',
        'User evaluates offerings based on functional capabilities.',
        'opportunity',
        80,
        85,
        [
          'Consider feature-based tiering strategy',
          'Focus on practical benefits in monetization messaging',
          'Highlight technical advantages of premium options'
        ]
      ));
    } else if (valueOrientation === 'emotional') {
      insights.push(this.createInsight(
        'monetization',
        'Experience-Based Value',
        'User places high value on emotional and experiential factors.',
        'opportunity',
        85,
        80,
        [
          'Emphasize experience enhancements in premium offerings',
          'Use storytelling in upgrade messaging',
          'Create emotional connections to premium features'
        ]
      ));
    } else if (valueOrientation === 'symbolic') {
      insights.push(this.createInsight(
        'monetization',
        'Status and Identity Monetization',
        'User values status and identity aspects in purchasing decisions.',
        'opportunity',
        90,
        75,
        [
          'Create status-signaling premium tiers',
          'Emphasize exclusivity in monetization',
          'Develop visible symbols of premium status'
        ]
      ));
    }
    
    // Lifetime value insights
    if (lifetimeValueEstimate > 500) {
      insights.push(this.createInsight(
        'monetization',
        'High Lifetime Value Potential',
        'User shows indicators of significant lifetime value potential.',
        'positive',
        90,
        80,
        [
          'Invest in relationship development',
          'Consider loyalty programs with increasing benefits',
          'Prioritize retention over short-term revenue'
        ]
      ));
    }
    
    // Pricing optimization insights
    insights.push(this.createInsight(
      'monetization',
      'Optimized Price Points',
      `Behavioral analysis suggests optimal price points: $${suggestedPricePoints.join(', $')}.`,
      'opportunity',
      85,
      85,
      [
        'Test offerings at identified price points',
        'Consider creating packages at these thresholds',
        'Monitor price sensitivity changes over time'
      ]
    ));
  }
  
  /**
   * Add trust-related insights based on trust level and signals
   */
  private addTrustInsights(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): void {
    const { trustLevel, identifiedSignals } = profile.psychographicProfile;
    
    // Trust level insights (Hughes framework)
    if (trustLevel < 30) {
      insights.push(this.createInsight(
        'trust',
        'Severe Trust Deficit',
        'User exhibits extremely low trust signals which require immediate attention.',
        'critical',
        95,
        80,
        [
          'Investigate potential negative experiences',
          'Provide immediate transparency and clarity',
          'Consider direct outreach for trust repair'
        ]
      ));
    } else if (trustLevel < 50) {
      insights.push(this.createInsight(
        'trust',
        'Trust Building Required',
        'User has below-average trust levels that need systematic improvement.',
        'warning',
        85,
        80,
        [
          'Implement progressive trust-building framework',
          'Ensure consistent and reliable experiences',
          'Provide social proof and credibility indicators'
        ]
      ));
    } else if (trustLevel > 85) {
      insights.push(this.createInsight(
        'trust',
        'Strong Trust Foundation',
        'User has exceptionally high trust in the platform.',
        'positive',
        90,
        85,
        [
          'Leverage trust for referrals and testimonials',
          'Consider early access to new features',
          'Engage in co-creation opportunities'
        ]
      ));
    }
    
    // Analyze specific trust signals
    if (identifiedSignals.includes('trust')) {
      insights.push(this.createInsight(
        'trust',
        'Positive Trust Signals',
        'User is exhibiting specific behaviors associated with high trust.',
        'positive',
        85,
        80,
        [
          'Reinforce trust with consistent experiences',
          'Acknowledge and appreciate their trust',
          'Create opportunities for deeper engagement'
        ]
      ));
    }
    
    if (identifiedSignals.includes('commitment')) {
      insights.push(this.createInsight(
        'trust',
        'Strong Commitment Indicators',
        'User shows signals of commitment to the platform or service.',
        'positive',
        90,
        85,
        [
          'Recognize and reward commitment',
          'Provide opportunities for increased involvement',
          'Introduce community leadership possibilities'
        ]
      ));
    }
  }
  
  /**
   * Create a standardized insight object
   */
  private createInsight(
    category: AssessmentCategory,
    title: string,
    description: string,
    severityLevel: AssessmentSeverityLevel,
    impact: number,
    confidenceScore: number,
    recommendedActions: string[]
  ): AssessmentInsight {
    return {
      id: uuidv4(),
      category,
      title,
      description,
      severityLevel,
      impact,
      confidenceScore,
      recommendedActions
    };
  }
  
  /**
   * Calculate engagement health score based on behavioral indicators
   */
  private calculateEngagementScore(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): number {
    // Base score from behavioral loop stage
    let score = 0;
    const { behavioralLoop, brandResonance } = profile.psychographicProfile;
    
    // Score based on behavioral loop (Hughes framework)
    switch (behavioralLoop) {
      case 'discovery': score += 20; break;
      case 'engagement': score += 40; break;
      case 'investment': score += 60; break;
      case 'identity': score += 80; break;
      case 'advocacy': score += 100; break;
    }
    
    // Adjust based on brand resonance (Keller framework)
    switch (brandResonance) {
      case 'awareness': score += 10; break;
      case 'performance': score += 20; break;
      case 'imagery': score += 30; break;
      case 'judgments': score += 40; break;
      case 'feelings': score += 50; break;
      case 'resonance': score += 60; break;
    }
    
    // Average the two frameworks and normalize to 0-100
    score = Math.min(100, score / 1.6);
    
    return Math.round(score);
  }
  
  /**
   * Calculate conversion potential score
   */
  private calculateConversionPotentialScore(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): number {
    const { decisionStage } = profile.psychographicProfile;
    let score = 0;
    
    // Score based on decision stage (Kotler framework)
    switch (decisionStage) {
      case 'problem_recognition': score = 20; break;
      case 'information_search': score = 40; break;
      case 'evaluation': score = 60; break;
      case 'purchase_decision': score = 90; break;
      case 'post_purchase': score = 50; break; // Lower for upsell potential
    }
    
    // Adjust based on identified signals
    if (profile.psychographicProfile.identifiedSignals.includes('interest')) {
      score += 15;
    }
    if (profile.psychographicProfile.identifiedSignals.includes('commitment')) {
      score += 20;
    }
    if (profile.psychographicProfile.identifiedSignals.includes('resistance')) {
      score -= 25;
    }
    
    // Normalize to 0-100
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  
  /**
   * Identify key strength areas from insights and profile
   */
  private identifyStrengthAreas(insights: AssessmentInsight[], profile: EnhancedBehavioralProfile): string[] {
    const strengths: string[] = [];
    
    // Extract strength areas from positive insights
    const positiveInsights = insights.filter(i => i.severityLevel === 'positive');
    if (positiveInsights.length > 0) {
      strengths.push(...positiveInsights.map(i => i.title));
    }
    
    // Add strengths based on profile data
    if (profile.psychographicProfile.trustLevel > 75) {
      strengths.push('High Trust Level');
    }
    
    if (profile.psychographicProfile.behavioralLoop === 'identity' || 
        profile.psychographicProfile.behavioralLoop === 'advocacy') {
      strengths.push('Strong Behavioral Engagement');
    }
    
    if (profile.psychographicProfile.brandResonance === 'feelings' || 
        profile.psychographicProfile.brandResonance === 'resonance') {
      strengths.push('Deep Brand Connection');
    }
    
    if (profile.marketingOptimizations.retentionRisk < 30) {
      strengths.push('Low Retention Risk');
    }
    
    if (profile.marketingOptimizations.lifetimeValueEstimate > 500) {
      strengths.push('High Lifetime Value Potential');
    }
    
    // Return unique strengths
    return Array.from(new Set(strengths)).slice(0, 5);
  }
  
  /**
   * Identify key improvement areas from insights and profile
   */
  private identifyImprovementAreas(insights: AssessmentInsight[], profile: EnhancedBehavioralProfile): string[] {
    const improvements: string[] = [];
    
    // Extract improvement areas from critical and warning insights
    const criticalInsights = insights.filter(i => i.severityLevel === 'critical');
    const warningInsights = insights.filter(i => i.severityLevel === 'warning');
    
    if (criticalInsights.length > 0) {
      improvements.push(...criticalInsights.map(i => i.title));
    }
    
    if (warningInsights.length > 0 && improvements.length < 3) {
      improvements.push(...warningInsights.map(i => i.title));
    }
    
    // Add improvements based on profile data
    if (profile.psychographicProfile.trustLevel < 50) {
      improvements.push('Trust Building');
    }
    
    if (profile.psychographicProfile.behavioralLoop === 'discovery') {
      improvements.push('Initial Engagement Depth');
    }
    
    if (profile.marketingOptimizations.retentionRisk > 60) {
      improvements.push('Retention Strategy');
    }
    
    if (profile.psychographicProfile.priceSensitivity > 80) {
      improvements.push('Value Communication');
    }
    
    // Return unique improvements
    return Array.from(new Set(improvements)).slice(0, 5);
  }
  
  /**
   * Generate an assessment summary based on the scores and areas
   */
  private generateSummary(
    overallScore: number, 
    strengthAreas: string[], 
    improvementAreas: string[], 
    profile: EnhancedBehavioralProfile
  ): string {
    let summary = '';
    
    if (overallScore >= 80) {
      summary = `Excellent engagement profile with an overall score of ${overallScore}/100. `;
    } else if (overallScore >= 60) {
      summary = `Good engagement profile with an overall score of ${overallScore}/100. `;
    } else if (overallScore >= 40) {
      summary = `Moderate engagement profile with an overall score of ${overallScore}/100. `;
    } else {
      summary = `Needs attention with a low engagement score of ${overallScore}/100. `;
    }
    
    // Add behavioral stage
    summary += `The user is currently in the ${profile.psychographicProfile.behavioralLoop} stage of the behavioral loop and the ${profile.psychographicProfile.brandResonance} stage of brand resonance. `;
    
    // Add strengths
    if (strengthAreas.length > 0) {
      summary += `Key strengths include ${strengthAreas.slice(0, 3).join(', ')}. `;
    }
    
    // Add improvement areas
    if (improvementAreas.length > 0) {
      summary += `Priority focus should be on ${improvementAreas.slice(0, 3).join(', ')}.`;
    }
    
    return summary;
  }
}

// Export singleton instance
export const behavioralAssessmentService = new BehavioralAssessmentService();
export default behavioralAssessmentService;
