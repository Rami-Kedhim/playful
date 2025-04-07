
import { 
  MicroexpressionSignal, 
  BehavioralLoop, 
  BrandResonanceStage,
  ConsumerDecisionStage,
  EnhancedBehavioralProfile,
  PsychographicProfile
} from '@/types/enhancedBehavioral';
import { BehaviorTag, HermesMode, ToneFilter } from '@/types/behavioral';

/**
 * Enhanced Behavioral Analyzer
 * Applies concepts from Chase Hughes on behavioral analysis and persuasion
 */
export class EnhancedBehavioralAnalyzer {
  /**
   * Analyze interaction patterns to identify micro-expression signals
   * Based on Chase Hughes' techniques for behavior analysis
   */
  public identifySignals(
    messages: { content: string, isUser: boolean }[],
    responseDelay: number[],
    clickPatterns: { element: string, timeViewing: number }[]
  ): MicroexpressionSignal[] {
    const signals: MicroexpressionSignal[] = [];
    
    // Analyze message content for linguistic markers
    const userMessages = messages.filter(m => m.isUser).map(m => m.content);
    
    // Analyze language patterns (Chase Hughes' linguistic indicators)
    if (userMessages.some(msg => /\byes\b|certainly|absolutely|definitely/i.test(msg))) {
      signals.push('commitment');
    }
    
    if (userMessages.some(msg => /\bmaybe\b|\bperhaps\b|not sure|thinking/i.test(msg))) {
      signals.push('resistance');
    }
    
    if (userMessages.some(msg => /\bconfused\b|don't understand|what do you mean/i.test(msg))) {
      signals.push('confusion');
    }
    
    // Analyze question frequency (Hughes' interest indicator)
    const questionCount = userMessages.filter(msg => msg.includes('?')).length;
    if (questionCount / userMessages.length > 0.3) {
      signals.push('interest');
    }
    
    // Analyze response speed patterns (Hughes' engagement indicators)
    if (responseDelay.length >= 3) {
      const avgDelay = responseDelay.reduce((sum, delay) => sum + delay, 0) / responseDelay.length;
      if (avgDelay < 30) { // Quick responses indicate engagement
        signals.push('interest');
      } else if (avgDelay > 120) { // Slow responses may indicate disinterest
        signals.push('disinterest');
      }
    }
    
    // Analyze click patterns (Hughes' attention indicators)
    const trustIndicators = clickPatterns.filter(p => 
      p.element.includes('profile') || 
      p.element.includes('testimonial') || 
      p.element.includes('about')
    ).length;
    
    if (trustIndicators > 3) {
      signals.push('trust');
    }
    
    // Return unique signals
    return Array.from(new Set(signals));
  }
  
  /**
   * Determine current behavioral loop stage
   * Based on Hughes' concepts of behavioral cycle reinforcement
   */
  public identifyBehavioralLoop(
    visitsCount: number,
    interactionsCount: number,
    timeSpentMinutes: number,
    purchaseCount: number,
    referralCount: number
  ): BehavioralLoop {
    if (referralCount > 0) {
      return 'advocacy';
    }
    
    if (purchaseCount > 3 || timeSpentMinutes > 180) {
      return 'identity';
    }
    
    if (purchaseCount > 0 || timeSpentMinutes > 60) {
      return 'investment';
    }
    
    if (interactionsCount > 5 || timeSpentMinutes > 15) {
      return 'engagement';
    }
    
    return 'discovery';
  }
  
  /**
   * Map behavioral data to Keller's brand resonance pyramid
   */
  public identifyBrandResonanceStage(
    visitsCount: number,
    timeOnSite: number,
    purchaseHistory: number,
    engagementRate: number
  ): BrandResonanceStage {
    // New users or low engagement
    if (visitsCount <= 1 || timeOnSite < 60) {
      return 'awareness';
    }
    
    // Users who are evaluating functionality
    if (visitsCount < 5 && purchaseHistory === 0) {
      return 'performance';
    }
    
    // Users who are connecting emotionally
    if (engagementRate > 0.3 && timeOnSite > 300) {
      return 'imagery';
    }
    
    // Users who are making comparative evaluations
    if (purchaseHistory === 1 || engagementRate > 0.5) {
      return 'judgments';
    }
    
    // Users who have formed emotional connections
    if (purchaseHistory >= 2 && engagementRate > 0.7) {
      return 'feelings';
    }
    
    // Highest level of brand connection
    if (purchaseHistory >= 3 && engagementRate > 0.8) {
      return 'resonance';
    }
    
    return 'performance'; // Default
  }
  
  /**
   * Identify consumer decision stage based on Kotler's model
   */
  public identifyDecisionStage(
    searchQueries: string[],
    pagesVisited: string[],
    comparisonsViewed: number,
    cartAbandoned: boolean,
    purchaseCompleted: boolean,
    postPurchaseEngagement: number
  ): ConsumerDecisionStage {
    if (purchaseCompleted && postPurchaseEngagement > 0) {
      return 'post_purchase';
    }
    
    if (purchaseCompleted || cartAbandoned) {
      return 'purchase_decision';
    }
    
    if (comparisonsViewed > 0 || pagesVisited.some(p => p.includes('compare'))) {
      return 'evaluation';
    }
    
    if (searchQueries.length > 0 || pagesVisited.length > 3) {
      return 'information_search';
    }
    
    return 'problem_recognition';
  }
  
  /**
   * Create comprehensive behavioral profile using multiple frameworks
   */
  public createEnhancedProfile(
    userId: string,
    behaviorTags: BehaviorTag[],
    interactionData: {
      messagesExchanged: number,
      responseDelays: number[],
      clickPatterns: { element: string, timeViewing: number }[],
      searchQueries: string[],
      pagesVisited: string[],
      comparisonsViewed: number,
      cartAbandoned: boolean,
      purchaseCompleted: boolean,
      postPurchaseEngagement: number,
      purchaseHistory: number,
      totalSpent: number,
      visitsCount: number,
      timeOnSite: number,
      engagementRate: number,
      sessionFrequency: number,
      sessionDuration: number,
      contentPreferences: string[],
      pricePoints: number[],
      responseToIncentives: number,
      referralCount: number
    }
  ): EnhancedBehavioralProfile {
    // Apply Chase Hughes' behavioral analysis
    const signals = this.identifySignals(
      // Convert to expected format
      interactionData.messagesExchanged > 0 ? [{ content: "sample", isUser: true }] : [],
      interactionData.responseDelays,
      interactionData.clickPatterns
    );
    
    // Determine behavioral loop stage
    const behavioralLoop = this.identifyBehavioralLoop(
      interactionData.visitsCount,
      interactionData.messagesExchanged,
      interactionData.timeOnSite,
      interactionData.purchaseHistory,
      interactionData.referralCount
    );
    
    // Determine brand resonance stage (Keller)
    const brandResonance = this.identifyBrandResonanceStage(
      interactionData.visitsCount,
      interactionData.timeOnSite,
      interactionData.purchaseHistory,
      interactionData.engagementRate
    );
    
    // Determine decision stage (Kotler)
    const decisionStage = this.identifyDecisionStage(
      interactionData.searchQueries,
      interactionData.pagesVisited,
      interactionData.comparisonsViewed,
      interactionData.cartAbandoned,
      interactionData.purchaseCompleted,
      interactionData.postPurchaseEngagement
    );
    
    // Calculate trust level (Hughes)
    const trustLevel = Math.min(
      100, 
      50 + 
      (signals.includes('trust') ? 20 : 0) - 
      (signals.includes('distrust') ? 20 : 0) +
      (interactionData.purchaseHistory * 5)
    );
    
    // Calculate price sensitivity (Chernev)
    const priceSensitivity = this.calculatePriceSensitivity(
      interactionData.pricePoints,
      interactionData.responseToIncentives,
      behavioralLoop
    );
    
    // Determine value orientation (Chernev)
    const valueOrientation = this.determineValueOrientation(
      signals,
      interactionData.contentPreferences,
      priceSensitivity
    );
    
    // Generate marketing optimizations
    const marketingOptimizations = this.generateMarketingOptimizations(
      behavioralLoop,
      brandResonance,
      decisionStage,
      priceSensitivity,
      valueOrientation,
      trustLevel,
      signals,
      {
        timeOfDayPreference: this.calculateTimePreference(interactionData.pagesVisited),
        sessionFrequency: interactionData.sessionFrequency,
        sessionDuration: interactionData.sessionDuration,
        contentPreferences: interactionData.contentPreferences,
        pricePoints: interactionData.pricePoints,
        responseToIncentives: interactionData.responseToIncentives
      }
    );
    
    // Map standard behavioral flags to Hermes/Gouldian system
    const hermesMode: HermesMode = 
      trustLevel > 80 ? 'premium' :
      trustLevel < 40 ? 'protective' :
      signals.includes('trust') ? 'emotional' : 'neutral';
    
    const toneFilter: ToneFilter = 
      trustLevel > 80 ? 'enhanced' :
      trustLevel < 40 ? 'generic' :
      valueOrientation === 'emotional' ? 'authentic' : 'restrained';
    
    // Return complete enhanced profile
    return {
      standardProfile: {
        behaviorTags,
        hermesMode,
        toneFilter,
        trustScore: trustLevel,
      },
      psychographicProfile: {
        behavioralLoop,
        brandResonance,
        decisionStage,
        priceSensitivity,
        valueOrientation,
        trustLevel,
        identifiedSignals: signals,
        engagementPatterns: {
          timeOfDayPreference: this.calculateTimePreference(interactionData.pagesVisited),
          sessionFrequency: interactionData.sessionFrequency,
          sessionDuration: interactionData.sessionDuration,
          contentPreferences: interactionData.contentPreferences,
          pricePoints: interactionData.pricePoints,
          responseToIncentives: interactionData.responseToIncentives
        }
      },
      marketingOptimizations
    };
  }
  
  /**
   * Calculate price sensitivity based on Chernev's pricing psychology
   */
  private calculatePriceSensitivity(
    pricePoints: number[],
    responseToIncentives: number,
    behavioralLoop: BehavioralLoop
  ): number {
    // More advanced users are less price sensitive
    const loopFactor = 
      behavioralLoop === 'advocacy' ? 0.5 :
      behavioralLoop === 'identity' ? 0.7 :
      behavioralLoop === 'investment' ? 0.9 : 
      behavioralLoop === 'engagement' ? 1.0 : 1.2;
      
    // Higher response to incentives indicates higher price sensitivity
    const incentiveFactor = responseToIncentives / 100 * 50;
    
    // Calculate variance in past purchases - lower variance indicates higher price sensitivity
    let varianceFactor = 50;
    if (pricePoints.length > 1) {
      const avg = pricePoints.reduce((a, b) => a + b, 0) / pricePoints.length;
      const variance = pricePoints.map(p => Math.pow(p - avg, 2)).reduce((a, b) => a + b, 0) / pricePoints.length;
      varianceFactor = Math.min(50, Math.max(10, 50 - (variance / (avg * 0.1))));
    }
    
    // Combine factors
    return Math.min(100, Math.max(1, (incentiveFactor + varianceFactor) * loopFactor));
  }
  
  /**
   * Determine value orientation based on Chernev's consumer behavior framework
   */
  private determineValueOrientation(
    signals: MicroexpressionSignal[],
    contentPreferences: string[],
    priceSensitivity: number
  ): 'economic' | 'functional' | 'emotional' | 'symbolic' {
    // Extremely price sensitive users are economically oriented
    if (priceSensitivity > 85) {
      return 'economic';
    }
    
    // Check content preferences for indicators
    const emotionalContent = contentPreferences.filter(p => 
      p.includes('story') || p.includes('experience') || p.includes('feeling')
    ).length;
    
    const functionalContent = contentPreferences.filter(p => 
      p.includes('feature') || p.includes('spec') || p.includes('how-to')
    ).length;
    
    const symbolicContent = contentPreferences.filter(p => 
      p.includes('status') || p.includes('exclusive') || p.includes('premium')
    ).length;
    
    // Determine by highest count
    const counts = [
      { type: 'functional', count: functionalContent },
      { type: 'emotional', count: emotionalContent },
      { type: 'symbolic', count: symbolicContent },
    ];
    
    // Sort descending
    counts.sort((a, b) => b.count - a.count);
    
    // If there's a clear preference, use it
    if (counts[0].count > 0 && counts[0].count > counts[1].count) {
      return counts[0].type as 'functional' | 'emotional' | 'symbolic';
    }
    
    // Use signals as tiebreaker
    if (signals.includes('interest') && !signals.includes('resistance')) {
      return 'emotional';
    }
    
    // Default based on price sensitivity
    return priceSensitivity > 60 ? 'functional' : 'emotional';
  }
  
  /**
   * Calculate time of day preference from visit patterns
   */
  private calculateTimePreference(pagesVisited: string[]): number[] {
    // In a real implementation, this would analyze actual timestamps
    // For demo purposes, return dummy data
    return [9, 12, 19, 21];
  }
  
  /**
   * Generate marketing optimizations using Kotler's 4P framework and Chernev's choice architecture
   */
  private generateMarketingOptimizations(
    behavioralLoop: BehavioralLoop,
    brandResonance: BrandResonanceStage,
    decisionStage: ConsumerDecisionStage,
    priceSensitivity: number,
    valueOrientation: 'economic' | 'functional' | 'emotional' | 'symbolic',
    trustLevel: number,
    signals: MicroexpressionSignal[],
    engagementPatterns: PsychographicProfile['engagementPatterns']
  ) {
    // Calculate optimal time for offers based on engagement patterns
    const optimalOfferTiming = engagementPatterns.timeOfDayPreference[0] || 19;
    
    // Suggest price points based on Chernev's pricing psychology
    const avgPrice = engagementPatterns.pricePoints.length > 0 
      ? engagementPatterns.pricePoints.reduce((a, b) => a + b, 0) / engagementPatterns.pricePoints.length
      : 50;
    
    // Apply Chernev's charm pricing and bracketing principles
    const suggestedPricePoints = [
      Math.floor(avgPrice * 0.8) - 0.01, // Lower bracket
      Math.floor(avgPrice) - 0.01,       // Target price
      Math.floor(avgPrice * 1.2) - 0.01  // Premium option
    ];
    
    // Determine messaging tone based on value orientation
    const recommendedToneStyle = 
      valueOrientation === 'economic' ? 'direct and value-focused' :
      valueOrientation === 'functional' ? 'detailed and informative' :
      valueOrientation === 'emotional' ? 'empathetic and story-based' :
      'premium and exclusive';
      
    // Determine value proposition focus using Kotler's framework
    const valuePropositionFocus = 
      decisionStage === 'problem_recognition' ? 'pain point identification' :
      decisionStage === 'information_search' ? 'educational content' :
      decisionStage === 'evaluation' ? 'competitive differentiation' :
      decisionStage === 'purchase_decision' ? 'risk reduction' :
      'usage and community';
      
    // Determine engagement strategy based on behavioral loop
    const engagementStrategy = 
      behavioralLoop === 'discovery' ? 'provide valuable information with no commitment required' :
      behavioralLoop === 'engagement' ? 'encourage small actions with immediate rewards' :
      behavioralLoop === 'investment' ? 'deepen relationship with personalized experiences' :
      behavioralLoop === 'identity' ? 'foster sense of belonging and ownership' :
      'create advocacy opportunities and recognition';
      
    // Calculate retention risk based on Hughes' engagement indicators
    const retentionRisk = Math.max(0, Math.min(100, 
      100 - trustLevel + 
      (signals.includes('disinterest') ? 30 : 0) +
      (signals.includes('resistance') ? 20 : 0) -
      (signals.includes('commitment') ? 20 : 0)
    ));
    
    // Estimate lifetime value based on behavioral indicators
    const lifetimeValueBase = engagementPatterns.pricePoints.reduce((sum, price) => sum + price, 0);
    const loyaltyMultiplier = 
      behavioralLoop === 'advocacy' ? 5 :
      behavioralLoop === 'identity' ? 4 :
      behavioralLoop === 'investment' ? 3 :
      behavioralLoop === 'engagement' ? 2 : 1;
      
    const lifetimeValueEstimate = lifetimeValueBase * loyaltyMultiplier;
    
    // Determine next best action using Kotler's customer journey framework
    const nextBestAction = 
      decisionStage === 'problem_recognition' ? 'educate on solutions' :
      decisionStage === 'information_search' ? 'provide comparison tools' :
      decisionStage === 'evaluation' ? 'offer free trial or demonstration' :
      decisionStage === 'purchase_decision' ? 'provide limited-time incentive' :
      'request feedback and reviews';
      
    return {
      optimalOfferTiming,
      suggestedPricePoints,
      recommendedToneStyle,
      valuePropositionFocus,
      engagementStrategy,
      retentionRisk,
      lifetimeValueEstimate,
      nextBestAction
    };
  }
}

// Export singleton instance
export const enhancedBehavioralAnalyzer = new EnhancedBehavioralAnalyzer();
export default enhancedBehavioralAnalyzer;
