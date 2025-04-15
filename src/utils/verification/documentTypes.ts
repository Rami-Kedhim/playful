
// Document type constants
export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'driver_license',
  SELFIE: 'selfie'
} as const;

// Document type type
export type DocumentType = typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES];

// Document type labels
export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
  [DOCUMENT_TYPES.ID_CARD]: 'ID Card',
  [DOCUMENT_TYPES.PASSPORT]: 'Passport',
  [DOCUMENT_TYPES.DRIVERS_LICENSE]: 'Driver\'s License',
  [DOCUMENT_TYPES.SELFIE]: 'Selfie'
};

// Function to check if document type requires back image
export const requiresBackImage = (documentType: DocumentType): boolean => {
  return documentType === DOCUMENT_TYPES.ID_CARD || 
         documentType === DOCUMENT_TYPES.DRIVERS_LICENSE;
};
