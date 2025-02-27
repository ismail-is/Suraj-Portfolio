
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const skills = [
  { name: "Content Strategy", level: 90 },
  { name: "Social Media Marketing", level: 85 },
  { name: "Brand Development", level: 88 },
  { name: "Digital Marketing", level: 92 },
  { name: "SEO & Analytics", level: 85 },
  { name: "Video Production", level: 80 }
];

const projects = [
  {
    id: 1,
    title: "Brand Awareness Campaign",
    description: "Social media strategy and execution for a tech startup",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    category: "post"
  },
  {
    id: 2,
    title: "Product Launch Video",
    description: "Promotional video for new product launch",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&q=80&w=800",
    category: "video"
  },
  {
    id: 3,
    title: "Social Media Campaign",
    description: "Engaging social media content strategy",
    image: "https://images.unsplash.com/photo-1432888622747-4eb9a8f1c28c?auto=format&fit=crop&q=80&w=800",
    category: "post"
  },
  {
    id: 4,
    title: "Brand Story Video",
    description: "Company culture and values showcase",
    image: "https://images.unsplash.com/photo-1493612276216-ee3925520721?auto=format&fit=crop&q=80&w=800",
    category: "video"
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState("all");

  const filteredProjects = projects.filter(project => 
    filter === "all" ? true : project.category === filter
  );

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

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="group relative overflow-hidden rounded-lg"
                >
                  <div className="aspect-video">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
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
      <Footer />
    </>
  );
};

export default Portfolio;
