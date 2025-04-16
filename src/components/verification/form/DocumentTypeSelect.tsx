
import React from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues, DOCUMENT_TYPES, DOCUMENT_TYPE_LABELS } from '@/types/verification';

interface DocumentTypeSelectProps {
  form: UseFormReturn<VerificationFormValues>;
  onTypeChange?: (type: string) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form, onTypeChange }) => {
  const documentOptions = [
    { value: DOCUMENT_TYPES.ID_CARD, label: DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.ID_CARD] },
    { value: DOCUMENT_TYPES.PASSPORT, label: DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.PASSPORT] },
    { value: DOCUMENT_TYPES.DRIVERS_LICENSE, label: DOCUMENT_TYPE_LABELS[DOCUMENT_TYPES.DRIVERS_LICENSE] }
  ];

  const handleTypeChange = (value: string) => {
    form.setValue('documentType', value);
    if (onTypeChange) {
      onTypeChange(value);
    }
  };

  return (
    <FormItem>
      <FormLabel>Document Type</FormLabel>
      <Select
        onValueChange={handleTypeChange}
        defaultValue={form.getValues('documentType')}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          <SelectGroup>
            {documentOptions.map(option => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default DocumentTypeSelect;
