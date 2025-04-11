
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { UserCog, Users, PenTool, Heart } from "lucide-react";

interface UserRoleStepProps {
  onNext: (data: any) => void;
}

export const UserRoleStep: React.FC<UserRoleStepProps> = ({ onNext }) => {
  const [role, setRole] = useState<string>('');
  const [isCreator, setIsCreator] = useState(false);
  const [isCouple, setIsCouple] = useState(false);
  const [isLGBTQ, setIsLGBTQ] = useState(false);

  const handleContinue = () => {
    if (role) {
      onNext({
        role,
        isCreator,
        isCouple,
        isLGBTQ
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="text-lg font-medium">How do you want to use UberEscorts?</div>
        
        <RadioGroup value={role} onValueChange={setRole} className="space-y-3">
          <div className={`flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent ${role === 'client' ? 'border-primary bg-accent/50' : ''}`} onClick={() => setRole('client')}>
            <RadioGroupItem value="client" id="role-client" />
            <div className="flex-1">
              <div className="flex items-center">
                <Label htmlFor="role-client" className="text-base font-medium cursor-pointer">I am a Client</Label>
                <UserCog className="ml-2 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                I want to explore, message, book, and enjoy
              </p>
            </div>
          </div>

          <div className={`flex items-center space-x-2 rounded-md border p-4 cursor-pointer hover:bg-accent ${role === 'escort' ? 'border-primary bg-accent/50' : ''}`} onClick={() => setRole('escort')}>
            <RadioGroupItem value="escort" id="role-escort" />
            <div className="flex-1">
              <div className="flex items-center">
                <Label htmlFor="role-escort" className="text-base font-medium cursor-pointer">I am an Escort</Label>
                <Users className="ml-2 h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                I want to appear in the public directory and monetize my time
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-medium">Optional selections:</div>
        
        <div className="flex items-start space-x-2 rounded-md border p-3">
          <Checkbox id="is-creator" checked={isCreator} onCheckedChange={(checked) => setIsCreator(checked === true)} />
          <div>
            <div className="flex items-center">
              <Label htmlFor="is-creator" className="text-sm font-medium cursor-pointer">I also create content</Label>
              <PenTool className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">I want to monetize my photos, videos, and other content</p>
          </div>
        </div>

        <div className="flex items-start space-x-2 rounded-md border p-3">
          <Checkbox id="is-couple" checked={isCouple} onCheckedChange={(checked) => setIsCouple(checked === true)} />
          <div>
            <Label htmlFor="is-couple" className="text-sm font-medium cursor-pointer">I am part of a couple</Label>
          </div>
        </div>

        <div className="flex items-start space-x-2 rounded-md border p-3">
          <Checkbox id="is-lgbtq" checked={isLGBTQ} onCheckedChange={(checked) => setIsLGBTQ(checked === true)} />
          <div>
            <div className="flex items-center">
              <Label htmlFor="is-lgbtq" className="text-sm font-medium cursor-pointer">I identify as trans / non-binary / other</Label>
              <Heart className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </div>

      <Button 
        className="w-full" 
        onClick={handleContinue}
        disabled={!role}
      >
        Continue
      </Button>
    </div>
  );
};
