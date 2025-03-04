
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ContentProvider, VideoContent, PostContent } from '@/context/ContentContext';
import LoginForm from '@/components/dashboard/LoginForm';
import DashboardNav from '@/components/dashboard/DashboardNav';
import VideoForm from '@/components/dashboard/VideoForm';
import PostForm from '@/components/dashboard/PostForm';
import ContentList from '@/components/dashboard/ContentList';

const DashboardContent = () => {
  const { isAuthenticated } = useAuth();
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null);
  const [editingPost, setEditingPost] = useState<PostContent | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <h2 className="text-2xl font-bold mb-6">Content Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-8">
          <div className="video-form-container">
            <VideoForm 
              editingVideo={editingVideo} 
              setEditingVideo={setEditingVideo} 
            />
          </div>
          <div className="post-form-container">
            <PostForm 
              editingPost={editingPost} 
              setEditingPost={setEditingPost} 
            />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Current Content</h2>
        <ContentList 
          setEditingVideo={setEditingVideo} 
          setEditingPost={setEditingPost} 
        />
      </main>
    </div>
  );
};

const Dashboard = () => {
  return (
    <AuthProvider>
      <ContentProvider>
        <DashboardContent />
      </ContentProvider>
    </AuthProvider>
  );
};

export default Dashboard;
