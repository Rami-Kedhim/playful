
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FileUploaderProps {
  accept?: Record<string, string[]>;
  maxSize?: number;
  value?: { file: File; preview: string } | null;
  onChange: (value: { file: File; preview: string } | null) => void;
  multiple?: boolean;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  accept = {
    'image/*': ['.jpeg', '.jpg', '.png', '.gif']
  },
  maxSize = 5 * 1024 * 1024, // 5MB
  value,
  onChange,
  multiple = false,
  label = 'Upload file',
  placeholder = 'Drag and drop or click to select',
  disabled = false,
  className = '',
}) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError(null);
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      if (file.size > maxSize) {
        setError(`File size exceeds the ${Math.round(maxSize / (1024 * 1024))}MB limit`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        onChange({ file, preview });
      };
      reader.readAsDataURL(file);
    },
    [maxSize, onChange]
  );

  const removeFile = () => {
    onChange(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
    disabled,
  });

  return (
    <div className={className}>
      {label && <div className="text-sm font-medium mb-2">{label}</div>}
      
      {!value && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-md transition-colors p-6 text-center cursor-pointer
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/20 hover:border-muted-foreground/50'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{placeholder}</p>
            {error && <p className="text-sm text-destructive mt-2">{error}</p>}
          </div>
        </div>
      )}

      {value && (
        <div className="relative">
          <img
            src={value.preview}
            alt="Preview"
            className="max-h-48 max-w-full rounded-md object-contain mx-auto"
          />
          {!disabled && (
            <Button
              type="button"
              size="icon"
              variant="destructive"
              className="absolute top-2 right-2 h-6 w-6 rounded-full"
              onClick={removeFile}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
