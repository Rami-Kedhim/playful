
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Gift, Coins, HeartHandshake } from "lucide-react";
import { useAIModelMonetization } from "@/hooks/ai/useAIModelMonetization";
import { useAuth } from "@/hooks/auth";
import { toast } from "@/components/ui/use-toast";

interface GiftOption {
  id: string;
  type: string;
  name: string;
  imageUrl: string;
  price: number;
  description: string;
}

const giftOptions: GiftOption[] = [
  {
    id: "gift1",
    type: "rose",
    name: "Rose",
    imageUrl: "/assets/gifts/rose.png",
    price: 5,
    description: "A beautiful rose to show your appreciation"
  },
  {
    id: "gift2",
    type: "heart",
    name: "Heart",
    imageUrl: "/assets/gifts/heart.png",
    price: 20,
    description: "A heart-shaped gift to show your affection"
  },
  {
    id: "gift3",
    type: "diamond",
    name: "Diamond",
    imageUrl: "/assets/gifts/diamond.png",
    price: 50,
    description: "A luxurious diamond for someone truly special"
  },
  {
    id: "gift4",
    type: "champagne",
    name: "Champagne",
    imageUrl: "/assets/gifts/champagne.png",
    price: 75,
    description: "Celebrate with a bottle of champagne"
  },
  {
    id: "gift5",
    type: "crown",
    name: "Crown",
    imageUrl: "/assets/gifts/crown.png",
    price: 100,
    description: "Treat them like royalty with this crown"
  }
];

interface AIModelGiftSystemProps {
  profileId: string;
  profileName: string;
}

const AIModelGiftSystem = ({ profileId, profileName }: AIModelGiftSystemProps) => {
  const [selectedGift, setSelectedGift] = useState<GiftOption | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const { sendAIGift, isProcessing } = useAIModelMonetization();
  const { user } = useAuth();
  
  const handleSendGift = async () => {
    if (!selectedGift || !user) return;
    
    const success = await sendAIGift(
      profileId,
      selectedGift.type,
      selectedGift.price
    );
    
    if (success) {
      setIsDialogOpen(false);
      
      // Show animated gift effect (you would implement this in a real app)
      toast({
        title: "Gift sent!",
        description: `You sent ${profileName} a ${selectedGift.name}.`,
      });
    }
  };
  
  return (
    <>
      <Button 
        variant="outline" 
        className="flex items-center gap-2"
        onClick={() => setIsDialogOpen(true)}
      >
        <Gift className="h-4 w-4" />
        <span>Send a Gift</span>
      </Button>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Send a Gift to {profileName}
            </DialogTitle>
            <DialogDescription>
              Show your appreciation with a virtual gift
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4">
            {giftOptions.map(gift => (
              <Card 
                key={gift.id} 
                className={`cursor-pointer transition-all hover:scale-105 ${
                  selectedGift?.id === gift.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedGift(gift)}
              >
                <CardContent className="p-3 flex flex-col items-center">
                  <div className="h-16 w-16 flex items-center justify-center mb-2">
                    {/* Placeholder for gift image */}
                    <div className="bg-muted h-full w-full rounded-full flex items-center justify-center">
                      <HeartHandshake className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-medium text-center">{gift.name}</h3>
                  <div className="flex items-center justify-center mt-1 text-sm">
                    <Coins className="h-3 w-3 mr-1" />
                    <span>{gift.price}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <DialogFooter>
            <Button
              onClick={handleSendGift}
              disabled={!selectedGift || isProcessing || !user}
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <Coins className="h-4 w-4 mr-2" />
                  Send for {selectedGift?.price || 0} LC
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AIModelGiftSystem;
