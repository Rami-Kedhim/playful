
import { DocumentType } from '@/types/verification';

export const getDocumentTypeLabel = (type: string): string => {
  const DOCUMENT_TYPES: Record<string, string> = {
    'id_card': 'ID Card',
    'passport': 'Passport',
    'drivers_license': 'Driver\'s License',
    'residence_permit': 'Residence Permit'
  };
  
  return DOCUMENT_TYPES[type] || type;
};

export const getRequiredDocumentSides = (documentType: DocumentType): {
  front: boolean;
  back: boolean;
  selfie: boolean;
} => {
  const DOCUMENT_REQUIREMENTS: Record<string, { front: boolean; back: boolean; selfie: boolean }> = {
    'id_card': {
      front: true,
      back: true,
      selfie: true
    },
    'passport': {
      front: true,
      back: false,
      selfie: true
    },
    'drivers_license': {
      front: true,
      back: true,
      selfie: true
    },
    'residence_permit': {
      front: true,
      back: true,
      selfie: true
    }
  };

  return DOCUMENT_REQUIREMENTS[documentType] || { front: true, back: false, selfie: true };
};
