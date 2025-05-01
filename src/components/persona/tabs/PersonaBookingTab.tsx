
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UberPersona } from '@/types/uberPersona';
import { useToast } from '@/hooks/use-toast';
import { Calendar, Clock, DollarSign } from 'lucide-react';

interface PersonaBookingTabProps {
  persona: UberPersona;
}

const PersonaBookingTab: React.FC<PersonaBookingTabProps> = ({ persona }) => {
  const { toast } = useToast();
  
  // Check if monetization data exists
  const hasMonetization = persona.monetization !== undefined;
  const hasMonetizationPackages = hasMonetization && persona.monetization?.packages && persona.monetization.packages.length > 0;
  
  const handleBooking = (packageId?: string) => {
    toast({
      title: 'Booking Started',
      description: packageId 
        ? `You've selected the ${persona.monetization?.packages?.find(p => p.id === packageId)?.name} package` 
        : 'Starting standard booking process',
    });
  };

  if (!hasMonetization) {
    return (
      <Card className="mt-4">
        <CardContent className="pt-6">
          <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-2">No Booking Information</h3>
            <p className="text-muted-foreground">
              This profile doesn't have any booking information available.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Standard Rate Card */}
      {persona.monetization?.hourlyRate && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Standard Session</h3>
              <span className="text-2xl font-bold">
                ${persona.monetization.hourlyRate}/hr
              </span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground mb-4">
              <Clock className="h-4 w-4 mr-2" />
              <span>60 minutes</span>
            </div>
            <Button className="w-full" onClick={() => handleBooking()}>
              Book Now
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Packages */}
      {hasMonetizationPackages && (
        <>
          <h3 className="text-xl font-medium mt-6">Available Packages</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {persona.monetization?.packages?.map((pkg) => (
              <Card key={pkg.id}>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">{pkg.name}</h3>
                    <span className="text-2xl font-bold">${pkg.price}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{pkg.duration}</span>
                  </div>
                  {pkg.description && (
                    <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  )}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => handleBooking(pkg.id)}
                  >
                    Select Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}

      {/* Availability Card */}
      <Card className="mt-4">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Check Availability</h3>
          <Button className="w-full" variant="secondary">
            <Calendar className="h-4 w-4 mr-2" />
            View Calendar
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaBookingTab;
