
import React, { useRef, useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { VerificationFormValues } from '@/types/verification';
import { FileUp, X, Image } from 'lucide-react';

interface DocumentImageUploadProps {
  form: UseFormReturn<VerificationFormValues>;
  fieldName: 'documentFrontImage' | 'documentBackImage' | 'selfieImage';
  label: string;
  description: string;
  optional?: boolean;
}

const DocumentImageUpload: React.FC<DocumentImageUploadProps> = ({
  form,
  fieldName,
  label,
  description,
  optional = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      form.setValue(fieldName, {
        file,
        preview: reader.result as string
      }, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      form.setValue(fieldName, {
        file,
        preview: reader.result as string
      }, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };
  
  const resetFile = () => {
    form.setValue(fieldName, { preview: '' }, { shouldValidate: true });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <FormField
      control={form.control}
      name={fieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label} {optional && <span className="text-muted-foreground text-xs">(Optional)</span>}</FormLabel>
          <FormControl>
            <>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              {field.value?.preview ? (
                <Card className="overflow-hidden relative">
                  <img
                    src={field.value.preview}
                    alt={label}
                    className="w-full h-auto max-h-40 object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 h-6 w-6"
                    onClick={resetFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </Card>
              ) : (
                <div
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isDragging ? 'border-primary bg-primary/5' : 'border-gray-300 hover:border-primary/50'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {isDragging ? (
                    <Image className="h-8 w-8 text-primary mb-2" />
                  ) : (
                    <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  )}
                  <p className="text-sm font-medium text-center">
                    {isDragging ? 'Drop to upload' : 'Click to upload or drag and drop'}
                  </p>
                  <p className="text-xs text-muted-foreground text-center mt-1">
                    {description}
                  </p>
                </div>
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DocumentImageUpload;
