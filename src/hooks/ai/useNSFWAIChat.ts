
import { useState, useCallback, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import useBrainHubAIContext from '@/hooks/ai-lucie/useBrainHubAIContext';
import { nsfwAIProviderService } from '@/services/ai/NSFWAIProviderService';
import { brainHub } from '@/services/neural/HermesOxumBrainHub';
import { useAuth } from '@/hooks/auth/useAuthContext';

export interface NSFWAIMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  requires_payment?: boolean;
  payment_status?: 'pending' | 'completed' | 'failed';
  price?: number;
  emotionalState?: string;
  mediaUrls?: string[];
}

export interface NSFWAIProfile {
  id: string;
  name: string;
  personality: string;
  avatar_url?: string;
  lucoin_chat_price?: number;
  system_prompt?: string;
}

export const useNSFWAIChat = (profileId?: string) => {
  const [messages, setMessages] = useState<NSFWAIMessage[]>([]);
  const [profile, setProfile] = useState<NSFWAIProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Connect to the Brain Hub
  const {
    preferredModel,
    aiContext,
    updateEmotionalState,
    recordInteraction,
    toggleNSFWContent
  } = useBrainHubAIContext('nsfw-ai-chat-' + (profileId || 'default'));
  
  // Initialize connection when profile ID changes
  useEffect(() => {
    const initChat = async () => {
      if (profileId) {
        setIsLoading(true);
        try {
          // Simulate fetching profile information
          // In a real implementation, this would be an API call
          await new Promise(resolve => setTimeout(resolve, 800));
          
          // Mock profile data
          setProfile({
            id: profileId,
            name: 'AI Companion',
            personality: 'friendly',
            avatar_url: 'https://example.com/avatar.jpg',
            lucoin_chat_price: 5,
            system_prompt: preferredModel?.systemPrompt
          });
          
          // Set initial greeting
          const initialMessage: NSFWAIMessage = {
            id: `welcome-${Date.now()}`,
            role: 'assistant',
            content: 'Hello! I\'m your AI companion. How can I help you today?',
            timestamp: new Date()
          };
          
          setMessages([initialMessage]);
        } catch (err: any) {
          setError(err.message || 'Failed to initialize chat');
          toast({
            title: 'Error',
            description: 'Could not connect to AI companion',
            variant: 'destructive',
          });
        } finally {
          setIsLoading(false);
        }
      }
    };
    
    initChat();
  }, [profileId, preferredModel, toast]);
  
  // Send a message to the AI
  const sendMessage = useCallback(async (content: string) => {
    if (!preferredModel) {
      toast({
        title: 'Error',
        description: 'AI model not configured properly',
        variant: 'destructive',
      });
      return null;
    }
    
    try {
      // Add user message to chat
      const userMessageId = `msg-${Date.now()}-user`;
      const userMessage: NSFWAIMessage = {
        id: userMessageId,
        role: 'user',
        content,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setIsTyping(true);
      
      // Record this interaction in Brain Hub
      recordInteraction();
      
      // Prepare the conversation history for the AI
      const conversationHistory = messages.map(msg => ({
        role: msg.role,
        content: msg.content
      }));
      
      // Add the latest user message
      conversationHistory.push({
        role: 'user',
        content
      });
      
      // Get the appropriate AI provider based on user preferences
      const provider = nsfwAIProviderService.getProviderFromPreference(preferredModel);
      
      // Prepare the request for the provider
      const requestData = nsfwAIProviderService.prepareMessageForProvider(
        conversationHistory,
        provider,
        preferredModel.systemPrompt
      );
      
      // Process request through Brain Hub for compliance and customization
      const brainHubResponse = brainHub.processRequest({
        type: 'ai_chat',
        data: requestData,
        filters: {
          region: aiContext?.userPreferences.region || null,
          geoRestrictions: aiContext?.systemContext.legalCompliance || false
        }
      });
      
      if (!brainHubResponse.success) {
        throw new Error(brainHubResponse.error || 'Brain Hub processing failed');
      }
      
      // For demo purposes, simulate AI response
      // In production, this would be a call to the actual AI provider API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Sample emotional analysis (in production this would come from the AI model)
      const emotionAnalysis = Math.random() > 0.5 ? 'excited' : 'curious';
      updateEmotionalState(emotionAnalysis);
      
      // Create AI response message
      const aiMessage: NSFWAIMessage = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: `I've processed your message: "${content}". This is a placeholder response that would normally be generated by the ${provider.name} AI model.`,
        timestamp: new Date(),
        emotionalState: emotionAnalysis
      };
      
      setMessages(prev => [...prev, aiMessage]);
      return aiMessage;
      
    } catch (error: any) {
      console.error('Error sending message:', error);
      setError(error.message || 'Failed to send message');
      toast({
        title: 'Error',
        description: 'Failed to send message to AI',
        variant: 'destructive',
      });
      return null;
    } finally {
      setIsTyping(false);
    }
  }, [messages, preferredModel, aiContext, toast, recordInteraction, updateEmotionalState]);
  
  // Set NSFW content preference
  const setNSFWPreference = useCallback((enabled: boolean) => {
    toggleNSFWContent(enabled);
    
    toast({
      title: 'Preference Updated',
      description: `NSFW content has been ${enabled ? 'enabled' : 'disabled'}.`,
    });
  }, [toggleNSFWContent, toast]);
  
  return {
    messages,
    sendMessage,
    isLoading,
    isTyping,
    error,
    profile,
    setNSFWPreference,
    aiModel: preferredModel?.model
  };
};

export default useNSFWAIChat;
