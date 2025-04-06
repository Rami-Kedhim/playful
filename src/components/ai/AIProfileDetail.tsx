
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageCircle, Image, HeartHandshake, VideoIcon, Zap } from "lucide-react";
import { AIProfile } from "@/types/ai-profile";
import { useAIModelMonetization } from "@/hooks/ai/useAIModelMonetization";
import AIModelPremiumContent from "./AIModelPremiumContent";
import AIModelLivecam from "./AIModelLivecam";
import AIModelBoost from "./AIModelBoost";
import AIModelGiftSystem from "./AIModelGiftSystem";
import { toast } from "@/components/ui/use-toast";
import useAIProfileStore from "@/store/aiProfileStore";

const TYPING_SPEED = 30; // milliseconds per character

interface AIProfileDetailProps {
  profile: AIProfile;
}

const AIProfileDetail = ({ profile }: AIProfileDetailProps) => {
  const [userMessage, setUserMessage] = useState("");
  const [activeTab, setActiveTab] = useState("chat");
  const [isTyping, setIsTyping] = useState(false);
  const { sendMessage, activeConversations, generateResponse } = useAIProfileStore();
  
  const conversation = activeConversations.find(conv => conv.profileId === profile.id);
  const messages = conversation?.messages || [];
  
  const handleSendMessage = async () => {
    if (!userMessage.trim() || isTyping) return;
    
    const message = userMessage.trim();
    setUserMessage("");
    
    await sendMessage(profile.id, message);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const scrollToBottom = useCallback(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);
  
  const handleSubscribe = () => {
    toast({
      title: "Subscription Required",
      description: "To access premium content, please subscribe to this profile",
    });
    setActiveTab("premium");
  };
  
  return (
    <div className="container mx-auto max-w-5xl py-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left sidebar - Profile Info */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarImage src={profile.avatar_url} alt={profile.name} />
                  <AvatarFallback>{profile.name.substring(0, 2)}</AvatarFallback>
                </Avatar>
                
                <h2 className="text-2xl font-bold">{profile.name}</h2>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <span>{profile.age}</span>
                  <span>•</span>
                  <span>{profile.location}</span>
                </div>
                
                <Badge className="mt-3 bg-gradient-to-r from-pink-500 to-purple-500">
                  AI Model
                </Badge>
                
                <p className="mt-4 text-sm text-muted-foreground">
                  {profile.bio}
                </p>
                
                <div className="w-full mt-6 flex flex-col gap-3">
                  <AIModelBoost profileId={profile.id} />
                  
                  <AIModelGiftSystem 
                    profileId={profile.id} 
                    profileName={profile.name} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-medium">Interests</h3>
            </CardHeader>
            <CardContent className="pb-4">
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest, index) => (
                  <Badge variant="outline" key={index}>
                    {interest}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right content area */}
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Chat
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Premium
              </TabsTrigger>
              <TabsTrigger value="livecam" className="flex items-center gap-2">
                <VideoIcon className="h-4 w-4" />
                Livecam
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="chat" className="space-y-4">
              <Card className="flex flex-col h-[60vh]">
                <CardContent className="flex-grow overflow-y-auto p-4" id="chat-container">
                  {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                      <MessageCircle className="h-12 w-12 mb-4 opacity-30" />
                      <p>No messages yet</p>
                      <p className="text-sm">Send a message to start chatting with {profile.name}</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.isUserMessage ? "justify-end" : "justify-start"}`}
                        >
                          <div 
                            className={`max-w-[80%] rounded-lg p-3 ${
                              msg.isUserMessage 
                                ? "bg-primary text-primary-foreground" 
                                : "bg-muted"
                            }`}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
                
                <CardFooter className="border-t p-4">
                  <div className="flex w-full items-end gap-2">
                    <Textarea 
                      placeholder={`Send a message to ${profile.name}...`}
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="min-h-10"
                      rows={2}
                      disabled={isTyping}
                    />
                    <Button 
                      onClick={handleSendMessage}
                      disabled={!userMessage.trim() || isTyping}
                    >
                      Send
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="premium">
              <AIModelPremiumContent profileId={profile.id} />
            </TabsContent>
            
            <TabsContent value="livecam">
              <AIModelLivecam 
                profile={profile}
                onSubscribe={handleSubscribe}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AIProfileDetail;
