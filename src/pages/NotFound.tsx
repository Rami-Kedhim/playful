
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const NotFound = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>404 - Not Found</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p>The page you are looking for does not exist.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
