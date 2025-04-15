
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ImageDropzoneProps {
  onFileSelect: (file: { file?: File }) => void;
  currentFile?: { file?: File };
  onImageSelected?: (file: any) => void; // Added for backward compatibility
  error?: string;
  label?: string;
  maxSize?: number;
  acceptedTypes?: string[];
  className?: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileSelect,
  currentFile,
  onImageSelected,
  error,
  label = 'Drop files here or click to browse',
  maxSize = 5, // MB
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  className = ''
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      
      reader.readAsDataURL(file);
      
      if (onFileSelect) {
        onFileSelect({ file });
      }
      
      if (onImageSelected) {
        onImageSelected(file);
      }
    }
  }, [onFileSelect, onImageSelected]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: acceptedTypes.reduce((obj, type) => ({ ...obj, [type]: [] }), {}),
    maxSize: maxSize * 1024 * 1024,
    multiple: false
  });
  
  const handleRemove = useCallback(() => {
    setPreview(null);
    onFileSelect({ file: undefined });
    if (onImageSelected) onImageSelected(null);
  }, [onFileSelect, onImageSelected]);

  return (
    <div className={className}>
      {preview || (currentFile && currentFile.file) ? (
        <div className="relative border rounded-md overflow-hidden">
          <img 
            src={preview || (currentFile?.file ? URL.createObjectURL(currentFile.file) : '')} 
            alt="Preview" 
            className="w-full h-36 object-cover"
          />
          <Button 
            variant="destructive" 
            size="icon" 
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors ${
            isDragActive ? 'border-primary bg-primary/10' : 'border-muted'
          } ${error ? 'border-destructive' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2 p-4">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">
              Max size: {maxSize}MB
            </p>
          </div>
        </div>
      )}
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
};

export default ImageDropzone;
