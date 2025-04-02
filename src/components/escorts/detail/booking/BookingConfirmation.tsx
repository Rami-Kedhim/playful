
import React from "react";
import { format } from "date-fns";
import { BookingFormValues } from "./types";
import { Escort } from "@/data/escortData";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface BookingConfirmationProps {
  data: BookingFormValues;
  escort: Escort;
}

const BookingConfirmation = ({ data, escort }: BookingConfirmationProps) => {
  return (
    <Card className="mt-4">
      <CardContent className="p-4 space-y-4">
        <h3 className="text-lg font-semibold">Booking Summary</h3>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Date:</div>
          <div className="text-sm font-medium">
            {data.date ? format(data.date, "MMMM d, yyyy") : "Not selected"}
          </div>
          
          <div className="text-sm text-muted-foreground">Time:</div>
          <div className="text-sm font-medium">{data.time || "Not selected"}</div>
          
          <div className="text-sm text-muted-foreground">Duration:</div>
          <div className="text-sm font-medium">{data.duration || "Not selected"}</div>
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Escort:</div>
          <div className="text-sm font-medium">{escort.name}</div>
          
          <div className="text-sm text-muted-foreground">Location:</div>
          <div className="text-sm font-medium">{escort.location}</div>
          
          {escort.hourlyRate && (
            <>
              <div className="text-sm text-muted-foreground">Hourly Rate:</div>
              <div className="text-sm font-medium">${escort.hourlyRate}/hr</div>
            </>
          )}
        </div>
        
        <Separator />
        
        <div className="grid grid-cols-2 gap-2">
          <div className="text-sm text-muted-foreground">Your Name:</div>
          <div className="text-sm font-medium">{data.name || "Not provided"}</div>
          
          <div className="text-sm text-muted-foreground">Your Email:</div>
          <div className="text-sm font-medium">{data.email || "Not provided"}</div>
          
          <div className="text-sm text-muted-foreground">Your Phone:</div>
          <div className="text-sm font-medium">{data.phone || "Not provided"}</div>
        </div>
        
        {data.message && (
          <>
            <Separator />
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Your Message:</div>
              <div className="text-sm italic bg-muted p-2 rounded">{data.message}</div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BookingConfirmation;
