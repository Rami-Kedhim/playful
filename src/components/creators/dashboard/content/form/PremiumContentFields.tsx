
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

interface PremiumContentFieldsProps {
  isPremium: boolean;
  price: number | null;
  onSwitchChange: (checked: boolean) => void;
  onNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PremiumContentFields: React.FC<PremiumContentFieldsProps> = ({
  isPremium,
  price,
  onSwitchChange,
  onNumberChange,
}) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <Switch
          id="is_premium"
          checked={isPremium}
          onCheckedChange={onSwitchChange}
        />
        <Label htmlFor="is_premium">Premium Content</Label>
      </div>

      {isPremium && (
        <div className="space-y-2">
          <Label htmlFor="price">Price (LC) *</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={price === null ? "" : price}
            onChange={onNumberChange}
            required={isPremium}
          />
        </div>
      )}
    </>
  );
};

export default PremiumContentFields;
