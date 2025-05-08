
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserProfile } from '@/types/user';

interface ServicesTabProps {
  profile: UserProfile;
}

const ServicesTab: React.FC<ServicesTabProps> = ({ profile }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.services && profile.services.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.services.map((service, index) => (
                <Badge key={index} variant="secondary">
                  {service}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No services have been specified.</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Languages</CardTitle>
        </CardHeader>
        <CardContent>
          {profile.languages && profile.languages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {profile.languages.map((language, index) => (
                <Badge key={index} variant="outline">
                  {language}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">No languages have been specified.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServicesTab;
