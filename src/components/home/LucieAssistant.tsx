
import { useRef, useEffect } from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLucieAssistant } from '@/hooks/useLucieAssistant';
import LucieHeader from './lucie-assistant/LucieHeader';
import LucieMessageList from './lucie-assistant/LucieMessageList';
import LucieInputBox from './lucie-assistant/LucieInputBox';

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
  } = useLucieAssistant();

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

  // Handle suggested action clicks
  const handleSuggestedActionClick = (action: string) => {
    sendMessage(action);
  };

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={toggleChat}
        className={`fixed right-6 bottom-6 p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 ${
          isOpen ? 'bg-gray-700' : 'bg-primary'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </Button>

      {/* Chat window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
          <LucieHeader onClose={isOpen ? toggleChat : onClose} />
          <LucieMessageList 
            messages={messages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            onSuggestedActionClick={handleSuggestedActionClick}
          />
          <LucieInputBox onSendMessage={sendMessage} />
          <LucieTypingStyles />
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
