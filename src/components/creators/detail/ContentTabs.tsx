
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Lock, Image as ImageIcon, Video, Clock } from "lucide-react";
import { Creator } from "@/hooks/useCreators";
import { Badge } from "@/components/ui/badge";

interface ContentTabsProps {
  creator: Creator;
  handleSubscribe: () => void;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ creator, handleSubscribe }) => {
  const [activeTab, setActiveTab] = useState("about");

  // Placeholder for when we don't have actual content
  const dummyImages = Array(6).fill(null).map((_, i) => ({
    id: `img-${i}`,
    url: `https://source.unsplash.com/random/300x300?sig=${i}`,
    title: `Image ${i+1}`,
    isPremium: i % 3 === 0
  }));

  const dummyVideos = Array(4).fill(null).map((_, i) => ({
    id: `vid-${i}`,
    thumbnailUrl: `https://source.unsplash.com/random/300x200?sig=${i+10}`,
    title: `Video ${i+1}`,
    duration: Math.floor(Math.random() * 10) + 1,
    isPremium: i % 2 === 0
  }));

  return (
    <Tabs defaultValue="about" value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
        <TabsTrigger value="exclusives">Exclusives</TabsTrigger>
      </TabsList>
      
      <TabsContent value="about" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-gray-600 dark:text-gray-400">
              {creator.bio || "This creator hasn't added a bio yet."}
            </p>
            
            {creator.tags && creator.tags.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {creator.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="photos" className="mt-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {dummyImages.map(image => (
            <div key={image.id} className="relative rounded-lg overflow-hidden aspect-square">
              <img 
                src={image.url} 
                alt={image.title}
                className="w-full h-full object-cover"
              />
              {image.isPremium && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <Lock className="h-8 w-8 text-white mb-2" />
                  <p className="text-white text-sm">Premium Content</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={handleSubscribe}
                  >
                    Subscribe to View
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="videos" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {dummyVideos.map(video => (
            <div key={video.id} className="relative rounded-lg overflow-hidden">
              <div className="aspect-video relative">
                <img 
                  src={video.thumbnailUrl} 
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  {video.duration}:00
                </div>
              </div>
              <p className="mt-2 font-medium">{video.title}</p>
              
              {video.isPremium && (
                <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
                  <Lock className="h-8 w-8 text-white mb-2" />
                  <p className="text-white text-sm">Premium Content</p>
                  <Button 
                    size="sm" 
                    className="mt-2"
                    onClick={handleSubscribe}
                  >
                    Subscribe to View
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="live" className="mt-4">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
            {creator.isLive ? (
              <div className="text-center">
                <div className="w-full max-w-2xl aspect-video bg-gray-800 rounded-lg mb-6 flex items-center justify-center relative">
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-500 animate-pulse">LIVE</Badge>
                  </div>
                  <Button onClick={handleSubscribe}>Join Live Stream</Button>
                </div>
                <h3 className="font-bold text-xl">Live Stream in Progress!</h3>
                <p className="text-gray-500 mt-2">Subscribe now to join the live stream</p>
              </div>
            ) : (
              <div className="text-center">
                <Clock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <h3 className="font-bold text-xl">No Live Stream</h3>
                <p className="text-gray-500 mt-2">
                  {creator.name} is not currently streaming. Subscribe to get notified of upcoming streams.
                </p>
                <Button className="mt-6" onClick={handleSubscribe}>
                  Subscribe for Notifications
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="exclusives" className="mt-4">
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center py-12">
            <Lock className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <h3 className="font-bold text-xl">Premium Content</h3>
            <p className="text-gray-500 mt-2 text-center max-w-md mx-auto">
              Subscribe to {creator.name}'s channel to unlock exclusive content, private messaging, and special perks.
            </p>
            <Button className="mt-6" onClick={handleSubscribe}>
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
