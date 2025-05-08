
import React, { useState } from 'react';
import Layout from '@/layouts/Layout';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const MessagesPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  
  // Mock conversations data
  const conversations = [
    { id: 'conv1', name: 'Sophia Lynn', lastMessage: 'See you tomorrow!', time: '12:45 PM' },
    { id: 'conv2', name: 'Emma Watson', lastMessage: 'That sounds great!', time: '10:30 AM' },
    { id: 'conv3', name: 'John Smith', lastMessage: 'Are you available this evening?', time: 'Yesterday' }
  ];
  
  // Mock messages data
  const messages = [
    { id: 'msg1', sender: 'them', content: 'Hi there! How are you?', time: '12:30 PM' },
    { id: 'msg2', sender: 'me', content: "I'm good, thanks for asking! How about you?", time: '12:35 PM' },
    { id: 'msg3', sender: 'them', content: 'Doing well! Are we still on for tomorrow?', time: '12:40 PM' },
    { id: 'msg4', sender: 'me', content: 'Yes, definitely! Looking forward to it.', time: '12:42 PM' },
    { id: 'msg5', sender: 'them', content: 'Great! See you tomorrow!', time: '12:45 PM' }
  ];
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message would go here
      setNewMessage('');
    }
  };
  
  return (
    <Layout
      title="Messages"
      description="Your conversations"
      showBreadcrumbs
    >
      <div className="h-[calc(80vh-8rem)] flex rounded-md border">
        {/* Conversation List */}
        <div className="w-full md:w-1/3 lg:w-1/4 border-r">
          <div className="p-3 border-b">
            <Input placeholder="Search conversations..." className="w-full" />
          </div>
          <div className="overflow-y-auto h-[calc(80vh-12rem)]">
            {conversations.map(conversation => (
              <div 
                key={conversation.id}
                className={`p-3 border-b hover:bg-accent cursor-pointer ${selectedConversation === conversation.id ? 'bg-accent' : ''}`}
                onClick={() => setSelectedConversation(conversation.id)}
              >
                <div className="flex justify-between items-start">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-muted-foreground">{conversation.time}</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message Area */}
        <div className="hidden md:flex flex-col w-2/3 lg:w-3/4">
          {selectedConversation ? (
            <>
              {/* Header */}
              <div className="p-3 border-b">
                <h2 className="font-medium">
                  {conversations.find(c => c.id === selectedConversation)?.name}
                </h2>
              </div>
              
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[70%] p-3 rounded-lg ${
                        message.sender === 'me' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-right text-xs mt-1 ${
                        message.sender === 'me' 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Input */}
              <div className="p-3 border-t">
                <form 
                  className="flex items-center space-x-2"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                >
                  <Input 
                    placeholder="Type a message..." 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MessagesPage;
