
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AIConversation, AIMessage } from '@/types/ai-profile';
import { sendMessageToAI, processAIMessagePayment } from '@/services/ai/aiProfileService';
import { toast } from '@/components/ui/use-toast';
import { useTypingSimulation } from './useTypingSimulation';

export const useAIMessages = (
  conversation: AIConversation | null, 
  messages: AIMessage[], 
  setMessages: (msgs: AIMessage[]) => void,
  paymentRequired: boolean,
  setPaymentRequired: (required: boolean) => void,
  setPaymentMessage: (msg: AIMessage | null) => void,
  setError: (error: string | null) => void
) => {
  const { user } = useAuth();
  const [sendingMessage, setSendingMessage] = useState(false);
  const { simulatingTyping, simulateTyping } = useTypingSimulation(conversation?.ai_profile || null);

  const sendMessage = useCallback(async (content: string) => {
    if (!user || !conversation) {
      setError('Cannot send message: no active conversation');
      return;
    }

    if (paymentRequired) {
      toast({
        title: 'Payment Required',
        description: 'You need to purchase Lucoins to continue this conversation',
        variant: 'destructive',
      });
      return;
    }

    setSendingMessage(true);
    setError(null);

    try {
      const result = await sendMessageToAI(conversation.id, user.id, content);
      
      if (result.error) {
        throw new Error(result.error);
      }

      setMessages([...messages, result.userMessage]);

      if (result.requiresPayment && result.aiResponse) {
        setPaymentRequired(true);
        setPaymentMessage(result.aiResponse);
        setMessages([...messages, result.userMessage, result.aiResponse as AIMessage]);
      } 
      else if (result.aiResponse) {
        simulateTyping(result.aiResponse, () => {
          setMessages([...messages, result.userMessage, result.aiResponse as AIMessage]);
        });
      }
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      toast({
        title: 'Error',
        description: err.message || 'Failed to send message',
        variant: 'destructive',
      });
    } finally {
      setSendingMessage(false);
    }
  }, [user, conversation, messages, paymentRequired, simulateTyping, setMessages, setError, setPaymentRequired, setPaymentMessage]);

  const processPayment = useCallback(async () => {
    if (!user || !conversation || !paymentRequired) {
      return;
    }

    const paymentMsg = messages.find(msg => 
      msg.requires_payment && msg.payment_status === 'pending'
    );

    if (!paymentMsg) return;

    try {
      const result = await processAIMessagePayment(paymentMsg.id, user.id);
      
      if (!result.success) {
        throw new Error(result.error || 'Payment processing failed');
      }

      setPaymentRequired(false);
      setPaymentMessage(null);

      if (result.aiResponse) {
        simulateTyping(result.aiResponse, () => {
          setMessages([...messages, result.aiResponse as AIMessage]);
        });
      }

      toast({
        title: 'Payment Successful',
        description: 'Your Lucoins have been used to continue the conversation',
      });
    } catch (err: any) {
      setError(err.message || 'Failed to process payment');
      toast({
        title: 'Payment Failed',
        description: err.message || 'Failed to process payment',
        variant: 'destructive',
      });
    }
  }, [user, conversation, messages, paymentRequired, simulateTyping, setMessages, setError, setPaymentRequired, setPaymentMessage]);

  return {
    sendingMessage,
    simulatingTyping,
    sendMessage,
    processPayment
  };
};
