
import React from 'react';
import { FormField } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import DocumentUploadHandler from './DocumentUploadHandler';
import DocumentPreview from './DocumentPreview';

interface DocumentUploadSectionProps {
  form: UseFormReturn<any>;
  documentType: string;
}

const DocumentUploadSection = ({ form, documentType }: DocumentUploadSectionProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="documentFile"
        render={() => (
          <DocumentUploadHandler
            label="Front of ID Document"
            onFileSelect={(file) => {
              form.setValue('documentFile', file);
            }}
            error={form.formState.errors.documentFile?.message?.toString()}
          />
        )}
      />

      <FormField
        control={form.control}
        name="selfieFile"
        render={() => (
          <DocumentUploadHandler
            label="Selfie with ID"
            onFileSelect={(file) => {
              form.setValue('selfieFile', file);
            }}
            error={form.formState.errors.selfieFile?.message?.toString()}
          />
        )}
      />
    </div>
  );
};

export default DocumentUploadSection;
