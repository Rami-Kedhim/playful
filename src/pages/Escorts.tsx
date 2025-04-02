
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import EscortCard from "@/components/cards/EscortCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Filter, SlidersHorizontal } from "lucide-react";

// Mock data
const escorts = [
  {
    id: "1",
    name: "Sophie",
    location: "New York",
    age: 24,
    rating: 4.9,
    reviews: 56,
    tags: ["GFE", "Massage", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 200,
    verified: true
  },
  {
    id: "2",
    name: "Isabella",
    location: "Miami",
    age: 26,
    rating: 4.7,
    reviews: 42,
    tags: ["Dinner Date", "Overnight", "Party"],
    imageUrl: "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 250,
    verified: true
  },
  {
    id: "3",
    name: "Mia",
    location: "Los Angeles",
    age: 23,
    rating: 4.8,
    reviews: 39,
    tags: ["Massage", "Party", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1567808291548-fc3ee04dbcf0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 180,
    verified: false
  },
  {
    id: "4",
    name: "Victoria",
    location: "Las Vegas",
    age: 25,
    rating: 4.9,
    reviews: 64,
    tags: ["GFE", "Dinner Date", "Fetish"],
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 300,
    verified: true
  },
  {
    id: "5",
    name: "Emma",
    location: "Chicago",
    age: 28,
    rating: 4.6,
    reviews: 37,
    tags: ["Massage", "Fetish", "Overnight"],
    imageUrl: "https://images.unsplash.com/photo-1515161318750-781d6122e367?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 220,
    verified: true
  },
  {
    id: "6",
    name: "Olivia",
    location: "San Francisco",
    age: 22,
    rating: 4.5,
    reviews: 29,
    tags: ["GFE", "Party", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 190,
    verified: true
  },
  {
    id: "7",
    name: "Ava",
    location: "Houston",
    age: 27,
    rating: 4.8,
    reviews: 45,
    tags: ["Massage", "Overnight", "Fetish"],
    imageUrl: "https://images.unsplash.com/photo-1467632499275-7a693a761056?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 270,
    verified: false
  },
  {
    id: "8",
    name: "Charlotte",
    location: "Miami",
    age: 24,
    rating: 4.7,
    reviews: 33,
    tags: ["GFE", "Dinner Date", "Travel"],
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    price: 230,
    verified: true
  }
];

// Service tags for filter
const services = [
  "GFE", "Massage", "Overnight", "Dinner Date", "Travel", "Party", "Fetish", "Domination", "Role Play"
];

const Escorts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  
  const toggleService = (service: string) => {
    setSelectedServices(prev => 
      prev.includes(service)
        ? prev.filter(s => s !== service)
        : [...prev, service]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setLocation("");
    setPriceRange([0, 500]);
    setVerifiedOnly(false);
    setSelectedServices([]);
  };
  
  // Filter escorts based on criteria
  const filteredEscorts = escorts.filter(escort => {
    const matchesSearch = escort.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = location ? escort.location.toLowerCase().includes(location.toLowerCase()) : true;
    const matchesPrice = escort.price >= priceRange[0] && escort.price <= priceRange[1];
    const matchesVerified = verifiedOnly ? escort.verified : true;
    const matchesServices = selectedServices.length > 0 
      ? selectedServices.some(service => escort.tags.includes(service))
      : true;
      
    return matchesSearch && matchesLocation && matchesPrice && matchesVerified && matchesServices;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Escorts Directory</h1>
          <Button 
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden"
          >
            <Filter size={18} className="mr-2" />
            Filters
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters sidebar - desktop */}
          <Card className="h-fit sticky top-20 hidden md:block">
            <CardHeader>
              <CardTitle>Filters</CardTitle>
              <CardDescription>Refine your search</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Search</label>
                <Input
                  placeholder="Search by name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="City or area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range (LC)</label>
                <div className="pt-2">
                  <Slider
                    value={priceRange}
                    min={0}
                    max={500}
                    step={10}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>{priceRange[0]} LC</span>
                    <span>{priceRange[1]} LC</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={verifiedOnly}
                  onCheckedChange={setVerifiedOnly}
                />
                <label className="text-sm font-medium">Verified only</label>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Services</label>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={`service-${service}`}
                        checked={selectedServices.includes(service)}
                        onCheckedChange={() => toggleService(service)}
                      />
                      <label 
                        htmlFor={`service-${service}`}
                        className="text-sm cursor-pointer"
                      >
                        {service}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Button 
                variant="outline" 
                onClick={clearFilters}
                className="w-full"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
          
          {/* Mobile filters */}
          {showFilters && (
            <div className="md:hidden">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Filters</CardTitle>
                  <CardDescription>Refine your search</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Same filter content as desktop */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <Input
                      placeholder="Search by name"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                      <Input
                        placeholder="City or area"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="pl-10 bg-background/50"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range (LC)</label>
                    <div className="pt-2">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={500}
                        step={10}
                        onValueChange={setPriceRange}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-400">
                        <span>{priceRange[0]} LC</span>
                        <span>{priceRange[1]} LC</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={verifiedOnly}
                      onCheckedChange={setVerifiedOnly}
                    />
                    <label className="text-sm font-medium">Verified only</label>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Services</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => (
                        <Badge
                          key={service}
                          variant={selectedServices.includes(service) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleService(service)}
                        >
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Clear Filters
                    </Button>
                    <Button 
                      onClick={() => setShowFilters(false)}
                      className="w-full"
                    >
                      Apply
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          {/* Main content */}
          <div className="lg:col-span-3">
            {/* Search and sort bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Search escorts..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="featured">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Applied filters */}
            {(searchQuery || location || verifiedOnly || selectedServices.length > 0 || priceRange[0] > 0 || priceRange[1] < 500) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {searchQuery && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Search: {searchQuery}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setSearchQuery("")}
                    />
                  </Badge>
                )}
                
                {location && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Location: {location}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setLocation("")}
                    />
                  </Badge>
                )}
                
                {(priceRange[0] > 0 || priceRange[1] < 500) && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    {priceRange[0]} - {priceRange[1]} LC
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setPriceRange([0, 500])}
                    />
                  </Badge>
                )}
                
                {verifiedOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Verified only
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setVerifiedOnly(false)}
                    />
                  </Badge>
                )}
                
                {selectedServices.map(service => (
                  <Badge key={service} variant="secondary" className="flex items-center gap-1">
                    {service}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => toggleService(service)}
                    />
                  </Badge>
                ))}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className="h-full ml-auto"
                >
                  Clear all
                </Button>
              </div>
            )}
            
            {/* Results */}
            <div className="mb-4">
              <p className="text-gray-400">
                Showing {filteredEscorts.length} escorts
              </p>
            </div>
            
            {filteredEscorts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEscorts.map(escort => (
                  <EscortCard key={escort.id} {...escort} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No escorts found matching your criteria.</p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
            
            {/* Pagination */}
            <div className="flex justify-center mt-8">
              <Button variant="outline" className="mx-1" disabled>Previous</Button>
              <Button variant="outline" className="mx-1 bg-primary text-primary-foreground hover:bg-primary/90">1</Button>
              <Button variant="outline" className="mx-1">2</Button>
              <Button variant="outline" className="mx-1">3</Button>
              <Button variant="outline" className="mx-1">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Escorts;
