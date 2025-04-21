
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const LivecamDetail = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Livecam Detail: {id}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p>Livecam Detail placeholder - not implemented yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivecamDetail;
