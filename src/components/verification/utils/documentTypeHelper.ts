
import { DocumentType } from '@/types/verification';

export function toDocumentType(value: string): DocumentType {
  switch(value) {
    case 'id_card':
      return 'id_card';
    case 'passport':
      return 'passport';
    case 'driver_license':
      return 'driver_license';
    default:
      return 'id_card';
  }
}

export function getDocumentTypeLabel(type: DocumentType): string {
  switch(type) {
    case 'id_card':
      return 'ID Card';
    case 'passport':
      return 'Passport';
    case 'driver_license':
      return 'Driver\'s License';
    default:
      return 'ID Document';
  }
}
