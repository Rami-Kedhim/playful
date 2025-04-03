
import { useState, useEffect, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { fetchConversations, fetchMessages, markMessagesAsRead, sendMessage } from "@/services/messaging";
import { Conversation, Message } from "@/services/messaging/types";
import { ConversationList } from "@/components/messaging/ConversationList";
import { EmptyConversationPlaceholder } from "@/components/messaging/EmptyConversationPlaceholder";
import { Loader2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  
  // Load conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!user?.id) return;
      
      setLoadingConversations(true);
      try {
        const data = await fetchConversations(user.id);
        setConversations(data);
      } catch (error) {
        console.error("Error loading conversations:", error);
        toast({
          title: "Error",
          description: "Could not load your conversations",
          variant: "destructive",
        });
      } finally {
        setLoadingConversations(false);
      }
    };
    
    loadConversations();
    
    // Refresh conversations periodically
    const intervalId = setInterval(loadConversations, 30000);
    
    return () => clearInterval(intervalId);
  }, [user?.id]);
  
  // Load messages for selected conversation
  useEffect(() => {
    const loadMessages = async () => {
      if (!user?.id || !selectedConversation) return;
      
      setLoadingMessages(true);
      try {
        const data = await fetchMessages(user.id, selectedConversation.participant.id);
        setMessages(data);
        
        // Mark messages as read
        await markMessagesAsRead(user.id, selectedConversation.participant.id);
        
        // Update unread count in the conversation list
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedConversation.id 
              ? { ...conv, unread_count: 0 } 
              : conv
          )
        );
      } catch (error) {
        console.error("Error loading messages:", error);
        toast({
          title: "Error",
          description: "Could not load messages",
          variant: "destructive",
        });
      } finally {
        setLoadingMessages(false);
      }
    };
    
    loadMessages();
  }, [user?.id, selectedConversation]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user?.id || !selectedConversation || !newMessage.trim()) return;
    
    setSendingMessage(true);
    try {
      const message = await sendMessage(
        user.id,
        selectedConversation.participant.id,
        newMessage.trim()
      );
      
      if (message) {
        setMessages(prev => [...prev, message]);
        setNewMessage("");
        
        // Update last message in conversation list
        const updatedConversation = {
          ...selectedConversation,
          last_message: message.content,
          last_message_time: message.created_at
        };
        
        // Move this conversation to top of the list
        setConversations(prev => [
          updatedConversation,
          ...prev.filter(c => c.id !== selectedConversation.id)
        ]);
        
        // Update the selected conversation
        setSelectedConversation(updatedConversation);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Could not send message",
        variant: "destructive",
      });
    } finally {
      setSendingMessage(false);
    }
  };
  
  const handleSelectConversation = (conversation: Conversation) => {
    setSelectedConversation(conversation);
    setMessages([]);
  };
  
  return (
    <MainLayout title="Messages" containerClass="container py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Conversation List */}
        <ConversationList 
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          loading={loadingConversations}
        />
        
        {/* Message View */}
        {selectedConversation ? (
          <Card className="md:col-span-2">
            <CardHeader className="border-b p-4">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedConversation.participant.avatar_url || undefined} />
                  <AvatarFallback>
                    {selectedConversation.participant.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="font-semibold">{selectedConversation.participant.name}</h3>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex flex-col h-[500px]">
              {/* Messages */}
              <div 
                className="flex-1 overflow-y-auto p-4"
                ref={messageContainerRef}
              >
                {loadingMessages ? (
                  <div className="flex justify-center items-center h-full">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : messages.length > 0 ? (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.sender_id === user?.id ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] px-4 py-2 rounded-lg ${
                            message.sender_id === user?.id
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          }`}
                        >
                          <p>{message.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messageEndRef} />
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full text-muted-foreground">
                    Start a conversation with {selectedConversation.participant.name}
                  </div>
                )}
              </div>
              
              {/* Message Input */}
              <div className="border-t p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                    disabled={sendingMessage}
                  />
                  <Button type="submit" disabled={sendingMessage || !newMessage.trim()}>
                    {sendingMessage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ) : (
          <EmptyConversationPlaceholder />
        )}
      </div>
    </MainLayout>
  );
};

export default Messages;
