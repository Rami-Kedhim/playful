
// Create the missing SocialShareContent component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Copy, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

interface SocialShareContentProps {
  shareUrl: string;
  escortName: string;
}

const SocialShareContent = ({ shareUrl, escortName }: SocialShareContentProps) => {
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied",
        description: "Profile link copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or copy manually",
        variant: "destructive",
      });
    }
  };

  const handleSocialShare = (platform: string) => {
    let shareLink = "";
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(`Check out ${escortName}'s profile`);

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
      case "instagram":
        // Instagram doesn't support direct sharing URLs, so we'll just copy the link
        handleCopyLink();
        toast({
          title: "Instagram sharing",
          description: "Link copied. Open Instagram and paste in your message",
        });
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank", "width=600,height=400");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input 
          value={shareUrl} 
          readOnly
          className="flex-1"
        />
        <Button 
          onClick={handleCopyLink} 
          variant="outline" 
          size="icon" 
          aria-label="Copy link"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleSocialShare("facebook")}
        >
          <Facebook className="mr-2 h-4 w-4 text-blue-600" />
          Facebook
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleSocialShare("twitter")}
        >
          <Twitter className="mr-2 h-4 w-4 text-blue-400" />
          Twitter
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleSocialShare("linkedin")}
        >
          <Linkedin className="mr-2 h-4 w-4 text-blue-700" />
          LinkedIn
        </Button>
        <Button 
          variant="outline" 
          className="flex-1"
          onClick={() => handleSocialShare("instagram")}
        >
          <Instagram className="mr-2 h-4 w-4 text-pink-600" />
          Instagram
        </Button>
      </div>
    </div>
  );
};

export default SocialShareContent;
