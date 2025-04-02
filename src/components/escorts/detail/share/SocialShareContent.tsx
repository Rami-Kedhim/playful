
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Mail,
  Instagram,
  Link,
  Check
} from "lucide-react";

interface SocialShareContentProps {
  shareUrl: string;
  escortName: string;
  onCopySuccess?: () => void;
}

const SocialShareContent = ({ shareUrl, escortName, onCopySuccess }: SocialShareContentProps) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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
      
      if (onCopySuccess) {
        onCopySuccess();
      }
    }
  };

  const shareToSocial = (platform: string) => {
    let shareLink = "";
    const text = `Check out ${escortName}'s profile!`;
    
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
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(`${escortName}'s Profile`)}&body=${encodeURIComponent(`Check out ${escortName}'s profile: ${shareUrl}`)}`;
        break;
      case "instagram":
        // Instagram doesn't support direct sharing via URL, show instructions instead
        toast({
          title: "Instagram Sharing",
          description: "Copy the link and paste it into your Instagram story or post",
        });
        copyToClipboard();
        return;
      default:
        return;
    }
    
    window.open(shareLink, "_blank", "width=600,height=400");
    
    toast({
      title: "Sharing profile",
      description: `Opening ${platform} to share ${escortName}'s profile`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
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
      
      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={() => shareToSocial("facebook")}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3 px-2"
          aria-label="Share to Facebook"
        >
          <Facebook className="h-8 w-8 text-blue-600" />
          <span className="text-xs">Facebook</span>
        </Button>
        
        <Button
          onClick={() => shareToSocial("twitter")}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3 px-2"
          aria-label="Share to Twitter"
        >
          <Twitter className="h-8 w-8 text-blue-400" />
          <span className="text-xs">Twitter</span>
        </Button>
        
        <Button
          onClick={() => shareToSocial("linkedin")}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3 px-2"
          aria-label="Share to LinkedIn"
        >
          <Linkedin className="h-8 w-8 text-blue-700" />
          <span className="text-xs">LinkedIn</span>
        </Button>
        
        <Button
          onClick={() => shareToSocial("email")}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3 px-2"
          aria-label="Share via Email"
        >
          <Mail className="h-8 w-8 text-gray-500" />
          <span className="text-xs">Email</span>
        </Button>
        
        <Button
          onClick={() => shareToSocial("instagram")}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3 px-2"
          aria-label="Share to Instagram"
        >
          <Instagram className="h-8 w-8 text-pink-500" />
          <span className="text-xs">Instagram</span>
        </Button>
        
        <Button
          onClick={copyToClipboard}
          variant="outline"
          className="flex flex-col items-center gap-2 h-auto py-3 px-2"
          aria-label="Copy Link"
        >
          <Link className="h-8 w-8 text-gray-400" />
          <span className="text-xs">Copy Link</span>
        </Button>
      </div>
    </div>
  );
};

export default SocialShareContent;
