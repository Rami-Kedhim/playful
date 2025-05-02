
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import ContentCard from '@/components/home/ContentCard';
import { useToast } from '@/components/ui/use-toast';
import useContentBrainHub from '@/hooks/useContentBrainHub';

interface Content {
  id: string;
  title: string;
  description: string;
  image?: string;
  category?: string;
  date?: string;
  author?: {
    name: string;
    avatar?: string;
  };
}

interface ContentGalleryProps {
  title?: string;
  initialContent?: Content[];
  isLoading?: boolean;
}

const ContentGallery: React.FC<ContentGalleryProps> = ({
  title = 'Content Gallery',
  initialContent = [],
  isLoading: externalLoading = false,
}) => {
  const [content, setContent] = useState<Content[]>(initialContent);
  const [isLoading, setIsLoading] = useState<boolean>(externalLoading);
  const [enhancing, setEnhancing] = useState<boolean>(false);
  const { toast } = useToast();
  const { processContent } = useContentBrainHub();

  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setContent([...initialContent]);
      setIsLoading(false);
      toast({
        title: "Content refreshed",
        description: "Content gallery has been updated",
      });
    }, 1500);
  };

  const handleEnhanceContent = async (contentId: string) => {
    setEnhancing(true);
    
    try {
      const selectedContent = content.find(item => item.id === contentId);
      
      if (!selectedContent) {
        throw new Error('Content not found');
      }
      
      // Process the content through Brain Hub
      const result = await processContent(selectedContent.description, 'text');
      
      // Update the content with enhanced version
      const updatedContent = content.map(item => {
        if (item.id === contentId) {
          return {
            ...item,
            description: result.enhancedContent,
          };
        }
        return item;
      });
      
      setContent(updatedContent);
      
      toast({
        title: "Content enhanced",
        description: `Enhanced content with ${result.recommendations.length} recommendations`,
      });
    } catch (error) {
      toast({
        title: "Enhancement failed",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{title}</h2>
        <Button 
          onClick={handleRefresh} 
          variant="outline" 
          size="sm"
          disabled={isLoading}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Refresh
        </Button>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <CardContent className="p-4 space-y-2">
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      ) : content.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {content.map((item) => (
            <ContentCard 
              key={item.id}
              id={item.id}
              name={item.title}
              imageUrl={item.image || "https://placehold.co/600x400?text=No+Image"}
              content={item}
              onEnhance={() => handleEnhanceContent(item.id)}
              isEnhancing={enhancing}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 flex flex-col items-center justify-center text-center">
          <p className="text-lg text-muted-foreground mb-4">No content available</p>
          <Button onClick={handleRefresh}>
            Load Content
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ContentGallery;
