
import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import CreatorCard from "@/components/cards/CreatorCard";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock data
const creators = [
  {
    id: "1",
    name: "Crystal",
    username: "crystal_dreams",
    imageUrl: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: true,
    isPremium: true,
    subscriberCount: 12500,
    contentCount: {
      photos: 287,
      videos: 42
    },
    price: 9.99,
    isAI: false
  },
  {
    id: "2",
    name: "Luna",
    username: "luna_fantasy",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 8700,
    contentCount: {
      photos: 195,
      videos: 28
    },
    price: 12.99,
    isAI: true
  },
  {
    id: "3",
    name: "Emma",
    username: "emma_love",
    imageUrl: "https://images.unsplash.com/photo-1543207564-6b738b2a79d0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 5200,
    contentCount: {
      photos: 124,
      videos: 18
    },
    price: 7.99,
    isAI: false
  },
  {
    id: "4",
    name: "Jade",
    username: "jade_official",
    imageUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: true,
    isPremium: true,
    subscriberCount: 19800,
    contentCount: {
      photos: 342,
      videos: 56
    },
    price: 14.99,
    isAI: false
  },
  {
    id: "5",
    name: "Sophia",
    username: "sophia_xx",
    imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 7400,
    contentCount: {
      photos: 156,
      videos: 23
    },
    price: 8.99,
    isAI: true
  },
  {
    id: "6",
    name: "Olivia",
    username: "olivia_wild",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 10200,
    contentCount: {
      photos: 210,
      videos: 35
    },
    price: 11.99,
    isAI: false
  },
  {
    id: "7",
    name: "Mia",
    username: "mia_x_official",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: true,
    isPremium: true,
    subscriberCount: 15600,
    contentCount: {
      photos: 278,
      videos: 47
    },
    price: 13.99,
    isAI: false
  },
  {
    id: "8",
    name: "Bella",
    username: "bella_dreams",
    imageUrl: "https://images.unsplash.com/photo-1502323777036-f29e3972f5f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    isLive: false,
    isPremium: true,
    subscriberCount: 9300,
    contentCount: {
      photos: 189,
      videos: 32
    },
    price: 10.99,
    isAI: true
  }
];

// Content types for filter
const contentTypes = ["Photos", "Videos", "Live Streams"];

const Creators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [liveOnly, setLiveOnly] = useState(false);
  const [hideAI, setHideAI] = useState(false);
  const [selectedContentTypes, setSelectedContentTypes] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const isMobile = useIsMobile();
  
  const toggleContentType = (type: string) => {
    setSelectedContentTypes(prev => 
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setLiveOnly(false);
    setHideAI(false);
    setSelectedContentTypes([]);
    setPriceMax("all");
  };
  
  // Filter creators based on criteria
  const filteredCreators = creators.filter(creator => {
    const matchesSearch = 
      creator.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      creator.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLive = liveOnly ? creator.isLive : true;
    const matchesAI = hideAI ? !creator.isAI : true;
    const matchesPrice = priceMax === "all" ? true : 
      priceMax === "5" ? creator.price <= 5 :
      priceMax === "10" ? creator.price <= 10 :
      priceMax === "15" ? creator.price <= 15 :
      priceMax === "20" ? creator.price <= 20 : true;
      
    return matchesSearch && matchesLive && matchesAI && matchesPrice;
  });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Content Creators</h1>
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
                  placeholder="Search by name or username"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-background/50"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Price Range</label>
                <Select 
                  value={priceMax} 
                  onValueChange={setPriceMax}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prices</SelectItem>
                    <SelectItem value="5">Up to 5 LC</SelectItem>
                    <SelectItem value="10">Up to 10 LC</SelectItem>
                    <SelectItem value="15">Up to 15 LC</SelectItem>
                    <SelectItem value="20">Up to 20 LC</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Content Types</label>
                <div className="flex flex-wrap gap-2">
                  {contentTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={selectedContentTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleContentType(type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={liveOnly}
                  onCheckedChange={setLiveOnly}
                />
                <label className="text-sm font-medium">Live streaming now</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={hideAI}
                  onCheckedChange={setHideAI}
                />
                <label className="text-sm font-medium">Hide AI profiles</label>
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
                      placeholder="Search by name or username"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-background/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Price Range</label>
                    <Select 
                      value={priceMax} 
                      onValueChange={setPriceMax}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select price range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Prices</SelectItem>
                        <SelectItem value="5">Up to 5 LC</SelectItem>
                        <SelectItem value="10">Up to 10 LC</SelectItem>
                        <SelectItem value="15">Up to 15 LC</SelectItem>
                        <SelectItem value="20">Up to 20 LC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Content Types</label>
                    <div className="flex flex-wrap gap-2">
                      {contentTypes.map((type) => (
                        <Badge
                          key={type}
                          variant={selectedContentTypes.includes(type) ? "default" : "outline"}
                          className="cursor-pointer"
                          onClick={() => toggleContentType(type)}
                        >
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={liveOnly}
                      onCheckedChange={setLiveOnly}
                    />
                    <label className="text-sm font-medium">Live streaming now</label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={hideAI}
                      onCheckedChange={setHideAI}
                    />
                    <label className="text-sm font-medium">Hide AI profiles</label>
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
                  placeholder="Search creators..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select defaultValue="trending">
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trending">Trending</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Applied filters */}
            {(searchQuery || liveOnly || hideAI || selectedContentTypes.length > 0 || priceMax !== "all") && (
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
                
                {priceMax !== "all" && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Up to {priceMax} LC
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setPriceMax("all")}
                    />
                  </Badge>
                )}
                
                {selectedContentTypes.map(type => (
                  <Badge key={type} variant="secondary" className="flex items-center gap-1">
                    {type}
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => toggleContentType(type)}
                    />
                  </Badge>
                ))}
                
                {liveOnly && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    Live only
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setLiveOnly(false)}
                    />
                  </Badge>
                )}
                
                {hideAI && (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    No AI profiles
                    <X 
                      size={14} 
                      className="cursor-pointer" 
                      onClick={() => setHideAI(false)}
                    />
                  </Badge>
                )}
                
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
                Showing {filteredCreators.length} creators
              </p>
            </div>
            
            {filteredCreators.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreators.map(creator => (
                  <CreatorCard key={creator.id} {...creator} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-400 mb-4">No creators found matching your criteria.</p>
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

export default Creators;
