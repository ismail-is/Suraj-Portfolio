
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { VideoContent, PostContent, useContent, defaultVideos, defaultPosts } from "@/context/ContentContext";
import { AboutSection } from "@/components/portfolio/AboutSection";
import { ProjectsSection } from "@/components/portfolio/ProjectsSection";
import { VideoProject, PostProject } from "@/components/portfolio/ProjectTypes";

const Portfolio = () => {
  const [dashboardPosts, setDashboardPosts] = useState<PostContent[]>([]);
  const [dashboardVideos, setDashboardVideos] = useState<VideoContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Use the content context to access shared content
  const { videos: contextVideos, posts: contextPosts } = useContent();

  useEffect(() => {
    // Load content either from context or localStorage
    const loadDashboardContent = () => {
      // First, try to use content from the context
      if (contextVideos.length > 0 || contextPosts.length > 0) {
        setDashboardVideos(contextVideos);
        setDashboardPosts(contextPosts);
        setIsLoading(false);
        return;
      }
      
      // Fallback to localStorage if context is empty
      const savedVideos = localStorage.getItem('dashboardVideos');
      const savedPosts = localStorage.getItem('dashboardPosts');
      
      if (savedVideos) {
        setDashboardVideos(JSON.parse(savedVideos));
      } else {
        // Use default videos from context if available
        setDashboardVideos(defaultVideos);
      }
      
      if (savedPosts) {
        setDashboardPosts(JSON.parse(savedPosts));
      } else {
        // Use default posts from context if available
        setDashboardPosts(defaultPosts);
      }
      
      setIsLoading(false);
    };
    
    loadDashboardContent();
  }, [contextVideos, contextPosts]);
  
  const postProjects: PostProject[] = dashboardPosts.map(post => ({
    id: post.id,
    title: post.title,
    description: post.description,
    image: post.image,
    category: "post"
  }));
  
  const videoProjects: VideoProject[] = dashboardVideos.map(video => ({
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
      <main className="pt-24 pb-16">
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
