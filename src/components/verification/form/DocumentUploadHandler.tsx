
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentUploadHandlerProps {
  onFileSelect: (file: File) => void;
  label: string;
  acceptedTypes?: string[];
  maxSize?: number;
  error?: string;
  className?: string;
}

const DocumentUploadHandler = ({
  onFileSelect,
  label,
  acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
  maxSize = 5 * 1024 * 1024, // 5MB
  error,
  className
}: DocumentUploadHandlerProps) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!acceptedTypes.includes(file.type)) {
      console.error('Invalid file type');
      return;
    }

    if (file.size > maxSize) {
      console.error('File too large');
      return;
    }

    onFileSelect(file);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <Label>{label}</Label>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors",
          error && "border-destructive",
          "relative"
        )}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={acceptedTypes.join(',')}
          onChange={handleFileChange}
        />
        <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Click to upload or drag and drop
        </p>
        <p className="text-xs text-muted-foreground">
          Maximum file size: {Math.floor(maxSize / 1024 / 1024)}MB
        </p>
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default DocumentUploadHandler;
