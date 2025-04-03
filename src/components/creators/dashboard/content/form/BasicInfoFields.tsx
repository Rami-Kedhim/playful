
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CreatorContent } from "@/types/creator";

interface BasicInfoFieldsProps {
  title: string;
  description: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({
  title,
  description,
  onChange,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title *</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={onChange}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description || ""}
          onChange={onChange}
          rows={3}
        />
      </div>
    </div>
  );
};

export default BasicInfoFields;
