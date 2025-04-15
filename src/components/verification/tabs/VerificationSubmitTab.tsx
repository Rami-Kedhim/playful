
import React from 'react'
import VerificationForm from '../form/VerificationForm'
import { useVerificationProcess } from '@/hooks/verification/useVerificationProcess'

interface VerificationSubmitTabProps {
  onSubmit: (data: any) => void
  onComplete: () => void
}

const VerificationSubmitTab: React.FC<VerificationSubmitTabProps> = ({
  onComplete
}) => {
  const { submitVerification, loading } = useVerificationProcess()

  const handleSubmit = async (data: any) => {
    const success = await submitVerification(data)
    if (success) {
      onComplete()
    }
  }

  return (
    <VerificationForm 
      onSubmit={handleSubmit} 
      loading={loading}
      serviceType="escort"
      onSubmissionComplete={onComplete} 
    />
  )
}

export default VerificationSubmitTab
