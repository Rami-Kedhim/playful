
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/ui/container';

const NotFoundPage: React.FC = () => {
  return (
    <Container className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Button asChild size="lg">
        <Link to="/">Return to Home</Link>
      </Button>
    </Container>
  );
};

export default NotFoundPage;
