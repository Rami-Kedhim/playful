import { useState, useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Escort } from "@/types/escort";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Copy, 
  Share2, 
  X, 
  Check, 
  Mail, 
  MessageSquare, 
  Instagram, 
  Link
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ShareProfileModalProps {
  escort: Escort;
  isOpen: boolean;
  onClose: () => void;
}

const ShareProfileModal = ({ escort, isOpen, onClose }: ShareProfileModalProps) => {
  const [copied, setCopied] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shareUrl = window.location.href;
  const [activeTab, setActiveTab] = useState<string>("social");

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
      case "email":
        shareLink = `mailto:?subject=${encodeURIComponent(`${escort.name}'s Profile`)}&body=${encodeURIComponent(`Check out ${escort.name}'s profile: ${shareUrl}`)}`;
        break;
      case "instagram":
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
      description: `Opening ${platform} to share ${escort.name}'s profile`,
    });
  };

  const handleShareViaMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;
    
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
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
          
          <TabsContent value="social" className="mt-4 space-y-4">
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
          </TabsContent>
          
          <TabsContent value="message" className="mt-4">
            <form onSubmit={handleShareViaMessage} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone Number
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full"
                />
                <p className="text-xs text-gray-400">
                  We'll send a text message with a link to this profile
                </p>
              </div>
              
              <Button type="submit" className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </form>
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
