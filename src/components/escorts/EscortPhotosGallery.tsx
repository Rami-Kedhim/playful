
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Image, Lock, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EscortPhotosGalleryProps {
  photos: string[];
  className?: string;
}

const EscortPhotosGallery: React.FC<EscortPhotosGalleryProps> = ({ 
  photos = [], 
  className 
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(photos[0] || null);

  // Security feature - track verified media content
  const isVerifiedMedia = (url: string) => {
    // In a real implementation, this would check the media hash against a verified database
    return true;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Image className="h-5 w-5 mr-2 text-primary" />
          Photos
          <div className="ml-auto">
            <span className="flex items-center text-xs text-green-500">
              <Shield className="h-3 w-3 mr-1" />
              Verified Content
            </span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {photos.length > 0 ? (
          <div className="space-y-4">
            {/* Main selected photo */}
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-muted">
              {selectedPhoto ? (
                <img
                  src={selectedPhoto}
                  alt="Selected"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-muted">
                  <Lock className="h-10 w-10 text-muted-foreground/50" />
                </div>
              )}
              
              {/* Security indicator */}
              {selectedPhoto && isVerifiedMedia(selectedPhoto) && (
                <div className="absolute top-2 right-2">
                  <span className="bg-green-500/80 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Shield className="h-3 w-3 mr-1" />
                    Secure
                  </span>
                </div>
              )}
            </div>
            
            {/* Thumbnail gallery */}
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {photos.map((photo, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative cursor-pointer aspect-square overflow-hidden rounded-md bg-muted",
                    selectedPhoto === photo && "ring-2 ring-primary"
                  )}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-32 w-full items-center justify-center text-muted-foreground">
            <p>No photos available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EscortPhotosGallery;
