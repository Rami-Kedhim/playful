
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ESCORT_LANGUAGE_OPTIONS } from "@/types/escortTypes";

interface LanguageFilterProps {
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
}

const LanguageFilter = ({ selectedLanguages, toggleLanguage }: LanguageFilterProps) => {
  const [showAll, setShowAll] = useState(false);
  
  // Display only a few languages initially
  const visibleLanguages = showAll 
    ? ESCORT_LANGUAGE_OPTIONS 
    : ESCORT_LANGUAGE_OPTIONS.slice(0, 4);
  
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium mb-2">Languages</h3>
      
      <div className="space-y-2">
        {visibleLanguages.map(language => (
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
      
      {ESCORT_LANGUAGE_OPTIONS.length > 4 && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs flex items-center justify-center mt-1"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? (
            <>
              <ChevronUp className="h-3 w-3 mr-1" />
              Show less
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3 mr-1" />
              Show all languages
            </>
          )}
        </Button>
      )}
    </div>
  );
};

export default LanguageFilter;
