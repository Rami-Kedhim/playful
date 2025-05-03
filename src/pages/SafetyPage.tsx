
import React from 'react';
import MainLayout from '@/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Share2, Bell, LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

const SafetyPage = () => {
  return (
    <MainLayout
      title="Safety Center"
      description="Comprehensive safety features and resources for your peace of mind"
      showBreadcrumbs
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5 text-primary" />
              Route Sharing
            </CardTitle>
            <CardDescription>
              Share your travel plans with trusted contacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Let trusted friends or family know where you're going and when you expect to arrive. Get notified if something seems off.</p>
            <Button asChild>
              <Link to="/share">Share Your Route</Link>
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Emergency Alerts
            </CardTitle>
            <CardDescription>
              Quick access to emergency services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Set up emergency contacts and quick access alerts for immediate help if you ever feel unsafe.</p>
            <Button variant="outline">Configure Alerts</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Verification System
            </CardTitle>
            <CardDescription>
              How we verify our users and service providers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Learn about our comprehensive verification process to ensure all users on our platform are legitimate and meet our safety standards.</p>
            <Button variant="outline">Learn More</Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LockKeyhole className="h-5 w-5 text-primary" />
              Privacy Settings
            </CardTitle>
            <CardDescription>
              Control your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Manage what information is visible to others and control how your data is used across the platform.</p>
            <Button variant="outline">Privacy Settings</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default SafetyPage;
