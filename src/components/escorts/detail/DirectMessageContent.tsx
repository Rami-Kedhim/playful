
// Create the missing DirectMessageContent component
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Send, Phone } from "lucide-react";

interface DirectMessageContentProps {
  onSubmit: (phone: string) => void;
}

const DirectMessageContent = ({ onSubmit }: DirectMessageContentProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValid, setIsValid] = useState(false);

  const validatePhoneNumber = (number: string) => {
    // Very basic validation - in a real app this would be more complex
    const hasValidLength = number.replace(/\D/g, "").length >= 10;
    setIsValid(hasValidLength);
    return hasValidLength;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validatePhoneNumber(phoneNumber)) {
      onSubmit(phoneNumber);
      setPhoneNumber("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone-number">Phone Number</Label>
        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone-number"
              type="tel"
              placeholder="(555) 123-4567"
              className="pl-9"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
                validatePhoneNumber(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          We'll send an SMS with a link to this profile
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full" 
        disabled={!isValid}
      >
        <Send className="mr-2 h-4 w-4" />
        Send Link
      </Button>
    </form>
  );
};

export default DirectMessageContent;
