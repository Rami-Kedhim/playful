import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

import FilterSidebar from "@/components/escorts/FilterSidebar";
import MobileFilterCard from "@/components/escorts/MobileFilterCard";
import SearchBar from "@/components/escorts/SearchBar";
import AppliedFilters from "@/components/escorts/AppliedFilters";
import EscortResults from "@/components/escorts/EscortResults";

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
          <div className="h-fit sticky top-20 hidden md:block">
            <FilterSidebar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={location}
              setLocation={setLocation}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              selectedServices={selectedServices}
              toggleService={toggleService}
              services={services}
              clearFilters={clearFilters}
            />
          </div>
          
          {showFilters && (
            <div className="md:hidden">
              <MobileFilterCard 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                location={location}
                setLocation={setLocation}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                verifiedOnly={verifiedOnly}
                setVerifiedOnly={setVerifiedOnly}
                selectedServices={selectedServices}
                toggleService={toggleService}
                services={services}
                clearFilters={clearFilters}
                setShowFilters={setShowFilters}
              />
            </div>
          )}
          
          <div className="lg:col-span-3">
            <SearchBar 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            
            <AppliedFilters 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              location={location}
              setLocation={setLocation}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              verifiedOnly={verifiedOnly}
              setVerifiedOnly={setVerifiedOnly}
              selectedServices={selectedServices}
              toggleService={toggleService}
              clearFilters={clearFilters}
            />
            
            <EscortResults 
              escorts={filteredEscorts}
              clearFilters={clearFilters}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Escorts;
