
import React, { useEffect, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import AppLayout from '@/components/layout/AppLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/contexts/AuthContext';
import { Conversation, Message } from '@/types/messaging';
import ConversationList from '@/components/messaging/ConversationList';
import MessageList from '@/components/messaging/MessageList';
import MessageInput from '@/components/messaging/MessageInput';
import { 
  getConversations, 
  getConversationById, 
  createConversation 
} from '@/services/messaging/conversationService';
import { 
  getMessages, 
  sendMessage, 
  markMessagesAsRead, 
  subscribeToMessages 
} from '@/services/messaging/messageService';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';

const Messages = () => {
  const { conversationId } = useParams<{ conversationId?: string }>();
  const { user, isLoading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [messagesLoading, setMessagesLoading] = useState(false);

  // Get all conversations for the user
  useEffect(() => {
    if (authLoading || !user) return;

    const fetchConversations = async () => {
      setLoading(true);
      try {
        const fetchedConversations = await getConversations();
        setConversations(fetchedConversations);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [authLoading, user]);

  // Get messages for the selected conversation
  useEffect(() => {
    if (!conversationId || !user) return;
    
    const fetchConversationAndMessages = async () => {
      setMessagesLoading(true);
      try {
        // Get conversation details
        const conversation = await getConversationById(conversationId);
        if (conversation) {
          setCurrentConversation(conversation);
          
          // Get messages for the conversation
          const fetchedMessages = await getMessages(conversationId);
          setMessages(fetchedMessages);
          
          // Mark messages as read
          await markMessagesAsRead(conversationId);
        }
      } catch (error) {
        console.error('Error fetching conversation and messages:', error);
      } finally {
        setMessagesLoading(false);
      }
    };

    fetchConversationAndMessages();
  }, [conversationId, user]);

  // Subscribe to new messages
  useEffect(() => {
    if (!conversationId || !user) return;
    
    const unsubscribe = subscribeToMessages(conversationId, (newMessage) => {
      setMessages((prevMessages) => {
        // Check if message already exists
        if (prevMessages.some(msg => msg.id === newMessage.id)) {
          return prevMessages;
        }
        return [...prevMessages, newMessage];
      });
      
      // Mark message as read if from someone else
      if (newMessage.sender_id !== user.id) {
        markMessagesAsRead(conversationId);
      }
    });
    
    return () => {
      unsubscribe();
    };
  }, [conversationId, user]);

  const handleSendMessage = async (content: string) => {
    if (!conversationId || !user) return;
    
    try {
      const message = await sendMessage(conversationId, content);
      if (message) {
        // The new message will be added via the subscription
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Redirect to auth page if user is not logged in
  if (!authLoading && !user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <AppLayout>
      <div className="container mx-auto max-w-6xl py-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-4">Messages</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[70vh]">
            {/* Conversations sidebar */}
            <div className="md:col-span-1 border rounded-lg overflow-hidden">
              <div className="p-4 bg-muted/30 flex justify-between items-center">
                <h2 className="font-semibold">Conversations</h2>
                <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                  <PlusIcon className="h-4 w-4" />
                </Button>
              </div>
              <Separator />
              <ScrollArea className="h-[calc(70vh-60px)]">
                <ConversationList />
              </ScrollArea>
            </div>
            
            {/* Messages area */}
            <div className="md:col-span-2 border rounded-lg overflow-hidden flex flex-col">
              <div className="p-4 bg-muted/30">
                <h2 className="font-semibold">
                  {currentConversation?.otherParticipant?.username || 'Select a Conversation'}
                </h2>
              </div>
              <Separator />
              
              <ScrollArea className="flex-grow h-[calc(70vh-120px)]">
                <MessageList 
                  messages={messages} 
                  loading={messagesLoading} 
                />
              </ScrollArea>
              
              <Separator />
              <div className="p-2">
                <MessageInput 
                  onSendMessage={handleSendMessage} 
                  disabled={!conversationId} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
