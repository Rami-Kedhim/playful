
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDocumentTypeLabel } from '@/utils/verification';
import { documentTypeOptions } from '../utils/documentTypeHelper';

interface DocumentTypeSelectProps {
  form: any;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      rules={{ required: "Please select a document type" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {documentTypeOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {getDocumentTypeLabel(option)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
