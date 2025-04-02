
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <MainLayout containerClass="min-h-[80vh] flex flex-col items-center justify-center" showHeader={false}>
      <h1 className="text-6xl font-bold bg-gradient-to-r from-primary to-lucoin bg-clip-text text-transparent mb-6">
        404
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Button asChild>
        <Link to="/">Return to Home</Link>
      </Button>
    </MainLayout>
  );
};

export default NotFound;
