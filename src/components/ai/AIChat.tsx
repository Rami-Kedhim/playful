import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2, Copy, Check, Lock, Coins } from 'lucide-react';
import { AIMessage } from '@/types/ai-messages';
import AIMessageComponent from './AIMessageComponent';
import { useAuth } from '@/hooks/auth';
import { useToast } from '@/components/ui/use-toast';
import { copyToClipboard } from '@/utils/clipboardUtils';
import { useAICompanion } from '@/hooks/ai-companion/useAICompanion';

interface AIChatProps {
  profileId: string;
  profileName: string;
  profileDescription: string;
  profileAvatar: string;
}

const AIChat: React.FC<AIChatProps> = ({ 
  profileId, 
  profileName, 
  profileDescription, 
  profileAvatar 
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { 
    conversation,
    messages, 
    sendMessage, 
    sendingMessage: isLoading, 
    loadingConversation: isInitialLoading,
    error, 
    refreshConversation: loadInitialMessages
  } = useAICompanion(profileId);
  
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  
  // Placeholder for subscription status and lucoin balance
  const subscriptionStatus = 'active';
  const lucoinBalance = 100; // Default value
  
  // Load initial messages
  useEffect(() => {
    loadInitialMessages();
  }, [loadInitialMessages]);
  
  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSend = async () => {
    if (!input.trim()) return;
    
    const success = await sendMessage(input);
    if (success) {
      setInput('');
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };
  
  const handleMessageUnlocked = useCallback(() => {
    loadInitialMessages();
  }, [loadInitialMessages]);
  
  const handleCopyToClipboard = (text: string) => {
    copyToClipboard(text);
    setCopied(true);
    toast({
      title: "Copied to clipboard!",
      description: "You can now paste this message anywhere.",
    });
    setTimeout(() => setCopied(false), 2000);
  };
  
  const renderUpgradePrompt = () => {
    if (subscriptionStatus === 'active') return null;
    
    return (
      <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-md">
        <p className="text-sm text-yellow-700">
          Unlock unlimited messaging with {profileName} by subscribing today!
        </p>
        <Button size="sm" className="mt-2">
          Upgrade Now
        </Button>
      </div>
    );
  };
  
  if (isInitialLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading Chat...</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={profileAvatar ? profileAvatar : '/default-avatar.png'} alt={profileName} />
            <AvatarFallback>{profileName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-0.5">
            <CardTitle className="text-sm font-medium">{profileName}</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              {profileDescription}
            </CardDescription>
          </div>
        </div>
        
        {lucoinBalance !== undefined && (
          <div className="flex items-center gap-2">
            <Coins className="h-4 w-4 text-yellow-500" />
            <span>{lucoinBalance} LC</span>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="p-0">
        <div 
          ref={chatContainerRef}
          className="h-[400px] overflow-y-auto px-4 py-2"
        >
          {messages.map((message) => (
            <AIMessageComponent 
              key={message.id} 
              message={message as AIMessage} 
              onMessageUnlocked={handleMessageUnlocked}
            />
          ))}
        </div>
      </CardContent>
      
      {renderUpgradePrompt()}
      
      <div className="p-4 flex items-center border-t">
        <Input
          placeholder={`Send a message to ${profileName}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mr-2"
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </div>
    </Card>
  );
};

export default AIChat;
