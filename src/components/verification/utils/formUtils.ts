
import { needsBackDocument } from './documentTypeHelper';

export const validateVerificationForm = (data: any) => {
  const errors: Record<string, string> = {};

  if (!data.documentType) {
    errors.documentType = 'Please select a document type';
  }

  if (!data.frontFile) {
    errors.frontFile = 'Front side of the document is required';
  }

  if (data.documentType && needsBackDocument(data.documentType) && !data.backFile) {
    errors.backFile = 'Back side of the document is required';
  }

  if (!data.selfieFile) {
    errors.selfieFile = 'A selfie with your document is required';
  }

  if (!data.acceptTerms) {
    errors.acceptTerms = 'You must accept the terms and privacy policy';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatVerificationDate = (date: Date | string | null): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
