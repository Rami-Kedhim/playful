
# Role-Based Components

This document outlines the role-based components available in the system and provides guidance on their usage.

## Components

### RoleBasedContent

A component for conditionally rendering content based on user roles. Unlike `RoleGuard`, this doesn't handle navigation - it just manages content visibility.

```tsx
import { RoleBasedContent } from '@/components/auth/RoleBasedContent';

// Only render for admins, show fallback for others
<RoleBasedContent 
  allowedRoles={['admin']} 
  fallback={<p>You need admin access to view this content</p>}
>
  <AdminPanel />
</RoleBasedContent>

// Only render for admins and moderators, render nothing for others
<RoleBasedContent allowedRoles={['admin', 'moderator']}>
  <StaffControls />
</RoleBasedContent>
```

### RoleGuard

A route component that restricts access based on user roles, redirecting unauthorized users to a login or unauthorized page.

```tsx
import { RoleGuard } from '@/components/auth/RoleGuard';

// Protect a section of the UI
<RoleGuard 
  allowedRoles={['admin']}
  redirectTo="/access-denied"
  fallback={<AccessDeniedMessage />}
>
  <AdminDashboard />
</RoleGuard>
```

### RoleBasedRoute

A route component for protecting routes based on user roles within React Router.

```tsx
import { RoleBasedRoute } from '@/components/auth/RoleBasedRoute';

// In your route configuration:
<Route 
  path="/admin"
  element={
    <RoleBasedRoute allowedRoles={['admin']}>
      <AdminPage />
    </RoleBasedRoute>
  }
/>
```

## Hooks

### useRole

A hook that provides role-related utilities.

```tsx
import { useRole } from '@/hooks/auth/useRole';

const MyComponent = () => {
  const { 
    hasRole,           // Check if user has a specific role
    hasAnyRole,        // Check if user has any of the specified roles
    hasAllRoles,       // Check if user has all specified roles
    roles,             // Array of user roles
    isAdmin,           // Boolean shortcut for admin role
    isModerator,       // Boolean shortcut for moderator role
    isCreator,         // Boolean shortcut for creator role
    isEscort,          // Boolean shortcut for escort role
    isUser,            // Boolean shortcut for user role
    highestRole,       // The user's highest role based on hierarchy
    getRoleLevel       // Get the numeric level of a role
  } = useRole();
  
  // Usage examples
  if (hasRole('admin')) {
    // Show admin controls
  }
  
  if (hasAnyRole(['admin', 'moderator'])) {
    // Show staff controls
  }
  
  return (
    <div>
      <p>Your role: {highestRole}</p>
      {isAdmin && <AdminPanel />}
    </div>
  );
};
```

## Best Practices

1. **Use the right component for the job**:
   - Use `RoleBasedContent` for UI elements within a page
   - Use `RoleGuard` for protecting sections of your application
   - Use `RoleBasedRoute` in your routing configuration

2. **Provide meaningful fallbacks**: When a user doesn't have access, show helpful information rather than just hiding content.

3. **Keep role checks simple**: Use the provided utilities (`isAdmin`, `hasAnyRole`, etc.) for cleaner code.

4. **Consider role hierarchy**: The system has a built-in role hierarchy (admin > moderator > creator > escort > user).
