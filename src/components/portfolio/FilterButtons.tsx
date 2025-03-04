
import React from "react";
import { Button } from "@/components/ui/button";

type FilterButtonsProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

export const FilterButtons = ({ filter, setFilter }: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-6 sm:mb-10">
      <Button 
        variant={filter === "all" ? "default" : "outline"}
        onClick={() => setFilter("all")}
        size="sm"
        className="text-sm px-3 sm:px-4"
      >
        All
      </Button>
      <Button 
        variant={filter === "post" ? "default" : "outline"}
        onClick={() => setFilter("post")}
        size="sm"
        className="text-sm px-3 sm:px-4"
      >
        Post Concepts
      </Button>
      <Button 
        variant={filter === "video" ? "default" : "outline"}
        onClick={() => setFilter("video")}
        size="sm"
        className="text-sm px-3 sm:px-4"
      >
        Video Concepts
      </Button>
    </div>
  );
};
