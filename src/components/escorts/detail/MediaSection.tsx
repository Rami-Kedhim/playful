
import React, { useState } from 'react';
import { Escort } from '@/types/escort';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MediaSectionProps {
  escort: Escort;
  initialTab?: string;
}

const MediaSection: React.FC<MediaSectionProps> = ({ escort, initialTab = "photos" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Get gallery images from either gallery or gallery_images field
  const galleryImages = escort.gallery || escort.gallery_images || [];
  
  // Filter videos that are actual video objects or strings
  const videos = escort.videos?.filter(video => 
    typeof video === 'string' || 
    (typeof video === 'object' && video !== null && 'url' in video)
  ) || [];

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-2 w-full mb-4">
        <TabsTrigger value="photos">
          Photos ({galleryImages.length})
        </TabsTrigger>
        <TabsTrigger value="videos">
          Videos ({videos.length})
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="photos" className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {galleryImages.map((image, index) => (
            <AspectRatio ratio={3/4} key={index} className="overflow-hidden rounded-md">
              <img src={image} alt={`${escort.name} - ${index + 1}`} className="object-cover w-full h-full" />
            </AspectRatio>
          ))}
          
          {galleryImages.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">
              No photos available
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="videos" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {videos.map((video, index) => {
            const videoUrl = typeof video === 'string' ? video : (video && 'url' in video) ? video.url : '';
            const videoTitle = typeof video === 'string' ? `Video ${index + 1}` : (video && 'title' in video) ? video.title : `Video ${index + 1}`;
            
            return (
              <div key={index} className="space-y-1">
                <AspectRatio ratio={16/9} className="overflow-hidden rounded-md bg-black">
                  <video 
                    src={videoUrl} 
                    controls 
                    className="w-full h-full object-contain" 
                    poster={typeof video === 'object' && video !== null && 'thumbnail' in video ? video.thumbnail : undefined}
                  />
                </AspectRatio>
                <p className="text-sm font-medium">{videoTitle}</p>
              </div>
            );
          })}
          
          {videos.length === 0 && (
            <div className="col-span-full p-8 text-center text-gray-500">
              No videos available
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MediaSection;
