
import React from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { VideoContent, PostContent } from '@/context/ContentContext';

type ContentListProps = {
  setEditingVideo: (video: VideoContent | null) => void;
  setEditingPost: (post: PostContent | null) => void;
};

const ContentList = ({ setEditingVideo, setEditingPost }: ContentListProps) => {
  const { videos, posts, removeVideo, removePost } = useContent();

  const handleRemoveVideo = (id: string) => {
    removeVideo(id);
    toast({
      title: 'Video removed',
      description: 'The video has been removed from your portfolio.',
    });
  };

  const handleRemovePost = (id: number) => {
    removePost(id);
    toast({
      title: 'Post removed',
      description: 'The post has been removed from your portfolio.',
    });
  };

  const handleEditVideo = (video: VideoContent) => {
    setEditingVideo(video);
    // Scroll to the video form
    const videoForm = document.querySelector('.video-form-container');
    videoForm?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleEditPost = (post: PostContent) => {
    setEditingPost(post);
    // Scroll to the post form
    const postForm = document.querySelector('.post-form-container');
    postForm?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Videos</h3>
        
        {videos.length === 0 ? (
          <p className="text-muted-foreground">No videos added yet.</p>
        ) : (
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video.id} className="flex items-start gap-3 border-b pb-4">
                <div className="relative w-16 sm:w-20 h-12 sm:h-16 overflow-hidden rounded">
                  <img 
                    src={video.thumbnail || "https://via.placeholder.com/320x180?text=Video+Thumbnail"} 
                    alt={video.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/320x180?text=Video+Thumbnail";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{video.title}</h4>
                  {video.description && (
                    <p className="text-xs text-muted-foreground truncate">
                      {video.description}
                    </p>
                  )}
                  {video.isShort && (
                    <span className="inline-block px-2 py-0.5 text-xs bg-primary/10 text-primary rounded mt-1">
                      YouTube Short
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditVideo(video)}
                    className="text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemoveVideo(video.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="p-4 sm:p-6 bg-white rounded-lg shadow">
        <h3 className="text-xl font-bold mb-4">Posts</h3>
        
        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts added yet.</p>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="flex items-start gap-3 border-b pb-4">
                <div className="relative w-16 sm:w-20 h-12 sm:h-16 overflow-hidden rounded">
                  <img 
                    src={post.image || "https://via.placeholder.com/320x180?text=Post+Image"} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://via.placeholder.com/320x180?text=Post+Image";
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm truncate">{post.title}</h4>
                  {post.description && (
                    <p className="text-xs text-muted-foreground truncate">
                      {post.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleEditPost(post)}
                    className="text-primary hover:text-primary hover:bg-primary/10"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => handleRemovePost(post.id)}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentList;
