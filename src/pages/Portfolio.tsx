
import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
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

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [dashboardPosts, setDashboardPosts] = useState<PostContent[]>([]);
  const [dashboardVideos, setDashboardVideos] = useState<VideoContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [activeVideoIsShort, setActiveVideoIsShort] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadDashboardContent = () => {
      const savedVideos = localStorage.getItem('dashboardVideos');
      const savedPosts = localStorage.getItem('dashboardPosts');
      
      if (savedVideos) {
        setDashboardVideos(JSON.parse(savedVideos));
      }
      
      if (savedPosts) {
        setDashboardPosts(JSON.parse(savedPosts));
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
  
  const postProjects = dashboardPosts.map(post => ({
    ...post,
    category: "post"
  }));
  
  const videoProjects = dashboardVideos.map(video => ({
    id: video.id,
    title: video.title,
    description: video.description,
    thumbnail: video.thumbnail,
    category: "video",
    isShort: video.isShort
  }));

  const allProjects = [
    ...postProjects.map(post => ({
      id: post.id,
      title: post.title,
      description: post.description,
      image: post.image,
      category: "post"
    })),
    ...videoProjects.map(video => ({
      id: video.id,
      title: video.title,
      description: video.description,
      thumbnail: video.thumbnail,
      category: "video",
      isShort: video.isShort
    }))
  ];
  
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

  const getImageSource = (project: any): string => {
    if (project.category === "video") {
      return project.thumbnail || '';
    } else {
      return project.image || '';
    }
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
                    if (project.category === "video") {
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
                    {project.category === "video" && (
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
