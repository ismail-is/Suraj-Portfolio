
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative px-4 py-16 md:py-0 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-4xl mx-auto text-center reveal">
        <span className="text-primary inline-block px-4 py-2 rounded-full bg-primary/10 mb-6 text-sm md:text-base">
          Digital Marketing Expert
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight leading-tight">
          Transforming Brands Through Digital Innovation
        </h1>
        <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          I help businesses grow their digital presence through strategic marketing solutions and data-driven campaigns.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/portfolio" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto">View Portfolio</Button>
          </Link>
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto"
          >
            Contact Me
          </Button>
        </div>
      </div>
      <button 
        onClick={scrollToServices}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        aria-label="Scroll to services"
      >
        <ChevronDown className="h-8 w-8 text-muted-foreground" />
      </button>
    </section>
  );
};
