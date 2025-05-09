
import React, { useState } from 'react';
import { Escort } from '@/types/Escort';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gallery, ImageGallery } from "@/components/ui/gallery";
import { MapPin, Phone, Calendar, DollarSign, Star, Shield } from "lucide-react";
import EscortProfile from './detail/EscortProfile';
import ProfileTabs from './detail/ProfileTabs';
import ProfileActions from './detail/ProfileActions';

interface EscortDetailViewProps {
  escort: Escort;
  onBookNow: () => void;
  onMessage: () => void;
  onShare: () => void;
}

const EscortDetailView: React.FC<EscortDetailViewProps> = ({
  escort,
  onBookNow,
  onMessage,
  onShare
}) => {
  const [activeTab, setActiveTab] = useState('gallery');
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <EscortProfile escort={escort} />
        
        <div className="mt-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="rates">Rates</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gallery">
              <Card>
                <CardContent className="p-4">
                  <Gallery>
                    {(escort.images || []).map((image, index) => (
                      <ImageGallery key={index} src={image} alt={`${escort.name} - Photo ${index + 1}`} />
                    ))}
                  </Gallery>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rates">
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-lg font-medium mb-4">Rates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {escort.rates?.hourly && (
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>1 Hour</span>
                        <span className="font-semibold">${escort.rates.hourly}</span>
                      </div>
                    )}
                    {escort.rates?.twoHour && (
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>2 Hours</span>
                        <span className="font-semibold">${escort.rates.twoHour}</span>
                      </div>
                    )}
                    {escort.rates?.overnight && (
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Overnight</span>
                        <span className="font-semibold">${escort.rates.overnight}</span>
                      </div>
                    )}
                    {escort.rates?.weekend && (
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Weekend</span>
                        <span className="font-semibold">${escort.rates.weekend}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Reviews</h3>
                    <div className="flex items-center">
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-semibold">{escort.rating?.toFixed(1) || "N/A"}</span>
                      <span className="text-muted-foreground ml-1">
                        ({escort.reviewCount || 0} {escort.reviewCount === 1 ? 'review' : 'reviews'})
                      </span>
                    </div>
                  </div>
                  
                  {/* Review list would go here */}
                  <div className="text-center py-8 text-muted-foreground">
                    No reviews available yet
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <ProfileTabs escort={escort} />
      </div>
      
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{escort.name}</h2>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-sm text-muted-foreground">{escort.location}</span>
              </div>
            </div>
            
            {escort.price && (
              <div className="flex items-center justify-center p-4 bg-secondary/30 rounded-lg mb-6">
                <DollarSign className="h-5 w-5 text-primary mr-1" />
                <span className="text-xl font-semibold">${escort.price}</span>
                <span className="text-muted-foreground ml-1">/ hour</span>
              </div>
            )}
            
            <ProfileActions 
              escort={escort}
              onBookingOpen={onBookNow}
              onMessageOpen={onMessage}
              onShareOpen={onShare}
            />
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center mb-3">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-medium">Contact Availability</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Available for contact between 10 AM - 10 PM
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center mb-3">
                <Calendar className="h-4 w-4 mr-2" />
                <span className="font-medium">Booking Notice</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Please book at least 2 hours in advance
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center mb-3">
                <Shield className="h-4 w-4 mr-2" />
                <span className="font-medium">Security & Trust</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your privacy and security are our top priorities. All communications and bookings are confidential.
              </p>
              
              <Button variant="outline" className="w-full mt-4">
                Report an Issue
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EscortDetailView;
