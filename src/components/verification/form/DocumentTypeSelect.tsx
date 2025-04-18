
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';
import { ID_CARD, PASSPORT, DRIVER_LICENSE, RESIDENCE_PERMIT, DOCUMENT_TYPES } from '@/types/verification';

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
              <SelectItem value={ID_CARD}>ID Card</SelectItem>
              <SelectItem value={PASSPORT}>Passport</SelectItem>
              <SelectItem value={DRIVER_LICENSE}>Driver's License</SelectItem>
              <SelectItem value={RESIDENCE_PERMIT}>Residence Permit</SelectItem>
            </SelectContent>
          </Select>
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
