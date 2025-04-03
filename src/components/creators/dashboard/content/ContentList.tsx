
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Eye, Trash2, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { CreatorContent } from "@/types/creator";

interface ContentListProps {
  content: CreatorContent[];
  onEdit: (content: CreatorContent) => void;
  onDelete: (contentId: string) => void;
  onView: (content: CreatorContent) => void;
}

const ContentList: React.FC<ContentListProps> = ({
  content,
  onEdit,
  onDelete,
  onView,
}) => {
  if (content.length === 0) {
    return (
      <Card className="p-6 text-center">
        <p className="text-muted-foreground">No content found. Create your first content!</p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative aspect-video bg-muted">
            {item.thumbnail_url ? (
              <img
                src={item.thumbnail_url}
                alt={item.title}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full bg-secondary">
                <span className="text-secondary-foreground">No thumbnail</span>
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              <Badge variant={item.is_premium ? "default" : "secondary"}>
                {item.is_premium ? (
                  <Lock className="mr-1 h-3 w-3" />
                ) : (
                  <Globe className="mr-1 h-3 w-3" />
                )}
                {item.is_premium ? "Premium" : "Free"}
              </Badge>
              <Badge variant={item.status === "published" ? "success" : "outline"}>
                {item.status}
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="font-medium truncate">{item.title}</h3>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{item.content_type.toUpperCase()}</span>
                <span>
                  {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span>{item.views_count} views</span>
                <span>{item.likes_count} likes</span>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onView(item)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEdit(item)}
                >
                  <Pencil className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => onDelete(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentList;
