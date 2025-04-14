import React, { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useAuth } from '@/hooks/auth/useAuth';
import { canSubmitVerification, submitVerificationRequest } from '@/utils/verification';
import { verificationFormSchema, VerificationFormValues } from './utils/formUtils';
import DocumentTypeSelect from './form/DocumentTypeSelect';
import DocumentImageUpload from './form/DocumentImageUpload';
import SubmitButton from './form/SubmitButton';
import SubmissionAlert from './form/SubmissionAlert';
import SuccessCard from './form/SuccessCard';

const VerificationForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [canSubmit, setCanSubmit] = useState(true);
  const [submitMessage, setSubmitMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const form = useForm<VerificationFormValues>({
    resolver: zodResolver(verificationFormSchema),
    defaultValues: {
      documentType: 'id_card',
      documentFrontImage: undefined,
      documentBackImage: undefined,
      selfieImage: undefined,
    },
  });

  useEffect(() => {
    if (user) {
      const checkSubmitEligibility = async () => {
        const result = await canSubmitVerification(user.id);
        setCanSubmit(result.canSubmit);
        
        if (!result.canSubmit) {
          setSubmitMessage({
            success: false,
            message: result.reason || "You cannot submit a verification request at this time"
          });
        }
      };
      
      checkSubmitEligibility();
    }
  }, [user]);

  const onSubmit = async (data: VerificationFormValues) => {
    if (!user) return;
    
    setLoading(true);
    
    try {
      const result = await submitVerificationRequest(
        user.id,
        data.documentType,
        data.documentFrontImage.file,
        data.documentBackImage?.file || null,
        data.selfieImage.file
      );
      
      setSubmitMessage({
        success: result.success,
        message: result.message
      });
      
      if (result.success) {
        setSubmitted(true);
        form.reset();
      }
    } catch (error) {
      console.error("Verification submission error:", error);
      setSubmitMessage({
        success: false,
        message: "An unexpected error occurred. Please try again later."
      });
    } finally {
      setLoading(false);
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
          To ensure platform safety, we require identity verification for all users offering services.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!canSubmit && submitMessage && (
          <SubmissionAlert 
            type="error" 
            title="Cannot Submit" 
            message={submitMessage.message} 
          />
        )}

        {submitMessage && submitMessage.success === false && canSubmit && (
          <SubmissionAlert 
            type="error" 
            message={submitMessage.message} 
          />
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <DocumentTypeSelect form={form} />

            <DocumentImageUpload
              form={form}
              fieldName="documentFrontImage"
              label="Front of ID Document"
              description="Upload a clear photo of the front of your ID document. Max 5MB."
            />

            <DocumentImageUpload
              form={form}
              fieldName="documentBackImage"
              label="Back of ID Document (Optional for Passport)"
              description="Upload a clear photo of the back of your ID document. Required for ID cards and driver's licenses."
              optional={true}
            />

            <DocumentImageUpload
              form={form}
              fieldName="selfieImage"
              label="Selfie with ID"
              description="Upload a selfie of yourself holding your ID document next to your face. Your face and the ID must be clearly visible."
            />

            <SubmitButton loading={loading} disabled={!canSubmit} />
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <p className="text-sm text-gray-500">
          Your verification information is encrypted and only used for identity verification purposes.
          We follow strict privacy guidelines and never share your personal information.
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerificationForm;
