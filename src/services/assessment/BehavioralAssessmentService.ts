
import { EnhancedBehavioralProfile } from '@/types/enhancedBehavioral';
import { AssessmentResult, AssessmentInsight, AssessmentCategory } from '@/types/assessment';
import { ChaseHughesBehavioralProfile, InfluencePhase, MicroExpression, InfluenceTechnique } from '@/types/chaseHughes';

export class BehavioralAssessmentService {
  
  // Generate a comprehensive assessment based on behavioral profile
  generateAssessment(profile: EnhancedBehavioralProfile): AssessmentResult {
    console.log('Generating behavioral assessment for user profile');
    
    // Generate primary metrics from the profile
    const engagementPotential = this.calculateEngagementPotential(profile);
    const contentAffinity = this.calculateContentAffinity(profile);
    const monetizationPropensity = this.calculateMonetizationPropensity(profile);
    const retentionLikelihood = this.calculateRetentionLikelihood(profile);
    
    // Generate overall score (weighted average)
    const overallScore = Math.round(
      (engagementPotential * 0.3) + 
      (contentAffinity * 0.2) + 
      (monetizationPropensity * 0.2) + 
      (100 - profile.marketingOptimizations.retentionRisk * 100) * 0.3
    );
    
    // Generate insights based on the metrics and profile
    const insights = this.generateInsights(profile);
    
    // Create summary text
    const summary = this.generateSummaryText(profile, overallScore);
    
    // Extract strength and improvement areas
    const strengthAreas = this.identifyStrengthAreas(profile, insights);
    const improvementAreas = this.identifyImprovementAreas(profile, insights);
    
    // Generate supplementary metrics
    const engagementHealthScore = engagementPotential;
    const conversionPotentialScore = monetizationPropensity;
    const retentionRiskScore = Math.round(profile.marketingOptimizations.retentionRisk * 100);
    
    // Generate recommendations
    const recommendations = this.generateRecommendations(profile, insights);
    
    // Include Chase Hughes behavioral profile
    const chaseHughesProfile = this.generateChaseHughesProfile(profile);
    
    return {
      assessmentId: `assessment-${Date.now()}`,
      userId: profile.standardProfile.userId,
      timestamp: new Date().toISOString(),
      scores: {
        engagementPotential,
        contentAffinity,
        monetizationPropensity,
        retentionLikelihood
      },
      recommendations,
      insightSummary: summary,
      overallScore,
      insights,
      summary,
      strengthAreas,
      improvementAreas,
      engagementHealthScore,
      conversionPotentialScore,
      retentionRiskScore,
      psychographicProfile: profile.psychographicProfile,
      chaseHughesProfile
    };
  }
  
  // Calculate engagement potential score (0-100)
  private calculateEngagementPotential(profile: EnhancedBehavioralProfile): number {
    // Complex logic would use machine learning or rule-based system
    // Simplified for demo
    
    // Base score from behavioral loop stage
    let score = 0;
    switch (profile.psychographicProfile.behavioralLoop) {
      case 'discovery': score = 30; break;
      case 'engagement': score = 60; break;
      case 'conversion': score = 80; break;
      case 'retention': score = 90; break;
      case 'advocacy': score = 100; break;
      default: score = 50;
    }
    
    // Adjust based on identified signals
    if (profile.psychographicProfile.identifiedSignals.includes('interest')) score += 5;
    if (profile.psychographicProfile.identifiedSignals.includes('excitement')) score += 10;
    if (profile.psychographicProfile.identifiedSignals.includes('doubt')) score -= 15;
    if (profile.psychographicProfile.identifiedSignals.includes('hesitation')) score -= 10;
    
    // Ensure score is within 0-100 range
    return Math.min(100, Math.max(0, score));
  }
  
  // Calculate content affinity score (0-100)
  private calculateContentAffinity(profile: EnhancedBehavioralProfile): number {
    // Content affinity is based on interests and content preferences
    // Simplified for demo
    return Math.round(Math.random() * 40) + 60; // Random score between 60-100
  }
  
  // Calculate monetization propensity score (0-100)
  private calculateMonetizationPropensity(profile: EnhancedBehavioralProfile): number {
    // Base score from price sensitivity
    let score = 0;
    switch (profile.psychographicProfile.priceSensitivity) {
      case 'low': score = 80; break;
      case 'moderate': score = 50; break;
      case 'high': score = 20; break;
      default: score = 50;
    }
    
    // Adjust based on decision stage
    switch (profile.psychographicProfile.decisionStage) {
      case 'information_search': score -= 20; break;
      case 'alternative_evaluation': score -= 10; break;
      case 'purchase_decision': score += 30; break;
      default: break;
    }
    
    // Ensure score is within 0-100 range
    return Math.min(100, Math.max(0, score));
  }
  
  // Calculate retention likelihood score (0-100)
  private calculateRetentionLikelihood(profile: EnhancedBehavioralProfile): number {
    // Inverse of retention risk
    return 100 - Math.round(profile.marketingOptimizations.retentionRisk * 100);
  }
  
  // Generate insights based on the profile
  private generateInsights(profile: EnhancedBehavioralProfile): AssessmentInsight[] {
    const insights: AssessmentInsight[] = [];
    
    // Generate insights for each category
    insights.push(...this.generateEngagementInsights(profile));
    insights.push(...this.generateConversionInsights(profile));
    insights.push(...this.generateRetentionInsights(profile));
    insights.push(...this.generateMonetizationInsights(profile));
    
    return insights;
  }
  
  // Generate engagement-related insights
  private generateEngagementInsights(profile: EnhancedBehavioralProfile): AssessmentInsight[] {
    const insights: AssessmentInsight[] = [];
    
    // Sample engagement insight based on behavioral loop
    switch (profile.psychographicProfile.behavioralLoop) {
      case 'discovery':
        insights.push({
          id: `eng-disc-${Date.now()}`,
          category: 'engagement',
          title: 'Early Discovery Phase Detected',
          description: 'User is in early discovery phase and needs more educational content.',
          severityLevel: 'opportunity',
          impact: 70,
          confidenceScore: 85,
          recommendedActions: [
            'Provide introductory content',
            'Focus on building awareness',
            'Avoid immediate conversion pressure'
          ]
        });
        break;
        
      case 'engagement':
        insights.push({
          id: `eng-act-${Date.now()}`,
          category: 'engagement',
          title: 'Active Engagement Signals',
          description: 'User shows positive engagement signals but needs deeper connection.',
          severityLevel: 'positive',
          impact: 60,
          confidenceScore: 75,
          recommendedActions: [
            'Offer interactive experiences',
            'Encourage profile completion',
            'Introduce community elements'
          ]
        });
        break;
        
      default:
        insights.push({
          id: `eng-def-${Date.now()}`,
          category: 'engagement',
          title: 'Standard Engagement Pattern',
          description: 'User follows typical engagement patterns.',
          severityLevel: 'opportunity',
          impact: 50,
          confidenceScore: 60,
          recommendedActions: [
            'Continue standard engagement tactics',
            'Monitor for shifts in behavior',
            'Test different content formats'
          ]
        });
    }
    
    return insights;
  }
  
  // Generate conversion-related insights
  private generateConversionInsights(profile: EnhancedBehavioralProfile): AssessmentInsight[] {
    const insights: AssessmentInsight[] = [];
    
    // Sample conversion insight based on decision stage
    switch (profile.psychographicProfile.decisionStage) {
      case 'information_search':
        insights.push({
          id: `conv-info-${Date.now()}`,
          category: 'conversion',
          title: 'Research-Focused Behavior',
          description: 'User is actively researching options but not ready to convert.',
          severityLevel: 'opportunity',
          impact: 50,
          confidenceScore: 80,
          recommendedActions: [
            'Provide detailed comparison information',
            'Offer downloadable resources',
            'Implement subtle remarketing'
          ]
        });
        break;
        
      case 'purchase_decision':
        insights.push({
          id: `conv-purch-${Date.now()}`,
          category: 'conversion',
          title: 'High Purchase Intent',
          description: 'User exhibits strong purchase intent signals.',
          severityLevel: 'positive',
          impact: 90,
          confidenceScore: 85,
          recommendedActions: [
            'Streamline checkout process',
            'Offer limited-time incentive',
            'Provide social proof elements'
          ]
        });
        break;
        
      default:
        insights.push({
          id: `conv-def-${Date.now()}`,
          category: 'conversion',
          title: 'Standard Conversion Opportunity',
          description: 'User shows typical conversion potential.',
          severityLevel: 'opportunity',
          impact: 50,
          confidenceScore: 60,
          recommendedActions: [
            'Apply standard conversion techniques',
            'Test different call-to-actions',
            'Monitor conversion funnel steps'
          ]
        });
    }
    
    return insights;
  }
  
  // Generate retention-related insights
  private generateRetentionInsights(profile: EnhancedBehavioralProfile): AssessmentInsight[] {
    const insights: AssessmentInsight[] = [];
    
    // Sample retention insight based on retention risk
    const retentionRisk = profile.marketingOptimizations.retentionRisk;
    
    if (retentionRisk > 0.7) {
      insights.push({
        id: `ret-high-${Date.now()}`,
        category: 'retention',
        title: 'High Churn Risk',
        description: 'User shows significant signals of potential churn.',
        severityLevel: 'critical',
        impact: 90,
        confidenceScore: 80,
        recommendedActions: [
          'Implement immediate retention campaign',
          'Offer loyalty incentives',
          'Conduct exit survey if user attempts to leave'
        ]
      });
    } else if (retentionRisk > 0.3) {
      insights.push({
        id: `ret-mod-${Date.now()}`,
        category: 'retention',
        title: 'Moderate Retention Concerns',
        description: 'Some warning signs of potential disengagement detected.',
        severityLevel: 'warning',
        impact: 60,
        confidenceScore: 70,
        recommendedActions: [
          'Increase engagement touchpoints',
          'Highlight unused valuable features',
          'Consider targeted re-engagement campaign'
        ]
      });
    } else {
      insights.push({
        id: `ret-low-${Date.now()}`,
        category: 'retention',
        title: 'Strong Retention Indicators',
        description: 'User shows healthy engagement patterns suggesting good retention.',
        severityLevel: 'positive',
        impact: 80,
        confidenceScore: 75,
        recommendedActions: [
          'Continue current engagement strategy',
          'Consider loyalty recognition',
          'Introduce referral opportunities'
        ]
      });
    }
    
    return insights;
  }
  
  // Generate monetization-related insights
  private generateMonetizationInsights(profile: EnhancedBehavioralProfile): AssessmentInsight[] {
    const insights: AssessmentInsight[] = [];
    
    // Sample monetization insight based on price sensitivity
    switch (profile.psychographicProfile.priceSensitivity) {
      case 'low':
        insights.push({
          id: `mon-prem-${Date.now()}`,
          category: 'monetization',
          title: 'Premium Offering Opportunity',
          description: 'User shows low price sensitivity and may respond to premium offerings.',
          severityLevel: 'opportunity',
          impact: 85,
          confidenceScore: 75,
          recommendedActions: [
            'Highlight premium feature set',
            'Emphasize quality and exclusivity',
            'Test tiered pricing with premium options'
          ]
        });
        break;
        
      case 'high':
        insights.push({
          id: `mon-val-${Date.now()}`,
          category: 'monetization',
          title: 'Value-Focused Approach Needed',
          description: 'User exhibits high price sensitivity and needs clear value proposition.',
          severityLevel: 'warning',
          impact: 70,
          confidenceScore: 85,
          recommendedActions: [
            'Emphasize value-for-money messaging',
            'Consider entry-level pricing options',
            'Highlight cost-saving benefits'
          ]
        });
        break;
        
      default:
        insights.push({
          id: `mon-bal-${Date.now()}`,
          category: 'monetization',
          title: 'Balanced Monetization Opportunity',
          description: 'User shows moderate price sensitivity with standard monetization potential.',
          severityLevel: 'opportunity',
          impact: 60,
          confidenceScore: 70,
          recommendedActions: [
            'Test different price points',
            'Offer balanced feature set',
            'Monitor conversion at different price levels'
          ]
        });
    }
    
    return insights;
  }
  
  // Generate summary text
  private generateSummaryText(profile: EnhancedBehavioralProfile, overallScore: number): string {
    // In production, this would use NLG techniques with templates
    
    let summary = `Behavioral assessment indicates a `;
    
    if (overallScore >= 80) {
      summary += `high-performing user profile with strong engagement potential.`;
    } else if (overallScore >= 60) {
      summary += `promising user profile with good engagement signals.`;
    } else if (overallScore >= 40) {
      summary += `moderate user profile with some areas needing attention.`;
    } else {
      summary += `user profile showing significant opportunity for improvement.`;
    }
    
    summary += ` User is in the ${profile.psychographicProfile.behavioralLoop} behavioral loop phase with ${profile.psychographicProfile.trustLevel} trust level. `;
    summary += `Focus recommended on ${profile.marketingOptimizations.nextBestAction} with ${profile.marketingOptimizations.messagingTone} messaging tone.`;
    
    return summary;
  }
  
  // Identify strength areas based on insights and profile
  private identifyStrengthAreas(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): string[] {
    const strengths: string[] = [];
    
    // Extract strengths from positive insights
    const positiveInsights = insights.filter(i => i.severityLevel === 'positive');
    strengths.push(...positiveInsights.map(i => i.title));
    
    // Add strengths based on profile metrics
    if (profile.marketingOptimizations.retentionRisk < 0.3) {
      strengths.push('Strong retention indicators');
    }
    
    if (profile.psychographicProfile.trustLevel === 'high') {
      strengths.push('High trust relationship established');
    }
    
    if (profile.psychographicProfile.behavioralLoop === 'advocacy') {
      strengths.push('Reached advocacy stage in behavioral loop');
    }
    
    // Ensure we have at least some strengths
    if (strengths.length === 0) {
      strengths.push(
        'Standard engagement patterns',
        'Normal interaction behavior'
      );
    }
    
    return strengths;
  }
  
  // Identify improvement areas based on insights and profile
  private identifyImprovementAreas(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): string[] {
    const improvements: string[] = [];
    
    // Extract improvements from critical and warning insights
    const criticalInsights = insights.filter(i => 
      i.severityLevel === 'critical' || i.severityLevel === 'warning'
    );
    improvements.push(...criticalInsights.map(i => i.title));
    
    // Add improvements based on profile metrics
    if (profile.marketingOptimizations.retentionRisk > 0.6) {
      improvements.push('High churn risk requires attention');
    }
    
    if (profile.psychographicProfile.trustLevel === 'low') {
      improvements.push('Trust building needed');
    }
    
    // Ensure we have at least some improvement areas
    if (improvements.length === 0) {
      improvements.push(
        'Continue monitoring for emerging patterns',
        'Test alternative engagement strategies'
      );
    }
    
    return improvements;
  }
  
  // Generate recommendations
  private generateRecommendations(profile: EnhancedBehavioralProfile, insights: AssessmentInsight[]): string[] {
    const recommendations: string[] = [];
    
    // Extract recommendations from highest impact insights
    const sortedInsights = [...insights].sort((a, b) => b.impact - a.impact);
    const topInsights = sortedInsights.slice(0, 3);
    
    for (const insight of topInsights) {
      recommendations.push(...insight.recommendedActions);
    }
    
    // Add general recommendations based on profile
    recommendations.push(
      `Use ${profile.marketingOptimizations.messagingTone} tone in communications`,
      `Focus on ${profile.marketingOptimizations.nextBestAction} as next step`,
      `Target engagement during ${profile.marketingOptimizations.idealEngagementTimes.join(', ')} for best results`
    );
    
    return recommendations;
  }
  
  // Generate Chase Hughes behavioral profile
  private generateChaseHughesProfile(profile: EnhancedBehavioralProfile): ChaseHughesBehavioralProfile {
    // Map our profile to Chase Hughes framework
    const chaseHughesProfile: ChaseHughesBehavioralProfile = {
      primarySensoryPreference: 'visual', // Default
      currentInfluencePhase: 'interest' as InfluencePhase,
      influencePhaseProgress: 50,
      detectedMicroExpressions: ['happiness', 'surprise'] as MicroExpression[], 
      responsiveToTechniques: ['social_proof', 'authority_positioning'] as InfluenceTechnique[],
      suggestedApproach: {
        technique: 'social_proof' as InfluenceTechnique,
        languagePattern: 'Many of our users have found that...',
        visualCues: ['Social proof indicators', 'Trust symbols']
      },
      trustScore: 65,
      desireScore: 70,
      engagementScore: 75
    };
    
    return chaseHughesProfile;
  }
  
  // Get priority insights for user
  getPriorityInsights(profile: EnhancedBehavioralProfile): AssessmentInsight[] {
    // In production, this would filter real insights based on priority logic
    return this.generateInsights(profile)
      .filter(insight => insight.impact > 60)
      .sort((a, b) => b.impact - a.impact)
      .slice(0, 3);
  }
  
  // Get insights by category
  getInsightsByCategory(profile: EnhancedBehavioralProfile, category: AssessmentCategory): AssessmentInsight[] {
    // Filter insights by the requested category
    return this.generateInsights(profile)
      .filter(insight => insight.category === category)
      .sort((a, b) => b.impact - a.impact);
  }
}
