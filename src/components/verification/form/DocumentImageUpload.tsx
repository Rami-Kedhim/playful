
import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import FileUploader from '@/components/shared/FileUploader';

interface DocumentImageUploadProps {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  description?: string;
  accept?: string;
  maxSize?: number;
  required?: boolean;
}

const DocumentImageUpload: React.FC<DocumentImageUploadProps> = ({
  form,
  name,
  label,
  description,
  accept = "image/*",
  maxSize = 5,
  required = false
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}{required && <span className="text-destructive ml-1">*</span>}</FormLabel>
          <FormControl>
            <FileUploader
              accept={accept}
              maxSize={maxSize}
              onFileSelect={(file) => field.onChange(file)}
              buttonText="Upload Document"
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentImageUpload;
