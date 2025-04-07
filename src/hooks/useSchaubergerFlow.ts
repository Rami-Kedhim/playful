
import { useState, useEffect } from 'react';
import neuralHub from '@/services/neural/HermesOxumNeuralHub';

interface MessageHistoryItem {
  role: string;
  content: string;
  timestamp?: Date;
}

interface SchaubergerFlowOptions {
  messageHistory?: MessageHistoryItem[];
  userId?: string;
}

/**
 * Hook implementing Viktor Schauberger's natural flow principles
 * for optimizing resource usage and creating more natural interaction patterns
 */
export const useSchaubergerFlow = (options: SchaubergerFlowOptions = {}) => {
  const { messageHistory = [], userId } = options;
  
  // Flow metrics
  const [emotionalFlow, setEmotionalFlow] = useState<number>(0.5); // 0-1
  const [vortexStrength, setVortexStrength] = useState<number>(0.5); // 0-1
  const [resourceAllocation, setResourceAllocation] = useState<number>(0.5); // 0-1
  
  // Get metrics from neural hub
  useEffect(() => {
    // Initialize flow metrics from neural hub if available
    const metrics = neuralHub.getHealthMetrics();
    setEmotionalFlow(metrics.userEngagement || 0.5);
    setVortexStrength(metrics.stability || 0.5);
    setResourceAllocation(metrics.economicBalance || 0.5);
    
    // Calculate metrics based on message history
    if (messageHistory.length > 0) {
      // Analyze message patterns
      const messageCount = messageHistory.length;
      const userMessages = messageHistory.filter(m => m.role === 'user').length;
      const aiMessages = messageHistory.filter(m => m.role === 'assistant').length;
      
      // Conversation balance affects vortex strength
      const conversationBalance = Math.min(1, Math.max(0.2, userMessages / Math.max(1, aiMessages)));
      setVortexStrength(prev => (prev * 0.7) + (conversationBalance * 0.3));
      
      // Message timings affect flow
      if (messageHistory.length >= 3 && messageHistory[0].timestamp) {
        const timestamps = messageHistory
          .filter(m => m.timestamp)
          .map(m => m.timestamp as Date)
          .map(d => d.getTime());
        
        const intervals = [];
        for (let i = 1; i < timestamps.length; i++) {
          intervals.push(timestamps[i] - timestamps[i-1]);
        }
        
        const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
        const normalizedFlow = Math.min(1, Math.max(0.1, 10000 / avgInterval));
        setEmotionalFlow(prev => (prev * 0.8) + (normalizedFlow * 0.2));
      }
    }
  }, [messageHistory, userId]);
  
  // Optimize resource usage based on flow metrics
  const shouldUseImages = () => {
    // Only use images when flow and resources allow
    return resourceAllocation > 0.3 && emotionalFlow > 0.4;
  };
  
  const shouldUseCards = () => {
    // Only use cards when stability and resources allow
    return resourceAllocation > 0.4 && vortexStrength > 0.5;
  };
  
  return {
    emotionalFlow,
    vortexStrength,
    resourceAllocation,
    shouldUseImages,
    shouldUseCards
  };
};

export default useSchaubergerFlow;
