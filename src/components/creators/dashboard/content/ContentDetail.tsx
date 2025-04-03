
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CreatorContent } from "@/types/creator";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Eye, ThumbsUp, Lock, Globe } from "lucide-react";
import { format } from "date-fns";

interface ContentDetailProps {
  contentId: string | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (content: CreatorContent) => void;
  fetchContentDetail: (id: string) => Promise<CreatorContent | null>;
}

const ContentDetail: React.FC<ContentDetailProps> = ({
  contentId,
  isOpen,
  onClose,
  onEdit,
  fetchContentDetail,
}) => {
  const [content, setContent] = useState<CreatorContent | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadContentDetail = async () => {
      if (contentId && isOpen) {
        setLoading(true);
        try {
          const result = await fetchContentDetail(contentId);
          if (result) {
            setContent(result);
          }
        } catch (error) {
          console.error("Error loading content detail:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadContentDetail();
  }, [contentId, isOpen, fetchContentDetail]);

  const handleEdit = () => {
    if (content) {
      onEdit(content);
      onClose();
    }
  };

  const renderContent = () => {
    if (!content) return null;

    if (content.content_type === 'image') {
      return (
        <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
          <img
            src={content.url}
            alt={content.title}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }

    if (content.content_type === 'video') {
      return (
        <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
          {content.thumbnail_url ? (
            <div className="relative">
              <img
                src={content.thumbnail_url}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button variant="secondary" size="sm" onClick={() => window.open(content.url, '_blank')}>
                  Play Video
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button variant="secondary" onClick={() => window.open(content.url, '_blank')}>
                Play Video
              </Button>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="aspect-video flex items-center justify-center bg-muted rounded-md">
        <p className="text-muted-foreground">Preview not available</p>
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Content Details</DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="flex gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ) : content ? (
          <div className="space-y-6">
            {renderContent()}

            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold">{content.title}</h3>
                {content.description && (
                  <p className="text-sm text-muted-foreground mt-1">{content.description}</p>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge variant={content.content_type === 'video' ? 'default' : 'secondary'}>
                  {content.content_type.toUpperCase()}
                </Badge>
                <Badge variant={content.is_premium ? 'default' : 'outline'}>
                  {content.is_premium ? (
                    <><Lock className="mr-1 h-3 w-3" /> Premium</>
                  ) : (
                    <><Globe className="mr-1 h-3 w-3" /> Free</>
                  )}
                </Badge>
                <Badge variant={content.status === 'published' ? 'success' : 'outline'}>
                  {content.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <Label className="text-muted-foreground flex items-center">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    Created
                  </Label>
                  <p>{format(new Date(content.created_at), 'PPP')}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground flex items-center">
                    <Eye className="h-4 w-4 mr-2" />
                    Views
                  </Label>
                  <p>{content.views_count?.toLocaleString() || 0}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground flex items-center">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Likes
                  </Label>
                  <p>{content.likes_count?.toLocaleString() || 0}</p>
                </div>
                {content.is_premium && content.price && (
                  <div>
                    <Label className="text-muted-foreground">Price</Label>
                    <p>{content.price} LC</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Content not found</p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {content && (
            <Button onClick={handleEdit}>
              Edit Content
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetail;
