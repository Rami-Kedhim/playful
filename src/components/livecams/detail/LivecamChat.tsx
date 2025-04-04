
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";

// Define the chat message type
interface ChatMessage {
  id: string;
  userId: string;
  username: string;
  avatarUrl?: string;
  message: string;
  timestamp: Date;
  isOwner?: boolean;
}

interface LivecamChatProps {
  streamId: string;
  isLive: boolean;
  viewerCount: number;
  streamOwnerName: string;
}

const LivecamChat: React.FC<LivecamChatProps> = ({
  streamId,
  isLive,
  viewerCount,
  streamOwnerName,
}) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  // Mock data - In a real app, these would come from a real-time service
  useEffect(() => {
    if (isLive) {
      // Simulate initial messages
      const initialMessages: ChatMessage[] = [
        {
          id: "1",
          userId: "system",
          username: "System",
          message: `Welcome to ${streamOwnerName}'s livestream!`,
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          isOwner: false,
        },
        {
          id: "2",
          userId: "user1",
          username: "ViewerOne",
          avatarUrl: "https://picsum.photos/seed/user1/200",
          message: "Hey everyone! Excited for the stream today!",
          timestamp: new Date(Date.now() - 1000 * 60 * 3),
          isOwner: false,
        },
        {
          id: "3",
          userId: "streamer",
          username: streamOwnerName,
          avatarUrl: "https://picsum.photos/seed/streamer/200",
          message: "Thanks for joining! We're going to have a great time.",
          timestamp: new Date(Date.now() - 1000 * 60 * 2),
          isOwner: true,
        },
      ];
      
      setMessages(initialMessages);
      
      // Simulate incoming messages every so often
      const interval = setInterval(() => {
        const randomViewers = ["Viewer123", "FunWatcher", "StreamFan", "LuckyUser"];
        const randomViewer = randomViewers[Math.floor(Math.random() * randomViewers.length)];
        const randomMessages = [
          "This is amazing!",
          "How long have you been streaming?",
          "Hello from Paris!",
          "What's your favorite thing about streaming?",
          "I'm a new subscriber!",
        ];
        const randomMessage = randomMessages[Math.floor(Math.random() * randomMessages.length)];
        
        // 30% chance of adding a new simulated message
        if (Math.random() > 0.7) {
          const newMessage: ChatMessage = {
            id: Date.now().toString(),
            userId: `user${Math.floor(Math.random() * 1000)}`,
            username: randomViewer,
            avatarUrl: `https://picsum.photos/seed/${randomViewer}/200`,
            message: randomMessage,
            timestamp: new Date(),
            isOwner: false,
          };
          
          setMessages(prev => [...prev, newMessage]);
        }
      }, 10000);
      
      return () => clearInterval(interval);
    }
  }, [isLive, streamOwnerName]);
  
  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!message.trim() || !user) return;
    
    // Create a new message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username || "Anonymous",
      avatarUrl: user.profileImageUrl,
      message: message.trim(),
      timestamp: new Date(),
    };
    
    // Add to messages
    setMessages([...messages, newMessage]);
    
    // Clear input
    setMessage("");
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Live Chat</CardTitle>
          <Badge variant="secondary">{viewerCount} viewers</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-grow overflow-y-auto max-h-[400px] pb-0">
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatarUrl} />
                  <AvatarFallback>{msg.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm ${msg.isOwner ? "text-primary" : ""}`}>
                      {msg.username}
                    </span>
                    {msg.isOwner && (
                      <Badge variant="outline" className="text-xs py-0 h-5">
                        Streamer
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {isLive ? "Chat is quiet. Be the first to say hello!" : "Chat is disabled when stream is offline."}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </CardContent>
      
      <CardFooter className="pt-4 mt-auto">
        {isLive ? (
          <div className="flex w-full gap-2">
            <Input
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={!user}
            />
            <Button onClick={handleSendMessage} disabled={!message.trim() || !user}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="w-full text-center text-muted-foreground text-sm">
            Chat is disabled while the stream is offline
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default LivecamChat;
