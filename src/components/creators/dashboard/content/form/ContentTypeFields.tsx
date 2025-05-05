
import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentTypeFieldsProps {
  contentType: string;
  status: string;
  onSelectChange: (name: string, value: string) => void;
}

const ContentTypeFields: React.FC<ContentTypeFieldsProps> = ({
  contentType,
  status,
  onSelectChange,
}) => {
  // Handler to ensure we never pass empty strings
  const handleChange = (name: string, value: string) => {
    // Provide fallback values if empty strings are encountered
    const safeValue = value || (name === "content_type" ? "image" : "draft");
    onSelectChange(name, safeValue);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="content_type">Content Type *</Label>
        <Select
          value={contentType || "image"}
          onValueChange={(value) =>
            handleChange("content_type", value)
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Select content type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status *</Label>
        <Select
          value={status || "draft"}
          onValueChange={(value) => handleChange("status", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ContentTypeFields;
