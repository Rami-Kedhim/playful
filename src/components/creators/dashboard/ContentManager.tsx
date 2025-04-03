
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";

interface Content {
  id: string;
  title: string;
  description: string;
  content_type: string;
  url: string;
  thumbnail_url: string;
  is_premium: boolean;
  price: number;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

const ContentManager = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);

  // Mock data for demonstration
  const mockContent: Content[] = [
    {
      id: "1",
      title: "Getting Started with Photography",
      description: "A beginner's guide to photography",
      content_type: "tutorial",
      url: "https://example.com/content/1",
      thumbnail_url: "https://example.com/thumbnails/1.jpg",
      is_premium: false,
      price: 0,
      status: "published",
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "2",
      title: "Advanced Lighting Techniques",
      description: "Master lighting for professional photos",
      content_type: "video",
      url: "https://example.com/content/2",
      thumbnail_url: "https://example.com/thumbnails/2.jpg",
      is_premium: true,
      price: 5.99,
      status: "published",
      published_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    },
    {
      id: "3",
      title: "Editing 101",
      description: "Basic photo editing techniques",
      content_type: "tutorial",
      url: "https://example.com/content/3",
      thumbnail_url: "https://example.com/thumbnails/3.jpg",
      is_premium: false,
      price: 0,
      status: "draft",
      published_at: "",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  ];

  // Fetch content data - using mock data for now
  const { data: content = mockContent, isLoading } = useQuery({
    queryKey: ['creatorContent', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockContent;
    },
    enabled: !!user?.id,
  });

  // Delete content mutation
  const deleteContentMutation = useMutation({
    mutationFn: async (contentId: string) => {
      // Simulate delete API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Deleting content with ID: ${contentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['creatorContent', user?.id] });
      setDeleteDialogOpen(false);
    },
  });

  // Filter content by status
  const draftContent = content.filter(item => item.status === 'draft');
  const publishedContent = content.filter(item => item.status === 'published');
  const archivedContent = content.filter(item => item.status === 'archived');

  // Handle delete dialog
  const openDeleteDialog = (item: Content) => {
    setSelectedContent(item);
    setDeleteDialogOpen(true);
  };

  const handleDeleteContent = () => {
    if (selectedContent) {
      deleteContentMutation.mutate(selectedContent.id);
    }
  };

  const ContentTable = ({ items }: { items: Content[] }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Premium</TableHead>
          <TableHead className="hidden md:table-cell">Created</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
              No content found
            </TableCell>
          </TableRow>
        ) : (
          items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.title}</TableCell>
              <TableCell>
                <Badge variant="outline" className="capitalize">
                  {item.content_type}
                </Badge>
              </TableCell>
              <TableCell>
                {item.is_premium ? (
                  <Badge className="bg-primary">{item.price} LC</Badge>
                ) : (
                  <Badge variant="outline">Free</Badge>
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {format(new Date(item.created_at), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button size="icon" variant="ghost">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="icon" 
                    variant="ghost" 
                    onClick={() => openDeleteDialog(item)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Content Manager</CardTitle>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Content
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="published">
          <TabsList className="mb-4">
            <TabsTrigger value="published">
              Published ({publishedContent.length})
            </TabsTrigger>
            <TabsTrigger value="drafts">
              Drafts ({draftContent.length})
            </TabsTrigger>
            <TabsTrigger value="archived">
              Archived ({archivedContent.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="published" className="overflow-x-auto">
            <ContentTable items={publishedContent} />
          </TabsContent>
          
          <TabsContent value="drafts" className="overflow-x-auto">
            <ContentTable items={draftContent} />
          </TabsContent>
          
          <TabsContent value="archived" className="overflow-x-auto">
            <ContentTable items={archivedContent} />
          </TabsContent>
        </Tabs>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Content</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedContent?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteContentMutation.isPending}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteContent}
              disabled={deleteContentMutation.isPending}
            >
              {deleteContentMutation.isPending ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ContentManager;
