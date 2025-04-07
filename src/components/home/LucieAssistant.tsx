
import { useState, useRef, useEffect } from 'react';
import { X, MessageCircle, Sparkles, SendIcon, Image, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLucieAssistant, LucieMessage } from '@/hooks/useLucieAssistant';

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
    handleSuggestedActionClick
  } = useLucieAssistant();
  
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
      messages[0] = customMessage;
    }
  }, [customInitialMessage, messages]);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage('');
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
        <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
          {/* Header */}
          <div className="p-3 border-b border-white/10 bg-background/90 backdrop-blur-sm flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/lucie-avatar.png" />
              <AvatarFallback className="bg-primary/20 text-primary">L</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium flex items-center gap-1">
                Lucie <Sparkles className="h-3 w-3 text-primary" />
              </h3>
              <p className="text-xs text-gray-400">UberEscorts AI Assistant</p>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={isOpen ? toggleChat : onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary/20 text-white'
                      : 'bg-white/5 text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.content}</p>
                  
                  {/* Suggested Actions */}
                  {message.role === 'assistant' && message.suggestedActions && message.suggestedActions.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {message.suggestedActions.map((action, index) => (
                        <Button 
                          key={index} 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleSuggestedActionClick(action)}
                          className="text-xs py-1 h-auto"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  {/* Links */}
                  {message.role === 'assistant' && message.links && message.links.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.links.map((link, index) => (
                        <Card key={index} className="p-2 hover:bg-white/10 transition-colors">
                          <a 
                            href={link.url} 
                            className="flex items-center justify-between text-primary"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <span className="text-sm">{link.text}</span>
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[80%] p-3 rounded-lg bg-white/5 text-white flex items-center gap-1">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-background/90 backdrop-blur-sm">
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Image className="h-5 w-5" />
              </Button>
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask Lucie anything..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                className="bg-white/5"
              />
              <Button 
                onClick={handleSendMessage} 
                className="shrink-0"
                disabled={!inputMessage.trim()}
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

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
    </>
  );
};

export default LucieAssistant;
