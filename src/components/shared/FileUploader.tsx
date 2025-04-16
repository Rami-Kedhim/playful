
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
  value?: string | File | null;
  onChange: (file: File | null) => void;
  accept?: string;
  maxSizeInMB?: number;
  className?: string;
  multiple?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  value,
  onChange,
  accept = '*/*',
  maxSizeInMB = 5,
  className,
  multiple = false
}) => {
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(
    typeof value === 'string' ? value : null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError(null);

    if (!file) {
      return;
    }

    // Check file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeInMB}MB.`);
      return;
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };

  const handleClear = () => {
    onChange(null);
    setPreview(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    // Check file size
    if (file.size > maxSizeInMB * 1024 * 1024) {
      setError(`File size must be less than ${maxSizeInMB}MB.`);
      return;
    }

    // Check file type
    if (accept !== '*/*') {
      const acceptTypes = accept.split(',');
      const fileType = file.type;
      const isAccepted = acceptTypes.some(type => {
        if (type.includes('/*')) {
          const mainType = type.split('/')[0];
          return fileType.startsWith(`${mainType}/`);
        }
        return type === fileType;
      });

      if (!isAccepted) {
        setError(`File type not accepted. Please upload: ${accept}`);
        return;
      }
    }

    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    onChange(file);
  };

  const preventDefaultDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "relative border-2 border-dashed rounded-md p-4 flex flex-col items-center justify-center cursor-pointer",
        error ? "border-red-500" : "border-gray-300",
        className
      )}
      onDragOver={preventDefaultDrag}
      onDragEnter={preventDefaultDrag}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
        multiple={multiple}
      />
      
      {preview ? (
        <div className="relative w-full h-full">
          <img
            src={preview}
            alt="Preview"
            className="object-contain w-full h-full"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              handleClear();
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="text-center">
          <Upload className="h-8 w-8 mx-auto text-gray-400" />
          <p className="mt-1 text-sm text-gray-500">
            Drop a file or click to browse
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Max size: {maxSizeInMB}MB
          </p>
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
      )}
    </div>
  );
};
