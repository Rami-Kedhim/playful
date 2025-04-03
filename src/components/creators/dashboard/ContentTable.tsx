
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { ContentItem } from "@/services/contentService";
import { Edit, MoreVertical, Trash2, Eye, Calendar, ArrowUpFromLine } from "lucide-react";

interface ContentTableProps {
  content: ContentItem[];
  onEdit: (content: ContentItem) => void;
  onDelete: (id: string) => void;
  onPublish?: (id: string) => void;
  emptyMessage?: string;
  showPublishButton?: boolean;
}

const ContentTable = ({ 
  content, 
  onEdit, 
  onDelete, 
  onPublish,
  emptyMessage = "No content found",
  showPublishButton = false
}: ContentTableProps) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
  
  const handleDeleteClick = (id: string) => {
    setSelectedContentId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (selectedContentId) {
      await onDelete(selectedContentId);
      setDeleteDialogOpen(false);
      setSelectedContentId(null);
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case 'public':
        return <Badge variant="outline">Public</Badge>;
      case 'subscribers':
        return <Badge>Subscribers</Badge>;
      case 'premium':
        return <Badge variant="secondary">Premium</Badge>;
      default:
        return <Badge variant="outline">{visibility}</Badge>;
    }
  };
  
  if (content.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Visibility</TableHead>
              <TableHead>Stats</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-muted">
                      <img 
                        src={item.thumbnail_url} 
                        alt={item.title} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          // Fallback for broken images
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Content';
                        }}
                      />
                    </div>
                    <div>
                      <div className="font-medium truncate max-w-[200px]">{item.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                        {item.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {item.media_type === 'video' ? 'Video' : 'Image'}
                  </Badge>
                </TableCell>
                <TableCell>
                  {getVisibilityBadge(item.visibility)}
                </TableCell>
                <TableCell>
                  <div className="flex space-x-2 text-sm">
                    <span className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" /> {item.views_count}
                    </span>
                    <span>•</span>
                    <span>{item.likes_count} likes</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{formatDate(item.created_at)}</span>
                    {item.status === 'scheduled' && item.scheduled_for && (
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Calendar className="h-3 w-3 mr-1" /> {formatDate(item.scheduled_for)}
                      </span>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEdit(item)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      {showPublishButton && onPublish && (
                        <DropdownMenuItem onClick={() => onPublish(item.id)}>
                          <ArrowUpFromLine className="h-4 w-4 mr-2" />
                          Publish
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuItem 
                        className="text-destructive"
                        onClick={() => handleDeleteClick(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your content
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ContentTable;
