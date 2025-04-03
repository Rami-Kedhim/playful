
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CircleEllipsis, 
  Eye, 
  Edit, 
  Trash2, 
  MessageCircle, 
  Star, 
  BarChart, 
  Share2, 
  ArrowUpRight, 
  Lock 
} from "lucide-react";
import { ContentItem } from "@/services/contentService";
import { format } from "date-fns";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";

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
  emptyMessage = "No content available",
  showPublishButton = false
}: ContentTableProps) => {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [previewContent, setPreviewContent] = useState<ContentItem | null>(null);
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false);
  
  const openDeleteDialog = (id: string) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteDialogOpen(false);
      setDeleteId(null);
    }
  };
  
  const openPreviewDialog = (content: ContentItem) => {
    setPreviewContent(content);
    setPreviewDialogOpen(true);
  };
  
  const getMediaTypeIcon = (mediaType: string) => {
    switch (mediaType) {
      case "image":
        return "🖼️";
      case "video":
        return "🎬";
      case "text":
        return "📝";
      default:
        return "📄";
    }
  };
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return "—";
    return format(new Date(dateString), "MMM d, yyyy");
  };

  if (content.length === 0) {
    return (
      <div className="text-center py-12 border rounded-md bg-card/50">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell">Stats</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {content.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="bg-muted w-10 h-10 rounded flex items-center justify-center overflow-hidden">
                      {item.thumbnail_url ? (
                        <img 
                          src={item.thumbnail_url} 
                          alt={item.title} 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg">
                          {getMediaTypeIcon(item.media_type)}
                        </span>
                      )}
                    </div>
                    <div>
                      <div className="font-medium truncate max-w-[200px]" title={item.title}>
                        {item.title}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        {item.is_premium && (
                          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                            ${item.price.toFixed(2)}
                          </Badge>
                        )}
                        {item.visibility === "subscribers" && (
                          <Badge variant="outline" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Subscribers
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {item.media_type.charAt(0).toUpperCase() + item.media_type.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "published" ? "success" :
                      item.status === "scheduled" ? "warning" : "secondary"
                    }
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.status === "published" && formatDate(item.published_at)}
                  {item.status === "scheduled" && formatDate(item.scheduled_for)}
                  {item.status === "draft" && formatDate(item.created_at)}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <div className="flex items-center">
                      <Eye className="h-3 w-3 mr-1" />
                      {item.views_count || 0}
                    </div>
                    <div className="flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      {item.likes_count || 0}
                    </div>
                    <div className="flex items-center">
                      <MessageCircle className="h-3 w-3 mr-1" />
                      {item.comments_count || 0}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-2">
                    {showPublishButton && item.status === "draft" && onPublish && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => onPublish(item.id)}
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    )}
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => openPreviewDialog(item)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <CircleEllipsis className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(item)}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        
                        {showPublishButton && item.status === "draft" && onPublish && (
                          <DropdownMenuItem onClick={() => onPublish(item.id)}>
                            <ArrowUpRight className="h-4 w-4 mr-2" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        
                        <DropdownMenuItem>
                          <BarChart className="h-4 w-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        
                        <DropdownMenuItem>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        <DropdownMenuItem
                          onClick={() => openDeleteDialog(item.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this content? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Content Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{previewContent?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-3">
            {previewContent?.media_type === "image" && previewContent?.media_url && (
              <div className="rounded-md overflow-hidden">
                <img 
                  src={previewContent.media_url} 
                  alt={previewContent.title} 
                  className="w-full object-cover max-h-[400px]"
                />
              </div>
            )}
            
            {previewContent?.media_type === "video" && previewContent?.media_url && (
              <div className="rounded-md overflow-hidden">
                <video 
                  src={previewContent.media_url} 
                  controls
                  className="w-full max-h-[400px]"
                />
              </div>
            )}
            
            {previewContent?.description && (
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-muted-foreground whitespace-pre-line">{previewContent.description}</p>
              </div>
            )}
            
            {previewContent?.tags && previewContent.tags.length > 0 && (
              <div>
                <h3 className="text-sm font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {previewContent.tags.map(tag => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="text-sm font-medium mb-1">Status</h3>
                <Badge
                  variant={
                    previewContent?.status === "published" ? "success" :
                    previewContent?.status === "scheduled" ? "warning" : "secondary"
                  }
                >
                  {previewContent?.status.charAt(0).toUpperCase() + previewContent?.status.slice(1)}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Type</h3>
                <Badge variant="outline">
                  {previewContent?.media_type.charAt(0).toUpperCase() + previewContent?.media_type.slice(1)}
                </Badge>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-1">Visibility</h3>
                <Badge variant="outline">
                  {previewContent?.visibility.charAt(0).toUpperCase() + previewContent?.visibility.slice(1)}
                </Badge>
              </div>
              
              {previewContent?.is_premium && (
                <div>
                  <h3 className="text-sm font-medium mb-1">Price</h3>
                  <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                    ${previewContent.price.toFixed(2)}
                  </Badge>
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setPreviewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setPreviewDialogOpen(false);
              if (previewContent) onEdit(previewContent);
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContentTable;
