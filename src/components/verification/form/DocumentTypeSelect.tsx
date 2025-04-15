
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DOCUMENT_TYPES } from '@/types/verification';
import { DOCUMENT_TYPE_LABELS, DOCUMENT_TYPE_REQUIREMENTS } from '@/types/verification';
import type { VerificationFormValues } from '@/types/verification';

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
                    {label as string}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription>
            {field.value && DOCUMENT_TYPE_REQUIREMENTS[field.value as keyof typeof DOCUMENT_TYPE_REQUIREMENTS]}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
