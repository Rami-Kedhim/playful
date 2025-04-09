import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { ChatHeader } from "./";
import { ChatMessageList } from "./";
import { ChatInputArea } from "./";
import { ChatEmptyState } from "./";
import { ChatMessage, MessageType } from "./types";

interface LivecamChatContainerProps {
  streamId: string;
  isLive: boolean;
  viewerCount: number;
  streamOwnerName: string;
  onTipSent?: (username: string, amount: number) => void;
}

const LivecamChatContainer: React.FC<LivecamChatContainerProps> = ({ 
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
  
  useEffect(() => {
    if (isLive) {
      const initialMessages: ChatMessage[] = [
        {
          id: uuidv4(),
          username: "ChatBot",
          message: `Welcome to ${streamOwnerName}'s live stream!`,
          timestamp: new Date(),
          type: "system"
        },
        {
          id: uuidv4(),
          username: "Viewer123",
          message: `Hey ${streamOwnerName}! How are you today?`,
          timestamp: new Date(Date.now() - 120000),
          type: "normal"
        },
        {
          id: uuidv4(),
          username: streamOwnerName,
          message: "Hey everyone! Thanks for joining my stream!",
          timestamp: new Date(Date.now() - 60000),
          type: "normal",
          isOwner: true
        }
      ];
      
      setMessages(initialMessages);
      
      const interval = setInterval(() => {
        if (Math.random() > 0.7) {
          const randomViewers = ["Viewer123", "Fan456", "User789", "Chatter101", "Guest202"];
          const randomMessages = [
            "Looking good today!",
            "Where are you from?",
            "What's your favorite song?",
            "How long have you been streaming?",
            "Love your content!",
            "Hello from California!",
            "Great stream as always"
          ];
          
          const username = randomViewers[Math.floor(Math.random() * randomViewers.length)];
          const message = randomMessages[Math.floor(Math.random() * randomMessages.length)];
          
          addMessage(username, message, "normal");
          
          if (Math.random() > 0.8) {
            setTimeout(() => {
              const responses = [
                "Thank you!",
                "I appreciate that",
                "Thanks for being here",
                "Good question!",
                "Glad you're enjoying the stream"
              ];
              const response = responses[Math.floor(Math.random() * responses.length)];
              addMessage(streamOwnerName, response, "normal", true);
            }, 2000);
          }
          
          if (Math.random() > 0.9) {
            const tipper = randomViewers[Math.floor(Math.random() * randomViewers.length)];
            const amount = Math.floor(Math.random() * 95) + 5;
            const tipMessages = [
              "Keep up the great content!",
              "You're amazing!",
              "For your hard work",
              "Well deserved",
              "Buy yourself something nice"
            ];
            const tipMessage = tipMessages[Math.floor(Math.random() * tipMessages.length)];
            
            addTip(tipper, amount, tipMessage);
            
            if (onTipSent) {
              onTipSent(tipper, amount);
            }
          }
        }
      }, 8000);
      
      const joinLeaveInterval = setInterval(() => {
        const names = ["Alex", "Jordan", "Taylor", "Casey", "Morgan"];
        const randomName = names[Math.floor(Math.random() * names.length)];
        const isJoining = Math.random() > 0.5;
        
        const message = isJoining
          ? `${randomName} has joined the chat`
          : `${randomName} has left the chat`;
        
        addMessage(randomName, message, isJoining ? "join" : "leave");
      }, 15000);
      
      return () => {
        clearInterval(interval);
        clearInterval(joinLeaveInterval);
      };
    } else {
      setMessages([]);
    }
  }, [isLive, streamOwnerName, onTipSent]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const addMessage = (
    username: string, 
    message: string, 
    type: MessageType, 
    isOwner = false,
    isModerator = false
  ) => {
    const newMessage: ChatMessage = {
      id: uuidv4(),
      username,
      message,
      timestamp: new Date(),
      type,
      isOwner,
      isModerator
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
  };
  
  const addTip = (username: string, amount: number, message: string) => {
    const newTip: ChatMessage = {
      id: uuidv4(),
      username,
      message,
      timestamp: new Date(),
      type: "tip",
      tipAmount: amount
    };
    
    setMessages(prevMessages => [...prevMessages, newTip]);
  };
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    addMessage("You", messageText, "normal");
    setMessageText("");
    setIsEmojiPickerOpen(false);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleEmojiSelect = (emoji: string) => {
    setMessageText(prev => prev + emoji);
  };
  
  const handleSendTip = () => {
    const amount = Math.floor(Math.random() * 95) + 5;
    addTip("You", amount, "Thanks for the great content!");
    
    toast({
      title: "Tip Sent!",
      description: `You tipped ${streamOwnerName} $${amount}`,
      variant: "success"
    });
    
    if (onTipSent) {
      onTipSent("You", amount);
    }
  };
  
  if (!isLive) {
    return <ChatEmptyState streamOwnerName={streamOwnerName} />;
  }
  
  return (
    <div className="flex flex-col h-[500px] border rounded-md overflow-hidden">
      <ChatHeader isLive={isLive} viewerCount={viewerCount} />
      
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <ChatMessageList messages={messages} messagesEndRef={messagesEndRef} />
      </div>
      
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
    </div>
  );
};

export default LivecamChatContainer;
