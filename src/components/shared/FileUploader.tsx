
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File | null) => void;
  buttonText?: string;
  className?: string;
  initialFile?: File | null;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = "image/*",
  maxSize = 5,
  onFileSelect,
  buttonText = "Upload File",
  className,
  initialFile = null
}) => {
  const [file, setFile] = useState<File | null>(initialFile);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    validateAndSetFile(selectedFile);
  };
  
  const validateAndSetFile = (selectedFile: File | null) => {
    setError(null);
    
    if (!selectedFile) {
      setFile(null);
      onFileSelect(null);
      return;
    }
    
    // Check file size
    if (selectedFile.size > maxSize * 1024 * 1024) {
      setError(`File size exceeds ${maxSize}MB`);
      return;
    }
    
    setFile(selectedFile);
    onFileSelect(selectedFile);
  };
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files?.[0] || null;
    validateAndSetFile(droppedFile);
  };
  
  const clearFile = () => {
    setFile(null);
    onFileSelect(null);
    setError(null);
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-gray-300",
          error ? "border-destructive" : ""
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {file ? (
          <div className="w-full">
            <div className="flex items-center justify-between bg-secondary/30 p-2 rounded-md">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span className="text-sm font-medium truncate">
                  {file.name}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={clearFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
            <div className="space-y-2">
              <label 
                htmlFor="fileInput" 
                className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80"
              >
                {buttonText}
              </label>
              <p className="text-xs text-muted-foreground">
                Drag & drop or click to upload. Max {maxSize}MB.
              </p>
              {error && (
                <p className="text-xs text-destructive">{error}</p>
              )}
            </div>
          </div>
        )}
        
        <input
          id="fileInput"
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
};

export default FileUploader;
