
import React, { useState } from 'react';
import { Escort } from '@/types/escort';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MediaSectionProps {
  escort: Escort;
  initialTab?: string;
}

interface VideoItem {
  url: string;
  title?: string;
  thumbnail?: string;
}

const MediaSection: React.FC<MediaSectionProps> = ({ escort, initialTab = "photos" }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  
  // Get gallery images from either gallery or images field
  let galleryImages: string[] = [];
  
  if (escort.gallery && 'imageUrls' in escort.gallery && Array.isArray(escort.gallery.imageUrls)) {
    galleryImages = escort.gallery.imageUrls;
  } else if (Array.isArray(escort.gallery)) {
    galleryImages = escort.gallery;
  } else if (escort.images && Array.isArray(escort.images)) {
    galleryImages = escort.images as string[];
  }
  
  // Process videos to ensure they're in a consistent format
  const processVideos = (): VideoItem[] => {
    if (!escort.videos || !Array.isArray(escort.videos)) return [];
    
    return escort.videos.map((video, index) => {
      // Handle string URLs
      if (typeof video === 'string') {
        return { 
          url: video,
          title: `Video ${index + 1}`
        };
      }
      
      // Handle object videos
      if (typeof video === 'object' && video !== null) {
        return {
          url: (video as any).url || '',
          title: (video as any).title || `Video ${index + 1}`,
          thumbnail: (video as any).thumbnail
        };
      }
      
      // Default fallback
      return {
        url: '',
        title: `Video ${index + 1}`
      };
    }).filter(video => video.url); // Filter out videos with empty URLs
  };
  
  const videos = processVideos();

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
          {videos.map((video, index) => (
            <div key={index} className="space-y-1">
              <AspectRatio ratio={16/9} className="overflow-hidden rounded-md bg-black">
                <video 
                  src={video.url} 
                  controls 
                  className="w-full h-full object-contain" 
                  poster={video.thumbnail}
                />
              </AspectRatio>
              <p className="text-sm font-medium">{video.title}</p>
            </div>
          ))}
          
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
