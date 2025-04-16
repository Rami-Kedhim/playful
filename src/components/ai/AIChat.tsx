import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Send } from "lucide-react";
import { useAuth } from "@/hooks/auth/useAuth";

interface AIChatProps {
  profile: any;
}

const AIChat = ({ profile }) => {
  const { user } = useAuth(); // Add this line to get user from auth context
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      content: `Hi there! I'm ${profile.name}. How can I assist you today?`,
      is_ai: true,
    },
  ]);
  const [simulatingTyping, setSimulatingTyping] = useState(false);
  const [paymentRequired, setPaymentRequired] = useState(false);

  const simulateTyping = () => {
    setSimulatingTyping(true);
    setTimeout(() => {
      setSimulatingTyping(false);
    }, 1500);
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      content: message,
      is_ai: false,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setMessage("");

    simulateTyping();

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now().toString() + "-ai",
        content: `Thanks for your message! I'm just an AI, but I appreciate your interest. ${message}`,
        is_ai: true,
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  // Fix the avatar_url vs avatarUrl issue
  return (
    <Card className="flex flex-col h-[500px]">
      <CardContent className="p-4 flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                !msg.is_ai ? "justify-end" : "justify-start"
              }`}
            >
              {msg.is_ai && (
                <Avatar className="h-8 w-8 mr-2">
                  <img
                    src={profile.avatar_url || profile.avatarUrl}
                    alt={profile.name}
                    className="rounded-full"
                  />
                </Avatar>
              )}
              <div
                className={`px-4 py-2 rounded-lg max-w-[80%] ${
                  msg.is_ai
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {simulatingTyping && (
            <div className="flex justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <img
                  src={profile.avatar_url || profile.avatarUrl}
                  alt={profile.name}
                  className="rounded-full"
                />
              </Avatar>
              <div className="px-4 py-2 rounded-lg bg-secondary text-secondary-foreground">
                <span className="flex space-x-1">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-75">●</span>
                  <span className="animate-bounce delay-150">●</span>
                </span>
              </div>
            </div>
          )}
        </div>

        {paymentRequired ? (
          <div className="p-3 border rounded-md bg-amber-50 dark:bg-amber-950 mb-4">
            <p className="text-sm mb-2">
              This message requires payment to view. Unlock premium content from {profile.name}?
            </p>
            <Button onClick={() => {}} size="sm">
              Unlock for 10 LC
            </Button>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={`Message ${profile.name}...`}
              className="flex-1"
            />
            <Button size="icon" onClick={handleSendMessage}>
              <Send className="h-5 w-5" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIChat;
