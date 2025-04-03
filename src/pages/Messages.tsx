
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import MessageThread from "@/components/messaging/MessageThread";
import { 
  fetchConversations, 
  fetchMessages, 
  sendMessage, 
  markMessagesAsRead,
  subscribeToMessages,
  Conversation,
  Message
} from "@/services/messaging";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredConversations = conversations.filter(conversation => 
    conversation.participant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Messages</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Conversations List */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Conversations</CardTitle>
              <CardDescription>Your recent conversations</CardDescription>
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mt-2"
              />
            </CardHeader>
            <CardContent className="px-2">
              {loading ? (
                <div className="flex justify-center p-4">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              ) : filteredConversations.length > 0 ? (
                <div className="space-y-1">
                  {filteredConversations.map(conversation => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full flex items-center p-3 rounded-md hover:bg-muted text-left ${
                        selectedConversation?.id === conversation.id ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={conversation.participant.avatar_url || undefined} />
                          <AvatarFallback>
                            {conversation.participant.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        
                        {conversation.unread_count > 0 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conversation.unread_count > 9 ? '9+' : conversation.unread_count}
                          </span>
                        )}
                      </div>
                      
                      <div className="ml-3 flex-1 overflow-hidden">
                        <div className="flex justify-between">
                          <p className="font-medium truncate">{conversation.participant.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(conversation.last_message_time), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{conversation.last_message}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 text-muted-foreground">
                  {searchQuery ? "No matching conversations found" : "No conversations yet"}
                </div>
              )}
            </CardContent>
          </Card>
          
          {/* Message Thread */}
          <Card className="md:col-span-2">
            <CardContent className="p-0">
              {selectedConversation ? (
                <MessageThread
                  recipient={{
                    id: selectedConversation.participant.id,
                    name: selectedConversation.participant.name,
                    avatar: selectedConversation.participant.avatar_url || undefined,
                    type: selectedConversation.participant.type as "creator" | "escort"
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
              ) : (
                <div className="flex items-center justify-center h-[600px] text-muted-foreground">
                  Select a conversation to start messaging
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Messages;
