
import React, { useState } from 'react';
import { useAIModelMonetization } from '@/hooks/ai/useAIModelMonetization';
import { Button } from '@/components/ui/button';
import { Card, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AIProfile } from '@/types/ai-profile';
import { Lock, Image, Coins } from 'lucide-react';

interface AIProfileGalleryProps {
  profile: AIProfile;
}

const AIProfileGallery: React.FC<AIProfileGalleryProps> = ({ profile }) => {
  const [selectedTab, setSelectedTab] = useState('gallery');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const aiModelMonetization = useAIModelMonetization();
  const { unlockImage, isImageUnlocked } = aiModelMonetization;
  
  const handleUnlockImage = (imageUrl: string) => {
    if (unlockImage) {
      unlockImage(profile.id, imageUrl, profile.lucoin_image_price || 5);
    }
  };
  
  const handleSelectImage = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  // Handle gallery images from different possible sources
  const galleryImages = profile.gallery_images || [];
  
  // If no images, show placeholder
  if (galleryImages.length === 0) {
    return (
      <Card className="overflow-hidden">
        <div className="flex items-center justify-center h-64 bg-muted/30">
          <div className="text-center">
            <Image className="h-10 w-10 mx-auto text-muted-foreground" />
            <p className="text-sm text-muted-foreground mt-2">No gallery images available</p>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <div className="space-y-4">
      <Tabs defaultValue="gallery" value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
        </TabsList>
        
        <TabsContent value="gallery" className="mt-4">
          <div className="grid grid-cols-3 gap-2">
            {galleryImages.slice(0, 6).map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-square cursor-pointer overflow-hidden rounded-md"
                onClick={() => handleSelectImage(image)}
              >
                {isImageUnlocked && isImageUnlocked(image) ? (
                  <img 
                    src={image} 
                    alt={`Gallery ${index + 1}`}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                ) : (
                  <div className="relative h-full w-full bg-muted/50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Lock className="h-6 w-6 text-muted-foreground" />
                      <p className="mt-1 text-xs flex items-center">
                        <Coins className="h-3 w-3 mr-1" />
                        {profile.lucoin_image_price || 5} UBX
                      </p>
                    </div>
                    {/* Blurred preview in background */}
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover opacity-40 blur-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {profile.gallery_images && profile.gallery_images.length > 6 && (
            <Button variant="outline" className="w-full mt-4">
              View All {profile.gallery_images.length} Images
            </Button>
          )}
        </TabsContent>
        
        <TabsContent value="featured" className="mt-4">
          <div className="grid grid-cols-2 gap-4">
            {galleryImages.slice(0, 4).map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-[3/4] cursor-pointer overflow-hidden rounded-md"
                onClick={() => handleSelectImage(image)}
              >
                {isImageUnlocked && isImageUnlocked(image) ? (
                  <img 
                    src={image} 
                    alt={`Featured ${index + 1}`}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                ) : (
                  <div className="relative h-full w-full bg-muted/50">
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <Lock className="h-8 w-8 text-muted-foreground" />
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUnlockImage(image);
                        }}
                        size="sm"
                        className="mt-2"
                      >
                        <Coins className="h-3 w-3 mr-1" />
                        Unlock ({profile.lucoin_image_price || 5} UBX)
                      </Button>
                    </div>
                    {/* Blurred preview in background */}
                    <img 
                      src={image} 
                      alt={`Preview ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover opacity-40 blur-md"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Full size image modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-3xl max-h-[90vh] p-4" onClick={e => e.stopPropagation()}>
            <img 
              src={selectedImage} 
              alt="Full size" 
              className="max-h-[80vh] max-w-full object-contain rounded-lg"
            />
            <Button
              variant="ghost"
              className="absolute top-4 right-4 text-white hover:bg-black/20"
              onClick={() => setSelectedImage(null)}
            >
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIProfileGallery;
