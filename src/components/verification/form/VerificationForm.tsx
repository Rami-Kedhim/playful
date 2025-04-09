
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
// Fix imports to use default imports instead of named imports
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentImageUpload from './DocumentImageUpload';
import SubmitButton from './SubmitButton';
import SubmissionAlert from './SubmissionAlert';
import { verificationFormSchema, VerificationFormValues } from '../utils/formUtils';

const VerificationForm = ({ onSubmitSuccess }: { onSubmitSuccess: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  
  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: 'id_card',
    },
  });
  
  const onSubmit = async (data: VerificationFormValues) => {
    setIsSubmitting(true);
    setSubmissionError(null);
    
    try {
      // This would normally send the data to your backend
      // Mock submission delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted with data:", data);
      
      toast({
        title: "Verification submitted",
        description: "Your documents have been submitted for verification.",
        variant: "default",
      });
      
      onSubmitSuccess();
    } catch (error) {
      console.error("Verification submission error:", error);
      setSubmissionError("Failed to submit verification. Please try again.");
      
      toast({
        title: "Submission failed",
        description: "There was an error submitting your verification documents.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
              label="Back of ID (Optional)"
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
            <SubmitButton loading={isSubmitting} />
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default VerificationForm;
