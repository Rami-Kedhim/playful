
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2, Upload, Shield, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { submitVerificationRequest, canSubmitVerification } from '@/utils/verificationSystem';
import { useAuth } from '@/hooks/auth/useAuth';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const verificationFormSchema = z.object({
  documentType: z.enum(['passport', 'id_card', 'driver_license', 'other']),
  documentFrontImage: z
    .any()
    .refine((file) => file instanceof File, 'Front image is required')
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png and .webp formats are supported'
    ),
  documentBackImage: z
    .any()
    .optional()
    .nullable()
    .refine(
      (file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE),
      'Max file size is 5MB'
    )
    .refine(
      (file) => !file || (file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Only .jpg, .png and .webp formats are supported'
    ),
  selfieImage: z
    .any()
    .refine((file) => file instanceof File, 'Selfie image is required')
    .refine((file) => file instanceof File && file.size <= MAX_FILE_SIZE, 'Max file size is 5MB')
    .refine(
      (file) => file instanceof File && ACCEPTED_IMAGE_TYPES.includes(file.type),
      'Only .jpg, .png and .webp formats are supported'
    ),
});

type VerificationFormValues = z.infer<typeof verificationFormSchema>;

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
      documentFrontImage: null,
      documentBackImage: null,
      selfieImage: null,
    },
  });

  React.useEffect(() => {
    if (user) {
      // Check if user can submit verification
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
        data.documentFrontImage,
        data.documentBackImage,
        data.selfieImage
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: any) => {
    if (e.target.files && e.target.files[0]) {
      field.onChange(e.target.files[0]);
    }
  };

  if (submitted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-green-600">Verification Submitted!</CardTitle>
          <CardDescription className="text-center">
            Your verification request has been submitted and is now pending review.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Shield className="h-16 w-16 text-green-500" />
        </CardContent>
        <CardFooter>
          <p className="text-center w-full text-gray-600">
            We'll review your documents within 24-48 hours. You'll be notified when your verification status changes.
          </p>
        </CardFooter>
      </Card>
    );
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
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Cannot Submit</AlertTitle>
            <AlertDescription>{submitMessage.message}</AlertDescription>
          </Alert>
        )}

        {submitMessage && submitMessage.success === false && canSubmit && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Submission Error</AlertTitle>
            <AlertDescription>{submitMessage.message}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select document type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="id_card">ID Card</SelectItem>
                      <SelectItem value="driver_license">Driver's License</SelectItem>
                      <SelectItem value="other">Other Government ID</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the type of identity document you will be uploading.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentFrontImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Front of ID Document</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleFileChange(e, field)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary"
                      />
                      {field.value && (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          <img
                            src={field.value instanceof File ? URL.createObjectURL(field.value) : ""}
                            alt="Document front preview"
                            className="object-cover h-full w-full"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a clear photo of the front of your ID document. Max 5MB.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="documentBackImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Back of ID Document (Optional for Passport)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleFileChange(e, field)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary"
                      />
                      {field.value && (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          <img
                            src={field.value instanceof File ? URL.createObjectURL(field.value) : ""}
                            alt="Document back preview"
                            className="object-cover h-full w-full"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a clear photo of the back of your ID document. Required for ID cards and driver's licenses.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selfieImage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selfie with ID</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-4">
                      <Input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        onChange={(e) => handleFileChange(e, field)}
                        className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-primary/10 file:text-primary"
                      />
                      {field.value && (
                        <div className="h-10 w-10 rounded-md bg-muted flex items-center justify-center overflow-hidden">
                          <img
                            src={field.value instanceof File ? URL.createObjectURL(field.value) : ""}
                            alt="Selfie preview"
                            className="object-cover h-full w-full"
                          />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>
                    Upload a selfie of yourself holding your ID document next to your face. Your face and the ID must be clearly visible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading || !canSubmit}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Verification
                </>
              )}
            </Button>
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
