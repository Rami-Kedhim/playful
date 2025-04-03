
import React from "react";
import { Button } from "@/components/ui/button";
import { LockIcon, UnlockIcon, Image as ImageIcon, Film, MessageSquare, AlertCircle } from "lucide-react";
import { useVirtualContent, ContentType } from "@/hooks/useVirtualContent";
import { useAuth } from "@/contexts/AuthContext";
import AICreatorBadge from "./AICreatorBadge";
import { Card, CardContent } from "@/components/ui/card";

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
  const { isContentUnlocked, unlockContent, isUnlocking, error } = useVirtualContent();
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

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
        <CardContent className="p-4 text-center flex flex-col items-center gap-2">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p className="text-sm text-red-600 dark:text-red-400">Error loading content</p>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <div className="relative rounded-lg overflow-hidden border bg-card text-card-foreground shadow transition-all hover:shadow-md">
      <div className="relative aspect-square bg-muted">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title || "Virtual content"} 
            className={`w-full h-full object-cover transition-opacity duration-200 ${unlocked ? 'opacity-100' : 'opacity-70'}`}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            {getContentTypeIcon()}
          </div>
        )}
        
        {!unlocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all">
            <LockIcon className="w-10 h-10 text-white/80" />
          </div>
        )}
        
        <div className="absolute top-2 right-2">
          <AICreatorBadge isCompact />
        </div>
      </div>
      
      <div className="p-3">
        {title && <h3 className="font-semibold text-sm line-clamp-1">{title}</h3>}
        {description && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{description}</p>}
        
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
              {isUnlocking ? (
                <>
                  <span className="animate-pulse">Processing...</span>
                </>
              ) : (
                <>
                  <LockIcon className="w-4 h-4 mr-2" />
                  Unlock for {price} LC
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default VirtualContent;
