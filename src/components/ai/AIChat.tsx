
import React, { useEffect, useRef, useState } from 'react';
import { useAIMessaging, AIMessage } from '@/hooks/useAIMessaging';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Send, Coins, Image, X, MessageSquare, Info } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { UserProfile } from '@/types/auth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

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
    simulatingTyping,
    generatingImage,
    initializeConversation,
    sendMessage,
    processPayment,
    generateAIImage
  } = useAIMessaging({ profileId, conversationId });
  
  const [inputValue, setInputValue] = useState('');
  const [showImagePrompt, setShowImagePrompt] = useState(false);
  const [imagePrompt, setImagePrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
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
  }, [messages, simulatingTyping]);
  
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

  const handleGenerateImage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imagePrompt.trim()) return;
    
    const imageUrl = await generateAIImage(imagePrompt);
    if (imageUrl) {
      setGeneratedImage(imageUrl);
      // Add a system message about the image generation
      sendMessage(`I generated an image for you based on: "${imagePrompt}"`);
      setImagePrompt('');
      setShowImagePrompt(false);
    }
  };

  const getPersonalityBadge = () => {
    if (!profile?.personality?.type) return null;
    
    const type = profile.personality.type;
    let color;
    
    switch(type) {
      case 'flirty':
        color = 'bg-pink-500 hover:bg-pink-700';
        break;
      case 'shy':
        color = 'bg-purple-500 hover:bg-purple-700';
        break;
      case 'dominant':
        color = 'bg-red-500 hover:bg-red-700';
        break;
      case 'playful':
        color = 'bg-blue-500 hover:bg-blue-700';
        break;
      default:
        color = 'bg-slate-500 hover:bg-slate-700';
    }
    
    return (
      <Badge className={`${color} capitalize`}>
        {type}
      </Badge>
    );
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
                <AvatarFallback>{profile?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium">{profile?.name}</h3>
                  {getPersonalityBadge()}
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="outline" className="cursor-help">
                          <Info className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">This is an AI-generated profile. The conversations are powered by artificial intelligence.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <p className="text-xs text-muted-foreground">{profile?.location}</p>
              </div>
            </div>
            
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
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
                  <Skeleton className="h-4 w-[120px]" />
                  <Skeleton className="h-4 w-[80px] mt-2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isUser = !message.is_ai;
              const messageCreatedAt = message.created_at ? new Date(message.created_at) : message.timestamp;
              
              return (
                <div key={message.id} className={`flex ${isUser ? 'justify-end' : ''}`}>
                  {!isUser && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                      <AvatarFallback>{profile?.name?.charAt(0) || 'A'}</AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'} rounded-lg p-3`}>
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    
                    {/* Display generated image if this message mentions it */}
                    {message.content.includes("generated an image") && generatedImage && (
                      <div className="mt-2">
                        <img 
                          src={generatedImage} 
                          alt="AI Generated" 
                          className="w-full rounded-md" 
                        />
                      </div>
                    )}
                    
                    <p className={`text-xs mt-1 ${isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                      {formatDistanceToNow(messageCreatedAt, { addSuffix: true })}
                    </p>
                    
                    {message.requires_payment && message.payment_status === 'pending' && (
                      <Button 
                        className="mt-2 w-full"
                        size="sm"
                        onClick={handlePurchaseResponse}
                      >
                        <Coins className="w-4 h-4 mr-2" />
                        Continue chatting ({message.price || 5} LC)
                      </Button>
                    )}
                  </div>
                  
                  {isUser && (
                    <Avatar className="h-8 w-8 ml-2 mt-1">
                      <AvatarImage src={userProfile?.avatarUrl} alt={userProfile?.username || 'User'} />
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
                  <AvatarFallback>{profile?.name?.charAt(0) || 'A'}</AvatarFallback>
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
            
            {simulatingTyping && (
              <div className="flex">
                <Avatar className="h-8 w-8 mr-2 mt-1">
                  <AvatarImage src={profile?.avatar_url} alt={profile?.name} />
                  <AvatarFallback>{profile?.name?.charAt(0) || 'A'}</AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '200ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <CardFooter className="p-4 border-t flex-col gap-2">
        {!paymentRequired && (
          <div className="flex w-full justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowImagePrompt(true)}
              disabled={loading || sendingMessage || paymentRequired}
              className="text-xs"
            >
              <Image className="h-4 w-4 mr-1" />
              Request Image
            </Button>
            
            <p className="text-xs text-muted-foreground">
              {profile?.lucoin_chat_price ? `${profile.lucoin_chat_price} LC per message` : ''}
            </p>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            placeholder={paymentRequired ? "Purchase response to continue..." : "Type a message..."}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={loading || sendingMessage || paymentRequired || simulatingTyping}
            className="flex-1"
          />
          <Button 
            type="submit"
            disabled={loading || sendingMessage || paymentRequired || simulatingTyping || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>

      {/* Image Generation Dialog */}
      <Dialog open={showImagePrompt} onOpenChange={setShowImagePrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request an AI-generated image</DialogTitle>
            <DialogDescription>
              Describe what you'd like {profile?.name || 'the AI'} to generate for you. This will cost {profile?.lucoin_image_price || 10} Lucoins.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleGenerateImage} className="space-y-4">
            <Input
              placeholder="E.g., A sunset on a beautiful beach..."
              value={imagePrompt}
              onChange={(e) => setImagePrompt(e.target.value)}
              disabled={generatingImage}
            />
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowImagePrompt(false)}
                disabled={generatingImage}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={generatingImage || !imagePrompt.trim()}
              >
                {generatingImage ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Image className="mr-2 h-4 w-4" />
                    Generate ({profile?.lucoin_image_price || 10} LC)
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AIChat;
