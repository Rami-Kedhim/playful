import { useState, useEffect, useCallback } from 'react';
import { aiEmotionalMemoryService } from '@/services/ai/aiEmotionalMemoryService';
import { PersonalityType, EmotionalState, EmotionalMemory, MonetizationHook } from '@/types/ai-personality';
import { v4 as uuidv4 } from 'uuid';
import { CompanionMessage } from './types';

interface UseAICompanionWithMemoryProps {
  companionId: string;
  userId: string;
  personalityType: PersonalityType;
  name?: string;
  avatarUrl?: string;
  lucoinBalance?: number;
}

export const useAICompanionWithMemory = ({
  companionId,
  userId,
  personalityType,
  name = 'AI Companion',
  avatarUrl,
  lucoinBalance = 0
}: UseAICompanionWithMemoryProps) => {
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>(null);
  const [monetizationHooks, setMonetizationHooks] = useState<MonetizationHook[]>([]);
  const [currentMonetizationHook, setCurrentMonetizationHook] = useState<MonetizationHook | null>(null);
  const [lastMonetizationAttempt, setLastMonetizationAttempt] = useState<Date | null>(null);

// Fix the monetization hooks initialization in the hook
const initializeMonetizationSystem = useCallback(() => {
  const createBaseHook = (): Partial<MonetizationHook> => ({
    // Core required methods
    triggerPurchaseFlow: async (productId: string, amount: number) => {
      console.log(`Triggering purchase flow for ${productId} at ${amount} coins`);
      return lucoinBalance >= amount;
    },
    checkUserCredits: async () => lucoinBalance,
    deductCredits: async (amount: number, reason: string) => {
      console.log(`Deducting ${amount} credits for ${reason}`);
      return lucoinBalance >= amount;
    },
    getSubscriptionStatus: async () => ({ isSubscribed: false, plan: null }),
    
    // Helper functions
    shouldRestrict: (contentType: string) => contentType.includes('explicit'),
    processPremiumContent: async () => true,
    getContentPrice: (contentType: string) => contentType === 'explicit_content' ? 25 : 15,
    getUserBalance: () => lucoinBalance,
    processPayment: async (amount: number) => lucoinBalance >= amount
  });
  
  const hooks: MonetizationHook[] = [
    {
      ...createBaseHook(),
      type: 'image',
      triggerConditions: {
        messageCount: 5,
        intimacyLevel: 30
      },
      lucoinCost: 10,
      teaser: "I'd love to show you a special photo of me...",
      previewUrl: '/blurred-preview.jpg',
    },
    {
      ...createBaseHook(),
      type: 'voice',
      triggerConditions: {
        messageCount: 8,
        intimacyLevel: 40
      },
      lucoinCost: 15,
      teaser: "Would you like to hear my voice? I've recorded something just for you.",
    },
    {
      ...createBaseHook(),
      type: 'explicit_content',
      triggerConditions: {
        messageCount: 15,
        intimacyLevel: 70,
        keywords: ['bedroom', 'intimate', 'private']
      },
      lucoinCost: 25,
      teaser: "I can share some more intimate thoughts with you...",
    }
  ];
  
  if (personalityType === 'flirty') {
    hooks.push({
      ...createBaseHook(),
      type: 'special_interaction',
      triggerConditions: {
        messageCount: 10,
        intimacyLevel: 60
      },
      lucoinCost: 20,
      teaser: "I have a fun little game we could play in private...",
    });
  } else if (personalityType === 'dominant') {
    hooks.push({
      ...createBaseHook(),
      type: 'special_interaction',
      triggerConditions: {
        messageCount: 12,
        intimacyLevel: 65
      },
      lucoinCost: 30,
      teaser: "I could give you some special instructions to follow...",
    });
  }
  
  setMonetizationHooks(hooks);
}, [personalityType, lucoinBalance]);

  // Initialize emotional memory and monetization system
  useEffect(() => {
    const initialize = async () => {
      try {
        const initialMemory = await aiEmotionalMemoryService.initializeEmotionalMemory(
          companionId,
          userId,
          personalityType
        );
        setEmotionalState(initialMemory.emotions.currentState);
        initializeMonetizationSystem();
        
        // Add initial message
        setMessages([{
          id: uuidv4(),
          role: 'assistant',
          content: `Hi there! I'm ${name}. How can I help you today?`,
          timestamp: new Date(),
          emotion: 'excited'
        }]);
      } catch (err: any) {
        setError(err.message || 'Failed to initialize AI companion');
      }
    };
    
    initialize();
  }, [companionId, userId, personalityType, name, initializeMonetizationSystem]);

  // Process user message
  const sendMessage = useCallback(async (content: string) => {
    setIsTyping(true);
    
    // Add user message to the chat
    const userMessage: CompanionMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
      emotion: 'neutral'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      // Update emotional state
      const updatedEmotionalState = await aiEmotionalMemoryService.processUserMessage(
        companionId,
        userId,
        personalityType,
        content
      );
      
      setEmotionalState(updatedEmotionalState);
      
      // Check monetization triggers
      let shouldTriggerMonetization = false;
      
      if (monetizationHooks.length > 0) {
        const messageCount = messages.length + 1;
        const intimacyLevel = updatedEmotionalState.interest + updatedEmotionalState.trust;
        
        shouldTriggerMonetization = checkMonetizationTriggers(
          content,
          messageCount,
          intimacyLevel,
          messages
        );
      }
      
      if (shouldTriggerMonetization && currentMonetizationHook) {
        // Create teaser message
        const teaserMessage = createTeaserMessage();
        
        if (teaserMessage) {
          setMessages(prevMessages => [...prevMessages, teaserMessage]);
        }
      } else {
        // Generate AI response
        const aiResponse: CompanionMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: `I'm thinking about your message: ${content}...`,
          timestamp: new Date(),
          emotion: updatedEmotionalState.dominantEmotion || 'neutral'
        };
        
        // Simulate typing
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        aiResponse.content = `Responding to: ${content}...`;
        
        setMessages(prevMessages => [...prevMessages, aiResponse]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setIsTyping(false);
    }
  }, [companionId, userId, personalityType, name, messages, monetizationHooks, currentMonetizationHook, createTeaserMessage, checkMonetizationTriggers]);

  // Check if monetization should be triggered
  const checkMonetizationTriggers = useCallback((
    content: string, 
    messageCount: number, 
    intimacyLevel: number,
    recentMessages: CompanionMessage[]
  ): boolean => {
    if (monetizationHooks.length === 0) return false;
    
    // Don't trigger too frequently
    if (lastMonetizationAttempt) {
      const timeSinceLastAttempt = new Date().getTime() - lastMonetizationAttempt.getTime();
      if (timeSinceLastAttempt < 300000) { // 5 minutes
        return false;
      }
    }
    
    // Check if monetization was recently triggered
    const recentTrigger = recentMessages
      .slice(-10)
      .some(msg => msg.role === 'assistant' && msg.requiresPayment);
    
    if (recentTrigger) return false;
    
    // Filter eligible triggers
    const eligibleTriggers = monetizationHooks.filter(trigger => {
      if (trigger.triggerConditions.messageCount && messageCount < trigger.triggerConditions.messageCount) {
        return false;
      }
      
      if (trigger.triggerConditions.keywords && 
          !trigger.triggerConditions.keywords.some(keyword => 
            content.toLowerCase().includes(keyword.toLowerCase()))) {
        return false;
      }
      
      if (trigger.triggerConditions.intimacyLevel && 
          intimacyLevel < trigger.triggerConditions.intimacyLevel) {
        return false;
      }
      
      return true;
    });
    
    if (eligibleTriggers.length === 0) return false;
    
    // Select a trigger and set current hook
    const selectedTrigger = eligibleTriggers[Math.floor(Math.random() * eligibleTriggers.length)];
    setCurrentMonetizationHook(selectedTrigger);
    setLastMonetizationAttempt(new Date());
    
    // 30% chance of triggering
    return Math.random() < 0.3;
  }, [monetizationHooks, lastMonetizationAttempt]);

  // Process premium content purchase
  const processPremiumContent = useCallback(async () => {
    if (!currentMonetizationHook) return false;
    
    const cost = currentMonetizationHook.lucoinCost;
    
    // Check if user has enough credits
    const hasSufficientCredits = lucoinBalance >= cost;
    
    if (!hasSufficientCredits) {
      const systemMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'system',
        content: `Insufficient balance: You need ${cost} Lucoins to unlock this content. Current balance: ${lucoinBalance}`,
        timestamp: new Date(),
        emotion: 'sadness'
      };
      
      setMessages(prevMessages => [...prevMessages, systemMessage]);
      return false;
    }
    
    // Deduct credits and unlock content
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Deduct credits
      lucoinBalance -= cost;
      
      // Generate premium content
      let premiumContent = '';
      let visualElements = undefined;
      
      switch (currentMonetizationHook.type) {
        case 'image':
          premiumContent = "Here's that special photo I promised you...";
          visualElements = [{ 
            data: { 
              type: 'image',
              url: '/premium-photo.jpg',
              alt: `${name}'s special photo`,
              caption: 'Just for you...'
            } 
          }];
          break;
        
        case 'voice':
          premiumContent = "I've recorded this voice message just for you... [Voice message]";
          break;
        
        case 'explicit_content':
        case 'special_interaction':
          premiumContent = currentMonetizationHook.teaser || 
            "Let me share something special with you... [Premium content would appear here]";
          break;
          
        default:
          premiumContent = "Thank you for unlocking this premium content!";
      }
      
      const premiumMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: premiumContent,
        timestamp: new Date(),
        emotion: 'excited',
        visualElements,
        isPremium: true
      };
      
      setMessages(prevMessages => [...prevMessages, premiumMessage]);
      setCurrentMonetizationHook(null);
      return true;
    } catch (err: any) {
      setError(err.message || 'Payment processing failed');
      
      const systemMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'system',
        content: 'There was an error processing your payment.',
        timestamp: new Date(),
        emotion: 'sadness'
      };
      
      setMessages(prevMessages => [...prevMessages, systemMessage]);
      return false;
    }
  }, [currentMonetizationHook, lucoinBalance, name]);

  // Create monetization teaser message
  const createTeaserMessage = useCallback((): CompanionMessage | null => {
    if (!currentMonetizationHook) return null;
    
    return {
      id: uuidv4(),
      role: 'assistant',
      content: currentMonetizationHook.teaser || "I have something special to share with you...",
      timestamp: new Date(),
      emotion: 'flirtatious',
      requiresPayment: true,
      paymentAmount: currentMonetizationHook.lucoinCost,
      suggestedActions: [
        "Unlock premium content",
        "Maybe later"
      ]
    };
  }, [currentMonetizationHook]);

  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    if (action === "Unlock premium content") {
      processPremiumContent();
    } else {
      // Handle other actions
      console.log(`Action clicked: ${action}`);
    }
  }, [processPremiumContent]);

  return {
    messages,
    isTyping,
    error,
    emotionalState,
    sendMessage,
    handleSuggestedActionClick,
    processPremiumContent
  };
};

export default useAICompanionWithMemory;
