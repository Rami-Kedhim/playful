
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Messages = () => {
  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p>Messages placeholder - not implemented yet</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
