

import React from 'react';
import { UberPersona } from '@/types/UberPersona'; // fixed import casing
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Webcam, Calendar, Clock } from 'lucide-react';

interface PersonaLiveTabProps {
  persona: UberPersona;
}

const PersonaLiveTab: React.FC<PersonaLiveTabProps> = ({ persona }) => {
  const isLive = Math.random() > 0.5; // Mock live status
  
  // Mock upcoming streams
  const upcomingStreams = [
    { id: 1, title: "Q&A Session", date: "Tomorrow", time: "8:00 PM", duration: "1 hour" },
    { id: 2, title: "Special Show", date: "Friday", time: "9:30 PM", duration: "2 hours" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">Live Stream</h2>
      
      {isLive ? (
        <Card className="overflow-hidden">
          <div className="relative aspect-video bg-black">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="bg-black/80 p-6 rounded-lg text-center">
                <Webcam className="h-12 w-12 mx-auto mb-3 text-red-500" />
                <h3 className="text-xl font-semibold mb-2">Live Now!</h3>
                <p className="mb-4 text-muted-foreground">
                  {persona.displayName} is currently streaming live.
                </p>
                <Button>Join Live Stream</Button>
              </div>
            </div>
            
            <Badge className="absolute top-4 left-4 bg-red-500">LIVE</Badge>
            <div className="absolute top-4 right-4 bg-black/60 text-white px-2 py-1 rounded-md text-sm flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M18 7c0-1.1-.9-2-2-2H4a2 2 0 0 0-2 2v10c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2v-3"/><path d="m15 15 5-5"/><path d="M20 10v5h-5"/></svg>
              286 Viewers
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{persona.displayName}'s Live Stream</h3>
              <Badge variant="outline" className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                00:45:12
              </Badge>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-6 text-center">
            <Webcam className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">Not Live Currently</h3>
            <p className="text-muted-foreground mb-4">
              {persona.displayName} is not streaming at the moment.
              Check the schedule or follow to get notified.
            </p>
            <Button>Follow for Notifications</Button>
          </CardContent>
        </Card>
      )}
      
      <div>
        <h3 className="text-xl font-semibold mb-3">Upcoming Streams</h3>
        {upcomingStreams.map((stream) => (
          <Card key={stream.id} className="mb-3">
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{stream.title}</h4>
                  <div className="flex items-center text-muted-foreground mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span className="mr-3">{stream.date}</span>
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{stream.time} • {stream.duration}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">Remind Me</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonaLiveTab;

