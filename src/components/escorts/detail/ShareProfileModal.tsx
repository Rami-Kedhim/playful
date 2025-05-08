
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Escort } from "@/types/Escort"; // Fixed the casing here
import { 
  Share2, 
  X
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import SocialShareContent from "./SocialShareContent";
import DirectMessageContent from "./DirectMessageContent";

interface ShareProfileModalProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
}

const ShareProfileModal = ({ escort, isOpen, onClose }: ShareProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<string>("social");
  const shareUrl = window.location.href;

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setActiveTab("social");
    }
  }, [isOpen]);

  const handleShareViaMessage = (phone: string) => {
    // In a real app, this would send a message via SMS API
    // For demo purposes, show a success toast
    toast({
      title: "Message sent",
      description: `Profile link has been sent to ${phone}`,
    });
    
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Share2 className="mr-2 h-5 w-5" />
            Share {escort.name}'s Profile
          </DialogTitle>
          <DialogDescription>
            Share this profile via social media or copy the link directly
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="message">Direct Message</TabsTrigger>
          </TabsList>
          
          <TabsContent value="social" className="mt-4">
            <SocialShareContent 
              shareUrl={shareUrl} 
              escortName={escort.name} 
            />
          </TabsContent>
          
          <TabsContent value="message" className="mt-4">
            <DirectMessageContent onSubmit={handleShareViaMessage} />
          </TabsContent>
        </Tabs>
        
        <div className="mt-4">
          <Button 
            variant="ghost" 
            onClick={onClose} 
            className="w-full"
            aria-label="Cancel"
          >
            <X className="mr-2 h-4 w-4" />
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProfileModal;
