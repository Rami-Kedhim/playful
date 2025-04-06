
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Coins, Lock, Image, Film, MessageCircle } from "lucide-react";
import { useAIModelMonetization } from "@/hooks/ai/useAIModelMonetization";
import { useAuth } from "@/hooks/auth";
import { toast } from "@/hooks/use-toast";
import { AIProfile } from "@/types/ai-profile";

interface PremiumContentItem {
  id: string;
  type: "photo" | "video" | "message";
  title: string;
  description: string;
  thumbnailUrl: string;
  price: number;
  profileId: string;
}

const mockPremiumContent: PremiumContentItem[] = [
  {
    id: "content1",
    type: "photo",
    title: "Exclusive Photoshoot",
    description: "Private photo collection",
    thumbnailUrl: "/assets/premium-photo-thumb.jpg",
    price: 25,
    profileId: "profile-1",
  },
  {
    id: "content2",
    type: "video",
    title: "Lifestyle Video",
    description: "A day in my life",
    thumbnailUrl: "/assets/premium-video-thumb.jpg",
    price: 50,
    profileId: "profile-1",
  },
  {
    id: "content3",
    type: "message",
    title: "Private Conversation",
    description: "Unlock our private chat history",
    thumbnailUrl: "/assets/premium-message-thumb.jpg",
    price: 15,
    profileId: "profile-1",
  },
];

interface AIModelPremiumContentManagerProps {
  profile: AIProfile;
}

const AIModelPremiumContentManager = ({ profile }: AIModelPremiumContentManagerProps) => {
  const [activeTab, setActiveTab] = useState<string>("photos");
  const [purchasedContent, setPurchasedContent] = useState<string[]>([]);
  const { purchaseAIContent, checkContentAccess, isProcessing } = useAIModelMonetization();
  const { user } = useAuth();
  
  useEffect(() => {
    const checkPurchased = async () => {
      if (!user) return;
      
      const purchased = [];
      for (const content of mockPremiumContent) {
        if (await checkContentAccess(content.id)) {
          purchased.push(content.id);
        }
      }
      
      setPurchasedContent(purchased);
    };
    
    checkPurchased();
  }, [user, checkContentAccess]);
  
  const handlePurchase = async (content: PremiumContentItem) => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to purchase premium content",
        variant: "destructive",
      });
      return;
    }
    
    const success = await purchaseAIContent(content.id, content.profileId, content.price);
    
    if (success) {
      setPurchasedContent(prev => [...prev, content.id]);
    }
  };
  
  const filteredContent = mockPremiumContent.filter(
    content => content.profileId === profile.id && content.type === activeTab.slice(0, -1)
  );
  
  const getIconForType = (type: "photo" | "video" | "message") => {
    switch (type) {
      case "photo": return <Image className="h-5 w-5" />;
      case "video": return <Film className="h-5 w-5" />;
      case "message": return <MessageCircle className="h-5 w-5" />;
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Premium Content</CardTitle>
        <CardDescription>
          Exclusive content from {profile.name}
        </CardDescription>
      </CardHeader>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6">
          <TabsList className="w-full">
            <TabsTrigger value="photos" className="flex-1">
              <Image className="h-4 w-4 mr-2" />
              Photos
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex-1">
              <Film className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>
        </div>
        
        {["photos", "videos", "messages"].map(tab => (
          <TabsContent key={tab} value={tab} className="pt-2">
            {filteredContent.length === 0 ? (
              <CardContent>
                <div className="py-6 text-center text-muted-foreground">
                  No premium {tab} available yet
                </div>
              </CardContent>
            ) : (
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredContent.map(content => {
                    const isPurchased = purchasedContent.includes(content.id);
                    
                    return (
                      <Card key={content.id} className="overflow-hidden">
                        <div className="relative aspect-video bg-muted">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                            {getIconForType(content.type)}
                          </div>
                          {!isPurchased && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                              <Lock className="h-8 w-8 text-white/70" />
                            </div>
                          )}
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-medium">{content.title}</h4>
                              <p className="text-sm text-muted-foreground">
                                {content.description}
                              </p>
                            </div>
                            {!isPurchased && (
                              <Badge variant="outline" className="flex gap-1 items-center">
                                <Coins className="h-3 w-3" /> {content.price}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                        <CardFooter>
                          {isPurchased ? (
                            <Button className="w-full" variant="secondary">
                              View Content
                            </Button>
                          ) : (
                            <Button 
                              className="w-full" 
                              onClick={() => handlePurchase(content)}
                              disabled={isProcessing}
                            >
                              {isProcessing ? "Processing..." : "Purchase"}
                            </Button>
                          )}
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </Card>
  );
};

export default AIModelPremiumContentManager;
