
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Users, Search, Send, MoreHorizontal, CheckCircle, Clock, Robot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Escort } from '@/types/Escort';

// Mock data for conversations with escorts
interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    imageUrl: string;
    isVerified?: boolean;
    isAI?: boolean;
  };
  lastMessage: {
    text: string;
    timestamp: Date;
    isRead: boolean;
    sender: 'user' | 'other';
  };
  unreadCount: number;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    user: {
      id: '1',
      name: 'Sophia',
      imageUrl: 'https://i.pravatar.cc/300?img=1',
      isVerified: true
    },
    lastMessage: {
      text: 'Looking forward to our dinner tomorrow at 8pm!',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      isRead: true,
      sender: 'other'
    },
    unreadCount: 0
  },
  {
    id: '2',
    user: {
      id: '3',
      name: 'Emma',
      imageUrl: 'https://i.pravatar.cc/300?img=9',
      isVerified: true
    },
    lastMessage: {
      text: 'I sent you the details about the event. Let me know if you have any questions!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      isRead: false,
      sender: 'other'
    },
    unreadCount: 2
  },
  {
    id: '3',
    user: {
      id: '5',
      name: 'Olivia',
      imageUrl: 'https://i.pravatar.cc/300?img=20',
      isVerified: true
    },
    lastMessage: {
      text: 'Thanks for the lovely evening. I had a great time!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
      isRead: true,
      sender: 'other'
    },
    unreadCount: 0
  },
  {
    id: '4',
    user: {
      id: '101',
      name: 'Aria (AI)',
      imageUrl: 'https://i.pravatar.cc/300?img=25',
      isAI: true
    },
    lastMessage: {
      text: 'Is there anything specific you'd like to talk about today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      isRead: true,
      sender: 'other'
    },
    unreadCount: 0
  }
];

// Mock messages for a conversation
interface Message {
  id: string;
  text: string;
  timestamp: Date;
  sender: 'user' | 'other';
  isRead: boolean;
}

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '101',
      text: 'Hello! I'm interested in booking you for a dinner date next week.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 26), // 26 hours ago
      sender: 'user',
      isRead: true
    },
    {
      id: '102',
      text: 'Hi there! I'd be delighted to join you for dinner. Which day were you thinking?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 25), // 25 hours ago
      sender: 'other',
      isRead: true
    },
    {
      id: '103',
      text: 'How about Thursday at 8pm? Do you have a preference for the restaurant?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours ago
      sender: 'user',
      isRead: true
    },
    {
      id: '104',
      text: 'Thursday works perfectly for me! I love Italian cuisine, but I'm open to any suggestions you might have.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23), // 23 hours ago
      sender: 'other',
      isRead: true
    },
    {
      id: '105',
      text: 'Great! I made a reservation at Bella Vita on 5th Avenue. They have amazing Italian food.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22), // 22 hours ago
      sender: 'user',
      isRead: true
    },
    {
      id: '106',
      text: 'Perfect choice! I've been there before and love their pasta. Looking forward to our dinner tomorrow at 8pm!',
      timestamp: new Date(Date.now() - 1000 * 60 * 25), // 25 minutes ago
      sender: 'other',
      isRead: true
    }
  ]
};

const MessagesPage = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(mockConversations[0]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = mockConversations.filter(conversation => {
    // Filter by tab
    if (activeTab === 'escorts' && conversation.user.isAI) return false;
    if (activeTab === 'ai' && !conversation.user.isAI) return false;
    
    // Filter by search query
    return conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase());
  });
  
  const currentMessages = selectedConversation ? 
    (mockMessages[selectedConversation.id] || []) : [];
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageInput.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', messageInput);
    
    // Clear the input
    setMessageInput('');
  };

  return (
    <MainLayout
      title="Messages"
      description="Your conversations with companions and AI"
      showBreadcrumbs
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">
        {/* Conversations List */}
        <div className="md:col-span-1">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            <div className="p-4 border-b">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search messages" 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Tabs 
                defaultValue="all" 
                className="w-full" 
                value={activeTab} 
                onValueChange={setActiveTab}
              >
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="escorts">
                    <Users className="h-4 w-4 mr-1" />
                    Escorts
                  </TabsTrigger>
                  <TabsTrigger value="ai">
                    <Robot className="h-4 w-4 mr-1" />
                    AI
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="flex-grow overflow-y-auto">
              {filteredConversations.length > 0 ? (
                filteredConversations.map(conversation => (
                  <div 
                    key={conversation.id}
                    className={`flex items-center p-4 border-b cursor-pointer transition-colors ${
                      selectedConversation?.id === conversation.id 
                        ? 'bg-primary/5' 
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative mr-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={conversation.user.imageUrl} 
                          alt={conversation.user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {conversation.user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                      )}
                      {conversation.user.isAI && (
                        <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                          <Robot className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <div className="font-medium truncate">
                          {conversation.user.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(conversation.lastMessage.timestamp, { addSuffix: false })}
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground truncate w-4/5">
                          {conversation.lastMessage.sender === 'user' && 'You: '}
                          {conversation.lastMessage.text}
                        </p>
                        
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <Search className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">No conversations found</p>
                </div>
              )}
            </div>
          </Card>
        </div>
        
        {/* Conversation Area */}
        <div className="md:col-span-2">
          <Card className="h-[calc(100vh-200px)] flex flex-col">
            {selectedConversation ? (
              <>
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative mr-3">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={selectedConversation.user.imageUrl} 
                          alt={selectedConversation.user.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {selectedConversation.user.isVerified && (
                        <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-0.5">
                          <CheckCircle className="h-3 w-3" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <div className="font-medium">
                        {selectedConversation.user.name}
                        {selectedConversation.user.isVerified && (
                          <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 text-xs">
                            Verified
                          </Badge>
                        )}
                        {selectedConversation.user.isAI && (
                          <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 text-xs">
                            AI
                          </Badge>
                        )}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>Usually responds within 1 hour</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
                
                {/* Messages */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                  {currentMessages.map(message => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user' 
                            ? 'bg-primary text-primary-foreground rounded-br-none' 
                            : 'bg-muted rounded-bl-none'
                        }`}
                      >
                        <p>{message.text}</p>
                        <div className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          {message.sender === 'user' && message.isRead && (
                            <span className="ml-1">✓</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                    <Input 
                      placeholder="Type a message..." 
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      className="flex-grow"
                    />
                    <Button type="submit" disabled={!messageInput.trim()} size="icon">
                      <Send className="h-5 w-5" />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <User className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-muted-foreground max-w-md">
                  Choose a conversation from the list to view your messages
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
