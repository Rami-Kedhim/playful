
import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Image, Film, MessageSquare, Loader2, AlertCircle } from "lucide-react";
import VirtualContentGrid from "@/components/creators/VirtualContentGrid";
import useVirtualCreatorContent from "@/hooks/useVirtualCreatorContent";
import { ContentType } from "@/hooks/useVirtualContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { logContentAction } from "@/utils/debugUtils";

export interface VirtualContentGalleryProps {
  creatorId: string;
  username: string;
}

const VirtualContentGallery: React.FC<VirtualContentGalleryProps> = ({
  creatorId,
  username
}) => {
  const [activeTab, setActiveTab] = useState<ContentType>("photo");
  const { content, loading, error, hasMore, loadMore } = useVirtualCreatorContent(creatorId);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);

  useEffect(() => {
    logContentAction('Content gallery rendered', { 
      creatorId, 
      username, 
      activeTab 
    });
    
    // Check if there's content for the active tab
    if (!loading && !error) {
      const hasContent = content.some(item => item.type === activeTab);
      setIsEmpty(!hasContent);
      logContentAction('Content tab check', { 
        activeTab, 
        hasContent, 
        totalItems: content.length 
      });
    }
  }, [activeTab, content, loading, error, creatorId, username]);

  const handleTabChange = useCallback((value: string) => {
    logContentAction('Tab changed', { from: activeTab, to: value });
    setActiveTab(value as ContentType);
  }, [activeTab]);
  
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
        onValueChange={handleTabChange}
        data-testid="content-tabs"
      >
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="photo" className="flex items-center gap-2" data-testid="photo-tab">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Photos</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2" data-testid="video-tab">
              <Film className="h-4 w-4" />
              <span className="hidden sm:inline">Videos</span>
            </TabsTrigger>
            <TabsTrigger value="message" className="flex items-center gap-2" data-testid="message-tab">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          {loading ? (
            <div className="text-center p-8" data-testid="content-loading">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
              <p className="text-muted-foreground">Loading content...</p>
            </div>
          ) : error ? (
            <Alert variant="destructive" className="mb-4" data-testid="content-error">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {error}
              </AlertDescription>
            </Alert>
          ) : (
            <>
              <TabsContent value="photo" data-testid="photo-content">
                {isEmpty ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <Image className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No photos available yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <VirtualContentGrid 
                      items={content.filter(item => item.type === "photo")} 
                      columns={2}
                    />
                    
                    {hasMore && (
                      <div className="text-center pt-4">
                        <Button 
                          variant="outline" 
                          onClick={loadMore}
                          data-testid="load-more-button"
                        >
                          Load More
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="video" data-testid="video-content">
                {isEmpty ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <Film className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No videos available yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <VirtualContentGrid 
                      items={content.filter(item => item.type === "video")} 
                      columns={2}
                    />
                    
                    {hasMore && (
                      <div className="text-center pt-4">
                        <Button 
                          variant="outline" 
                          onClick={loadMore}
                          data-testid="load-more-button"
                        >
                          Load More
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="message" data-testid="message-content">
                {isEmpty ? (
                  <div className="text-center p-8 text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No messages available yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <VirtualContentGrid 
                      items={content.filter(item => item.type === "message")} 
                      columns={2}
                    />
                    
                    {hasMore && (
                      <div className="text-center pt-4">
                        <Button 
                          variant="outline" 
                          onClick={loadMore}
                          data-testid="load-more-button"
                        >
                          Load More
                        </Button>
                      </div>
                    )}
                  </div>
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
