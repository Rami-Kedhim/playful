
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
  const galleryImages = React.useMemo(() => {
    let images: string[] = [];
    
    if (escort.gallery) {
      if (typeof escort.gallery === 'object' && !Array.isArray(escort.gallery)) {
        // Handle gallery object with imageUrls property
        const galleryObj = escort.gallery as { imageUrls: string[] };
        if (galleryObj.imageUrls && Array.isArray(galleryObj.imageUrls)) {
          images = galleryObj.imageUrls;
        }
      } else if (Array.isArray(escort.gallery)) {
        // Handle gallery array
        images = escort.gallery;
      }
    } else if (escort.images && Array.isArray(escort.images)) {
      // Fallback to images array
      images = escort.images;
    } else if (escort.gallery_images && Array.isArray(escort.gallery_images)) {
      // Fallback to gallery_images array
      images = escort.gallery_images;
    }
    
    return images;
  }, [escort]);
  
  // Process videos to ensure they're in a consistent format
  const videos = React.useMemo(() => {
    const videosArray: VideoItem[] = [];
    
    // Handle case when escort.videos doesn't exist
    if (!escort.videos) {
      return videosArray;
    }
    
    // Handle case when escort.videos exists
    if (Array.isArray(escort.videos)) {
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
    }
    
    return videosArray;
  }, [escort.videos]);

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
