import { useState, useEffect, useCallback } from 'react';
import useAICompanionStore from '@/store/aiCompanionStore';
import { 
  AICompanion, 
  AICompanionCreateParams, 
  AICompanionUpdateParams,
  AICompanionMessage,
  AIContentGenerationParams
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
    selectedCompanion,
    presetCompanions,
    messages,
    unlockableContent,
    loading,
    error,
    
    fetchCompanions,
    selectCompanion,
    createCompanion,
    updateCompanion,
    
    fetchMessages,
    sendMessage,
    
    generateContent,
    fetchUnlockableContent,
    
    updateRelationshipLevel
  } = useAICompanionStore();
  
  // Get messages for the current companion
  const currentMessages = companionId ? messages[companionId] || [] : [];
  
  // Get unlockable content for the current companion
  const currentUnlockableContent = companionId 
    ? unlockableContent[companionId] || [] 
    : [];
  
  // Function to load all companions
  const loadCompanions = useCallback(async () => {
    if (userId) {
      await fetchCompanions(userId);
    }
  }, [userId, fetchCompanions]);
  
  // Function to select a companion
  const handleSelectCompanion = useCallback(async (id: string | null) => {
    selectCompanion(id);
    
    if (id && userId) {
      setIsLoadingMessages(true);
      setChatError(null);
      
      try {
        await fetchMessages(userId, id);
        await fetchUnlockableContent(userId, id);
      } catch (err: any) {
        setChatError(err.message || 'Failed to load companion data');
      } finally {
        setIsLoadingMessages(false);
      }
    }
  }, [userId, selectCompanion, fetchMessages, fetchUnlockableContent]);
  
  // Function to create a new companion
  const handleCreateCompanion = useCallback(async (params: AICompanionCreateParams) => {
    if (!userId) return null;
    
    const newCompanion = await createCompanion(userId, params);
    
    if (newCompanion) {
      handleSelectCompanion(newCompanion.id);
    }
    
    return newCompanion;
  }, [userId, createCompanion, handleSelectCompanion]);
  
  // Function to update a companion
  const handleUpdateCompanion = useCallback(async (id: string, params: AICompanionUpdateParams) => {
    if (!userId) return null;
    
    return await updateCompanion(userId, id, params);
  }, [userId, updateCompanion]);
  
  // Function to send a chat message
  const handleSendMessage = useCallback(async (content: string) => {
    if (!userId || !companionId) return null;
    
    return await sendMessage(userId, companionId, content);
  }, [userId, companionId, sendMessage]);
  
  // Function to generate content
  const handleGenerateContent = useCallback(async (params: Omit<AIContentGenerationParams, 'companion_id'>) => {
    if (!userId || !companionId) return null;
    
    return await generateContent(userId, {
      ...params,
      companion_id: companionId
    });
  }, [userId, companionId, generateContent]);
  
  // Load companions on mount
  useEffect(() => {
    loadCompanions();
  }, [loadCompanions]);
  
  // Select companion if ID is provided
  useEffect(() => {
    if (companionId) {
      handleSelectCompanion(companionId);
    }
  }, [companionId, handleSelectCompanion]);
  
  return {
    // State
    companions,
    presetCompanions,
    selectedCompanion,
    messages: currentMessages,
    unlockableContent: currentUnlockableContent,
    loading,
    isLoadingMessages,
    error,
    chatError,
    
    // Actions
    loadCompanions,
    selectCompanion: handleSelectCompanion,
    createCompanion: handleCreateCompanion,
    updateCompanion: handleUpdateCompanion,
    sendMessage: handleSendMessage,
    generateContent: handleGenerateContent,
    fetchUnlockableContent: (contentType?: "image" | "voice" | "video") => 
      userId && companionId ? fetchUnlockableContent(userId, companionId, contentType) : Promise.resolve([]),
    updateRelationshipLevel: (updates: Partial<AICompanion['relationship_level']>) => 
      userId && companionId ? updateRelationshipLevel(userId, companionId, updates) : Promise.resolve(null)
  };
}

export default useAICompanion;
