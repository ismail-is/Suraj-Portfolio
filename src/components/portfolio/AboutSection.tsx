
import React from "react";
import { SkillBar } from "./SkillBar";

export const skills = [
  { name: "Content Strategy", level: 90 },
  { name: "Social Media Marketing", level: 85 },
  { name: "Brand Development", level: 88 },
  { name: "Digital Marketing", level: 92 },
  { name: "SEO & Analytics", level: 85 },
  { name: "Video Production", level: 80 }
];

export const AboutSection = () => {
  return (
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
                <SkillBar key={skill.name} name={skill.name} level={skill.level} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
