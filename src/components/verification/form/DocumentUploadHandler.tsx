
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

interface DocumentUploadHandlerProps {
  label: string;
  onFileSelect: (file: File) => void;
  error?: string;
}

const DocumentUploadHandler: React.FC<DocumentUploadHandlerProps> = ({
  label,
  onFileSelect,
  error
}) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <Label className="mb-2">{label}</Label>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/heic"
        className="hidden"
      />
      
      {file ? (
        <div className="flex items-center justify-between p-3 border rounded-md bg-muted/30">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-10 h-10 bg-muted flex items-center justify-center rounded-md">
              <Upload className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleRemoveFile}
            className="text-muted-foreground hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={handleButtonClick}
          className="w-full h-24 border-dashed flex flex-col gap-1"
        >
          <Upload className="h-5 w-5" />
          <span className="text-sm">Choose file or drag and drop</span>
          <span className="text-xs text-muted-foreground">
            JPG, PNG, or HEIC (max 10MB)
          </span>
        </Button>
      )}
      
      {error && <p className="text-destructive text-sm">{error}</p>}
    </div>
  );
};

export default DocumentUploadHandler;
