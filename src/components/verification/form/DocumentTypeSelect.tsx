
import React from 'react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';

export interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
  onTypeChange?: (type: string) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({
  form,
  onTypeChange = () => {}
}) => {
  const documentTypes = [
    { value: 'passport', label: 'Passport' },
    { value: 'drivers_license', label: 'Driver\'s License' },
    { value: 'id_card', label: 'Government ID Card' },
    { value: 'residence_permit', label: 'Residence Permit' }
  ];

  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onTypeChange(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
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
