
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Escort } from '@/types/escort';
import EscortGallery from './tabs/EscortGallery';

interface MediaSectionProps {
  escort: Escort;
}

const MediaSection: React.FC<MediaSectionProps> = ({ escort }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
      <Tabs defaultValue="gallery" className="w-full">
        <TabsList>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
          {escort.videos && escort.videos.length > 0 && (
            <TabsTrigger value="videos">Videos</TabsTrigger>
          )}
        </TabsList>
        <TabsContent value="gallery" className="mt-4">
          <EscortGallery 
            images={escort.gallery || []} 
            videos={[]} 
          />
        </TabsContent>
        {escort.videos && escort.videos.length > 0 && (
          <TabsContent value="videos" className="mt-4">
            <EscortGallery 
              images={[]} 
              videos={escort.videos} 
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default MediaSection;
