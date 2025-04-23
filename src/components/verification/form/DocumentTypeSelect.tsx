
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { DocumentType } from '@/types/verification';

interface DocumentTypeSelectProps {
  form: UseFormReturn<any>;
  onTypeChange?: (type: DocumentType) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ 
  form,
  onTypeChange
}) => {
  const handleChange = (value: string) => {
    form.setValue('documentType', value);
    if (onTypeChange) {
      onTypeChange(value as DocumentType);
    }
  };

  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Identification Document Type</FormLabel>
          <FormControl>
            <Select 
              defaultValue={field.value} 
              onValueChange={(value) => {
                field.onChange(value);
                handleChange(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="id_card">National ID Card</SelectItem>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="drivers_license">Driver's License</SelectItem>
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
