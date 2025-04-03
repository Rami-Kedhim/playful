
import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Film, MessageSquare, Loader2 } from "lucide-react";
import VirtualContentGrid from "@/components/creators/VirtualContentGrid";
import useVirtualCreatorContent from "@/hooks/useVirtualCreatorContent";
import { ContentType } from "@/hooks/useVirtualContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    // Check if there's content for the active tab
    if (!loading && !error) {
      const hasContent = content.some(item => item.type === activeTab);
      setIsEmpty(!hasContent);
    }
  }, [activeTab, content, loading, error]);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Exclusive Content</CardTitle>
        <CardDescription>
          Unlock exclusive content from {username}
        </CardDescription>
      </CardHeader>
      
      <Tabs 
        defaultValue="photo" 
        onValueChange={(value) => setActiveTab(value as ContentType)}
      >
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
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-muted-foreground">Loading content...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="photo">
                {isEmpty ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No photos available yet</p>
                  </div>
                ) : (
                  <VirtualContentGrid 
                    items={content.filter(item => item.type === "photo")} 
                    columns={2}
                  />
                )}
              </TabsContent>
              <TabsContent value="video">
                {isEmpty ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <Film className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No videos available yet</p>
                  </div>
                ) : (
                  <VirtualContentGrid 
                    items={content.filter(item => item.type === "video")} 
                    columns={2}
                  />
                )}
              </TabsContent>
              <TabsContent value="message">
                {isEmpty ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages available yet</p>
                  </div>
                ) : (
                  <VirtualContentGrid 
                    items={content.filter(item => item.type === "message")} 
                    columns={2}
                  />
                )}
              </TabsContent>
            </>
          )}
        </CardContent>
      </Tabs>
    </Card>
  );
};

export default VirtualContentGallery;
