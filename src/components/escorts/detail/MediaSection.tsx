
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Escort, Video } from "@/types/escort";
import GalleryGrid from "./GalleryGrid";
import VideoGrid from "./VideoGrid";

interface MediaSectionProps {
  escort: Escort;
}

const MediaSection: React.FC<MediaSectionProps> = ({ escort }) => {
  const hasPhotos =
    Boolean(escort.gallery && escort.gallery.length > 0) ||
    Boolean(escort.gallery_images && escort.gallery_images.length > 0) ||
    Boolean(escort.images && escort.images.length > 0);

  const hasVideos = Boolean(escort.videos && escort.videos.length > 0);

  if (!hasPhotos && !hasVideos) return null;

  const getGalleryImages = (): string[] => {
    if (escort.gallery && escort.gallery.length > 0) {
      return escort.gallery;
    } else if (escort.gallery_images && escort.gallery_images.length > 0) {
      return escort.gallery_images;
    } else if (escort.images && escort.images.length > 0) {
      return escort.images;
    }
    return [];
  };

  const getVideos = (): Video[] => {
    if (escort.videos && escort.videos.length > 0) {
      return escort.videos;
    }
    return [];
  };

  return (
    <div className="mt-8">
      <Tabs defaultValue="photos">
        <TabsList>
          {hasPhotos && <TabsTrigger value="photos">Photos ({getGalleryImages().length})</TabsTrigger>}
          {hasVideos && <TabsTrigger value="videos">Videos ({getVideos().length})</TabsTrigger>}
        </TabsList>

        {hasPhotos && (
          <TabsContent value="photos" className="mt-4">
            <GalleryGrid images={getGalleryImages()} />
          </TabsContent>
        )}

        {hasVideos && (
          <TabsContent value="videos" className="mt-4">
            <VideoGrid videos={getVideos()} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MediaSection;
