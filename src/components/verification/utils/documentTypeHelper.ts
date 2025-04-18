
import { DocumentType } from '@/types/verification';

/**
 * Safely converts a string to a DocumentType enum
 */
export const toDocumentType = (value: string): DocumentType => {
  switch (value) {
    case 'id_card':
      return 'id_card';
    case 'passport':
      return 'passport';
    case 'drivers_license':
      return 'drivers_license';
    default:
      return 'id_card'; // Default value
  }
};

/**
 * Gets all document type options
 */
export const getDocumentTypeOptions = () => {
  return [
    { value: 'id_card', label: 'ID Card' },
    { value: 'passport', label: 'Passport' },
    { value: 'drivers_license', label: "Driver's License" }
  ];
};
