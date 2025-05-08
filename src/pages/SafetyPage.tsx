
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, Bell, Clock, Users, CheckCircle } from 'lucide-react';
import { AppPaths } from '@/routes/routeConfig';

const SafetyPage: React.FC = () => {
  const safetyFeatures = [
    {
      title: "Route Sharing",
      description: "Share your travel route with trusted contacts for enhanced safety during appointments",
      icon: <MapPin className="h-8 w-8 text-primary" />,
      link: "/safety/route-share"
    },
    {
      title: "Emergency Alerts",
      description: "Send immediate alerts to emergency contacts with your location data",
      icon: <Bell className="h-8 w-8 text-primary" />,
      link: "#emergency-alerts"
    },
    {
      title: "Check-in Timer",
      description: "Set automatic check-in times that will notify contacts if missed",
      icon: <Clock className="h-8 w-8 text-primary" />,
      link: "#check-in"
    },
    {
      title: "Verified Users",
      description: "Connect with verified users who have completed our identity verification process",
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      link: "#verified"
    },
    {
      title: "Community Guidelines",
      description: "Our platform's rules and safety guidelines for all users",
      icon: <Users className="h-8 w-8 text-primary" />,
      link: AppPaths.GUIDELINES
    },
    {
      title: "Safety Center",
      description: "Learn about all our safety features and how to use them effectively",
      icon: <Shield className="h-8 w-8 text-primary" />,
      link: "#safety-center"
    }
  ];

  return (
    <Layout
      title="Safety"
      description="Your safety is our top priority - explore our safety tools and features"
      showBreadcrumbs
    >
      <div className="mb-8">
        <div className="bg-gradient-to-r from-primary/30 to-accent/20 p-6 rounded-lg mb-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/10 p-5 rounded-full">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">UberEscorts Safety System</h2>
              <p className="text-muted-foreground max-w-2xl">
                Our comprehensive safety system is designed to provide protection and peace of mind for all users. 
                From route sharing to emergency alerts, we offer tools to keep you safe at every step.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {safetyFeatures.map((feature, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link to={feature.link}>
                <Button variant="outline" className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Emergency Resources</CardTitle>
          <CardDescription>Important contacts and resources for emergency situations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-bold">Emergency Services</h3>
            <p className="text-muted-foreground">For immediate danger or emergencies, call 911 (US) or your local emergency number</p>
          </div>
          
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold">National Sexual Assault Hotline</h3>
            <p className="text-muted-foreground">1-800-656-HOPE (4673) - Available 24/7</p>
          </div>
          
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold">Platform Support</h3>
            <p className="text-muted-foreground">
              Our safety team is available 24/7 for urgent matters at <span className="font-medium">safety@uberescorts.com</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </Layout>
  );
};

export default SafetyPage;
