
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoContent, PostContent, useContent } from "@/context/ContentContext";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { VideoProject, PostProject } from "@/components/portfolio/ProjectTypes";

const Portfolio = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the content context to access shared content
  const { videos, posts } = useContent();

  useEffect(() => {
    // Short timeout to simulate loading and prevent layout shifts
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
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
      <main className="pt-20 pb-12">
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

export default Portfolio;
