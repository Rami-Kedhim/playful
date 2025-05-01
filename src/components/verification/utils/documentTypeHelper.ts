
import { getDocumentTypeLabel } from '@/utils/verification';

export const documentTypeOptions = ['id_card', 'passport', 'drivers_license', 'residence_permit'];

export const needsBackDocument = (documentType: string): boolean => {
  return documentType !== 'passport';
};

export const getDocumentTitle = (documentType: string, side: 'front' | 'back' | 'selfie'): string => {
  const baseLabel = getDocumentTypeLabel(documentType);
  
  if (side === 'selfie') {
    return 'Selfie with Document';
  }
  
  return `${side === 'front' ? 'Front' : 'Back'} of ${baseLabel}`;
};
