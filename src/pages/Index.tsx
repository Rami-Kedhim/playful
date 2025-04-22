
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Home, 
  Users, 
  Video, 
  ShoppingCart,
  Settings,
  Box, 
  UserPlus, 
  MessageCircle, 
  Wallet 
} from 'lucide-react';

const Index = () => {
  return (
    <MainLayout>
      <div className="flex-1 space-y-12 p-8 pt-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Welcome to the App</h1>
          <p className="text-muted-foreground">
            Browse the available sections and features.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Home className="h-5 w-5" />
              <CardTitle className="text-lg">Home</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Access the main dashboard and overview of the platform.</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/home">Go to Home</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Users className="h-5 w-5" />
              <CardTitle className="text-lg">Profiles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Browse user profiles and connect with others.</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/profiles">View Profiles</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Video className="h-5 w-5" />
              <CardTitle className="text-lg">Livecams</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Watch and interact with live video streams.</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/livecams">Watch Livecams</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Box className="h-5 w-5" />
              <CardTitle className="text-lg">Virtual World</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Enter the immersive 3D virtual world experience.</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/virtualworld">Enter World</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <CardTitle className="text-lg">Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">View your conversations and chat with others.</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/messages">Open Messages</Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center gap-2">
              <Wallet className="h-5 w-5" />
              <CardTitle className="text-lg">Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">Manage your virtual currency and transactions.</p>
              <Button asChild className="mt-4 w-full">
                <Link to="/wallet">Open Wallet</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
