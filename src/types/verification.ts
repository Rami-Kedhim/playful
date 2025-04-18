
export interface DocumentType {
  value: string;
  label: string;
}

export interface VerificationFormValues {
  documentType: string;
  documentFile: File;
  selfieFile?: File | null;
  consentChecked: boolean;
  documentFrontImage?: {
    file: File;
    preview: string;
  };
  documentBackImage?: {
    file: File;
    preview: string;
  };
  selfieImage?: {
    file: File;
    preview: string;
  };
}

export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license'
};

export const DOCUMENT_TYPE_OPTIONS: DocumentType[] = [
  { value: DOCUMENT_TYPES.ID_CARD, label: 'ID Card' },
  { value: DOCUMENT_TYPES.PASSPORT, label: 'Passport' },
  { value: DOCUMENT_TYPES.DRIVERS_LICENSE, label: "Driver's License" }
];
