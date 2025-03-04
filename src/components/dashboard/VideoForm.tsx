
import React, { useState, useEffect } from 'react';
import { useContent, VideoContent } from '@/context/ContentContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type VideoFormProps = {
  editingVideo: VideoContent | null;
  setEditingVideo: (video: VideoContent | null) => void;
};

const VideoForm = ({ editingVideo, setEditingVideo }: VideoFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [isShort, setIsShort] = useState(false);
  
  const { addVideo, updateVideo } = useContent();

  useEffect(() => {
    if (editingVideo) {
      setTitle(editingVideo.title);
      setDescription(editingVideo.description || '');
      setUrl(editingVideo.url);
      setThumbnail(editingVideo.thumbnail);
      setIsShort(editingVideo.isShort || false);
    }
  }, [editingVideo]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setUrl('');
    setThumbnail('');
    setIsShort(false);
    setEditingVideo(null);
  };

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (only title, URL and thumbnail are required now)
    if (!title || !url || !thumbnail) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    // Extract video ID for embedding
    const videoId = extractVideoId(url);
    if (!videoId) {
      toast({
        variant: 'destructive',
        title: 'Invalid YouTube URL',
        description: 'Please enter a valid YouTube video URL.',
      });
      return;
    }

    const videoData: VideoContent = {
      id: editingVideo ? editingVideo.id : videoId,
      title,
      description: description || undefined, // Only include if it has a value
      url,
      thumbnail,
      isShort,
    };

    if (editingVideo) {
      updateVideo(videoData);
      toast({
        title: 'Video updated',
        description: 'Your video has been updated in the portfolio.',
      });
    } else {
      addVideo(videoData);
      toast({
        title: 'Video added',
        description: 'Your video has been added to the portfolio.',
      });
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold mb-4">{editingVideo ? 'Edit Video' : 'Add New Video'}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="videoTitle" className="block text-sm font-medium mb-1">
            Video Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="videoTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter video title"
          />
        </div>
        
        <div>
          <label htmlFor="videoDescription" className="block text-sm font-medium mb-1">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <Textarea
            id="videoDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter video description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
            YouTube URL <span className="text-red-500">*</span>
          </label>
          <Input
            id="videoUrl"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>
        
        <div>
          <label htmlFor="thumbnailUrl" className="block text-sm font-medium mb-1">
            Thumbnail URL <span className="text-red-500">*</span>
          </label>
          <Input
            id="thumbnailUrl"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="isShort"
            type="checkbox"
            checked={isShort}
            onChange={(e) => setIsShort(e.target.checked)}
            className="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="isShort" className="ml-2 block text-sm">
            This is a YouTube Short (vertical video)
          </label>
        </div>
        
        <div className="flex space-x-2">
          <Button type="submit">
            {editingVideo ? 'Update Video' : 'Add Video'}
          </Button>
          {editingVideo && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default VideoForm;
