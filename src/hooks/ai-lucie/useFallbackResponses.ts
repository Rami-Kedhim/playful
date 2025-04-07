
import { useCallback } from 'react';
import { LucieMessage } from './types';

export const useFallbackResponses = () => {
  // Get a fallback response when the API is unavailable
  const getFallbackResponse = useCallback((userMessage: string): LucieMessage => {
    // Smart fallback responses based on keywords in the user message
    const lowercaseMsg = userMessage.toLowerCase();
    
    // Predefined fallback responses for different topics
    const fallbackResponses = {
      profile: {
        content: "While I can't access my full capabilities right now, I can help you browse profiles. Would you like to see popular profiles or search by specific criteria?",
        suggestedActions: ["Popular profiles", "Search by location", "Browse newest profiles"],
        emotion: "helpful"
      },
      content: {
        content: "I'm having trouble accessing my AI systems, but I can still help you find content. Would you like to see trending content or browse by category?",
        suggestedActions: ["Trending content", "Premium content", "Creator spotlight"],
        emotion: "friendly"
      },
      payment: {
        content: "Though I'm experiencing some technical issues, I can direct you to payment and wallet information. What would you like to know about?",
        suggestedActions: ["Check wallet balance", "Add funds", "Subscription info"],
        emotion: "professional"
      },
      help: {
        content: "I'm currently operating with limited capabilities, but I can still guide you to help resources. What kind of assistance do you need?",
        suggestedActions: ["Contact support", "FAQs", "Account issues"],
        emotion: "supportive"
      },
      default: {
        content: "I apologize, but I'm currently operating with limited capabilities due to high demand. Can I help you with something from these options instead?",
        suggestedActions: ["Browse profiles", "Check account", "View content"],
        emotion: "apologetic"
      }
    };
    
    // Determine which fallback to use based on message content
    let responseType = 'default';
    
    if (lowercaseMsg.match(/profile|escort|model|person|girl|woman|man|guy/i)) {
      responseType = 'profile';
    } else if (lowercaseMsg.match(/content|video|photo|picture|image|watch|view/i)) {
      responseType = 'content';
    } else if (lowercaseMsg.match(/pay|wallet|money|coin|lucoin|credit|fund|subscription/i)) {
      responseType = 'payment';
    } else if (lowercaseMsg.match(/help|support|issue|problem|question|how|why/i)) {
      responseType = 'help';
    }
    
    const response = fallbackResponses[responseType];
    
    return {
      id: 'fallback-' + Date.now(),
      role: 'assistant',
      content: response.content,
      timestamp: new Date(),
      suggestedActions: response.suggestedActions,
      emotion: response.emotion
    };
  }, []);

  return {
    getFallbackResponse
  };
};
