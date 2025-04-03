
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw, AlertCircle, Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import ContentFilters from "./ContentFilters";
import ContentList from "./ContentList";
import ContentForm from "./ContentForm";
import ContentPagination from "./ContentPagination";
import ContentUploader from "./ContentUploader";
import { CreatorContent } from "@/types/creator";
import useCreatorContent from "@/hooks/useCreatorContent";
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
import { toast } from "@/components/ui/use-toast";

interface ContentManagerProps {
  creatorId: string;
}

const ContentManager: React.FC<ContentManagerProps> = ({ creatorId }) => {
  const {
    content,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setFilters,
    saveContent,
    updateContent,
    refreshContent
  } = useCreatorContent(creatorId);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [uploadType, setUploadType] = useState<'image' | 'video'>('image');
  const [selectedContent, setSelectedContent] = useState<CreatorContent | undefined>(undefined);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [contentToDelete, setContentToDelete] = useState<string | null>(null);

  const handleAddContent = () => {
    setSelectedContent(undefined);
    setIsFormOpen(true);
  };

  const handleEditContent = (item: CreatorContent) => {
    setSelectedContent(item);
    setIsFormOpen(true);
  };

  const handleViewContent = (item: CreatorContent) => {
    window.open(item.url, '_blank');
  };

  const handleUploadContent = (type: 'image' | 'video') => {
    setUploadType(type);
    setIsUploaderOpen(true);
  };

  const handleUploadSuccess = async (url: string, fileId: string) => {
    try {
      // Save the uploaded content
      await saveContent({
        title: `New ${uploadType} ${new Date().toLocaleString()}`,
        content_type: uploadType,
        url: url,
        thumbnail_url: uploadType === 'image' ? url : undefined,
        is_premium: false,
        status: 'draft'
      });
      
      toast({
        title: "Content uploaded",
        description: `Your ${uploadType} has been uploaded successfully`
      });
      
      refreshContent();
      setIsUploaderOpen(false);
    } catch (error) {
      console.error("Error saving uploaded content:", error);
      toast({
        title: "Error",
        description: "There was an error saving your content",
        variant: "destructive"
      });
    }
  };

  const handleFormSave = async (data: Partial<CreatorContent>) => {
    try {
      if (selectedContent) {
        // Update existing content
        await updateContent(selectedContent.id, data);
        toast({
          title: "Content updated",
          description: "Your content has been updated successfully"
        });
      } else {
        // Save new content
        await saveContent(data);
        toast({
          title: "Content created",
          description: "Your new content has been created successfully"
        });
      }
      setIsFormOpen(false);
      refreshContent();
    } catch (error) {
      console.error("Error saving content:", error);
      toast({
        title: "Error",
        description: "There was an error saving your content",
        variant: "destructive"
      });
    }
  };

  const handleDeleteClick = (contentId: string) => {
    setContentToDelete(contentId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!contentToDelete) return;
    
    try {
      await updateContent(contentToDelete, { status: 'archived' });
      toast({
        title: "Content archived",
        description: "Your content has been archived successfully"
      });
      refreshContent();
    } catch (error) {
      console.error("Error archiving content:", error);
      toast({
        title: "Error",
        description: "There was an error archiving your content",
        variant: "destructive"
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setContentToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-2xl font-bold">Your Content</h2>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={refreshContent}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUploadContent('image')}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Image
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => handleUploadContent('video')}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Video
          </Button>
          <Button onClick={handleAddContent}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Content
          </Button>
        </div>
      </div>

      <ContentFilters onFilterChange={setFilters} />

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array(6).fill(0).map((_, index) => (
            <div key={index} className="space-y-2">
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <ContentList
          content={content}
          onEdit={handleEditContent}
          onDelete={handleDeleteClick}
          onView={handleViewContent}
        />
      )}

      <ContentPagination
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />

      <ContentForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleFormSave}
        initialData={selectedContent}
      />

      <ContentUploader
        creatorId={creatorId}
        isOpen={isUploaderOpen}
        onCancel={() => setIsUploaderOpen(false)}
        onSuccess={handleUploadSuccess}
        contentType={uploadType}
      />

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will archive the content. You can restore archived content later
              from the archived section.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>Archive</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContentManager;
