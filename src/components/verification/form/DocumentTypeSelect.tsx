
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_REQUIREMENTS } from '../utils/formUtils';
import { VerificationFormValues } from '../utils/formUtils';

interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <FormControl>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ID document type" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            {DOCUMENT_TYPE_REQUIREMENTS[field.value]}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
