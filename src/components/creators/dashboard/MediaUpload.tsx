
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { UploadCloud, Trash2, FileImage, FileVideo, FilePlus, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface MediaUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onThumbnailChange?: (url: string) => void;
  type: "image" | "video" | "file";
  className?: string;
  accept?: string;
  maxSize?: number; // in MB
  error?: string;
}

const MediaUpload = ({
  value,
  onChange,
  onThumbnailChange,
  type,
  className,
  accept,
  maxSize = 50, // Default 50MB
  error
}: MediaUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localUrl, setLocalUrl] = useState(value || "");
  const [thumbnail, setThumbnail] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  
  useEffect(() => {
    setLocalUrl(value || "");
  }, [value]);
  
  // Determine accepted file types
  const getAcceptTypes = () => {
    if (accept) return accept;
    switch (type) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      default:
        return "";
    }
  };
  
  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`File is too large. Maximum size is ${maxSize}MB.`);
      return;
    }
    
    // Reset error
    setUploadError("");
    
    // Simulate upload
    handleFileUpload(file);
  };
  
  // Simulate file upload
  const handleFileUpload = (file: File) => {
    setUploading(true);
    setProgress(0);
    
    // Create local preview URL for images
    if (type === "image") {
      const previewUrl = URL.createObjectURL(file);
      setThumbnail(previewUrl);
      if (onThumbnailChange) {
        onThumbnailChange(previewUrl);
      }
    }
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          // In a real app, this would be the URL returned from the server
          const fakeUploadedUrl = URL.createObjectURL(file);
          setLocalUrl(fakeUploadedUrl);
          onChange(fakeUploadedUrl);
          
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };
  
  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    // Check if the dropped file matches the accepted types
    const acceptTypes = getAcceptTypes();
    if (acceptTypes && !file.type.match(acceptTypes.replace(/\*/g, '.*'))) {
      setUploadError(`Invalid file type. Accepted types: ${acceptTypes}`);
      return;
    }
    
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setUploadError(`File is too large. Maximum size is ${maxSize}MB.`);
      return;
    }
    
    // Reset error
    setUploadError("");
    
    // Handle upload
    handleFileUpload(file);
  };
  
  // Handle URL input change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setLocalUrl(url);
    onChange(url);
  };
  
  // Clear the selected file
  const handleClear = () => {
    setLocalUrl("");
    setThumbnail("");
    setProgress(0);
    setUploading(false);
    setUploadError("");
    onChange("");
    if (onThumbnailChange) {
      onThumbnailChange("");
    }
  };
  
  // Get the icon for the media type
  const getMediaIcon = () => {
    switch (type) {
      case "image":
        return <FileImage className="h-8 w-8 text-muted-foreground" />;
      case "video":
        return <FileVideo className="h-8 w-8 text-muted-foreground" />;
      default:
        return <FilePlus className="h-8 w-8 text-muted-foreground" />;
    }
  };
  
  return (
    <div className={cn("space-y-2", className)}>
      {!localUrl ? (
        <>
          {/* Upload area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition-colors",
              isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
              error || uploadError ? "border-destructive/50" : ""
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {uploading ? (
              <div className="w-full space-y-4">
                <div className="flex justify-center">
                  <UploadCloud className="h-8 w-8 text-primary animate-bounce" />
                </div>
                <Progress value={progress} className="w-full" />
                <p className="text-center text-sm text-muted-foreground">
                  Uploading... {progress}%
                </p>
              </div>
            ) : (
              <>
                <div className="bg-muted/50 p-4 rounded-full">
                  {getMediaIcon()}
                </div>
                <div className="space-y-1 text-center">
                  <p className="text-sm font-medium">
                    Drag and drop your {type}, or{" "}
                    <Label htmlFor="file-upload" className="text-primary hover:underline cursor-pointer">
                      browse
                    </Label>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Maximum file size: {maxSize}MB
                  </p>
                </div>
                <Input
                  id="file-upload"
                  type="file"
                  accept={getAcceptTypes()}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </>
            )}
          </div>
          
          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or paste URL</span>
            </div>
          </div>
          
          {/* URL input */}
          <Input
            type="url"
            placeholder={`Enter ${type} URL`}
            value={localUrl}
            onChange={handleUrlChange}
            disabled={uploading}
          />
        </>
      ) : (
        <div className="relative overflow-hidden rounded-lg border">
          {type === "image" && (
            <img
              src={localUrl}
              alt="Uploaded image"
              className="w-full h-48 object-cover"
              onError={() => setUploadError("Failed to load image. Check the URL and try again.")}
            />
          )}
          
          {type === "video" && (
            <video
              src={localUrl}
              controls
              className="w-full h-48 object-cover"
              onError={() => setUploadError("Failed to load video. Check the URL and try again.")}
            />
          )}
          
          {type !== "image" && type !== "video" && (
            <div className="flex items-center justify-center h-48 bg-muted/30">
              <div className="text-center space-y-2">
                {getMediaIcon()}
                <p className="text-sm font-medium">{localUrl.split('/').pop() || "File"}</p>
              </div>
            </div>
          )}
          
          <div className="absolute inset-0 bg-black/70 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex gap-2">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleClear}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Remove
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => {
                  // Trigger file input click
                  document.getElementById("file-upload")?.click();
                }}
              >
                <UploadCloud className="h-4 w-4 mr-1" />
                Replace
              </Button>
              <Input
                id="file-upload"
                type="file"
                accept={getAcceptTypes()}
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>
          </div>
        </div>
      )}
      
      {/* Error message */}
      {(error || uploadError) && (
        <div className="flex items-center gap-2 text-destructive text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>{error || uploadError}</span>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
