
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface LanguageFilterProps {
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
}

const LANGUAGE_OPTIONS = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Russian',
  'Mandarin',
  'Japanese',
  'Other'
];

const LanguageFilter = ({ selectedLanguages, toggleLanguage }: LanguageFilterProps) => {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">Languages</h3>
      
      <div className="space-y-2">
        {LANGUAGE_OPTIONS.map(language => (
          <div key={language} className="flex items-center space-x-2">
            <Checkbox 
              id={`language-${language}`}
              checked={selectedLanguages.includes(language)}
              onCheckedChange={() => toggleLanguage(language)}
            />
            <Label 
              htmlFor={`language-${language}`}
              className="text-sm capitalize cursor-pointer"
            >
              {language}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageFilter;
