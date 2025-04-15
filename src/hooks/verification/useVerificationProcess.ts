
import { useCallback, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from '@/hooks/use-toast'
import { VerificationFormValues } from '@/types/verification'

export const useVerificationProcess = () => {
  const [loading, setLoading] = useState(false)

  const submitVerification = useCallback(async (formData: VerificationFormValues) => {
    setLoading(true)
    
    try {
      // Upload the documents to storage
      const user = (await supabase.auth.getUser()).data.user
      if (!user) throw new Error('User not authenticated')

      const uploadFile = async (file: File, category: string) => {
        const timestamp = new Date().getTime()
        const filePath = `${user.id}/${category}_${timestamp}.${file.name.split('.').pop()}`
        
        const { error: uploadError } = await supabase.storage
          .from('verification-documents')
          .upload(filePath, file)
          
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('verification-documents')
          .getPublicUrl(filePath)
          
        return publicUrl
      }

      // Upload all documents
      const [frontUrl, backUrl, selfieUrl] = await Promise.all([
        uploadFile(formData.documentFrontImage.file!, 'front'),
        formData.documentBackImage?.file ? uploadFile(formData.documentBackImage.file, 'back') : null,
        uploadFile(formData.selfieImage.file!, 'selfie')
      ])

      // Create verification request
      const { error: verificationError } = await supabase
        .from('verification_requests')
        .insert({
          profile_id: user.id,
          documents: [
            { type: formData.documentType, category: 'front', fileUrl: frontUrl },
            ...(backUrl ? [{ type: formData.documentType, category: 'back', fileUrl: backUrl }] : []),
            { type: 'selfie', category: 'selfie', fileUrl: selfieUrl }
          ],
          status: 'pending',
          requested_level: 'basic'
        })

      if (verificationError) throw verificationError

      // Update profile to indicate verification was submitted
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          verification_submitted: true,
          last_verification_request: new Date().toISOString()
        })
        .eq('id', user.id)

      if (profileError) throw profileError

      toast({
        title: "Verification Submitted",
        description: "Your verification request has been submitted and is under review.",
      })

      return true
    } catch (error: any) {
      console.error('Error submitting verification:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit verification request",
        variant: "destructive"
      })
      return false
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    submitVerification,
    loading
  }
}
