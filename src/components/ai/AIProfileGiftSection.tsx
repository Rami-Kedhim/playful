
import { useState } from "react";
import { AIProfile } from "@/types/ai-profile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Heart, Diamond, Coffee, Star, Crown } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface AIProfileGiftSectionProps {
  profile: AIProfile;
}

interface GiftItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  price: number;
  description: string;
}

const AIProfileGiftSection: React.FC<AIProfileGiftSectionProps> = ({ profile }) => {
  const [selectedGift, setSelectedGift] = useState<GiftItem | null>(null);
  const [processing, setProcessing] = useState(false);

  const gifts: GiftItem[] = [
    { 
      id: "gift-1", 
      name: "Virtual Rose",
      icon: <Heart className="h-6 w-6 text-red-500" />, 
      price: 5, 
      description: "Show your appreciation with a beautiful virtual rose" 
    },
    { 
      id: "gift-2", 
      name: "Coffee Date",
      icon: <Coffee className="h-6 w-6 text-amber-600" />, 
      price: 10, 
      description: "Treat your AI companion to a virtual coffee date" 
    },
    { 
      id: "gift-3", 
      name: "Premium Gift",
      icon: <Diamond className="h-6 w-6 text-blue-500" />, 
      price: 25, 
      description: "Send a luxurious gift that will be remembered" 
    },
    { 
      id: "gift-4", 
      name: "VIP Status",
      icon: <Crown className="h-6 w-6 text-yellow-500" />, 
      price: 50, 
      description: "Give VIP treatment and special attention" 
    },
  ];

  const handleSendGift = async (gift: GiftItem) => {
    setSelectedGift(gift);
    setProcessing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Gift Sent",
      description: `You've sent a ${gift.name} to ${profile.name}! They'll appreciate your gesture.`,
    });
    
    setProcessing(false);
    setSelectedGift(null);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Gift className="mr-2 h-5 w-5" />
          Send a Gift
        </h3>
        
        <Tabs defaultValue="gifts">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="gifts">Virtual Gifts</TabsTrigger>
            <TabsTrigger value="boosts">Boosts</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gifts" className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {gifts.map(gift => (
                <div 
                  key={gift.id}
                  className={`border rounded-md p-3 flex flex-col items-center hover:bg-accent transition-colors cursor-pointer ${
                    selectedGift?.id === gift.id ? "border-primary bg-accent" : ""
                  }`}
                  onClick={() => setSelectedGift(gift)}
                >
                  <div className="mb-2">
                    {gift.icon}
                  </div>
                  <span className="text-sm font-medium">{gift.name}</span>
                  <span className="text-xs text-muted-foreground mt-1">{gift.price} LC</span>
                </div>
              ))}
            </div>
            
            {selectedGift ? (
              <div className="mt-4 border-t pt-4">
                <div className="mb-2">
                  <span className="text-sm font-medium">Selected Gift: {selectedGift.name}</span>
                  <p className="text-xs text-muted-foreground">{selectedGift.description}</p>
                </div>
                <Button 
                  className="w-full" 
                  onClick={() => handleSendGift(selectedGift)}
                  disabled={processing}
                >
                  {processing ? "Sending..." : `Send for ${selectedGift.price} LC`}
                </Button>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Select a gift to send to {profile.name}
              </p>
            )}
          </TabsContent>
          
          <TabsContent value="boosts" className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">Featured Boost</div>
                    <div className="text-xs text-muted-foreground">Promote in featured profiles</div>
                  </div>
                </div>
                <Button size="sm">25 LC</Button>
              </div>
              
              <div className="flex items-center justify-between border rounded-md p-3">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-purple-500 mr-2" />
                  <div>
                    <div className="text-sm font-medium">Premium Boost</div>
                    <div className="text-xs text-muted-foreground">Higher visibility in search</div>
                  </div>
                </div>
                <Button size="sm">50 LC</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AIProfileGiftSection;
