
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { ContentProvider, VideoContent, PostContent, useContent } from '@/context/ContentContext';
import LoginForm from '@/components/dashboard/LoginForm';
import DashboardNav from '@/components/dashboard/DashboardNav';
import VideoForm from '@/components/dashboard/VideoForm';
import PostForm from '@/components/dashboard/PostForm';
import ContentList from '@/components/dashboard/ContentList';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

const DashboardContent = () => {
  const { isAuthenticated } = useAuth();
  const { refreshData, isLoading, lastUpdated } = useContent();
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null);
  const [editingPost, setEditingPost] = useState<PostContent | null>(null);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <LoginForm />
      </div>
    );
  }

  const handleRefresh = async () => {
    await refreshData();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Content Management</h2>
          
          <div className="flex items-center gap-2">
            {lastUpdated && (
              <span className="text-sm text-muted-foreground">
                Last updated: {lastUpdated.toLocaleTimeString()}
              </span>
            )}
            <Button 
              onClick={handleRefresh} 
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh from Sheets
            </Button>
          </div>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h3 className="text-lg font-medium mb-4">Google Sheets Integration</h3>
          <p className="text-muted-foreground text-sm mb-2">
            This dashboard connects to Google Sheets to fetch portfolio content.
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            NOTE: Changes made here only affect the local data. To permanently update your content, edit your Google Sheet directly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Videos Sheet</h4>
              <p className="text-xs text-muted-foreground mb-2">Columns: id, title, description, url, thumbnail, isShort</p>
            </div>
            <div className="border rounded p-3">
              <h4 className="font-medium mb-2">Posts Sheet</h4>
              <p className="text-xs text-muted-foreground mb-2">Columns: id, title, description, image</p>
            </div>
          </div>
        </div>
        
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
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-r-transparent" />
          </div>
        ) : (
          <ContentList 
            setEditingVideo={setEditingVideo} 
            setEditingPost={setEditingPost} 
          />
        )}
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
