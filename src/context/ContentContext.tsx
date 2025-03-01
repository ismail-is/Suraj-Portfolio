
import React, { createContext, useContext, useState, useEffect } from 'react';

export type VideoContent = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  isShort?: boolean;
};

export type PostContent = {
  id: number;
  title: string;
  description: string;
  image: string;
};

type ContentContextType = {
  videos: VideoContent[];
  posts: PostContent[];
  addVideo: (video: VideoContent) => void;
  addPost: (post: PostContent) => void;
  removeVideo: (id: string) => void;
  removePost: (id: number) => void;
};

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const ContentProvider = ({ children }: { children: React.ReactNode }) => {
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [posts, setPosts] = useState<PostContent[]>([]);

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

  return (
    <ContentContext.Provider value={{ videos, posts, addVideo, addPost, removeVideo, removePost }}>
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
