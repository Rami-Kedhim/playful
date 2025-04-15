
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DocumentPreviewProps {
  file: File;
  onRemove: () => void;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ file, onRemove }) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    return () => setPreview(null);
  }, [file]);

  if (!preview) {
    return null;
  }

  return (
    <div className="relative border rounded-md overflow-hidden">
      <img 
        src={preview} 
        alt="Document preview" 
        className="w-full h-36 object-cover"
      />
      <Button 
        variant="destructive" 
        size="icon" 
        className="absolute top-2 right-2 h-6 w-6"
        onClick={onRemove}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default DocumentPreview;
