
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lock, Video } from "lucide-react";

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
  const lockedThreshold = isPremium ? (isPhotos ? 3 : 1) : itemCount;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{isPhotos ? "Photos" : "Videos"}</h3>
          <Badge variant="outline" className="font-normal">
            {contentCount} {contentType}
          </Badge>
        </div>
        
        {contentCount > 0 ? (
          <div className={`grid ${gridCols} gap-3`}>
            {Array(itemCount).fill(0).map((_, i) => (
              <div key={i} 
                className={`relative ${isPhotos ? 'aspect-square' : 'aspect-video'} rounded-md overflow-hidden bg-muted`}
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
                {i >= lockedThreshold && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <Lock className="text-white mb-2" size={24} />
                  </div>
                )}
                {!isPhotos && (
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                    {Math.floor(Math.random() * 10) + 2}:
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No {contentType} available yet.</p>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <Button disabled={!isPremium || contentCount === 0}>
            {contentCount === 0 
              ? `No ${contentType} Available` 
              : isPremium 
                ? `View All ${contentType}` 
                : "Subscribe to View"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VirtualContentGallery;
