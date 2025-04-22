
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Lock, Image as ImageIcon, X } from 'lucide-react';
import { AIProfile } from '@/types/ai-profile';

interface AIProfileGalleryProps {
  aiProfile: AIProfile;
  onUnlockImage?: (imageUrl: string) => Promise<boolean>;
}

const AIProfileGallery: React.FC<AIProfileGalleryProps> = ({ 
  aiProfile, 
  onUnlockImage 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [unlocking, setUnlocking] = useState(false);
  
  // Function to handle unlocking premium images
  const handleUnlock = async () => {
    if (!selectedImage || !onUnlockImage) return;
    
    setUnlocking(true);
    try {
      const success = await onUnlockImage(selectedImage);
      if (success) {
        // Handle successful unlock
        console.log('Image unlocked successfully!');
      }
    } catch (error) {
      console.error('Error unlocking image:', error);
    } finally {
      setUnlocking(false);
    }
  };

  const imagePrice = aiProfile.ubx_image_price || 50; // Default price if not specified
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Gallery</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {aiProfile.gallery_images && aiProfile.gallery_images.length > 0 ? (
          aiProfile.gallery_images.map((imageUrl, index) => (
            <div 
              key={index} 
              className="aspect-square relative overflow-hidden rounded-md cursor-pointer bg-muted"
              onClick={() => setSelectedImage(imageUrl)}
            >
              <img 
                src={imageUrl} 
                alt={`${aiProfile.name} gallery ${index + 1}`} 
                className="object-cover w-full h-full"
              />
              {index > 2 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-3 py-8 flex flex-col items-center justify-center text-muted-foreground bg-muted rounded-md">
            <ImageIcon className="h-10 w-10 mb-2" />
            <p>No gallery images available</p>
          </div>
        )}
      </div>

      {/* Image Viewer Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-black">
          <div className="relative">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black/70"
            >
              <X className="h-5 w-5" />
            </button>
            
            <img 
              src={selectedImage || ''} 
              alt="Full size preview" 
              className="w-full h-auto"
            />
            
            {selectedImage && selectedImage.includes('premium') && (
              <div className="absolute inset-0 bg-black/75 flex flex-col items-center justify-center p-4 text-white">
                <Lock className="h-8 w-8 mb-2" />
                <p className="text-center mb-2">This is a premium image</p>
                <p className="text-center mb-4 text-sm text-gray-300">
                  Unlock this image for {imagePrice} UBX
                </p>
                <Button 
                  onClick={handleUnlock}
                  disabled={unlocking}
                >
                  {unlocking ? 'Processing...' : `Unlock for ${imagePrice} UBX`}
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AIProfileGallery;
