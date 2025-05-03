
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Search, Send, Phone, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

// Mock data
const mockContacts = [
  {
    id: '1',
    name: 'Sophia Ellis',
    avatar: 'https://i.pravatar.cc/100?img=1',
    lastMessage: "Hi there! I'm available tomorrow evening if you'd like to meet.",
    lastTime: '12:45 PM',
    unread: 2,
    online: true,
    type: 'escort'
  },
  {
    id: '2',
    name: 'James Wilson',
    avatar: 'https://i.pravatar.cc/100?img=12',
    lastMessage: "Thanks for the booking. Looking forward to our meeting.",
    lastTime: 'Yesterday',
    unread: 0,
    online: false,
    type: 'client'
  },
  {
    id: '3',
    name: 'Emma Johnson',
    avatar: 'https://i.pravatar.cc/100?img=5',
    lastMessage: "Just checking if we're still on for Friday?",
    lastTime: 'Yesterday',
    unread: 1,
    online: true,
    type: 'escort'
  },
  {
    id: '4',
    name: 'Michael Brown',
    avatar: 'https://i.pravatar.cc/100?img=15',
    lastMessage: "I need to reschedule our appointment. Is that possible?",
    lastTime: 'Tuesday',
    unread: 0,
    online: false,
    type: 'client'
  },
];

const mockMessages = [
  {
    id: '1',
    senderId: '1',
    content: "Hi! Thanks for reaching out. I'd be happy to meet for dinner tomorrow.",
    timestamp: '12:30 PM',
    read: true
  },
  {
    id: '2',
    senderId: 'me',
    content: "Great! How about 7 PM at The Capital Grille?",
    timestamp: '12:35 PM',
    read: true
  },
  {
    id: '3',
    senderId: '1',
    content: "That sounds perfect. I love their menu. Do you have a reservation already?",
    timestamp: '12:40 PM',
    read: true
  },
  {
    id: '4',
    senderId: 'me',
    content: "Yes, I made one for 7 PM under the name Johnson. Should I send a car to pick you up?",
    timestamp: '12:42 PM',
    read: true
  },
  {
    id: '5',
    senderId: '1',
    content: "That would be wonderful! I'll be ready by 6:30 PM. I'm looking forward to meeting you!",
    timestamp: '12:45 PM',
    read: false
  },
];

const MessagesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeContact, setActiveContact] = useState(mockContacts[0]);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      senderId: 'me',
      content: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };
    
    setMessages([...messages, newMessage]);
    setMessageInput('');
  };

  const filteredContacts = searchTerm 
    ? mockContacts.filter(contact => 
        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : mockContacts;

  return (
    <MainLayout
      title="Messages"
      description="Chat with your connections"
      showBreadcrumbs
    >
      <div className="container mx-auto py-6">
        <Card className="h-[80vh] flex">
          {/* Contact List */}
          <div className="w-1/3 border-r">
            <CardHeader className="px-4 py-3">
              <div className="flex items-center justify-between mb-2">
                <CardTitle className="text-xl">Messages</CardTitle>
                <Badge variant="outline" className="font-normal">
                  {mockContacts.reduce((acc, curr) => acc + curr.unread, 0)} new
                </Badge>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contacts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Tabs defaultValue="all" className="mt-2">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <ScrollArea className="h-[calc(80vh-130px)]">
              <div className="p-2">
                {filteredContacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer hover:bg-accent ${activeContact.id === contact.id ? 'bg-accent' : ''}`}
                    onClick={() => setActiveContact(contact)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <img src={contact.avatar} alt={contact.name} />
                      </Avatar>
                      {contact.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="text-sm font-medium truncate">{contact.name}</h4>
                        <span className="text-xs text-muted-foreground">{contact.lastTime}</span>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                        {contact.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="border-b p-4 flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <img src={activeContact.avatar} alt={activeContact.name} />
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeContact.name}</h3>
                  <div className="flex items-center">
                    <span className={`h-2 w-2 rounded-full mr-2 ${activeContact.online ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                    <span className="text-xs text-muted-foreground">
                      {activeContact.online ? "Online" : "Offline"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.senderId !== 'me' && (
                      <Avatar className="h-8 w-8 mr-2 mt-1">
                        <img src={activeContact.avatar} alt={activeContact.name} />
                      </Avatar>
                    )}
                    <div>
                      <div 
                        className={`rounded-lg p-3 max-w-md ${
                          message.senderId === 'me' 
                            ? 'bg-primary text-primary-foreground' 
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        {message.senderId === 'me' && (
                          <span className="ml-1 text-xs text-muted-foreground">
                            {message.read ? '✓✓' : '✓'}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <Textarea 
                  placeholder="Type a message..." 
                  className="min-h-[40px] resize-none"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default MessagesPage;
