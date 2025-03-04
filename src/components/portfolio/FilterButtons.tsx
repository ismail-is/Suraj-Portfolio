
import React from "react";
import { Button } from "@/components/ui/button";

type FilterButtonsProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

export const FilterButtons = ({ filter, setFilter }: FilterButtonsProps) => {
  return (
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
  );
};
