
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, Upload, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onFileSelect: (file: File) => void;
  currentFile?: File | null;
  maxSizeMB?: number;
  accept?: string[];
  className?: string;
  label?: string;
  error?: string;
  imagePreview?: string;
  disabled?: boolean;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileSelect,
  currentFile,
  maxSizeMB = 5,
  accept = ['image/jpeg', 'image/png', 'image/webp'],
  className,
  label = "Drop file here or click to browse",
  error,
  imagePreview,
  disabled = false
}) => {
  const maxSize = maxSizeMB * 1024 * 1024; // Convert to bytes

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    disabled,
    multiple: false
  });

  const previewUrl = imagePreview || (currentFile ? URL.createObjectURL(currentFile) : '');

  return (
    <div className="space-y-2 w-full">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-border",
          error ? "border-destructive" : "",
          disabled ? "opacity-50 cursor-not-allowed" : "",
          className
        )}
      >
        <input {...getInputProps()} />
        
        {previewUrl ? (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-[200px] aspect-square mb-2 overflow-hidden rounded border">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="object-cover w-full h-full"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {currentFile?.name || "Selected image"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Click or drag to replace
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center py-4">
            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-2">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {accept.join(', ')} (max {maxSizeMB}MB)
            </p>
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center text-destructive text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
