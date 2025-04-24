
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentPreviewProps {
  file: File;
  previewUrl?: string;
  onRemove: () => void;
  label: string;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ file, previewUrl, onRemove, label }) => {
  const [preview, setPreview] = React.useState<string | null>(previewUrl || null);
  const [error, setError] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!previewUrl && file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.onerror = () => {
        setError(true);
      };
      reader.readAsDataURL(file);
    }
    return () => setPreview(null);
  }, [file, previewUrl]);

  if (error) {
    return (
      <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
        Failed to load preview
      </div>
    );
  }

  if (!preview) {
    return null;
  }

  return (
    <div className="relative">
      <div className="rounded-md border bg-muted/20 p-2">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-medium">{label}</span>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onRemove}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="relative aspect-[3/2] overflow-hidden rounded-md">
          <img 
            src={preview} 
            alt={`Preview of ${label}`}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview;
