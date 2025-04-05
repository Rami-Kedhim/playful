
import React, { useState, useEffect, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./";
import { ChatMessageList } from "./";
import { ChatInputArea } from "./";
import { ChatEmptyState } from "./";
import { ChatMessage } from "../chat/types";

interface LivecamChatProps {
  streamId: string;
  isLive: boolean;
  viewerCount: number;
  streamOwnerName: string;
  onTipSent?: (username: string, amount: number) => void;
}

const mockUsers = [
  "Alex", "Taylor", "Jordan", "Casey", "Riley", 
  "Morgan", "Jamie", "Avery", "Charlie", "Skyler",
  "Sam", "Drew", "Blake", "Quinn", "Reese"
];

const LivecamChatContainer: React.FC<LivecamChatProps> = ({ 
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
  
  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-background">
      <ChatHeader 
        isLive={isLive}
        viewerCount={viewerCount}
      />
      
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-1">
          {isLive ? (
            <ChatMessageList 
              messages={messages} 
              messagesEndRef={messagesEndRef} 
            />
          ) : (
            <ChatEmptyState streamOwnerName={streamOwnerName} />
          )}
        </div>
      </ScrollArea>
      
      {isLive && (
        <ChatInputArea
          messageText={messageText}
          setMessageText={setMessageText}
          isEmojiPickerOpen={isEmojiPickerOpen}
          setIsEmojiPickerOpen={setIsEmojiPickerOpen}
          handleSendMessage={handleSendMessage}
          handleKeyDown={handleKeyDown}
          handleEmojiSelect={handleEmojiSelect}
          handleSendTip={handleSendTip}
        />
      )}
    </div>
  );
};

export default LivecamChatContainer;
