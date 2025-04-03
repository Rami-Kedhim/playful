
import React from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, UnlockIcon, Image as ImageIcon, Film, MessageSquare } from "lucide-react";
import { useVirtualContent, ContentType } from "@/hooks/useVirtualContent";
import { useAuth } from "@/contexts/AuthContext";
import AICreatorBadge from "./AICreatorBadge";

interface VirtualContentProps {
  creatorId: string;
  contentId: string;
  contentType: ContentType;
  price: number;
  thumbnailUrl?: string;
  title?: string;
  description?: string;
}

const VirtualContent: React.FC<VirtualContentProps> = ({
  creatorId,
  contentId,
  contentType,
  price,
  thumbnailUrl,
  title,
  description
}) => {
  const { isContentUnlocked, unlockContent, isUnlocking } = useVirtualContent();
  const { user } = useAuth();
  
  const handleUnlock = async () => {
    if (!user) {
      // Redirect to auth page if not logged in
      window.location.href = "/auth";
      return;
    }
    
    await unlockContent({
      creatorId,
      contentId,
      contentType,
      price
    });
  };
  
  const unlocked = isContentUnlocked(contentId);
  
  const getContentTypeIcon = () => {
    switch (contentType) {
      case "photo":
        return <ImageIcon className="w-4 h-4" />;
      case "video":
        return <Film className="w-4 h-4" />;
      case "message":
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <ImageIcon className="w-4 h-4" />;
    }
  };
  
  return (
    <div className="relative rounded-lg overflow-hidden border bg-card text-card-foreground shadow">
      <div className="relative aspect-square bg-muted">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title || "Virtual content"} 
            className={`w-full h-full object-cover transition-opacity duration-200 ${unlocked ? 'opacity-100' : 'opacity-70'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            {getContentTypeIcon()}
          </div>
        )}
        
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <LockIcon className="w-10 h-10 text-white/80" />
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <AICreatorBadge isCompact />
        </div>
      </div>
      
      <div className="p-3">
        {title && <h3 className="font-semibold text-sm">{title}</h3>}
        {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
        
        <div className="mt-3">
          {unlocked ? (
            <Button variant="outline" size="sm" className="w-full" disabled>
              <UnlockIcon className="w-4 h-4 mr-2" />
              Unlocked
            </Button>
          ) : (
            <Button 
              variant="default" 
              size="sm" 
              className="w-full" 
              onClick={handleUnlock}
              disabled={isUnlocking}
            >
              <LockIcon className="w-4 h-4 mr-2" />
              Unlock for {price} LC
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualContent;
