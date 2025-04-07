
import { useCallback } from 'react';

export const useMessageFormatting = () => {
  // Format chat history for the API
  const formatChatHistory = useCallback((messages: any[]) => {
    return messages.slice(-10).map(msg => ({
      role: msg.role,
      content: msg.content
    }));
  }, []);

  return {
    formatChatHistory
  };
};
