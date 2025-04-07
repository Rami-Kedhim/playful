
import { useState, useRef, useEffect } from 'react';
import { Send, Image, Smile, Sparkles, X, ArrowRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAICompanionConversation, CompanionMessage } from '@/hooks/useAICompanionConversation';
import { Skeleton } from '@/components/ui/skeleton';

interface AICompanionChatProps {
  companionId: string;
  initiallyOpen?: boolean;
  onClose?: () => void;
}

const AICompanionChat = ({ companionId, initiallyOpen = true, onClose }: AICompanionChatProps) => {
  const {
    messages,
    isTyping,
    isLoading,
    companion,
    sendMessage,
    handleSuggestedActionClick
  } = useAICompanionConversation({ companionId });
  
  const [inputMessage, setInputMessage] = useState('');
  const [isOpen, setIsOpen] = useState(initiallyOpen);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleClose = () => {
    setIsOpen(false);
    if (onClose) onClose();
  };

  // Helper function to get emotion avatar class
  const getEmotionClass = (emotion: string | null | undefined) => {
    if (!emotion) return '';
    
    switch (emotion.toLowerCase()) {
      case 'happy':
        return 'bg-gradient-to-br from-yellow-400 to-orange-300';
      case 'thoughtful':
        return 'bg-gradient-to-br from-blue-400 to-purple-300';
      case 'concerned':
        return 'bg-gradient-to-br from-amber-400 to-orange-400';
      case 'excited':
        return 'bg-gradient-to-br from-pink-400 to-red-300';
      case 'calm':
        return 'bg-gradient-to-br from-green-400 to-cyan-300';
      case 'confused':
        return 'bg-gradient-to-br from-gray-400 to-slate-300';
      default:
        return 'bg-gradient-to-br from-violet-400 to-indigo-300';
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed right-6 bottom-6 p-3 w-14 h-14 flex items-center justify-center rounded-full shadow-lg z-50 bg-primary"
      >
        <Sparkles size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed bottom-24 right-6 w-80 sm:w-96 h-[550px] bg-background border border-white/10 rounded-xl shadow-xl overflow-hidden z-50 flex flex-col">
      {/* Header */}
      <div className="p-3 border-b border-white/10 bg-background/90 backdrop-blur-sm flex items-center gap-3">
        {isLoading ? (
          <>
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32 mt-1" />
            </div>
          </>
        ) : (
          <>
            <Avatar className={`${companion?.emotion ? getEmotionClass(companion.emotion) : ''} transition-all duration-500`}>
              <AvatarImage src={companion?.avatarUrl || "/ai-avatar.png"} />
              <AvatarFallback className="bg-primary/20 text-primary">
                {companion?.name?.[0] || 'AI'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-medium flex items-center gap-1">
                {companion?.name || 'AI Companion'} <Sparkles className="h-3 w-3 text-primary" />
              </h3>
              <p className="text-xs text-gray-400">AI Companion</p>
            </div>
          </>
        )}
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isLoading ? (
          <>
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <Skeleton className="h-10 w-48" />
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[80%]">
                <Skeleton className="h-6 w-32" />
              </div>
            </div>
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <Skeleton className="h-16 w-56" />
              </div>
            </div>
          </>
        ) : (
          messages.map((message) => (
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
                    : message.emotion 
                      ? `${getEmotionClass(message.emotion)} text-white bg-opacity-80`
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
                        className="text-xs py-1 h-auto bg-black/30 hover:bg-black/40 border-white/20"
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

                {/* Display emotion as a badge */}
                {message.role === 'assistant' && message.emotion && (
                  <Badge variant="outline" className="mt-2 text-xs opacity-60">
                    {message.emotion}
                  </Badge>
                )}
              </div>
            </div>
          ))
        )}
        
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
          <Button variant="ghost" size="icon" className="shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Message ${companion?.name || 'AI'}...`}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="bg-white/5"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSendMessage} 
            className="shrink-0"
            disabled={!inputMessage.trim() || isLoading}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>

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
    </div>
  );
};

export default AICompanionChat;
