
import { useRef, useEffect, useState } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLucieAssistant } from '@/hooks/useLucieAssistant';
import LucieHeader from './lucie-assistant/LucieHeader';
import LucieMessageList from './lucie-assistant/LucieMessageList';
import LucieInputBox from './lucie-assistant/LucieInputBox';
import LucieConfetti from './lucie-assistant/LucieConfetti';
import { useUserAIContext } from '@/hooks/useUserAIContext';
import AICompanionChatStyles from '@/components/ai/companion-chat/AICompanionChatStyles';

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
  const [celebration, setCelebration] = useState(false);
  const [celebrationTrigger, setCelebrationTrigger] = useState(0); // Counter to trigger celebrations
  
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
      if (welcomeMessage && welcomeMessage.role === 'assistant' && welcomeMessage.content.includes("I'm Lucie")) {
        // Only clear once to prevent infinite loop
        const shouldClear = welcomeMessage.content !== customInitialMessage;
        if (shouldClear) {
          clearMessages();
        }
      }
    }
  }, [customInitialMessage, messages, clearMessages]);
  
  // Check for celebratory messages with more sophisticated detection
  useEffect(() => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant') {
        // List of positive indicators that should trigger celebration
        const positiveIndicators = [
          'successfully', 'great news', 'congratulations', 'completed', 
          'welcome aboard', 'thank you', 'well done', 'perfect', 'excellent', 
          'awesome', 'amazing', 'fantastic', 'wonderful', 'bravo', 'brilliant',
          'outstanding', 'superb', 'impressive'
        ];
        
        // Check for positive phrases or exclamation marks with positive words
        const content = lastMessage.content.toLowerCase();
        const hasPositiveIndicator = positiveIndicators.some(phrase => content.includes(phrase));
        const hasExcitedTone = content.includes('!') && 
          (content.includes('great') || content.includes('good') || content.includes('love'));
        
        // Check for celebratory emojis
        const celebrationEmojis = ['🎉', '🎊', '🥳', '👏', '✨', '🙌'];
        const hasEmoji = celebrationEmojis.some(emoji => lastMessage.content.includes(emoji));
        
        if (hasPositiveIndicator || hasExcitedTone || hasEmoji) {
          setCelebration(true);
          setCelebrationTrigger(prev => prev + 1); // Increment to trigger animation
          
          // Reset celebration after a delay
          setTimeout(() => setCelebration(false), 4000);
        }
      }
    }
  }, [messages]);

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
      <AICompanionChatStyles />

      {/* Enhanced Floating button with pulse effect */}
      <Button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 transition-transform duration-300 hover:scale-105 ${
          isOpen ? 'bg-gray-700' : 'bg-primary animate-pulse-glow'
        }`}
        aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} className="animate-float" />}
      </Button>

      {/* Chat window */}
      {isOpen && !isDisabled && (
        <Card 
          className={`fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col animate-fade-in ${
            celebration ? 'animate-pop' : ''
          }`}
          key={`chat-window-${celebrationTrigger}`} // Re-render on celebration for animations
        >
          <LucieHeader 
            onClose={onClose || toggleChat} 
            onMinimize={toggleChat}
            showAnimation={true}
          />
          <LucieMessageList 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            onSuggestedActionClick={handleSuggestedActionClick}
          />
          <LucieInputBox onSendMessage={handleSendMessage} />
            
          {celebration && (
            <LucieConfetti 
              show={celebration} 
              onComplete={() => setCelebration(false)} 
            />
          )}
        </Card>
      )}
      
      {/* Disabled state */}
      {isOpen && isDisabled && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 p-4 animate-fade-in">
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

export default LucieAssistant;
