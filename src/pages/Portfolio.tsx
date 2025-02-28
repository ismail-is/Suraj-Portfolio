
import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Play } from "lucide-react";

const skills = [
  { name: "Content Strategy", level: 90 },
  { name: "Social Media Marketing", level: 85 },
  { name: "Brand Development", level: 88 },
  { name: "Digital Marketing", level: 92 },
  { name: "SEO & Analytics", level: 85 },
  { name: "Video Production", level: 80 }
];

// Posts data (representing content from Google Drive)
const postProjects = [
  {
    id: 1,
    title: "Brand Awareness Campaign",
    description: "Social media strategy and execution for a tech startup",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    category: "post"
  },
  {
    id: 2,
    title: "Social Media Marketing Strategy",
    description: "Comprehensive strategy for increasing engagement on Instagram",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f1c28c?auto=format&fit=crop&q=80&w=800",
    category: "post"
  },
  {
    id: 3,
    title: "Holiday Campaign for Fashion Brand",
    description: "Seasonal marketing campaign with 40% increase in sales",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800",
    category: "post"
  },
  {
    id: 4,
    title: "Restaurant Social Media Revamp",
    description: "Content strategy that increased foot traffic by 25%",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&q=80&w=800",
    category: "post"
  }
];

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
}

interface Post {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

type Project = Post | Video;

const Portfolio = () => {
  const [filter, setFilter] = useState("all");
  const [videoProjects, setVideoProjects] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const playlistId = "PLdrmjkKeIQRUbyVx57ENOUvin_zGwKADn";

  useEffect(() => {
    const fetchYouTubeVideos = async () => {
      try {
        // First attempt to get videos from local storage to avoid API limits
        const cachedVideos = localStorage.getItem('portfolioVideos');
        if (cachedVideos) {
          setVideoProjects(JSON.parse(cachedVideos));
          setIsLoading(false);
          return;
        }
        
        // Using YouTube Data API v3 to fetch playlist items
        const apiKey = "AIzaSyDIbYm0_CcYEuUTIIrX7AYGKBT1DPmb2cg"; // This is a public API key for YouTube Data API
        const maxResults = 10; // Number of videos to fetch
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`
        );
        
        const data = await response.json();
        
        if (data.error) {
          console.error("YouTube API error:", data.error);
          toast({
            variant: "destructive",
            title: "Error loading videos",
            description: "Could not load videos from YouTube. Using fallback videos.",
          });
          
          // Use fallback videos
          setVideoProjects(getFallbackVideos());
        } else {
          // Process the videos from YouTube
          const videos = data.items.map((item: any) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title,
            description: item.snippet.description || "Video from YouTube playlist",
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            category: "video"
          }));
          
          setVideoProjects(videos);
          
          // Cache the videos in localStorage to reduce API calls
          localStorage.setItem('portfolioVideos', JSON.stringify(videos));
        }
      } catch (error) {
        console.error("Error fetching YouTube videos:", error);
        toast({
          variant: "destructive",
          title: "Error loading videos",
          description: "Could not load videos from YouTube. Using fallback videos.",
        });
        
        // Use fallback videos
        setVideoProjects(getFallbackVideos());
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchYouTubeVideos();
  }, []);
  
  // Fallback videos in case the API fails
  const getFallbackVideos = (): Video[] => [
    {
      id: "dQw4w9WgXcQ",
      title: "Product Launch Video",
      description: "Promotional video for new product launch",
      thumbnail: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800",
      category: "video"
    },
    {
      id: "5qap5aO4i9A",
      title: "Brand Story Video",
      description: "Company culture and values showcase",
      thumbnail: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
      category: "video"
    }
  ];

  // Combine post and video projects
  const allProjects = [...postProjects, ...videoProjects];
  
  // Filter projects based on selected category
  const filteredProjects = allProjects.filter(project => 
    filter === "all" ? true : project.category === filter
  );

  const openYouTubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  // Function to determine the image source based on project type
  const getImageSource = (project: Project): string => {
    if (project.category === "video") {
      return (project as Video).thumbnail;
    } else {
      return (project as Post).image;
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* About & Skills Section */}
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

        {/* Portfolio Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">My Work</h2>
            
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-12">
              <Button 
                variant={filter === "all" ? "default" : "outline"}
                onClick={() => setFilter("all")}
              >
                All
              </Button>
              <Button 
                variant={filter === "post" ? "default" : "outline"}
                onClick={() => setFilter("post")}
              >
                Post Concepts
              </Button>
              <Button 
                variant={filter === "video" ? "default" : "outline"}
                onClick={() => setFilter("video")}
              >
                Video Concepts
              </Button>
            </div>

            {/* Loading state */}
            {isLoading && (
              <div className="text-center py-12">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-muted-foreground">Loading projects...</p>
              </div>
            )}

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={typeof project.id === 'string' ? project.id : project.id.toString()} 
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                  onClick={() => project.category === "video" && openYouTubeVideo(project.id as string)}
                >
                  <div className="aspect-video">
                    <img 
                      src={getImageSource(project)}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
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
            
            {/* No results message */}
            {filteredProjects.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No projects found for the selected category.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
