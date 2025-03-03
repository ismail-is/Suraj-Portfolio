
import React from "react";

type SkillBarProps = {
  name: string;
  level: number;
};

export const SkillBar = ({ name, level }: SkillBarProps) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div 
          className="h-full bg-primary rounded" 
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
};
