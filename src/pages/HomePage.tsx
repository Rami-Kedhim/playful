
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to UberEscorts</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The premier platform for escorts, content creators, and clients to connect safely and securely.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">Platform Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>AI-Enhanced Platform</CardTitle>
              <CardDescription>
                Powered by Lucie, Hermes, and Orus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Our advanced AI systems help you connect, boost visibility, and maintain security across the platform.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/enhanced-ai">
                <Button variant="outline">Try Enhanced AI</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Generate Content</CardTitle>
              <CardDescription>
                AI-powered content creation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Create compelling descriptions, captions, and more with our AI generation tools.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/generate">
                <Button variant="outline">Create Content</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Media Generation</CardTitle>
              <CardDescription>
                Generate images tailored for adult content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Use our specialized media generation tools to create high-quality visuals.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/media-generation">
                <Button variant="outline">Generate Media</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>
      
      <section className="text-center">
        <h2 className="text-2xl font-bold mb-6">Experience Our Ecosystem</h2>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/nsfw-image-generator">
            <Button>NSFW Image Generator</Button>
          </Link>
          <Link to="/lucie-talk">
            <Button variant="outline">Chat with Lucie</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
