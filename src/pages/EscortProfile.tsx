
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const EscortProfile = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Escort Profile: {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p>Escort Profile placeholder - not implemented yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EscortProfile;
