
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Play, X } from "lucide-react";
import { VideoContent, PostContent } from "@/context/ContentContext";

const skills = [
  { name: "Content Strategy", level: 90 },
  { name: "Social Media Marketing", level: 85 },
  { name: "Brand Development", level: 88 },
  { name: "Digital Marketing", level: 92 },
  { name: "SEO & Analytics", level: 85 },
  { name: "Video Production", level: 80 }
];

// Sample video projects stored as variables
const sampleVideos: VideoContent[] = [
  {
    id: "dQw4w9WgXcQ",
    title: "Brand Strategy Walkthrough",
    description: "A comprehensive guide to developing an effective brand strategy",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    isShort: false
  },
  {
    id: "KYz2wyBy3kc",
    title: "Social Media Marketing Tips",
    description: "Essential tips for growing your brand on social media",
    url: "https://www.youtube.com/watch?v=KYz2wyBy3kc",
    thumbnail: "https://img.youtube.com/vi/KYz2wyBy3kc/maxresdefault.jpg",
    isShort: false
  },
  {
    id: "Tn6-PIqc4UM",
    title: "Content Creation Basics",
    description: "Learn the fundamentals of creating engaging content",
    url: "https://www.youtube.com/watch?v=Tn6-PIqc4UM",
    thumbnail: "https://img.youtube.com/vi/Tn6-PIqc4UM/maxresdefault.jpg",
    isShort: true
  }
];

// Sample post projects stored as variables
const samplePosts: PostContent[] = [
  {
    id: 1,
    title: "Effective Email Marketing Campaign",
    description: "A case study on designing effective email marketing campaigns",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 2,
    title: "Instagram Growth Strategy",
    description: "How I helped a client grow their Instagram following by 200%",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  },
  {
    id: 3,
    title: "Brand Identity Redesign",
    description: "A complete overhaul of a company's visual identity",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [dashboardPosts, setDashboardPosts] = useState<PostContent[]>([]);
  const [dashboardVideos, setDashboardVideos] = useState<VideoContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoIsShort, setActiveVideoIsShort] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with sample data
    setDashboardVideos(sampleVideos);
    setDashboardPosts(samplePosts);
    setIsLoading(false);
    
    // Also check localStorage for any user-added content
    const loadDashboardContent = () => {
      const savedVideos = localStorage.getItem('dashboardVideos');
      const savedPosts = localStorage.getItem('dashboardPosts');
      
      if (savedVideos) {
        // Merge sample videos with saved videos, avoiding duplicates
        const parsedVideos = JSON.parse(savedVideos);
        const combinedVideos = [...sampleVideos];
        
        parsedVideos.forEach((video: VideoContent) => {
          if (!combinedVideos.some(v => v.id === video.id)) {
            combinedVideos.push(video);
          }
        });
        
        setDashboardVideos(combinedVideos);
      }
      
      if (savedPosts) {
        // Merge sample posts with saved posts, avoiding duplicates
        const parsedPosts = JSON.parse(savedPosts);
        const combinedPosts = [...samplePosts];
        
        parsedPosts.forEach((post: PostContent) => {
          if (!combinedPosts.some(p => p.id === post.id)) {
            combinedPosts.push(post);
          }
        });
        
        setDashboardPosts(combinedPosts);
      }
      
      setIsLoading(false);
    };
    
    loadDashboardContent();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setActiveVideo(null);
      }
    };

    if (activeVideo) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeVideo]);
  
  // Define project types with proper typing
  type PostProject = {
    id: number;
    title: string;
    description: string;
    image: string;
    category: string;
  };
  
  type VideoProject = {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    category: string;
    isShort: boolean;
  };
  
  type Project = PostProject | VideoProject;
  
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

  const allProjects: Project[] = [...postProjects, ...videoProjects];
  
  const filteredProjects = allProjects.filter(project => 
    filter === "all" ? true : project.category === filter
  );

  const handleVideoClick = (videoId: string, isShort = false) => {
    setActiveVideo(videoId);
    setActiveVideoIsShort(isShort);
  };

  const closeVideoModal = () => {
    setActiveVideo(null);
    setActiveVideoIsShort(false);
  };

  const getImageSource = (project: Project): string => {
    if (project.category === "video") {
      return (project as VideoProject).thumbnail || '';
    } else {
      return (project as PostProject).image || '';
    }
  };

  const isVideoProject = (project: Project): project is VideoProject => {
    return project.category === "video";
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">About Me</h2>
                <p className="text-muted-foreground mb-6">
                  I'm a passionate Digital Marketing Specialist with over 5 years of experience
                  in creating compelling content and developing effective marketing strategies.
                  My approach combines creativity with data-driven insights to deliver
                  exceptional results for clients across various industries.
                </p>
                <p className="text-muted-foreground">
                  I specialize in content creation, social media management, and brand development,
                  helping businesses build their online presence and connect with their target audience.
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Skills</h2>
                <div className="space-y-4">
                  {skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded">
                        <div 
                          className="h-full bg-primary rounded" 
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">My Work</h2>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
                className="mb-2"
              >
                All
              </Button>
              <Button 
                variant={filter === "post" ? "default" : "outline"}
                onClick={() => setFilter("post")}
                className="mb-2"
              >
                Post Concepts
              </Button>
              <Button 
                variant={filter === "video" ? "default" : "outline"}
                onClick={() => setFilter("video")}
                className="mb-2"
              >
                Video Concepts
              </Button>
            </div>

            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-muted-foreground">Loading projects...</p>
              </div>
            )}

            {!isLoading && filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found. Add projects through the dashboard.</p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id.toString()} 
                  className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md"
                  onClick={() => {
                    if (isVideoProject(project)) {
                      handleVideoClick(project.id.toString(), project.isShort);
                    }
                  }}
                >
                  <div className="aspect-video">
                    <img 
                      src={getImageSource(project)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://via.placeholder.com/320x180?text=Image+Not+Found";
                      }}
                    />
                    {isVideoProject(project) && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-70 group-hover:opacity-100 transition-opacity">
                        <div className="bg-primary text-white rounded-full p-3">
                          <Play className="h-6 w-6" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white p-6">
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <p className="text-center">{project.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {activeVideo && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div 
            ref={modalRef} 
            className={`relative bg-white rounded-lg overflow-hidden ${activeVideoIsShort ? 'w-[350px] max-w-full' : 'w-full max-w-4xl'}`}
          >
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 z-10 bg-white/10 text-white hover:bg-white/20"
              onClick={closeVideoModal}
            >
              <X className="h-5 w-5" />
            </Button>
            <div className={activeVideoIsShort ? 'aspect-[9/16] w-full' : 'aspect-video w-full'}>
              <iframe 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
                title="YouTube video player"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-4 bg-white">
              <h3 className="text-xl font-bold mb-2">
                {videoProjects.find(v => v.id === activeVideo)?.title || "Marketing Video"}
              </h3>
              <p className="text-muted-foreground">
                {videoProjects.find(v => v.id === activeVideo)?.description || "Video description"}
              </p>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Portfolio;
