
import React, { useState } from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { DocumentTypeSelect } from '.';
import { Upload, UploadCloud } from 'lucide-react';
import DocumentPreview from './DocumentPreview';

interface DocumentUploadSectionProps {
  form: UseFormReturn<any>;
  documentType: string;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({
  form,
  documentType
}) => {
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  const handleFileChange = (field: any, event: React.ChangeEvent<HTMLInputElement>, setPreview: (url: string | null) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      field.onChange(file);
      
      // Create URL for preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const clearFile = (field: any, setPreview: (url: string | null) => void) => {
    field.onChange(undefined);
    setPreview(null);
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Document Upload</h3>
      
      <FormField
        control={form.control}
        name="documentFile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Document Front</FormLabel>
            <FormControl>
              <div>
                {!frontPreview ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 transition-colors hover:border-primary/50 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      id="documentFile"
                      className="hidden"
                      onChange={(e) => handleFileChange(field, e, setFrontPreview)}
                    />
                    <label htmlFor="documentFile" className="cursor-pointer w-full h-full flex flex-col items-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Click to upload document front</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG or PDF (max. 10MB)</p>
                    </label>
                  </div>
                ) : (
                  <DocumentPreview
                    file={field.value}
                    previewUrl={frontPreview}
                    onRemove={() => clearFile(field, setFrontPreview)}
                    label="Document Front"
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="selfieFile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Selfie with ID</FormLabel>
            <FormControl>
              <div>
                {!selfiePreview ? (
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 transition-colors hover:border-primary/50 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      id="selfieFile"
                      className="hidden"
                      onChange={(e) => handleFileChange(field, e, setSelfiePreview)}
                    />
                    <label htmlFor="selfieFile" className="cursor-pointer w-full h-full flex flex-col items-center">
                      <UploadCloud className="h-10 w-10 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-1">Click to upload selfie with ID</p>
                      <p className="text-xs text-muted-foreground">Hold your ID next to your face</p>
                    </label>
                  </div>
                ) : (
                  <DocumentPreview
                    file={field.value}
                    previewUrl={selfiePreview}
                    onRemove={() => clearFile(field, setSelfiePreview)}
                    label="Selfie with ID"
                  />
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default DocumentUploadSection;
