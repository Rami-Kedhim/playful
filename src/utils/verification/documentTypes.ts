
export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license',
  SELFIE: 'selfie'
} as const;

export type DocumentType = typeof DOCUMENT_TYPES[keyof typeof DOCUMENT_TYPES];

export const getDocumentTypeLabel = (type: DocumentType): string => {
  const labels: Record<DocumentType, string> = {
    'id_card': 'ID Card',
    'passport': 'Passport',
    'drivers_license': "Driver's License",
    'selfie': 'Selfie with ID'
  };
  return labels[type];
};

export const requiresBackImage = (type: DocumentType): boolean => {
  return type === 'id_card' || type === 'drivers_license';
};
