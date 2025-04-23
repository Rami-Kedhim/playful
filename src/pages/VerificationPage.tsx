
import React from 'react';
import { useAuth } from "@/hooks/auth";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const VerificationPage = () => {
  const { user } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold">Verification Page</h1>
        {user ? (
          <div>
            <p>Welcome, {user.email}!</p>
            <Link to="/verification/form">
              <Button>Go to Verification Form</Button>
            </Link>
          </div>
        ) : (
          <p>Please log in to access the verification form.</p>
        )}
      </div>
    </div>
  );
};

export default VerificationPage;
