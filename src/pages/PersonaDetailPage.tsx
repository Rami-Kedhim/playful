
import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';

const PersonaDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Persona Details</h1>
        <p className="text-muted-foreground">Viewing persona ID: {id}</p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <p>Detailed information about this persona will be displayed here.</p>
          <p>This page is under development as part of the system architecture cleanup.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonaDetailPage;
