
import React, { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendHorizontal, SmilePlus } from "lucide-react";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwner?: boolean;
  isModerator?: boolean;
  avatarUrl?: string;
}

interface LivecamChatProps {
  streamId: string;
  streamOwnerName: string;
  isLive: boolean;
  viewerCount: number;
}

const LivecamChat: React.FC<LivecamChatProps> = ({
  streamId,
  streamOwnerName,
  isLive,
  viewerCount
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // In a real app, get this from auth context
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Simulate user login state - in a real app, get this from authentication context
  useEffect(() => {
    // Simulate checking login status
    const checkLoginStatus = async () => {
      // Mocked authentication check
      const mockLoggedIn = Math.random() > 0.3; // 70% chance of being logged in
      setIsLoggedIn(mockLoggedIn);
    };
    
    checkLoginStatus();
  }, []);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Simulate receiving chat messages
  useEffect(() => {
    if (!isLive) return;
    
    // Initial messages
    const initialMessages: ChatMessage[] = [
      {
        id: `system-welcome`,
        username: "System",
        message: `Welcome to ${streamOwnerName}'s live stream!`,
        timestamp: new Date(),
        isModerator: true
      }
    ];
    
    setMessages(initialMessages);
    
    // Simulate getting periodic messages
    const interval = setInterval(() => {
      if (Math.random() > 0.6) { // 40% chance of new message
        const mockUsernames = ["Alex", "Robin", "Jordan", "Taylor", "Casey"];
        const mockMessages = [
          "Hello everyone!",
          "How are you today?",
          "Great stream!",
          "Love your content!",
          "Where are you from?",
          "How long are you streaming today?",
          "You look amazing!",
          "What's your favorite music?",
          "Do you stream every day?"
        ];
        
        const newMessage: ChatMessage = {
          id: `msg-${Date.now()}-${Math.random()}`,
          username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
          message: mockMessages[Math.floor(Math.random() * mockMessages.length)],
          timestamp: new Date(),
          avatarUrl: `https://picsum.photos/seed/${Math.random()}/50/50`
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
      
      // Occasionally add a message from the stream owner
      if (Math.random() > 0.9) { // 10% chance
        const ownerMessage: ChatMessage = {
          id: `owner-${Date.now()}`,
          username: streamOwnerName,
          message: "Thanks for watching my stream everyone! Don't forget to subscribe!",
          timestamp: new Date(),
          isOwner: true,
          avatarUrl: `https://picsum.photos/seed/${streamOwnerName}/50/50`
        };
        
        setMessages(prev => [...prev, ownerMessage]);
      }
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isLive, streamOwnerName]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !isLoggedIn) return;
    
    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      username: "You", // In a real app, get from auth context
      message: inputMessage.trim(),
      timestamp: new Date(),
      avatarUrl: "https://picsum.photos/seed/currentuser/50/50" // In a real app, get from user profile
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage("");
  };
  
  return (
    <div className="flex flex-col h-full rounded-md border bg-background shadow">
      <div className="p-3 border-b">
        <h3 className="font-semibold flex items-center justify-between">
          <span>Live Chat</span>
          <span className="text-sm text-muted-foreground">
            {viewerCount} {viewerCount === 1 ? 'viewer' : 'viewers'}
          </span>
        </h3>
      </div>
      
      <ScrollArea className="flex-grow p-3">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No messages yet
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={msg.avatarUrl} alt={msg.username} />
                  <AvatarFallback>{msg.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`font-medium text-sm ${msg.isOwner ? "text-primary" : msg.isModerator ? "text-blue-500" : ""}`}>
                      {msg.username}
                      {msg.isOwner && <span className="ml-1 text-xs bg-primary/20 text-primary px-1 rounded">Host</span>}
                      {msg.isModerator && <span className="ml-1 text-xs bg-blue-500/20 text-blue-500 px-1 rounded">Mod</span>}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm mt-0.5">{msg.message}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="p-3 border-t">
        {isLoggedIn ? (
          <div className="flex gap-2">
            <Button
              variant="ghost" 
              size="icon"
              type="button"
              className="shrink-0"
              title="Add emoji"
            >
              <SmilePlus className="h-5 w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-grow"
            />
            <Button size="icon" className="shrink-0" disabled={!inputMessage.trim()}>
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <div className="text-center p-2">
            <p className="text-sm text-muted-foreground mb-2">
              You need to sign in to chat
            </p>
            <Button variant="outline" size="sm">
              Sign In
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default LivecamChat;
