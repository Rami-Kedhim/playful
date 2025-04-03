
import { useCallback } from 'react';
import { UseAIMessagingProps, UseAIMessagingReturn } from './ai/types';
import { useAIConversation } from './ai/useAIConversation';
import { useAIMessages } from './ai/useAIMessages';
import { useAIImageGeneration } from './ai/useAIImageGeneration';

export const useAIMessaging = ({ profileId, conversationId }: UseAIMessagingProps = {}): UseAIMessagingReturn => {
  const {
    loading,
    profile,
    conversation,
    messages,
    error,
    paymentRequired,
    paymentMessage,
    setMessages,
    setError,
    setPaymentRequired,
    setPaymentMessage,
    initializeConversation: initConversation
  } = useAIConversation();

  const {
    sendingMessage,
    simulatingTyping,
    sendMessage,
    processPayment
  } = useAIMessages(
    conversation,
    messages,
    setMessages,
    paymentRequired,
    setPaymentRequired,
    setPaymentMessage,
    setError
  );

  const {
    generatingImage,
    generateImage
  } = useAIImageGeneration(profile, setError);

  const initializeConversation = useCallback(async () => {
    await initConversation(profileId, conversationId);
  }, [initConversation, profileId, conversationId]);

  return {
    loading,
    sendingMessage,
    profile,
    conversation,
    messages,
    error,
    paymentRequired,
    paymentMessage,
    simulatingTyping,
    generatingImage,
    initializeConversation,
    sendMessage,
    processPayment,
    generateImage
  };
};
