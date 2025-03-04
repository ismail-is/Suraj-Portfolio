
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchSheetData, 
  transformToVideos, 
  transformToPosts,
  SheetVideoContent,
  SheetPostContent
} from '@/utils/googleSheetsApi';
import { toast } from '@/hooks/use-toast';

// Google Sheets configuration
const SHEET_ID = "1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"; // Demo sheet, replace with your own
const VIDEOS_SHEET_NAME = "Sheet1"; // Replace with your videos sheet name
const POSTS_SHEET_NAME = "Sheet2"; // Replace with your posts sheet name

// The context will use these types for compatibility with existing code
export type VideoContent = {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail: string;
  isShort?: boolean;
};

export type PostContent = {
  id: number;
  title: string;
  description?: string;
  image: string;
};

// Initial data in case the sheet fetch fails
const initialVideos = [
  {
    id: "sample-video-1",
    title: "Marketing Strategy Overview",
    description: "A comprehensive guide to digital marketing strategies for 2023",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnail: "https://via.placeholder.com/320x180?text=Marketing+Strategy",
    isShort: false
  }
];

const initialPosts = [
  {
    id: 1,
    title: "Social Media Best Practices",
    description: "Learn how to optimize your social media presence",
    image: "https://via.placeholder.com/320x180?text=Social+Media"
  }
];

// Default collections with initial data
export const defaultVideos: VideoContent[] = [];
export const defaultPosts: PostContent[] = [];

type ContentContextType = {
  videos: VideoContent[];
  posts: PostContent[];
  addVideo: (video: VideoContent) => void;
  addPost: (post: PostContent) => void;
  removeVideo: (id: string) => void;
  removePost: (id: number) => void;
  updateVideo: (video: VideoContent) => void;
  updatePost: (post: PostContent) => void;
  refreshData: () => Promise<void>;
  isLoading: boolean;
  lastUpdated: Date | null;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [posts, setPosts] = useState<PostContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Function to fetch data from Google Sheets
  const fetchDataFromSheets = async () => {
    setIsLoading(true);
    try {
      // Fetch video data
      const videoData = await fetchSheetData(SHEET_ID, VIDEOS_SHEET_NAME);
      const transformedVideos = transformToVideos(videoData);
      setVideos(transformedVideos.length > 0 ? transformedVideos : initialVideos);
      
      // Fetch post data
      const postData = await fetchSheetData(SHEET_ID, POSTS_SHEET_NAME);
      const transformedPosts = transformToPosts(postData);
      setPosts(transformedPosts.length > 0 ? transformedPosts : initialPosts);
      
      setLastUpdated(new Date());
      
      toast({
        title: "Content updated",
        description: "Portfolio content has been refreshed from Google Sheets.",
      });
    } catch (error) {
      console.error("Error fetching data from Google Sheets:", error);
      
      // Fall back to local storage if available
      const savedVideos = localStorage.getItem('dashboardVideos');
      const savedPosts = localStorage.getItem('dashboardPosts');

      if (savedVideos) {
        setVideos(JSON.parse(savedVideos));
      } else {
        setVideos(initialVideos);
      }

      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        setPosts(initialPosts);
      }
      
      toast({
        variant: 'destructive',
        title: "Failed to fetch from Google Sheets",
        description: "Using locally stored data instead. Check the console for details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial data fetch
    fetchDataFromSheets();
  }, []);

  // Save to local storage as a backup
  const saveToLocalStorage = (videosData: VideoContent[], postsData: PostContent[]) => {
    localStorage.setItem('dashboardVideos', JSON.stringify(videosData));
    localStorage.setItem('dashboardPosts', JSON.stringify(postsData));
  };

  // In a real application, these functions would update the Google Sheet
  // Here they just update local state and localStorage as a fallback
  const addVideo = (video: VideoContent) => {
    const updatedVideos = [...videos, video];
    setVideos(updatedVideos);
    saveToLocalStorage(updatedVideos, posts);
    
    toast({
      title: "Video added",
      description: "Your video has been added to the portfolio. Note: This will not update Google Sheets directly.",
    });
  };

  const addPost = (post: PostContent) => {
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    saveToLocalStorage(videos, updatedPosts);
    
    toast({
      title: "Post added",
      description: "Your post has been added to the portfolio. Note: This will not update Google Sheets directly.",
    });
  };

  const removeVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    saveToLocalStorage(updatedVideos, posts);
    
    toast({
      title: "Video removed",
      description: "The video has been removed from your portfolio. Note: This will not update Google Sheets directly.",
    });
  };

  const removePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    saveToLocalStorage(videos, updatedPosts);
    
    toast({
      title: "Post removed",
      description: "The post has been removed from your portfolio. Note: This will not update Google Sheets directly.",
    });
  };

  const updateVideo = (updatedVideo: VideoContent) => {
    const updatedVideos = videos.map(video => 
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos);
    saveToLocalStorage(updatedVideos, posts);
    
    toast({
      title: "Video updated",
      description: "Your video has been updated in the portfolio. Note: This will not update Google Sheets directly.",
    });
  };

  const updatePost = (updatedPost: PostContent) => {
    const updatedPosts = posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    saveToLocalStorage(videos, updatedPosts);
    
    toast({
      title: "Post updated",
      description: "Your post has been updated in the portfolio. Note: This will not update Google Sheets directly.",
    });
  };

  // Function to manually refresh data from Google Sheets
  const refreshData = async () => {
    await fetchDataFromSheets();
  };

  return (
    <ContentContext.Provider value={{ 
      videos, 
      posts, 
      addVideo, 
      addPost, 
      removeVideo, 
      removePost,
      updateVideo,
      updatePost,
      refreshData,
      isLoading,
      lastUpdated
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
