
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DocumentType } from '@/types/verification';
import { UseFormReturn } from 'react-hook-form';
import { toDocumentType } from '../utils/documentTypeHelper';

// Define document types for the component
const DOCUMENT_TYPES = [
  { value: 'id_card', label: 'ID Card' },
  { value: 'passport', label: 'Passport' },
  { value: 'drivers_license', label: "Driver's License" }
];

interface DocumentTypeSelectProps {
  form: UseFormReturn<any>;
  onTypeChange?: (type: DocumentType) => void;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form, onTypeChange }) => {
  return (
    <FormField
      control={form.control}
      name="documentType"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Document Type</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              if (onTypeChange) {
                // Use the helper to safely convert string to DocumentType
                onTypeChange(toDocumentType(value));
              }
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select ID type" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {DOCUMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
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
