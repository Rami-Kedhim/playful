import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit as EditIcon, Trash2 as TrashIcon, File as FileIcon } from 'lucide-react';
import { CreatorContent } from '@/types/creator';

interface ContentDetailProps {
  content: CreatorContent;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ContentDetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <h4 className="text-sm font-medium">{label}</h4>
    <p className="text-sm text-muted-foreground">{value}</p>
  </div>
);

const ContentDetail: React.FC<ContentDetailProps> = ({ content, onEdit, onDelete }) => {
  const renderContentPreview = () => {
    switch (content.contentType) {
      case 'video':
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden">
            <video
              src={content.url}
              controls
              className="w-full h-full object-contain"
              poster={content.thumbnailUrl}
            />
          </div>
        );
      case 'image':
        return (
          <div className="aspect-video bg-black rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={content.url}
              alt={content.title}
              className="max-w-full max-h-full object-contain"
            />
          </div>
        );
      default:
        return (
          <div className="aspect-video bg-zinc-900 rounded-lg flex items-center justify-center">
            <FileIcon className="h-12 w-12 text-zinc-500" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onEdit(content.id)}>
            <EditIcon className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(content.id)}>
            <TrashIcon className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      </div>

      {renderContentPreview()}

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Content Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <ContentDetailItem label="Content Type" value={content.contentType} />
              <ContentDetailItem 
                label="Premium Content" 
                value={content.isPremium ? "Yes" : "No"} 
              />
              <ContentDetailItem 
                label="Date Created" 
                value={new Date(content.createdAt).toLocaleDateString()} 
              />
              <ContentDetailItem 
                label="Views" 
                value={content.viewCount.toString()} 
              />
              <ContentDetailItem 
                label="Likes" 
                value={content.likeCount.toString()} 
              />
              {content.isPremium && (
                <ContentDetailItem 
                  label="Price" 
                  value={`$${content.price?.toFixed(2)}`} 
                />
              )}
            </div>

            <div className="pt-2">
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <p className="text-sm text-muted-foreground">
                {content.description || "No description provided"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContentDetail;
