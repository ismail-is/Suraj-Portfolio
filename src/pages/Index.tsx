
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Blog } from "@/components/Blog";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if there's a section to scroll to from navigation
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      element?.scrollIntoView({ behavior: 'smooth' });
      // Clear the state after scrolling
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </>
  );
};

export default Index;
