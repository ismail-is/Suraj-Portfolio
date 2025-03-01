
import React from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ContentProvider } from '@/context/ContentContext';
import LoginForm from '@/components/dashboard/LoginForm';
import DashboardNav from '@/components/dashboard/DashboardNav';
import VideoForm from '@/components/dashboard/VideoForm';
import PostForm from '@/components/dashboard/PostForm';
import ContentList from '@/components/dashboard/ContentList';

const DashboardContent = () => {
  const { isAuthenticated } = useAuth();

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
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Content Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <VideoForm />
          <PostForm />
        </div>
        
        <h2 className="text-2xl font-bold mb-6">Current Content</h2>
        <ContentList />
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
