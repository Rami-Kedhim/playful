import React from "react";
import ContentFilters from "./ContentFilters";
import ContentList from "./ContentList";
import ContentForm from "./ContentForm";
import ContentPagination from "./ContentPagination";
import ContentUploader from "./ContentUploader";
import {
  ContentHeader,
  ContentErrorAlert,
  ContentLoadingState,
  DeleteConfirmationDialog
} from "./components";
import { ContentManagerProvider, useContentManager } from "./manager/ContentManagerContext";

interface ContentManagerProps {
  creatorId: string;
}

const ContentManagerContent = () => {
  const {
    content,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setFilters,
    handleAddContent,
    handleUploadContent,
    handleEditContent,
    handleDeleteClick,
    handleViewContent,
    isFormOpen,
    setIsFormOpen,
    handleFormSave,
    selectedContent,
    isUploaderOpen,
    setIsUploaderOpen,
    handleUploadSuccess,
    uploadType,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleConfirmDelete,
    refreshContent
  } = useContentManager();

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
        onSubmit={handleFormSave}
        initialValues={selectedContent ? {
          title: selectedContent.title,
          description: selectedContent.description || '',
          contentType: selectedContent.contentType || 'image',
          isPremium: selectedContent.isPremium || false,
          price: selectedContent.price || 0,
          url: selectedContent.url,
          thumbnailUrl: selectedContent.thumbnailUrl || '',
        } : undefined}
        isLoading={loading}
      />

      <ContentUploader
        creatorId={uploadType === 'image' ? 'images' : 'videos'} // Use a generic ID based on the upload type
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

const ContentManager: React.FC<ContentManagerProps> = ({ creatorId }) => {
  return (
    <ContentManagerProvider creatorId={creatorId}>
      <ContentManagerContent />
    </ContentManagerProvider>
  );
};

export default ContentManager;
