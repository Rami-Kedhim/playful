
import { DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_REQUIREMENTS } from "@/types/verification";

export function getDocumentTypeLabel(type: string): string {
  return DOCUMENT_TYPE_LABELS[type as keyof typeof DOCUMENT_TYPE_LABELS] || type;
}

export function getDocumentRequirements(type: string) {
  return DOCUMENT_TYPE_REQUIREMENTS[type as keyof typeof DOCUMENT_TYPE_REQUIREMENTS] || {
    frontRequired: true,
    backRequired: false,
    selfieRequired: true
  };
}

export function isBackImageRequired(documentType: string): boolean {
  const requirements = getDocumentRequirements(documentType);
  return requirements?.backRequired || false;
}
