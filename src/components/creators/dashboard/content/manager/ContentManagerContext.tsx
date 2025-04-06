
import React, { createContext, useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { CreatorContent } from "@/types/creator";
import useCreatorContent from "@/hooks/useCreatorContent";

interface ContentManagerContextType {
  content: CreatorContent[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  creatorId: string;
  setCurrentPage: (page: number) => void;
  setFilters: (filters: any) => void;
  saveContent: (data: Partial<CreatorContent>) => Promise<CreatorContent | null>;
  updateContent: (id: string, data: Partial<any>) => Promise<CreatorContent | null>;
  refreshContent: () => void;
  isFormOpen: boolean;
  setIsFormOpen: (state: boolean) => void;
  isUploaderOpen: boolean;
  setIsUploaderOpen: (state: boolean) => void;
  uploadType: 'image' | 'video';
  setUploadType: (type: 'image' | 'video') => void;
  selectedContent: CreatorContent | undefined;
  setSelectedContent: (content: CreatorContent | undefined) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (state: boolean) => void;
  contentToDelete: string | null;
  setContentToDelete: (id: string | null) => void;
  handleAddContent: () => void;
  handleEditContent: (item: CreatorContent) => void;
  handleViewContent: (item: CreatorContent) => void;
  handleUploadContent: (type: 'image' | 'video') => void;
  handleUploadSuccess: (url: string, fileId: string) => Promise<void>;
  handleFormSave: (data: Partial<CreatorContent>) => Promise<void>;
  handleDeleteClick: (contentId: string) => void;
  handleConfirmDelete: () => Promise<void>;
}

const ContentManagerContext = createContext<ContentManagerContextType | undefined>(undefined);

export const ContentManagerProvider: React.FC<{
  creatorId: string;
  children: React.ReactNode;
}> = ({ creatorId, children }) => {
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
        await updateContent(selectedContent.id, data);
        toast({
          title: "Content updated",
          description: "Your content has been updated successfully"
        });
      } else {
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

  const value: ContentManagerContextType = {
    content,
    loading,
    error,
    totalItems,
    currentPage,
    itemsPerPage,
    creatorId,
    setCurrentPage,
    setFilters,
    saveContent,
    updateContent,
    refreshContent,
    isFormOpen,
    setIsFormOpen,
    isUploaderOpen,
    setIsUploaderOpen,
    uploadType,
    setUploadType,
    selectedContent,
    setSelectedContent,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    contentToDelete,
    setContentToDelete,
    handleAddContent,
    handleEditContent,
    handleViewContent,
    handleUploadContent,
    handleUploadSuccess,
    handleFormSave,
    handleDeleteClick,
    handleConfirmDelete
  };

  return (
    <ContentManagerContext.Provider value={value}>
      {children}
    </ContentManagerContext.Provider>
  );
};

export const useContentManager = () => {
  const context = useContext(ContentManagerContext);
  
  if (context === undefined) {
    throw new Error("useContentManager must be used within a ContentManagerProvider");
  }
  
  return context;
};
