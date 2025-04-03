
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Clock, Tv, Lock, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/ui/StarRating";
import VirtualContentGallery from "@/components/creators/detail/VirtualContentGallery";
import { Creator } from "@/hooks/useCreators";

interface ContentTabsProps {
  creator: Creator;
  handleSubscribe: () => void;
}

const ContentTabs: React.FC<ContentTabsProps> = ({ creator, handleSubscribe }) => {
  return (
    <Tabs defaultValue="about" className="w-full">
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
            <h3 className="text-xl font-semibold mb-2">About Me</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">{creator.bio || "This creator hasn't added a bio yet."}</p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <div className="mb-1">
                  <StarRating rating={creator.rating || 0} size={18} />
                </div>
                <span className="font-semibold">{creator.rating?.toFixed(1) || "0.0"}/5</span>
                <span className="text-xs text-gray-500">Rating</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <ImageIcon className="mb-1 text-blue-500" size={20} />
                <span className="font-semibold">{creator.contentCount.photos}</span>
                <span className="text-xs text-gray-500">Photos</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <Video className="mb-1 text-red-500" size={20} />
                <span className="font-semibold">{creator.contentCount.videos}</span>
                <span className="text-xs text-gray-500">Videos</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-muted rounded-md">
                <Globe className="mb-1 text-green-500" size={20} />
                <span className="font-semibold">Virtual</span>
                <span className="text-xs text-gray-500">Experience</span>
              </div>
            </div>
            
            {creator.tags && creator.tags.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-semibold mb-2">Categories</h4>
                <div className="flex flex-wrap gap-2">
                  {creator.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="capitalize">
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
        <VirtualContentGallery 
          creatorId={creator.id}
          username={creator.name}
        />
      </TabsContent>
      
      <TabsContent value="videos" className="mt-4">
        <VirtualContentGallery 
          creatorId={creator.id}
          username={creator.name}
        />
      </TabsContent>
      
      <TabsContent value="live" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            {creator.isLive ? (
              <div>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-4">
                  <img 
                    src={`https://picsum.photos/1280/720?random=${creator.id}`} 
                    alt={`${creator.name} livestream`}
                    className="object-cover w-full h-full opacity-60"
                  />
                  <div className="absolute top-4 left-4 flex items-center">
                    <Badge className="bg-red-500 animate-pulse mr-2">LIVE</Badge>
                    <span className="text-white text-sm flex items-center">
                      <Clock size={14} className="mr-1" /> 1:32:45
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-0 right-0 text-center">
                    <Button className="bg-red-500 hover:bg-red-600">Join Livestream</Button>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2">Current Livestream</h3>
                <p className="text-gray-500 mb-4">Join {creator.name} for an exclusive Q&A session!</p>
              </div>
            ) : (
              <div className="text-center py-12">
                <Tv className="mx-auto mb-2 text-gray-400" size={48} />
                <h3 className="font-medium text-xl mb-2">Not Currently Live</h3>
                <p className="text-gray-500 mb-4">
                  {creator.name} isn't streaming right now. Subscribe to get notified when they go live!
                </p>
                <Button variant="outline">Get Notified</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="exclusives" className="mt-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <Lock className="mx-auto mb-4 text-primary" size={36} />
              <h3 className="font-medium text-xl mb-3">Premium Exclusive Content</h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Subscribe to unlock exclusive content including private photos, 
                personal video calls, and custom content.
              </p>
              <Button onClick={handleSubscribe} className="bg-gradient-to-r from-purple-500 to-pink-500">
                Subscribe Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ContentTabs;
