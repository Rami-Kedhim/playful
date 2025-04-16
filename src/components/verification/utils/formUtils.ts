
import { useState } from "react";
import { DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_REQUIREMENTS } from '@/types/verification';

export const useDocumentUpload = (initialValue: string = '') => {
  const [preview, setPreview] = useState<string>(initialValue);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (newFile: File | null) => {
    if (newFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(newFile);
      setFile(newFile);
    } else {
      setPreview('');
      setFile(null);
    }
  };

  const reset = () => {
    setPreview('');
    setFile(null);
  };

  return {
    preview,
    file,
    handleFileChange,
    reset
  };
};

export const getRequiredDocuments = (documentType: string) => {
  const requirements = DOCUMENT_TYPE_REQUIREMENTS[documentType as keyof typeof DOCUMENT_TYPE_REQUIREMENTS] || {
    frontRequired: true,
    backRequired: true,
    selfieRequired: true
  };
  
  return requirements;
};

export const getDocumentLabel = (documentType: string) => {
  return DOCUMENT_TYPE_LABELS[documentType as keyof typeof DOCUMENT_TYPE_LABELS] || documentType;
};
