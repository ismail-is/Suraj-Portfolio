
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-xl font-bold text-white">SP</span>
            </div>
            <span className="text-xl font-bold">Suraj Poojari</span>
          </Link>
          <div className="space-x-6">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <Link to="#services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="#contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
