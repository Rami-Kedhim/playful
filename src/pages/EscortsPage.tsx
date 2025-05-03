
import React, { useState } from 'react';
import { UnifiedLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Check, Search, Filter } from 'lucide-react';

// Mock data for escort profiles
const mockEscorts = [
  {
    id: 'esc-1',
    name: 'Sophia',
    age: 25,
    location: 'New York',
    pricePerHour: 350,
    rating: 4.9,
    verified: true,
    image: '/sophia-escort.png',
    services: ['Companionship', 'Dinner Date', 'Events'],
    description: 'Elegant and sophisticated companion for upscale events.',
  },
  {
    id: 'esc-2',
    name: 'Isabella',
    age: 24,
    location: 'Los Angeles',
    pricePerHour: 380,
    rating: 4.8,
    verified: true,
    image: '/isabella-escort.png',
    services: ['Travel Companion', 'Private Parties', 'Weekend Getaway'],
    description: 'Adventurous spirit with a passion for luxury experiences.',
  },
  {
    id: 'esc-3',
    name: 'Olivia',
    age: 27,
    location: 'Miami',
    pricePerHour: 400,
    rating: 4.7,
    verified: true,
    image: '/olivia-escort.png',
    services: ['VIP Events', 'Dinner Date', 'Cultural Outings'],
    description: 'Cultured and well-traveled companion for discerning clients.',
  },
  {
    id: 'esc-4',
    name: 'Emma',
    age: 26,
    location: 'Chicago',
    pricePerHour: 320,
    rating: 4.6,
    verified: false,
    image: '/emma-escort.png',
    services: ['Dinner Date', 'Cultural Events', 'Private Gatherings'],
    description: 'Charming and intellectual companion for meaningful connections.',
  },
  {
    id: 'esc-5',
    name: 'Ava',
    age: 23,
    location: 'Las Vegas',
    pricePerHour: 450,
    rating: 4.9,
    verified: true,
    image: '/ava-escort.png',
    services: ['Casino Companion', 'Nightlife', 'Weekend Experiences'],
    description: 'Vibrant and energetic personality, perfect for exciting adventures.',
  },
  {
    id: 'esc-6',
    name: 'Mia',
    age: 29,
    location: 'San Francisco',
    pricePerHour: 380,
    rating: 4.8,
    verified: true,
    image: '/mia-escort.png',
    services: ['Business Events', 'Cultural Tours', 'Fine Dining'],
    description: 'Sophisticated and intelligent companion for executive engagements.',
  },
];

const EscortCard = ({ escort }) => {
  return (
    <Card className="overflow-hidden h-full border border-border/40">
      <div className="aspect-[3/4] relative bg-muted">
        {escort.image ? (
          <img 
            src={escort.image} 
            alt={escort.name} 
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            {escort.name.charAt(0)}
          </div>
        )}
        {escort.verified && (
          <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-lg">{escort.name}, {escort.age}</h3>
          <span className="text-sm text-muted-foreground">${escort.pricePerHour}/hr</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm text-muted-foreground">{escort.location}</span>
          <span className="text-sm text-yellow-500 ml-auto">★ {escort.rating}</span>
        </div>
        <div className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {escort.description}
        </div>
        <div className="flex flex-wrap gap-1">
          {escort.services.slice(0, 2).map((service, idx) => (
            <span key={idx} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              {service}
            </span>
          ))}
          {escort.services.length > 2 && (
            <span className="text-xs bg-muted px-2 py-1 rounded-full">
              +{escort.services.length - 2} more
            </span>
          )}
        </div>
        <Button className="w-full mt-4">View Profile</Button>
      </CardContent>
    </Card>
  );
};

const FilterSection = ({ onFilterChange, filters }) => {
  const [priceRange, setPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [locationFilter, setLocationFilter] = useState(filters.location);
  
  const handlePriceChange = (value) => {
    setPriceRange(value);
    onFilterChange({
      ...filters,
      minPrice: value[0],
      maxPrice: value[1]
    });
  };

  const handleLocationChange = (e) => {
    setLocationFilter(e.target.value);
    onFilterChange({
      ...filters,
      location: e.target.value
    });
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-2">Price Range</h3>
        <div className="px-2">
          <Slider 
            defaultValue={priceRange}
            max={1000}
            step={10}
            onValueChange={handlePriceChange}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Location</h3>
        <Input 
          placeholder="Search location" 
          value={locationFilter}
          onChange={handleLocationChange}
        />
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Services</h3>
        <div className="space-y-2">
          {['Dinner Date', 'Travel Companion', 'VIP Events', 'Cultural Outings'].map((service) => (
            <label key={service} className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                className="rounded border-gray-300 text-primary focus:ring-primary"
                onChange={() => onFilterChange({
                  ...filters,
                  services: filters.services.includes(service)
                    ? filters.services.filter(s => s !== service)
                    : [...filters.services, service]
                })}
                checked={filters.services.includes(service)}
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-2">Verification</h3>
        <label className="flex items-center space-x-2">
          <input 
            type="checkbox" 
            className="rounded border-gray-300 text-primary focus:ring-primary"
            onChange={() => onFilterChange({
              ...filters,
              onlyVerified: !filters.onlyVerified
            })}
            checked={filters.onlyVerified}
          />
          <span>Show only verified</span>
        </label>
      </div>
    </div>
  );
};

const EscortsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    location: '',
    services: [],
    onlyVerified: false
  });
  
  const filteredEscorts = mockEscorts.filter(escort => {
    // Apply search query
    if (searchQuery && !escort.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !escort.location.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply price filter
    if (escort.pricePerHour < filters.minPrice || escort.pricePerHour > filters.maxPrice) {
      return false;
    }
    
    // Apply location filter
    if (filters.location && !escort.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    
    // Apply services filter
    if (filters.services.length > 0 && !escort.services.some(service => filters.services.includes(service))) {
      return false;
    }
    
    // Apply verification filter
    if (filters.onlyVerified && !escort.verified) {
      return false;
    }
    
    return true;
  });
  
  return (
    <UnifiedLayout title="Premium Escort Services" description="Connect with verified professional escorts for companionship and more">
      <div className="container mx-auto">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search escorts by name or location" 
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          {/* Filter Sidebar - Desktop */}
          <div className={`hidden md:block`}>
            <FilterSection onFilterChange={setFilters} filters={filters} />
          </div>
          
          {/* Mobile Filter Section */}
          {showFilters && (
            <div className="md:hidden bg-card p-4 rounded-lg border border-border mb-6">
              <FilterSection onFilterChange={setFilters} filters={filters} />
            </div>
          )}
          
          {/* Escort Cards Grid */}
          <div className="md:col-span-3">
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">
                {filteredEscorts.length} {filteredEscorts.length === 1 ? 'Escort' : 'Escorts'} Available
              </h2>
              <div className="text-sm text-muted-foreground">
                Sort by: 
                <select className="ml-2 bg-transparent border-none outline-none">
                  <option>Relevance</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Rating: High to Low</option>
                </select>
              </div>
            </div>
            
            {filteredEscorts.length === 0 ? (
              <div className="text-center py-12 bg-card border border-border rounded-lg">
                <p className="text-muted-foreground">No escorts found matching your criteria.</p>
                <Button variant="outline" className="mt-4" onClick={() => {
                  setSearchQuery('');
                  setFilters({
                    minPrice: 0,
                    maxPrice: 1000,
                    location: '',
                    services: [],
                    onlyVerified: false
                  });
                }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEscorts.map(escort => (
                  <EscortCard key={escort.id} escort={escort} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </UnifiedLayout>
  );
};

export default EscortsPage;
