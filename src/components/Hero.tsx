
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

export const Hero = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="min-h-[calc(100vh-5rem)] flex items-center justify-center relative px-4">
      <div className="max-w-4xl mx-auto text-center reveal">
        <span className="text-primary inline-block px-4 py-2 rounded-full bg-primary/10 mb-6">
          Digital Marketing Expert
        </span>
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Transforming Brands Through Digital Innovation
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          I help businesses grow their digital presence through strategic marketing solutions and data-driven campaigns.
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/portfolio">
            <Button size="lg">View Portfolio</Button>
          </Link>
          <Button variant="outline" size="lg" onClick={() => {
            const element = document.getElementById('contact');
            element?.scrollIntoView({ behavior: 'smooth' });
          }}>Contact Me</Button>
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
