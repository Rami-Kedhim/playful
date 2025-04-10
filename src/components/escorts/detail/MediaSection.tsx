import React, { useState } from "react";
import { Escort } from "@/types/escort";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

interface MediaSectionProps {
  escort: Escort;
}

interface MediaItem {
  id: string;
  url: string;
  thumbnail: string;
  title: string;
}

const MediaSection = ({ escort }: MediaSectionProps) => {
  const [activeTab, setActiveTab] = useState("photos");
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const formatGallery = (gallery: string[] | undefined): MediaItem[] => {
    if (!gallery || gallery.length === 0) {
      return [];
    }
    
    return gallery.map((item, index) => {
      if (typeof item === 'object' && item !== null) {
        return item as unknown as MediaItem;
      }
      
      return {
        id: `photo-${index}`,
        url: item,
        thumbnail: item,
        title: `Photo ${index + 1}`
      };
    });
  };
  
  const photos = formatGallery(escort.gallery || escort.gallery_images);
  
  const videos = escort.videos?.map((video, index) => {
    if (typeof video === 'object' && video !== null && 'url' in video) {
      return video as unknown as MediaItem;
    }
    
    return {
      id: `video-${index}`,
      url: typeof video === 'string' ? video : '',
      thumbnail: typeof video === 'string' ? video : '',
      title: `Video ${index + 1}`
    };
  }) || [];

  const currentMedia = activeTab === "photos" ? photos : videos;
  
  const showNextMedia = () => {
    if (currentMediaIndex < currentMedia.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    }
  };
  
  const showPrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };
  
  if (photos.length === 0 && videos.length === 0) {
    return (
      <div className="bg-muted h-[300px] flex items-center justify-center rounded-lg">
        <p className="text-muted-foreground">No media available</p>
      </div>
    );
  }
  
  return (
    <>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="photos">Photos ({photos.length})</TabsTrigger>
          {videos.length > 0 && (
            <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="photos" className="m-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={photo.id} className="cursor-pointer" onClick={() => {
                setActiveTab("photos");
                setCurrentMediaIndex(index);
                setViewerOpen(true);
              }}>
                <AspectRatio ratio={3/4} className="bg-muted overflow-hidden rounded-md">
                  <img 
                    src={photo.url}
                    alt={photo.title}
                    className="object-cover w-full h-full"
                  />
                </AspectRatio>
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="videos" className="m-0">
          <div className="grid grid-cols-2 gap-2">
            {videos.map((video, index) => (
              <div key={video.id} className="cursor-pointer" onClick={() => {
                setActiveTab("videos");
                setCurrentMediaIndex(index);
                setViewerOpen(true);
              }}>
                <AspectRatio ratio={16/9} className="bg-muted overflow-hidden rounded-md">
                  <div className="relative">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 p-3 rounded-full">
                        <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
                <p className="text-sm mt-1 truncate">{video.title}</p>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      
      <Dialog open={viewerOpen} onOpenChange={setViewerOpen}>
        <DialogContent className="max-w-4xl p-0 bg-black/90 border-none">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 text-white z-10"
            onClick={() => setViewerOpen(false)}
          >
            <X />
          </Button>
          
          <div className="relative flex items-center justify-center h-full min-h-[50vh]">
            {activeTab === "photos" && currentMedia[currentMediaIndex] && (
              <img 
                src={currentMedia[currentMediaIndex].url}
                alt={currentMedia[currentMediaIndex].title}
                className="max-h-[80vh] max-w-full object-contain"
              />
            )}
            
            {activeTab === "videos" && currentMedia[currentMediaIndex] && (
              <video 
                src={typeof currentMedia[currentMediaIndex] === 'string' ? 
                  currentMedia[currentMediaIndex] as string : 
                  (currentMedia[currentMediaIndex] as {url: string}).url
                }
                controls
                className="max-h-[80vh] max-w-full"
              />
            )}
            
            {currentMediaIndex > 0 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-2 text-white"
                onClick={showPrevMedia}
              >
                <ArrowLeft />
              </Button>
            )}
            
            {currentMediaIndex < currentMedia.length - 1 && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-2 text-white"
                onClick={showNextMedia}
              >
                <ArrowRight />
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MediaSection;
