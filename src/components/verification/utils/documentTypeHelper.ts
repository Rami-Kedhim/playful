
import { DocumentType, DOCUMENT_TYPE_OPTIONS } from '@/types/verification';

/**
 * Safely converts a string to a DocumentType
 */
export const toDocumentType = (value: string): DocumentType => {
  const foundType = DOCUMENT_TYPE_OPTIONS.find(type => type.value === value);
  
  if (foundType) {
    return foundType;
  }
  
  // Fall back to creating a new DocumentType with the value
  return {
    value: value,
    label: getDocumentTypeDisplayName(value)
  };
};

/**
 * Get the display name for a document type
 */
export const getDocumentTypeDisplayName = (type: string | DocumentType): string => {
  const typeString = typeof type === 'string' ? type : (type as any).value || '';
  
  // Check if we have a predefined type with this value
  const foundType = DOCUMENT_TYPE_OPTIONS.find(t => t.value === typeString);
  if (foundType) {
    return foundType.label;
  }
  
  // Fall back to converting underscore_case to Title Case
  return typeString
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
};
