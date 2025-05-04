
import { lucie, ModerateContentParams, ModerateContentResult } from './Lucie';

// Define types for the adapter
interface ContentRequest {
  prompt: string;
  context?: {
    userId?: string;
    history?: string[];
    preferences?: Record<string, any>;
    [key: string]: any;
  };
}

interface ModerationResult {
  isApproved: boolean;
  issues?: string[];
  blockedCategories?: string[];
}

export class LucieOrchestratorAdapter {
  async generateAIResponse(request: ContentRequest): Promise<string> {
    try {
      // Use the renamed method
      return await lucie.generateContent(request.prompt);
    } catch (error) {
      console.error('Error in Lucie orchestrator generating content:', error);
      return 'I encountered an error processing your request.';
    }
  }

  async analyzeSentiment(text: string): Promise<{ 
    score: number; 
    sentiment: 'positive' | 'negative' | 'neutral' 
  }> {
    try {
      return await lucie.analyzeSentiment(text);
    } catch (error) {
      console.error('Error in Lucie sentiment analysis:', error);
      return {
        score: 0.5,
        sentiment: 'neutral'
      };
    }
  }

  async moderateContent(content: string): Promise<ModerationResult> {
    try {
      const params: ModerateContentParams = {
        content: content,
        contentType: 'text'
      };
      
      const result: ModerateContentResult = await lucie.moderateContent(params);
      
      // Use the correct property names
      return {
        isApproved: result.safe,
        issues: result.issues || [],
        blockedCategories: result.blockedCategories || []
      };
    } catch (error) {
      console.error('Error in Lucie content moderation:', error);
      return {
        isApproved: false,
        issues: ['Moderation service unavailable'],
        blockedCategories: ['error']
      };
    }
  }

  async getSystemHealth(): Promise<{
    status: 'operational' | 'degraded' | 'offline';
    components: Record<string, 'online' | 'offline' | 'degraded'>;
  }> {
    const status = lucie.getSystemStatus();
    
    // Calculate overall status
    const componentArray = Object.values(status.modules);
    const isFullyOperational = componentArray.every(s => s === 'online');
    const isCompletelyOffline = componentArray.every(s => s === 'offline');
    
    return {
      status: isFullyOperational ? 'operational' : 
             isCompletelyOffline ? 'offline' : 'degraded',
      components: status.modules
    };
  }
}

export const lucieAdapter = new LucieOrchestratorAdapter();
