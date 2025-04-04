
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
          <FormLabel>Document Type</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="passport">Passport</SelectItem>
              <SelectItem value="id_card">ID Card</SelectItem>
              <SelectItem value="driver_license">Driver's License</SelectItem>
              <SelectItem value="other">Other Government ID</SelectItem>
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
