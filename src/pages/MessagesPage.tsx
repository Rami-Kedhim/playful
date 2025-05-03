
import React, { useState, useEffect } from 'react';
import { Layout } from '@/layouts';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Search } from 'lucide-react';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    avatarUrl: 'https://i.pravatar.cc/150?u=1',
    name: 'Jessica Parker',
    lastMessage: 'Are you available tomorrow evening?',
    timestamp: '2023-04-17T15:32:00Z',
    unread: true,
  },
  {
    id: '2',
    avatarUrl: 'https://i.pravatar.cc/150?u=2',
    name: 'Michael Johnson',
    lastMessage: 'Thanks for your message. I'll get back to you soon.',
    timestamp: '2023-04-16T09:15:00Z',
    unread: false,
  },
  {
    id: '3',
    avatarUrl: 'https://i.pravatar.cc/150?u=3',
    name: 'Emma Wilson',
    lastMessage: 'Perfect, see you then!',
    timestamp: '2023-04-15T18:45:00Z',
    unread: false,
  },
];

// Mock data for messages in a conversation
const mockMessages = [
  {
    id: '1',
    senderId: 'other',
    content: 'Hello there! I noticed your profile and I was wondering if you're available this weekend?',
    timestamp: '2023-04-17T14:30:00Z',
  },
  {
    id: '2',
    senderId: 'user',
    content: 'Hi! Thanks for reaching out. Yes, I am available on Saturday evening. What did you have in mind?',
    timestamp: '2023-04-17T14:35:00Z',
  },
  {
    id: '3',
    senderId: 'other',
    content: 'Great! I was thinking we could meet for dinner at around 7pm. Does that work for you?',
    timestamp: '2023-04-17T14:40:00Z',
  },
  {
    id: '4',
    senderId: 'user',
    content: 'That sounds perfect. Where would you like to meet?',
    timestamp: '2023-04-17T14:45:00Z',
  },
  {
    id: '5',
    senderId: 'other',
    content: 'I was thinking about that new Italian restaurant downtown - La Piazza. I've heard great things about it.',
    timestamp: '2023-04-17T15:00:00Z',
  },
  {
    id: '6',
    senderId: 'other',
    content: 'Are you available tomorrow evening?',
    timestamp: '2023-04-17T15:32:00Z',
  },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState(mockMessages);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(
    convo => convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // Add new message to the conversation
    const newMsg = {
      id: Date.now().toString(),
      senderId: 'user',
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate a response after a short delay
    setTimeout(() => {
      const responseMsg = {
        id: (Date.now() + 1).toString(),
        senderId: 'other',
        content: "Thank you for your message! I'll respond as soon as possible.",
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, responseMsg]);
    }, 1000);
  };
  
  // Select the first conversation by default
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id);
    }
  }, [conversations, selectedConversation]);
  
  return (
    <Layout title="Messages" description="Manage your conversations" showBreadcrumbs>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[calc(100vh-200px)] min-h-[500px]">
        {/* Conversations List */}
        <div className="md:col-span-1 border rounded-lg overflow-hidden bg-card">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100vh-260px)]">
            <div className="p-2">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
                      selectedConversation === conversation.id
                        ? 'bg-accent'
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={conversation.avatarUrl} />
                        <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      {conversation.unread && (
                        <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <span className="font-medium">{conversation.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(conversation.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">
                        {conversation.lastMessage}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-4 text-muted-foreground">No conversations found</p>
              )}
            </div>
          </ScrollArea>
        </div>
        
        {/* Messages */}
        <div className="md:col-span-2 lg:col-span-3 border rounded-lg overflow-hidden flex flex-col bg-card">
          {selectedConversation ? (
            <>
              {/* Conversation Header */}
              <div className="p-3 border-b flex items-center space-x-3">
                <Avatar>
                  <AvatarImage 
                    src={conversations.find(c => c.id === selectedConversation)?.avatarUrl} 
                  />
                  <AvatarFallback>
                    {conversations.find(c => c.id === selectedConversation)?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">
                    {conversations.find(c => c.id === selectedConversation)?.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              
              {/* Messages Area */}
              <ScrollArea className="flex-grow p-4 h-[calc(100vh-350px)]">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs sm:max-w-md md:max-w-lg rounded-lg p-3 ${
                          message.senderId === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p className={`text-xs mt-1 text-right ${
                          message.senderId === 'user'
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground'
                        }`}>
                          {formatDate(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              {/* Message Input */}
              <div className="p-3 border-t">
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center text-center p-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Select a Conversation</h3>
                <p className="text-muted-foreground">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
