
import React from "react";
import { CreatorContent } from "@/types/creator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Eye, Trash2, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from "date-fns";

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
  onView
}) => {
  if (content.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No content found. Add your first content item to get started!</p>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-500";
      case "draft":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {content.map((item) => (
        <Card key={item.id} className="overflow-hidden">
          <div className="relative h-40 bg-muted">
            {item.thumbnail_url ? (
              <img 
                src={item.thumbnail_url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No thumbnail
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
            </div>
            {item.is_premium && (
              <div className="absolute top-2 left-2">
                <Badge className="bg-purple-500">Premium</Badge>
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold truncate">{item.title}</h3>
                <p className="text-sm text-muted-foreground truncate">
                  {item.content_type} • {item.created_at && formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                </p>
                <div className="flex items-center mt-1 text-xs">
                  <Eye className="w-3 h-3 mr-1" /> {item.views_count || 0}
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onView(item)}>
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onEdit(item)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(item.id)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContentList;
