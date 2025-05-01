
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { getDocumentTypeLabel } from '@/utils/verification/index';

interface DocumentTypeSelectProps {
  form: any;
}

const DocumentTypeSelect: React.FC<DocumentTypeSelectProps> = ({ form }) => {
  // Document types available for verification
  const documentTypes = [
    'id_card',
    'passport',
    'drivers_license',
    'residence_permit'
  ];

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
            value={field.value}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select document type" />
            </SelectTrigger>
            <SelectContent>
              {documentTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {getDocumentTypeLabel(type)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription>
            Select the type of identification document you will upload
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentTypeSelect;
