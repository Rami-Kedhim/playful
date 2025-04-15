
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { verificationFormSchema, VerificationFormValues, DOCUMENT_TYPES } from '@/types/verification';
import ImageDropzone from '../utils/ImageDropzone';
import SubmitButton from './SubmitButton';

interface VerificationFormProps {
  onSubmit: (data: VerificationFormValues) => void;
  loading?: boolean;
  serviceType: 'escort' | 'creator' | 'livecam';
  onSubmissionComplete?: () => void;
}

const VerificationForm: React.FC<VerificationFormProps> = ({ 
  onSubmit, 
  loading = false,
  serviceType,
  onSubmissionComplete
}) => {
  const [documentType, setDocumentType] = useState<string>(DOCUMENT_TYPES.ID_CARD);
  
  const { control, handleSubmit, formState: { errors } } = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: DOCUMENT_TYPES.ID_CARD,
    }
  });
  
  const needsBackImage = documentType === DOCUMENT_TYPES.ID_CARD || 
                         documentType === DOCUMENT_TYPES.DRIVERS_LICENSE;
                         
  // Service-specific messages
  const getServiceSpecificMessage = () => {
    switch (serviceType) {
      case 'escort':
        return "For escort verification, please ensure your ID clearly shows your age as 18+ and matches your profile information.";
      case 'creator':
        return "Content creators must verify their identity to ensure compliance with content policies and age verification requirements.";
      case 'livecam':
        return "Livecam performers need to be verified to ensure they are eligible to perform on our platform.";
      default:
        return "Please upload your documents for verification.";
    }
  };

  const handleFormSubmit = async (data: VerificationFormValues) => {
    await onSubmit(data);
    if (onSubmissionComplete) {
      onSubmissionComplete();
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="text-sm text-muted-foreground mb-6">
        {getServiceSpecificMessage()}
      </div>
      
      <div className="space-y-4">
        <div>
          <Label>Document Type</Label>
          <Controller
            name="documentType"
            control={control}
            render={({ field }) => (
              <RadioGroup 
                value={field.value} 
                onValueChange={(value) => {
                  field.onChange(value);
                  setDocumentType(value);
                }}
                className="flex flex-col space-y-1 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={DOCUMENT_TYPES.ID_CARD} id="id_card" />
                  <Label htmlFor="id_card">ID Card</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={DOCUMENT_TYPES.PASSPORT} id="passport" />
                  <Label htmlFor="passport">Passport</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value={DOCUMENT_TYPES.DRIVERS_LICENSE} id="drivers_license" />
                  <Label htmlFor="drivers_license">Driver's License</Label>
                </div>
              </RadioGroup>
            )}
          />
          {errors.documentType && (
            <p className="text-red-500 text-xs mt-1">{errors.documentType.message}</p>
          )}
        </div>
        
        <Card>
          <CardContent className="pt-6">
            <Label>Front Image of Document</Label>
            <Controller
              name="documentFrontImage"
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  onFileSelect={(file) => field.onChange(file)}
                  currentFile={field.value}
                  label="Drop front image here or click to browse"
                  maxSize={5}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                  className="mt-2"
                />
              )}
            />
            {errors.documentFrontImage && (
              <p className="text-red-500 text-xs mt-1">{errors.documentFrontImage.message}</p>
            )}
          </CardContent>
        </Card>
        
        {needsBackImage && (
          <Card>
            <CardContent className="pt-6">
              <Label>Back Image of Document</Label>
              <Controller
                name="documentBackImage"
                control={control}
                render={({ field }) => (
                  <ImageDropzone
                    onFileSelect={(file) => field.onChange(file)}
                    currentFile={field.value}
                    label="Drop back image here or click to browse"
                    maxSize={5}
                    acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                    className="mt-2"
                  />
                )}
              />
              {errors.documentBackImage && (
                <p className="text-red-500 text-xs mt-1">{errors.documentBackImage.message}</p>
              )}
            </CardContent>
          </Card>
        )}
        
        <Card>
          <CardContent className="pt-6">
            <Label>Selfie with Document</Label>
            <div className="text-xs text-muted-foreground mb-2">
              Please take a photo holding your ID next to your face
            </div>
            <Controller
              name="selfieImage"
              control={control}
              render={({ field }) => (
                <ImageDropzone
                  onFileSelect={(file) => field.onChange(file)}
                  currentFile={field.value}
                  label="Drop selfie image here or click to browse"
                  maxSize={5}
                  acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                />
              )}
            />
            {errors.selfieImage && (
              <p className="text-red-500 text-xs mt-1">{errors.selfieImage.message}</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end">
        <SubmitButton 
          loading={loading} 
          loadingText="Submitting verification..." 
          text="Submit Verification" 
        />
      </div>
    </form>
  );
};

export default VerificationForm;
