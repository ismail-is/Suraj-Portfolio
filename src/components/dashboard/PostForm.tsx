
import React, { useState, useEffect } from 'react';
import { useContent, PostContent } from '@/context/ContentContext';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

type PostFormProps = {
  editingPost: PostContent | null;
  setEditingPost: (post: PostContent | null) => void;
};

const PostForm = ({ editingPost, setEditingPost }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  
  const { addPost, updatePost } = useContent();

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setDescription(editingPost.description || '');
      setImage(editingPost.image);
    }
  }, [editingPost]);

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setImage('');
    setEditingPost(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form (only title and image are required now)
    if (!title || !image) {
      toast({
        variant: 'destructive',
        title: 'Missing information',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    const newId = editingPost ? editingPost.id : Date.now();

    const postData: PostContent = {
      id: newId,
      title,
      description: description || undefined, // Only include if it has a value
      image,
    };

    if (editingPost) {
      updatePost(postData);
      toast({
        title: 'Post updated',
        description: 'Your post has been updated in the portfolio.',
      });
    } else {
      addPost(postData);
      toast({
        title: 'Post added',
        description: 'Your post has been added to the portfolio.',
      });
    }

    resetForm();
  };

  const handleCancel = () => {
    resetForm();
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow mb-6">
      <h3 className="text-xl font-bold mb-4">{editingPost ? 'Edit Post' : 'Add New Post'}</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="postTitle" className="block text-sm font-medium mb-1">
            Post Title <span className="text-red-500">*</span>
          </label>
          <Input
            id="postTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title"
          />
        </div>
        
        <div>
          <label htmlFor="postDescription" className="block text-sm font-medium mb-1">
            Description <span className="text-gray-400">(optional)</span>
          </label>
          <Textarea
            id="postDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter post description"
            rows={3}
          />
        </div>
        
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
            Image URL <span className="text-red-500">*</span>
          </label>
          <Input
            id="imageUrl"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <p className="text-sm text-muted-foreground mt-1">
            For Google Drive images, use: https://drive.google.com/uc?export=view&id=YOUR_FILE_ID
          </p>
        </div>
        
        <div className="flex space-x-2">
          <Button type="submit">
            {editingPost ? 'Update Post' : 'Add Post'}
          </Button>
          {editingPost && (
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PostForm;
