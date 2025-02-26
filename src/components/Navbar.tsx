
import { Link, useNavigate, useLocation } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg overflow-hidden">
              <img 
                src="/lovable-uploads/e402eba6-49b6-40f0-9ded-438884d8a826.png" 
                alt="Digital Marketing Icon" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold">Suraj Poojari</span>
          </Link>
          <div className="space-x-6">
            <button 
              onClick={() => scrollToSection('hero')} 
              className="hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')} 
              className="hover:text-primary transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('blog')} 
              className="hover:text-primary transition-colors"
            >
              Blog
            </button>
            <button 
              onClick={() => scrollToSection('contact')} 
              className="hover:text-primary transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
