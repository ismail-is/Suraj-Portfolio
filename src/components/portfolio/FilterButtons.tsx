
import React from "react";
import { Button } from "@/components/ui/button";

type FilterButtonsProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

export const FilterButtons = ({ filter, setFilter }: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
      <Button 
        variant={filter === "all" ? "default" : "outline"}
        onClick={() => setFilter("all")}
        className="text-sm md:text-base px-3 py-1 md:px-4 md:py-2"
      >
        All
      </Button>
      <Button 
        variant={filter === "post" ? "default" : "outline"}
        onClick={() => setFilter("post")}
        className="text-sm md:text-base px-3 py-1 md:px-4 md:py-2"
      >
        Post Concepts
      </Button>
      <Button 
        variant={filter === "video" ? "default" : "outline"}
        onClick={() => setFilter("video")}
        className="text-sm md:text-base px-3 py-1 md:px-4 md:py-2"
      >
        Video Concepts
      </Button>
    </div>
  );
};
