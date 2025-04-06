
import { useState } from "react";
import { AIProfile } from "@/types/ai-profile";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LockIcon, ImageIcon } from "lucide-react";
import useAIModelMonetizationStore from "@/store/aiModelMonetizationStore";

interface AIProfileGalleryProps {
  profile: AIProfile;
}

const AIProfileGallery: React.FC<AIProfileGalleryProps> = ({ profile }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { unlockImage, isImageUnlocked } = useAIModelMonetizationStore();

  const handleUnlock = async (imageUrl: string) => {
    await unlockImage(profile.id, imageUrl, profile.lucoin_image_price || 10);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold mb-4">Gallery</h3>
        
        {selectedImage && (
          <div className="mb-4">
            <div className="aspect-square rounded-md overflow-hidden relative">
              <img 
                src={selectedImage} 
                alt={profile.name} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2">
          {profile.gallery_images?.map((image, index) => {
            const isUnlocked = isImageUnlocked(profile.id, image);
            const needsUnlocking = index > 1 && !isUnlocked;
            
            return (
              <div 
                key={image}
                className="aspect-square rounded-md overflow-hidden relative cursor-pointer"
                onClick={() => !needsUnlocking && setSelectedImage(image)}
              >
                {needsUnlocking ? (
                  <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                    <LockIcon className="h-6 w-6 text-white mb-1" />
                    <Button 
                      size="sm" 
                      variant="secondary" 
                      className="mt-1 text-xs"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUnlock(image);
                      }}
                    >
                      Unlock {profile.lucoin_image_price} LC
                    </Button>
                  </div>
                ) : null}
                <img 
                  src={needsUnlocking ? image.replace(/\.(jpg|png)$/, "-blur.$1") : image} 
                  alt={`${profile.name} gallery ${index + 1}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          
          {(!profile.gallery_images || profile.gallery_images.length === 0) && (
            <div className="col-span-3 py-8 flex flex-col items-center justify-center text-muted-foreground">
              <ImageIcon className="h-12 w-12 mb-2 opacity-20" />
              <p>No gallery images available yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AIProfileGallery;
