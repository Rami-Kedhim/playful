
export const validateDocument = (
  file: File,
  maxSize: number = 5 * 1024 * 1024,
  acceptedTypes: string[] = ['image/jpeg', 'image/png', 'image/webp']
): { valid: boolean; error?: string } => {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (!acceptedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Accepted types: ${acceptedTypes
        .map(type => type.split('/')[1])
        .join(', ')}`
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${Math.floor(maxSize / 1024 / 1024)}MB`
    };
  }

  return { valid: true };
};

export const getDocumentTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    'id_card': 'ID Card',
    'passport': 'Passport',
    'drivers_license': "Driver's License"
  };

  return labels[type] || type;
};
