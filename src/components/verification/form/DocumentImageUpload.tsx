
import React, { useState } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';

interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: keyof VerificationFormValues;
  label: string;
  description?: string;
}

const DocumentImageUpload: React.FC<DocumentImageUploadProps> = ({
  form,
  fieldName,
  label,
  description
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create a preview URL
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    
    // Update form values
    form.setValue(fieldName, {
      file: file,
      preview: objectUrl
    } as any);
  };
  
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
          {previewUrl ? (
            <div className="space-y-2">
              <img 
                src={previewUrl} 
                alt="Document preview" 
                className="mx-auto max-h-40 object-contain"
              />
              <Button 
                type="button" 
                variant="outline"
                onClick={() => {
                  setPreviewUrl(null);
                  form.setValue(fieldName, undefined as any);
                }}
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">{description || "Click to upload or drag and drop"}</p>
              <p className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
              <input
                type="file"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <Button type="button" variant="outline" className="mt-2">
                Select File
              </Button>
            </>
          )}
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DocumentImageUpload;
