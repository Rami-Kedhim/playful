
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { DocumentType } from '@/types/verification';

interface DocumentTypeSelectProps {
  form: UseFormReturn<any>;
  onTypeChange: (type: DocumentType) => void;
}

const DocumentTypeSelect = ({ form, onTypeChange }: DocumentTypeSelectProps) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select onValueChange={(value) => {
            field.onChange(value);
            onTypeChange(value as DocumentType);
          }} defaultValue={field.value}>
            <SelectTrigger>
              <SelectValue placeholder="Select a document type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="id_card">Government ID Card</SelectItem>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="drivers_license">Driver's License</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
