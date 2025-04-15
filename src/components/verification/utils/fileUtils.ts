
export interface FileWithPreview {
  file: File;
  previewUrl?: string;
}

export const isFileWithPreview = (value: any): value is FileWithPreview => {
  return value && typeof value === 'object' && 'file' in value && value.file instanceof File;
};

export const validateFileSize = (file: File, maxSizeMB: number): boolean => {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const createFilePreview = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const createFileWithPreview = async (file: File): Promise<FileWithPreview> => {
  try {
    const previewUrl = await createFilePreview(file);
    return { file, previewUrl };
  } catch (error) {
    console.error('Error creating file preview:', error);
    return { file };
  }
};
