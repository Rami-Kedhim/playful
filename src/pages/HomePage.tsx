
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/layouts/Layout';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { useTitle } from '@/hooks/useTitle';
import { Shield, Heart, MessageSquare, Video, Image, Brain, Star } from 'lucide-react';

const HomePage: React.FC = () => {
  useTitle("UberEscorts | AI-Powered Escort Platform");
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to UberEscorts
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
            The premium AI-powered platform for escorts, content creators, and live cams
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link to="/escorts">Browse Escorts</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg">
              <Link to="/auth">Join Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-accent/50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Platform Features
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Safety First</CardTitle>
                <CardDescription>
                  Advanced verification system and safety features for peace of mind
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <Link to="/safety">Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Powered</CardTitle>
                <CardDescription>
                  Intelligent matching and content generation powered by our advanced AI
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <Link to="/media-generation">Try AI Generator</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Secure Messaging</CardTitle>
                <CardDescription>
                  Private and encrypted communication with verified providers
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant="ghost" asChild>
                  <Link to="/messages">View Messages</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Services
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <div className="h-full w-full bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                    <Heart className="h-12 w-12 text-primary/50" />
                  </div>
                </div>
                <CardTitle>Escorts</CardTitle>
                <CardDescription>
                  Connect with verified escorts in your area
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                  <li>Advanced verification system</li>
                  <li>Secure booking process</li>
                  <li>Safety features</li>
                  <li>Real reviews</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/escorts">Browse Escorts</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <div className="h-full w-full bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                    <Star className="h-12 w-12 text-primary/50" />
                  </div>
                </div>
                <CardTitle>Content Creators</CardTitle>
                <CardDescription>
                  Subscribe to premium adult content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                  <li>Exclusive photos and videos</li>
                  <li>Custom content requests</li>
                  <li>Direct messaging</li>
                  <li>Subscription plans</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/creators">Browse Creators</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="mb-4 aspect-video rounded-lg overflow-hidden bg-gray-800">
                  <div className="h-full w-full bg-gradient-to-r from-primary/20 to-primary/5 flex items-center justify-center">
                    <Video className="h-12 w-12 text-primary/50" />
                  </div>
                </div>
                <CardTitle>Live Cams</CardTitle>
                <CardDescription>
                  Watch live streams and interact in real-time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                  <li>HD streaming</li>
                  <li>Interactive features</li>
                  <li>Private sessions</li>
                  <li>Tip system</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/livecams">Watch Live</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section className="py-12 bg-accent/50 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            AI-Powered Features
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Image className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>AI Media Generator</CardTitle>
                <CardDescription>
                  Create custom AI-generated images using advanced models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Our AI image generator allows you to create custom images for your profile or content, 
                  using advanced neural networks trained on millions of high-quality photos.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/media-generation">Try It Now</Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Lucie AI Assistant</CardTitle>
                <CardDescription>
                  Your personal AI assistant for a better platform experience
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Lucie is our advanced AI assistant that can help you navigate the platform,
                  find escorts that match your preferences, and answer any questions you might have.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link to="/lucie">Chat with Lucie</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join thousands of users on the world's most advanced escort platform.
          </p>
          <Button asChild size="lg" className="text-lg">
            <Link to="/auth">Create Account</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
