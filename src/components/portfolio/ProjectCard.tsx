
import React from "react";
import { Play } from "lucide-react";
import { Project, VideoProject, PostProject } from "./ProjectTypes";

type ProjectCardProps = {
  project: Project;
  onClick: () => void;
};

export const isVideoProject = (project: Project): project is VideoProject => {
  return project.category === "video";
};

export const getImageSource = (project: Project): string => {
  if (project.category === "video") {
    return (project as VideoProject).thumbnail || '';
  } else {
    return (project as PostProject).image || '';
  }
};

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => {
  return (
    <div 
      className="group relative overflow-hidden rounded-lg cursor-pointer shadow-md"
      onClick={onClick}
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
        {project.description && <p className="text-center">{project.description}</p>}
      </div>
    </div>
  );
};
