
// Fix import of DocumentType from '@/types/verification' if not exported, fallback to string literal type
// If necessary, can define the DocumentType locally as string union
// Use safe checks on typing

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
// If DocumentType missing, fallback to inline definition
type DocumentType = 'id_card' | 'passport' | 'drivers_license';

import { Upload, X } from 'lucide-react';

interface DocumentUploaderProps {
  userId: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ userId }) => {
  const [documentType, setDocumentType] = useState<DocumentType>('id_card');
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [selfieImage, setSelfieImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    console.log('Submitting documents:', {
      userId,
      documentType,
      frontImage,
      backImage,
      selfieImage
    });

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Verification documents submitted successfully!');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="document-type">Document Type</Label>
        <Select 
          value={documentType} 
          onValueChange={(value) => setDocumentType(value as DocumentType)}
        >
          <SelectTrigger id="document-type">
            <SelectValue placeholder="Select document type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="id_card">ID Card</SelectItem>
            <SelectItem value="passport">Passport</SelectItem>
            <SelectItem value="drivers_license">Driver's License</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-32 w-full bg-muted rounded-md flex items-center justify-center">
                {frontImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(frontImage)} 
                      alt="Front of document" 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setFrontImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer p-4">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">Front of ID</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && setFrontImage(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                Front side of your document
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-32 w-full bg-muted rounded-md flex items-center justify-center">
                {backImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(backImage)} 
                      alt="Back of document" 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setBackImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer p-4">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">Back of ID</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && setBackImage(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                Back side of your document
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="h-32 w-full bg-muted rounded-md flex items-center justify-center">
                {selfieImage ? (
                  <div className="relative w-full h-full">
                    <img 
                      src={URL.createObjectURL(selfieImage)} 
                      alt="Selfie with ID" 
                      className="w-full h-full object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6"
                      onClick={() => setSelfieImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center cursor-pointer p-4">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm font-medium">Selfie with ID</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => e.target.files && setSelfieImage(e.target.files[0])}
                    />
                  </label>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                Selfie holding your document
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={!frontImage || !selfieImage || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Documents'}
        </Button>
      </div>
    </form>
  );
};

export default DocumentUploader;
