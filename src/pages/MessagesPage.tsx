
import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, Search } from 'lucide-react';

// Placeholder conversations
const placeholderConversations = [
  { id: '1', name: 'Sophia', lastMessage: 'Hey, are you available tonight?', time: '5m', unread: 2, avatar: '/avatars/sophia.jpg' },
  { id: '2', name: 'Emma', lastMessage: 'I'll be there at 8pm', time: '30m', unread: 0, avatar: '/avatars/emma.jpg' },
  { id: '3', name: 'Isabella', lastMessage: 'Looking forward to meeting you!', time: '2h', unread: 0, avatar: '/avatars/isabella.jpg' },
];

// Placeholder messages
const placeholderMessages = [
  { id: '1', senderId: 'other', text: 'Hi there! How are you doing?', time: '10:30 AM' },
  { id: '2', senderId: 'me', text: 'I'm doing great, thanks for asking!', time: '10:32 AM' },
  { id: '3', senderId: 'other', text: 'Would you be available this weekend?', time: '10:33 AM' },
  { id: '4', senderId: 'me', text: 'Yes, I'm free on Saturday evening. What did you have in mind?', time: '10:35 AM' },
  { id: '5', senderId: 'other', text: 'I was thinking we could meet for dinner?', time: '10:36 AM' },
];

const MessagesPage = () => {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState<string | null>('1'); // Start with first conversation active
  const [conversations, setConversations] = useState(placeholderConversations);
  const [messages, setMessages] = useState(placeholderMessages);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredConversations = conversations.filter(convo => 
    convo.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim() || !activeChat) return;
    
    const newMsg = {
      id: Date.now().toString(),
      senderId: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  
  const activeConversation = conversations.find(c => c.id === activeChat);
  
  return (
    <div className="container mx-auto py-4 px-4 h-[calc(100vh-64px)]">
      <div className="flex h-full border rounded-lg overflow-hidden">
        {/* Conversations sidebar */}
        <div className="w-full max-w-xs border-r bg-secondary/10">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations" 
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="overflow-y-auto h-[calc(100%-60px)]">
            {filteredConversations.map((conversation) => (
              <div 
                key={conversation.id}
                className={`flex items-center gap-3 p-3 hover:bg-accent/50 cursor-pointer ${activeChat === conversation.id ? 'bg-accent' : ''}`}
                onClick={() => setActiveChat(conversation.id)}
              >
                <Avatar>
                  <AvatarImage src={conversation.avatar} />
                  <AvatarFallback>{getInitials(conversation.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium truncate">{conversation.name}</span>
                    <span className="text-xs text-muted-foreground">{conversation.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <div className="bg-primary w-5 h-5 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white">{conversation.unread}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {activeChat ? (
            <>
              {/* Chat header */}
              <div className="p-3 border-b flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={activeConversation?.avatar} />
                  <AvatarFallback>{activeConversation ? getInitials(activeConversation.name) : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeConversation?.name}</h3>
                  <span className="text-xs text-muted-foreground">Online</span>
                </div>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id}
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] px-4 py-2 rounded-lg ${
                        message.senderId === 'me' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-accent text-accent-foreground'
                      }`}
                    >
                      <p>{message.text}</p>
                      <span className="text-xs opacity-70 block text-right mt-1">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input area */}
              <div className="p-3 border-t">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <h3 className="text-xl font-medium">No conversation selected</h3>
              <p className="text-muted-foreground mt-2">Choose a conversation from the list or start a new one</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
