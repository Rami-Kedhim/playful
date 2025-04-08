
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Creator } from "@/hooks/useCreators";
import CreatorPosts from "./tabs/CreatorPosts";
import CreatorPhotos from "./tabs/CreatorPhotos";
import CreatorVideos from "./tabs/CreatorVideos";
import CreatorLivestreams from "./tabs/CreatorLivestreams";
import CreatorAbout from "./tabs/CreatorAbout";

interface CreatorTabsProps {
  creator: Creator;
  isSubscribed: boolean;
}

const CreatorTabs: React.FC<CreatorTabsProps> = ({ creator, isSubscribed }) => {
  return (
    <Tabs defaultValue="posts">
      <TabsList className="grid grid-cols-5 w-full">
        <TabsTrigger value="posts">Posts</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="videos">Videos</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
      </TabsList>
      
      <TabsContent value="posts" className="mt-6">
        <CreatorPosts creator={creator} isSubscribed={isSubscribed} />
      </TabsContent>
      
      <TabsContent value="photos" className="mt-6">
        <CreatorPhotos creator={creator} isSubscribed={isSubscribed} />
      </TabsContent>
      
      <TabsContent value="videos" className="mt-6">
        <CreatorVideos creator={creator} isSubscribed={isSubscribed} />
      </TabsContent>
      
      <TabsContent value="live" className="mt-6">
        <CreatorLivestreams creator={creator} isSubscribed={isSubscribed} />
      </TabsContent>
      
      <TabsContent value="about" className="mt-6">
        <CreatorAbout creator={creator} />
      </TabsContent>
    </Tabs>
  );
};

export default CreatorTabs;
