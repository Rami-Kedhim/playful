
import React from 'react';
import { 
  Card, 
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UberPersona } from '@/types/uberPersona';
import { Calendar, DollarSign } from 'lucide-react';
import { normalizeUberPersona } from '@/utils/typeConverters';

interface PersonaBookingTabProps {
  persona: UberPersona;
  onBook?: () => void;
}

const PersonaBookingTab: React.FC<PersonaBookingTabProps> = ({ persona, onBook }) => {
  // Normalize persona to ensure all properties exist
  const normalizedPersona = normalizeUberPersona(persona);

  // Check if the persona has monetization options
  const hasMonetizationData = 
    normalizedPersona.monetization && 
    (normalizedPersona.monetization.hourlyRate > 0 || 
     normalizedPersona.monetization.minRate > 0 ||
     normalizedPersona.monetization.meetingPrice > 0);

  // Format currency display
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Book a Session</CardTitle>
          <CardDescription>
            Schedule time with {normalizedPersona.name}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {hasMonetizationData ? (
            <div className="space-y-4">
              {normalizedPersona.monetization.hourlyRate > 0 && (
                <div className="flex justify-between items-center">
                  <span>Hourly Rate</span>
                  <span className="font-bold">{formatCurrency(normalizedPersona.monetization.hourlyRate)}</span>
                </div>
              )}
              
              {normalizedPersona.monetization.minRate > 0 && normalizedPersona.monetization.maxRate > 0 && (
                <div className="flex justify-between items-center">
                  <span>Price Range</span>
                  <span className="font-bold">
                    {formatCurrency(normalizedPersona.monetization.minRate)} - {formatCurrency(normalizedPersona.monetization.maxRate)}
                  </span>
                </div>
              )}
              
              {normalizedPersona.monetization.meetingPrice > 0 && (
                <div className="flex justify-between items-center">
                  <span>Meeting Price</span>
                  <span className="font-bold">{formatCurrency(normalizedPersona.monetization.meetingPrice)}</span>
                </div>
              )}
              
              <div className="pt-4">
                <Button className="w-full" onClick={onBook}>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Now
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-4">
              <p className="text-muted-foreground">Pricing information not available.</p>
              <Button className="mt-4" onClick={onBook}>
                <Calendar className="mr-2 h-4 w-4" />
                Contact for Booking
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Service Packages</CardTitle>
          <CardDescription>
            Special packages and offerings
          </CardDescription>
        </CardHeader>
        <CardContent>
          {normalizedPersona.monetization?.packages && normalizedPersona.monetization.packages.length > 0 ? (
            <div className="space-y-4">
              {normalizedPersona.monetization.packages.map((pkg, index) => (
                <div key={pkg.id || index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{pkg.name}</h4>
                      <p className="text-sm text-muted-foreground">{pkg.description}</p>
                      <p className="text-xs mt-1">{pkg.duration}</p>
                    </div>
                    <div className="text-lg font-bold">{formatCurrency(pkg.price)}</div>
                  </div>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    <DollarSign className="mr-2 h-3 w-3" />
                    Select
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-muted-foreground">No service packages available.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaBookingTab;
