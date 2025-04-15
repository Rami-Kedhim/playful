
export const DOCUMENT_TYPES = {
  ID_CARD: 'id_card',
  PASSPORT: 'passport',
  DRIVERS_LICENSE: 'drivers_license'
};

export const DOCUMENT_TYPE_LABELS: Record<string, string> = {
  id_card: 'ID Card',
  passport: 'Passport',
  drivers_license: "Driver's License"
};

export const DOCUMENT_TYPE_REQUIREMENTS: Record<string, string> = {
  id_card: 'Must be a valid government-issued ID card showing your photo, name, and date of birth.',
  passport: 'Must be a valid passport showing your photo, name, and date of birth.',
  drivers_license: 'Must be a valid driver\'s license showing your photo, name, and date of birth.'
};

export const needsBackImage = (documentType: string) => {
  return documentType === DOCUMENT_TYPES.ID_CARD || documentType === DOCUMENT_TYPES.DRIVERS_LICENSE;
};
