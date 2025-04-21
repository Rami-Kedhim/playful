
import { useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLucieAssistant } from '@/hooks/useLucieAssistant';
import LucieHeader from './lucie-assistant/LucieHeader';
import LucieMessageList from './lucie-assistant/LucieMessageList';
import LucieInputBox from './lucie-assistant/LucieInputBox';
import { useUserAIContext } from '@/hooks/useUserAIContext';

interface LucieAssistantProps {
  initiallyOpen?: boolean;
  customInitialMessage?: string;
  onClose?: () => void;
}

const LucieAssistant = ({ 
  initiallyOpen = false, 
  customInitialMessage, 
  onClose 
}: LucieAssistantProps) => {
  const {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
    clearMessages
  } = useLucieAssistant();

  const { aiContext, trackInteraction } = useUserAIContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Set initial open state from props
  useEffect(() => {
    if (initiallyOpen && !isOpen) {
      toggleChat();
    }
  }, [initiallyOpen, isOpen, toggleChat]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Set custom initial message if provided
  useEffect(() => {
    if (customInitialMessage && messages.length === 1) {
      const welcomeMessage = messages[0];
      if (welcomeMessage.role === 'assistant' && welcomeMessage.content.includes("I'm Lucie")) {
        clearMessages();
      }
    }
  }, [customInitialMessage, messages, clearMessages]);

  // Handle suggested action clicks
  const handleSuggestedActionClick = (action: string) => {
    sendMessage(action);
    
    // Track interaction for personalization
    if (aiContext) {
      trackInteraction(action);
    }
  };

  // Handle message send with tracking
  const handleSendMessage = (message: string) => {
    sendMessage(message);
    
    // Track interaction for personalization
    if (aiContext) {
      trackInteraction(message);
    }
  };

  // Determine if AI assistant should be disabled
  const isDisabled = aiContext ? !aiContext.isEnabled : false;

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 ${
          isOpen ? 'bg-gray-700' : 'bg-primary'
        }`}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && !isDisabled && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
          <LucieHeader 
            onClose={isOpen ? toggleChat : onClose} 
            onMinimize={toggleChat}
          />
          <LucieMessageList 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            onSuggestedActionClick={handleSuggestedActionClick}
          />
          <LucieInputBox onSendMessage={handleSendMessage} />
          <LucieTypingStyles />
        </Card>
      )}
      
      {/* Disabled state */}
      {isOpen && isDisabled && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 p-4">
          <h3 className="font-medium mb-2">AI Assistant Disabled</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You have disabled the AI assistant in your settings. 
            Enable it again in your profile settings.
          </p>
          <Button onClick={toggleChat} variant="outline" size="sm">
            Close
          </Button>
        </Card>
      )}
    </>
  );
};

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

export default LucieAssistant;
