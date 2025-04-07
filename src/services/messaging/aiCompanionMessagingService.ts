
import { CompanionMessage, AICompanionVoiceConfig } from '@/hooks/ai-companion/types';
import { voiceService } from '@/services/voiceService';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';

/**
 * AICompanionMessagingService
 * Connects AI companions and voice services to the HERMES-OXUM neural hub
 */
export class AICompanionMessagingService {
  private static instance: AICompanionMessagingService;
  private speakingQueue: string[] = [];
  private isProcessingSpeech = false;

  private constructor() {
    // Private constructor for singleton pattern
  }

  public static getInstance(): AICompanionMessagingService {
    if (!AICompanionMessagingService.instance) {
      AICompanionMessagingService.instance = new AICompanionMessagingService();
    }
    return AICompanionMessagingService.instance;
  }

  /**
   * Process a message and optionally speak it
   */
  public async processMessage(
    message: CompanionMessage, 
    autoSpeak: boolean = false,
    voiceConfig?: AICompanionVoiceConfig
  ): Promise<void> {
    try {
      // Connect to neural hub for behavioral insights
      const healthMetrics = neuralHub.getHealthMetrics();
      
      console.log(`Processing message with ID: ${message.id}, system load: ${healthMetrics.load}`);
      
      // Log to neural hub for behavioral analytics
      if (message.role === 'user') {
        this.logUserInteraction(message);
      } else {
        this.logCompanionResponse(message);
      }
      
      // If autoSpeak is enabled, speak the message with proper voice
      if (autoSpeak && message.role === 'assistant' && voiceConfig) {
        await this.speakMessage(message.content, voiceConfig);
      }
    } catch (error) {
      console.error('Error processing companion message:', error);
    }
  }
  
  /**
   * Speak a message with given voice configuration
   */
  public async speakMessage(content: string, voiceConfig: AICompanionVoiceConfig): Promise<boolean> {
    try {
      // Add to queue
      this.speakingQueue.push(content);
      
      // Process queue if not already processing
      if (!this.isProcessingSpeech) {
        await this.processQueue(voiceConfig);
      }
      
      return true;
    } catch (error) {
      console.error('Error speaking message:', error);
      return false;
    }
  }
  
  /**
   * Process the speech queue
   */
  private async processQueue(voiceConfig: AICompanionVoiceConfig): Promise<void> {
    if (this.speakingQueue.length === 0) {
      this.isProcessingSpeech = false;
      return;
    }
    
    this.isProcessingSpeech = true;
    const content = this.speakingQueue.shift();
    
    if (content) {
      try {
        // Use the voiceService to speak the message
        await voiceService.speak(content, voiceConfig);
      } catch (error) {
        console.error('Error in voice service:', error);
      }
    }
    
    // Process next in queue
    await this.processQueue(voiceConfig);
  }
  
  /**
   * Log user message to neural hub for behavioral analysis
   */
  private logUserInteraction(message: CompanionMessage): void {
    // In a real implementation, this would send data to a behavioral analysis system
    console.log(`[HERMES-OXUM] User interaction: ${message.content.substring(0, 30)}...`);
  }
  
  /**
   * Log companion response to neural hub for response analysis
   */
  private logCompanionResponse(message: CompanionMessage): void {
    // In a real implementation, this would send data to a behavioral analysis system
    console.log(`[HERMES-OXUM] Companion response: ${message.content.substring(0, 30)}...`);
  }
  
  /**
   * Stop any ongoing speech
   */
  public stopSpeaking(): void {
    this.speakingQueue = [];
    voiceService.stop();
  }
  
  /**
   * Check if speech is currently in progress
   */
  public isSpeaking(): boolean {
    return this.isProcessingSpeech || voiceService.isSpeaking();
  }
}

export const aiCompanionMessagingService = AICompanionMessagingService.getInstance();
export default aiCompanionMessagingService;
