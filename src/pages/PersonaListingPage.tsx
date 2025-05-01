
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, Filter, Layers } from 'lucide-react';

const PersonaListingPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">UberPersonas</h1>
          <p className="text-muted-foreground">Browse and manage all available personas</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Create Persona
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Sample Persona Cards */}
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-xl">Persona {i + 1}</CardTitle>
                <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                  {i % 2 === 0 ? 'Active' : 'Draft'}
                </Badge>
              </div>
              <CardDescription>AI-Generated Character</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm">Personality Type: <span className="font-medium">Dynamic</span></p>
                  <p className="text-sm">Engagement: <span className="font-medium">High</span></p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                This is a sample persona with unique personality traits and interaction patterns.
              </p>
              <div className="mt-4 flex justify-end">
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PersonaListingPage;
