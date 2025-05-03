
import React, { useState } from 'react';
import { UnifiedLayout } from '@/layouts';
import { MapPin, Users, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { hermes } from '@/core/Hermes';
import { toast } from '@/components/ui/use-toast';

const RouteSharePage: React.FC = () => {
  const [contacts, setContacts] = useState([
    { id: 1, name: 'Emergency Contact 1', phone: '+1 (555) 123-4567', active: true },
    { id: 2, name: 'Emergency Contact 2', phone: '+1 (555) 765-4321', active: false }
  ]);
  
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  
  const addContact = () => {
    if (newContact.name && newContact.phone) {
      setContacts([...contacts, { ...newContact, id: Date.now(), active: true }]);
      setNewContact({ name: '', phone: '' });
      toast({
        title: "Contact Added",
        description: `${newContact.name} has been added as an emergency contact.`
      });
    }
  };
  
  const toggleContact = (id: number) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, active: !contact.active } : contact
    ));
  };
  
  const activateRouteSharing = () => {
    // Log this interaction with Hermes
    hermes.enterSpatialFlow('user-123', 'safety-route-share');
    
    toast({
      title: "Route Sharing Activated",
      description: "Your selected contacts will now receive updates about your location."
    });
  };

  return (
    <UnifiedLayout>
      <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Route Sharing</h1>
          <p className="text-muted-foreground">
            Share your route with trusted contacts for additional safety during appointments.
          </p>
        </div>

        <Tabs defaultValue="contacts" className="mb-12">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="contacts">Emergency Contacts</TabsTrigger>
            <TabsTrigger value="settings">Sharing Settings</TabsTrigger>
            <TabsTrigger value="active">Active Sharing</TabsTrigger>
          </TabsList>
          
          <TabsContent value="contacts">
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contacts</CardTitle>
                <CardDescription>
                  Add and manage your emergency contacts who will receive route updates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contacts.map(contact => (
                    <div key={contact.id} className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.phone}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Switch 
                          checked={contact.active} 
                          onCheckedChange={() => toggleContact(contact.id)}
                        />
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-6 mt-6">
                    <h3 className="font-medium mb-4">Add New Contact</h3>
                    <div className="grid gap-4">
                      <div>
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name"
                          value={newContact.name}
                          onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                          placeholder="Contact name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone"
                          value={newContact.phone}
                          onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                          placeholder="Phone number"
                        />
                      </div>
                      <Button onClick={addContact}>Add Contact</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Sharing Settings</CardTitle>
                <CardDescription>
                  Configure how and when your route is shared with your emergency contacts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Automatic Sharing</h3>
                      <p className="text-sm text-muted-foreground">Automatically share your route during appointments</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Check-in Notifications</h3>
                      <p className="text-sm text-muted-foreground">Send periodic check-in prompts</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SOS Mode</h3>
                      <p className="text-sm text-muted-foreground">Allow one-tap emergency signal</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div>
                    <Label htmlFor="frequency">Check-in Frequency (minutes)</Label>
                    <Input id="frequency" type="number" defaultValue={30} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Route Sharing</CardTitle>
                <CardDescription>
                  Activate route sharing when you're heading to an appointment.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center space-y-6 py-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-1">Share Your Route</h3>
                    <p className="text-muted-foreground mb-6">
                      Your selected emergency contacts will receive updates about your location.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <Users className="h-6 w-6 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Active Contacts</span>
                      <span className="font-medium">{contacts.filter(c => c.active).length}</span>
                    </div>
                    
                    <div className="flex flex-col items-center p-4 border rounded-lg">
                      <Clock className="h-6 w-6 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <span className="font-medium">2 hours</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={activateRouteSharing}
                    className="w-full max-w-md"
                    size="lg"
                  >
                    <Send className="mr-2 h-4 w-4" /> 
                    Start Route Sharing
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UnifiedLayout>
  );
};

export default RouteSharePage;
