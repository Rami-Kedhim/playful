
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileCheck, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageDropzoneProps {
  onImageSelected: (file: File) => void;
  label?: string;
  maxSize?: number; // in MB
  acceptedTypes?: string[];
  className?: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onImageSelected,
  label = 'Drop image here or click to browse',
  maxSize = 5, // Default 5MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className
}) => {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    
    if (acceptedFiles.length === 0) {
      return;
    }
    
    const file = acceptedFiles[0];
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File is too large. Maximum size is ${maxSize}MB.`);
      return;
    }
    
    // Generate preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Call the callback
    onImageSelected(file);
  }, [maxSize, onImageSelected]);
  
  const onDropRejected = useCallback(() => {
    setError(`Please upload a valid image file (${acceptedTypes.join(', ')})`);
  }, [acceptedTypes]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    onDropRejected,
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/webp': []
    },
    maxFiles: 1
  });

  return (
    <div className={className}>
      <div 
        {...getRootProps()} 
        className={cn(
          "border-2 border-dashed rounded-md p-6 transition-colors cursor-pointer",
          isDragActive 
            ? "border-primary bg-primary/5" 
            : error 
              ? "border-destructive/50 bg-destructive/5" 
              : preview 
                ? "border-muted-foreground/25" 
                : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
      >
        <input {...getInputProps()} />
        
        <div className="flex flex-col items-center gap-2">
          {preview ? (
            <FileCheck className="h-8 w-8 text-primary" />
          ) : (
            <Upload className="h-8 w-8 text-muted-foreground" />
          )}
          
          <p className="text-sm text-center text-muted-foreground">
            {preview ? "File selected" : label}
          </p>
          
          <p className="text-xs text-center text-muted-foreground/70">
            {acceptedTypes.map(type => type.split('/')[1]).join(', ').toUpperCase()} (max. {maxSize}MB)
          </p>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center mt-2 text-xs text-destructive">
          <AlertCircle className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      
      {preview && (
        <div className="mt-2 overflow-hidden rounded border border-border bg-background">
          <img 
            src={preview} 
            alt="Preview" 
            className="object-contain w-full h-32"
          />
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
