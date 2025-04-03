import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Video, Image, AlertCircle } from "lucide-react";
import { useVirtualContent } from "@/hooks/useVirtualContent";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

interface VirtualContentGalleryProps {
  contentType: "photos" | "videos";
  contentCount: number;
  isPremium: boolean;
  creatorId: string;
}

const VirtualContentGallery = ({ 
  contentType, 
  contentCount, 
  isPremium, 
  creatorId 
}: VirtualContentGalleryProps) => {
  const isPhotos = contentType === "photos";
  const gridCols = isPhotos ? "grid-cols-2 md:grid-cols-3" : "grid-cols-1 md:grid-cols-2";
  const itemCount = Math.min(isPhotos ? 6 : 4, contentCount);
  const publicThreshold = 2; // Number of items that are publicly viewable
  
  const { user } = useAuth();
  const { unlockContent, isContentUnlocked, isUnlocking } = useVirtualContent();
  const [selectedContent, setSelectedContent] = useState<number | null>(null);
  const [unlockDialogOpen, setUnlockDialogOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);

  const handleUnlock = async (index: number) => {
    if (!user) {
      setUnlockDialogOpen(true);
      return;
    }
    
    const contentPrice = isPhotos ? 15 : 25; // Photos cost 15 Lucoins, videos 25
    
    const success = await unlockContent({
      creatorId,
      contentId: `${creatorId}-${contentType}-${index}`,
      contentType: isPhotos ? "photo" : "video",
      price: contentPrice
    });
    
    if (success) {
      setSelectedContent(index);
      setViewerOpen(true);
    }
  };

  const handleContentClick = (index: number) => {
    // If content is already unlocked or is public, show it directly
    if (index < publicThreshold || isContentUnlocked(`${creatorId}-${contentType}-${index}`)) {
      setSelectedContent(index);
      setViewerOpen(true);
    } else {
      // Otherwise prompt to unlock
      handleUnlock(index);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {isPhotos ? "Photos" : "Videos"}
          </h3>
          <Badge variant="outline" className="font-normal">
            {contentCount} {contentType}
          </Badge>
        </div>
        
        {contentCount > 0 ? (
          <div className={`grid ${gridCols} gap-3`}>
            {Array(itemCount).fill(0).map((_, i) => {
              const isUnlocked = i < publicThreshold || isContentUnlocked(`${creatorId}-${contentType}-${i}`);
              
              return (
                <div 
                  key={i} 
                  onClick={() => handleContentClick(i)}
                  className={`relative ${isPhotos ? 'aspect-square' : 'aspect-video'} rounded-md overflow-hidden bg-muted cursor-pointer group`}
                >
                  <img 
                    src={isPhotos 
                      ? `https://picsum.photos/300/300?random=${creatorId}${i}` 
                      : `https://picsum.photos/640/360?random=${creatorId}${i}`
                    } 
                    alt={`Preview content ${i+1}`}
                    className="object-cover w-full h-full"
                  />
                  {!isPhotos && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <Button variant="ghost" size="icon" className="rounded-full h-12 w-12 bg-black/30">
                        <Video className="text-white" size={24} />
                      </Button>
                    </div>
                  )}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                      <Lock className="text-white mb-2" size={24} />
                      <span className="text-white text-sm font-medium">
                        {isPhotos ? "15" : "25"} Lucoins
                      </span>
                    </div>
                  )}
                  {!isPhotos && (
                    <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                      {Math.floor(Math.random() * 10) + 2}:
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No {contentType} available yet.</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Button disabled={contentCount === 0}>
            {contentCount === 0 
              ? `No ${contentType} Available` 
              : `View All ${contentType}`}
          </Button>
        </div>
      </CardContent>

      {/* Dialog for when user is not logged in */}
      <Dialog open={unlockDialogOpen} onOpenChange={setUnlockDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>
              You need to be logged in to unlock premium content.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" onClick={() => setUnlockDialogOpen(false)}>
              Cancel
            </Button>
            <Button>Login</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Content Viewer Dialog */}
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden bg-black">
          {selectedContent !== null && (
            isPhotos ? (
              <img 
                src={`https://picsum.photos/1200/1200?random=${creatorId}${selectedContent}`} 
                alt={`Full content ${selectedContent+1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
            ) : (
              <div className="relative aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-full h-full" />
                  <div className="absolute">
                    <AlertCircle className="text-white mb-2 mx-auto" size={24} />
                    <p className="text-white text-sm">Video simulation - would play video in production</p>
                  </div>
                </div>
              </div>
            )
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default VirtualContentGallery;
