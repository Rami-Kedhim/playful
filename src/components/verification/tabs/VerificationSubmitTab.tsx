
import React from 'react'
import { useVerificationProcess } from '@/hooks/verification/useVerificationProcess'
import VerificationForm from '../VerificationForm'

interface VerificationSubmitTabProps {
  onSubmit?: (data: any) => void
  onComplete: () => void
}

const VerificationSubmitTab: React.FC<VerificationSubmitTabProps> = ({
  onSubmit,
  onComplete
}) => {
  const { submitVerification, loading } = useVerificationProcess()

  const handleSubmit = async (data: any) => {
    const success = await submitVerification(data)
    if (success) {
      onComplete()
    }
    if (onSubmit) {
      onSubmit(data)
    }
  }

  return (
    <VerificationForm 
      onSubmissionComplete={onComplete}
      serviceType="escort"
      loading={loading}
      onSubmit={handleSubmit}
    />
  )
}

export default VerificationSubmitTab
