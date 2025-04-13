
import React, { useState, useEffect, useRef } from 'react';
import { useChat } from '@/hooks/useChat';
import { useAuth } from '@/hooks/auth/useAuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, User, ArrowLeftCircle } from 'lucide-react';
import { Conversation } from '@/types/messaging';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton'; // Fix import from skeleton instead of scroll-area
import { format } from 'date-fns';

interface ChatInterfaceProps {
  initialConversationId?: string;
  recipientId?: string;
  onClose?: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  initialConversationId,
  recipientId,
  onClose
}) => {
  const { user } = useAuth();
  const { 
    conversations, 
    messages, 
    activeConversation, 
    setActiveConversation, 
    sendMessage, 
    createConversation, 
    isLoading 
  } = useChat(initialConversationId);
  
  const [newMessage, setNewMessage] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showConversations, setShowConversations] = useState(!initialConversationId);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Initialize conversation if recipientId is provided
  useEffect(() => {
    if (recipientId && !initialConversationId && user?.id) {
      const initializeConversation = async () => {
        const conversation = await createConversation(recipientId);
        if (conversation) {
          setActiveConversation(conversation as Conversation);
          setShowConversations(false);
        }
      };
      
      initializeConversation();
    }
  }, [recipientId, user?.id, initialConversationId, createConversation]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const success = await sendMessage(newMessage);
    if (success) {
      setNewMessage('');
    }
  };

  const handleConversationSelect = (conversation: Conversation) => {
    setActiveConversation(conversation);
    setShowConversations(false);
  };
  
  const handleBackToConversations = () => {
    if (isMobile) {
      setShowConversations(true);
    }
  };
  
  // Show full view on larger screens, otherwise show one panel at a time
  const shouldShowConversations = !isMobile || showConversations;
  const shouldShowMessages = !isMobile || (!showConversations && activeConversation);

  return (
    <div className="flex h-[70vh] w-full border rounded-lg overflow-hidden">
      {shouldShowConversations && (
        <div className="w-full md:w-1/3 border-r bg-muted/30">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Conversations</h3>
          </div>
          
          <ScrollArea className="h-[calc(70vh-57px)]">
            {isLoading ? (
              <div className="space-y-2 p-3">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : conversations.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground">
                <p>No conversations yet</p>
                <p className="text-sm">Start a new chat to connect</p>
              </div>
            ) : (
              <div>
                {conversations.map(conversation => {
                  const otherUser = conversation.otherParticipant;
                  const lastMessage = conversation.messages?.[0];
                  
                  return (
                    <div 
                      key={conversation.id}
                      className={`p-3 cursor-pointer hover:bg-muted flex items-center space-x-3 ${
                        activeConversation?.id === conversation.id ? 'bg-muted' : ''
                      }`}
                      onClick={() => handleConversationSelect(conversation)}
                    >
                      <Avatar>
                        <AvatarImage src={otherUser?.avatar_url || ''} alt={otherUser?.username || 'User'} />
                        <AvatarFallback>
                          {otherUser?.username?.[0].toUpperCase() || <User size={18} />}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 overflow-hidden">
                        <div className="flex items-center justify-between">
                          <p className="font-medium truncate">
                            {otherUser?.username || otherUser?.full_name || 'User'}
                          </p>
                          {lastMessage?.created_at && (
                            <span className="text-xs text-muted-foreground">
                              {format(new Date(lastMessage.created_at), 'MMM d')}
                            </span>
                          )}
                        </div>
                        {lastMessage && (
                          <p className="text-sm text-muted-foreground truncate">
                            {lastMessage.content}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      )}
      
      {shouldShowMessages && (
        <div className="w-full md:w-2/3 flex flex-col">
          {/* Chat header */}
          <div className="p-3 border-b flex items-center">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="mr-2"
                onClick={handleBackToConversations}
              >
                <ArrowLeftCircle size={20} />
              </Button>
            )}
            
            {activeConversation?.otherParticipant ? (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage 
                    src={activeConversation.otherParticipant.avatar_url || ''} 
                    alt={activeConversation.otherParticipant.username || 'User'} 
                  />
                  <AvatarFallback>
                    {activeConversation.otherParticipant.username?.[0].toUpperCase() || <User size={16} />}
                  </AvatarFallback>
                </Avatar>
                <span className="font-semibold">
                  {activeConversation.otherParticipant.username || 
                   activeConversation.otherParticipant.full_name || 'User'}
                </span>
              </div>
            ) : (
              <span className="font-semibold">Conversation</span>
            )}
            
            {onClose && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="ml-auto"
                onClick={onClose}
              >
                Close
              </Button>
            )}
          </div>
          
          {/* Messages */}
          <ScrollArea className="flex-1 p-3">
            {isLoading ? (
              <div className="space-y-4">
                {Array(5).fill(0).map((_, i) => (
                  <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : ''}`}>
                    <div className={`max-w-[80%] ${i % 2 === 0 ? 'bg-primary/20' : 'bg-muted'} rounded-lg p-3`}>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-48" />
                    </div>
                  </div>
                ))}
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center text-center text-muted-foreground">
                <div>
                  <p>No messages yet</p>
                  <p className="text-sm">Send a message to start the conversation</p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {messages.map((message) => {
                  const isCurrentUser = message.sender_id === user?.id;
                  
                  return (
                    <div key={message.id} className={`flex ${isCurrentUser ? 'justify-end' : ''}`}>
                      {!isCurrentUser && (
                        <Avatar className="h-8 w-8 mr-2 mt-1">
                          <AvatarImage 
                            src={message.sender?.avatar_url || ''} 
                            alt={message.sender?.username || 'User'} 
                          />
                          <AvatarFallback>
                            {message.sender?.username?.[0].toUpperCase() || <User size={16} />}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          isCurrentUser 
                            ? 'bg-primary text-primary-foreground rounded-br-none' 
                            : 'bg-muted rounded-bl-none'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        <p className={`text-xs ${isCurrentUser ? 'text-primary-foreground/80' : 'text-muted-foreground'} mt-1`}>
                          {format(new Date(message.created_at), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </ScrollArea>
          
          {/* Message input */}
          <form onSubmit={handleSendMessage} className="p-3 border-t flex gap-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon" disabled={!newMessage.trim()}>
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatInterface;
