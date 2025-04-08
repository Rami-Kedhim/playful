
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { Creator } from '@/hooks/useCreators';

interface CreatorPhotosProps {
  creator: Creator;
  isSubscribed: boolean;
}

const CreatorPhotos: React.FC<CreatorPhotosProps> = ({ creator, isSubscribed }) => {
  // Generate some demo photo URLs - in production would come from API/storage
  const generatePhotos = (count: number, blur: boolean = false) => {
    return Array(count).fill(0).map((_, i) => ({
      id: `photo-${i + 1}`,
      url: `https://picsum.photos/seed/${creator.id}-${i}/500/400`,
      isBlurred: blur,
      isPremium: i % 3 === 0,
      title: `Photo ${i + 1}`
    }));
  };
  
  const photos = isSubscribed ? generatePhotos(12) : generatePhotos(6, true);
  
  if (photos.length === 0) {
    return (
      <Card className="border-border/40">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No photos available</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollArea className="h-[600px] pr-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map(photo => (
          <div key={photo.id} className="relative group overflow-hidden rounded-md">
            <img 
              src={photo.url} 
              alt={photo.title} 
              className={`w-full h-40 object-cover transition-all 
              ${photo.isBlurred ? 'blur-sm hover:blur-[6px]' : 'hover:scale-105'}`}
            />
            
            {photo.isPremium && isSubscribed && (
              <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                Premium
              </div>
            )}
            
            {!isSubscribed && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity">
                <Lock className="h-6 w-6 text-white mb-2" />
                <p className="text-white text-xs">Subscribe to unlock</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {!isSubscribed && (
        <Card className="border-primary/20 bg-primary/5 mt-6">
          <CardContent className="p-4 text-center">
            <p className="text-muted-foreground mb-2">
              Subscribe to see {creator.name}'s full photo collection
            </p>
          </CardContent>
        </Card>
      )}
      
      <div className="mt-6 text-center">
        <Button variant="outline">Load More</Button>
      </div>
    </ScrollArea>
  );
};

export default CreatorPhotos;
