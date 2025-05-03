
import { useState, useCallback } from 'react';
import { lucie } from '@/core/Lucie';
import { toast } from '@/components/ui/use-toast';

// Export the LucieMessage type for use in other components
export interface LucieMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface UseLucieAssistantOptions {
  initialMessages?: LucieMessage[];
}

export function useLucieAssistant(options: UseLucieAssistantOptions = {}) {
  const [messages, setMessages] = useState<LucieMessage[]>(options.initialMessages || []);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string>('');
  const [isOpen, setIsOpen] = useState(true);
  const [context, setContext] = useState<Record<string, any>>({});
  
  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  const updateContext = useCallback((newContext: Record<string, any>) => {
    setContext(prev => ({ ...prev, ...newContext }));
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;
    
    const userMessage: LucieMessage = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setIsTyping(true);
    setError('');
    
    try {
      // First check content moderation
      const moderationResult = await lucie.moderateContent(content);
      
      if (!moderationResult.safe) {
        const rejectionMessage: LucieMessage = {
          id: `lucie-${Date.now()}`,
          content: "I'm sorry, but I cannot respond to that type of content.",
          role: 'assistant',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, rejectionMessage]);
        toast({
          variant: "destructive",
          title: "Content moderation",
          description: "Your message was flagged by our content filter."
        });
        return;
      }
      
      // Generate AI response
      const response = await lucie.generateContent(content, {
        history: messages.map(m => `${m.role}: ${m.content}`).join('\n'),
        ...context
      });
      
      const assistantMessage: LucieMessage = {
        id: `lucie-${Date.now()}`,
        content: response,
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (err: any) {
      setError(err.message || 'Failed to get response');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to get a response from the assistant."
      });
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  }, [messages, context]);
  
  return {
    messages,
    isLoading,
    isTyping,
    error,
    context,
    isOpen,
    toggleChat,
    sendMessage,
    clearMessages,
    updateContext
  };
}

export default useLucieAssistant;
