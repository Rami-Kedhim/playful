
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Escort } from '@/types/escort';
import { Check } from 'lucide-react';

interface EscortServicesProps {
  escort: Escort;
}

const EscortServices: React.FC<EscortServicesProps> = ({ escort }) => {
  const { services } = escort;
  
  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Services Offered</h3>
      
      {services && services.length > 0 ? (
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {services.map((service, index) => (
              <Badge key={index} variant="secondary" className="text-sm py-1.5">
                <Check className="h-3.5 w-3.5 mr-1 text-green-500" />
                {service}
              </Badge>
            ))}
          </div>
          
          <div className="mt-6 text-sm text-muted-foreground">
            <p>* Services may vary depending on availability and preferences.</p>
            <p>* Additional services may be available upon request.</p>
          </div>
        </div>
      ) : (
        <p className="text-muted-foreground">No service information provided.</p>
      )}
    </Card>
  );
};

export default EscortServices;
