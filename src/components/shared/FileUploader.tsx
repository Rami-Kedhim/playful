
import React, { useState } from 'react';
import { Upload, X, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

export interface FileUploaderProps {
  accept?: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  className?: string;
  buttonText?: string;
  variant?: 'default' | 'compact';
  disabled?: boolean;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = "image/*",
  maxSize = 5, // Default 5MB
  onFileSelect,
  className,
  buttonText = "Upload File",
  variant = 'default',
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    setFileError(null);
    
    if (maxSize && file.size > maxSize * 1024 * 1024) {
      setFileError(`File size exceeds ${maxSize}MB limit`);
      return false;
    }
    
    const acceptedTypes = accept.split(',').map(type => type.trim());
    if (acceptedTypes.length && acceptedTypes[0] !== '*') {
      const fileType = file.type;
      const isValidType = acceptedTypes.some(type => {
        if (type.endsWith('/*')) {
          const category = type.split('/')[0];
          return fileType.startsWith(`${category}/`);
        }
        return type === fileType;
      });
      
      if (!isValidType) {
        setFileError(`Invalid file type. Accepted: ${accept}`);
        return false;
      }
    }
    
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      onFileSelect(selectedFile);
    } else {
      toast({
        title: "Upload Error",
        description: fileError,
        variant: "destructive",
      });
    }
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
    
    if (e.dataTransfer.files.length) {
      const droppedFile = e.dataTransfer.files[0];
      if (validateFile(droppedFile)) {
        setFile(droppedFile);
        onFileSelect(droppedFile);
      } else {
        toast({
          title: "Upload Error",
          description: fileError,
          variant: "destructive",
        });
      }
    }
  };

  const handleClick = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  if (variant === 'compact') {
    return (
      <div className={cn("relative", className)}>
        <Input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
          disabled={disabled || isUploading}
        />
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          disabled={disabled || isUploading}
          onClick={handleClick}
          className="w-full flex items-center justify-center"
        >
          {isUploading ? (
            <>Loading...</>
          ) : file ? (
            <>
              <Check className="mr-2 h-4 w-4" />
              <span className="truncate max-w-[150px]">{file.name}</span>
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              {buttonText}
            </>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled || isUploading}
      />
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-muted-foreground/50",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
      >
        {file ? (
          <div className="flex flex-col items-center">
            <Check className="h-10 w-10 text-green-500 mb-2" />
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation();
                setFile(null);
              }}
              className="mt-2"
              disabled={isUploading}
            >
              <X className="h-4 w-4 mr-1" /> Remove
            </Button>
          </div>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-sm font-medium">{buttonText}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag and drop or click to upload
            </p>
            {accept !== "*" && (
              <p className="text-xs text-muted-foreground mt-1">
                Accepted formats: {accept}
              </p>
            )}
            {maxSize && (
              <p className="text-xs text-muted-foreground">
                Max size: {maxSize}MB
              </p>
            )}
          </>
        )}

        {fileError && (
          <div className="flex items-center text-destructive mt-2 text-xs">
            <AlertCircle className="h-3 w-3 mr-1" />
            {fileError}
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploader;
