
import React, { useEffect, useState } from 'react';
import { orus } from '@/core/Orus';
import { Shield, AlertTriangle } from 'lucide-react';

interface SecureRouteWrapperProps {
  children: React.ReactNode;
  minimumSecurityLevel?: 'standard' | 'enhanced' | 'maximum';
}

const SecureRouteWrapper: React.FC<SecureRouteWrapperProps> = ({ 
  children, 
  minimumSecurityLevel = 'standard'
}) => {
  const [isSecure, setIsSecure] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [securityMessage, setSecurityMessage] = useState('Initializing security protocols...');

  useEffect(() => {
    const verifySecurityProtocols = async () => {
      try {
        // Check session security
        const token = localStorage.getItem('session_token') || '';
        const sessionSecurity = await orus.validateSession(token);
        
        // Check system integrity
        const integrityCheck = await orus.checkIntegrity();
        
        // Security level threshold determination
        let secure = false;
        
        if (minimumSecurityLevel === 'maximum') {
          secure = sessionSecurity.isValid && integrityCheck.valid && integrityCheck.integrity > 90;
          setSecurityMessage('Maximum security protocols active.');
        } else if (minimumSecurityLevel === 'enhanced') {
          secure = sessionSecurity.isValid && integrityCheck.valid && integrityCheck.integrity > 70;
          setSecurityMessage('Enhanced security protocols active.');
        } else {
          secure = sessionSecurity.isValid && integrityCheck.valid;
          setSecurityMessage('Standard security protocols active.');
        }
        
        setIsSecure(secure);
      } catch (error) {
        console.error('Security verification error:', error);
        setSecurityMessage('Security check failed. Proceeding with caution.');
        setIsSecure(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifySecurityProtocols();
  }, [minimumSecurityLevel]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 bg-muted/30 rounded-lg">
        <Shield className="h-5 w-5 text-primary animate-pulse mr-2" />
        <span>Verifying security protocols...</span>
      </div>
    );
  }

  return (
    <>
      {isSecure ? (
        <div>
          <div className="flex items-center text-xs text-green-500 my-2">
            <Shield className="h-3 w-3 mr-1" />
            <span>{securityMessage}</span>
          </div>
          {children}
        </div>
      ) : (
        <div>
          <div className="flex items-center text-xs text-amber-500 my-2">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Security protocols compromised. Proceed with caution.</span>
          </div>
          {children}
        </div>
      )}
    </>
  );
};

export default SecureRouteWrapper;
