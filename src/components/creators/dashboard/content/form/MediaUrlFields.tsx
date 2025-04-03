
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface MediaUrlFieldsProps {
  contentUrl: string;
  thumbnailUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MediaUrlFields: React.FC<MediaUrlFieldsProps> = ({
  contentUrl,
  thumbnailUrl,
  onChange,
}) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="url">Content URL *</Label>
        <Input
          id="url"
          name="url"
          value={contentUrl}
          onChange={onChange}
          placeholder="https://example.com/content.jpg"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
        <Input
          id="thumbnail_url"
          name="thumbnail_url"
          value={thumbnailUrl || ""}
          onChange={onChange}
          placeholder="https://example.com/thumbnail.jpg"
        />
      </div>
    </>
  );
};

export default MediaUrlFields;
