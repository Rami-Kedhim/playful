
// Fix AICompanionState interface usage and remove undefined methods; fix store usage

import { useState, useEffect, useCallback } from 'react';
import useAICompanionStore from '@/store/aiCompanionStore';
import { 
  AICompanion,
  AICompanionMessage
} from '@/types/ai-companion';

/**
 * Hook for working with AI companions
 */
export function useAICompanion(userId?: string, companionId?: string) {
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

  // Get state and actions from store
  const {
    companions,
    activeCompanion,
    messages,
    isLoading,
    error,

    fetchCompanions,
    setActiveCompanion,

    fetchMessages,
    sendMessage,
  } = useAICompanionStore();

  const currentMessages = companionId ? messages || [] : [];

  const loadCompanions = useCallback(async () => {
    if (userId) {
      await fetchCompanions();
    }
  }, [userId, fetchCompanions]);

  const handleSelectCompanion = useCallback(async (id: string | null) => {
    setActiveCompanion(id ? companions.find(c => c.id === id) || null : null);

    if (id && userId) {
      setIsLoadingMessages(true);
      setChatError(null);

      try {
        await fetchMessages(companionId || '');
      } catch (err: any) {
        setChatError(err.message || 'Failed to load companion data');
      } finally {
        setIsLoadingMessages(false);
      }
    }
  }, [userId, companions, setActiveCompanion, fetchMessages, companionId]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!userId || !companionId) return null;
    
    return await sendMessage(userId, companionId, content);
  }, [userId, companionId, sendMessage]);

  useEffect(() => {
    loadCompanions();
  }, [loadCompanions]);

  useEffect(() => {
    if (companionId) {
      handleSelectCompanion(companionId);
    }
  }, [companionId, handleSelectCompanion]);

  return {
    companions,
    selectedCompanion: activeCompanion,
    messages: currentMessages,
    isLoading,
    isLoadingMessages,
    error,
    chatError,
    loadCompanions,
    selectCompanion: handleSelectCompanion,
    sendMessage: handleSendMessage,
  };
}

export default useAICompanion;
