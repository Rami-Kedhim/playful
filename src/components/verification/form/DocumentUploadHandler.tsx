
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, Image, X } from 'lucide-react';

interface DocumentUploadHandlerProps {
  label: string;
  onFileSelect: (file: File) => void;
  error?: string;
  accept?: string;
  placeholder?: string;
  previewUrl?: string;
}

const DocumentUploadHandler: React.FC<DocumentUploadHandlerProps> = ({
  label,
  onFileSelect,
  error,
  accept = "image/*",
  placeholder = "Select or drag an image",
  previewUrl
}) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    // Create preview
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);
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
    
    if (e.dataTransfer.files.length) {
      const file = e.dataTransfer.files[0];
      handleFile(file);
    }
  };

  const clearPreview = () => {
    setPreview(null);
    // Reset input
    const input = document.getElementById(`file-input-${label.replace(/\s+/g, '-')}`) as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div 
          className={`relative ${error ? 'border-destructive' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {preview ? (
            <Card className="p-2 relative">
              <img 
                src={preview} 
                alt={`Preview for ${label}`} 
                className="w-full h-auto max-h-48 object-contain rounded-md"
              />
              <Button 
                variant="ghost" 
                size="icon"
                type="button"
                onClick={clearPreview}
                className="absolute top-2 right-2 bg-background/90 rounded-full h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ) : (
            <div 
              className={`flex flex-col items-center justify-center p-6 border-2 border-dashed
              rounded-md transition-colors h-32
              ${isDragging ? 'border-primary bg-primary/10' : 'border-muted-foreground/20'}
              ${error ? 'border-destructive' : ''}`}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                {isDragging ? <Image className="h-8 w-8 text-primary" /> : <Upload className="h-8 w-8" />}
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Click to upload</span> or drag and drop
                </div>
                <p className="text-xs text-muted-foreground">
                  {placeholder}
                </p>
              </div>
              <Input
                id={`file-input-${label.replace(/\s+/g, '-')}`}
                type="file"
                accept={accept}
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
              />
            </div>
          )}
        </div>
      </FormControl>
      {error && <FormMessage>{error}</FormMessage>}
    </FormItem>
  );
};

export default DocumentUploadHandler;
