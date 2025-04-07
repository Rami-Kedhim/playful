
import { useState, useCallback } from 'react';
import { PersonalityType, MonetizationHook } from '@/types/ai-personality';
import { CompanionMessage } from './types';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/integrations/supabase/client';

interface UseMonetizationSystemProps {
  companionId: string;
  userId: string;
  personalityType: PersonalityType;
  lucoinBalance?: number;
  name?: string;
  onAddMessage: (message: CompanionMessage) => void;
}

export const useMonetizationSystem = ({
  companionId,
  userId,
  personalityType,
  lucoinBalance = 0,
  name = 'Companion',
  onAddMessage
}: UseMonetizationSystemProps) => {
  const [monetizationTriggers, setMonetizationTriggers] = useState<MonetizationHook[]>([]);
  const [currentMonetizationHook, setCurrentMonetizationHook] = useState<MonetizationHook | null>(null);
  const [lastMonetizationAttempt, setLastMonetizationAttempt] = useState<Date | null>(null);

  // Initialize monetization hooks based on personality type
  const initializeMonetizationHooks = useCallback(() => {
    const hooks: MonetizationHook[] = [
      {
        type: 'image',
        triggerConditions: {
          messageCount: 5,
          intimacyLevel: 30
        },
        lucoinCost: 10,
        teaser: "I'd love to show you a special photo of me...",
        previewUrl: '/blurred-preview.jpg'
      },
      {
        type: 'voice',
        triggerConditions: {
          messageCount: 8,
          intimacyLevel: 40
        },
        lucoinCost: 15,
        teaser: "Would you like to hear my voice? I've recorded something just for you."
      },
      {
        type: 'explicit_content',
        triggerConditions: {
          messageCount: 15,
          intimacyLevel: 70,
          keywords: ['bedroom', 'intimate', 'private']
        },
        lucoinCost: 25,
        teaser: "I can share some more intimate thoughts with you..."
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
        teaser: "I have a fun little game we could play in private..."
      });
    } else if (personalityType === 'dominant') {
      hooks.push({
        type: 'special_interaction',
        triggerConditions: {
          messageCount: 12,
          intimacyLevel: 65
        },
        lucoinCost: 30,
        teaser: "I could give you some special instructions to follow..."
      });
    }
    
    setMonetizationTriggers(hooks);
  }, [personalityType]);

  // Check if monetization should be triggered
  const checkMonetizationTriggers = useCallback((
    content: string, 
    messageCount: number, 
    intimacyLevel: number,
    recentMessages: CompanionMessage[]
  ): boolean => {
    if (monetizationTriggers.length === 0) return false;
    
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
    const eligibleTriggers = monetizationTriggers.filter(trigger => {
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
  }, [monetizationTriggers, lastMonetizationAttempt]);

  // Process premium content purchase
  const processPremiumContent = useCallback(async () => {
    if (!currentMonetizationHook) return false;
    
    const cost = currentMonetizationHook.lucoinCost;
    
    if (lucoinBalance < cost) {
      onAddMessage({
        id: uuidv4(),
        role: 'system',
        content: `Insufficient balance: You need ${cost} Lucoins to unlock this content. Current balance: ${lucoinBalance}`,
        timestamp: new Date(),
        // Replace isError with a valid property
        emotion: 'sadness'
      });
      return false;
    }
    
    try {
      const { error } = await supabase.functions.invoke(
        'process-companion-payment',
        {
          body: {
            user_id: userId,
            companion_id: companionId,
            content_type: currentMonetizationHook.type,
            amount: cost
          }
        }
      );
      
      if (error) {
        throw error;
      }
      
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
          premiumContent = currentMonetizationHook.fullContent || 
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
      
      onAddMessage(premiumMessage);
      setCurrentMonetizationHook(null);
      return true;
    } catch (error) {
      console.error('Payment processing error:', error);
      
      onAddMessage({
        id: uuidv4(),
        role: 'system',
        content: 'There was an error processing your payment.',
        timestamp: new Date(),
        // Replace isError with a valid property
        emotion: 'sadness'
      });
      
      return false;
    }
  }, [currentMonetizationHook, lucoinBalance, userId, companionId, name, onAddMessage]);

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

  return {
    monetizationTriggers,
    currentMonetizationHook,
    initializeMonetizationHooks,
    checkMonetizationTriggers,
    processPremiumContent,
    createTeaserMessage,
  };
};

export default useMonetizationSystem;
