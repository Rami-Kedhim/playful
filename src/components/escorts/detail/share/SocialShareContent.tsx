
import React, { useState } from "react";
import { Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { 
  FacebookIcon, 
  TwitterIcon, 
  LinkedinIcon, 
  InstagramIcon, 
  Share2 
} from "lucide-react";

interface SocialShareContentProps {
  shareUrl: string;
  escortName: string;
}

const SocialShareContent = ({ shareUrl, escortName }: SocialShareContentProps) => {
  const [copied, setCopied] = useState(false);
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({
        title: "Link Copied",
        description: "Profile link has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast({
        title: "Failed to copy",
        description: "Could not copy link to clipboard",
        variant: "destructive",
      });
    }
  };
  
  const handleShareSocial = (platform: string) => {
    let shareLink = "";
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(`Check out ${escortName}'s profile!`);
    
    switch (platform) {
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      default:
        break;
    }
    
    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 justify-center">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleShareSocial("facebook")}
        >
          <FacebookIcon className="h-5 w-5 text-blue-600" />
          <span className="sr-only">Share on Facebook</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleShareSocial("twitter")}
        >
          <TwitterIcon className="h-5 w-5 text-sky-500" />
          <span className="sr-only">Share on Twitter</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => handleShareSocial("linkedin")}
        >
          <LinkedinIcon className="h-5 w-5 text-blue-700" />
          <span className="sr-only">Share on LinkedIn</span>
        </Button>
        
        <Button 
          variant="outline" 
          size="icon" 
          disabled
          title="Instagram sharing coming soon"
        >
          <InstagramIcon className="h-5 w-5 text-pink-600" />
          <span className="sr-only">Share on Instagram</span>
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Input 
          readOnly 
          value={shareUrl} 
          className="bg-muted"
        />
        <Button 
          variant="secondary" 
          onClick={handleCopyLink}
        >
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
};

export default SocialShareContent;
