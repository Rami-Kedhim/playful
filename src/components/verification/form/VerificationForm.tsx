
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentImageUpload from './DocumentImageUpload';
import SubmitButton from './SubmitButton';
import SubmissionAlert from './SubmissionAlert';
import SuccessCard from './SuccessCard';
import { verificationFormSchema, VerificationFormValues } from '../utils/formUtils';
import { useVerification, VerificationDocument } from '@/hooks/verification/useVerification';

interface VerificationFormProps {
  onSubmissionComplete?: () => void;
}

const VerificationForm = ({ onSubmissionComplete }: VerificationFormProps) => {
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  
  const { submitVerification, isSubmitting, verificationStatus } = useVerification();
  
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: 'id_card',
    },
  });
  
  const onSubmit = async (data: VerificationFormValues) => {
    setSubmissionError(null);
    
    try {
      // Convert form data to VerificationDocument format
      const document: VerificationDocument = {
        type: data.documentType,
        frontImage: data.documentFrontImage as File,
        backImage: data.documentBackImage as File | undefined,
        selfieImage: data.selfieImage as File
      };
      
      // Submit verification using our hook
      const success = await submitVerification(document);
      
      if (success) {
        setSubmitted(true);
        
        if (onSubmissionComplete) {
          onSubmissionComplete();
        }
      }
    } catch (error) {
      console.error("Verification submission error:", error);
      setSubmissionError("Failed to submit verification. Please try again.");
    }
  };
  
  if (submitted) {
    return <SuccessCard />;
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification</CardTitle>
        <CardDescription>
          Please upload clear photos of your government-issued ID and a selfie
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            {submissionError && (
              <SubmissionAlert 
                type="error" 
                message={submissionError} 
              />
            )}
            
            {verificationStatus === 'error' && (
              <SubmissionAlert 
                type="error" 
                message="There was an error processing your documents. Please try again." 
              />
            )}
            
            <DocumentTypeSelect form={form} />
            
            <DocumentImageUpload 
              form={form} 
              fieldName="documentFrontImage"
              label="Front of ID"
              description="Upload a clear photo of the front of your ID"
            />
            
            <DocumentImageUpload 
              form={form} 
              fieldName="documentBackImage"
              label="Back of ID (Optional for Passport)"
              description="Upload a clear photo of the back of your ID if applicable"
              optional
            />
            
            <DocumentImageUpload 
              form={form} 
              fieldName="selfieImage"
              label="Selfie with ID"
              description="Take a selfie holding your ID next to your face"
            />
          </CardContent>
          
          <CardFooter>
            <SubmitButton 
              loading={isSubmitting} 
              loadingText={verificationStatus === 'uploading' ? 'Uploading...' : 'Processing...'}
            />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default VerificationForm;
