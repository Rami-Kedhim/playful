
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LivecamModel } from "@/types/livecams";

interface ShareButtonProps {
  model: LivecamModel;
}

const ShareButton: React.FC<ShareButtonProps> = ({ model }) => {
  const [isOpen, setIsOpen] = useState(false);
  const shareUrl = window.location.href;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast({
        title: "Link copied!",
        description: "The stream link has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Copy failed",
        description: "Unable to copy link. Please try again.",
        variant: "destructive",
      });
    });
    setIsOpen(false);
  };

  const handleShareSocial = (platform: string) => {
    let url = "";
    const text = `Check out ${model.displayName}'s live stream!`;
    
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      default:
        return;
    }
    
    window.open(url, "_blank", "width=600,height=400");
    setIsOpen(false);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-1"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this stream</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Stream</DialogTitle>
            <DialogDescription>
              Share {model.displayName}'s stream with friends
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 my-4">
            <Input 
              value={shareUrl}
              readOnly
              className="flex-1"
            />
            <Button 
              variant="primary" 
              onClick={handleCopyLink}
              className="shrink-0"
            >
              Copy
            </Button>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto py-3"
              onClick={() => handleShareSocial("twitter")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
              <span className="text-xs">Twitter</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto py-3"
              onClick={() => handleShareSocial("facebook")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
              <span className="text-xs">Facebook</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col gap-2 h-auto py-3"
              onClick={() => handleShareSocial("telegram")}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                <path d="m22 2-7 20-4-9-9-4Z"></path>
                <path d="M22 2 11 13"></path>
              </svg>
              <span className="text-xs">Telegram</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareButton;
