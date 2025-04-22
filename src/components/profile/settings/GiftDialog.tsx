
import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Gift, Heart, Star, Coffee, Diamond } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/hooks/auth";

const GIFT_OPTIONS = [
  { id: 'heart', name: 'Heart', icon: Heart, price: 10, description: 'Show some love' },
  { id: 'star', name: 'Star', icon: Star, price: 25, description: 'You\'re a star' },
  { id: 'coffee', name: 'Coffee', icon: Coffee, price: 50, description: 'Buy me a coffee' },
  { id: 'diamond', name: 'Diamond', icon: Diamond, price: 100, description: 'Ultra premium gift' },
];

interface GiftDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  recipientId: string;
  recipientName: string;
}

const GiftDialog: React.FC<GiftDialogProps> = ({ 
  open, 
  onOpenChange, 
  recipientId, 
  recipientName 
}) => {
  const { user } = useAuth();
  const [selectedGift, setSelectedGift] = useState(GIFT_OPTIONS[0].id);
  const [message, setMessage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Calculate total
  const selectedGiftOption = GIFT_OPTIONS.find(gift => gift.id === selectedGift);
  const totalAmount = (selectedGiftOption?.price || 0) * quantity;

  // Mock balance - in a real app would come from user profile
  const balance = user ? 500 : 0;
  const insufficientFunds = totalAmount > balance;

  const handleSend = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Gift Sent!",
        description: `You sent ${quantity} ${selectedGiftOption?.name}${quantity > 1 ? 's' : ''} to ${recipientName}.`,
      });
      
      onOpenChange(false);
    } catch (error) {
      console.error('Error sending gift:', error);
      toast({
        title: "Failed to send gift",
        description: "There was an error processing your request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Send a Gift to {recipientName}</DialogTitle>
          <DialogDescription>
            Show your appreciation with a virtual gift
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="gift-type">Select Gift</Label>
            <Select
              value={selectedGift}
              onValueChange={setSelectedGift}
            >
              <SelectTrigger id="gift-type">
                <SelectValue placeholder="Select gift type" />
              </SelectTrigger>
              <SelectContent>
                {GIFT_OPTIONS.map((gift) => (
                  <SelectItem key={gift.id} value={gift.id}>
                    <div className="flex items-center">
                      <gift.icon className="h-4 w-4 mr-2" />
                      <span>{gift.name} - {gift.price} LuCoins</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="gift-quantity">Quantity</Label>
            <Input
              id="gift-quantity"
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="gift-message">Message (Optional)</Label>
            <Input
              id="gift-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Add a personal message..."
            />
          </div>
          
          <Separator />
          
          <div className="flex justify-between items-center">
            <span>Total:</span>
            <span className="font-bold">{totalAmount} LuCoins</span>
          </div>
          
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Balance:</span>
            <span>{balance} LuCoins</span>
          </div>
          
          {insufficientFunds && (
            <div className="text-red-500 text-sm">
              Insufficient balance. Add more LuCoins to continue.
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSend} 
            disabled={isSubmitting || insufficientFunds}
          >
            {isSubmitting ? (
              <>Sending...</>
            ) : (
              <>
                <Gift className="mr-2 h-4 w-4" />
                Send Gift
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GiftDialog;
