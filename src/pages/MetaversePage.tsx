
import React, { useState } from 'react';
import { useAuth } from '@/hooks/auth/useAuth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, Calendar, Map, Gamepad2 } from 'lucide-react';

const placeholderVirtualRooms = [
  {
    id: '1',
    name: 'Luxury Suite Experience',
    owner: 'Sophia',
    description: 'Private virtual suite with stunning views and interactive features.',
    activeUsers: 4,
    maxCapacity: 10,
    tags: ['Private', 'Suite', 'Interactive'],
    thumbnailUrl: '/rooms/luxury-suite.jpg'
  },
  {
    id: '2',
    name: 'Beach Paradise Getaway',
    owner: 'Emma',
    description: 'Tropical beach environment with sunset views and ocean sounds.',
    activeUsers: 2,
    maxCapacity: 8,
    tags: ['Beach', 'Tropical', 'Relaxing'],
    thumbnailUrl: '/rooms/beach-paradise.jpg'
  },
  {
    id: '3',
    name: 'Club Night Experience',
    owner: 'Isabella',
    description: 'High-energy nightclub with dance floor and private VIP areas.',
    activeUsers: 12,
    maxCapacity: 30,
    tags: ['Club', 'Dance', 'Music'],
    thumbnailUrl: '/rooms/club-night.jpg'
  }
];

const placeholderEvents = [
  {
    id: '1',
    name: 'Virtual Fashion Show',
    host: 'Luna',
    description: 'Exclusive virtual fashion event showcasing the latest lingerie collections.',
    date: '2025-04-15T19:00:00',
    attendees: 28,
    maxAttendees: 50,
    thumbnailUrl: '/events/fashion-show.jpg',
    price: 15
  },
  {
    id: '2',
    name: 'Private VR Party',
    host: 'Aria',
    description: 'Join our exclusive VR party with special performances and interactive experiences.',
    date: '2025-04-20T21:00:00',
    attendees: 12,
    maxAttendees: 20,
    thumbnailUrl: '/events/vr-party.jpg',
    price: 25
  }
];

const MetaversePage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('rooms');
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const VirtualRoomCard = ({ room }: { room: any }) => (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-purple-900 to-blue-900 relative">
        {room.thumbnailUrl ? (
          <img 
            src={room.thumbnailUrl} 
            alt={room.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Map className="h-16 w-16 text-primary/50" />
          </div>
        )}
        <div className="absolute top-2 right-2 flex items-center gap-1 bg-background/80 rounded-full px-2 py-0.5 text-xs">
          <Users className="h-3 w-3" />
          <span>{room.activeUsers}/{room.maxCapacity}</span>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{room.name}</h3>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <span className="text-sm">Hosted by {room.owner}</span>
        </div>
        
        <p className="text-sm mb-3 line-clamp-2">{room.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {room.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button className="w-full">Enter Room</Button>
      </CardFooter>
    </Card>
  );
  
  const EventCard = ({ event }: { event: any }) => (
    <Card className="overflow-hidden">
      <div className="h-40 bg-gradient-to-r from-rose-900 to-red-900 relative">
        {event.thumbnailUrl ? (
          <img 
            src={event.thumbnailUrl} 
            alt={event.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center">
            <Calendar className="h-16 w-16 text-primary/50" />
          </div>
        )}
        <Badge className="absolute top-2 right-2" variant={event.price > 0 ? "default" : "secondary"}>
          {event.price > 0 ? `$${event.price}` : 'Free'}
        </Badge>
      </div>
      
      <CardContent className="pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{event.name}</h3>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="text-sm">{formatDate(event.date)}</span>
        </div>
        
        <div className="flex items-center text-muted-foreground mb-2">
          <Users className="h-4 w-4 mr-1" />
          <span className="text-sm">{event.attendees}/{event.maxAttendees} attending</span>
        </div>
        
        <p className="text-sm mb-3 line-clamp-2">{event.description}</p>
      </CardContent>
      
      <CardFooter className="border-t pt-4">
        <Button className="w-full">RSVP</Button>
      </CardFooter>
    </Card>
  );
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Metaverse</h1>
          <p className="text-muted-foreground">Explore virtual spaces and interactive experiences</p>
        </div>
        
        <div className="flex gap-4">
          <Button variant="outline" className="flex items-center gap-2">
            <Map className="h-4 w-4" />
            Create Room
          </Button>
          <Button className="flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" />
            Enter Metaverse
          </Button>
        </div>
      </div>
      
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="md:flex-1">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome to UberEscorts Metaverse</h2>
                <p className="text-white/90 mb-4">Immersive virtual experiences await. Connect with escorts and creators in interactive 3D environments.</p>
                <Button variant="secondary">Watch Tutorial</Button>
              </div>
              <div className="w-full md:w-auto">
                <img
                  src="/metaverse-promo.jpg"
                  alt="Metaverse Preview"
                  className="w-full max-w-md rounded-lg border border-white/20 shadow-glow"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
          <TabsTrigger value="rooms">Virtual Rooms</TabsTrigger>
          <TabsTrigger value="events">Upcoming Events</TabsTrigger>
        </TabsList>
        
        <TabsContent value="rooms">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {placeholderVirtualRooms.map(room => (
              <VirtualRoomCard key={room.id} room={room} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="events">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {placeholderEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MetaversePage;
