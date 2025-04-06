
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Star, MapPin, DollarSign, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';

const placeholderEscorts = [
  { 
    id: '1', 
    name: 'Sophia', 
    location: 'Los Angeles',
    age: 25,
    rating: 4.8,
    tags: ['GFE', 'Massage', 'Dinner Date'],
    price: 300,
    avatar_url: '/avatars/sophia.jpg',
    verified: true
  },
  { 
    id: '2', 
    name: 'Emma', 
    location: 'New York',
    age: 28,
    rating: 4.6,
    tags: ['Fetish', 'Role Play', 'Couples'],
    price: 350,
    avatar_url: '/avatars/emma.jpg',
    verified: true
  },
  { 
    id: '3', 
    name: 'Isabella', 
    location: 'Miami',
    age: 23,
    rating: 4.9,
    tags: ['Parties', 'Travel', 'Overnight'],
    price: 400,
    avatar_url: '/avatars/isabella.jpg',
    verified: false
  },
];

const placeholderCreators = [
  { 
    id: '1', 
    name: 'Luna', 
    location: 'Las Vegas',
    age: 26,
    subscriptionPrice: 14.99,
    contentCount: 250,
    tags: ['Cosplay', 'Fitness', 'Dance'],
    avatar_url: '/avatars/luna.jpg',
    verified: true
  },
  { 
    id: '2', 
    name: 'Aria', 
    location: 'Chicago',
    age: 24,
    subscriptionPrice: 9.99,
    contentCount: 180,
    tags: ['ASMR', 'Lingerie', 'Behind the Scenes'],
    avatar_url: '/avatars/aria.jpg',
    verified: true
  },
];

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('escorts');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    location: '',
    minAge: 18,
    maxAge: 50,
    minPrice: 0,
    maxPrice: 1000,
    tags: [] as string[]
  });
  
  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // This would be replaced with actual API calls in a real application
  const searchResults = searchType === 'escorts' ? placeholderEscorts : placeholderCreators;
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Search</h1>
      
      <div className="mb-8">
        <div className="flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-10"
              placeholder={`Search ${searchType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select 
            value={searchType} 
            onValueChange={setSearchType}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Search type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="escorts">Escorts</SelectItem>
              <SelectItem value="creators">Creators</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="ghost" 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </Button>
          <Button>Search</Button>
        </div>
        
        {showAdvancedFilters && (
          <Card className="mt-4">
            <CardContent className="pt-6">
              <Tabs defaultValue="location" className="w-full">
                <TabsList>
                  <TabsTrigger value="location">Location</TabsTrigger>
                  <TabsTrigger value="age">Age</TabsTrigger>
                  <TabsTrigger value="price">Price</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>
                
                <TabsContent value="location" className="pt-4">
                  <div className="space-y-2">
                    <Label>City</Label>
                    <Input 
                      placeholder="Enter city name" 
                      value={filters.location}
                      onChange={(e) => handleFilterChange('location', e.target.value)}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="age" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Min Age: {filters.minAge}</Label>
                        <Label>Max Age: {filters.maxAge}</Label>
                      </div>
                      <Slider 
                        defaultValue={[filters.minAge, filters.maxAge]}
                        max={60}
                        min={18}
                        step={1}
                        onValueChange={(value) => {
                          handleFilterChange('minAge', value[0]);
                          handleFilterChange('maxAge', value[1]);
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="price" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>Min Price: ${filters.minPrice}</Label>
                        <Label>Max Price: ${filters.maxPrice}</Label>
                      </div>
                      <Slider 
                        defaultValue={[filters.minPrice, filters.maxPrice]}
                        max={2000}
                        min={0}
                        step={50}
                        onValueChange={(value) => {
                          handleFilterChange('minPrice', value[0]);
                          handleFilterChange('maxPrice', value[1]);
                        }}
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="pt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {['GFE', 'Massage', 'Dinner Date', 'Role Play', 'Fetish', 'Couples', 'Travel', 'Overnight', 'Parties'].map(tag => (
                      <Button
                        key={tag}
                        variant={filters.tags.includes(tag) ? "default" : "outline"}
                        onClick={() => {
                          const newTags = filters.tags.includes(tag) 
                            ? filters.tags.filter(t => t !== tag)
                            : [...filters.tags, tag];
                          handleFilterChange('tags', newTags);
                        }}
                        className="h-auto py-1.5"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between">
              <Button variant="outline" onClick={() => setFilters({
                location: '',
                minAge: 18,
                maxAge: 50,
                minPrice: 0,
                maxPrice: 1000,
                tags: []
              })}>
                Reset
              </Button>
              <Button>Apply Filters</Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {searchResults.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <div className="h-48 bg-gray-800 relative">
              {result.avatar_url ? (
                <img 
                  src={result.avatar_url} 
                  alt={result.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <span className="text-2xl font-bold">
                    {result.name[0]}
                  </span>
                </div>
              )}
              {result.verified && (
                <Badge className="absolute top-2 right-2" variant="default">Verified</Badge>
              )}
            </div>
            
            <CardContent className="pt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-lg">{result.name}, {result.age}</h3>
                {'rating' in result && (
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1 fill-yellow-500" />
                    <span>{result.rating}</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center text-muted-foreground mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{result.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-1 mb-3">
                {result.tags.map(tag => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
              
              <div className="flex items-center font-medium">
                <DollarSign className="h-4 w-4 mr-1 text-green-500" />
                {'price' in result ? (
                  <span>${result.price}/hr</span>
                ) : (
                  <span>${result.subscriptionPrice}/mo</span>
                )}
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button className="w-full">View Profile</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
