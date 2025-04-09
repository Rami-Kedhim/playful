
import React, { useState } from 'react';
import { UberPersona } from '@/types/uberPersona';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { PopoverContent, PopoverTrigger, Popover } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock, DollarSign, InfoIcon } from 'lucide-react';

interface PersonaBookingTabProps {
  persona: UberPersona;
}

const PersonaBookingTab: React.FC<PersonaBookingTabProps> = ({ persona }) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [duration, setDuration] = useState<string>("1");
  const [bookingType, setBookingType] = useState<string>("inperson");
  
  // Mock hourly rates
  const rates = {
    "1": persona.monetization.unlockingPrice || 200,
    "2": (persona.monetization.unlockingPrice || 200) * 1.8,
    "3": (persona.monetization.unlockingPrice || 200) * 2.5,
    "overnight": (persona.monetization.unlockingPrice || 200) * 5,
  };
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Book {persona.displayName}</h2>
      
      <Tabs defaultValue="inperson" onValueChange={setBookingType}>
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="inperson">In-Person Meeting</TabsTrigger>
          <TabsTrigger value="virtual">Virtual Experience</TabsTrigger>
        </TabsList>
        
        <Card>
          <CardContent className="p-6">
            <TabsContent value="inperson" className="mt-0">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            // Disable dates in the past
                            return date < new Date(new Date().setHours(0, 0, 0, 0));
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Duration</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 Hour - {rates["1"]} LC</SelectItem>
                        <SelectItem value="2">2 Hours - {rates["2"]} LC</SelectItem>
                        <SelectItem value="3">3 Hours - {rates["3"]} LC</SelectItem>
                        <SelectItem value="overnight">Overnight - {rates["overnight"]} LC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location</label>
                  <Select defaultValue="outcall">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="incall">Incall - {persona.location}</SelectItem>
                      <SelectItem value="outcall">Outcall - Your Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Requests</label>
                  <Textarea placeholder="Any special requests or preferences?" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="virtual" className="mt-0">
              <div className="grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Date</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          disabled={(date) => {
                            return date < new Date(new Date().setHours(0, 0, 0, 0));
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Select Duration</label>
                    <Select value={duration} onValueChange={setDuration}>
                      <SelectTrigger>
                        <SelectValue placeholder="Duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">30 Minutes - {Math.round(rates["1"] * 0.6)} LC</SelectItem>
                        <SelectItem value="2">1 Hour - {Math.round(rates["1"] * 0.8)} LC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Virtual Meeting Type</label>
                  <Select defaultValue="video">
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video Call</SelectItem>
                      <SelectItem value="voice">Voice Only</SelectItem>
                      <SelectItem value="chat">Live Chat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Special Requests</label>
                  <Textarea placeholder="Any special requests or preferences?" />
                </div>
              </div>
            </TabsContent>
            
            <div className="mt-6 pt-6 border-t">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center text-lg font-semibold">
                    <DollarSign className="h-5 w-5 mr-1" />
                    <span>{rates[duration as keyof typeof rates]} LC</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1 flex items-center">
                    <InfoIcon className="h-3 w-3 mr-1" />
                    <span>Booking fee will be charged at confirmation</span>
                  </div>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                  <Button variant="outline" className="flex-1 md:flex-none">
                    Message
                  </Button>
                  <Button className="flex-1 md:flex-none">
                    Request Booking
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
};

export default PersonaBookingTab;
