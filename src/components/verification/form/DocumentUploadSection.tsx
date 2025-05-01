
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import DocumentUploadHandler from './DocumentUploadHandler';

interface DocumentUploadSectionProps {
  form: any;
}

const DocumentUploadSection: React.FC<DocumentUploadSectionProps> = ({ form }) => {
  const documentType = form.watch('documentType');
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);

  const handleFrontFileChange = (file: File) => {
    form.setValue('frontFile', file);
    form.trigger('frontFile');
    
    // Create preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setFrontPreview(url);
    }
  };

  const handleBackFileChange = (file: File) => {
    form.setValue('backFile', file);
    form.trigger('backFile');
    
    // Create preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setBackPreview(url);
    }
  };

  const handleSelfieFileChange = (file: File) => {
    form.setValue('selfieFile', file);
    form.trigger('selfieFile');
    
    // Create preview URL
    if (file) {
      const url = URL.createObjectURL(file);
      setSelfiePreview(url);
    }
  };

  // Clean up preview URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (frontPreview) URL.revokeObjectURL(frontPreview);
      if (backPreview) URL.revokeObjectURL(backPreview);
      if (selfiePreview) URL.revokeObjectURL(selfiePreview);
    };
  }, [frontPreview, backPreview, selfiePreview]);

  const needsBackSide = documentType && documentType !== 'passport';

  return (
    <div className="space-y-6">
      <FormField
        name="frontFile"
        control={form.control}
        rules={{ required: "Front side of document is required" }}
        render={({ field }) => (
          <FormItem>
            <div className="space-y-2">
              <DocumentUploadHandler
                label="Front side of document"
                onFileSelect={handleFrontFileChange}
                error={form.formState.errors.frontFile?.message}
              />
              
              {frontPreview && (
                <div className="mt-2">
                  <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border">
                    <img
                      src={frontPreview}
                      alt="Front document preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <FormDescription>
                Upload a clear photo or scan of the front side of your document
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      {needsBackSide && (
        <FormField
          name="backFile"
          control={form.control}
          rules={{ required: "Back side of document is required" }}
          render={({ field }) => (
            <FormItem>
              <div className="space-y-2">
                <DocumentUploadHandler
                  label="Back side of document"
                  onFileSelect={handleBackFileChange}
                  error={form.formState.errors.backFile?.message}
                />
                
                {backPreview && (
                  <div className="mt-2">
                    <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border">
                      <img
                        src={backPreview}
                        alt="Back document preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                
                <FormDescription>
                  Upload a clear photo or scan of the back side of your document
                </FormDescription>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
      )}

      <FormField
        name="selfieFile"
        control={form.control}
        rules={{ required: "Selfie with document is required" }}
        render={({ field }) => (
          <FormItem>
            <div className="space-y-2">
              <DocumentUploadHandler
                label="Selfie with document"
                onFileSelect={handleSelfieFileChange}
                error={form.formState.errors.selfieFile?.message}
              />
              
              {selfiePreview && (
                <div className="mt-2">
                  <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-md border">
                    <img
                      src={selfiePreview}
                      alt="Selfie preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              )}
              
              <FormDescription>
                Upload a selfie of yourself holding your ID document
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default DocumentUploadSection;
