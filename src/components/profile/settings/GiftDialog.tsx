import { useState, useEffect } from "react";
import { Gift, Loader2, Send, Info } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useLucoins, GiftItem } from "@/hooks/useLucoins";

interface GiftDialogProps {
  recipientId: string;
  recipientName: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
}

const GiftDialog = ({ recipientId, recipientName, onSuccess, trigger }: GiftDialogProps) => {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [giftItems, setGiftItems] = useState<GiftItem[]>([]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const { profile } = useAuth();
  const { loading, fetchGiftItems, sendGift } = useLucoins();

  useEffect(() => {
    if (open) {
      loadGiftItems();
    }
  }, [open]);

  const loadGiftItems = async () => {
    const data = await fetchGiftItems();
    setGiftItems(data);
    
    // Auto-select the first gift if none is selected
    if (data.length > 0 && !selectedGift) {
      setSelectedGift(data[0].id);
    }
  };

  const handleSendGift = async () => {
    if (!selectedGift) {
      toast({
        title: "No gift selected",
        description: "Please select a gift to send",
        variant: "destructive",
      });
      return;
    }

    const success = await sendGift(recipientId, selectedGift, message);
    
    if (success) {
      setOpen(false);
      setMessage("");
      if (onSuccess) onSuccess();
    }
  };

  // Get the selected gift details
  const getSelectedGift = () => {
    return giftItems.find(gift => gift.id === selectedGift);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            <Gift className="mr-2 h-4 w-4" />
            Send Gift
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Send a Gift to {recipientName}</DialogTitle>
          <DialogDescription>
            Choose a gift to brighten their day and show your appreciation
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {giftItems.map((gift) => (
              <Card 
                key={gift.id}
                className={`p-3 cursor-pointer transition-all ${
                  selectedGift === gift.id 
                    ? "ring-2 ring-primary" 
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedGift(gift.id)}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2">
                    <img 
                      src={gift.thumbnail_url || "/placeholder.svg"} 
                      alt={gift.name}
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-sm font-medium">{gift.name}</h3>
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <Coins className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-bold">{gift.price_lucoin}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="mt-4">
            <Label htmlFor="message">Add a message (optional)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write something nice..."
              className="mt-1"
            />
          </div>
          
          <div className="flex justify-between items-center bg-muted p-3 rounded-md mt-2">
            <div className="flex items-center">
              <Coins className="h-4 w-4 text-yellow-500 mr-2" />
              <span className="text-sm">Your balance:</span>
              <span className="ml-2 font-medium">{profile?.lucoin_balance || profile?.lucoinsBalance || 0} LC</span>
            </div>
            {getSelectedGift() && (
              <div className="flex items-center">
                <span className="text-sm">Gift price:</span>
                <span className="ml-2 font-medium">{getSelectedGift()?.price_lucoin} LC</span>
              </div>
            )}
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center text-sm text-muted-foreground cursor-help">
                  <Info className="h-4 w-4 mr-1" />
                  What happens when I send a gift?
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  When you send a gift, the recipient will receive a notification and the gift will be displayed on their profile. They'll also receive Lucoins that they can use on the platform.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSendGift} 
            disabled={!selectedGift || loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Gift
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Coins icon component 
const Coins = ({ className }: { className?: string }) => (
  <svg 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path 
      d="M12 17.75C7.99594 17.75 4.75 15.8373 4.75 13.5V7.5C4.75 9.83731 7.99594 11.75 12 11.75C16.0041 11.75 19.25 9.83731 19.25 7.5V13.5C19.25 15.8373 16.0041 17.75 12 17.75Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M4.75 7.5C4.75 5.16269 7.99594 3.25 12 3.25C16.0041 3.25 19.25 5.16269 19.25 7.5C19.25 9.83731 16.0041 11.75 12 11.75C7.99594 11.75 4.75 9.83731 4.75 7.5Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
);

export default GiftDialog;
