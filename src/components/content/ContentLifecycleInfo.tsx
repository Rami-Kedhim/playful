
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, RefreshCw, MessageSquare, Calendar, AlertTriangle } from 'lucide-react';

interface ContentLifecycleInfoProps {
  className?: string;
}

const ContentLifecycleInfo: React.FC<ContentLifecycleInfoProps> = ({ className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Clock className="mr-2 h-5 w-5" /> 
          Content Lifecycle
        </CardTitle>
        <CardDescription>
          Understanding how content expiration works in Chronos System
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-medium">Creation &amp; Activity</h3>
              <p className="text-sm text-muted-foreground">
                All content starts with a 180-day active period from the date of upload or last interaction.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-2 rounded-full">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-medium">Expiration Warning</h3>
              <p className="text-sm text-muted-foreground">
                Content enters the "expiring soon" state when it's within 30 days of its expiration date.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">User Interaction Extension</h3>
              <p className="text-sm text-muted-foreground">
                Every time a user interacts with your content (views, messages, likes), the expiration date is automatically extended.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-full">
              <RefreshCw className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-medium">Manual Renewal</h3>
              <p className="text-sm text-muted-foreground">
                You can manually renew content using Lucoins at any time. Renewal costs vary based on content type and status.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground border-t pt-4">
        <span>Standard content: 1-2 LC</span>
        <span>Premium/Video: 2-3 LC</span>
      </CardFooter>
    </Card>
  );
};

export default ContentLifecycleInfo;
