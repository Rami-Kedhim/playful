
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud } from 'lucide-react';

interface DocumentUploadHandlerProps {
  label: string;
  onFileSelect: (file: File) => void;
  error?: string;
}

const DocumentUploadHandler = ({ label, onFileSelect, error }: DocumentUploadHandlerProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxFiles: 1,
  });

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-foreground">{label}</label>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted hover:border-primary'}
          ${error ? 'border-destructive' : ''}`}
      >
        <input {...getInputProps()} />
        <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-muted-foreground">
          {isDragActive ? 'Drop file here' : 'Drag & drop a file here, or click to select'}
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Supported formats: JPG, PNG, PDF
        </p>
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
};

export default DocumentUploadHandler;
