
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CreatorContent } from "@/types/creator";
import BasicInfoFields from "./form/BasicInfoFields";
import ContentTypeFields from "./form/ContentTypeFields";
import MediaUrlFields from "./form/MediaUrlFields";
import PremiumContentFields from "./form/PremiumContentFields";

interface ContentFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<CreatorContent>) => void;
  initialData?: CreatorContent;
}

const ContentForm: React.FC<ContentFormProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState<Partial<CreatorContent>>({
    title: "",
    description: "",
    content_type: "image",
    url: "",
    thumbnail_url: "",
    is_premium: false,
    price: null,
    status: "draft",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        content_type: initialData.content_type || "image",
        url: initialData.url || "",
        thumbnail_url: initialData.thumbnail_url || "",
        is_premium: initialData.is_premium || false,
        price: initialData.price || null,
        status: initialData.status || "draft",
      });
    } else {
      // Reset form for new content
      setFormData({
        title: "",
        description: "",
        content_type: "image",
        url: "",
        thumbnail_url: "",
        is_premium: false,
        price: null,
        status: "draft",
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, is_premium: checked });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value === "" ? null : Number(value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Content" : "Add New Content"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <BasicInfoFields
              title={formData.title || ""}
              description={formData.description || ""}
              onChange={handleChange}
            />

            <ContentTypeFields
              contentType={formData.content_type || "image"}
              status={formData.status || "draft"}
              onSelectChange={handleSelectChange}
            />

            <MediaUrlFields
              contentUrl={formData.url || ""}
              thumbnailUrl={formData.thumbnail_url || ""}
              onChange={handleChange}
            />

            <PremiumContentFields
              isPremium={formData.is_premium || false}
              price={formData.price}
              onSwitchChange={handleSwitchChange}
              onNumberChange={handleNumberChange}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Content</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ContentForm;
