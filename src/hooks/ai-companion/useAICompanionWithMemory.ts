
import { useState, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { 
  AIPersonalityConfig,
  EmotionalMemory,
  EmotionalState,
  PersonalityType,
  MonetizationHook 
} from '@/types/ai-personality';
import { CompanionMessage } from './types';
import { aiPersonalityService } from '@/services/ai/aiPersonalityService';
import { aiEmotionalMemoryService } from '@/services/ai/aiEmotionalMemoryService';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface UseAICompanionWithMemoryProps {
  companionId: string;
  userId?: string;
  personalityType: PersonalityType;
  name: string;
  avatarUrl?: string;
  initialMessages?: CompanionMessage[];
  lucoinBalance?: number;
}

export function useAICompanionWithMemory({
  companionId,
  userId = 'anonymous',
  personalityType,
  name,
  avatarUrl,
  initialMessages = [],
  lucoinBalance = 0
}: UseAICompanionWithMemoryProps) {
  const [messages, setMessages] = useState<CompanionMessage[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emotionalState, setEmotionalState] = useState<EmotionalState | null>(null);
  const [emotionalMemory, setEmotionalMemory] = useState<EmotionalMemory | null>(null);
  const [monetizationTriggers, setMonetizationTriggers] = useState<MonetizationHook[]>([]);
  const [personalityConfig, setPersonalityConfig] = useState<AIPersonalityConfig | null>(null);
  const [currentMonetizationHook, setCurrentMonetizationHook] = useState<MonetizationHook | null>(null);
  
  const { toast } = useToast();
  
  // Initialize personality and emotional memory
  useEffect(() => {
    const initializeCompanion = async () => {
      try {
        // Get personality template
        const personality = aiPersonalityService.getPersonalityTemplate(personalityType);
        setPersonalityConfig(personality);
        
        // Initialize emotional memory
        if (userId) {
          const memory = await aiEmotionalMemoryService.initializeEmotionalMemory(
            companionId,
            userId,
            personalityType
          );
          
          setEmotionalMemory(memory);
          setEmotionalState(memory.state);
        }
        
        // Add welcome message if no messages exist
        if (messages.length === 0) {
          const welcomeMessage: CompanionMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: `Hi there! I'm ${name}. It's lovely to meet you! How are you doing today?`,
            timestamp: new Date(),
            emotion: personality?.baseTraits[0]?.name || 'friendly',
            suggestedActions: [
              "Tell me about yourself",
              "What are you looking for today?",
              "How's your day going?"
            ]
          };
          
          setMessages([welcomeMessage]);
        }
        
        // Initialize monetization hooks based on personality
        initializeMonetizationHooks(personalityType);
        
      } catch (error) {
        console.error('Error initializing companion:', error);
        setError('Failed to initialize companion');
      }
    };
    
    initializeCompanion();
  }, [companionId, userId, personalityType, name]);
  
  // Initialize monetization hooks
  const initializeMonetizationHooks = (personalityType: PersonalityType) => {
    const hooks: MonetizationHook[] = [
      // Basic hooks for all personalities
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
    
    // Personality-specific hooks
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
  };
  
  // Send message to AI companion
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: CompanionMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Process emotional state update
    try {
      setIsTyping(true);
      
      if (userId && personalityConfig) {
        // Update emotional state based on message
        const updatedState = await aiEmotionalMemoryService.processUserMessage(
          companionId,
          userId,
          personalityType,
          content
        );
        
        setEmotionalState(updatedState);
        
        // Check for monetization triggers
        const shouldTriggerMonetization = checkMonetizationTriggers(content, messages.length);
        
        if (shouldTriggerMonetization) {
          // First send a teaser message
          await simulateTypingDelay();
          
          const teaserMessage: CompanionMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: currentMonetizationHook?.teaser || "I have something special to share with you...",
            timestamp: new Date(),
            emotion: 'flirtatious',
            requiresPayment: true,
            paymentAmount: currentMonetizationHook?.lucoinCost || 10,
            suggestedActions: [
              "Unlock premium content",
              "Maybe later"
            ]
          };
          
          setMessages(prev => [...prev, teaserMessage]);
          return;
        }
        
        // Generate AI response
        await simulateTypingDelay();
        
        // Here we would call the AI service, but for now we'll use a simulated response
        const aiResponse = await generateAIResponse(content, emotionalState, personalityConfig);
        
        const aiMessage: CompanionMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: aiResponse.content,
          timestamp: new Date(),
          emotion: updatedState.dominantEmotion || 'neutral',
          suggestedActions: aiResponse.suggestedActions
        };
        
        setMessages(prev => [...prev, aiMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message');
      
      toast({
        title: 'Error',
        description: 'Failed to get a response',
        variant: 'destructive'
      });
    } finally {
      setIsTyping(false);
    }
  }, [companionId, userId, personalityType, emotionalState, personalityConfig, messages, currentMonetizationHook]);
  
  // Check for monetization triggers
  const checkMonetizationTriggers = (content: string, messageCount: number): boolean => {
    if (monetizationTriggers.length === 0) return false;
    
    // Don't trigger too frequently - check if we've already triggered in the last 10 messages
    const recentTrigger = messages
      .slice(-10)
      .some(msg => msg.role === 'assistant' && msg.requiresPayment);
    
    if (recentTrigger) return false;
    
    // Find eligible triggers
    const eligibleTriggers = monetizationTriggers.filter(trigger => {
      // Check message count condition
      if (trigger.triggerConditions.messageCount && messageCount < trigger.triggerConditions.messageCount) {
        return false;
      }
      
      // Check keywords condition
      if (trigger.triggerConditions.keywords && 
          !trigger.triggerConditions.keywords.some(keyword => 
            content.toLowerCase().includes(keyword.toLowerCase()))) {
        return false;
      }
      
      // Check intimacy level
      if (trigger.triggerConditions.intimacyLevel && 
          emotionalState && 
          ((emotionalState.joy + emotionalState.trust) / 2) < trigger.triggerConditions.intimacyLevel) {
        return false;
      }
      
      return true;
    });
    
    if (eligibleTriggers.length === 0) return false;
    
    // Select a random trigger from eligible ones
    const selectedTrigger = eligibleTriggers[Math.floor(Math.random() * eligibleTriggers.length)];
    setCurrentMonetizationHook(selectedTrigger);
    
    // Random chance (30%) of actually triggering it
    return Math.random() < 0.3;
  };
  
  // Process payment for premium content
  const processPremiumContent = useCallback(async () => {
    if (!currentMonetizationHook) return;
    
    const cost = currentMonetizationHook.lucoinCost;
    
    // Check if user has enough balance
    if (lucoinBalance < cost) {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${cost} Lucoins to unlock this content. Current balance: ${lucoinBalance}`,
        variant: 'destructive'
      });
      return;
    }
    
    try {
      // Process payment
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
      
      // Payment successful
      toast({
        title: 'Payment Successful',
        description: `${cost} Lucoins deducted from your account.`,
        variant: 'default'
      });
      
      // Provide premium content
      let premiumContent = '';
      let visualElements = undefined;
      
      switch (currentMonetizationHook.type) {
        case 'image':
          premiumContent = "Here's that special photo I promised you...";
          visualElements = [{ 
            data: { 
              type: 'image',
              url: '/premium-photo.jpg', // This would be a real URL in production
              alt: `${name}'s special photo`,
              caption: 'Just for you...'
            } 
          }];
          break;
        
        case 'voice':
          premiumContent = "I've recorded this voice message just for you... [Voice message]";
          // In a real implementation, this would include audio elements
          break;
        
        case 'explicit_content':
        case 'special_interaction':
          premiumContent = currentMonetizationHook.fullContent || 
            "Let me share something special with you... [Premium content would appear here]";
          break;
          
        default:
          premiumContent = "Thank you for unlocking this premium content!";
      }
      
      // Add premium message
      const premiumMessage: CompanionMessage = {
        id: uuidv4(),
        role: 'assistant',
        content: premiumContent,
        timestamp: new Date(),
        emotion: 'excited',
        visualElements,
        isPremium: true
      };
      
      setMessages(prev => [...prev, premiumMessage]);
      
      // Reset current monetization hook
      setCurrentMonetizationHook(null);
      
    } catch (error) {
      console.error('Payment processing error:', error);
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment.',
        variant: 'destructive'
      });
    }
  }, [currentMonetizationHook, lucoinBalance, userId, companionId, name]);
  
  // Handle suggested action click
  const handleSuggestedActionClick = useCallback((action: string) => {
    if (action === 'Unlock premium content') {
      processPremiumContent();
    } else {
      sendMessage(action);
    }
  }, [sendMessage, processPremiumContent]);
  
  // Simulate typing delay
  const simulateTypingDelay = async () => {
    // Random delay between 1-3 seconds
    const delay = 1000 + Math.random() * 2000;
    return new Promise(resolve => setTimeout(resolve, delay));
  };
  
  // Generate AI response (simulated for now)
  const generateAIResponse = async (
    userMessage: string, 
    emotionalState: EmotionalState | null,
    personalityConfig: AIPersonalityConfig
  ) => {
    // In a production system, this would call an API with the full context
    
    // For now, return simple responses based on personality and emotional state
    let content = '';
    let suggestedActions: string[] = [];
    
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      content = `Hi there! It's wonderful to hear from you. I hope you're having a lovely day.`;
      suggestedActions = ['How are you?', 'Tell me about yourself', 'What are you looking for?'];
    } else if (lowerMessage.includes('how are you')) {
      if (emotionalState && emotionalState.joy > 70) {
        content = `I'm feeling absolutely wonderful today! There's something about talking with you that really brightens my mood.`;
      } else {
        content = `I'm doing well, thank you for asking. It's nice to connect with you.`;
      }
      suggestedActions = ['What do you do for fun?', 'Tell me about your day', 'What brings you here?'];
    } else if (lowerMessage.includes('name')) {
      content = `My name is ${name}! I'm delighted to be chatting with you.`;
      suggestedActions = ['What do you like to do?', 'Tell me more about yourself', 'What are your interests?'];
    } else {
      // Default response based on personality
      switch (personalityConfig.type) {
        case 'flirty':
          content = `You know, I find our conversation quite stimulating. There's something about the way you express yourself that's very attractive. I'd love to hear more about what interests you.`;
          suggestedActions = ['What do you find attractive?', 'Tell me a secret', 'What are you looking for?'];
          break;
        case 'dominant':
          content = `I appreciate you sharing that with me. I'd like to direct our conversation a bit. Tell me about what you're seeking from our interaction. I prefer clear communication.`;
          suggestedActions = ['I want your guidance', 'I enjoy following directions', 'Tell me your expectations'];
          break;
        case 'submissive':
          content = `Thank you for sharing that! I really enjoy listening to you and learning about what you like. Please, tell me more about what would make you happy.`;
          suggestedActions = ['What do you enjoy?', 'How can I please you?', 'Tell me what you prefer'];
          break;
        default:
          content = `That's really interesting! I enjoy getting to know you better through our conversation. Would you like to share more?`;
          suggestedActions = ['Tell me about your hobbies', 'What do you do for work?', 'Any exciting plans coming up?'];
      }
    }
    
    return { content, suggestedActions };
  };
  
  return {
    messages,
    isTyping,
    error,
    emotionalState,
    sendMessage,
    handleSuggestedActionClick,
    processPremiumContent
  };
}

export default useAICompanionWithMemory;
