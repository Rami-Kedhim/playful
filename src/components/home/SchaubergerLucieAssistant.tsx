
/**
 * SchaubergerLucieAssistant - Enhanced Lucie AI assistant with Schauberger flow principles
 * Implements natural flow dynamics, implosive logic, and emotion-aware responses
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { X, MessageCircle, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLucieAssistant, LucieMessage } from '@/hooks/useLucieAssistant';
import LucieHeader from './lucie-assistant/LucieHeader';
import LucieMessageList from './lucie-assistant/LucieMessageList';
import LucieInputBox from './lucie-assistant/LucieInputBox';
import LucieTypingIndicator from './lucie-assistant/LucieTypingIndicator';
import { useHermesInsights } from '@/hooks/useHermesInsights';
import { useAuth } from '@/hooks/auth';
import { neuralHub, ContentType as NeuralHubContentType } from '@/services/neural/HermesOxumNeuralHub';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

interface SchaubergerLucieAssistantProps {
  initiallyOpen?: boolean;
  customInitialMessage?: string;
  onClose?: () => void;
}

// Emotional flow indicators for Schauberger model
type EmotionalFlow = 'neutral' | 'rising' | 'peaking' | 'receptive';

const SchaubergerLucieAssistant = ({ 
  initiallyOpen = false, 
  customInitialMessage, 
  onClose 
}: SchaubergerLucieAssistantProps) => {
  const { user } = useAuth();
  
  const {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
    handleSuggestedActionClick,
    handleCardActionClick
  } = useLucieAssistant();
  
  // Connection to HERMES insights
  const { insights, recordAICompanionInteraction } = useHermesInsights(user?.id);
  
  // Schauberger flow state
  const [emotionalFlow, setEmotionalFlow] = useState<EmotionalFlow>('neutral');
  const [vortexStrength, setVortexStrength] = useState<number>(0);
  const [systemLoad, setSystemLoad] = useState<number>(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Set initial open state from props
  useEffect(() => {
    if (initiallyOpen) {
      toggleChat();
    }
  }, [initiallyOpen, toggleChat]);
  
  // Add custom initial message if provided
  useEffect(() => {
    if (customInitialMessage && messages.length === 1) {
      const customMessage: LucieMessage = {
        id: 'custom-' + Date.now(),
        role: 'assistant',
        content: customInitialMessage,
        timestamp: new Date()
      };
      
      // Replace the default welcome message with the custom one
      messages[0] = customMessage;
    }
  }, [customInitialMessage, messages]);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Schauberger flow analysis - determine emotional flow state
  useEffect(() => {
    // Only calculate if we have enough messages for a pattern
    if (messages.length < 3) return;
    
    // Get last 3 messages
    const recentMessages = messages.slice(-3);
    
    // Simple heuristic for emotional state based on message content
    const detectEmotionalState = (): EmotionalFlow => {
      const userMessages = recentMessages.filter(m => m.role === 'user');
      
      // Check user's engagement level
      const avgMessageLength = userMessages.reduce((sum, m) => sum + m.content.length, 0) / userMessages.length;
      const hasQuestions = userMessages.some(m => m.content.includes('?'));
      const hasExclamations = userMessages.some(m => m.content.includes('!'));
      
      if (avgMessageLength > 30 && (hasQuestions || hasExclamations)) {
        return 'peaking';
      } else if (avgMessageLength > 20) {
        return 'rising';
      } else if (hasQuestions) {
        return 'receptive';
      }
      
      return 'neutral';
    };
    
    // Update state based on analysis
    setEmotionalFlow(detectEmotionalState());
    
    // Record interaction in HERMES system
    if (user?.id) {
      recordAICompanionInteraction('lucie', messages.length, {
        emotionalFlow: detectEmotionalState(),
        messageCount: messages.length
      });
    }
  }, [messages, user?.id, recordAICompanionInteraction]);
  
  // Apply Schauberger vortex principles - calculate system load and vortex strength
  useEffect(() => {
    // System health metrics from neural hub
    const healthMetrics = neuralHub.getHealthMetrics();
    setSystemLoad(healthMetrics.load * 100);
    
    // Calculate vortex strength based on user engagement and system metrics
    const engagement = emotionalFlow === 'neutral' ? 0.3 : 
                      emotionalFlow === 'rising' ? 0.6 :
                      emotionalFlow === 'peaking' ? 0.9 : 0.5;
    
    const userEngagementFactor = healthMetrics.userEngagement;
    const calculatedStrength = Math.min(engagement * userEngagementFactor * 100, 100);
    
    setVortexStrength(calculatedStrength);
  }, [emotionalFlow, messages]);
  
  // Enhanced message handling with Schauberger implosive logic
  const handleEnhancedSendMessage = useCallback((content: string) => {
    // Record message in system before sending
    if (user?.id) {
      // Apply Schauberger principles - only use advanced features when needed
      const useAdvancedFeatures = emotionalFlow === 'peaking' || emotionalFlow === 'rising';
      
      // Send message with appropriate parameters
      sendMessage(content);
      
      // Update the HERMES-OXUM system with this interaction
      neuralHub.applyBoostToContent(
        'user-message',
        'profile' as NeuralHubContentType,
        vortexStrength / 100, // Normalized vortex strength as base score
        undefined,
        undefined
      );
    } else {
      // Standard send for non-logged in users
      sendMessage(content);
    }
  }, [emotionalFlow, vortexStrength, user?.id, sendMessage]);

  return (
    <>
      {/* Floating button with Schauberger-inspired design */}
      <Button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 ${
          isOpen ? 'bg-gray-700' : `bg-primary`
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window with Schauberger flow indicators */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
          <LucieHeader onClose={isOpen ? toggleChat : onClose}>
            {user?.id && (
              <Badge 
                variant="outline" 
                className={`ml-2 ${
                  emotionalFlow === 'neutral' ? 'bg-blue-500/20' : 
                  emotionalFlow === 'rising' ? 'bg-yellow-500/20' : 
                  emotionalFlow === 'peaking' ? 'bg-red-500/20' :
                  'bg-green-500/20'
                }`}
              >
                {emotionalFlow}
              </Badge>
            )}
          </LucieHeader>
          
          <LucieMessageList 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            onSuggestedActionClick={handleSuggestedActionClick}
            onCardActionClick={handleCardActionClick}
          />
          
          {user?.id && vortexStrength > 70 && (
            <Card className="mx-4 mt-2 mb-1 bg-primary/10 border-primary/20">
              <CardContent className="p-2 text-xs flex items-center">
                <Activity size={14} className="mr-2" />
                <span>Enhanced interaction active</span>
              </CardContent>
            </Card>
          )}
          
          <LucieInputBox onSendMessage={handleEnhancedSendMessage} />
          <LucieTypingStyles />
        </div>
      )}
    </>
  );
};

// Typing animation styles
const LucieTypingStyles = () => (
  <style>
    {`
    .typing-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background-color: white;
      margin: 0 2px;
      animation: typing 1s infinite ease-in-out;
    }
    
    .typing-dot:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-dot:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typing {
      0%, 100% {
        transform: translateY(0);
        opacity: 0.5;
      }
      50% {
        transform: translateY(-5px);
        opacity: 1;
      }
    }
    `}
  </style>
);

export default SchaubergerLucieAssistant;
