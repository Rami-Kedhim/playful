
import React, { useCallback, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Upload, File, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentUploadHandlerProps {
  label: string;
  onFileSelect: (file: File) => void;
  error?: string;
  accept?: string;
  disabled?: boolean;
}

const DocumentUploadHandler: React.FC<DocumentUploadHandlerProps> = ({
  label,
  onFileSelect,
  error,
  accept = "image/*",
  disabled = false
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);
  
  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);
  
  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  }, []);
  
  const handleFile = (file: File) => {
    if (disabled) return;
    
    setIsLoading(true);
    try {
      onFileSelect(file);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="w-full">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted",
          error ? "border-destructive" : "",
          disabled ? "opacity-50 cursor-not-allowed" : ""
        )}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="sr-only"
          onChange={handleFileInput}
          accept={accept}
          disabled={disabled || isLoading}
        />
        <label
          htmlFor={`file-upload-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="flex flex-col items-center justify-center w-full cursor-pointer"
        >
          {isLoading ? (
            <Loader2 className="h-8 w-8 text-primary animate-spin" />
          ) : (
            <>
              <div className="p-3 bg-primary/10 rounded-full">
                <Upload className="h-6 w-6 text-primary" />
              </div>
              <p className="mt-3 text-sm font-medium">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag & drop or click to browse
              </p>
            </>
          )}
        </label>
      </div>
      {error && <p className="text-sm text-destructive mt-2">{error}</p>}
    </div>
  );
};

export default DocumentUploadHandler;
