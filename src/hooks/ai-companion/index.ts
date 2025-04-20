
// Fixed properties in AICompanionState to match store and hook usage. Removed references to non-existent properties like loading, createCompanion.

import { useState, useEffect, useCallback } from 'react';
import useAICompanionStore from '@/store/aiCompanionStore';
import { 
  AICompanion,
  AICompanionMessage
} from '@/types/ai-companion';

export function useAICompanion(userId?: string, companionId?: string) {
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);

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

  const currentMessages = companionId ? messages : [];

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
        await fetchMessages(id);
      } catch (err: any) {
        setChatError(err.message || 'Failed to load companion data');
      } finally {
        setIsLoadingMessages(false);
      }
    }
  }, [userId, companions, setActiveCompanion, fetchMessages]);

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
