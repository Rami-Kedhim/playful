
import { DocumentType, DOCUMENT_TYPE_OPTIONS } from "@/types/verification";

// Get label for document type
export const getDocumentTypeLabel = (type: DocumentType): string => {
  const option = DOCUMENT_TYPE_OPTIONS.find(option => option.value === type);
  return option ? option.label : type;
};

// Format document type options for select component
export const getDocumentTypeOptions = () => {
  return DOCUMENT_TYPE_OPTIONS;
};
