
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import ContentFilters from "./ContentFilters";
import ContentList from "./ContentList";
import ContentForm from "./ContentForm";
import ContentPagination from "./ContentPagination";
import ContentUploader from "./ContentUploader";
import { CreatorContent } from "@/types/creator";
import useCreatorContent from "@/hooks/useCreatorContent";
import {
  ContentHeader,
  ContentErrorAlert,
  ContentLoadingState,
  DeleteConfirmationDialog
} from "./components";

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
      <ContentHeader 
        onRefresh={refreshContent}
        onAddContent={handleAddContent}
        onUploadContent={handleUploadContent}
      />

      <ContentFilters onFilterChange={setFilters} />

      <ContentErrorAlert error={error} />

      {loading ? (
        <ContentLoadingState />
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

      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default ContentManager;
