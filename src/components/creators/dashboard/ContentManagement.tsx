
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Loader2, Search, Filter } from "lucide-react";
import { useCreatorContent } from "@/hooks/useCreatorContent";
import ContentTable from "./ContentTable";
import ContentDialog from "./ContentDialog";
import { ContentCreateInput, ContentUpdateInput } from "@/services/contentService";
import { useToast } from "@/components/ui/use-toast";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentUpdateInput | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [contentType, setContentType] = useState<string | undefined>(undefined);
  const [sortOption, setSortOption] = useState("newest");
  const { toast } = useToast();
  
  // Load content based on active tab
  const { 
    content,
    loading,
    error,
    filters,
    updateFilters,
    addContent,
    editContent,
    removeContent,
    publishDraft
  } = useCreatorContent({
    status: activeTab as "published" | "draft" | "scheduled",
    searchQuery,
    contentType,
    sort: sortOption as any
  });
  
  // Update filters when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    updateFilters({ status: value as "published" | "draft" | "scheduled" });
  };
  
  // Update search filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateFilters({ searchQuery: value });
  };
  
  // Update content type filter
  const handleContentTypeChange = (value: string) => {
    const type = value === "all" ? undefined : value;
    setContentType(type);
    updateFilters({ contentType: type });
  };
  
  // Update sort option
  const handleSortChange = (value: string) => {
    setSortOption(value);
    updateFilters({ sort: value as any });
  };
  
  const handleCreateNew = () => {
    setEditingContent(null);
    setOpenDialog(true);
  };
  
  const handleEdit = (content: ContentUpdateInput) => {
    setEditingContent(content);
    setOpenDialog(true);
  };
  
  const handleSave = async (content: ContentCreateInput) => {
    try {
      if (editingContent?.id) {
        // When editing, convert ContentCreateInput to ContentUpdateInput
        await editContent({
          id: editingContent.id,
          creator_id: content.creator_id,
          title: content.title,
          description: content.description,
          media_url: content.media_url,
          media_type: content.media_type,
          thumbnail_url: content.thumbnail_url,
          visibility: content.visibility,
          status: content.status, 
          is_premium: content.is_premium,
          price: content.price,
          scheduled_for: content.scheduled_for,
          tags: content.tags
        });
        
        toast({
          title: "Content updated",
          description: "Your content has been successfully updated.",
        });
      } else {
        await addContent(content);
        toast({
          title: "Content created",
          description: "Your content has been successfully created.",
        });
      }
      setOpenDialog(false);
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "There was a problem saving your content. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      await removeContent(id);
      toast({
        title: "Content deleted",
        description: "Your content has been successfully deleted.",
      });
    } catch (error) {
      console.error("Error deleting content:", error);
      toast({
        title: "Error",
        description: "There was a problem deleting your content. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handlePublish = async (id: string) => {
    try {
      await publishDraft(id);
      toast({
        title: "Content published",
        description: "Your draft has been successfully published.",
      });
    } catch (error) {
      console.error("Error publishing content:", error);
      toast({
        title: "Error",
        description: "There was a problem publishing your content. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>
            Create, edit, and manage your content
          </CardDescription>
        </div>
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" /> 
          Create New
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="published" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="mb-4">
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
          
          <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search content..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Select value={contentType || "all"} onValueChange={handleContentTypeChange}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="image">Images</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="text">Articles</SelectItem>
                  <SelectItem value="audio">Audio</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortOption} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="title_asc">Title (A-Z)</SelectItem>
                  <SelectItem value="title_desc">Title (Z-A)</SelectItem>
                  <SelectItem value="most_viewed">Most Viewed</SelectItem>
                  <SelectItem value="least_viewed">Least Viewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="published" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center text-destructive p-4">
                Error loading content. Please try again.
              </div>
            ) : (
              <ContentTable 
                content={content} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                emptyMessage="You haven't published any content yet."
              />
            )}
          </TabsContent>
          
          <TabsContent value="draft" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center text-destructive p-4">
                Error loading drafts. Please try again.
              </div>
            ) : (
              <ContentTable 
                content={content} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                onPublish={handlePublish}
                emptyMessage="You don't have any draft content."
                showPublishButton
              />
            )}
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : error ? (
              <div className="text-center text-destructive p-4">
                Error loading scheduled content. Please try again.
              </div>
            ) : (
              <ContentTable 
                content={content} 
                onEdit={handleEdit} 
                onDelete={handleDelete}
                emptyMessage="You don't have any scheduled content."
              />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <ContentDialog 
        open={openDialog}
        onOpenChange={setOpenDialog}
        initialData={editingContent}
        onSave={handleSave}
      />
    </Card>
  );
};

export default ContentManagement;
