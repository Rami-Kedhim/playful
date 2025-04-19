import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from 'lucide-react';
import { useAuth } from '@/hooks/auth/useAuth';
import { useToast } from '@/components/ui/use-toast';
import { AICompanionMessage } from '@/types/ai-companion';
import {
  fetchAICompanions,
  fetchAICompanionById,
  generateAICompanionContent,
  sendAICompanionMessage,
  getAICompanionContext
} from '@/services/aiCompanionService';
import { useAICompanions } from '@/hooks/useAICompanions';
import MainLayout from '@/components/layout/MainLayout';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface AICompanionChatMessageProps {
  message: AICompanionMessage;
}

const AICompanionChatMessage: React.FC<AICompanionChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full py-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`rounded-md p-2 text-sm max-w-[75%] ${isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'}`}>
        {message.content}
      </div>
    </div>
  );
};

const AICompanionChatInput: React.FC<{ onSendMessage: (message: string) => void }> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex items-center space-x-2 p-4">
      <Input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-grow rounded-md"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
      />
      <Button onClick={handleSendMessage}><Send className="h-4 w-4 mr-2" /> Send</Button>
    </div>
  );
};

const AICompanionChat: React.FC<{ companionId: string }> = ({ companionId }) => {
  const [messages, setMessages] = useState<AICompanionMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [companionName, setCompanionName] = useState("AI Companion");
  const [companionAvatar, setCompanionAvatar] = useState("");

  useEffect(() => {
    const loadInitialMessages = async () => {
      setLoading(true);
      try {
        const context = await getAICompanionContext(companionId);
        setMessages(context.messages);
        setCompanionName(context.name);
        setCompanionAvatar(context.avatar);
      } catch (err: any) {
        setError(err.message || 'Failed to load messages');
        toast({
          title: "Error loading messages",
          description: "Failed to load initial messages. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    loadInitialMessages();
  }, [companionId, toast]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (messageContent: string) => {
    if (!user) {
      toast({
        title: "Not authenticated",
        description: "You must be logged in to send messages.",
        variant: "destructive",
      });
      return;
    }

    const newMessage: AICompanionMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageContent,
      createdAt: new Date().toISOString(),
      aiCompanionId: companionId,
      userId: user.id
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);

    try {
      const aiResponse = await sendAICompanionMessage(companionId, messageContent);
      const aiMessage: AICompanionMessage = {
        id: Date.now().toString() + '-ai',
        role: 'assistant',
        content: aiResponse.content,
        createdAt: new Date().toISOString(),
        aiCompanionId: companionId,
        userId: 'ai'
      };
      setMessages(prevMessages => [...prevMessages, aiMessage]);
    } catch (err: any) {
      console.error("Error sending message:", err);
      toast({
        title: "Error sending message",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Avatar className="mr-2 h-8 w-8">
            <AvatarImage src={companionAvatar} alt={companionName} />
            <AvatarFallback>{companionName.substring(0, 2)}</AvatarFallback>
          </Avatar>
          {companionName}
        </CardTitle>
      </CardHeader>
      <CardContent className="overflow-y-auto flex-grow" ref={chatContainerRef}>
        {loading && <Skeleton className="h-5 w-40" />}
        {error && <p className="text-red-500">Error: {error}</p>}
        {messages.map(message => (
          <AICompanionChatMessage key={message.id} message={message} />
        ))}
      </CardContent>
      <CardFooter>
        <AICompanionChatInput onSendMessage={handleSendMessage} />
      </CardFooter>
    </Card>
  );
};

const AICompanionList: React.FC = () => {
  const { aiCompanions, loading, error } = useAICompanions();

  if (loading) return <p>Loading AI Companions...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {aiCompanions?.map(companion => (
        <Card key={companion.id}>
          <CardHeader>
            <CardTitle>{companion.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{companion.description}</p>
          </CardContent>
          <CardFooter>
            <Button asChild><a href={`/ai-companions/${companion.id}`}>Chat</a></Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

const AICompanionIndex: React.FC = () => {
  const [searchParams] = useSearchParams();
  const companionId = searchParams.get('companionId');

  return (
    <MainLayout>
      <div className="container mx-auto py-10">
        <h1 className="text-3xl font-semibold mb-6">AI Companions</h1>
        <Separator className="mb-4" />

        {companionId ? (
          <AICompanionChat companionId={companionId} />
        ) : (
          <AICompanionList />
        )}
      </div>
    </MainLayout>
  );
};

export default AICompanionIndex;
