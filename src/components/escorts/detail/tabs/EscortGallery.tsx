
import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Card } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

export interface EscortGalleryProps {
  images: string[];
  videos: Array<{ id: string; url: string; thumbnail: string; title: string }>;
}

const EscortGallery: React.FC<EscortGalleryProps> = ({ images, videos }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const openImage = (image: string) => {
    setSelectedImage(image);
  };
  
  const closeImage = () => {
    setSelectedImage(null);
  };
  
  const openVideo = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
  };
  
  const closeVideo = () => {
    setSelectedVideo(null);
  };
  
  return (
    <>
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div 
              key={`image-${index}`}
              className="aspect-square rounded-md overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openImage(image)}
            >
              <img 
                src={image} 
                alt={`Gallery image ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      {videos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {videos.map((video) => (
            <Card
              key={video.id}
              className="overflow-hidden cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openVideo(video.url)}
            >
              <div className="relative aspect-video">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <PlayCircle className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="p-2">
                <h4 className="text-sm font-medium line-clamp-1">{video.title}</h4>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {images.length === 0 && videos.length === 0 && (
        <p className="text-center text-muted-foreground py-8">No gallery content available</p>
      )}
      
      {/* Image lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={closeImage}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Gallery preview" 
              className="w-full h-auto object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
      
      {/* Video player */}
      <Dialog open={!!selectedVideo} onOpenChange={closeVideo}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          {selectedVideo && (
            <div className="aspect-video w-full">
              <video 
                src={selectedVideo}
                controls
                autoPlay
                className="w-full h-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EscortGallery;
