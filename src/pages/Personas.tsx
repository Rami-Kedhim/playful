
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePersonaFilters } from '@/hooks/usePersonaFilters';
import { usePersonas } from '@/modules/personas/hooks';
import { Search, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

const Personas = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const loadingState = false; // Establish loading state here
  const errorState = null; // Establish error state here
  
  const { filters, updateFilters, filteredPersonas } = usePersonaFilters();
  
  useEffect(() => {
    // Initial fetch
    updateFilters({ searchQuery: '' });
  }, [updateFilters]);
  
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ searchQuery: searchQuery });
  };
  
  // Define filters
  const locationFilters = [
    { key: 'new-york', label: 'New York' },
    { key: 'los-angeles', label: 'Los Angeles' },
    { key: 'chicago', label: 'Chicago' }
  ];
  
  const roleFilters = [
    { key: 'escort', label: 'Escort' },
    { key: 'sugarbaby', label: 'Sugar Baby' },
    { key: 'companion', label: 'Companion' }
  ];
  
  const capabilityFilters = [
    { key: 'video', label: 'Video' },
    { key: 'audio', label: 'Audio' },
    { key: 'chat', label: 'Chat' }
  ];
  
  const handleFilterClick = (filter: string, value: string) => {
    switch (filter) {
      case 'location':
        updateFilters({ 
          location: filters.location === value ? '' : value 
        });
        break;
      case 'role':
        updateFilters({
          types: filters.types.includes(value) 
            ? filters.types.filter(r => r !== value) 
            : [...filters.types, value]
        });
        break;
      case 'capability':
        updateFilters({
          tags: filters.tags.includes(value) 
            ? filters.tags.filter(c => c !== value) 
            : [...filters.tags, value]
        });
        break;
      default:
        break;
    }
  };
  
  const handleClearSearch = () => {
    setSearchQuery('');
    updateFilters({ searchQuery: '' });
  };
  
  const renderFilterBadge = (label: string, isActive: boolean, onClick: () => void) => {
    return (
      <Badge 
        variant={isActive ? "default" : "outline"} 
        className="cursor-pointer mr-2 mb-2"
        onClick={onClick}
      >
        {label}
      </Badge>
    );
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Discover Personas</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Search</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSearchSubmit} className="relative">
                <Input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search personas..."
                  className="pr-8"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={handleClearSearch}
                    className="absolute right-10 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-muted-foreground" />
                  </button>
                )}
                <Button 
                  type="submit" 
                  size="icon" 
                  className="absolute right-0 top-0 h-full"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Location</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap">
                {locationFilters.map((loc) => (
                  renderFilterBadge(
                    loc.label,
                    filters.location === loc.key,
                    () => handleFilterClick('location', loc.key)
                  )
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {roleFilters.map((role) => (
                <div key={role.key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`role-${role.key}`}
                    checked={filters.types.includes(role.key)}
                    onCheckedChange={() => handleFilterClick('role', role.key)}
                  />
                  <label 
                    htmlFor={`role-${role.key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {role.label}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Capabilities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {capabilityFilters.map((cap) => (
                <div key={cap.key} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`cap-${cap.key}`}
                    checked={filters.tags.includes(cap.key)}
                    onCheckedChange={() => handleFilterClick('capability', cap.key)}
                  />
                  <label 
                    htmlFor={`cap-${cap.key}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {cap.label}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Tabs defaultValue="all" className="mb-6">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="verified">Verified</TabsTrigger>
              <TabsTrigger value="online">Online</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
          </Tabs>
          
          {loadingState ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(0).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="h-48 bg-muted"></div>
                  <CardContent className="p-4">
                    <div className="h-4 bg-muted mb-2 w-3/4"></div>
                    <div className="h-4 bg-muted w-1/2"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : errorState ? (
            <div className="p-6 text-center">
              <p className="text-red-500">Error loading personas: {errorState}</p>
            </div>
          ) : filteredPersonas.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">No personas found matching your criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPersonas.map((persona) => (
                <Card key={persona.id} className="overflow-hidden">
                  <div className="h-48 bg-muted relative">
                    {/* Persona image would go here */}
                    {persona.online && (
                      <div className="absolute top-2 right-2 bg-green-500 h-3 w-3 rounded-full"></div>
                    )}
                    {persona.verified && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                        Verified
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium">{persona.name}</h3>
                    <p className="text-sm text-muted-foreground">{persona.type}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Personas;
