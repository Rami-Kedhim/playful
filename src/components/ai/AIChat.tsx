
import React, { useEffect, useRef, useState } from 'react';
import { useAIMessaging } from '@/hooks/useAIMessaging';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';
import { Send, Coins } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { UserProfile } from '@/types/auth';

interface AIChatProps {
  profileId: string;
  conversationId?: string;
  userProfile?: UserProfile;
  onClose?: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ 
  profileId, 
  conversationId, 
  userProfile, 
  onClose 
}) => {
  const {
    loading,
    sendingMessage,
    profile,
    messages,
    error,
    paymentRequired,
    paymentMessage,
    initializeConversation,
    sendMessage,
    processPayment
  } = useAIMessaging({ profileId, conversationId });
  
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    initializeConversation();
  }, [initializeConversation]);
  
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
    }
  }, [error, toast]);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputValue.trim()) return;
    
    sendMessage(inputValue);
    setInputValue('');
  };
  
  const handlePurchaseResponse = () => {
    if (paymentRequired) {
      processPayment();
    }
  };
  
  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="px-4 py-3 border-b">
        {loading && !profile ? (
          <div className="flex items-center space-x-3">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{profile?.name}</h3>
                <p className="text-xs text-muted-foreground">{profile?.location}</p>
              </div>
            </div>
            
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      
      <ScrollArea className="flex-1 p-4">
        {loading && messages.length === 0 ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className={`flex ${i % 2 === 0 ? 'justify-end' : ''}`}>
                <div className={`max-w-[80%] ${i % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                  <Skeleton className={`h-4 w-[${Math.random() * 150 + 50}px]`} />
                  <Skeleton className={`h-4 w-[${Math.random() * 100 + 30}px] mt-2`} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isUser = !message.is_ai;
              
              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : ''}`}>
                  {!isUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                      <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {formatDistanceToNow(new Date(message.created_at), { addSuffix: true })}
                    </p>
                    
                    {message.requires_payment && message.payment_status === 'pending' && (
                      <Button 
                        className="mt-2 w-full"
                        size="sm"
                        onClick={handlePurchaseResponse}
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Continue chatting ({message.price} LC)
                      </Button>
                    )}
                  </div>
                  
                  {isUser && (
                    <Avatar className="h-8 w-8 ml-2 mt-1">
                      <AvatarImage src={userProfile?.avatar_url} alt={userProfile?.username || 'User'} />
                      <AvatarFallback>{userProfile?.username?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              );
            })}
            
            {sendingMessage && (
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback>{profile?.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '600ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <CardFooter className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder={paymentRequired ? "Purchase response to continue..." : "Type a message..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading || sendingMessage || paymentRequired}
            className="flex-1"
          />
          <Button 
            type="submit"
            disabled={loading || sendingMessage || paymentRequired || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
};

export default AIChat;
