
import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { lucie } from '@/core/Lucie';
import { logInteraction } from '@/utils/uberCore';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { MessageSquare, Clock, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

// Mock conversation data
const mockConversations = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Sophie',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256&h=256&fit=crop&crop=entropy',
      online: true,
      verified: true
    },
    lastMessage: {
      text: 'Hey, are you available this evening?',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    }
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Victoria',
      avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=256&h=256&fit=crop&crop=entropy',
      online: false,
      verified: true
    },
    lastMessage: {
      text: 'Thanks for the great time yesterday!',
      timestamp: new Date(Date.now() - 86400000),
      read: false
    }
  },
  {
    id: '3',
    user: {
      id: 'user3',
      name: 'Isabella',
      avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=256&h=256&fit=crop&crop=entropy',
      online: true,
      verified: true
    },
    lastMessage: {
      text: 'Looking forward to meeting you',
      timestamp: new Date(Date.now() - 172800000),
      read: true
    }
  },
  {
    id: '4',
    user: {
      id: 'aicompanion1',
      name: 'Aria (AI)',
      avatar: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=256&h=256&fit=crop&crop=entropy',
      online: true,
      verified: false,
      isAI: true
    },
    lastMessage: {
      text: 'I miss our conversations. How are you doing today?',
      timestamp: new Date(Date.now() - 25000),
      read: false
    }
  }
];

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [conversations, setConversations] = useState(mockConversations);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadConversations = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would call the Lucie service
        // const conversations = await lucie.getConversations(userId);
        
        // For demo, use the mock data and add a delay
        setTimeout(() => {
          setConversations(mockConversations);
          setIsLoading(false);
        }, 1000);
        
        // Log this interaction with Hermes
        logInteraction('MessagesPage', 'loadConversations');
      } catch (error) {
        console.error('Error loading conversations:', error);
        setIsLoading(false);
      }
    };

    loadConversations();
  }, []);

  const filteredConversations = conversations.filter(conv => {
    // Filter by search query
    if (searchQuery && !conv.user.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Filter by active tab
    if (activeTab === 'ai' && !conv.user.isAI) {
      return false;
    }
    if (activeTab === 'human' && conv.user.isAI) {
      return false;
    }
    
    return true;
  });

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffHours < 48) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <PageLayout 
      title="Messages" 
      subtitle="Your conversations with escorts, clients, and AI companions">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Conversation List */}
        <Card className="md:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                <span>Conversations</span>
              </CardTitle>
              <div className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                {filteredConversations.length} chat{filteredConversations.length !== 1 ? 's' : ''}
              </div>
            </div>
            <CardDescription>
              Your recent message exchanges
            </CardDescription>
            
            <div className="mt-2 relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-9" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="human">Human</TabsTrigger>
                <TabsTrigger value="ai">AI</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          
          <CardContent className="px-0 py-0">
            {isLoading ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>Loading conversations...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <p>No conversations found</p>
                <Button variant="link" className="mt-2">Start a new conversation</Button>
              </div>
            ) : (
              <ScrollRevealGroup 
                animation="fade-up" 
                staggerDelay={0.05}
                containerClassName="divide-y"
              >
                {filteredConversations.map((conversation) => (
                  <ScrollReveal key={conversation.id}>
                    <div 
                      className="px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => logInteraction('MessagesPage', 'selectConversation', { conversationId: conversation.id })}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                            <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {conversation.user.online && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                          )}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium truncate">
                              {conversation.user.name}
                              {conversation.user.isAI && (
                                <span className="ml-1 text-xs text-purple-500 font-normal">(AI)</span>
                              )}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {formatMessageTime(conversation.lastMessage.timestamp)}
                            </span>
                          </div>
                          
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage.text}
                            </p>
                            {!conversation.lastMessage.read && (
                              <div className="h-2 w-2 rounded-full bg-blue-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </ScrollRevealGroup>
            )}
          </CardContent>
        </Card>
        
        {/* Right Column - Selected Conversation or Empty State */}
        <Card className="md:col-span-2">
          <CardContent className="p-0 h-[600px] flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center gap-4 max-w-xs">
              <div className="p-5 rounded-full bg-muted/50">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-medium text-xl">No Conversation Selected</h3>
              <p className="text-sm text-muted-foreground">
                Select a conversation from the list to view your messages or start a new conversation.
              </p>
              <Button className="mt-2 w-full">
                Start New Conversation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mt-8">
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <CardTitle>Safe Messaging Guidelines</CardTitle>
          </div>
          <CardDescription>
            Important information for your safety
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>
            UberEscorts messaging system uses Lucie AI to monitor and ensure safe communication between users. 
            Here are some guidelines to follow when using our messaging platform:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-foreground">Privacy Protection</h4>
              <p>Never share personal identification documents, banking details or home address through messages.</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-foreground">Meeting Safely</h4>
              <p>Arrange initial meetings in public places and inform someone you trust about your plans.</p>
            </div>
            <div className="border rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-foreground">Report Issues</h4>
              <p>If you encounter inappropriate behavior, use the report button to alert our moderation team.</p>
            </div>
          </div>
          
          <p className="italic">
            Note: All communications on this platform are monitored by Lucie AI for safety and moderation. 
            Messages containing threats, harassment, or illegal content will be flagged and may result in account suspension.
          </p>
        </CardContent>
      </Card>
    </PageLayout>
  );
};

export default MessagesPage;
