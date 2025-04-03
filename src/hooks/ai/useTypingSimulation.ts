
import { useState, useCallback, useRef, useEffect } from 'react';
import { AIProfile, AIMessage } from '@/types/ai-profile';
import { useResponseTime } from './useResponseTime';

export const useTypingSimulation = (profile: AIProfile | null) => {
  const [simulatingTyping, setSimulatingTyping] = useState(false);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { calculateResponseTime } = useResponseTime();

  const simulateTyping = useCallback((message: AIMessage, callback: () => void) => {
    if (!profile) {
      callback();
      return;
    }
    
    setSimulatingTyping(true);
    
    const typingTime = calculateResponseTime(message.content.length, profile);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      setSimulatingTyping(false);
      callback();
    }, typingTime);
    
  }, [profile, calculateResponseTime]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return { simulatingTyping, simulateTyping };
};
