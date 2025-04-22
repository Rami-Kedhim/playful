import { useState, useEffect } from 'react';

export const useAIChat = (conversationId: string, userId: string, initialMessages: any[] = []) => {
  const [messages, setMessages] = useState(initialMessages);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    // Load initial messages when conversation ID changes
    const loadMessages = async () => {
      if (!conversationId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Here you would fetch messages from your API
        // const response = await fetchMessages(conversationId);
        // setMessages(response.data);
      } catch (err: any) {
        setError(err.message || 'Failed to load messages');
        console.error('Error loading chat messages:', err);
      } finally {
        setLoading(false);
      }
    };
    
    loadMessages();
  }, [conversationId, userId]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !conversationId) return;
    
    // Optimistically add user message to the UI
    const userMessage = {
      id: `temp-${Date.now()}`,
      content,
      role: 'user',
      timestamp: new Date(),
      senderId: userId
    };
    
    setMessages(prev => [...prev, userMessage]);
    setTyping(true);
    
    try {
      // Here you would send the message to your API
      // const response = await sendChatMessage(conversationId, content, userId);
      // const aiResponse = response.data;
      
      // Simulate AI response for now
      setTimeout(() => {
        const aiMessage = {
          id: `ai-${Date.now()}`,
          content: `This is a simulated response to: "${content}"`,
          role: 'assistant',
          timestamp: new Date(),
          senderId: 'ai'
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setTyping(false);
      }, 1000);
      
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
      console.error('Error sending message:', err);
      setTyping(false);
    }
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    setMessages,
    sendMessage,
    clearMessages,
    loading,
    error,
    typing
  };
};

export default useAIChat;
