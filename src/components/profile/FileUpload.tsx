
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { Upload, X, Image, FileText, File, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface FileUploadProps {
  id: string;
  label: string;
  accept: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove?: () => void;
  hint?: string;
  error?: string;
  className?: string;
  disabled?: boolean;
  preview?: string;
  progress?: number;
  showPreview?: boolean;
  maxSize?: number;
}

const FileUpload = ({ 
  id, 
  label, 
  accept, 
  onChange, 
  onRemove,
  hint, 
  error, 
  className,
  disabled = false,
  preview,
  progress,
  showPreview = true,
  maxSize = 1 // Default max size in MB
}: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    if (disabled) return;
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      // Create a new event with the file
      const fileInput = document.getElementById(id) as HTMLInputElement;
      if (fileInput) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(e.dataTransfer.files[0]);
        fileInput.files = dataTransfer.files;
        
        // Trigger change event
        const event = new Event('change', { bubbles: true });
        fileInput.dispatchEvent(event);
        
        // Call the onChange handler
        onChange({ target: fileInput } as unknown as React.ChangeEvent<HTMLInputElement>);
      }
    }
  };
  
  // Get file type icon
  const getFileIcon = () => {
    if (accept.includes('image')) return <Image className="w-8 h-8 mb-1 text-muted-foreground" />;
    if (accept.includes('pdf') || accept.includes('doc')) return <FileText className="w-8 h-8 mb-1 text-muted-foreground" />;
    return <File className="w-8 h-8 mb-1 text-muted-foreground" />;
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id} className="block mb-2">{label}</Label>
      
      {/* Show preview if available and requested */}
      {preview && showPreview && (
        <div className="relative mb-3 inline-block">
          {accept.includes('image') ? (
            <div className="relative w-32 h-32 rounded-md overflow-hidden border border-border">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="flex items-center space-x-2 p-2 bg-muted rounded-md">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm truncate max-w-[180px]">File uploaded</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
          )}
          
          {onRemove && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
              onClick={onRemove}
              disabled={disabled}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
      
      {/* Progress bar if uploading */}
      {typeof progress === 'number' && (
        <div className="w-full mb-2">
          <Progress value={progress} className="h-2 w-full" />
          <p className="text-xs text-muted-foreground mt-1 text-right">{progress}% uploaded</p>
        </div>
      )}
      
      <div 
        className={cn(
          "flex items-center justify-center w-full",
          "border-2 border-dashed rounded-lg",
          "transition-colors duration-200",
          error ? "border-destructive" : isDragging ? "border-primary" : "border-input",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50",
        )}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <label 
          htmlFor={id} 
          className={cn(
            "flex flex-col items-center justify-center w-full py-3 px-4",
            preview && !showPreview ? "h-16" : "h-24",
            disabled ? "cursor-not-allowed" : "cursor-pointer"
          )}
        >
          {getFileIcon()}
          <p className="text-sm text-center text-muted-foreground">
            {preview && !showPreview ? (
              <span className="flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-1" /> File selected
              </span>
            ) : (
              <>Click to upload or drag and drop</>
            )}
          </p>
          {hint && !preview && <p className="text-xs text-center text-gray-400 mt-1">{hint}</p>}
          {maxSize && !preview && (
            <p className="text-xs text-center text-gray-400 mt-1">Max size: {maxSize}MB</p>
          )}
          <Input 
            id={id} 
            type="file" 
            accept={accept} 
            onChange={onChange}
            className="hidden"
            disabled={disabled}
          />
        </label>
      </div>
      
      {error && <FormMessage>{error}</FormMessage>}
    </div>
  );
};

export default FileUpload;
