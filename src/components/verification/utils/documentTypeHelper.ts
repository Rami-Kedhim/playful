
import { getDocumentTypeLabel } from '@/utils/verification';

export const documentTypeOptions = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: "Driver's License" },
  { value: 'residence_permit', label: 'Residence Permit' }
];

export const getRequiredFiles = (documentType: string): string[] => {
  switch (documentType) {
    case 'id_card':
      return ['front', 'back', 'selfie'];
    case 'passport':
      return ['data_page', 'selfie'];
    case 'drivers_license':
      return ['front', 'back', 'selfie'];
    case 'residence_permit':
      return ['front', 'back', 'selfie'];
    default:
      return ['front', 'selfie'];
  }
};

export const getDocumentTypeName = (documentType: string): string => {
  return getDocumentTypeLabel(documentType);
};
