
import React, { useState } from "react";
import { SendIcon, Smile } from "lucide-react";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessage {
  id: string;
  username: string;
  message: string;
  timestamp: Date;
  isOwner: boolean;
}

interface ChatContainerProps {
  streamId: string;
  escortId: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({ streamId, escortId }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      username: "System",
      message: "Welcome to the stream! Please keep chat respectful.",
      timestamp: new Date(),
      isOwner: true
    },
    {
      id: "2",
      username: "Moderator",
      message: "The stream has started. Enjoy!",
      timestamp: new Date(),
      isOwner: true
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Create a new message
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      username: "You",
      message: message.trim(),
      timestamp: new Date(),
      isOwner: false
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setMessage("");
    
    // Mock response from escort
    setTimeout(() => {
      const responseMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        username: "Escort",
        message: "Thanks for your message! I'll respond shortly.",
        timestamp: new Date(),
        isOwner: true
      };
      
      setChatMessages(prev => [...prev, responseMessage]);
    }, 3000);
  };

  return (
    <Card className="flex flex-col h-full max-h-[600px]">
      <CardHeader className="p-3 border-b">
        <h3 className="text-lg font-medium">Live Chat</h3>
      </CardHeader>
      
      <CardContent className="p-0 flex-grow overflow-hidden">
        <ScrollArea className="h-[400px] p-3">
          {chatMessages.map(msg => (
            <div key={msg.id} className="mb-3">
              <div className="flex items-baseline">
                <span className={`font-medium text-sm ${msg.isOwner ? "text-primary" : ""}`}>
                  {msg.username}:
                </span>
                <span className="text-xs text-gray-400 ml-2">
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-sm mt-1">{msg.message}</p>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
      
      <CardFooter className="p-3 border-t">
        <div className="flex w-full gap-2">
          <Button variant="ghost" size="icon" className="shrink-0">
            <Smile className="h-5 w-5" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="sm" className="shrink-0">
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatContainer;
