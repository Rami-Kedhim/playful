
import { 
  ChaseHughesBehavioralProfile, 
  InfluenceTechnique,
  InfluencePhase,
  MicroExpression,
  SensoryPreference
} from '@/types/chaseHughes';

/**
 * Service implementing Chase Hughes' behavioral analysis and influence techniques
 */
export class ChaseHughesBehavioralAnalyzer {
  /**
   * Analyze behavior patterns to create a Chase Hughes behavioral profile
   */
  public createBehavioralProfile(
    behaviorData: {
      messageHistory: { content: string, isUser: boolean }[];
      interactionHistory: {
        clickPatterns: { element: string, timeViewing: number }[];
        pageViews: { page: string, timeSpent: number }[];
        responseDelays: number[];
      };
      contentPreferences: string[];
    }
  ): ChaseHughesBehavioralProfile {
    // Analyze sensory preferences from message content
    const sensoryPreference = this.analyzeSensoryPreference(
      behaviorData.messageHistory,
      behaviorData.interactionHistory.pageViews
    );
    
    // Determine current influence phase
    const influencePhase = this.determineInfluencePhase(
      behaviorData.messageHistory, 
      behaviorData.interactionHistory
    );
    
    // Calculate influence phase progress
    const influencePhaseProgress = this.calculatePhaseProgress(
      influencePhase, 
      behaviorData.messageHistory
    );
    
    // Detect micro expressions (simulated in text-based environment)
    const detectedMicroExpressions = this.detectMicroExpressions(
      behaviorData.messageHistory
    );
    
    // Determine which influence techniques the user responds to
    const responsiveTechniques = this.identifyResponsiveTechniques(
      behaviorData.messageHistory,
      behaviorData.interactionHistory
    );
    
    // Calculate trust and desire scores
    const trustScore = this.calculateTrustScore(
      behaviorData.messageHistory,
      detectedMicroExpressions,
      behaviorData.interactionHistory
    );
    
    const desireScore = this.calculateDesireScore(
      behaviorData.messageHistory,
      behaviorData.contentPreferences
    );
    
    const engagementScore = this.calculateEngagementScore(
      behaviorData.interactionHistory
    );
    
    // Determine the best approach based on all factors
    const suggestedApproach = this.determineSuggestedApproach(
      sensoryPreference.primary,
      influencePhase,
      responsiveTechniques,
      trustScore,
      desireScore
    );
    
    // Return complete profile
    return {
      primarySensoryPreference: sensoryPreference.primary,
      secondarySensoryPreference: sensoryPreference.secondary,
      currentInfluencePhase: influencePhase,
      influencePhaseProgress,
      detectedMicroExpressions,
      responsiveToTechniques: responsiveTechniques,
      suggestedApproach,
      trustScore,
      desireScore,
      engagementScore
    };
  }
  
  /**
   * Analyze message content and interaction patterns to determine sensory preference
   */
  private analyzeSensoryPreference(
    messages: { content: string, isUser: boolean }[],
    pageViews: { page: string, timeSpent: number }[]
  ): { primary: SensoryPreference, secondary?: SensoryPreference } {
    // Extract user messages
    const userMessages = messages.filter(m => m.isUser).map(m => m.content.toLowerCase());
    
    // Count sensory predicates
    let visualCount = 0;
    let auditoryCount = 0;
    let kinestheticCount = 0;
    
    // Visual predicates (based on Chase Hughes BTE)
    const visualPredicates = [
      'see', 'look', 'view', 'appear', 'show', 'picture', 'image', 'watch',
      'bright', 'dark', 'colorful', 'focus', 'perspective', 'vision', 'scene'
    ];
    
    // Auditory predicates
    const auditoryPredicates = [
      'hear', 'listen', 'sound', 'tell', 'talk', 'voice', 'speak', 'loud',
      'quiet', 'silence', 'rhythm', 'noisy', 'audio', 'say', 'vocal'
    ];
    
    // Kinesthetic predicates
    const kinestheticPredicates = [
      'feel', 'touch', 'grasp', 'hold', 'solid', 'warm', 'cold', 'smooth',
      'rough', 'handle', 'contact', 'sensation', 'pressure', 'comfort'
    ];
    
    // Count occurrences in user messages
    userMessages.forEach(message => {
      visualPredicates.forEach(word => {
        if (message.includes(word)) visualCount++;
      });
      
      auditoryPredicates.forEach(word => {
        if (message.includes(word)) auditoryCount++;
      });
      
      kinestheticPredicates.forEach(word => {
        if (message.includes(word)) kinestheticCount++;
      });
    });
    
    // Analyze page view behavior
    pageViews.forEach(view => {
      // Visual-dominant pages
      if (
        view.page.includes('gallery') || 
        view.page.includes('photo') || 
        view.page.includes('image')
      ) {
        visualCount += Math.floor(view.timeSpent / 10);
      }
      
      // Audio-dominant pages
      if (
        view.page.includes('audio') || 
        view.page.includes('voice') || 
        view.page.includes('sound')
      ) {
        auditoryCount += Math.floor(view.timeSpent / 10);
      }
      
      // Kinesthetic-dominant pages
      if (
        view.page.includes('interact') || 
        view.page.includes('game') || 
        view.page.includes('experience')
      ) {
        kinestheticCount += Math.floor(view.timeSpent / 10);
      }
    });
    
    // Determine primary and secondary preferences
    const scores = [
      { type: 'visual' as SensoryPreference, score: visualCount },
      { type: 'auditory' as SensoryPreference, score: auditoryCount },
      { type: 'kinesthetic' as SensoryPreference, score: kinestheticCount }
    ].sort((a, b) => b.score - a.score);
    
    return {
      primary: scores[0].type,
      secondary: scores[1].score > 0 ? scores[1].type : undefined
    };
  }
  
  /**
   * Determine the current influence phase based on Chase Hughes' Chain of Influence
   */
  private determineInfluencePhase(
    messages: { content: string, isUser: boolean }[],
    interactionHistory: {
      clickPatterns: { element: string, timeViewing: number }[];
      pageViews: { page: string, timeSpent: number }[];
      responseDelays: number[];
    }
  ): InfluencePhase {
    // Trust indicators
    const hasSharedPersonalInfo = messages.some(m => 
      m.isUser && (
        m.content.includes('my name') ||
        m.content.includes('I live') ||
        m.content.includes('my job') ||
        m.content.includes('my phone')
      )
    );
    
    // Desire indicators
    const hasExpressedDesire = messages.some(m =>
      m.isUser && (
        m.content.includes('want') ||
        m.content.includes('like to') ||
        m.content.includes('would love') ||
        m.content.includes('interested in')
      )
    );
    
    // Action indicators
    const hasPerformedAction = interactionHistory.clickPatterns.some(p =>
      p.element.includes('subscribe') ||
      p.element.includes('purchase') ||
      p.element.includes('signup') ||
      p.element.includes('book')
    );
    
    // Loyalty indicators
    const hasReturningVisits = interactionHistory.pageViews.length > 5;
    const hasEngagedDeeply = interactionHistory.pageViews.some(p => p.timeSpent > 300);
    
    // Determine phase based on indicators
    if (hasReturningVisits && hasEngagedDeeply && hasPerformedAction) {
      return 'loyalty';
    } else if (hasPerformedAction) {
      return 'action';
    } else if (hasExpressedDesire) {
      return 'desire';
    } else if (hasSharedPersonalInfo) {
      return 'trust';
    } else {
      return 'interest';
    }
  }
  
  /**
   * Calculate progress within the current influence phase (0-100)
   */
  private calculatePhaseProgress(
    phase: InfluencePhase,
    messages: { content: string, isUser: boolean }[]
  ): number {
    // Count total relevant messages for current phase
    const userMessages = messages.filter(m => m.isUser);
    
    if (userMessages.length === 0) return 0;
    
    switch (phase) {
      case 'interest':
        // Interest = ratio of questions to total messages
        const questionCount = userMessages.filter(m => m.content.includes('?')).length;
        return Math.min(100, Math.round((questionCount / userMessages.length) * 100));
        
      case 'trust':
        // Trust = personal information sharing + positive sentiment
        const personalInfoShared = userMessages.filter(m => 
          m.content.includes('I') ||
          m.content.includes('my') ||
          m.content.includes('me')
        ).length;
        return Math.min(100, Math.round((personalInfoShared / userMessages.length) * 100));
        
      case 'desire':
        // Desire = expressions of want + future planning
        const desireExpressions = userMessages.filter(m => 
          m.content.includes('want') ||
          m.content.includes('like to') ||
          m.content.includes('would love') ||
          m.content.includes('wish')
        ).length;
        return Math.min(100, Math.round((desireExpressions / userMessages.length) * 75));
        
      case 'action':
        // Action phase is binary - either took action (100%) or preparing (50%)
        return 50; // Default to preparing state
        
      case 'loyalty':
        // Loyalty increases with each positive interaction
        return Math.min(100, 50 + userMessages.length * 5);
        
      default:
        return 50;
    }
  }
  
  /**
   * Detect micro expressions from text patterns (simulated in text environment)
   */
  private detectMicroExpressions(
    messages: { content: string, isUser: boolean }[]
  ): MicroExpression[] {
    const microExpressions: MicroExpression[] = [];
    const userMessages = messages.filter(m => m.isUser).map(m => m.content.toLowerCase());
    
    // Simple pattern matching for expressions
    // In a real implementation, this would use NLP or emotion analysis
    
    // Check for happiness indicators
    if (userMessages.some(m => 
      m.includes('happy') || 
      m.includes('glad') || 
      m.includes('great') ||
      m.includes('excellent') ||
      m.includes(':)') ||
      m.includes('😊')
    )) {
      microExpressions.push('happiness');
    }
    
    // Check for anger indicators
    if (userMessages.some(m => 
      m.includes('angry') || 
      m.includes('frustrated') || 
      m.includes('annoying') ||
      m.includes('upset') ||
      m.includes('>:(')
    )) {
      microExpressions.push('anger');
    }
    
    // Check for surprise indicators
    if (userMessages.some(m => 
      m.includes('wow') || 
      m.includes('really?') || 
      m.includes('unexpected') ||
      m.includes('surprised') ||
      m.includes('!!')
    )) {
      microExpressions.push('surprise');
    }
    
    // Check for fear indicators
    if (userMessages.some(m => 
      m.includes('afraid') || 
      m.includes('worried') || 
      m.includes('concerned') ||
      m.includes('scared')
    )) {
      microExpressions.push('fear');
    }
    
    return microExpressions;
  }
  
  /**
   * Identify which influence techniques the user responds to
   * Based on Chase Hughes' behavioral models
   */
  private identifyResponsiveTechniques(
    messages: { content: string, isUser: boolean }[],
    interactionHistory: {
      clickPatterns: { element: string, timeViewing: number }[];
      pageViews: { page: string, timeSpent: number }[];
      responseDelays: number[];
    }
  ): InfluenceTechnique[] {
    const techniques: InfluenceTechnique[] = [];
    
    // Check for responsiveness to yes ladder technique
    if (messages.some(m => m.isUser && m.content.includes('yes'))) {
      techniques.push('yes_ladder');
    }
    
    // Check for responsiveness to social proof
    if (interactionHistory.pageViews.some(p => 
      p.page.includes('testimonial') || 
      p.page.includes('review')
    )) {
      techniques.push('social_proof');
    }
    
    // Check for responsiveness to scarcity
    if (interactionHistory.clickPatterns.some(p => 
      p.element.includes('limited') || 
      p.element.includes('exclusive')
    )) {
      techniques.push('scarcity_framing');
    }
    
    // Always include interrogation encapsulation as it's versatile
    techniques.push('interrogation_encapsulation');
    
    // Include BTE mapping as we've analyzed sensory preference
    techniques.push('bte_mapping');
    
    return techniques;
  }
  
  /**
   * Calculate trust score based on interaction patterns
   */
  private calculateTrustScore(
    messages: { content: string, isUser: boolean }[],
    microExpressions: MicroExpression[],
    interactionHistory: {
      clickPatterns: { element: string, timeViewing: number }[];
      pageViews: { page: string, timeSpent: number }[];
      responseDelays: number[];
    }
  ): number {
    // Base trust score
    let trustScore = 50;
    
    // Add points for positive expressions
    if (microExpressions.includes('happiness')) {
      trustScore += 15;
    }
    
    // Subtract for negative expressions
    if (microExpressions.includes('anger') || microExpressions.includes('disgust')) {
      trustScore -= 20;
    }
    
    // Check for trust-building page views
    const trustPageViews = interactionHistory.pageViews.filter(p => 
      p.page.includes('about') || 
      p.page.includes('testimonial') || 
      p.page.includes('security') ||
      p.page.includes('privacy')
    );
    
    trustScore += trustPageViews.length * 5;
    
    // Personal information sharing increases trust
    const personalInfoCount = messages.filter(m => 
      m.isUser && (
        m.content.includes('I am') ||
        m.content.includes('my name') ||
        m.content.includes('I live') ||
        m.content.includes('I like')
      )
    ).length;
    
    trustScore += personalInfoCount * 10;
    
    // Cap at 0-100 range
    return Math.max(0, Math.min(100, trustScore));
  }
  
  /**
   * Calculate desire score based on message content and content preferences
   */
  private calculateDesireScore(
    messages: { content: string, isUser: boolean }[],
    contentPreferences: string[]
  ): number {
    // Base desire score
    let desireScore = 40;
    
    // Explicit desire expressions
    const desireExpressions = messages.filter(m => 
      m.isUser && (
        m.content.includes('want') ||
        m.content.includes('would like') ||
        m.content.includes('looking for') ||
        m.content.includes('interested in')
      )
    ).length;
    
    desireScore += desireExpressions * 15;
    
    // Content engagement indicates desire
    desireScore += contentPreferences.length * 5;
    
    // Direct questions about services/products
    const productQuestions = messages.filter(m => 
      m.isUser && m.content.includes('?') && (
        m.content.includes('price') ||
        m.content.includes('offer') ||
        m.content.includes('service') ||
        m.content.includes('available')
      )
    ).length;
    
    desireScore += productQuestions * 10;
    
    // Cap at 0-100 range
    return Math.max(0, Math.min(100, desireScore));
  }
  
  /**
   * Calculate engagement score based on interaction history
   */
  private calculateEngagementScore(
    interactionHistory: {
      clickPatterns: { element: string, timeViewing: number }[];
      pageViews: { page: string, timeSpent: number }[];
      responseDelays: number[];
    }
  ): number {
    // Base engagement score
    let engagementScore = 30;
    
    // Total time spent
    const totalTimeSpent = interactionHistory.pageViews.reduce(
      (sum, view) => sum + view.timeSpent, 0
    );
    
    engagementScore += Math.min(50, totalTimeSpent / 10);
    
    // Click diversity
    const uniqueElements = new Set(
      interactionHistory.clickPatterns.map(p => p.element)
    ).size;
    
    engagementScore += uniqueElements * 5;
    
    // Response speed (lower is better)
    if (interactionHistory.responseDelays.length > 0) {
      const avgDelay = interactionHistory.responseDelays.reduce(
        (sum, delay) => sum + delay, 0
      ) / interactionHistory.responseDelays.length;
      
      // Faster responses = higher engagement
      engagementScore += Math.max(0, 10 - Math.floor(avgDelay / 2));
    }
    
    // Cap at 0-100 range
    return Math.max(0, Math.min(100, engagementScore));
  }
  
  /**
   * Determine the suggested approach based on user profile
   */
  private determineSuggestedApproach(
    sensorPreference: SensoryPreference,
    influencePhase: InfluencePhase,
    responsiveTechniques: InfluenceTechnique[],
    trustScore: number,
    desireScore: number
  ): {
    technique: InfluenceTechnique;
    languagePattern: string;
    visualCues?: string[];
    audioElements?: string[];
  } {
    // Select technique based on phase and responsiveness
    let technique: InfluenceTechnique;
    let languagePattern: string;
    let visualCues: string[] = [];
    let audioElements: string[] = [];
    
    // Choose most appropriate technique for the phase
    if (influencePhase === 'interest' && responsiveTechniques.includes('interrogation_encapsulation')) {
      technique = 'interrogation_encapsulation';
      languagePattern = "Would you like to discover something that most people don't know about [topic]?";
    } else if (influencePhase === 'trust' && responsiveTechniques.includes('reciprocity_trigger')) {
      technique = 'reciprocity_trigger';
      languagePattern = "I'd like to share something special with you that not many people get to see...";
    } else if (influencePhase === 'desire' && responsiveTechniques.includes('scarcity_framing')) {
      technique = 'scarcity_framing';
      languagePattern = "This opportunity is only available to a select few people who understand its value...";
    } else if (influencePhase === 'action' && desireScore > 70) {
      technique = 'commitment_consistency';
      languagePattern = "Since you've already shown interest in [topic], the next natural step would be...";
    } else if (influencePhase === 'loyalty') {
      technique = 'likeability_enhancement';
      languagePattern = "People who share your unique perspective often find that...";
    } else {
      // Default to BTE mapping based on sensory preference
      technique = 'bte_mapping';
      
      if (sensorPreference === 'visual') {
        languagePattern = "Let me show you how this looks when you put it all together...";
        visualCues = ['Use bright imagery', 'Show before/after', 'Use visual metaphors'];
      } else if (sensorPreference === 'auditory') {
        languagePattern = "Listen to how this sounds when you experience it fully...";
        audioElements = ['Use varied tone', 'Rhythmic speech patterns', 'Sound effects'];
      } else { // kinesthetic
        languagePattern = "Can you feel how this would change your experience when you try it?";
      }
    }
    
    return {
      technique,
      languagePattern,
      visualCues: visualCues.length > 0 ? visualCues : undefined,
      audioElements: audioElements.length > 0 ? audioElements : undefined
    };
  }
}

// Export singleton instance
export const chaseHughesAnalyzer = new ChaseHughesBehavioralAnalyzer();
export default chaseHughesAnalyzer;
