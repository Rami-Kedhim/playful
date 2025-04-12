
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface PreferencesStepProps {
  onNext: (data: any) => void;
  initialData: any;
}

export const PreferencesStep: React.FC<PreferencesStepProps> = ({ onNext, initialData }) => {
  const [genderPreferences, setGenderPreferences] = useState<string[]>(initialData.genderPreferences || []);
  const [servicePreferences, setServicePreferences] = useState<string[]>(initialData.servicePreferences || []);
  const [maxDistance, setMaxDistance] = useState<number>(initialData.maxDistance || 50);
  const [ageRange, setAgeRange] = useState<number[]>(initialData.ageRange || [21, 65]);
  
  const handleGenderChange = (value: string) => {
    setGenderPreferences(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const handleServiceChange = (value: string) => {
    setServicePreferences(prev => 
      prev.includes(value) 
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({
      preferences: {
        genderPreferences,
        servicePreferences,
        maxDistance,
        ageRange,
      }
    });
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-3">
          <Label>Gender Preferences</Label>
          <div className="flex flex-wrap gap-4">
            {['female', 'male', 'trans', 'non-binary'].map(gender => (
              <div key={gender} className="flex items-center space-x-2">
                <Checkbox 
                  id={`gender-${gender}`} 
                  checked={genderPreferences.includes(gender)}
                  onCheckedChange={() => handleGenderChange(gender)}
                />
                <Label htmlFor={`gender-${gender}`} className="capitalize cursor-pointer">
                  {gender.replace('-', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <Label>Service Interests</Label>
          <div className="grid grid-cols-2 gap-3">
            {['massage', 'companionship', 'virtual', 'role-play', 'fetish', 'dating', 'travel-companion', 'events'].map(service => (
              <div key={service} className="flex items-center space-x-2">
                <Checkbox 
                  id={`service-${service}`} 
                  checked={servicePreferences.includes(service)}
                  onCheckedChange={() => handleServiceChange(service)}
                />
                <Label htmlFor={`service-${service}`} className="capitalize cursor-pointer">
                  {service.replace('-', ' ')}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Maximum Distance</Label>
            <span className="text-sm font-semibold">{maxDistance} km</span>
          </div>
          <Slider
            defaultValue={[maxDistance]}
            max={200}
            step={5}
            onValueChange={(values) => setMaxDistance(values[0])}
          />
        </div>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <Label>Age Range</Label>
            <span className="text-sm font-semibold">{ageRange[0]} - {ageRange[1]} years</span>
          </div>
          <Slider
            defaultValue={ageRange}
            min={18}
            max={99}
            step={1}
            onValueChange={(values) => setAgeRange([values[0], values[1]])}
          />
        </div>
      </div>
      
      <Button type="submit" className="w-full mt-4">
        Continue
      </Button>
    </form>
  );
};
