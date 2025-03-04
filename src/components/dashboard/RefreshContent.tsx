
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useToast } from "@/hooks/use-toast";

export const RefreshContent = () => {
  const { refreshContent, isLoading } = useContent();
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshContent();
      toast({
        title: "Content refreshed",
        description: "Latest content has been loaded from Google Sheets.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Could not refresh content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };
  
  return (
    <Button
      variant="outline"
      onClick={handleRefresh}
      disabled={isRefreshing || isLoading}
      className="flex gap-2 items-center"
    >
      <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
      {isRefreshing ? "Refreshing..." : "Refresh from Google Sheets"}
    </Button>
  );
};
