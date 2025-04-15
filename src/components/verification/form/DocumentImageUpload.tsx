
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { VerificationFormValues } from '../utils/formUtils';
import ImageDropzone from '../utils/ImageDropzone';

interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: keyof VerificationFormValues;
  label: string;
  description: string;
  optional?: boolean;
  maxSizeMB?: number;
  allowedFileTypes?: string[];
}

const DocumentImageUpload: React.FC<DocumentImageUploadProps> = ({
  form,
  fieldName,
  label,
  description,
  optional = false,
  maxSizeMB = 5,
  allowedFileTypes = ['image/jpeg', 'image/png', 'image/webp']
}) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {optional && <span className="text-muted-foreground">(Optional)</span>}
          </FormLabel>
          <FormControl>
            <ImageDropzone
              onFileSelect={(fileObj) => {
                // Ensure we always pass an object with a file property or undefined
                field.onChange(fileObj && 'file' in fileObj ? { file: fileObj.file } : undefined);
              }}
              currentFile={field.value && typeof field.value === 'object' && 'file' in field.value ? field.value : undefined}
              error={form.formState.errors[fieldName]?.message?.toString()}
              maxSize={maxSizeMB}
              acceptedTypes={allowedFileTypes}
            />
          </FormControl>
          <FormDescription>
            {description} 
            <p className="text-xs text-muted-foreground mt-1">
              Accepted file types: {allowedFileTypes.map(type => type.split('/')[1]).join(', ')}. 
              Maximum file size: {maxSizeMB}MB.
            </p>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentImageUpload;
