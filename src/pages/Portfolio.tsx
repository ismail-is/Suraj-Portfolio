
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useContent } from "@/context/ContentContext";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { VideoProject, PostProject } from "@/components/portfolio/ProjectTypes";
import { ContentProvider } from "@/context/ContentContext";

// Create a wrapper component that has the ContentProvider
const PortfolioContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the content context to access shared content
  const { videos, posts, isLoading: contentLoading } = useContent();

  useEffect(() => {
    // Use the loading state from the context, with a short delay to prevent layout shifts
    const timer = setTimeout(() => {
      setIsLoading(contentLoading);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [contentLoading]);
  
  const postProjects: PostProject[] = posts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    category: "post"
  }));
  
  const videoProjects: VideoProject[] = videos.map(video => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    category: "video",
    isShort: video.isShort || false
  }));

  return (
    <>
      <Navbar />
      <main className="pt-16 md:pt-20 pb-10 md:pb-12">
        <AboutSection />
        <ProjectsSection 
          isLoading={isLoading}
          videoProjects={videoProjects}
          postProjects={postProjects}
        />
      </main>
      <Footer />
    </>
  );
};

// Wrap the PortfolioContent with ContentProvider to ensure context is available
const Portfolio = () => {
  return (
    <ContentProvider>
      <PortfolioContent />
    </ContentProvider>
  );
};

export default Portfolio;
