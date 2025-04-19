import { useState, useEffect, useCallback } from 'react';
import { aiEmotionalMemoryService } from '@/services/ai/aiEmotionalMemoryService';
import { PersonalityType, EmotionalState, CompanionMessage } from '@/types/ai-personality';
import { v4 as uuidv4 } from 'uuid';

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
  
  const checkMonetizationTriggers = useCallback((
    content: string, 
    messageCount: number, 
    intimacyLevel: number,
    recentMessages: CompanionMessage[]
  ): boolean => {
    if (monetizationHooks.length === 0) return false;
    
    if (lastMonetizationAttempt) {
      const timeSinceLastAttempt = new Date().getTime() - lastMonetizationAttempt.getTime();
      if (timeSinceLastAttempt < 300000) { // 5 minutes
        return false;
      }
    }
    
    const recentTrigger = recentMessages
      .slice(-10)
      .some(msg => msg.role === 'assistant' && msg.requiresPayment);
    
    if (recentTrigger) return false;
    
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
    
    const selectedTrigger = eligibleTriggers[Math.floor(Math.random() * eligibleTriggers.length)];
    setCurrentMonetizationHook(selectedTrigger);
    setLastMonetizationAttempt(new Date());
    
    return Math.random() < 0.3;
  }, [monetizationHooks, lastMonetizationAttempt]);

  const initializeMonetizationSystem = useCallback(() => {
    const triggerPurchaseFlow = async (productId: string, amount: number): Promise<boolean> => {
      console.log(`Triggering purchase flow for ${productId} at ${amount} coins`);
      return lucoinBalance >= amount;
    };
    
    const checkUserCredits = async (): Promise<number> => {
      return lucoinBalance;
    };
    
    const deductCredits = async (amount: number, reason: string): Promise<boolean> => {
      console.log(`Deducting ${amount} credits for ${reason}`);
      return lucoinBalance >= amount;
    };
    
    const getSubscriptionStatus = async (): Promise<{ isSubscribed: boolean; plan: string | null }> => {
      return { isSubscribed: false, plan: null };
    };
    
    const processPayment = async (amount: number): Promise<boolean> => {
      return lucoinBalance >= amount;
    };
    
    const processPremiumContent = async (): Promise<boolean> => {
      return true;
    };
    
    const shouldRestrict = (contentType: string): boolean => {
      return contentType.includes('explicit');
    };
    
    const getContentPrice = (contentType: string): number => {
      return contentType === 'explicit_content' ? 25 : 15;
    };
    
    const getUserBalance = (): number => {
      return lucoinBalance;
    };
    
    const hooks: MonetizationHook[] = [
      {
        type: 'image',
        triggerConditions: {
          messageCount: 5,
          intimacyLevel: 30
        },
        lucoinCost: 10,
        teaser: "I'd love to show you a special photo of me...",
        previewUrl: '/blurred-preview.jpg',
        triggerPurchaseFlow,
        checkUserCredits,
        deductCredits,
        getSubscriptionStatus,
        shouldRestrict,
        processPremiumContent,
        getContentPrice,
        getUserBalance,
        processPayment
      },
      {
        type: 'voice',
        triggerConditions: {
          messageCount: 8,
          intimacyLevel: 40
        },
        lucoinCost: 15,
        teaser: "Would you like to hear my voice? I've recorded something just for you.",
        triggerPurchaseFlow,
        checkUserCredits,
        deductCredits,
        getSubscriptionStatus,
        shouldRestrict,
        processPremiumContent,
        getContentPrice,
        getUserBalance,
        processPayment
      },
      {
        type: 'explicit_content',
        triggerConditions: {
          messageCount: 15,
          intimacyLevel: 70,
          keywords: ['bedroom', 'intimate', 'private']
        },
        lucoinCost: 25,
        teaser: "I can share some more intimate thoughts with you...",
        triggerPurchaseFlow,
        checkUserCredits,
        deductCredits,
        getSubscriptionStatus,
        shouldRestrict,
        processPremiumContent,
        getContentPrice,
        getUserBalance,
        processPayment
      }
    ];
    
    if (personalityType === 'flirty') {
      hooks.push({
        type: 'special_interaction',
        triggerConditions: {
          messageCount: 10,
          intimacyLevel: 60
        },
        lucoinCost: 20,
        teaser: "I have a fun little game we could play in private...",
        triggerPurchaseFlow,
        checkUserCredits,
        deductCredits,
        getSubscriptionStatus,
        shouldRestrict,
        processPremiumContent,
        getContentPrice,
        getUserBalance,
        processPayment
      });
    } else if (personalityType === 'dominant') {
      hooks.push({
        type: 'special_interaction',
        triggerConditions: {
          messageCount: 12,
          intimacyLevel: 65
        },
        lucoinCost: 30,
        teaser: "I could give you some special instructions to follow...",
        triggerPurchaseFlow,
        checkUserCredits,
        deductCredits,
        getSubscriptionStatus,
        shouldRestrict,
        processPremiumContent,
        getContentPrice,
        getUserBalance,
        processPayment
      });
    }
    
    setMonetizationHooks(hooks);
  }, [personalityType, lucoinBalance]);

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

  const sendMessage = useCallback(async (content: string) => {
    setIsTyping(true);
    
    const userMessage: CompanionMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date(),
      emotion: 'neutral'
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    try {
      const updatedEmotionalState = await aiEmotionalMemoryService.processUserMessage(
        companionId,
        userId,
        personalityType,
        content
      );
      
      setEmotionalState(updatedEmotionalState);
      
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
        const teaserMessage = createTeaserMessage();
        
        if (teaserMessage) {
          setMessages(prevMessages => [...prevMessages, teaserMessage]);
        }
      } else {
        const aiResponse: CompanionMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: `I'm thinking about your message: ${content}...`,
          timestamp: new Date(),
          emotion: updatedEmotionalState.dominantEmotion || 'neutral'
        };
        
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

  const processPremiumContent = useCallback(async () => {
    if (!currentMonetizationHook) return false;
    
    const cost = currentMonetizationHook.lucoinCost;
    
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
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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

  const handleSuggestedActionClick = useCallback((action: string) => {
    if (action === "Unlock premium content") {
      processPremiumContent();
    } else {
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
