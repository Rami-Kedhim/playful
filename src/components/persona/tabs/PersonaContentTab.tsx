
import React from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock } from 'lucide-react';

interface PersonaContentTabProps {
  persona: UberPersona;
}

const PersonaContentTab: React.FC<PersonaContentTabProps> = ({ persona }) => {
  // Mock data for gallery items
  const mockPhotos = Array.from({ length: 8 }, (_, i) => ({
    id: `photo-${i}`,
    url: `https://source.unsplash.com/300x300/?model,portrait,${i}`,
    isLocked: i > 3 // Make some content premium
  }));

  const mockVideos = Array.from({ length: 4 }, (_, i) => ({
    id: `video-${i}`,
    thumbnailUrl: `https://source.unsplash.com/300x200/?video,thumbnail,${i}`,
    duration: `${Math.floor(Math.random() * 10) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    isLocked: i > 1 // Make some content premium
  }));

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Content Gallery</h2>
      
      <Tabs defaultValue="photos" className="w-full">
        <TabsList>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          {persona.capabilities.hasVideos && (
            <TabsTrigger value="videos">Videos</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="photos" className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockPhotos.map((photo) => (
              <div key={photo.id} className="relative aspect-square rounded-md overflow-hidden group">
                <img 
                  src={photo.url} 
                  alt="Gallery" 
                  className={`w-full h-full object-cover ${photo.isLocked ? 'blur-sm' : ''}`}
                />
                {photo.isLocked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Button variant="secondary" size="sm">
                      <Lock className="h-4 w-4 mr-1" />
                      Unlock
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {persona.monetization.subscriptionPrice && (
            <div className="mt-6 text-center">
              <Button size="lg">
                Subscribe for {persona.monetization.subscriptionPrice} LC to access all content
              </Button>
            </div>
          )}
        </TabsContent>
        
        {persona.capabilities.hasVideos && (
          <TabsContent value="videos" className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {mockVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img 
                      src={video.thumbnailUrl} 
                      alt="Video thumbnail" 
                      className={`w-full h-full object-cover ${video.isLocked ? 'blur-sm' : ''}`}
                    />
                    {!video.isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Button variant="secondary" size="icon" className="rounded-full">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                        </Button>
                      </div>
                    )}
                    {video.isLocked && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <Button variant="secondary">
                          <Lock className="h-4 w-4 mr-1" />
                          Unlock Video
                        </Button>
                      </div>
                    )}
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default PersonaContentTab;
