
// Import the getDocumentTypeLabel function directly from the index file
import { getDocumentTypeLabel } from '@/utils/verification/index';

export { getDocumentTypeLabel };

// Add documentTypeOptions array
export const documentTypeOptions = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: "Driver's License" },
  { value: 'residence_permit', label: 'Residence Permit' },
];

export const getVerificationLevelLabel = (level: string): string => {
  switch (level) {
    case 'basic': return 'Basic';
    case 'enhanced': return 'Enhanced';
    case 'premium': return 'Premium';
    default: return level.charAt(0).toUpperCase() + level.slice(1).replace(/_/g, ' ');
  }
};

export const needsBackDocument = (documentType: string): boolean => {
  return documentType !== 'passport' && documentType !== 'selfie' && documentType !== '';
};

export const getVerificationStatusLabel = (status: string): string => {
  switch (status) {
    case 'none': return 'Not Started';
    case 'pending': return 'Pending Review';
    case 'in_review': return 'In Review';
    case 'approved': return 'Approved';
    case 'rejected': return 'Rejected';
    case 'expired': return 'Expired';
    default: return status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
  }
};
