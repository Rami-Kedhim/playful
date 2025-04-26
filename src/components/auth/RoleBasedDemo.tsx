
import React from 'react';
import RoleBasedContent from './RoleBasedContent';
import { useRole } from '@/hooks/auth/useRole';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Shield } from 'lucide-react';

const RoleBasedDemo = () => {
  const { highestRole, isAdmin, isModerator } = useRole();

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Role-Based Content Demo</h2>
      
      <div className="mb-4">
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Current Role Status</AlertTitle>
          <AlertDescription>
            Your highest role is: {highestRole}
          </AlertDescription>
        </Alert>
      </div>

      <RoleBasedContent
        allowedRoles={['admin']}
        fallback={<p className="text-muted-foreground">Admin-only content hidden</p>}
      >
        <div className="p-4 border rounded bg-red-50 dark:bg-red-900/10">
          <h3 className="font-bold">Admin Only Section</h3>
          <p>This content is only visible to administrators.</p>
        </div>
      </RoleBasedContent>

      <RoleBasedContent allowedRoles={['admin', 'moderator']}>
        <div className="p-4 border rounded bg-blue-50 dark:bg-blue-900/10">
          <h3 className="font-bold">Admin & Moderator Section</h3>
          <p>This content is visible to both admins and moderators.</p>
        </div>
      </RoleBasedContent>

      {/* Example of conditional rendering using role utilities */}
      {(isAdmin || isModerator) && (
        <div className="p-4 border rounded bg-green-50 dark:bg-green-900/10">
          <h3 className="font-bold">Staff Controls</h3>
          <p>Additional controls for staff members.</p>
        </div>
      )}
    </div>
  );
};

export default RoleBasedDemo;
