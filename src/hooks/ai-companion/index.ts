
// Fixed properties in AICompanionState and corrected hook imports and usage, adjusted for missing props

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
    loading,
    error,

    fetchCompanions,
    setActiveCompanion,
    createCompanion,
    updateCompanion,

    fetchMessages,
    sendMessage,

    generateContent,
    fetchUnlockableContent,

    updateRelationshipLevel
  } = useAICompanionStore();

  const currentMessages = companionId ? messages[companionId] || [] : [];

  const currentUnlockableContent = companionId
    ? fetchUnlockableContent ? (fetchUnlockableContent[companionId] || []) : []
    : [];

  const loadCompanions = useCallback(async () => {
    if (userId) {
      await fetchCompanions(userId);
    }
  }, [userId, fetchCompanions]);

  const handleSelectCompanion = useCallback(async (id: string | null) => {
    setActiveCompanion(id ? companions.find(c => c.id === id) || null : null);

    if (id && userId) {
      setIsLoadingMessages(true);
      setChatError(null);

      try {
        await fetchMessages(userId, id);
        await fetchUnlockableContent && await fetchUnlockableContent(userId, id);
      } catch (err: any) {
        setChatError(err.message || 'Failed to load companion data');
      } finally {
        setIsLoadingMessages(false);
      }
    }
  }, [userId, companions, setActiveCompanion, fetchMessages, fetchUnlockableContent]);

  const handleCreateCompanion = useCallback(async (params: any) => {
    if (!userId) return null;

    const newCompanion = await createCompanion(userId, params);

    if (newCompanion) {
      await handleSelectCompanion(newCompanion.id);
    }

    return newCompanion;
  }, [userId, createCompanion, handleSelectCompanion]);

  const handleUpdateCompanion = useCallback(async (id: string, params: any) => {
    if (!userId) return null;

    return await updateCompanion(userId, id, params);
  }, [userId, updateCompanion]);

  const handleSendMessage = useCallback(async (content: string) => {
    if (!userId || !companionId) return null;
    
    return await sendMessage(userId, companionId, content);
  }, [userId, companionId, sendMessage]);

  const handleGenerateContent = useCallback(async (params: any) => {
    if (!userId || !companionId) return null;

    return await generateContent(userId, {
      ...params,
      companion_id: companionId
    });
  }, [userId, companionId, generateContent]);

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
    // expose activeCompanion as selectedCompanion for compatibility
    selectedCompanion: activeCompanion,
    messages: currentMessages,
    loading,
    isLoadingMessages,
    error,
    chatError,
    loadCompanions,
    selectCompanion: handleSelectCompanion,
    createCompanion: handleCreateCompanion,
    updateCompanion: handleUpdateCompanion,
    sendMessage: handleSendMessage,
    generateContent: handleGenerateContent,
    fetchUnlockableContent: (contentType?: "image" | "voice" | "video") =>
      userId && companionId && fetchUnlockableContent ? fetchUnlockableContent(userId, companionId, contentType) : Promise.resolve([]),
    updateRelationshipLevel: (updates: Partial<any>) =>
      userId && companionId ? updateRelationshipLevel(userId, companionId, updates) : Promise.resolve(null),
    presetCompanions: []
  };
}

export default useAICompanion;
