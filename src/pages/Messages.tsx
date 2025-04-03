
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import {
  getConversationById,
  createConversation
} from '@/services/messaging/conversationService';
import {
  getMessages,
  sendMessage,
  markMessagesAsRead,
  subscribeToMessages
} from '@/services/messaging/messageService';
import { Conversation, Message } from '@/types/messaging';
import { useAuth } from '@/contexts/AuthContext';
import ConversationList from '@/components/messaging/ConversationList';
import MessageList from '@/components/messaging/MessageList';
import MessageInput from '@/components/messaging/MessageInput';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Messages: React.FC = () => {
  const { conversationId } = useParams<{ conversationId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadConversation = async () => {
      if (!conversationId) return;
      
      try {
        setLoading(true);
        
        // Get conversation details
        const conversationData = await getConversationById(conversationId);
        if (!conversationData) {
          navigate('/messages');
          return;
        }
        
        setConversation(conversationData);
        
        // Get messages
        const messagesData = await getMessages(conversationId);
        setMessages(messagesData);
        
        // Mark messages as read
        await markMessagesAsRead(conversationId);
      } catch (error) {
        console.error('Error loading conversation:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConversation();
  }, [conversationId, navigate]);
  
  useEffect(() => {
    if (!conversationId) return;
    
    // Subscribe to new messages
    const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Mark message as read if it's not from the current user
      if (newMessage.sender_id !== user?.id) {
        markMessagesAsRead(conversationId);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [conversationId, user?.id]);
  
  const handleSendMessage = async (content: string) => {
    if (!conversationId || !content.trim()) return;
    
    const sent = await sendMessage(conversationId, content);
    if (sent) {
      // The subscription will handle adding the message
    }
  };
  
  const renderContent = () => {
    if (!conversationId) {
      return (
        <div className="flex flex-col items-center justify-center h-full p-4">
          <p className="text-muted-foreground text-center mb-2">
            Select a conversation or start a new one
          </p>
        </div>
      );
    }
    
    if (loading) {
      return (
        <div className="flex justify-center items-center h-full">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      );
    }
    
    return (
      <div className="flex flex-col h-full">
        <CardHeader className="py-3 px-4 border-b">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2"
              onClick={() => navigate('/messages')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            
            {conversation?.otherParticipant ? (
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage 
                    src={conversation.otherParticipant.avatar_url || ''} 
                    alt={conversation.otherParticipant.username || 'User'} 
                  />
                  <AvatarFallback>
                    {conversation.otherParticipant.username?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-base">
                  {conversation.otherParticipant.full_name || 
                   conversation.otherParticipant.username || 
                   'Unknown User'}
                </CardTitle>
              </div>
            ) : (
              <CardTitle className="text-base">Conversation</CardTitle>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-y-auto p-4">
          <MessageList messages={messages} loading={loading} />
        </CardContent>
        
        <div className="p-4 border-t">
          <MessageInput onSendMessage={handleSendMessage} disabled={loading} />
        </div>
      </div>
    );
  };
  
  return (
    <AppLayout>
      <div className="container mx-auto py-6 px-4 h-[calc(100vh-64px)]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          <div className={`md:col-span-1 ${conversationId ? 'hidden md:block' : ''}`}>
            <Card className="h-full flex flex-col">
              <CardHeader className="py-3 px-4 border-b">
                <CardTitle className="text-lg">Messages</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4">
                <ConversationList />
              </CardContent>
            </Card>
          </div>
          
          <div className={`${conversationId ? 'md:col-span-2' : 'md:col-span-3'}`}>
            <Card className="h-full flex flex-col">
              {renderContent()}
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
