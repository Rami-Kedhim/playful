
import React from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Search, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UnifiedRoutes } from '@/routes/unifiedRoutes';

const EscortVerifiedPage = () => {
  // Sample verified escorts data
  const verifiedEscorts = [
    {
      id: '1',
      name: 'Sofia V.',
      age: 25,
      location: 'Manhattan, NY',
      verificationLevel: 'Diamond',
      imageUrl: 'https://placehold.co/300x400',
      hourlyRate: 300
    },
    {
      id: '2',
      name: 'Ava M.',
      age: 28,
      location: 'Los Angeles, CA',
      verificationLevel: 'Platinum',
      imageUrl: 'https://placehold.co/300x400',
      hourlyRate: 250
    },
    {
      id: '3',
      name: 'Emma L.',
      age: 24,
      location: 'Miami, FL',
      verificationLevel: 'Gold',
      imageUrl: 'https://placehold.co/300x400',
      hourlyRate: 200
    }
  ];

  return (
    <UnifiedLayout
      title="Verified Escorts"
      description="Browse our premium verified escorts"
      showBreadcrumbs
    >
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search verified escorts..." className="pl-10" />
            </div>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> 
            Filter
          </Button>
        </div>
        
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="outline" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3 text-green-500" />
            Verified Only
          </Badge>
          <Badge variant="outline">Age: 21-30</Badge>
          <Badge variant="outline">Location: New York</Badge>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {verifiedEscorts.map((escort) => (
          <Card key={escort.id} className="overflow-hidden">
            <div className="aspect-[3/4] relative">
              <img 
                src={escort.imageUrl} 
                alt={escort.name} 
                className="object-cover h-full w-full"
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-green-500">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {escort.verificationLevel}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium text-lg">{escort.name}, {escort.age}</h3>
                  <p className="text-sm text-muted-foreground">{escort.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${escort.hourlyRate}/hr</p>
                </div>
              </div>
              <div className="mt-4">
                <Button asChild className="w-full">
                  <Link to={UnifiedRoutes.escorts.profile.replace(':id', escort.id)}>
                    View Profile
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </UnifiedLayout>
  );
};

export default EscortVerifiedPage;
