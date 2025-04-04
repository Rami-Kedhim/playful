
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import { Settings, Save } from "lucide-react";

const oxumParametersSchema = z.object({
  basePrice: z.coerce.number().min(1).max(1000),
  countryPremiumUS: z.coerce.number().min(0).max(100),
  countryPremiumEurope: z.coerce.number().min(0).max(100),
  incompleteProfilePenalty: z.coerce.number().min(0).max(100),
  highRatingDiscount: z.coerce.number().min(0).max(50),
  peakHourPremium: z.coerce.number().min(0).max(100),
  verifiedUserDiscount: z.coerce.number().min(0).max(50),
  aiProfilePremium: z.coerce.number().min(0).max(100),
  minimumPrice: z.coerce.number().min(1).max(100),
});

type OxumParameters = z.infer<typeof oxumParametersSchema>;

interface OxumParametersPanelProps {
  onSave?: (parameters: OxumParameters) => Promise<boolean>;
}

const OxumParametersPanel = ({ onSave }: OxumParametersPanelProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Default values based on the calculateBoostPrice algorithm
  const form = useForm<OxumParameters>({
    resolver: zodResolver(oxumParametersSchema),
    defaultValues: {
      basePrice: 50,
      countryPremiumUS: 20,
      countryPremiumEurope: 15,
      incompleteProfilePenalty: 30,
      highRatingDiscount: 10,
      peakHourPremium: 25,
      verifiedUserDiscount: 5,
      aiProfilePremium: 10,
      minimumPrice: 30,
    },
  });
  
  const handleSubmit = async (data: OxumParameters) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call
      if (onSave) {
        await onSave(data);
      }
      
      // Simulate API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Oxum parameters updated",
        description: "Boost pricing parameters have been successfully updated",
      });
    } catch (err) {
      console.error("Error updating Oxum parameters:", err);
      toast({
        title: "Error",
        description: "Failed to update boost pricing parameters",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="h-5 w-5 mr-2" />
          Oxum Boost Algorithm Parameters
        </CardTitle>
        <CardDescription>
          Configure the pricing parameters for the Oxum boost pricing algorithm
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="basePrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Price (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Starting price for all boosts
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="minimumPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Price (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Minimum price threshold
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="countryPremiumUS"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>US/Canada Premium (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Additional cost for US/CA profiles
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="countryPremiumEurope"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Europe Premium (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Additional cost for European profiles
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="incompleteProfilePenalty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incomplete Profile Penalty (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Penalty for profiles below 80% complete
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="highRatingDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>High Rating Discount (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Discount for profiles rated above 4.5
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="peakHourPremium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Peak Hour Premium (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Additional cost during peak hours
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="verifiedUserDiscount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verified User Discount (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Discount for verified profiles
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="aiProfilePremium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AI Profile Premium (LC)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                      Additional cost for AI profiles
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                "Saving..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Parameters
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OxumParametersPanel;
