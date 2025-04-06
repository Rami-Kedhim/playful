
import { useState } from 'react';
import { X, MessageCircle, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface LucieAssistantProps {
  initiallyOpen?: boolean;
  customInitialMessage?: string;
}

const LucieAssistant = ({ initiallyOpen = false, customInitialMessage }: LucieAssistantProps) => {
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: customInitialMessage || 'Hi there! I\'m Lucie, your personal UberEscorts assistant. How can I help you today?'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage
    };
    
    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);
    
    // Simulate Lucie's response
    setTimeout(() => {
      const lucieResponses = [
        "I'd be happy to help you verify your account! Verification is essential for using our secure features.",
        "Lucoin is our native token system that enables private transactions. You can purchase Lucoin in the wallet section.",
        "Route sharing is our E2E encrypted GPS feature that lets verified users share location data securely.",
        "All profiles on UberEscorts are verified real individuals - no fakes or bots allowed.",
        "I can guide you through the creator features if you'd like to monetize content on our platform.",
        "Your privacy and security are our top priorities. All data is encrypted and protected."
      ];
      
      const randomResponse = lucieResponses[Math.floor(Math.random() * lucieResponses.length)];
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsTyping(false);
    }, 1500);
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
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={toggleChat}>
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
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary/20 text-white'
                      : 'bg-white/5 text-white'
                  }`}
                >
                  {message.content}
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
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/10 bg-background/90 backdrop-blur-sm">
            <div className="flex gap-2">
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
              <Button onClick={handleSendMessage} className="shrink-0">Send</Button>
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
