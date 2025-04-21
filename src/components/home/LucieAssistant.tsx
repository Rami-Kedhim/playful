
import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Sparkles, SendIcon, Image, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLucieAssistant, LucieMessage } from '@/hooks/useLucieAssistant';
import LucieHeader from './lucie-assistant/LucieHeader';
import LucieMessageList from './lucie-assistant/LucieMessageList';
import LucieInputBox from './lucie-assistant/LucieInputBox';
import LucieTypingIndicator from './lucie-assistant/LucieTypingIndicator';

interface LucieAssistantProps {
  initiallyOpen?: boolean;
  customInitialMessage?: string;
  onClose?: () => void;
}

const LucieAssistant = ({ initiallyOpen = false, customInitialMessage, onClose }: LucieAssistantProps) => {
  const {
    messages,
    isTyping,
    isOpen,
    sendMessage,
    toggleChat,
  } = useLucieAssistant();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Fix: get both messages and setMessages
  const [localMessages, setLocalMessages] = useState<LucieMessage[]>([]);
  
  // Set initial open state from props
  useEffect(() => {
    if (initiallyOpen) {
      toggleChat();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      setLocalMessages(prevMessages => {
        if (prevMessages.length === 1) {
          return [customMessage];
        }
        return prevMessages;
      });
    } else {
      // If no custom message or messages length changed, sync localMessages to messages
      setLocalMessages(messages);
    }
  }, [customInitialMessage, messages]);

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [localMessages, isTyping]);

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
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
          <LucieHeader onClose={isOpen ? toggleChat : onClose} />
          <LucieMessageList 
            messages={localMessages} 
            isTyping={isTyping}
            messagesEndRef={messagesEndRef}
            onSuggestedActionClick={() => {}} // Removed reference to missing function
          />
          <LucieInputBox onSendMessage={sendMessage} />
          <LucieTypingStyles />
        </div>
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

