
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from "@/components/ui/slider";
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from 'lucide-react';

interface PreferencesStepProps {
  onNext: (data: any) => void;
  userRole: string;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ onNext, userRole }) => {
  const [ageRange, setAgeRange] = useState<[number, number]>([21, 45]);
  const [genderPreferences, setGenderPreferences] = useState<string[]>([]);
  const [servicePreferences, setServicePreferences] = useState<string[]>([]);
  
  // Mock data for preferences
  const genderOptions = ['Female', 'Male', 'Trans', 'Non-binary'];
  const serviceOptions = userRole === 'client' 
    ? ['Companionship', 'Dating', 'Events', 'Travel Companion', 'Virtual Services', 'Massage']
    : ['Companionship', 'Dating', 'Events', 'Travel Companion', 'Virtual Services', 'Massage'];
  
  const toggleGender = (gender: string) => {
    if (genderPreferences.includes(gender)) {
      setGenderPreferences(genderPreferences.filter(g => g !== gender));
    } else {
      setGenderPreferences([...genderPreferences, gender]);
    }
  };
  
  const toggleService = (service: string) => {
    if (servicePreferences.includes(service)) {
      setServicePreferences(servicePreferences.filter(s => s !== service));
    } else {
      setServicePreferences([...servicePreferences, service]);
    }
  };

  const handleContinue = () => {
    onNext({
      preferences: {
        ageRange,
        genderPreferences,
        servicePreferences
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Settings className="h-4 w-4" />
        <span>Set your preferences to personalize your experience</span>
      </div>

      {userRole === 'client' && (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Age Range Preference</Label>
            <div className="flex justify-between mb-2">
              <span className="text-sm">{ageRange[0]}</span>
              <span className="text-sm">{ageRange[1]}</span>
            </div>
            <Slider
              defaultValue={ageRange}
              min={21}
              max={65}
              step={1}
              onValueChange={(value) => setAgeRange(value as [number, number])}
            />
          </div>

          <div className="space-y-2">
            <Label>Gender Preference</Label>
            <div className="flex flex-wrap gap-2 mt-1.5">
              {genderOptions.map((gender) => (
                <Badge
                  key={gender}
                  variant={genderPreferences.includes(gender) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => toggleGender(gender)}
                >
                  {gender}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label>Services {userRole === 'client' ? 'Interested In' : 'You Offer'}</Label>
        <div className="flex flex-wrap gap-2 mt-1.5">
          {serviceOptions.map((service) => (
            <Badge
              key={service}
              variant={servicePreferences.includes(service) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleService(service)}
            >
              {service}
            </Badge>
          ))}
        </div>
      </div>

      <Button className="w-full" onClick={handleContinue}>
        Continue
      </Button>
    </div>
  );
};
