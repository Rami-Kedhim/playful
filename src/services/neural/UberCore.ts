
import { ubxEmoService, UbxEmoService } from './modules/UbxEmoService';
import { ubxEthicsService, UbxEthicsService } from './modules/UbxEthicsService';
import { ubxBridgeService, UbxBridgeService } from './modules/UbxBridgeService';
import { oxumLearningService, OxumLearningService } from './modules/OxumLearningService';

/**
 * UberCore Configuration
 */
interface UberCoreConfig {
  enabledModules: {
    logic: boolean;
    emotional: boolean;
    ethics: boolean;
    bridge: boolean;
  };
  performanceMode: 'balanced' | 'efficiency' | 'quality';
  loggingLevel: 'debug' | 'info' | 'warning' | 'error';
  memoryRetention: 'minimal' | 'standard' | 'extended';
}

/**
 * UberCore - Unified AI Architecture for UberEscorts
 * Integrates UBX_Logic, UBX_Emo, UBX_Ethics modules through UBX_Bridge
 */
class UberCore {
  // Core modules
  public readonly logic: OxumLearningService;
  public readonly emotional: UbxEmoService;
  public readonly ethics: UbxEthicsService;
  public readonly bridge: UbxBridgeService;
  
  private config: UberCoreConfig;
  private initialized: boolean = false;
  private startTime: Date | null = null;
  
  constructor() {
    // Initialize core modules
    this.logic = oxumLearningService;
    this.emotional = ubxEmoService;
    this.ethics = ubxEthicsService;
    this.bridge = ubxBridgeService;
    
    // Set default configuration
    this.config = {
      enabledModules: {
        logic: true,
        emotional: true,
        ethics: true,
        bridge: true
      },
      performanceMode: 'balanced',
      loggingLevel: 'info',
      memoryRetention: 'standard'
    };
  }
  
  /**
   * Initialize the UberCore system
   */
  public async initialize(): Promise<boolean> {
    if (this.initialized) {
      console.log('UberCore is already initialized');
      return true;
    }
    
    console.log('Initializing UberCore Architecture...');
    this.startTime = new Date();
    
    try {
      // Initialize the event bridge first
      if (this.config.enabledModules.bridge) {
        await this.bridge.initialize();
      }
      
      // Initialize core modules
      if (this.config.enabledModules.logic) {
        await this.logic.initialize();
      }
      
      if (this.config.enabledModules.emotional) {
        await this.emotional.initialize();
      }
      
      if (this.config.enabledModules.ethics) {
        await this.ethics.initialize();
      }
      
      // Register cross-module event handlers
      this.registerEventHandlers();
      
      // Publish initialization complete event
      this.bridge.publish(
        'system:initialized',
        'ubercore',
        {
          timestamp: new Date(),
          modules: Object.entries(this.config.enabledModules)
            .filter(([, enabled]) => enabled)
            .map(([module]) => module)
        },
        {
          systemVersion: '1.0.0',
          performanceMode: this.config.performanceMode
        },
        'high'
      );
      
      this.initialized = true;
      console.log('UberCore Architecture initialized successfully');
      return true;
    } catch (error) {
      console.error('Error initializing UberCore:', error);
      return false;
    }
  }
  
  /**
   * Register event handlers between modules
   */
  private registerEventHandlers(): void {
    // Logic module events
    this.bridge.subscribe('logic:pattern_detected', (event) => {
      // Process pattern with emotional context
      const emotionalContext = this.emotional.getUserEmotionalProfile(event.payload.userId);
      if (emotionalContext) {
        this.logic.processInput(event.payload.pattern, { 
          ...event.payload.context, 
          emotionalContext 
        });
      }
    });
    
    // Emotional module events
    this.bridge.subscribe('emotional:state_changed', (event) => {
      // Verify ethical compliance of adaptation
      const assessment = this.ethics.evaluateInteraction({
        userId: event.payload.userId,
        interactionType: 'emotional_adaptation',
        patterns: [event.payload.emotionalState.dominantEmotion],
        context: event.payload
      });
      
      if (assessment.isCompliant) {
        // Publish approved emotional adaptation
        this.bridge.publish(
          'system:adaptation_required',
          'emotional',
          {
            userId: event.payload.userId,
            adaptationType: 'interface',
            parameters: event.payload.recommendedAdaptation
          }
        );
      } else {
        console.warn('Emotional adaptation blocked by ethics module:', assessment.violatedGuidelines);
      }
    });
    
    // Ethics module events
    this.bridge.subscribe('ethics:violation_detected', (event) => {
      // High priority event for violations
      this.bridge.publish(
        'system:ethics_violation',
        'ethics',
        {
          violation: event.payload.violatedGuidelines,
          severity: event.payload.severityLevel,
          actions: event.payload.recommendedActions
        },
        {},
        'high'
      );
    });
  }
  
  /**
   * Process user input through the UberCore architecture
   * @param userId User identifier
   * @param input User input
   * @param context Additional context
   * @returns Processing result
   */
  public async processUserInput(
    userId: string,
    input: string,
    context?: Record<string, any>
  ): Promise<Record<string, any>> {
    if (!this.initialized) {
      await this.initialize();
    }
    
    // Create cross-module context
    const processingContext = {
      userId,
      timestamp: new Date(),
      sessionId: context?.sessionId || `session-${Date.now()}`,
      ...context
    };
    
    // 1. Ethical pre-check
    const ethicsCheck = this.ethics.evaluateContent({
      userId,
      content: input,
      contentType: 'text',
      context: processingContext
    });
    
    // Block processing if ethics check fails
    if (!ethicsCheck.isCompliant) {
      return {
        success: false,
        blocked: true,
        reason: 'Ethics violation detected',
        details: ethicsCheck,
        output: null
      };
    }
    
    // 2. Detect emotional signals
    const emotionalResult = this.emotional.processInteraction(
      userId,
      { text: input },
      processingContext
    );
    
    // Update context with emotional state
    processingContext.emotionalState = emotionalResult.emotionalState;
    processingContext.recommendedAdaptation = emotionalResult.recommendedAdaptation;
    
    // 3. Process input through logic module
    const logicResult = this.logic.processInput(input, processingContext);
    
    // 4. Publish event with results
    this.bridge.publish(
      'system:input_processed',
      'ubercore',
      {
        userId,
        input: input.substring(0, 50) + (input.length > 50 ? '...' : ''),
        emotionalState: emotionalResult.emotionalState.dominantEmotion,
        adaptations: emotionalResult.recommendedAdaptation,
        outputConfidence: logicResult.confidenceScore
      }
    );
    
    return {
      success: true,
      output: logicResult.enhancedOutput,
      emotionalState: emotionalResult.emotionalState,
      uiAdaptation: emotionalResult.recommendedAdaptation,
      confidence: logicResult.confidenceScore,
      ethicsScore: ethicsCheck.score,
      context: logicResult.culturalContext
    };
  }
  
  /**
   * Set UberCore configuration
   */
  public configure(config: Partial<UberCoreConfig>): void {
    this.config = {
      ...this.config,
      ...config
    };
    
    console.log('UberCore configuration updated:', this.config);
  }
  
  /**
   * Get system status
   */
  public getStatus(): Record<string, any> {
    const moduleStatuses = {
      logic: this.logic.getConfig().enabled,
      emotional: this.emotional.getStatus().enabled,
      ethics: this.ethics.getMetrics().enabled,
      bridge: this.bridge.getConfig().enabled
    };
    
    return {
      initialized: this.initialized,
      uptime: this.startTime ? Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000) : 0,
      moduleStatuses,
      activeModules: this.bridge.getActiveModules(),
      eventCount: Object.values(this.bridge.getEventStats())
        .reduce((total, stat) => total + stat.count, 0),
      performanceMode: this.config.performanceMode,
      patternsLearned: this.logic.getLearnedPatterns().length,
      emotionalProfilesCount: Object.keys(this.emotional.getAllEmotionalProfiles()).length,
      ethicalGuidelinesCount: Object.keys(this.ethics.getEthicalGuidelines()).length
    };
  }
  
  /**
   * Shutdown the UberCore system
   */
  public async shutdown(): Promise<void> {
    if (!this.initialized) {
      console.log('UberCore is not initialized');
      return;
    }
    
    console.log('Shutting down UberCore...');
    
    // Publish shutdown event
    this.bridge.publish(
      'system:shutdown',
      'ubercore',
      {
        timestamp: new Date(),
        uptime: this.startTime ? Math.floor((new Date().getTime() - this.startTime.getTime()) / 1000) : 0
      },
      {},
      'critical'
    );
    
    // Allow time for critical event processing
    await new Promise(resolve => setTimeout(resolve, 100));
    
    this.initialized = false;
    this.startTime = null;
    console.log('UberCore shutdown complete');
  }
}

// Export singleton instance
export const uberCore = new UberCore();

// Export the class for typing and extending
export { UberCore };
