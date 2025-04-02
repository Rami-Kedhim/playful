
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, DollarSign } from "lucide-react";

interface EscortServiceLinkProps {
  creatorName: string;
  escortId: string;
  hourlyRate: number;
  location: string;
}

const EscortServiceLink = ({ creatorName, escortId, hourlyRate, location }: EscortServiceLinkProps) => {
  return (
    <Card className="border-primary/30 bg-gradient-to-br from-card to-primary-900/10">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-primary" />
              In-Person Services
            </CardTitle>
            <CardDescription>
              {creatorName} is also available for in-person meetings
            </CardDescription>
          </div>
          <Badge className="bg-primary">Escort Services</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center p-2 bg-secondary/40 rounded-md">
            <MapPin className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{location}</span>
          </div>
          <div className="flex items-center p-2 bg-secondary/40 rounded-md">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            <span className="text-sm">{hourlyRate} LC/hr</span>
          </div>
        </div>
        <Link to={`/escorts/${escortId}`}>
          <Button className="w-full">
            <Calendar className="mr-2 h-4 w-4" />
            Book In-Person
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default EscortServiceLink;
