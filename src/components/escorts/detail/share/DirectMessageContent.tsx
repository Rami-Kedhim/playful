
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

interface DirectMessageContentProps {
  onSubmit: (phone: string) => void;
}

const DirectMessageContent = ({ onSubmit }: DirectMessageContentProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const phone = formData.get("phone") as string;
    
    if (!phone) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(phone);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="phone" className="text-sm font-medium">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+1 (555) 123-4567"
          className="w-full"
        />
        <p className="text-xs text-gray-400">
          We'll send a text message with a link to this profile
        </p>
      </div>
      
      <Button type="submit" className="w-full">
        <MessageSquare className="mr-2 h-4 w-4" />
        Send Message
      </Button>
    </form>
  );
};

export default DirectMessageContent;
