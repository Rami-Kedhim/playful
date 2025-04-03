
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import MessageThread from "@/components/messaging/MessageThread";
import { Card, CardContent } from "@/components/ui/card";
import { 
  fetchConversations, 
  fetchMessages, 
  sendMessage, 
  markMessagesAsRead,
  subscribeToMessages,
  Conversation,
  Message
} from "@/services/messaging";
import { ConversationList } from "@/components/messaging/ConversationList";
import { EmptyConversationPlaceholder } from "@/components/messaging/EmptyConversationPlaceholder";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);

  // Load conversations when component mounts
  useEffect(() => {
    const loadConversations = async () => {
      if (!user) return;
      
      try {
        const data = await fetchConversations(user.id);
        setConversations(data);
      } finally {
        setLoading(false);
      }
    };
    
    loadConversations();
  }, [user]);

  // Load messages when a conversation is selected
  useEffect(() => {
    if (!user || !selectedConversation) return;
    
    const loadMessages = async () => {
      const data = await fetchMessages(user.id, selectedConversation.participant.id);
      setMessages(data);
      
      // Mark messages as read
      await markMessagesAsRead(user.id, selectedConversation.participant.id);
      
      // Update unread count in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, unread_count: 0 } 
            : conv
        )
      );
    };
    
    loadMessages();
    
    // Subscribe to new messages
    const subscription = subscribeToMessages(user.id, (newMessage) => {
      if (newMessage.sender_id === selectedConversation.participant.id) {
        setMessages(prev => [...prev, newMessage]);
        markMessagesAsRead(user.id, selectedConversation.participant.id);
      } else {
        // Update unread count for other conversations
        setConversations(prev => 
          prev.map(conv => 
            conv.participant.id === newMessage.sender_id 
              ? { 
                  ...conv, 
                  unread_count: conv.unread_count + 1,
                  last_message: newMessage.content,
                  last_message_time: newMessage.created_at
                } 
              : conv
          )
        );
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [user, selectedConversation]);

  const handleSendMessage = async (content: string) => {
    if (!user || !selectedConversation) return;
    
    const newMessage = await sendMessage(
      user.id, 
      selectedConversation.participant.id, 
      content
    );
    
    if (newMessage) {
      setMessages(prev => [...prev, newMessage]);
      
      // Update last message in conversations
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { 
                ...conv, 
                last_message: content,
                last_message_time: new Date().toISOString()
              } 
            : conv
        )
      );
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <ConversationList 
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={setSelectedConversation}
            loading={loading}
          />
          
          {/* Message Thread */}
          {selectedConversation ? (
            <Card className="md:col-span-2">
              <CardContent className="p-0">
                <MessageThread
                  recipient={{
                    id: selectedConversation.participant.id,
                    name: selectedConversation.participant.name,
                    avatar: selectedConversation.participant.avatar_url || undefined,
                    type: selectedConversation.participant.type
                  }}
                  messages={messages.map(msg => ({
                    id: msg.id,
                    senderId: msg.sender_id,
                    receiverId: msg.receiver_id,
                    content: msg.content,
                    createdAt: msg.created_at,
                    read: msg.read
                  }))}
                  onSendMessage={handleSendMessage}
                />
              </CardContent>
            </Card>
          ) : (
            <EmptyConversationPlaceholder />
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
