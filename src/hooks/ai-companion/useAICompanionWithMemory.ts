
import { useState, useEffect, useCallback } from 'react';

// Define simple local types to fix missing imports
interface CompanionMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export function useAICompanionWithMemory() {
  const [messages, setMessages] = useState<CompanionMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companion, setCompanion] = useState<any>(null);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [creditCost, setCreditCost] = useState(0);

  // Mock function for sending messages
  const sendMessage = useCallback(async (content: string) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newMessage: CompanionMessage = {
      id: String(messages.length + 1),
      role: 'user',
      content: content,
      timestamp: new Date(),
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setIsTyping(false);
  }, [messages]);

  // Mock suggested action handler
  const handleSuggestedActionClick = useCallback((action: string) => {
    console.log('Suggested action clicked:', action);
  }, []);

  // Mock image generation
  const generateImage = useCallback(async (prompt: string) => {
    setGeneratingImage(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Generating image with prompt:', prompt);
    setGeneratingImage(false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setCompanion({ id: '1', name: 'Test Companion' });
      setIsLoading(false);
    }, 500);
  }, []);

  return {
    messages,
    isTyping,
    isLoading,
    error,
    companion,
    sendMessage,
    handleSuggestedActionClick,
    generateImage,
    generatingImage,
    creditCost,
  };
}

