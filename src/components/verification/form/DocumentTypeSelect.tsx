
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { documentTypeOptions } from '../utils/documentTypeHelper';

interface DocumentTypeSelectProps {
  form: any;
  onTypeChange: (value: string) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form, onTypeChange }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>ID Document Type</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onTypeChange(value);
              }}
              value={field.value}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select ID document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
