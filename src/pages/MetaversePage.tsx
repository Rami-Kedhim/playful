
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLayout from '@/components/layout/PageLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollRevealGroup } from '@/components/ui/scroll-reveal-group';
import { hermes } from '@/core/Hermes';
import { Badge } from '@/components/ui/badge';
import { 
  Cube, 
  Users, 
  Building, 
  Map, 
  Compass,
  MessageSquare
} from 'lucide-react';

interface MetaverseRoom {
  id: string;
  name: string;
  description: string;
  occupancy: number;
  maxOccupancy: number;
  category: 'social' | 'private' | 'entertainment' | 'business';
  isActive: boolean;
}

const MetaversePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeRooms, setActiveRooms] = useState<MetaverseRoom[]>([
    {
      id: "room-1",
      name: "Crimson Lounge",
      description: "A sophisticated meeting space for escorts and clients",
      occupancy: 27,
      maxOccupancy: 50,
      category: 'social',
      isActive: true
    },
    {
      id: "room-2",
      name: "Velvet Suite",
      description: "Premium private experience room with enhanced graphics",
      occupancy: 2,
      maxOccupancy: 4,
      category: 'private',
      isActive: true
    },
    {
      id: "room-3",
      name: "Neon District",
      description: "Entertainment district with multiple venues and events",
      occupancy: 53,
      maxOccupancy: 100,
      category: 'entertainment',
      isActive: true
    },
    {
      id: "room-4",
      name: "Luxury Penthouse",
      description: "High-end virtual meeting space with panoramic views",
      occupancy: 6,
      maxOccupancy: 8,
      category: 'business',
      isActive: true
    },
    {
      id: "room-5",
      name: "Oasis Retreat",
      description: "Relaxed environment for casual conversations",
      occupancy: 18,
      maxOccupancy: 30,
      category: 'social',
      isActive: true
    }
  ]);

  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'social': return <Users className="h-5 w-5 text-pink-400" />;
      case 'private': return <Building className="h-5 w-5 text-purple-400" />;
      case 'entertainment': return <Map className="h-5 w-5 text-green-400" />;
      case 'business': return <Compass className="h-5 w-5 text-blue-400" />;
      default: return <Cube className="h-5 w-5" />;
    }
  };

  const handleEnterRoom = (roomId: string) => {
    console.log(`Entering room: ${roomId}`);
    // Call Hermes to register this interaction
    hermes.interfaceHermes();
    // In a real implementation, this would use the Hermes module:
    // hermes.enterSpatialFlow({ roomId, userId: currentUser.id });
  };
  
  const handleCreateRoom = () => {
    console.log('Creating new metaverse room');
    // This would open a modal or navigate to a room creation form
  };

  return (
    <PageLayout 
      title="Metaverse Gateway" 
      subtitle="Enter the UberEscorts virtual world with immersive 3D experiences"
    >
      <div className="space-y-6">
        <Card className="bg-gradient-to-br from-purple-900/30 to-background border-purple-500/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Cube className="h-6 w-6 text-purple-400" />
              <CardTitle>Metaverse Experience</CardTitle>
            </div>
            <CardDescription>
              Explore virtual rooms and connect with escorts and companions in our immersive 3D environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              The UberEscorts Metaverse offers a unique way to interact with escorts, companions, and other users in real-time, 
              from private meetings to social events. Navigate our virtual spaces and enjoy premium experiences.
            </p>
            <div className="flex flex-wrap gap-4 mt-6">
              <Button 
                onClick={() => navigate('/metaverse/tutorial')}
                variant="outline"
                className="flex items-center gap-2"
              >
                <Compass className="h-4 w-4" />
                <span>Tutorial</span>
              </Button>
              <Button 
                onClick={handleCreateRoom}
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Cube className="h-4 w-4" />
                <span>Create Room</span>
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollRevealGroup animation="fade-up" staggerDelay={0.1}>
            {activeRooms.map(room => (
              <Card key={room.id} className="border border-border/40 hover:border-purple-500/30 transition-all">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(room.category)}
                      <CardTitle className="text-lg">{room.name}</CardTitle>
                    </div>
                    <Badge variant={room.occupancy / room.maxOccupancy > 0.8 ? "destructive" : "secondary"}>
                      {room.occupancy}/{room.maxOccupancy}
                    </Badge>
                  </div>
                  <CardDescription>
                    {room.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center gap-2"
                    onClick={() => navigate(`/metaverse/room/${room.id}/preview`)}
                  >
                    <Compass className="h-4 w-4" />
                    <span>Preview</span>
                  </Button>
                  <Button 
                    onClick={() => handleEnterRoom(room.id)}
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Enter Room</span>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </ScrollRevealGroup>
        </div>
      </div>
    </PageLayout>
  );
};

export default MetaversePage;
