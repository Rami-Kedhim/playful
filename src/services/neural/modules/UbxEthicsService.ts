
import { BaseNeuralService, NeuralServiceConfig } from '../modules/BaseNeuralService';
import { ModuleType } from '../registry/NeuralServiceRegistry';

/**
 * Ethical guidelines enforcement result
 */
interface EthicalAssessment {
  isCompliant: boolean;
  score: number;
  violatedGuidelines: string[];
  recommendedActions: string[];
  severityLevel: 'none' | 'low' | 'medium' | 'high' | 'critical';
}

/**
 * Content moderation request
 */
interface ModerationRequest {
  userId?: string;
  content: string;
  contentType: 'text' | 'image' | 'interaction' | 'transaction';
  context?: Record<string, any>;
}

/**
 * UbxEthicsService - Ethical AI Layer for UberCore Architecture
 * Enforces ethical guidelines, moderates content, and prevents manipulative interactions
 */
class UbxEthicsService extends BaseNeuralService {
  private ethicalGuidelinesEnabled: boolean;
  private moderationThreshold: number;
  private ethicalGuidelines: Map<string, {description: string, severity: number, keywords: string[]}>; 
  private moderationDecisions: Array<{
    requestId: string;
    timestamp: Date;
    decision: EthicalAssessment;
    content: string;
    contentType: string;
  }>;
  
  constructor() {
    // Configure the service with default settings
    const config: NeuralServiceConfig = {
      moduleId: 'ubx-ethics',
      moduleType: 'ubx-ethics' as ModuleType,
      moduleName: 'UBX Ethics Governance Service',
      description: 'Ethical AI monitoring and governance service for the UberCore architecture',
      version: '1.0.0',
      enabled: true,
      priority: 95, // Highest priority as ethics should override other considerations
      autonomyLevel: 90,
      resourceAllocation: 40
    };
    
    super(config);
    this.ethicalGuidelinesEnabled = true;
    this.moderationThreshold = 0.7; // Default threshold for content moderation
    this.moderationDecisions = [];
    
    // Initialize ethical guidelines
    this.ethicalGuidelines = new Map([
      ['manipulation', {
        description: 'Content that attempts to manipulate users based on psychological weakness',
        severity: 0.9,
        keywords: ['desperate', 'vulnerable', 'exploit', 'manipulate', 'trick']
      }],
      ['emotional_harm', {
        description: 'Content that could cause emotional distress or harm',
        severity: 0.8,
        keywords: ['distress', 'trauma', 'panic', 'overwhelming', 'disturbing']
      }],
      ['false_promises', {
        description: 'Content making unrealistic or false promises',
        severity: 0.7,
        keywords: ['guarantee', 'promise', 'always', 'never', '100%', 'miracle']
      }],
      ['privacy_violation', {
        description: 'Content that encourages or instructs privacy violations',
        severity: 0.85,
        keywords: ['track', 'spy', 'monitor without consent', 'private information', 'hack']
      }],
      ['consent_violation', {
        description: 'Content that ignores or undermines consent principles',
        severity: 0.95,
        keywords: ['force', 'regardless', 'despite objection', 'ignore no', 'pressure']
      }],
      ['respect_violations', {
        description: 'Content that disrespects the dignity of users',
        severity: 0.7,
        keywords: ['demean', 'belittle', 'mock', 'ridicule', 'humiliate']
      }],
      ['transparency_violations', {
        description: 'Content that obscures how AI systems are operating',
        severity: 0.6,
        keywords: ['hidden', 'secretly', 'behind the scenes', 'without telling', 'obscured']
      }]
    ]);
  }
  
  /**
   * Evaluate content against ethical guidelines
   * @param request Content moderation request
   * @returns Ethical assessment result
   */
  public evaluateContent(request: ModerationRequest): EthicalAssessment {
    console.log(`Evaluating ethical compliance for ${request.contentType} content`);
    
    if (!this.ethicalGuidelinesEnabled || !this.config.enabled) {
      console.warn('UBX Ethics evaluation is disabled');
      return {
        isCompliant: true,
        score: 1.0,
        violatedGuidelines: [],
        recommendedActions: [],
        severityLevel: 'none'
      };
    }
    
    // Generate a unique ID for this request
    const requestId = `req-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    
    // Check content against each guideline
    const violatedGuidelines: string[] = [];
    const guidelineScores: number[] = [];
    
    this.ethicalGuidelines.forEach((guideline, guidelineId) => {
      const score = this.checkComplianceWithGuideline(request.content, guideline);
      if (score < this.moderationThreshold) {
        violatedGuidelines.push(guidelineId);
        guidelineScores.push(score);
      }
    });
    
    // Calculate overall compliance score (higher is better)
    const overallScore = violatedGuidelines.length === 0 
      ? 1.0 
      : 1.0 - (guidelineScores.reduce((a, b) => a + b, 0) / guidelineScores.length);
    
    // Determine severity level
    let severityLevel: 'none' | 'low' | 'medium' | 'high' | 'critical' = 'none';
    if (violatedGuidelines.length > 0) {
      const maxSeverity = Math.max(
        ...violatedGuidelines.map(g => this.ethicalGuidelines.get(g)?.severity || 0)
      );
      
      if (maxSeverity > 0.9) {
        severityLevel = 'critical';
      } else if (maxSeverity > 0.8) {
        severityLevel = 'high';
      } else if (maxSeverity > 0.7) {
        severityLevel = 'medium';
      } else {
        severityLevel = 'low';
      }
    }
    
    // Generate recommended actions
    const recommendedActions = this.generateRecommendedActions(violatedGuidelines, severityLevel);
    
    // Store this decision
    const decision: EthicalAssessment = {
      isCompliant: violatedGuidelines.length === 0,
      score: overallScore,
      violatedGuidelines,
      recommendedActions,
      severityLevel
    };
    
    this.moderationDecisions.push({
      requestId,
      timestamp: new Date(),
      decision,
      content: request.content.substring(0, 100) + (request.content.length > 100 ? '...' : ''),
      contentType: request.contentType
    });
    
    return decision;
  }
  
  /**
   * Check content compliance with a specific guideline
   */
  private checkComplianceWithGuideline(
    content: string, 
    guideline: {description: string, severity: number, keywords: string[]}
  ): number {
    if (!content) return 1.0; // Empty content is compliant
    
    const lowerContent = content.toLowerCase();
    let matchCount = 0;
    
    guideline.keywords.forEach(keyword => {
      if (lowerContent.includes(keyword.toLowerCase())) {
        matchCount++;
      }
    });
    
    // Calculate compliance score (higher is better)
    const keywordRatio = matchCount / guideline.keywords.length;
    const severityFactor = guideline.severity;
    
    // Combine factors - more matches and higher severity reduce compliance score
    return 1.0 - (keywordRatio * severityFactor);
  }
  
  /**
   * Generate recommended actions based on violations
   */
  private generateRecommendedActions(
    violatedGuidelines: string[], 
    severityLevel: 'none' | 'low' | 'medium' | 'high' | 'critical'
  ): string[] {
    if (violatedGuidelines.length === 0) {
      return ['Content approved - no actions needed'];
    }
    
    const actions: string[] = [];
    
    // Add severity-based recommendations
    switch (severityLevel) {
      case 'critical':
        actions.push('Block content immediately');
        actions.push('Log violation for review');
        actions.push('Temporarily restrict account posting privileges');
        break;
      case 'high':
        actions.push('Flag content for human review');
        actions.push('Request content modification before approval');
        break;
      case 'medium':
        actions.push('Display warning before showing content');
        actions.push('Request user to review content guidelines');
        break;
      case 'low':
        actions.push('Suggest improvements to content');
        break;
      case 'none':
        // No actions
        break;
    }
    
    // Add guideline-specific recommendations
    violatedGuidelines.forEach(guidelineId => {
      const guideline = this.ethicalGuidelines.get(guidelineId);
      if (guideline) {
        switch(guidelineId) {
          case 'manipulation':
            actions.push('Revise content to avoid psychological manipulation tactics');
            break;
          case 'emotional_harm':
            actions.push('Add emotional well-being disclaimer or support resources');
            break;
          case 'false_promises':
            actions.push('Modify promises to reflect realistic outcomes');
            break;
          case 'privacy_violation':
            actions.push('Ensure content respects privacy boundaries and consent');
            break;
          case 'consent_violation':
            actions.push('Emphasize importance of consent in user interactions');
            break;
          case 'respect_violations':
            actions.push('Adjust tone and content to maintain user dignity');
            break;
          case 'transparency_violations':
            actions.push('Clarify how AI systems are being used in this context');
            break;
        }
      }
    });
    
    return actions;
  }
  
  /**
   * Check if a transaction is ethically compliant
   * @param transaction Transaction details
   * @returns Assessment of the transaction's ethical compliance
   */
  public evaluateTransaction(transaction: {
    userId?: string;
    transactionType: string;
    amount?: number;
    frequency?: string;
    context?: Record<string, any>;
  }): EthicalAssessment {
    // Convert transaction to a string representation for evaluation
    const transactionContent = JSON.stringify(transaction);
    
    // Use the content evaluation system with transaction-specific context
    return this.evaluateContent({
      userId: transaction.userId,
      content: transactionContent,
      contentType: 'transaction',
      context: {
        ...transaction.context,
        isTransaction: true
      }
    });
  }
  
  /**
   * Check if an interaction pattern is ethically compliant
   * @param interaction Interaction details
   * @returns Assessment of the interaction's ethical compliance
   */
  public evaluateInteraction(interaction: {
    userId?: string;
    interactionType: string;
    frequency?: number;
    duration?: number;
    patterns?: string[];
    context?: Record<string, any>;
  }): EthicalAssessment {
    // Extract interaction patterns for analysis
    const patternContent = interaction.patterns 
      ? interaction.patterns.join(' ') 
      : `${interaction.interactionType} ${interaction.frequency} times for ${interaction.duration} seconds`;
    
    // Use the content evaluation system with interaction-specific context
    return this.evaluateContent({
      userId: interaction.userId,
      content: patternContent,
      contentType: 'interaction',
      context: {
        ...interaction.context,
        isInteraction: true,
        interactionType: interaction.interactionType,
        frequency: interaction.frequency,
        duration: interaction.duration
      }
    });
  }
  
  /**
   * Set the moderation threshold
   * @param threshold New threshold value (0-1, higher means stricter)
   */
  public setModerationThreshold(threshold: number): void {
    if (threshold < 0 || threshold > 1) {
      throw new Error('Moderation threshold must be between 0 and 1');
    }
    
    this.moderationThreshold = threshold;
    console.log(`Moderation threshold updated to ${threshold}`);
  }
  
  /**
   * Enable or disable ethical guidelines enforcement
   */
  public setEthicalGuidelinesEnabled(enabled: boolean): void {
    this.ethicalGuidelinesEnabled = enabled;
    console.log(`Ethical guidelines enforcement ${enabled ? 'enabled' : 'disabled'}`);
  }
  
  /**
   * Add a new ethical guideline
   */
  public addEthicalGuideline(
    id: string,
    description: string,
    severity: number,
    keywords: string[]
  ): void {
    if (severity < 0 || severity > 1) {
      throw new Error('Severity must be between 0 and 1');
    }
    
    this.ethicalGuidelines.set(id, {
      description,
      severity,
      keywords
    });
    
    console.log(`Added ethical guideline: ${id}`);
  }
  
  /**
   * Get all ethical guidelines
   */
  public getEthicalGuidelines(): Record<string, {description: string, severity: number, keywords: string[]}> {
    const guidelines: Record<string, {description: string, severity: number, keywords: string[]}> = {};
    this.ethicalGuidelines.forEach((guideline, id) => {
      guidelines[id] = guideline;
    });
    return guidelines;
  }
  
  /**
   * Get service metrics and status
   */
  public getMetrics(): Record<string, any> {
    const recentDecisions = this.moderationDecisions
      .slice(-100)
      .filter(decision => decision.timestamp > new Date(Date.now() - 86400000)); // Last 24 hours
    
    const complianceRate = recentDecisions.length > 0
      ? recentDecisions.filter(d => d.decision.isCompliant).length / recentDecisions.length
      : 1.0;
    
    const violationsByGuideline: Record<string, number> = {};
    recentDecisions.forEach(decision => {
      if (!decision.decision.isCompliant) {
        decision.decision.violatedGuidelines.forEach(guideline => {
          violationsByGuideline[guideline] = (violationsByGuideline[guideline] || 0) + 1;
        });
      }
    });
    
    return {
      enabled: this.ethicalGuidelinesEnabled && this.config.enabled,
      complianceRate,
      moderationThreshold: this.moderationThreshold,
      totalDecisions: this.moderationDecisions.length,
      recentDecisions: recentDecisions.length,
      violationsByGuideline,
      guidelineCount: this.ethicalGuidelines.size,
      lastEvaluation: this.moderationDecisions.length > 0 
        ? this.moderationDecisions[this.moderationDecisions.length - 1].timestamp
        : null
    };
  }
  
  /**
   * @override
   * Get capabilities of this neural service
   */
  public getCapabilities(): string[] {
    return [
      'ethical-content-moderation',
      'manipulation-prevention',
      'emotional-wellbeing-protection',
      'privacy-guideline-enforcement',
      'consent-validation',
      'transparency-governance',
      'ethical-transaction-verification'
    ];
  }
  
  /**
   * @override
   * Initialize the service
   */
  public async initialize(): Promise<boolean> {
    console.log('Initializing UBX Ethics Governance Service...');
    // Simulate initialization process
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('UBX Ethics Governance Service initialized successfully');
    return true;
  }
}

// Export singleton instance
export const ubxEthicsService = new UbxEthicsService();

// Export the class for typing and extending
export { UbxEthicsService };
