
import React, { useState, useEffect } from 'react';
import { UnifiedLayout } from '@/layouts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Search, 
  MapPin, 
  Star, 
  MessageSquare, 
  ChevronDown, 
  Shield, 
  Clock, 
  Filter, 
  Loader2,
  CheckCircle,
  Heart,
  Share2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import type { Escort } from '@/types/Escort';

const EscortsPage: React.FC = () => {
  const navigate = useNavigate();
  const [escorts, setEscorts] = useState<Escort[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [showVerifiedOnly, setShowVerifiedOnly] = useState(false);
  const [sortOption, setSortOption] = useState('rating');
  
  // Simulate fetching data with a timeout
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Sample data
        const mockData: Escort[] = [
          {
            id: '1',
            name: 'Sofia',
            age: 28,
            gender: 'female',
            location: 'New York',
            rating: 4.9,
            reviewCount: 124,
            price: 250,
            tags: ['Luxury', 'Model', 'GFE'],
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2',
            isVerified: true,
            availableNow: true,
            responseRate: 98,
            description: 'Sophisticated and educated companion for elite gentlemen.',
            services: ['Dinner Date', 'Weekend Getaway', 'Cultural Events'],
            languages: ['English', 'Spanish', 'French']
          },
          {
            id: '2',
            name: 'Mia',
            age: 24,
            gender: 'female',
            location: 'Los Angeles',
            rating: 4.7,
            reviewCount: 89,
            price: 300,
            tags: ['Fitness', 'Yoga', 'Travel'],
            imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
            isVerified: true,
            availableNow: false,
            responseRate: 95,
            description: 'Fitness enthusiast and travel lover. Let\'s explore together.',
            services: ['Outdoor Adventures', 'Fitness Partner', 'Travel Companion'],
            languages: ['English', 'Portuguese']
          },
          {
            id: '3',
            name: 'Emma',
            age: 26,
            gender: 'female',
            location: 'Miami',
            rating: 4.8,
            reviewCount: 76,
            price: 280,
            tags: ['Beach', 'Dancing', 'Nightlife'],
            imageUrl: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e',
            isVerified: false,
            availableNow: true,
            responseRate: 92,
            description: 'Beach lover and dancing queen. Ready to make your Miami nights unforgettable.',
            services: ['Beach Days', 'Club Nights', 'Private Parties'],
            languages: ['English', 'Russian']
          },
          {
            id: '4',
            name: 'James',
            age: 32,
            gender: 'male',
            location: 'Chicago',
            rating: 4.6,
            reviewCount: 51,
            price: 320,
            tags: ['Gentleman', 'Business', 'Fine Dining'],
            imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d',
            isVerified: true,
            availableNow: false,
            responseRate: 97,
            description: 'Professional gentleman escort for business functions and social events.',
            services: ['Corporate Events', 'Fine Dining', 'Social Functions'],
            languages: ['English', 'German']
          },
          {
            id: '5',
            name: 'Olivia',
            age: 27,
            gender: 'female',
            location: 'London',
            rating: 4.9,
            reviewCount: 112,
            price: 400,
            tags: ['Elite', 'Fashion', 'International'],
            imageUrl: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
            isVerified: true,
            availableNow: true,
            responseRate: 99,
            description: 'International elite companion, fashion enthusiast, and art lover.',
            services: ['Fashion Events', 'Art Exhibitions', 'International Travel'],
            languages: ['English', 'French', 'Italian']
          },
          {
            id: '6',
            name: 'Alex',
            age: 29,
            gender: 'male',
            location: 'San Francisco',
            rating: 4.7,
            reviewCount: 68,
            price: 300,
            tags: ['Tech', 'Outdoors', 'Fitness'],
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
            isVerified: false,
            availableNow: true,
            responseRate: 94,
            description: 'Tech-savvy fitness enthusiast perfect for Silicon Valley events.',
            services: ['Tech Events', 'Hiking', 'Fitness Partner'],
            languages: ['English', 'Mandarin']
          }
        ];
        
        setEscorts(mockData);
      } catch (error) {
        console.error('Error fetching escorts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Filter escorts based on search criteria
  const filteredEscorts = escorts.filter(escort => {
    // Filter by search term
    if (searchTerm && !escort.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !escort.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return false;
    }
    
    // Filter by price range
    if (escort.price < priceRange[0] || escort.price > priceRange[1]) {
      return false;
    }
    
    // Filter by location
    if (selectedLocation && escort.location !== selectedLocation) {
      return false;
    }
    
    // Filter by service
    if (selectedService && !escort.services?.includes(selectedService)) {
      return false;
    }
    
    // Filter by verification status
    if (showVerifiedOnly && !escort.isVerified) {
      return false;
    }
    
    return true;
  });
  
  // Sort escorts based on selected option
  const sortedEscorts = [...filteredEscorts].sort((a, b) => {
    if (sortOption === 'price_low') {
      return a.price - b.price;
    } else if (sortOption === 'price_high') {
      return b.price - a.price;
    } else if (sortOption === 'rating') {
      return (b.rating || 0) - (a.rating || 0);
    } else {
      return 0;
    }
  });
  
  // Get unique locations
  const locations = [...new Set(escorts.map(escort => escort.location))].filter(Boolean);
  
  // Get unique services
  const services = [...new Set(escorts.flatMap(escort => escort.services || []))].filter(Boolean);
  
  return (
    <UnifiedLayout 
      title="Explore Escorts" 
      description="Find verified escorts in your area" 
      showBreadcrumbs
    >
      <div className="container mx-auto px-4 py-6">
        {/* Search bar and filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, services, or tags..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-2">
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Locations</SelectLabel>
                  <SelectItem value="">All Locations</SelectItem>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <Select value={selectedService} onValueChange={setSelectedService}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Services" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Services</SelectLabel>
                  <SelectItem value="">All Services</SelectItem>
                  {services.map(service => (
                    <SelectItem key={service} value={service}>{service}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Price Range</h4>
                    <div className="px-2">
                      <Slider
                        defaultValue={priceRange}
                        min={0}
                        max={1000}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="verified-only"
                      checked={showVerifiedOnly}
                      onChange={(e) => setShowVerifiedOnly(e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <label 
                      htmlFor="verified-only" 
                      className="text-sm flex items-center cursor-pointer"
                    >
                      <Shield className="h-3 w-3 mr-1 text-primary" />
                      Verified profiles only
                    </label>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="price_low">Price: Low to High</SelectItem>
                <SelectItem value="price_high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results count */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-muted-foreground">
            {loading ? 'Loading escorts...' : `${sortedEscorts.length} escorts found`}
          </p>
        </div>
        
        {/* Escort Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
            <p>Loading escorts...</p>
          </div>
        ) : sortedEscorts.length === 0 ? (
          <div className="text-center py-12">
            <p className="mb-4 text-muted-foreground">No escorts found matching your criteria.</p>
            <Button onClick={() => {
              setSearchTerm('');
              setPriceRange([0, 1000]);
              setSelectedLocation('');
              setSelectedService('');
              setShowVerifiedOnly(false);
            }}>
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedEscorts.map((escort) => (
              <Card key={escort.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img
                    src={escort.imageUrl}
                    alt={escort.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button variant="secondary" size="icon" className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  {escort.availableNow && (
                    <Badge className="absolute top-2 left-2 bg-green-600">
                      Available Now
                    </Badge>
                  )}
                  {escort.isVerified && (
                    <div className="absolute bottom-2 left-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1 text-xs font-medium">
                      <CheckCircle className="h-3 w-3 text-primary" />
                      Verified
                    </div>
                  )}
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="font-bold text-xl">
                      {escort.name}, {escort.age}
                    </CardTitle>
                    <div className="text-xl font-bold">${escort.price}</div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-3 w-3" /> {escort.location}
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{escort.rating}</span>
                      <span className="text-muted-foreground ml-1">({escort.reviewCount})</span>
                    </div>
                    <div className="text-sm flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {escort.responseRate}% response
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                    {escort.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1 mb-2">
                    {escort.tags?.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="secondary" className="font-normal">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between pt-0">
                  <Button variant="outline" className="flex-1 mr-2" asChild>
                    <Link to={`/messages?user=${escort.id}`}>
                      <MessageSquare className="mr-2 h-4 w-4" /> Message
                    </Link>
                  </Button>
                  <Button className="flex-1" onClick={() => navigate(`/escorts/${escort.id}`)}>
                    View Profile
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </UnifiedLayout>
  );
};

export default EscortsPage;
