
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
}

const DocumentImageUpload: React.FC<DocumentImageUploadProps> = ({
  form,
  fieldName,
  label,
  description,
  optional = false
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
                // Ensure we always pass an object with a file property
                field.onChange(fileObj.file ? { file: fileObj.file } : undefined);
              }}
              currentFile={field.value && 'file' in field.value ? field.value : undefined}
              error={form.formState.errors[fieldName]?.message?.toString()}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentImageUpload;
