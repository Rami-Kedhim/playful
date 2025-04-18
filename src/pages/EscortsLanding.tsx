
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ESCORT_SERVICE_TYPES } from '@/types/escortTypes';

const EscortsLanding: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Let's simulate that we are loading data for now
  const isLoading = false;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Find Your Perfect Escort</h1>
      
      <div className="grid gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search by name or keywords</Label>
                  <Input 
                    id="search"
                    placeholder="Search escorts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex-1">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    placeholder="City or area..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full md:w-auto">
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button 
                  variant="ghost" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  {showFilters ? "Hide filters" : "Show more filters"}
                </Button>
                
                <div className="flex items-center space-x-2">
                  <Checkbox id="verified" />
                  <Label htmlFor="verified">Verified profiles only</Label>
                </div>
              </div>
              
              {showFilters && (
                <div className="mt-4 border-t pt-4">
                  <Tabs defaultValue="services">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="services">Services</TabsTrigger>
                      <TabsTrigger value="attributes">Attributes</TabsTrigger>
                      <TabsTrigger value="availability">Availability</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="services" className="mt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {ESCORT_SERVICE_TYPES.map((service) => (
                          <div key={service.value} className="flex items-center space-x-2">
                            <Checkbox id={`service-${service.value}`} />
                            <Label htmlFor={`service-${service.value}`}>{service.label}</Label>
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="attributes" className="mt-0">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="attr-young" />
                          <Label htmlFor="attr-young">Young (21-25)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="attr-mature" />
                          <Label htmlFor="attr-mature">Mature (30+)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="attr-petite" />
                          <Label htmlFor="attr-petite">Petite</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="attr-curvy" />
                          <Label htmlFor="attr-curvy">Curvy</Label>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="availability" className="mt-0">
                      <div className="flex items-center space-x-2 mb-4">
                        <Checkbox id="available-now" />
                        <Label htmlFor="available-now">Available now</Label>
                      </div>
                      
                      <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                        <Button variant="outline" size="sm">Mon</Button>
                        <Button variant="outline" size="sm">Tue</Button>
                        <Button variant="outline" size="sm">Wed</Button>
                        <Button variant="outline" size="sm">Thu</Button>
                        <Button variant="outline" size="sm">Fri</Button>
                        <Button variant="outline" size="sm">Sat</Button>
                        <Button variant="outline" size="sm">Sun</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Featured Escorts</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Newest
          </Button>
          <Button variant="outline" size="sm">
            Popular
          </Button>
        </div>
      </div>
      
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          No escorts found matching your criteria. Try adjusting your filters.
        </p>
      </div>
    </div>
  );
};

export default EscortsLanding;
