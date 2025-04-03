
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";
import { useCreatorContent } from "@/hooks/useCreatorContent";
import ContentTable from "./ContentTable";
import ContentDialog from "./ContentDialog";
import { ContentCreateInput, ContentUpdateInput } from "@/services/contentService";

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("published");
  const [openDialog, setOpenDialog] = useState(false);
  const [editingContent, setEditingContent] = useState<ContentUpdateInput | null>(null);
  
  // Load content based on active tab
  const { 
    content: publishedContent, 
    loading: publishedLoading,
    error: publishedError,
    addContent,
    editContent,
    removeContent,
    publishDraft
  } = useCreatorContent("published");
  
  const { 
    content: draftContent, 
    loading: draftLoading,
    error: draftError
  } = useCreatorContent("draft");
  
  const { 
    content: scheduledContent, 
    loading: scheduledLoading,
    error: scheduledError
  } = useCreatorContent("scheduled");
  
  const handleCreateNew = () => {
    setEditingContent(null);
    setOpenDialog(true);
  };
  
  const handleEdit = (content: ContentUpdateInput) => {
    setEditingContent(content);
    setOpenDialog(true);
  };
  
  const handleSave = async (content: ContentCreateInput) => {
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
    } else {
      await addContent(content);
    }
    setOpenDialog(false);
  };
  
  const getContentForTab = () => {
    switch (activeTab) {
      case "published":
        return { 
          content: publishedContent, 
          loading: publishedLoading, 
          error: publishedError 
        };
      case "drafts":
        return { 
          content: draftContent, 
          loading: draftLoading, 
          error: draftError 
        };
      case "scheduled":
        return { 
          content: scheduledContent, 
          loading: scheduledLoading, 
          error: scheduledError 
        };
      default:
        return { 
          content: publishedContent, 
          loading: publishedLoading, 
          error: publishedError 
        };
    }
  };
  
  const { content, loading, error } = getContentForTab();
  
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
        <Tabs defaultValue="published" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="drafts">Drafts</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="published" className="space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ContentTable 
                content={content} 
                onEdit={handleEdit} 
                onDelete={removeContent}
                emptyMessage="You haven't published any content yet."
              />
            )}
          </TabsContent>
          
          <TabsContent value="drafts" className="space-y-4">
            {draftLoading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ContentTable 
                content={draftContent} 
                onEdit={handleEdit} 
                onDelete={removeContent}
                onPublish={publishDraft}
                emptyMessage="You don't have any draft content."
                showPublishButton
              />
            )}
          </TabsContent>
          
          <TabsContent value="scheduled" className="space-y-4">
            {scheduledLoading ? (
              <div className="flex items-center justify-center h-40">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <ContentTable 
                content={scheduledContent} 
                onEdit={handleEdit} 
                onDelete={removeContent}
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
