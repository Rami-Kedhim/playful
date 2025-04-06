
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { AIProfile } from "@/types/ai-profile";
import { Send } from "lucide-react";
import useAIMessaging from "@/hooks/useAIMessaging";

interface AIProfileConversationProps {
  profile: AIProfile;
}

const AIProfileConversation: React.FC<AIProfileConversationProps> = ({ profile }) => {
  const [message, setMessage] = useState("");
  const {
    messages,
    sendMessage,
    simulatingTyping,
    paymentRequired,
    processPayment
  } = useAIMessaging({ profileId: profile.id });

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    
    await sendMessage(message);
    setMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

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
                    src={profile.avatar_url}
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
                  src={profile.avatar_url}
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
            <Button onClick={processPayment} size="sm">
              Unlock for {profile.lucoin_chat_price} LC
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

export default AIProfileConversation;
