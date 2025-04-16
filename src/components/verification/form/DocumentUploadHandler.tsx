
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileUp, X, Image } from 'lucide-react';

interface DocumentUploadHandlerProps {
  label: string;
  onFileSelect: (file: File) => void;
  error?: string;
  optional?: boolean;
}

const DocumentUploadHandler: React.FC<DocumentUploadHandlerProps> = ({
  label,
  onFileSelect,
  error,
  optional = false
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelect(file);
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
    
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
    onFileSelect(file);
  };

  const removeFile = () => {
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium">{label}</p>
        {optional && <span className="text-xs text-muted-foreground">Optional</span>}
      </div>
      
      {preview ? (
        <Card className="overflow-hidden">
          <div className="relative">
            <img 
              src={preview} 
              alt={label} 
              className="w-full h-auto max-h-40 object-cover" 
            />
            <Button 
              type="button"
              variant="destructive" 
              size="icon"
              className="absolute top-2 right-2 h-6 w-6"
              onClick={removeFile}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
            isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          {isDragging ? (
            <Image className="h-8 w-8 text-primary mb-2" />
          ) : (
            <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
          )}
          <p className="text-sm font-medium text-center">
            {isDragging ? 'Drop to upload' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-muted-foreground text-center mt-1">
            JPG, PNG or WEBP (max. 5MB)
          </p>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default DocumentUploadHandler;
