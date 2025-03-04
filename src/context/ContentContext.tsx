
import React, { createContext, useContext, useState, useEffect } from 'react';

// Initial data that will be visible to all users
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

// Default collections with initial data
export const defaultVideos: VideoContent[] = [...initialVideos];
export const defaultPosts: PostContent[] = [...initialPosts];

type ContentContextType = {
  videos: VideoContent[];
  posts: PostContent[];
  addVideo: (video: VideoContent) => void;
  addPost: (post: PostContent) => void;
  removeVideo: (id: string) => void;
  removePost: (id: number) => void;
  updateVideo: (video: VideoContent) => void;
  updatePost: (post: PostContent) => void;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<VideoContent[]>(defaultVideos);
  const [posts, setPosts] = useState<PostContent[]>(defaultPosts);

  useEffect(() => {
    // Load saved content on page load
    const savedVideos = localStorage.getItem('dashboardVideos');
    const savedPosts = localStorage.getItem('dashboardPosts');

    if (savedVideos) {
      setVideos(JSON.parse(savedVideos));
    }

    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const saveToLocalStorage = (videosData: VideoContent[], postsData: PostContent[]) => {
    localStorage.setItem('dashboardVideos', JSON.stringify(videosData));
    localStorage.setItem('dashboardPosts', JSON.stringify(postsData));
  };

  const addVideo = (video: VideoContent) => {
    const updatedVideos = [...videos, video];
    setVideos(updatedVideos);
    saveToLocalStorage(updatedVideos, posts);
  };

  const addPost = (post: PostContent) => {
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    saveToLocalStorage(videos, updatedPosts);
  };

  const removeVideo = (id: string) => {
    const updatedVideos = videos.filter(video => video.id !== id);
    setVideos(updatedVideos);
    saveToLocalStorage(updatedVideos, posts);
  };

  const removePost = (id: number) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    saveToLocalStorage(videos, updatedPosts);
  };

  const updateVideo = (updatedVideo: VideoContent) => {
    const updatedVideos = videos.map(video => 
      video.id === updatedVideo.id ? updatedVideo : video
    );
    setVideos(updatedVideos);
    saveToLocalStorage(updatedVideos, posts);
  };

  const updatePost = (updatedPost: PostContent) => {
    const updatedPosts = posts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updatedPosts);
    saveToLocalStorage(videos, updatedPosts);
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
      updatePost
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
