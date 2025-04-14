
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues, DOCUMENT_TYPES, getDocumentTypeName } from '../utils/formUtils';
import { FileKey, FileWarning } from 'lucide-react';

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
    if (value === DOCUMENT_TYPES.PASSPORT && form.getValues('documentBackImage')) {
      form.setValue('documentBackImage', null);
    }
  };

  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem className="space-y-3">
          <FormLabel className="flex items-center">
            <FileKey className="h-4 w-4 mr-2 text-primary" />
            Document Type
          </FormLabel>
          <Select onValueChange={handleDocumentTypeChange} value={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={DOCUMENT_TYPES.ID_CARD} className="flex items-center">
                {getDocumentTypeName(DOCUMENT_TYPES.ID_CARD)}
              </SelectItem>
              <SelectItem value={DOCUMENT_TYPES.PASSPORT}>
                {getDocumentTypeName(DOCUMENT_TYPES.PASSPORT)}
              </SelectItem>
              <SelectItem value={DOCUMENT_TYPES.DRIVER_LICENSE}>
                {getDocumentTypeName(DOCUMENT_TYPES.DRIVER_LICENSE)}
              </SelectItem>
            </SelectContent>
          </Select>
          <FormDescription className="flex items-start">
            <FileWarning className="h-4 w-4 mr-2 flex-shrink-0 text-amber-500" />
            <span>Select the type of identity document you will be uploading. Make sure your document is valid and not expired.</span>
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
