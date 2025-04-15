
import React from 'react';
import { DOCUMENT_TYPES, getDocumentTypeLabel } from '@/utils/verification/documentTypes';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '../utils/formUtils';

interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
}

const DocumentTypeSelect = ({ form }: DocumentTypeSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>ID Document Type</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                // Update the document type
                field.onChange(value);
                
                // If changing to passport, reset back image since it's optional
                if (value === DOCUMENT_TYPES.PASSPORT) {
                  form.setValue('documentBackImage', undefined);
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DOCUMENT_TYPES).map(([key, value]) => (
                  <SelectItem key={key} value={value}>
                    {getDocumentTypeLabel(value as keyof typeof DOCUMENT_TYPES)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            Choose the type of ID document you will upload for verification
          </FormDescription>
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
