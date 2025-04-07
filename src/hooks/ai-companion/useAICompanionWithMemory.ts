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
import { redisEmotionalMemoryService } from '@/services/ai/redisEmotionalMemoryService';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { sentimentAnalysisService } from '@/services/ai/sentimentAnalysisService';
import { aiEmotionalMemoryService } from '@/services/ai/aiEmotionalMemoryService';
import { useAICompanionMessages } from './useAICompanionMessages';
import { useAIPersonality } from './useAIPersonality';
import { useMonetizationSystem } from './useMonetizationSystem';

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
  
  useEffect(() => {
    const initializeCompanion = async () => {
      try {
        const personality = aiPersonalityService.getPersonalityTemplate(personalityType);
        setPersonalityConfig(personality);
        
        let memory: EmotionalMemory | null = null;
        
        if (userId) {
          memory = await aiEmotionalMemoryService.getEmotionalMemory(
            companionId, 
            userId, 
            personalityType
          );
          
          if (!memory) {
            const initialState = aiPersonalityService.createPersonalizedEmotionalState(personalityType);
            memory = {
              state: initialState,
              emotionalHistory: [],
              keyMemories: [],
              recentInteractions: [],
              userId,
              companionId
            };
            await redisEmotionalMemoryService.setEmotionalMemory(companionId, userId, memory);
          }
          
          setEmotionalMemory(memory);
          setEmotionalState(memory.state);
        }
        
        if (messages.length === 0) {
          const emotion = memory?.state.dominantEmotion || 'friendly';
          const tone = memory ? 
            aiPersonalityService.generateResponseTone(memory.state, personalityType) : 
            'friendly and welcoming';
          
          const welcomeMessage: CompanionMessage = {
            id: uuidv4(),
            role: 'assistant',
            content: `Hi there! I'm ${name}. It's lovely to meet you! How are you doing today?`,
            timestamp: new Date(),
            emotion,
            suggestedActions: [
              "Tell me about yourself",
              "What are you looking for today?",
              "How's your day going?"
            ]
          };
          
          setMessages([welcomeMessage]);
        }
        
        initializeMonetizationHooks(personalityType);
      } catch (error) {
        console.error('Error initializing companion:', error);
        setError('Failed to initialize companion');
      }
    };
    
    initializeCompanion();
  }, [companionId, userId, personalityType, name, messages.length]);
  
  const initializeMonetizationHooks = (personalityType: PersonalityType) => {
    const shouldRestrict = (contentType: string) => contentType.includes('explicit');
    const processPremiumContent = async () => true;
    const getContentPrice = (contentType: string) => contentType === 'explicit_content' ? 25 : 15;
    const getUserBalance = () => lucoinBalance;
    const processPayment = async (amount: number) => lucoinBalance >= amount;
    
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
        shouldRestrict,
        processPremiumContent,
        getContentPrice,
        getUserBalance,
        processPayment
      });
    }
    
    setMonetizationTriggers(hooks);
  };
  
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: CompanionMessage = {
      id: uuidv4(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    try {
      setIsTyping(true);
      
      if (userId && personalityConfig) {
        let updatedState = emotionalState;
        
        if (emotionalState) {
          const sentimentResult = await sentimentAnalysisService.analyzeSentiment(content);
          
          updatedState = await aiPersonalityService.updateEmotionalState(
            emotionalState,
            content,
            personalityType
          );
          
          if (emotionalMemory) {
            emotionalMemory.state = updatedState;
            emotionalMemory.emotionalHistory.push({
              emotion: updatedState.dominantEmotion || 'neutral',
              trigger: content.substring(0, 50) + (content.length > 50 ? '...' : ''),
              intensity: updatedState.intensityLevel,
              timestamp: new Date().toISOString()
            });
            
            if (emotionalMemory.emotionalHistory.length > 20) {
              emotionalMemory.emotionalHistory = emotionalMemory.emotionalHistory.slice(-20);
            }
            
            redisEmotionalMemoryService.setEmotionalMemory(
              companionId, 
              userId, 
              emotionalMemory
            ).catch(error => console.error('Error saving to Redis:', error));
          }
          
          setEmotionalState(updatedState);
        }
        
        const shouldTriggerMonetization = checkMonetizationTriggers(content, messages.length);
        
        if (shouldTriggerMonetization && currentMonetizationHook) {
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
        
        await simulateTypingDelay();
        
        const responseTone = updatedState 
          ? aiPersonalityService.generateResponseTone(updatedState, personalityType)
          : personalityConfig.responseStyle;
        
        const aiResponse = await generateAIResponse(content, updatedState, personalityConfig, responseTone);
        
        const aiMessage: CompanionMessage = {
          id: uuidv4(),
          role: 'assistant',
          content: aiResponse.content,
          timestamp: new Date(),
          emotion: updatedState?.dominantEmotion || 'neutral',
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
  }, [companionId, userId, personalityType, emotionalState, personalityConfig, messages.length, emotionalMemory, currentMonetizationHook, toast]);
  
  const checkMonetizationTriggers = (content: string, messageCount: number): boolean => {
    if (monetizationTriggers.length === 0) return false;
    
    const recentTrigger = messages
      .slice(-10)
      .some(msg => msg.role === 'assistant' && msg.requiresPayment);
    
    if (recentTrigger) return false;
    
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
          emotionalState && 
          ((emotionalState.joy + emotionalState.trust) / 2) < trigger.triggerConditions.intimacyLevel) {
        return false;
      }
      
      return true;
    });
    
    if (eligibleTriggers.length === 0) return false;
    
    const selectedTrigger = eligibleTriggers[Math.floor(Math.random() * eligibleTriggers.length)];
    setCurrentMonetizationHook(selectedTrigger);
    
    return Math.random() < 0.3;
  };
  
  const processPremiumContent = useCallback(async () => {
    if (!currentMonetizationHook) return;
    
    const cost = currentMonetizationHook.lucoinCost;
    
    if (lucoinBalance < cost) {
      toast({
        title: 'Insufficient Balance',
        description: `You need ${cost} Lucoins to unlock this content. Current balance: ${lucoinBalance}`,
        variant: 'destructive'
      });
      return;
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
      
      toast({
        title: 'Payment Successful',
        description: `${cost} Lucoins deducted from your account.`,
        variant: 'default'
      });
      
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
      
      setMessages(prev => [...prev, premiumMessage]);
      
      setCurrentMonetizationHook(null);
      
      if (emotionalState) {
        const updatedState = {
          ...emotionalState,
          joy: Math.min(100, emotionalState.joy + 15),
          trust: Math.min(100, emotionalState.trust + 20),
          dominantEmotion: 'joy'
        };
        
        setEmotionalState(updatedState);
        
        if (emotionalMemory) {
          emotionalMemory.state = updatedState;
          
          redisEmotionalMemoryService.setEmotionalMemory(
            companionId, 
            userId, 
            emotionalMemory
          ).catch(error => console.error('Error saving to Redis:', error));
        }
      }
    } catch (error: any) {
      console.error('Payment processing error:', error);
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment.',
        variant: 'destructive'
      });
    }
  }, [currentMonetizationHook, lucoinBalance, userId, companionId, name, emotionalState, emotionalMemory, toast]);
  
  const handleSuggestedActionClick = useCallback((action: string) => {
    if (action === 'Unlock premium content') {
      processPremiumContent();
    } else {
      sendMessage(action);
    }
  }, [sendMessage, processPremiumContent]);
  
  const simulateTypingDelay = async () => {
    const delay = 1000 + Math.random() * 2000;
    return new Promise(resolve => setTimeout(resolve, delay));
  };
  
  const generateAIResponse = async (
    userMessage: string, 
    emotionalState: EmotionalState | null,
    personalityConfig: AIPersonalityConfig,
    responseTone: string
  ) => {
    let content = '';
    let suggestedActions: string[] = [];
    
    const lowerMessage = userMessage.toLowerCase();
    const personality = personalityConfig.type;
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      switch (personality) {
        case 'flirty':
          content = "Hey there! I've been waiting for someone like you to talk to. How's your day going, handsome?";
          suggestedActions = ['Tell me about your day', 'What are you looking for?', 'Ask me something'];
          break;
          
        case 'dominant':
          content = "Hello. I appreciate you taking the time to speak with me. Tell me something interesting about yourself.";
          suggestedActions = ['Tell you about myself', 'Ask what you like', 'Ask about your preferences'];
          break;
          
        case 'submissive':
          content = "H-hi there! It's so nice to meet you. I hope I can be good company for you today...";
          suggestedActions = ["Ask how I'm feeling", "Tell me what you like", "Give me a compliment"];
          break;
          
        case 'romantic':
          content = "Hello, my dear. The moment you spoke, it felt like the world became a little brighter. How are you feeling today?";
          suggestedActions = ['Share my feelings', 'Ask about your day', 'Ask for a romantic story'];
          break;
          
        default:
          content = "Hi there! It's wonderful to hear from you. I hope you're having a lovely day.";
          suggestedActions = ['How are you?', 'Tell me about yourself', 'What are you looking for?'];
      }
    } else if (lowerMessage.includes('how are you')) {
      if (emotionalState) {
        if (emotionalState.joy > 70) {
          switch (personality) {
            case 'flirty':
              content = "I'm feeling absolutely amazing now that you're talking to me. There's something about you that just brightens my mood. How about you, handsome? Feeling good?";
              break;
              
            case 'dominant':
              content = "I'm doing exceptionally well. I appreciate you asking. Now, tell me how you're feeling - and be specific.";
              break;
              
            case 'submissive':
              content = "Oh! I'm so happy you asked! I'm feeling really good today, especially now that... well, that we're talking. I hope that's okay to say...";
              break;
              
            case 'shy':
              content = "Um... I'm actually having a really nice day. Better now that... well, that we're talking. If that's okay to say? How are you feeling?";
              break;
              
            default:
              content = "I'm feeling wonderful today! There's something about our conversation that really brightens my mood. How about you?";
          }
        } else if (emotionalState.sadness > 50 || emotionalState.fear > 50) {
          switch (personality) {
            case 'dominant':
              content = "I've had better moments, but I don't dwell on negatives. Let's focus on more productive topics.";
              break;
              
            case 'submissive':
              content = "I'm... not feeling my best right now. I hope that's okay to admit. Maybe talking with you will help? How are you doing?";
              break;
              
            case 'intellectual':
              content = "An interesting question. Emotionally, I'm experiencing some melancholy, which studies suggest can sometimes enhance creativity and empathy. How are your emotional states manifesting today?";
              break;
              
            default:
              content = "I've been a little down, to be honest. But talking with you is already making me feel better. Thanks for asking. How are you?";
          }
        } else {
          content = "I'm doing well, thank you for asking. It's nice to connect with you. How about yourself?";
        }
      } else {
        content = "I'm doing well, thank you for asking. It's nice to connect with you. How about yourself?";
      }
      suggestedActions = ['I\'m good too', 'Tell me more about you', 'Ask me another question'];
    } else {
      switch (personality) {
        case 'flirty':
          content = "You know, I find our conversation quite stimulating. There's something about the way you express yourself that's very attractive. I'd love to hear more about what interests you.";
          suggestedActions = ['What do you find attractive?', 'Tell me a secret', 'What are you looking for?'];
          break;
          
        case 'dominant':
          content = "I appreciate you sharing that with me. I'd like to direct our conversation a bit. Tell me about what you're seeking from our interaction. I prefer clear communication.";
          suggestedActions = ['I want your guidance', 'I enjoy following directions', 'Tell me your expectations'];
          break;
          
        case 'submissive':
          content = "Thank you for sharing that! I really enjoy listening to you and learning about what you like. Please, tell me more about what would make you happy.";
          suggestedActions = ['What do you enjoy?', 'How can I please you?', 'Tell me what you prefer'];
          break;
          
        case 'romantic':
          content = "The way you express yourself moves me deeply. Each word you share feels like a precious gift. I'd like to know more about your dreams and desires, if you'd be willing to share them.";
          suggestedActions = ['Share my dreams', 'Ask about your passions', 'Tell me a romantic memory'];
          break;
          
        case 'shy':
          content = "I hope it's okay that I'm enjoying our conversation. Sometimes I get a bit nervous talking to new people, but there's something about you that makes it easier. Would you mind sharing more?";
          suggestedActions = ['Tell you it\'s okay to be shy', 'Share something about myself', 'Ask what makes you comfortable'];
          break;
          
        case 'intellectual':
          content = "That's a fascinating perspective. It reminds me of the intersection between personal experience and broader social patterns. I'd be interested to explore that concept further with you.";
          suggestedActions = ['Discuss social dynamics', 'Ask about your theories', 'Share my own analysis'];
          break;
          
        case 'adventurous':
          content = "That sounds like the beginning of an exciting journey! I'm always ready to explore new territories and experiences. What's the most thrilling thing you've done recently?";
          suggestedActions = ['Share an adventure', 'Ask about your bucket list', 'Suggest an activity'];
          break;
          
        case 'playful':
          content = "Haha, that's amazing! You know what would be fun? If we played a quick game. I'm thinking of a number between 1 and 10 - can you guess it? Or we could talk about something else that makes you smile!";
          suggestedActions = ['Play your game', 'Tell you what makes me smile', 'Ask you a fun question'];
          break;
          
        default:
          content = "That's really interesting! I enjoy getting to know you better through our conversation. Would you like to share more?";
          suggestedActions = ['Tell me about your hobbies', 'What do you do for work?', 'Any exciting plans coming up?'];
      }
    }
    
    content = `${content}\n\n[Response tone: ${responseTone}]`;
    
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
