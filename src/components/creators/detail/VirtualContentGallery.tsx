
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Film, MessageSquare } from "lucide-react";
import VirtualContentGrid from "@/components/creators/VirtualContentGrid";
import useVirtualCreatorContent from "@/hooks/useVirtualCreatorContent";
import { ContentType } from "@/hooks/useVirtualContent";

export interface VirtualContentGalleryProps {
  creatorId: string;
  username: string;
}

const VirtualContentGallery: React.FC<VirtualContentGalleryProps> = ({
  creatorId,
  username
}) => {
  const [activeTab, setActiveTab] = useState<ContentType>("photo");
  const { content, loading, error } = useVirtualCreatorContent(creatorId);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Exclusive Content</CardTitle>
        <CardDescription>
          Unlock exclusive content from {username}
        </CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="photo" onValueChange={(value) => setActiveTab(value as ContentType)}>
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photo" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Photos</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          {loading ? (
            <div className="text-center p-8">
              <div className="animate-pulse h-4 w-1/2 bg-muted rounded mx-auto mb-2"></div>
              <div className="animate-pulse h-32 w-full bg-muted rounded"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 text-destructive">
              Error loading content: {error}
            </div>
          ) : (
            <>
              <TabsContent value="photo">
                <VirtualContentGrid 
                  items={content.filter(item => item.type === "photo")} 
                  columns={2}
                />
              </TabsContent>
              <TabsContent value="video">
                <VirtualContentGrid 
                  items={content.filter(item => item.type === "video")} 
                  columns={2}
                />
              </TabsContent>
              <TabsContent value="message">
                <VirtualContentGrid 
                  items={content.filter(item => item.type === "message")} 
                  columns={2}
                />
              </TabsContent>
            </>
          )}
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default VirtualContentGallery;
