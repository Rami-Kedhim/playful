
import { DocumentType } from '@/types/verification';

/**
 * Safely converts a string to a DocumentType
 */
export const toDocumentType = (value: string): DocumentType => {
  // Cast as unknown first, then as DocumentType to satisfy TypeScript
  return value as unknown as DocumentType;
};

/**
 * Get the display name for a document type
 */
export const getDocumentTypeDisplayName = (type: string | DocumentType): string => {
  const typeString = typeof type === 'string' ? type : (type as any).value || '';
  
  return typeString
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (match) => match.toUpperCase());
};
