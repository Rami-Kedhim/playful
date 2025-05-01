
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getDocumentTypeLabel, documentTypeOptions } from '../utils/documentTypeHelper';

interface DocumentTypeSelectProps {
  form: any;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      rules={{ required: "Document type is required" }}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {documentTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Choose the type of identification document you wish to submit
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
