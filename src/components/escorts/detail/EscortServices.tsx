
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sparkles, Star, CheckCheck, Clock, DollarSign, Info, Calendar } from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import useEscortServices from "@/hooks/escort/useEscortServices";
import useWallet from "@/hooks/useWallet";
import { useToast } from "@/components/ui/use-toast";

interface EscortServicesProps {
  escortId: string;
  escortName?: string;
  tags: string[];
}

const EscortServices: React.FC<EscortServicesProps> = ({ 
  escortId, 
  escortName = "Escort",
  tags 
}) => {
  const { services, categories, loading } = useEscortServices(escortId);
  const { balance, addFunds } = useWallet();
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  const handleBookNow = (serviceId: string, serviceName: string, price: number) => {
    if (balance < price) {
      toast({
        title: "Insufficient Balance",
        description: `You need more credits to book this service. Would you like to add funds?`,
        action: (
          <Button variant="outline" size="sm" onClick={() => addFunds(price - balance)}>
            Add Funds
          </Button>
        ),
      });
      return;
    }
    
    // Set the selected service
    setSelectedService(serviceId);
    
    // Show booking confirmation
    toast({
      title: "Service Reserved",
      description: `You've reserved ${serviceName} with ${escortName}. Check your bookings for details.`,
      variant: "success",
    });
  };
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="h-8 bg-muted rounded animate-pulse mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-muted rounded animate-pulse"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (services.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <div className="flex flex-col items-center py-3">
            <Sparkles className="text-primary h-5 w-5 mb-2" />
            <p className="text-sm text-muted-foreground">Service details coming soon</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // Group services by popular, standard, and premium
  const popularServices = services.filter(service => service.isPopular);
  const availableServices = services.filter(service => service.isAvailable);
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Available Services</CardTitle>
          <Badge variant="outline" className="px-2">
            {services.length} Options
          </Badge>
        </div>
        <CardDescription>
          Select from a range of exclusive services
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="available">Available Now</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>
          
          {/* All Services Tab */}
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <ServiceCard 
                  key={service.id}
                  service={service}
                  isSelected={selectedService === service.id}
                  onBook={() => handleBookNow(service.id, service.name, service.price)}
                />
              ))}
            </div>
          </TabsContent>
          
          {/* Popular Services Tab */}
          <TabsContent value="popular" className="space-y-4">
            {popularServices.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground">
                No popular services available at this time.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {popularServices.map((service) => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    isSelected={selectedService === service.id}
                    onBook={() => handleBookNow(service.id, service.name, service.price)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Available Now Tab */}
          <TabsContent value="available" className="space-y-4">
            {availableServices.length === 0 ? (
              <div className="text-center p-6 text-muted-foreground">
                No services available at this time.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableServices.map((service) => (
                  <ServiceCard 
                    key={service.id}
                    service={service}
                    isSelected={selectedService === service.id}
                    onBook={() => handleBookNow(service.id, service.name, service.price)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Accordion type="single" collapsible className="w-full">
              {categories.map((category) => (
                <AccordionItem key={category.id} value={category.id}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center">
                      <h3 className="font-medium">{category.name}</h3>
                      <Badge className="ml-2 bg-secondary text-secondary-foreground">
                        {category.services.length}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      {category.services.map((service) => (
                        <ServiceCard 
                          key={service.id}
                          service={service}
                          isSelected={selectedService === service.id}
                          onBook={() => handleBookNow(service.id, service.name, service.price)}
                        />
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface ServiceCardProps {
  service: {
    id: string;
    name: string;
    description: string;
    price: number;
    duration: string;
    category: string;
    isPopular?: boolean;
    isAvailable?: boolean;
  };
  isSelected?: boolean;
  onBook: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isSelected, onBook }) => {
  return (
    <Card className={`overflow-hidden transition-all hover:border-primary/50 ${
      isSelected ? 'border-primary border-2' : ''
    }`}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-md flex items-center">
            {service.name}
            {service.isPopular && (
              <Badge variant="secondary" className="ml-2 bg-amber-100 text-amber-900 border-amber-300">
                <Star className="h-3 w-3 mr-1 fill-amber-500 text-amber-500" />
                Popular
              </Badge>
            )}
          </h3>
          {service.isAvailable && (
            <Badge variant="outline" className="bg-green-50 text-green-900 border-green-200">
              <CheckCheck className="h-3 w-3 mr-1" />
              Available
            </Badge>
          )}
        </div>
        
        <p className="text-sm text-muted-foreground mb-4">
          {service.description}
        </p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center text-sm bg-secondary/40 p-2 rounded-md">
            <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
            {service.duration}
          </div>
          <div className="flex items-center text-sm bg-secondary/40 p-2 rounded-md">
            <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
            {service.price} LC
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Button variant="outline" size="sm" className="gap-1">
            <Info className="h-4 w-4" />
            <span>Details</span>
          </Button>
          <Button onClick={onBook} className="gap-1">
            <Calendar className="h-4 w-4" />
            <span>Book Now</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EscortServices;
