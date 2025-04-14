
import React, { useEffect, useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues, handleFileChange, DOCUMENT_TYPES, isBackImageRequired } from '../utils/formUtils';
import { FileAlert, FileCheck, Upload } from 'lucide-react';

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
  const documentType = form.watch('documentType');
  const file = form.watch(fieldName);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  // Check if this field is required based on document type
  const isRequired = 
    fieldName !== 'documentBackImage' || 
    (fieldName === 'documentBackImage' && 
     documentType !== DOCUMENT_TYPES.PASSPORT && 
     !optional);

  // Generate preview when file changes
  useEffect(() => {
    if (file && file instanceof File) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [file]);

  // Get field error
  const fieldError = form.formState.errors[fieldName]?.message as string | undefined;
  
  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="flex justify-between">
            <span>{label}
              {!isRequired && <span className="text-muted-foreground ml-1">(Optional)</span>}
            </span>
            {fieldError && (
              <span className="text-xs font-normal text-destructive flex items-center">
                <FileAlert className="h-3.5 w-3.5 mr-1" /> {fieldError}
              </span>
            )}
          </FormLabel>
          <FormControl>
            <div className="space-y-3">
              <div className={`border-2 border-dashed rounded-md p-4 ${fieldError ? 'border-destructive/50 bg-destructive/5' : 'border-muted-foreground/25'}`}>
                <div className="flex flex-col items-center gap-2">
                  <Upload className={`h-6 w-6 ${previewUrl ? 'text-primary' : 'text-muted-foreground'}`} />
                  <div className="text-sm text-center text-muted-foreground">
                    {previewUrl ? (
                      <div className="flex items-center gap-1.5 text-primary">
                        <FileCheck className="h-4 w-4" />
                        <span>File selected</span>
                      </div>
                    ) : (
                      <span>Click or drag file to this area to upload</span>
                    )}
                    <p className="text-xs text-muted-foreground/70 mt-1">JPG, PNG or WEBP (max. 5MB)</p>
                  </div>
                  <Input
                    type="file"
                    id={fieldName}
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(e) => handleFileChange(e, form, fieldName)}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary cursor-pointer opacity-0 absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
              
              {previewUrl && (
                <div className="h-24 w-full rounded-md bg-muted flex items-center justify-center overflow-hidden">
                  <img
                    src={previewUrl}
                    alt={`${label} preview`}
                    className="object-contain h-full w-full"
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
