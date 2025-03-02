
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, LayoutDashboard } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-muted/50 to-background p-4">
      <div className="text-center max-w-md p-8 bg-white rounded-lg shadow-lg border border-gray-100 animate-fade-in">
        <div className="rounded-full bg-red-50 w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <h1 className="text-4xl font-bold text-red-500">404</h1>
        </div>
        <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          The page "{location.pathname}" doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <Link to="/admin-dashboard-8492">
            <Button variant="outline" className="w-full sm:w-auto flex items-center gap-2">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Button>
          </Link>
        </div>
        <Button
          variant="ghost" 
          className="mt-4 text-sm text-muted-foreground flex items-center gap-1 mx-auto"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="h-3 w-3" />
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
