
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Play, X } from "lucide-react";

interface EscortVideoGalleryProps {
  videos: string[];
}

const EscortVideoGallery = ({ videos }: EscortVideoGalleryProps) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  if (!videos || videos.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-3">Videos</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="relative aspect-video bg-gray-900 rounded-md overflow-hidden cursor-pointer group"
            onClick={() => setSelectedVideo(video)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Play size={36} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
            </div>
            <video 
              src={video} 
              className="w-full h-full object-cover opacity-80"
              preload="metadata"
            />
          </div>
        ))}
      </div>
      
      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="sm:max-w-[800px] p-0 bg-black">
          <DialogClose className="absolute right-4 top-4 z-10">
            <X className="h-6 w-6 text-white" />
            <span className="sr-only">Close</span>
          </DialogClose>
          <div className="w-full aspect-video">
            {selectedVideo && (
              <video 
                src={selectedVideo} 
                className="w-full h-full object-contain"
                controls
                autoPlay
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EscortVideoGallery;
