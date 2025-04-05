import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, Gift, Smile, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { EmojiPicker } from "../chat/EmojiPicker";

interface LivecamChatProps {
  streamId: string;
  isLive: boolean;
  viewerCount: number;
  streamOwnerName: string;
  onTipSent?: (username: string, amount: number) => void;
}

type MessageType = "normal" | "tip" | "system" | "join" | "leave";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  type: MessageType;
  isOwner?: boolean;
  isModerator?: boolean;
  tipAmount?: number;
}

const mockUsers = [
  "Alex", "Taylor", "Jordan", "Casey", "Riley", 
  "Morgan", "Jamie", "Avery", "Charlie", "Skyler",
  "Sam", "Drew", "Blake", "Quinn", "Reese"
];

const LivecamChat: React.FC<LivecamChatProps> = ({ 
  streamId, 
  isLive, 
  viewerCount, 
  streamOwnerName,
  onTipSent 
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageText, setMessageText] = useState("");
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const generateSystemMessage = (): ChatMessage => {
    const systemMessages = [
      `${streamOwnerName} started a poll! Vote now!`,
      "Reminder: Be respectful in chat",
      "New milestone reached! Thanks for your support!",
      `${streamOwnerName} will be live again tomorrow at 7PM!`,
      "Subscribe to unlock exclusive content!"
    ];
    
    return {
      id: `system-${Date.now()}`,
      username: "System",
      message: systemMessages[Math.floor(Math.random() * systemMessages.length)],
      timestamp: new Date(),
      type: "system"
    };
  };
  
  const generateUserMessage = (): ChatMessage => {
    const userMessages = [
      "Hi everyone! Just joined :)",
      "Looking great today!",
      "How's everyone doing?",
      "Love the stream!",
      "Where are you from?",
      "Any plans for the weekend?",
      "That's so funny 😂",
      "I agree with you",
      "Great music choice!",
      "Can you do a dance?",
      "You're amazing!",
      "How long have you been streaming?"
    ];
    
    const username = mockUsers[Math.floor(Math.random() * mockUsers.length)];
    const messageType: MessageType = Math.random() > 0.9 ? "tip" : "normal";
    
    return {
      id: `user-${Date.now()}-${Math.random()}`,
      username,
      message: userMessages[Math.floor(Math.random() * userMessages.length)],
      timestamp: new Date(),
      type: messageType,
      isOwner: false,
      isModerator: Math.random() > 0.9,
      tipAmount: messageType === "tip" ? Math.floor(Math.random() * 50) + 5 : undefined
    };
  };
  
  useEffect(() => {
    if (!isLive) return;
    
    const initialMessages: ChatMessage[] = [
      {
        id: "welcome",
        username: "System",
        message: `Welcome to ${streamOwnerName}'s live stream!`,
        timestamp: new Date(),
        type: "system"
      }
    ];
    
    for (let i = 0; i < 5; i++) {
      initialMessages.push(generateUserMessage());
    }
    
    setMessages(initialMessages);
    
    const joinInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        const username = mockUsers[Math.floor(Math.random() * mockUsers.length)];
        setMessages(prevMessages => [
          ...prevMessages,
          {
            id: `join-${Date.now()}`,
            username,
            message: `${username} joined the chat`,
            timestamp: new Date(),
            type: "join"
          }
        ]);
      }
    }, 20000);
    
    return () => clearInterval(joinInterval);
  }, [isLive, streamOwnerName]);
  
  useEffect(() => {
    if (!isLive) return;
    
    const messageInterval = setInterval(() => {
      if (Math.random() < 0.8) {
        const newMessage = Math.random() > 0.9 
          ? generateSystemMessage() 
          : generateUserMessage();
          
        setMessages(prevMessages => [...prevMessages, newMessage]);
        
        if (newMessage.type === "tip" && onTipSent && newMessage.tipAmount) {
          onTipSent(newMessage.username, newMessage.tipAmount);
        }
      }
    }, 3000);
    
    return () => clearInterval(messageInterval);
  }, [isLive, onTipSent]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    const newMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      username: "You",
      message: messageText.trim(),
      timestamp: new Date(),
      type: "normal"
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageText("");
    setIsEmojiPickerOpen(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setMessageText(prev => prev + emoji);
    setIsEmojiPickerOpen(false);
  };
  
  const handleSendTip = () => {
    if (!isLive) return;
    
    const tipAmount = Math.floor(Math.random() * 95) + 5;
    
    const newTipMessage: ChatMessage = {
      id: `tip-${Date.now()}`,
      username: "You",
      message: "Thanks for the great stream!",
      timestamp: new Date(),
      type: "tip",
      tipAmount
    };
    
    setMessages(prevMessages => [...prevMessages, newTipMessage]);
    
    if (onTipSent) {
      onTipSent("You", tipAmount);
    }
    
    toast({
      title: "Tip Sent!",
      description: `You tipped ${streamOwnerName} $${tipAmount}`,
    });
  };
  
  const renderMessage = (message: ChatMessage) => {
    switch (message.type) {
      case "normal":
        return (
          <div key={message.id} className="py-1 px-2 hover:bg-muted/50 rounded">
            <div className="flex gap-2 items-baseline">
              <span className={`font-semibold ${message.isOwner ? "text-primary" : message.isModerator ? "text-blue-500" : ""}`}>
                {message.username}
                {message.isOwner && <Badge variant="outline" className="ml-1 text-[10px]">Host</Badge>}
                {message.isModerator && <Badge variant="outline" className="ml-1 text-[10px]">Mod</Badge>}
              </span>
              <span className="text-muted-foreground text-xs">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p className="text-sm">{message.message}</p>
          </div>
        );
        
      case "tip":
        return (
          <div key={message.id} className="py-1 px-2 bg-green-500/10 border-l-2 border-green-500 rounded">
            <div className="flex gap-2 items-baseline">
              <span className="font-semibold text-green-500">{message.username}</span>
              <span className="text-muted-foreground text-xs">{message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            </div>
            <p className="text-sm flex items-center">
              <Gift className="h-4 w-4 inline-block mr-1 text-green-500" />
              Tipped ${message.tipAmount}!
            </p>
            <p className="text-sm mt-1">{message.message}</p>
          </div>
        );
        
      case "system":
        return (
          <div key={message.id} className="py-1 px-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
            <p className="text-sm text-blue-500">{message.message}</p>
          </div>
        );
        
      case "join":
      case "leave":
        return (
          <div key={message.id} className="py-0.5 px-2">
            <p className="text-xs text-muted-foreground">{message.message}</p>
          </div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <div className="p-3 border-b flex justify-between items-center">
        <div>
          <h3 className="font-medium">Live Chat</h3>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {isLive ? "Live" : "Offline"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {viewerCount} {viewerCount === 1 ? "viewer" : "viewers"}
            </span>
          </div>
        </div>
        <Button size="sm" variant="outline" onClick={() => toast({ title: "Feature coming soon", description: "Chat settings will be available in a future update" })}>
          Settings
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {isLive ? (
            messages.map(message => renderMessage(message))
          ) : (
            <div className="h-full flex items-center justify-center py-8">
              <p className="text-muted-foreground text-center">
                Chat is unavailable when the stream is offline.<br />
                Check back when {streamOwnerName} is live again.
              </p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      {isLive && (
        <div className="p-3 border-t">
          <div className="flex items-center gap-2 relative">
            <Button 
              size="icon" 
              variant="ghost" 
              className="shrink-0" 
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <Smile className="h-5 w-5" />
            </Button>
            
            <Input 
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
            />
            
            <Button 
              size="icon" 
              className="shrink-0 bg-green-600 hover:bg-green-700 text-white"
              onClick={handleSendTip}
            >
              <Gift className="h-5 w-5" />
            </Button>
            
            <Button 
              size="icon" 
              className="shrink-0"
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
            >
              <Send className="h-5 w-5" />
            </Button>
            
            {isEmojiPickerOpen && (
              <EmojiPicker 
                onEmojiSelect={handleEmojiSelect} 
                onClose={() => setIsEmojiPickerOpen(false)}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default LivecamChat;
