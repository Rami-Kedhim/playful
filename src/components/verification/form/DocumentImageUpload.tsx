
import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Upload, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';

export interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: string;
  label: string;
  description?: string;
  optional?: boolean;
}

const DocumentImageUpload: React.FC<DocumentImageUploadProps> = ({
  form,
  fieldName,
  label,
  description,
  optional = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length) {
      handleFileSelect(files[0]);
    }
  };
  
  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) {
      return;
    }
    
    form.setValue(fieldName as any, {
      file,
      preview: URL.createObjectURL(file)
    });
  };
  
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };
  
  const clearSelectedFile = () => {
    form.setValue(fieldName as any, { preview: '' });
  };
  
  return (
    <FormField
      control={form.control}
      name={fieldName as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} {optional && <span className="text-muted-foreground">(Optional)</span>}</FormLabel>
          <FormControl>
            <div>
              {field.value?.preview ? (
                <div className="relative">
                  <img
                    src={field.value.preview}
                    alt={label}
                    className="object-cover rounded-md max-h-56 w-full"
                  />
                  <button
                    type="button"
                    onClick={clearSelectedFile}
                    className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1"
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <Card
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-dashed border-2 p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/20'
                  }`}
                  onClick={() => document.getElementById(`file-${fieldName}`)?.click()}
                >
                  <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-sm font-medium">
                    Drop your image here or <span className="text-primary">browse</span>
                  </p>
                  {description && (
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      {description}
                    </p>
                  )}
                  <input
                    id={`file-${fieldName}`}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </Card>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentImageUpload;
