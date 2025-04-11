
import React from 'react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bot, User, Users } from "lucide-react";

interface ProfileTypeFilterProps {
  value: 'all' | 'real' | 'ai';
  onChange: (value: 'all' | 'real' | 'ai') => void;
  className?: string;
}

const ProfileTypeFilter: React.FC<ProfileTypeFilterProps> = ({ value, onChange, className }) => {
  return (
    <div className={className}>
      <h3 className="font-medium mb-3">Profile Type</h3>
      <RadioGroup 
        value={value} 
        onValueChange={(val) => onChange(val as 'all' | 'real' | 'ai')}
        className="flex flex-col space-y-3"
      >
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="all" id="all-profiles" />
          <Label htmlFor="all-profiles" className="flex items-center cursor-pointer">
            <Users className="h-4 w-4 mr-2" />
            <span>All Profiles</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="real" id="real-profiles" />
          <Label htmlFor="real-profiles" className="flex items-center cursor-pointer">
            <User className="h-4 w-4 mr-2" />
            <span>Real Photos Only</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-3">
          <RadioGroupItem value="ai" id="ai-profiles" />
          <Label htmlFor="ai-profiles" className="flex items-center cursor-pointer">
            <Bot className="h-4 w-4 mr-2" />
            <span>AI-Enhanced Privacy</span>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProfileTypeFilter;
