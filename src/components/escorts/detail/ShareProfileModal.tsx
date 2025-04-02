
import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Escort } from "@/data/escortData";
import { Facebook, Twitter, Linkedin, Copy, Share2, X, Check } from "lucide-react";

interface ShareProfileModalProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
}

const ShareProfileModal = ({ escort, isOpen, onClose }: ShareProfileModalProps) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shareUrl = window.location.href;

  // Reset copied state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    if (inputRef.current) {
      inputRef.current.select();
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      
      toast({
        title: "Link copied",
        description: "Profile link has been copied to clipboard",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToSocial = (platform: string) => {
    let shareLink = "";
    const text = `Check out ${escort.name}'s profile!`;
    
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      default:
        return;
    }
    
    window.open(shareLink, "_blank", "width=600,height=400");
    
    toast({
      title: "Sharing profile",
      description: `Opening ${platform} to share ${escort.name}'s profile`,
    });
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
        
        <div className="flex items-center space-x-2 mt-4">
          <Input 
            ref={inputRef}
            value={shareUrl} 
            readOnly 
            className="flex-1"
          />
          <Button 
            size="icon" 
            onClick={copyToClipboard}
            variant="outline"
            aria-label="Copy link"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="flex justify-center gap-4 mt-6">
          <Button
            onClick={() => shareToSocial("facebook")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-3 px-4"
            aria-label="Share to Facebook"
          >
            <Facebook className="h-8 w-8 text-blue-600" />
            <span className="text-xs">Facebook</span>
          </Button>
          
          <Button
            onClick={() => shareToSocial("twitter")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-3 px-4"
            aria-label="Share to Twitter"
          >
            <Twitter className="h-8 w-8 text-blue-400" />
            <span className="text-xs">Twitter</span>
          </Button>
          
          <Button
            onClick={() => shareToSocial("linkedin")}
            variant="outline"
            className="flex flex-col items-center gap-2 h-auto py-3 px-4"
            aria-label="Share to LinkedIn"
          >
            <Linkedin className="h-8 w-8 text-blue-700" />
            <span className="text-xs">LinkedIn</span>
          </Button>
        </div>
        
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
