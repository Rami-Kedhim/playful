
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchCreatorContent, saveContent, updateContent } from "@/services/creatorService";
import { 
  Plus, Image, Video, File, FileText, MoreVertical, Edit, 
  Trash2, Eye, EyeOff, DollarSign, Calendar, Clock, Upload
} from "lucide-react";
import { format } from "date-fns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface CreatorContentProps {
  creatorId: string;
}

const CreatorContent = ({ creatorId }: CreatorContentProps) => {
  const [contents, setContents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<any>(null);
  const [contentType, setContentType] = useState("image");
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
    url: "",
    thumbnailUrl: "",
    isPremium: false,
    price: ""
  });

  useEffect(() => {
    if (creatorId) {
      loadContent();
    }
  }, [creatorId]);

  const loadContent = async () => {
    setIsLoading(true);
    const data = await fetchCreatorContent(creatorId);
    setContents(data);
    setIsLoading(false);
  };

  const handleNewContent = () => {
    setEditingContent(null);
    setFormValues({
      title: "",
      description: "",
      url: "",
      thumbnailUrl: "",
      isPremium: false,
      price: ""
    });
    setDialogOpen(true);
  };

  const handleEditContent = (content: any) => {
    setEditingContent(content);
    setContentType(content.content_type);
    setFormValues({
      title: content.title,
      description: content.description || "",
      url: content.url,
      thumbnailUrl: content.thumbnail_url || "",
      isPremium: content.is_premium,
      price: content.price ? content.price.toString() : ""
    });
    setDialogOpen(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormValues(prev => ({ ...prev, isPremium: checked }));
  };

  const handleSubmit = async () => {
    const contentData = {
      title: formValues.title,
      description: formValues.description,
      content_type: contentType,
      url: formValues.url,
      thumbnail_url: formValues.thumbnailUrl,
      is_premium: formValues.isPremium,
      price: formValues.isPremium ? parseFloat(formValues.price) : null,
      status: 'published',
      published_at: new Date().toISOString()
    };

    if (editingContent) {
      await updateContent(editingContent.id, contentData);
    } else {
      await saveContent({
        ...contentData,
        creator_id: creatorId
      });
    }

    setDialogOpen(false);
    loadContent();
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'text':
        return <FileText className="h-5 w-5" />;
      default:
        return <File className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Published</Badge>;
      case 'draft':
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Filter content based on tabs
  const getFilteredContent = (type: string) => {
    if (type === 'all') return contents;
    return contents.filter(content => content.content_type === type);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Button onClick={handleNewContent}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Content
        </Button>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="image">Images</TabsTrigger>
          <TabsTrigger value="video">Videos</TabsTrigger>
          <TabsTrigger value="text">Articles</TabsTrigger>
        </TabsList>
        
        {["all", "image", "video", "text"].map(tabValue => (
          <TabsContent key={tabValue} value={tabValue} className="mt-4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i}>
                    <CardHeader className="p-4">
                      <Skeleton className="h-4 w-3/4" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-32 w-full mb-4" />
                      <Skeleton className="h-4 w-1/2 mb-2" />
                      <Skeleton className="h-4 w-1/4" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <>
                {getFilteredContent(tabValue).length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <div className="p-3 bg-muted rounded-full mb-4">
                        {getContentTypeIcon(tabValue === 'all' ? 'file' : tabValue)}
                      </div>
                      <h3 className="text-lg font-semibold mb-2">No content yet</h3>
                      <p className="text-muted-foreground text-center mb-4">
                        {tabValue === 'all' 
                          ? "You haven't added any content yet." 
                          : `You haven't added any ${tabValue} content yet.`}
                      </p>
                      <Button onClick={handleNewContent}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Content
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getFilteredContent(tabValue).map((content) => (
                      <Card key={content.id}>
                        <div className="relative">
                          {content.thumbnail_url ? (
                            <img 
                              src={content.thumbnail_url} 
                              alt={content.title} 
                              className="w-full h-40 object-cover rounded-t-md"
                            />
                          ) : (
                            <div className="w-full h-40 bg-muted flex items-center justify-center rounded-t-md">
                              {getContentTypeIcon(content.content_type)}
                            </div>
                          )}
                          <div className="absolute top-2 right-2 flex gap-2">
                            {content.is_premium && (
                              <Badge variant="warning" className="flex items-center gap-1">
                                <DollarSign className="h-3 w-3" />
                                Premium
                              </Badge>
                            )}
                            {getStatusBadge(content.status)}
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{content.title}</CardTitle>
                          <CardDescription className="line-clamp-2">
                            {content.description || "No description provided."}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {format(new Date(content.created_at), "MMM d, yyyy")}
                            </div>
                            <div className="flex items-center">
                              <Eye className="h-4 w-4 mr-1" />
                              {Math.floor(Math.random() * 1000)} views
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => window.open(content.url, '_blank')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Preview
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditContent(content)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>{editingContent ? "Edit Content" : "Add New Content"}</DialogTitle>
            <DialogDescription>
              Enter the details for your content. Premium content is only available to paid subscribers.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Tabs value={contentType} onValueChange={setContentType}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="image">Image</TabsTrigger>
                <TabsTrigger value="video">Video</TabsTrigger>
                <TabsTrigger value="text">Article</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                name="title"
                value={formValues.title}
                onChange={handleFormChange}
                className="col-span-3"
                placeholder="Enter content title"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleFormChange}
                className="col-span-3"
                placeholder="Enter content description"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="url" className="text-right">
                Content URL
              </Label>
              <Input
                id="url"
                name="url"
                value={formValues.url}
                onChange={handleFormChange}
                className="col-span-3"
                placeholder="Enter content URL"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="thumbnailUrl" className="text-right">
                Thumbnail URL
              </Label>
              <Input
                id="thumbnailUrl"
                name="thumbnailUrl"
                value={formValues.thumbnailUrl}
                onChange={handleFormChange}
                className="col-span-3"
                placeholder="Enter thumbnail URL"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="isPremium" className="text-right">
                Premium Content
              </Label>
              <div className="flex items-center space-x-2 col-span-3">
                <Switch
                  id="isPremium"
                  checked={formValues.isPremium}
                  onCheckedChange={handleSwitchChange}
                />
                <Label htmlFor="isPremium">
                  {formValues.isPremium ? "Premium" : "Free"}
                </Label>
              </div>
            </div>
            {formValues.isPremium && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price ($)
                </Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formValues.price}
                  onChange={handleFormChange}
                  className="col-span-3"
                  placeholder="Enter content price"
                  min="0.01"
                  step="0.01"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              {editingContent ? "Save Changes" : "Upload Content"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatorContent;
