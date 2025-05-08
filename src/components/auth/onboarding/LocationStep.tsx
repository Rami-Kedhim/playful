
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Globe } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { freeMapService } from '@/services/maps/FreeMapService';

interface LocationStepProps {
  onNext: (data: any) => void;
  userRole: string;
}

export const LocationStep: React.FC<LocationStepProps> = ({ onNext, userRole }) => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('United States');
  const [travelAvailable, setTravelAvailable] = useState(false);
  const [serviceAreas, setServiceAreas] = useState<string[]>([]);
  const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null);
  
  // Mock list of states - would be expanded in real implementation
  const states = ['California', 'New York', 'Florida', 'Texas', 'Nevada', 'Illinois'];
  
  const handleContinue = async () => {
    // Try to geocode the location for better data
    try {
      const locationString = `${city}, ${state}, ${country}`;
      const geocodeResult = await freeMapService.geocode(locationString);
      
      onNext({
        location: locationString,
        travelAvailable,
        serviceAreas,
        coordinates: geocodeResult ? { 
          lat: geocodeResult.lat, 
          lng: geocodeResult.lng 
        } : null
      });
    } catch (error) {
      console.error("Geocoding failed:", error);
      // Fall back to just the text location if geocoding fails
      onNext({
        location: `${city}, ${state}, ${country}`,
        travelAvailable,
        serviceAreas,
        coordinates: null
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <MapPin className="h-4 w-4" />
        <span>Your location is only shared as specified in your privacy settings</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State</Label>
          <Select value={state} onValueChange={setState}>
            <SelectTrigger id="state">
              <SelectValue placeholder="Select your state" />
            </SelectTrigger>
            <SelectContent>
              {states.map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger id="country">
              <SelectValue placeholder="Select your country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="United States">United States</SelectItem>
              <SelectItem value="Canada">Canada</SelectItem>
              <SelectItem value="United Kingdom">United Kingdom</SelectItem>
              <SelectItem value="Australia">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {userRole === 'escort' && (
          <>
            <div className="flex items-start space-x-2 rounded-md border p-3">
              <Checkbox 
                id="travel" 
                checked={travelAvailable} 
                onCheckedChange={(checked) => setTravelAvailable(checked === true)} 
              />
              <div>
                <div className="flex items-center">
                  <Label htmlFor="travel" className="text-sm font-medium cursor-pointer">Available for travel</Label>
                  <Globe className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">I provide outcall services and can travel to clients</p>
              </div>
            </div>
          </>
        )}
      </div>

      <Button className="w-full" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};
