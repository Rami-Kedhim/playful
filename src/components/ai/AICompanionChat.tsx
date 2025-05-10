import React, { useState, useEffect } from 'react';
import { Avatar } from '@/components/ui/avatar';
import { AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from '@/hooks/use-toast';
import { lucieAI, lucieOrchestrator } from '@/core';

interface AICompanionChatProps {
  companionId: string;
  name: string;
  avatar: string;
  greeting: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const AICompanionChat: React.FC<AICompanionChatProps> = ({ 
  companionId,
  name,
  avatar,
  greeting,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load initial greeting message
    setMessages([{ 
      id: 'greeting', 
      role: 'assistant', 
      content: greeting 
    }]);
  }, [greeting]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;
    
    try {
      setIsSending(true);
      // Add user message to chat
      const userMessage = { 
        id: Date.now().toString(), 
        role: 'user', 
        content: content 
      };
      setMessages(prevMessages => [...prevMessages, userMessage]);

      if (lucieOrchestrator && typeof lucieOrchestrator.isSafeContent === 'function') {
        const safeCheck = await lucieOrchestrator.isSafeContent(content);
        if (!safeCheck.safe) {
          toast({
            title: "Content Warning",
            description: "Your message was flagged as potentially unsafe and was not sent.",
            variant: "destructive"
          });
          return;
        }
      }

      // Generate a response using the AI service
      const params = {
        prompt: content,
        maxTokens: 500
      };
      
      const response = await lucieAI.generateContent(params);
      const responseContent: string = response.text || response.content || "I'm not sure how to respond to that.";
      
      // Add assistant message to chat
      const assistantMessage = { 
        id: Date.now().toString(), 
        role: 'assistant', 
        content: responseContent 
      };
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSending(false);
      setInput('');
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="py-4">
        <div className="flex items-center">
          <Avatar className="mr-3 h-8 w-8">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback>{name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <h2 className="text-lg font-semibold">{name}</h2>
        </div>
      </CardHeader>
      <CardContent className="flex-1 overflow-y-auto">
        <ScrollArea className="h-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col text-sm ${
                  message.role === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`rounded-md px-3 py-2 inline-block ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="py-4">
        <div className="flex items-center w-full">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="mr-2"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !isSending) {
                handleSendMessage(input);
              }
            }}
          />
          <Button
            onClick={() => handleSendMessage(input)}
            disabled={isSending}
          >
            {isSending ? 'Sending...' : <Send className="h-4 w-4 mr-2" />}
            Send
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AICompanionChat;
