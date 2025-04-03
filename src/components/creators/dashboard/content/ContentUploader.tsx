
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadCreatorContent } from "@/services/creator";
import { UploadCloud, X, Check, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";

interface ContentUploaderProps {
  creatorId: string;
  onSuccess: (url: string, fileId: string) => void;
  onCancel: () => void;
  isOpen: boolean;
  contentType?: string;
}

const ContentUploader: React.FC<ContentUploaderProps> = ({
  creatorId,
  onSuccess,
  onCancel,
  isOpen,
  contentType = "image"
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      // Validate file type
      if (contentType === "image" && !selectedFile.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }
      
      if (contentType === "video" && !selectedFile.type.startsWith("video/")) {
        toast({
          title: "Invalid file type",
          description: "Please select a video file",
          variant: "destructive"
        });
        return;
      }
      
      // Validate file size (10MB max)
      if (selectedFile.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "File size must be less than 10MB",
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      
      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(selectedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);
    
    try {
      // Upload file
      const result = await uploadCreatorContent(creatorId, file);
      
      if (result.success && result.data) {
        setProgress(100);
        toast({
          title: "Upload successful",
          description: "Your file has been uploaded",
        });
        
        onSuccess(result.data.url, result.data.id);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your file",
        variant: "destructive"
      });
    } finally {
      clearInterval(progressInterval);
      setUploading(false);
    }
  };

  const handleClearFile = () => {
    setFile(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Upload {contentType === "image" ? "Image" : "Video"}</CardTitle>
        </CardHeader>
        
        <CardContent>
          {!file ? (
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary cursor-pointer transition-colors"
              onClick={() => inputRef.current?.click()}
            >
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground mb-2">
                Click to browse or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {contentType === "image" 
                  ? "Supports: JPG, PNG, GIF (max 10MB)" 
                  : "Supports: MP4, WebM (max 10MB)"}
              </p>
              
              <Input 
                ref={inputRef}
                type="file" 
                className="hidden" 
                onChange={handleFileChange}
                accept={contentType === "image" ? "image/*" : "video/*"}
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Upload preview" 
                    className="w-full h-auto rounded-lg"
                  />
                ) : (
                  <div className="bg-muted rounded-lg p-4 text-center">
                    <Label className="block mb-2">{file.name}</Label>
                    <span className="text-sm text-muted-foreground">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </div>
                )}
                
                <Button 
                  variant="destructive" 
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full"
                  onClick={handleClearFile}
                  disabled={uploading}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              {uploading && (
                <div className="space-y-2">
                  <Progress value={progress} className="h-2" />
                  <p className="text-xs text-center text-muted-foreground">
                    {progress < 100 ? "Uploading..." : "Processing..."}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onCancel} disabled={uploading}>
            Cancel
          </Button>
          
          <Button 
            onClick={handleUpload} 
            disabled={!file || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Upload
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentUploader;
