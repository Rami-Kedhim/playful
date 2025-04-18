
import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface VerificationStatusTabProps {
  status: {
    email: boolean;
    phone: boolean;
    identity: boolean;
    address: boolean;
    background: boolean;
  };
  currentLevel: 'basic' | 'advanced' | 'premium';
}

const VerificationStatusTab: React.FC<VerificationStatusTabProps> = ({ status, currentLevel }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium mb-2">Current Verification Level</h3>
        <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
          {currentLevel}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Verification Status</h3>
        <ul className="space-y-2">
          <li className="flex items-center">
            {status.email ? 
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
            }
            <span>Email Verification</span>
          </li>
          <li className="flex items-center">
            {status.phone ? 
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
            }
            <span>Phone Verification</span>
          </li>
          <li className="flex items-center">
            {status.identity ? 
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
            }
            <span>ID Verification</span>
          </li>
          <li className="flex items-center">
            {status.address ? 
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
            }
            <span>Address Verification</span>
          </li>
          <li className="flex items-center">
            {status.background ? 
              <CheckCircle className="h-5 w-5 text-green-500 mr-2" /> : 
              <XCircle className="h-5 w-5 text-red-500 mr-2" />
            }
            <span>Background Check</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VerificationStatusTab;
