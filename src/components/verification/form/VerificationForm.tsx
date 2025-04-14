
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import DocumentTypeSelect from './DocumentTypeSelect';
import DocumentImageUpload from './DocumentImageUpload';
import SubmitButton from './SubmitButton';
import SubmissionAlert from './SubmissionAlert';
import SuccessCard from './SuccessCard';
import { verificationFormSchema, VerificationFormValues, DOCUMENT_TYPES } from '../utils/formUtils';
import { useVerification, VerificationDocument } from '@/hooks/verification/useVerification';
import { Shield, FileX, AlertTriangle, MoveRight } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

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
      documentType: DOCUMENT_TYPES.ID_CARD,
      documentFrontImage: null,
      documentBackImage: null,
      selfieImage: null
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
    <Card className="border-muted shadow">
      <CardHeader className="bg-muted/30">
        <CardTitle className="flex items-center text-xl">
          <Shield className="h-5 w-5 mr-2 text-primary" />
          Identity Verification
        </CardTitle>
        <CardDescription>
          Please upload clear photos of your government-issued ID and a selfie for verification
        </CardDescription>
      </CardHeader>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="space-y-6 pt-6">
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

            <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3 flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
              <div className="space-y-1">
                <h4 className="font-medium text-sm">Important verification information</h4>
                <p className="text-xs text-muted-foreground">
                  Make sure all documents are valid, unexpired, and clearly visible. Photos must not be blurry or cropped.
                </p>
              </div>
            </div>

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
            
            <div className="rounded-md border p-4">
              <h4 className="text-sm font-medium mb-2 flex items-center">
                <FileX className="h-4 w-4 mr-2 text-muted-foreground" /> 
                Common reasons for rejection
              </h4>
              <ScrollArea className="h-24 rounded-md">
                <ul className="text-xs space-y-2 text-muted-foreground pr-4">
                  <li className="flex gap-2">
                    <MoveRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Document is blurry, cropped, or partially visible</span>
                  </li>
                  <li className="flex gap-2">
                    <MoveRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Document is expired or information is not readable</span>
                  </li>
                  <li className="flex gap-2">
                    <MoveRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Selfie does not clearly show both your face and ID</span>
                  </li>
                  <li className="flex gap-2">
                    <MoveRight className="h-3.5 w-3.5 text-muted-foreground" />
                    <span>Images show signs of digital manipulation</span>
                  </li>
                </ul>
              </ScrollArea>
            </div>
          </CardContent>
          
          <Separator />
          
          <CardFooter className="flex flex-col pt-4">
            <SubmitButton 
              loading={isSubmitting} 
              loadingText={verificationStatus === 'uploading' ? 'Uploading...' : 'Processing...'}
              text="Submit for Verification"
              variant="default"
            />
            <p className="text-xs text-center text-muted-foreground mt-3">
              By submitting, you agree to our verification process and privacy policy
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default VerificationForm;
