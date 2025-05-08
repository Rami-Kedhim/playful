
import React from 'react';
import { Escort } from '@/types/Escort';
import { Check, X } from 'lucide-react';

interface ServicesTabProps {
  escort: Escort;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ escort }) => {
  const services = escort.services || [];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Services Offered</h3>
        
        {services.length === 0 ? (
          <p className="text-muted-foreground">No services information available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>{service}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {escort.specialties && escort.specialties.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Specialties</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {escort.specialties.map((specialty, index) => (
              <div key={index} className="flex items-center">
                <Check className="h-4 w-4 text-primary mr-2" />
                <span>{specialty}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {escort.limitations && escort.limitations.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Not Offered</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {escort.limitations.map((limitation, index) => (
              <div key={index} className="flex items-center">
                <X className="h-4 w-4 text-destructive mr-2" />
                <span>{limitation}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesTab;
