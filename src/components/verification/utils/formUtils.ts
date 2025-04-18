
import { 
  DOCUMENT_TYPES, 
  DOCUMENT_REQUIREMENTS,
  ID_CARD,
  PASSPORT,
  DRIVER_LICENSE,
  RESIDENCE_PERMIT
} from '@/types/verification';

export const getDocumentTypeLabel = (documentType: string): string => {
  const docType = DOCUMENT_TYPES.find(dt => dt.value === documentType);
  return docType ? docType.label : 'Document';
};

export const isBackRequired = (documentType: string): boolean => {
  return documentType !== PASSPORT;
};

export const getDocumentInstructions = (documentType: string): string => {
  switch (documentType) {
    case PASSPORT:
      return "Please upload a clear photo of your passport's main page. Make sure all details are visible and not blurry.";
    case ID_CARD:
      return "Please upload clear photos of the front and back of your ID card. Ensure all text is legible.";
    case DRIVER_LICENSE:
      return "Please upload clear photos of your driver's license. Both sides are required.";
    case RESIDENCE_PERMIT:
      return "Please upload clear photos of your residence permit or visa document. Both sides may be required.";
    default:
      return "Please upload a clear photo of your identification document.";
  }
};
