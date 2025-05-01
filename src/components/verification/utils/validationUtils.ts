
import { z } from 'zod';

export const validateDocumentFile = (file: File | null): boolean => {
  if (!file) return false;
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  
  if (file.size > maxSize) {
    return false;
  }
  
  if (!validTypes.includes(file.type)) {
    return false;
  }
  
  return true;
};

export const validateSelfieFile = (file: File | null): boolean => {
  if (!file) return false;
  
  const maxSize = 5 * 1024 * 1024; // 5MB
  const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
  
  if (file.size > maxSize) {
    return false;
  }
  
  if (!validTypes.includes(file.type)) {
    return false;
  }
  
  return true;
};
