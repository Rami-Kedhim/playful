
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues, DOCUMENT_TYPES, getDocumentTypeName } from '../utils/formUtils';

interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
}

const DocumentTypeSelect = ({ form }: DocumentTypeSelectProps) => {
  // Get the current document type
  const documentType = form.watch('documentType');

  // When document type changes, handle the back image requirement
  const handleDocumentTypeChange = (value: string) => {
    form.setValue('documentType', value as any);
    
    // Clear back image when switching to passport (as it's optional)
    if (value === DOCUMENT_TYPES.PASSPORT) {
      form.setValue('documentBackImage', null);
    }
  };

  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select onValueChange={handleDocumentTypeChange} value={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={DOCUMENT_TYPES.PASSPORT}>{getDocumentTypeName(DOCUMENT_TYPES.PASSPORT)}</SelectItem>
              <SelectItem value={DOCUMENT_TYPES.ID_CARD}>{getDocumentTypeName(DOCUMENT_TYPES.ID_CARD)}</SelectItem>
              <SelectItem value={DOCUMENT_TYPES.DRIVER_LICENSE}>{getDocumentTypeName(DOCUMENT_TYPES.DRIVER_LICENSE)}</SelectItem>
            </SelectContent>
          </Select>
          <FormDescription>
            Select the type of identity document you will be uploading.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
