
import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';

interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: string; // Add the missing prop
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
  const [isHovering, setIsHovering] = useState(false);

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHovering(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHovering(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent, onChange: (value: any) => void) => {
    e.preventDefault();
    e.stopPropagation();
    setIsHovering(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      onChange({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (value: any) => void) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onChange({
        file,
        preview: URL.createObjectURL(file)
      });
    }
  };

  const removeFile = (onChange: (value: any) => void) => {
    onChange({ preview: '' });
  };

  return (
    <FormField
      control={form.control}
      name={fieldName as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} {optional && <span className="text-muted-foreground text-sm">(Optional)</span>}</FormLabel>
          <FormControl>
            <div
              className={`border-2 border-dashed rounded-md p-6 transition-colors ${
                isHovering ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, field.onChange)}
            >
              {field.value?.preview ? (
                <div className="relative">
                  <img
                    src={field.value.preview}
                    alt={`${label} preview`}
                    className="w-full h-auto max-h-40 object-contain rounded-md mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => removeFile(field.onChange)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center space-y-2">
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="font-medium">Click or drag file to upload</p>
                    <p className="text-xs text-muted-foreground">
                      {description || 'PNG, JPG or JPEG (max. 5MB)'}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, field.onChange)}
                    id={`file-upload-${fieldName}`}
                  />
                  <label htmlFor={`file-upload-${fieldName}`}>
                    <Button type="button" variant="outline" className="cursor-pointer">
                      Select File
                    </Button>
                  </label>
                </div>
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
