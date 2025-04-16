
import React from 'react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';
import { FileUploader } from '@/components/shared/FileUploader';

export interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: string;
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
      name={fieldName as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            {label} {optional && <span className="text-muted-foreground text-sm">(Optional)</span>}
          </FormLabel>
          <FormControl>
            <FileUploader
              value={field.value}
              onChange={field.onChange}
              accept="image/*"
              maxSizeInMB={5}
              className="h-32"
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
