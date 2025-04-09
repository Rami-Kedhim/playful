
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues, handleFileChange } from '../utils/formUtils';

interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: 'documentFrontImage' | 'documentBackImage' | 'selfieImage';
  label: string;
  description: string;
  optional?: boolean;
}

const DocumentImageUpload = ({ 
  form, 
  fieldName, 
  label, 
  description, 
  optional = false 
}: DocumentImageUploadProps) => {
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => handleFileChange(e, form, fieldName)}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary"
              />
              {field.value && (
                <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={field.value instanceof File ? URL.createObjectURL(field.value) : ""}
                    alt={`${fieldName} preview`}
                    className="object-cover h-full w-full"
                  />
                </div>
              )}
            </div>
          </FormControl>
          <FormDescription>
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentImageUpload;
