
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues, DOCUMENT_TYPES } from '@/types/verification';

interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
  onTypeChange?: (type: string) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form, onTypeChange }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select 
            onValueChange={(value) => {
              field.onChange(value);
              if (onTypeChange) onTypeChange(value);
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value={DOCUMENT_TYPES.ID_CARD}>ID Card</SelectItem>
              <SelectItem value={DOCUMENT_TYPES.PASSPORT}>Passport</SelectItem>
              <SelectItem value={DOCUMENT_TYPES.DRIVERS_LICENSE}>Driver's License</SelectItem>
              <SelectItem value={DOCUMENT_TYPES.RESIDENCE_PERMIT}>Residence Permit</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
